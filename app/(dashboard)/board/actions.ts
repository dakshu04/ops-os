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

    // 1. Get the Project ID from the form
    const rawProjectId = formData.get("projectId") as string;
    // Handle empty strings (Inbox) vs real IDs
    const projectId = (!rawProjectId || rawProjectId === "") ? null : rawProjectId;

    // DEBUG LOGGING: Look at your VS Code Terminal when you create a task!
    console.log("------------------------------------------------");
    console.log("📝 Creating Task...");
    console.log("🔹 User ID:", authUser.id);
    console.log("🔹 Incoming Project ID (Raw):", rawProjectId);
    console.log("🔹 Saving with Project ID:", projectId);
    console.log("------------------------------------------------");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = (formData.get("priority") as any) || "MEDIUM";
    
    // 2. Create the task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status: "NEW",
        userId: authUser.id,
        projectId: projectId, // <--- Using the variable from the form
      },
    });

    // 3. Revalidate the board
    revalidatePath("/board");

    // 4. CRITICAL: Return the actual task so the UI can update!
    return { success: true, task: newTask }; 

  } catch (error) {
    console.error("❌ Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

// Keep your other functions (deleteTask, updateTaskStatus) as they are...
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