"use client";

import { useState, useEffect } from "react";
import { 
  DndContext, 
  DragOverlay, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  TouchSensor, 
  closestCorners, 
  DragStartEvent, 
  DragEndEvent 
} from "@dnd-kit/core";
import { Task, TaskStatus } from "@prisma/client";
import { Column } from "./column";
import { TaskCard } from "./task-card";
import { Plus } from "lucide-react"; // Kept if you need it elsewhere, though used in Dialog
import { createTask, deleteTask, updateTaskStatus } from "./actions";
import { NewTaskDialog } from "./new-task-dialog";
import { TaskSheet } from "./task-sheet";

const COLUMNS = [
  { id: "NEW", title: "New", color: "bg-blue-500" },
  { id: "BACKLOG", title: "Backlog", color: "bg-zinc-500" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-yellow-500" },
  { id: "DONE", title: "Done", color: "bg-green-500" },
];

export default function BoardClient({ 
  initialTasks, 
  activeProjectId, 
  projectName, 
  clientName 
}: { 
  initialTasks: Task[], 
  activeProjectId?: string, 
  projectName?: string, 
  clientName?: string 
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // FIX: Use setTimeout to break the synchronous chain
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50); // Small delay ensures hydration is complete
    return () => clearTimeout(timer);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  async function handleDelete(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    await deleteTask(taskId);
  }

  // Note: handleCreate is inside the Dialog component now, but keeping this logic safe
  async function handleCreate() {
    const result = await createTask(new FormData());
    if (result.success && result.task) {
      setTasks((prev) => [...prev, result.task!]);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    let overColumnId = COLUMNS.find(col => col.id === overId)?.id;

    if (!overColumnId) {
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) {
        overColumnId = overTask.status;
      }
    }

    if (overColumnId && activeTask.status !== overColumnId) {
        const newStatus = overColumnId as TaskStatus;

        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, status: newStatus } : t
          )
        );

        await updateTaskStatus(activeId, newStatus);
        console.log(`Saved: ${activeId} -> ${newStatus}`);
    }
  }

  // Prevent Hydration Error
  if (!mounted) return null;

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full w-full bg-zinc-950 text-white">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-800/40 shrink-0">
          <div>
            {/* 👇 UPDATED: Dynamic Client Name */}
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">
                {clientName || "Personal"}
            </div>
            
            {/* 👇 UPDATED: Dynamic Project Name */}
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-100">
                {projectName || "Inbox"}
            </h1>
            
            <p className="text-zinc-500 text-xs mt-1 font-medium">Sprint 4 • Due Mar 04</p>
          </div>
          
          <div className="flex gap-2">
             <NewTaskDialog 
                projectId={activeProjectId} // <--- PASS THE ID HERE
                onTaskCreated={(newTask) => {
                    setTasks((prev) => [...prev, newTask]);
                }} 
             />
          </div>
        </div>

        {/* BOARD GRID */}
        <div className="flex-1 min-h-0 p-4 md:p-6 overflow-x-auto md:overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 h-full min-w-[300px]">
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                title={col.title}
                color={col.color}
                tasks={tasks.filter((t) => t.status === col.id)}
                onDelete={handleDelete}
                onTaskClick={setSelectedTask}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeId ? <TaskCard task={tasks.find((t) => t.id === activeId)!} isOverlay /> : null}
        </DragOverlay>
      </div>
      <TaskSheet
          task={selectedTask} 
          isOpen={!!selectedTask} 
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={(updatedTask) => {
            setTasks((prev) => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
          }}
          onTaskDeleted={(taskId) => {
            setTasks((prev) => prev.filter(t => t.id !== taskId));
            setSelectedTask(null);
          }}
      />
    </DndContext>
  );
}