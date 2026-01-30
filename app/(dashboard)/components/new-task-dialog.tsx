"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { createTask } from "./actions";
import { Task } from "@prisma/client";

export function NewTaskDialog({ 
  projectId, 
  onTaskCreated 
}: { 
  projectId?: string, 
  onTaskCreated: (task: Task) => void 
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    // Explicitly append the Project ID if it exists
    if (projectId) {
        formData.append("projectId", projectId);
    }

    const result = await createTask(formData);

    setLoading(false);

    if (result.success && result.task) {
      setOpen(false);
      onTaskCreated(result.task);
    } else {
      alert("Error creating task");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4 mr-2" />
          New Issue
        </Button>
      </DialogTrigger>
      
      {/* FIX 1: max-h-[85vh] prevents it from being taller than the screen.
         FIX 2: flex-col lets us split Header, Body, and Footer clearly.
      */}
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col bg-zinc-950 border-zinc-800 text-zinc-100 p-0 gap-0">
        
        {/* HEADER (Fixed at top) */}
        <DialogHeader className="px-6 py-6 border-b border-zinc-800">
          <DialogTitle className="text-xl font-bold">Create New Issue</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Add a new task to your board.
          </DialogDescription>
        </DialogHeader>
        
        {/* SCROLLABLE BODY (This part scrolls if content is long) */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
            <form id="create-task-form" onSubmit={handleSubmit} className="space-y-5">
            
              {/* HIDDEN INPUT FOR PROJECT ID */}
              <input type="hidden" name="projectId" value={projectId || ""} />

              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-400 font-medium">Title</Label>
                {/* FIX 3: 'select-text' forces text selection to work */}
                <Input 
                    id="title" 
                    name="title" 
                    placeholder="e.g. Fix Navigation Bar" 
                    className="bg-zinc-900 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-zinc-100 select-text" 
                    required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-zinc-400 font-medium">Priority</Label>
                    <Select name="priority" defaultValue="MEDIUM">
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-400 font-medium">Description</Label>
                {/* FIX 3: 'select-text' + Min Height for comfort */}
                <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Add details about this task... (Markdown supported)" 
                    className="bg-zinc-900 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20 text-zinc-100 min-h-[150px] font-mono text-sm select-text" 
                />
                <p className="text-xs text-zinc-500">
                    Tip: You can use Markdown (`#`, `**bold**`, `- list`) here.
                </p>
              </div>

            </form>
        </div>

        {/* FOOTER (Fixed at bottom) */}
        <DialogFooter className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
            <Button 
                variant="ghost" 
                onClick={() => setOpen(false)} 
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
                Cancel
            </Button>
            <Button 
                type="submit" 
                form="create-task-form" // Connects button to the form above
                className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-[100px]"
                disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Issue
            </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}