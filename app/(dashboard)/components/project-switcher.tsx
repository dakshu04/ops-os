"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Project = {
  id: string;
  name: string;
  client: {
    name: string;
  };
};

export function ProjectSwitcher({ projects }: { projects: Project[] }) {
  // Mock current project for now (we will make this real later)
  const activeProject = projects[0] || { name: "No Project", client: { name: "Ops-OS" } };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full hover:bg-zinc-800/50 p-2 rounded-lg transition-colors outline-none">
        <div className="flex items-center gap-3">
          {/* Logo Box */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-white font-bold">
            {activeProject.client.name[0]}
          </div>
          
          {/* Text Info */}
          <div className="flex flex-col items-start text-sm">
            <span className="font-semibold text-zinc-200 leading-none">
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
            <DropdownMenuItem key={project.id} className="cursor-pointer focus:bg-zinc-900 focus:text-white gap-2">
                <div className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                    {project.client.name[0]}
                </div>
                <span>{project.name}</span>
            </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-zinc-800" />
        
        <DropdownMenuItem className="cursor-pointer text-indigo-400 focus:text-indigo-300 focus:bg-indigo-500/10 gap-2">
            <div className="h-6 w-6 rounded border border-dashed border-indigo-500/30 flex items-center justify-center">
                <Plus className="h-3 w-3" />
            </div>
            <span>Create Project...</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}