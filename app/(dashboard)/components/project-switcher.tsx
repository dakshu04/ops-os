"use client";

import { ChevronsUpDown, Check, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewProjectDialog } from "./new-project-dialog";
import { switchProject } from "@/app/actions";
import { deleteProjectAction } from "../action";

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
  
  // Handle the "Empty State" safely
  const activeProject = projects.find(p => p.id === activeProjectId) 
    || projects[0] 
    || { id: "", name: "No Project", client: { name: "Ops-OS" } };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full hover:bg-zinc-800/50 p-2 rounded-lg transition-colors outline-none group text-left">
        <div className="flex items-center gap-3">
          {/* Active Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-white font-bold shadow-indigo-500/20 shadow-lg shrink-0">
            {activeProject.client.name[0]}
          </div>
          
          {/* Active Label (Client Name top, Project bottom) */}
          <div className="flex flex-col items-start text-sm overflow-hidden">
            <span className="font-semibold text-zinc-200 leading-none group-hover:text-white transition-colors truncate w-full">
                {activeProject.client.name}
            </span>
            <span className="text-xs text-zinc-500 mt-1 leading-none truncate w-full">
                {activeProject.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-zinc-500 opacity-50 shrink-0" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-zinc-950 border-zinc-800 text-zinc-300" align="start">
        <DropdownMenuLabel className="text-xs font-normal text-zinc-500 uppercase tracking-wider">
            Switch Project
        </DropdownMenuLabel>
        
        {projects.map((project) => (
            <div key={project.id} className="relative group flex items-center">
                <DropdownMenuItem 
                    onClick={() => switchProject(project.id)} 
                    className="cursor-pointer focus:bg-zinc-900 focus:text-white gap-3 flex-1 py-2"
                >
                    {/* List Item Avatar (Smaller) */}
                    <div className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-medium shrink-0">
                        {project.client.name[0]}
                    </div>
                    
                    {/* 👇 THE FIX: Show BOTH names clearly */}
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-sm font-medium text-zinc-200 truncate leading-tight">
                            {project.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 truncate leading-tight mt-0.5">
                            {project.client.name}
                        </span>
                    </div>

                    {/* Checkmark if active */}
                    {project.id === activeProject.id && <Check className="w-3 h-3 text-indigo-400 shrink-0" />}
                </DropdownMenuItem>
                
                {/* Delete Button (Only visible on hover) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); 
                        if(confirm(`Delete project "${project.name}"? This will delete all tasks.`)) {
                             deleteProjectAction(project.id);
                        }
                    }}
                    className="absolute right-2 p-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    title="Delete Project"
                >
                    <Trash2 className="w-3 h-3" />
                </button>
            </div>
        ))}

        <DropdownMenuSeparator className="bg-zinc-800" />
        
        <DropdownMenuItem 
            className="p-0 focus:bg-zinc-900 focus:text-white" 
            onSelect={(e) => e.preventDefault()} 
        >
             <div className="w-full px-2 py-1.5">
                {/* Passed clients prop correctly */}
                <NewProjectDialog clients={clients} />
             </div>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}