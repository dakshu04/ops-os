"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createClientAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name) return { error: "Client Name is required" };

  try {
    // ---------------------------------------------------------
    // 1. FIX: Ensure User exists in Prisma before connecting Client
    // ---------------------------------------------------------
    await prisma.user.upsert({
      where: { email: authUser.email! },
      update: {}, // If they exist, do nothing
      create: {
        id: authUser.id, // Sync Supabase ID
        email: authUser.email!,
        name: authUser.user_metadata.full_name || "Unknown User",
      },
    });

    // 2. Create the Client (Now it will work because User exists)
    await prisma.client.create({
      data: {
        name,
        email,
        userId: authUser.id, // Links correctly now
      },
    });

    revalidatePath("/crm");
    return { success: true };
  } catch (error) {
    console.error("Error creating client:", error);
    // Return the actual error message so we can see it if it happens again
    return { error: `Database Error: ${(error as Error).message}` };
  }
}