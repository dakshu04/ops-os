import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserNav } from "./components/user-nav";
import { ProjectSwitcher } from "./components/project-switcher"; // <--- Import it
import { prisma } from "@/lib/prisma"; // <--- Import Prisma

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // FETCH PROJECTS for this user
  const projects = await prisma.project.findMany({
    where: {
      client: {
        userId: user.id // Fetch projects where the CLIENT belongs to YOU
      }
    },
    include: {
      client: true // Include client name
    }
  });

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-950/50 backdrop-blur-xl">
        
        {/* HEADER: PROJECT SWITCHER */}
        <div className="p-4 border-b border-zinc-800/50">
           <ProjectSwitcher projects={projects} />
        </div>
        
        {/* NAV LINKS (Placeholder for now) */}
        <div className="flex-1 p-4 space-y-1">
            <div className="text-xs font-semibold text-zinc-500 mb-2 px-2 uppercase tracking-wider">
                Menu
            </div>
            {/* We will add real links later */}
            <div className="px-2 py-1.5 text-sm text-zinc-300 bg-zinc-900/50 rounded-md cursor-pointer">
                Board
            </div>
            <div className="px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-300 cursor-pointer">
                Clients (CRM)
            </div>
            <div className="px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-300 cursor-pointer">
                Settings
            </div>
        </div>

        {/* FOOTER: USER PROFILE */}
        <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/20">
            <div className="flex items-center justify-between">
                 <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-zinc-200 truncate">
                        {user.user_metadata.full_name}
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
        {/* Grid Background for Main Area */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative flex-1 overflow-auto">
             {children}
        </div>
      </main>
    </div>
  );
}