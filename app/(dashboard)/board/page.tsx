import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import BoardClient from "../components/board-client";


export default async function BoardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. Get Active Project ID
  const cookieStore = await cookies();
  const activeProjectId = cookieStore.get("ops_active_project")?.value;

  // 2. Fetch Project & Client Details (To show in the Header)
  let activeProject = null;
  if (activeProjectId) {
    activeProject = await prisma.project.findUnique({
      where: { id: activeProjectId },
      include: { client: true }
    });
  }

  // 3. FETCH TASKS (STRICT FILTER)
  // - If activeProjectId exists: Show tasks for that Project.
  // - If activeProjectId is MISSING: Show tasks where projectId is NULL (Inbox).
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      projectId: activeProjectId || null, 
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="h-full flex flex-col">
       <BoardClient 
          initialTasks={tasks} 
          activeProjectId={activeProjectId}
          projectName={activeProject?.name || "Inbox"} 
          clientName={activeProject?.client.name || "Personal"}
       />
    </div>
  );
}