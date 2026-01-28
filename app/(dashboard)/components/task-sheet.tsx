"use client";

import { Task } from "@prisma/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Flag, 
  Hash, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Layout, 
  Gem 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskSheetProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

// 🎨 Helper: Get Color based on Priority (Safe Version)
const getPriorityColor = (priority: string | null | undefined) => {
  if (!priority) return "bg-zinc-800 text-zinc-400";
  
  switch (priority) {
    case "URGENT": return "bg-red-500/10 text-red-400 border-red-500/20";
    case "HIGH": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "MEDIUM": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "LOW": return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    default: return "bg-zinc-800 text-zinc-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "DONE": return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    case "IN_PROGRESS": return <Clock className="w-4 h-4 text-yellow-400" />;
    default: return <Circle className="w-4 h-4 text-zinc-500" />;
  }
};

export function TaskSheet({ task, isOpen, onClose }: TaskSheetProps) {
  if (!task) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[600px] bg-zinc-950 border-l border-zinc-800 text-zinc-100 p-0 gap-0 overflow-y-auto sm:max-w-[600px]">
        
        {/* --- HEADER SECTION --- */}
        {/* FIX: We use SheetHeader and SheetTitle to satisfy accessibility */}
        <SheetHeader className="px-6 py-6 border-b border-zinc-800/60 bg-zinc-900/20 text-left">
            
            {/* Breadcrumb / ID */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs uppercase tracking-wider bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    <Hash className="w-3 h-3" />
                    <span>OPS-{task.readableId}</span>
                </div>
                
                {task.isMilestone && (
                    <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                        <Gem className="w-3 h-3" />
                        <span>Billing Milestone</span>
                    </div>
                )}
            </div>

            {/* Title (FIXED: Using SheetTitle instead of h2) */}
            <SheetTitle className="text-2xl font-bold leading-snug text-zinc-50 tracking-tight">
                {task.title}
            </SheetTitle>
        </SheetHeader>

        {/* --- METADATA GRID --- */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 px-6 py-6 border-b border-zinc-800/60">
            
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Status</label>
                <div className="flex items-center gap-2 p-2 rounded-md bg-zinc-900/50 border border-zinc-800/50 w-fit min-w-[140px]">
                    {getStatusIcon(task.status)}
                    <span className="text-sm font-medium text-zinc-200 capitalize">
                        {task.status.replace("_", " ").toLowerCase()}
                    </span>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Priority</label>
                <div className={cn(
                    "flex items-center gap-2 p-2 rounded-md border w-fit min-w-[140px]",
                    getPriorityColor(task.priority)
                )}>
                    <Flag className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">
                        {(task.priority || "Normal").toLowerCase()}
                    </span>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Project</label>
                <div className="flex items-center gap-2 p-2">
                    <Layout className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-300">Project Alpha</span>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Due Date</label>
                <div className="flex items-center gap-2 p-2">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-400 italic">No date set</span>
                </div>
            </div>
        </div>

        {/* --- DESCRIPTION SECTION --- */}
        <div className="px-6 py-8 h-full bg-zinc-950/50">
            <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-indigo-500 rounded-full"/>
                Description
            </h3>
            
            <div className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-7">
                {task.description ? (
                    <div className="whitespace-pre-wrap font-light text-[15px]">
                        {task.description}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-zinc-600 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                        <span className="text-sm">No description provided</span>
                    </div>
                )}
            </div>
        </div>

      </SheetContent>
    </Sheet>
  );
}