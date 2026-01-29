import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserNav } from "./components/user-nav";
import { ProjectSwitcher } from "./components/project-switcher";
import { prisma } from "@/lib/prisma";
import Link from "next/link"; // <--- Added this import
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. FETCH PROJECTS for this user
  const projects = await prisma.project.findMany({
    where: {
      client: {
        userId: user.id, // Fetch projects where the CLIENT belongs to YOU
      },
    },
    include: {
      client: true, // Include client name
    },
  });

  // 2. FETCH CLIENTS (NEW)
  const clients = await prisma.client.findMany({
    where: { userId: user.id },
    select: { id: true, name: true }, // We only need ID and Name
  });

  // READ THE COOKIE
  const cookieStore = await cookies();
  const activeProjectId = cookieStore.get("ops_active_project")?.value


  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-950/50 backdrop-blur-xl">
        {/* HEADER: PROJECT SWITCHER */}
        <div className="p-4 border-b border-zinc-800/50">
          <ProjectSwitcher projects={projects} clients={clients} activeProjectId={activeProjectId}/>
        </div>

        {/* NAV LINKS */}
        <div className="flex-1 p-4 space-y-1">
          <div className="text-xs font-semibold text-zinc-500 mb-2 px-2 uppercase tracking-wider">
            Menu
          </div>

          {/* Board Link */}
          <Link
            href="/board"
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800/50 hover:text-white rounded-md cursor-pointer transition-all"
          >
            Board
          </Link>

          {/* CRM Link */}
          <Link
            href="/crm"
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-md cursor-pointer transition-all"
          >
            Clients (CRM)
          </Link>

          {/* Settings Link */}
          <Link
            href="/settings"
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-md cursor-pointer transition-all"
          >
            Settings
          </Link>
        </div>

        {/* FOOTER: USER PROFILE */}
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/20">
          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-zinc-200 truncate">
                {user.user_metadata.full_name || "User"}
              </span>
              <span className="text-[10px] text-zinc-500 truncate">
                {user.email}
              </span>
            </div>
            <UserNav user={user} />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950 relative">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}