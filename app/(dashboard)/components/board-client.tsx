"use client";

import { useState } from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor, closestCorners, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { Task, TaskStatus } from "@prisma/client";
import { Column } from "./column";
import { TaskCard } from "./task-card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTask, deleteTask } from "./actions";

const COLUMNS = [
  { id: "NEW", title: "New", color: "bg-blue-500" },
  { id: "BACKLOG", title: "Backlog", color: "bg-zinc-500" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-yellow-500" },
  { id: "DONE", title: "Done", color: "bg-green-500" },
];

export default function BoardClient({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  async function handleDelete(taskId: string) {
    // Optimistic Update (Remove from UI instantly)
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    // Call Server to delete permanently
    await deleteTask(taskId);
  }

  async function handleCreate() {
    // Call Server
    const result = await createTask();
    
    if (result.success && result.task) {
      // Optimistic Update (Add to UI instantly)
      setTasks((prev) => [...prev, result.task!]);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    if (COLUMNS.some((col) => col.id === overId)) {
      if (activeTask.status !== overId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, status: overId as TaskStatus } : t
          )
        );
      }
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full w-full bg-zinc-950 text-white">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-800/40 shrink-0">
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-100">Project Alpha</h1>
            <p className="text-zinc-500 text-xs mt-1 font-medium">Sprint 4 • Due Mar 04</p>
          </div>
          <div className="flex gap-2">
             <Button onClick={handleCreate} size="sm" className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-medium px-3 md:px-4 h-8 text-xs">
              <Plus className="w-3 h-3 md:mr-2" />
              <span className="hidden md:inline">New Issue</span>
              <span className="md:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* BOARD GRID */}
        <div className="flex-1 min-h-0 p-4 md:p-6 overflow-x-auto md:overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 h-full min-w-75">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                color={col.color}
                tasks={tasks.filter((t) => t.status === col.id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeId ? <TaskCard task={tasks.find((t) => t.id === activeId)!} isOverlay /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}