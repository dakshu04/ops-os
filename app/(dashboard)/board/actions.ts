/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) throw new Error("Unauthorized");

    // 1. Get the Project ID correctly from the hidden input
    const rawProjectId = formData.get("projectId") as string;
    const projectId = (!rawProjectId || rawProjectId === "") ? null : rawProjectId;
    
    // 2. Get the clean title (No more debug text)
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = (formData.get("priority") as any) || "MEDIUM";
    
    const newTask = await prisma.task.create({
      data: {
        title,         // <--- Storing the real title now
        description,
        priority,
        status: "NEW",
        userId: authUser.id,
        projectId: projectId, 
      },
    });

    revalidatePath("/board");
    return { success: true, task: newTask }; 

  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function deleteTask(taskId: string) {
    await prisma.task.delete({ where: { id: taskId } });
    revalidatePath("/board");
}

export async function updateTaskStatus(taskId: string, status: any) {
    await prisma.task.update({ 
        where: { id: taskId },
        data: { status }
    });
    revalidatePath("/board");
}

// ... inside app/(dashboard)/board/actions.ts

export async function updateTaskDetails(formData: FormData) {
  try {
    const taskId = formData.get("taskId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as any;

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        priority
      }
    });

    revalidatePath("/board");
    return { success: true, task: updatedTask };
  } catch (error) {
    console.error("Failed to update task", error);
    return { success: false, error: "Failed to update" };
  }
}