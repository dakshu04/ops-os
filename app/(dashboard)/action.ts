"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createProjectAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const clientId = formData.get("clientId") as string;

  if (!name || !clientId) return { error: "Name and Client are required" };

  try {
    await prisma.project.create({
      data: {
        name,
        clientId,
        status: "ACTIVE"
      },
    });

    revalidatePath("/board"); // Refresh to show new project
    return { success: true };
  } catch (error) {
    return { error: "Failed to create project" };
  }
}

export async function deleteProjectAction(projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
      // 1. Delete the Project
      await prisma.project.delete({
          where: { id: projectId }
      });

      // 2. If we deleted the ACTIVE project, clear the cookie
      const cookieStore = await cookies();
      const activeId = cookieStore.get("ops_active_project")?.value;
      
      if (activeId === projectId) {
          cookieStore.delete("ops_active_project");
      }

      revalidatePath("/");
  } catch (e) {
      console.error(e);
  }
}