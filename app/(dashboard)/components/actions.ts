"use server";

import { prisma } from "@/lib/prisma";
import { Task, TaskStatus } from "@prisma/client";

export async function createTask(): Promise<{ success: boolean; task?: Task; error?: string }> {
  try {
    const task = await prisma.task.create({
      data: {
        title: "New Task",
        status: "NEW" as TaskStatus,
        priority: "NO_PRIORITY",
      },
    });
    return { success: true, task };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

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
