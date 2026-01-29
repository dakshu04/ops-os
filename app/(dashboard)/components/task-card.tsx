import { useDraggable } from "@dnd-kit/core";
import { Task } from "@prisma/client";
import { Trash2, Gem, AlertCircle, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

// ----------------------------------------------------------------------
// 1. THE "CONFIG" PATTERN
// Instead of writing multiple "if" statements in the HTML, we create a
// configuration map. This is cleaner and easier to update later.
// ----------------------------------------------------------------------
const getPriorityConfig = (priority: string | null) => {
  switch (priority) {
    case "URGENT":
      return { icon: AlertCircle, color: "text-red-400 bg-red-400/10 border-red-400/20" };
    case "HIGH":
      return { icon: ArrowUp, color: "text-orange-400 bg-orange-400/10 border-orange-400/20" };
    case "MEDIUM":
      return { icon: ArrowRight, color: "text-blue-400 bg-blue-400/10 border-blue-400/20" };
    case "LOW":
      return { icon: ArrowDown, color: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20" };
    default:
      return { icon: ArrowRight, color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20" };
  }
};

export function TaskCard({ task, isOverlay, onDelete, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // 2. PREPARE DATA BEFORE RENDER
  // Get the icon and color class ready to use
  const priorityConfig = getPriorityConfig(task.priority);
  const PriorityIcon = priorityConfig.icon;

  return (
    <div
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-3 bg-zinc-900 border rounded-xl shadow-sm cursor-grab group select-none relative flex flex-col gap-2
        transition-all duration-200
        ${isOverlay ? "border-indigo-500 shadow-2xl rotate-2 cursor-grabbing z-50 scale-105" : "border-zinc-800 hover:border-zinc-700 hover:shadow-md"}
        ${task.isMilestone ? "border-l-4 border-l-indigo-500 bg-indigo-950/10" : ""}
      `}
    >
      {/* --- HEADER: ID & Actions --- */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 font-mono font-medium tracking-wider">
              OPS-{task.readableId}
            </span>
            {task.isMilestone && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px] font-bold rounded uppercase tracking-wide">
                    <Gem className="w-2.5 h-2.5" />
                    <span>Billing</span>
                </div>
            )}
         </div>
         
         {!isOverlay && onDelete && (
           <button 
             onPointerDown={(e) => {
               e.stopPropagation();
               onDelete(task.id);
             }}
             className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition-all"
           >
             <Trash2 className="w-3.5 h-3.5" />
           </button>
         )}
      </div>
      
      {/* --- TITLE --- */}
      <p className="text-[13px] text-zinc-200 font-medium leading-snug line-clamp-2">
        {task.title}
      </p>

      {/* --- FOOTER: Priority Badge --- */}
      <div className="flex items-center gap-2 mt-1">
        <div className={`
            flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold border
            ${priorityConfig.color}
        `}>
            <PriorityIcon className="w-3 h-3" />
            <span>{task.priority || "Medium"}</span>
        </div>
      </div>

    </div>
  );
}