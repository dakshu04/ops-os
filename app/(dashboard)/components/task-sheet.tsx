/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Task } from "@prisma/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Flag, 
  Hash, 
  Circle, 
  Layout, 
  Pencil,
  Trash2,
  Save,
  X,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateTaskDetails } from "../board/actions";
import { deleteTask } from "./actions";
import { MarkdownViewer } from "./markdown-viewer";

interface TaskSheetProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  // 👇 NEW: Callbacks to notify the parent Board
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

// Helper: Priority Colors
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

export function TaskSheet({ task, isOpen, onClose, onTaskUpdated, onTaskDeleted }: TaskSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Local state for the form
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedPriority, setEditedPriority] = useState("");

  if (!task) return null;

  function startEditing() {
    setEditedTitle(task!.title);
    setEditedDesc(task!.description || "");
    setEditedPriority(task!.priority);
    setIsEditing(true);
  }

  async function handleSave() {
    setLoading(true);
    const formData = new FormData();
    formData.append("taskId", task!.id);
    formData.append("title", editedTitle);
    formData.append("description", editedDesc);
    formData.append("priority", editedPriority);

    const result = await updateTaskDetails(formData);
    
    setLoading(false);
    if (result.success) {
      // 👇 NOTIFY PARENT: Update the UI instantly
      onTaskUpdated({ 
          ...task!, 
          title: editedTitle, 
          description: editedDesc, 
          priority: editedPriority as any 
      });
      setIsEditing(false);
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this task? This cannot be undone.")) {
        setLoading(true);
        await deleteTask(task!.id);
        
        // 👇 NOTIFY PARENT: Remove from UI instantly
        onTaskDeleted(task!.id);

        setLoading(false);
        onClose(); 
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
        if (!open) setIsEditing(false); 
        onClose();
    }}>
      <SheetContent className="w-[400px] sm:w-[600px] bg-zinc-950 border-l border-zinc-800 text-zinc-100 p-0 gap-0 overflow-y-auto sm:max-w-[600px] flex flex-col h-full">
        
        {/* --- HEADER --- */}
        <SheetHeader className="px-6 py-6 border-b border-zinc-800/60 bg-zinc-900/20 text-left space-y-4">
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs uppercase tracking-wider bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                        <Hash className="w-3 h-3" />
                        <span>OPS-{task.readableId}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {!isEditing ? (
                        <>
                            <Button 
                                variant="ghost" size="icon" 
                                onClick={startEditing}
                                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                                variant="ghost" size="icon" 
                                onClick={handleDelete}
                                className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button 
                                variant="ghost" size="sm" 
                                onClick={() => setIsEditing(false)}
                                className="text-zinc-400 hover:text-white"
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button 
                                size="sm" 
                                onClick={handleSave}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                Save
                            </Button>
                        </>
                    )}
                    <Button 
                         variant="ghost" size="icon" onClick={onClose}
                         className="h-8 w-8 text-zinc-500 hover:text-white ml-2"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <SheetTitle className={isEditing ? "sr-only" : "text-2xl font-bold leading-snug text-zinc-50 tracking-tight"}>
                {task.title}
            </SheetTitle>

            {isEditing && (
                <Input 
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-xl font-bold bg-zinc-900 border-zinc-700 h-12 text-zinc-100"
                    placeholder="Task Title"
                    autoFocus
                />
            )}
        </SheetHeader>

        {/* --- METADATA --- */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 px-6 py-6 border-b border-zinc-800/60 shrink-0">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Status</label>
                <div className="flex items-center gap-2 p-2 rounded-md bg-zinc-900/50 border border-zinc-800/50 w-fit min-w-[140px]">
                    <Circle className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-zinc-200 capitalize">
                        {task.status.replace("_", " ").toLowerCase()}
                    </span>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Priority</label>
                {isEditing ? (
                     <Select value={editedPriority} onValueChange={setEditedPriority}>
                        <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-700 h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                             <SelectItem value="LOW">Low</SelectItem>
                             <SelectItem value="MEDIUM">Medium</SelectItem>
                             <SelectItem value="HIGH">High</SelectItem>
                             <SelectItem value="URGENT">Urgent</SelectItem>
                        </SelectContent>
                     </Select>
                ) : (
                    <div className={cn(
                        "flex items-center gap-2 p-2 rounded-md border w-fit min-w-[140px]",
                        getPriorityColor(task.priority)
                    )}>
                        <Flag className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">
                            {(task.priority || "Normal").toLowerCase()}
                        </span>
                    </div>
                )}
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

        {/* --- DESCRIPTION --- */}
        <div className="flex-1 overflow-y-auto px-6 py-8 bg-zinc-950/50">
            <h3 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-indigo-500 rounded-full"/>
                Description
            </h3>
            
            {isEditing ? (
                 <Textarea 
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    className="min-h-[300px] bg-zinc-900 border-zinc-800 focus:border-indigo-500 font-mono text-sm leading-relaxed text-zinc-200"
                    placeholder="Write with Markdown..."
                 />
            ) : (
                <div className="min-h-[100px]">
                    {task.description ? (
                        <MarkdownViewer content={task.description} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-zinc-600 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                            <span className="text-sm">No description provided</span>
                        </div>
                    )}
                </div>
            )}
        </div>

      </SheetContent>
    </Sheet>
  );
}