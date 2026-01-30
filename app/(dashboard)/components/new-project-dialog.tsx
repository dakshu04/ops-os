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
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { createProjectAction } from "../action";

type Client = {
  id: string;
  name: string;
};

export function NewProjectDialog({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createProjectAction(formData);

    setLoading(false);

    if (result.success) {
      setOpen(false);
    } else {
      alert("Error creating project");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer w-full h-full">
            <div className="h-6 w-6 rounded border border-dashed border-indigo-500/30 flex items-center justify-center">
                <Plus className="h-3 w-3 text-indigo-400" />
            </div>
            <span className="text-indigo-400">Create Project...</span>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Start a new project for one of your clients.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          
          <div className="space-y-2">
            <Label className="text-zinc-400">Client</Label>
            <Select name="clientId" required>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:border-indigo-500">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                        {client.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-400">Project Name</Label>
            {/* 👇 THE FIX IS HERE 👇 */}
            <Input 
                id="name" 
                name="name" 
                placeholder="Website Redesign" 
                className="bg-zinc-900 border-zinc-800 focus:border-indigo-500" 
                required 
                onKeyDown={(e) => e.stopPropagation()} 
            />
          </div>

          <DialogFooter>
            <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white w-full"
                disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}