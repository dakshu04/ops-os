"use server";

import { prisma } from "@/lib/prisma";
import { Task, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Priority } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";

export async function createTask(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = (formData.get("priority") as Priority) || "MEDIUM";
    // Checkbox value is "true" if checked, null if not
    const isMilestone = formData.get("isMilestone") === "true"; 
    const projectId = formData.get("projectId") as string | null;

    // Seed User (Temp)
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      throw new Error("Unauthorized: Please log in first.");
    }

    const user = await prisma.user.upsert({
      where: { email: authUser.email! },
      update: {},
      create: { 
        id: authUser.id, // <--- CRITICAL: Sync IDs
        email: authUser.email!, 
        name: authUser.user_metadata.full_name || "Unknown User"
      }
    });


    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status: "NEW",
        userId: user.id,
        isMilestone,
        projectId: projectId || null,
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
    revalidatePath("/board");
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