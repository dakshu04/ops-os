"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask() {
  try {
    // 1. Ensure User Exists
    const user = await prisma.user.upsert({
      where: { email: "demo@ops-os.com" },
      update: {},
      create: { email: "demo@ops-os.com", name: "Demo User", id: "user-123" }
    });

    // 2. Create Task
    const newTask = await prisma.task.create({
      data: {
        title: "New Task " + Math.floor(Math.random() * 1000),
        status: "NEW",
        priority: "MEDIUM",
        userId: user.id,
      },
    });

    revalidatePath("/board");
    // CRITICAL: Return the task so the Client can render it instantly!
    return { success: true, task: newTask };

  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: String(error) };
  }
}

// --- NEW DELETE ACTION ---
export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath("/board");
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}