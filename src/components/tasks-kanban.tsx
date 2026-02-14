"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  Calendar,
  Tag,
  User
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "backlog" | "today" | "in-progress" | "review" | "done";
  assignee?: string;
  dueDate?: string;
  tags: string[];
  project: string;
}

const columns = [
  { id: "backlog", label: "Backlog", color: "text-slate-400" },
  { id: "today", label: "Today", color: "text-blue-400" },
  { id: "in-progress", label: "In Progress", color: "text-violet-400" },
  { id: "review", label: "Review", color: "text-amber-400" },
  { id: "done", label: "Done", color: "text-emerald-400" },
];

const projectColors: Record<string, string> = {
  "API": "bg-blue-500/20 text-blue-400",
  "Frontend": "bg-violet-500/20 text-violet-400",
  "Content": "bg-amber-500/20 text-amber-400",
  "DevOps": "bg-emerald-500/20 text-emerald-400",
  "Design": "bg-pink-500/20 text-pink-400",
};

const priorityIcons = {
  high: AlertCircle,
  medium: Clock,
  low: CheckCircle2,
};

const priorityColors = {
  high: "text-rose-400",
  medium: "text-amber-400",
  low: "text-emerald-400",
};

export function TasksKanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: "1", title: "Design new API endpoints", description: "Create OpenAPI spec for user management", priority: "high", status: "backlog", assignee: "Alice", tags: ["api", "design"], project: "API" },
        { id: "2", title: "Update documentation", description: "Add examples for authentication flow", priority: "low", status: "backlog", tags: ["docs"], project: "Frontend" },
        { id: "3", title: "Fix login bug", description: "Users unable to login with SSO", priority: "high", status: "today", assignee: "Bob", dueDate: "Today", tags: ["bug", "urgent"], project: "Frontend" },
        { id: "4", title: "Write blog post", description: "AI trends in 2025", priority: "medium", status: "today", assignee: "Charlie", dueDate: "Today", tags: ["content"], project: "Content" },
        { id: "5", title: "Implement caching layer", description: "Redis setup for session storage", priority: "high", status: "in-progress", assignee: "Diana", tags: ["backend", "performance"], project: "API" },
        { id: "6", title: "Setup CI/CD pipeline", description: "GitHub Actions for automated testing", priority: "medium", status: "in-progress", assignee: "Eve", tags: ["devops"], project: "DevOps" },
        { id: "7", title: "Review PR #234", description: "Authentication module refactor", priority: "medium", status: "review", assignee: "Frank", tags: ["code-review"], project: "API" },
        { id: "8", title: "Update landing page", description: "New hero section design", priority: "low", status: "review", tags: ["ui"], project: "Frontend" },
        { id: "9", title: "Database migration", description: "Add user preferences table", priority: "high", status: "done", assignee: "Grace", tags: ["database"], project: "API" },
        { id: "10", title: "Fix mobile nav", description: "Menu not closing on outside click", priority: "medium", status: "done", tags: ["bug", "mobile"], project: "Frontend" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[600px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {columns.map((column, colIndex) => {
        const columnTasks = tasks.filter(t => t.status === column.id);
        
        return (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.05 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={cn("text-sm font-semibold", column.color)}>
                {column.label}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {columnTasks.length}
              </Badge>
            </div>
            
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-2">
                {columnTasks.map((task, taskIndex) => {
                  const PriorityIcon = priorityIcons[task.priority];
                  
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: taskIndex * 0.05 }}
                      className="kanban-card group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className={cn("text-[10px]", projectColors[task.project])}>
                          {task.project}
                        </Badge>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                      
                      <h4 className="text-sm font-medium text-white mb-1">{task.title}</h4>
                      <p className="text-xs text-white/50 mb-3 line-clamp-2">{task.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          {task.assignee ? (
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-[10px] text-white">
                              {task.assignee[0]}
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-lg bg-white/[0.06] flex items-center justify-center">
                              <User className="w-3 h-3 text-white/30" />
                            </div>
                          )}
                          <PriorityIcon className={cn("w-3.5 h-3.5", priorityColors[task.priority])} />
                        </div>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-white/40">
                            <Calendar className="w-3 h-3" />
                            {task.dueDate}
                          </div>
                        )}
                      </div>

                      {/* Move buttons */}
                      <div className="flex gap-1 mt-3 pt-3 border-t border-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity">
                        {column.id !== "backlog" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs"
                            onClick={() => {
                              const prevColumn = columns[columns.findIndex(c => c.id === column.id) - 1];
                              if (prevColumn) moveTask(task.id, prevColumn.id as Task["status"]);
                            }}
                          >
                            ← Back
                          </Button>
                        )}
                        {column.id !== "done" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs ml-auto"
                            onClick={() => {
                              const nextColumn = columns[columns.findIndex(c => c.id === column.id) + 1];
                              if (nextColumn) moveTask(task.id, nextColumn.id as Task["status"]);
                            }}
                          >
                            Next →
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </motion.div>
        );
      })}
    </div>
  );
}
