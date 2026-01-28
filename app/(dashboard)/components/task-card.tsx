import { useDraggable } from "@dnd-kit/core";
import { Task } from "@prisma/client";
import { Trash2 } from "lucide-react"; // Import Icon

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onDelete?: (id: string) => void; // Add delete prop
  onClick?: () => void;
}

export function TaskCard({ task, isOverlay, onDelete, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-3 bg-zinc-900 border rounded-md shadow-sm cursor-grab group select-none relative
        ${isOverlay ? "border-indigo-500 shadow-xl rotate-2 cursor-grabbing z-50" : "border-zinc-800 hover:border-zinc-700"}
      `}
    >
      <div className="flex items-center justify-between mb-1">
         <span className="text-xs text-zinc-500 font-mono">OPS-{task.readableId}</span>
         
         {/* DELETE BUTTON (Hidden by default, shown on hover) */}
         {!isOverlay && onDelete && (
           <button 
             onPointerDown={(e) => {
               // Prevent drag start when clicking delete
               e.stopPropagation();
               onDelete(task.id);
             }}
             className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition-all"
           >
             <Trash2 className="w-3 h-3" />
           </button>
         )}
      </div>
      
      <p className="text-sm text-zinc-200 font-medium leading-tight line-clamp-2">
        {task.title}
      </p>

      {task.labels && task.labels.length > 0 && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {task.labels.map((label) => (
            <span key={label} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}