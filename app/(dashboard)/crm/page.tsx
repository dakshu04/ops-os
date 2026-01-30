import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NewClientDialog } from "./new-client-dialog";
import { Building2, Mail, Trash2 } from "lucide-react";
import { deleteClientAction } from "./actions"; // We will create this next
import { Button } from "@/components/ui/button";

export default async function CRMPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const clients = await prisma.client.findMany({
    where: { userId: user.id },
    include: { _count: { select: { projects: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Clients</h1>
            <p className="text-zinc-400 mt-1">Manage your clients and their projects.</p>
        </div>
        <NewClientDialog />
      </div>

      {clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white">No clients found</h3>
            <p className="text-zinc-500 text-sm max-w-xs text-center mt-2">
                Add your first client to start creating projects.
            </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
                <div key={client.id} className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group relative">
                    <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/20">
                            {client.name[0]}
                        </div>
                        {/* DELETE BUTTON */}
                        <form action={deleteClientAction}>
                           <input type="hidden" name="clientId" value={client.id} />
                           <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        </form>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-zinc-200">{client.name}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{client.email || "No email"}</span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                        <span>Joined {new Date(client.createdAt).toLocaleDateString()}</span>
                        <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                            {client._count.projects} Projects
                        </span>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}