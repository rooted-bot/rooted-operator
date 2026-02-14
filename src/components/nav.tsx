"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Terminal,
  Bot,
  CheckSquare,
  MessageSquare,
  FileText,
  Users,
  Database,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Hub", icon: LayoutDashboard },
  { href: "/ops", label: "Ops", icon: Terminal },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/comms", label: "Comms", icon: Users },
  { href: "/knowledge", label: "Knowledge", icon: Database },
  { href: "/code", label: "Code", icon: Code },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
      <nav className="flex items-center px-4 sm:px-6 lg:px-8 h-14 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1 mr-6 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <span className="font-semibold text-sm text-white hidden sm:block">
            Rooted
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/[0.08] rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
