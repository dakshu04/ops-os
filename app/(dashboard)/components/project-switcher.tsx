"use client";

import { ChevronsUpDown, Plus, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewProjectDialog } from "./new-project-dialog";
import { switchProject } from "@/app/actions"; // <--- Import the action

type Client = { id: string; name: string };
type Project = { id: string; name: string; client: { name: string } };

export function ProjectSwitcher({ 
  projects, 
  clients, 
  activeProjectId 
}: { 
  projects: Project[], 
  clients: Client[], 
  activeProjectId?: string 
}) {
  
  // Find the active object, or default to the first one, or a placeholder
  const activeProject = projects.find(p => p.id === activeProjectId) 
    || projects[0] 
    || { id: "", name: "No Project", client: { name: "Ops-OS" } };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full hover:bg-zinc-800/50 p-2 rounded-lg transition-colors outline-none group text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-white font-bold shadow-indigo-500/20 shadow-lg">
            {activeProject.client.name[0]}
          </div>
          <div className="flex flex-col items-start text-sm">
            <span className="font-semibold text-zinc-200 leading-none group-hover:text-white transition-colors">
                {activeProject.client.name}
            </span>
            <span className="text-xs text-zinc-500 mt-1 leading-none">
                {activeProject.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-zinc-500 opacity-50" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-zinc-950 border-zinc-800 text-zinc-300" align="start">
        <DropdownMenuLabel className="text-xs font-normal text-zinc-500 uppercase tracking-wider">
            Switch Project
        </DropdownMenuLabel>
        
        {projects.map((project) => (
            <DropdownMenuItem 
                key={project.id} 
                onClick={() => switchProject(project.id)} // <--- The Magic
                className="cursor-pointer focus:bg-zinc-900 focus:text-white gap-2"
            >
                <div className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                    {project.client.name[0]}
                </div>
                <span className="flex-1 truncate">{project.name}</span>
                {/* Checkmark if active */}
                {project.id === activeProject.id && <Check className="w-3 h-3 text-indigo-400" />}
            </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-zinc-800" />
        
        <DropdownMenuItem 
            className="p-0 focus:bg-zinc-900 focus:text-white" 
            onSelect={(e) => e.preventDefault()} 
        >
             <div className="w-full px-2 py-1.5">
                <NewProjectDialog clients={clients} />
             </div>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}