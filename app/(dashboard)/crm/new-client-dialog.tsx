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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { createClientAction } from "./actions"; // Import the action
import { toast } from "sonner"; // Assuming you have sonner or use standard alert

export function NewClientDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createClientAction(formData);

    setLoading(false);

    if (result.success) {
      setOpen(false); // Close modal
    } else {
      alert("Error creating client"); // Simple fallback
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new client profile to manage their projects.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-400">Company Name</Label>
            <Input 
                id="name" 
                name="name" 
                placeholder="Acme Corp" 
                className="bg-zinc-900 border-zinc-800 focus:border-indigo-500" 
                required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-400">Contact Email (Optional)</Label>
            <Input 
                id="email" 
                name="email" 
                placeholder="contact@acme.com" 
                className="bg-zinc-900 border-zinc-800 focus:border-indigo-500" 
            />
          </div>

          <DialogFooter>
            <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white w-full"
                disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}