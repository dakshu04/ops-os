import { useDroppable } from "@dnd-kit/core";
import { Task } from "@prisma/client";
import { TaskCard } from "./task-card";

interface ColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onDelete?: (taskId: string) => Promise<void>;
}

export function Column({ id, title, color, tasks, onDelete }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-sm font-semibold text-zinc-200">{title}</span>
        </div>
        <span className="text-xs text-zinc-500 font-mono">{tasks.length}</span>
      </div>

      {/* Drop Zone */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto bg-zinc-900/10 rounded-xl border border-zinc-800/30 p-2 space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
        {/* Invisible spacer so you can drop at the bottom */}
        <div className="h-12 w-full" />
      </div>
    </div>
  );
}