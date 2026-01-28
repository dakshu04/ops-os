"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { createTask } from "./actions"; 
import { Task } from "@prisma/client"; // Import Task type
interface NewTaskDialogProps {
  onTaskCreated: (task: Task) => void;
}
export function NewTaskDialog({ onTaskCreated }: NewTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createTask(formData);
    if (result.success && result.task) {
            // 3. PASS THE DATA BACK TO THE BOARD
            onTaskCreated(result.task); 
            setOpen(false);
        }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-medium px-3 md:px-4 h-8 text-xs">
          <Plus className="w-3 h-3 md:mr-2" />
          <span className="hidden md:inline">New Issue</span>
          <span className="md:hidden">New</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          
          {/* TITLE */}
          <div className="grid gap-2">
            <label htmlFor="title" className="text-xs font-medium text-zinc-400">Title</label>
            <Input id="title" name="title" placeholder="e.g. Fix Navigation Bug" className="bg-zinc-900 border-zinc-800 focus:ring-indigo-500" required />
          </div>

          {/* DESCRIPTION */}
          <div className="grid gap-2">
            <label htmlFor="description" className="text-xs font-medium text-zinc-400">Description</label>
            <Textarea id="description" name="description" placeholder="Add details..." className="bg-zinc-900 border-zinc-800 min-h-[100px]" />
          </div>

          {/* PRIORITY */}
          <div className="grid gap-2">
            <label className="text-xs font-medium text-zinc-400">Priority</label>
            <Select name="priority" defaultValue="MEDIUM">
              <SelectTrigger className="bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* MILESTONE CHECKBOX */}
          <div className="flex items-center space-x-2 mt-2 p-3 border border-indigo-500/30 bg-indigo-500/10 rounded-md">
            <Checkbox id="isMilestone" name="isMilestone" value="true" className="border-indigo-400 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white" />
            <label
                htmlFor="isMilestone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-indigo-200"
            >
                Mark as Billing Milestone
                <p className="text-xs text-indigo-400 mt-1">
                Triggers an invoice when moved to Done.
                </p>
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? "Creating..." : "Create Issue"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}