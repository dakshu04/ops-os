import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import BoardClient from "../components/board-client";

export default async function BoardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. Get the Active Project ID from the Cookie
  const cookieStore = await cookies();
  const activeProjectId = cookieStore.get("ops_active_project")?.value;

  console.log("🔹 Current Active Project ID:", activeProjectId); // Check your terminal for this!

  // 2. FETCH TASKS (STRICT FILTER)
  // We explicitly check if activeProjectId exists.
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id, // Must belong to you
      // STRICT LOGIC:
      // If we have an ID, look for that ID.
      // If we DON'T have an ID (undefined), look for tasks with projectId: null (Inbox)
      // OR you can choose to show NOTHING if no project is selected.
      projectId: activeProjectId ? activeProjectId : null, 
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="h-full flex flex-col">
       {/* Visual Debugger: Tells you what the app thinks you are looking at */}
       <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 text-xs text-zinc-500 flex justify-between">
          <span>
            Active Project: <span className="text-zinc-200 font-mono">{activeProjectId || "None (Inbox)"}</span>
          </span>
          <span>
            Tasks Found: {tasks.length}
          </span>
       </div>
       
       <BoardClient initialTasks={tasks} activeProjectId={activeProjectId} />
    </div>
  );
}