"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kanban, Settings, Users, BarChart3, Command } from "lucide-react";
import { cn } from "@/lib/utils"; // This comes with shadcn

const links = [
  { name: "Board", href: "/board", icon: Kanban },
//   { name: "Leads", href: "/leads", icon: Users },
//   { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 border-r border-zinc-800 bg-zinc-950 flex-col h-full">
      {/* 1. Header / Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
        <div className="flex items-center gap-2 text-zinc-100 font-bold tracking-tight">
          <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center">
            <Command className="w-3 h-3 text-white" />
          </div>
          <span>OpsOS</span>
        </div>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs font-medium text-zinc-500 mb-4 px-2 uppercase tracking-wider">
          Menu
        </div>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-zinc-900 text-zinc-100 border border-zinc-800" // Active Style
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50" // Inactive Style
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* 3. User Profile (Footer) */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-200">Founder</span>
            <span className="text-xs text-zinc-500">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}