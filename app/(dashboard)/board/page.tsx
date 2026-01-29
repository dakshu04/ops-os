import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BoardClient from "../components/board-client";


export default async function BoardPage() {
  // 1. Verify Session
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // 2. Fetch Tasks ONLY for this User
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id, // <--- Security Filter
    },
    orderBy: {
      createdAt: "desc", // Show newest first
    },
  });

  // 3. Render Board
  return <BoardClient initialTasks={tasks} />;
}