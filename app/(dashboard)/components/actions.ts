"use server";

import { prisma } from "@/lib/prisma";
import { Task, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Priority } from "@prisma/client";

export async function createTask(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = (formData.get("priority") as Priority) || "MEDIUM";
    // Checkbox value is "true" if checked, null if not
    const isMilestone = formData.get("isMilestone") === "true"; 

    // Seed User (Temp)
    const user = await prisma.user.upsert({
      where: { email: "demo@ops-os.com" },
      update: {},
      create: { email: "demo@ops-os.com", name: "Demo User", id: "user-123" }
    });

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status: "NEW",
        userId: user.id,
        isMilestone,
      },
    });

    revalidatePath("/board");
    return { success: true, task: newTask };

  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: String(error) };
  }
}
// ... keep existing deleteTask / updateTaskStatus

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete task:", error);
    return { success: false, error: "Failed to delete task" };
  }
}

// ... keep imports and existing actions (createTask, deleteTask)

// --- NEW UPDATE ACTION ---

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });
    revalidatePath("/board");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: String(error) };
  }
}