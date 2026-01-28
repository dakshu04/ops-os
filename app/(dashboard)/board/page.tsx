
import { prisma } from "@/lib/prisma";
import BoardClient from "../components/board-client";

// Force dynamic so we always see new tasks
export const dynamic = 'force-dynamic';

export default async function BoardPage() {
  // 1. Fetch Real Data from DB
  const tasks = await prisma.task.findMany({
    orderBy: {
      position: 'asc', // Sort by drag position
    },
  });

  // 2. Pass data to Client
  return <BoardClient initialTasks={tasks} />;
}