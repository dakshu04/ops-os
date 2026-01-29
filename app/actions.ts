"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function switchProject(projectId: string) {
  const cookieStore = await cookies();
  
  // Save the selection for 30 days
  cookieStore.set("ops_active_project", projectId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, 
    httpOnly: true,
  });

  // Refresh the page so the Board updates
  redirect("/board"); 
}