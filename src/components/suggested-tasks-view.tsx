"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight,
  Play,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  status: "suggested" | "approved" | "in-progress" | "done";
  suggestedBy: string;
  createdAt: string;
}

const columns = [
  { id: "suggested", label: "Suggested", color: "text-blue-400" },
  { id: "approved", label: "Approved", color: "text-amber-400" },
  { id: "in-progress", label: "In Progress", color: "text-violet-400" },
  { id: "done", label: "Done", color: "text-emerald-400" },
];

const priorityStyles = {
  high: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export function SuggestedTasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: "1", title: "Implement rate limiting", description: "Add API rate limiting to prevent abuse", priority: "high", status: "suggested", suggestedBy: "System", createdAt: "1h ago" },
        { id: "2", title: "Update dependencies", description: "Security patches for npm packages", priority: "high", status: "suggested", suggestedBy: "Alice", createdAt: "2h ago" },
        { id: "3", title: "Refactor auth middleware", description: "Improve error handling and logging", priority: "medium", status: "approved", suggestedBy: "Bob", createdAt: "3h ago" },
        { id: "4", title: "Add dark mode toggle", description: "User preference for theme switching", priority: "low", status: "approved", suggestedBy: "Charlie", createdAt: "4h ago" },
        { id: "5", title: "Optimize database queries", description: "Add indexes for common queries", priority: "high", status: "in-progress", suggestedBy: "System", createdAt: "5h ago" },
        { id: "6", title: "Setup monitoring alerts", description: "Configure PagerDuty integration", priority: "medium", status: "in-progress", suggestedBy: "Diana", createdAt: "6h ago" },
        { id: "7", title: "Update README", description: "Add setup instructions for new devs", priority: "low", status: "done", suggestedBy: "Eve", createdAt: "1d ago" },
        { id: "8", title: "Fix navigation bug", description: "Mobile menu not closing on click", priority: "high", status: "done", suggestedBy: "System", createdAt: "1d ago" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[500px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            
            <ScrollArea className="h-[500px]">
              <div className="space-y-3 pr-2">
                {columnTasks.map((task, taskIndex) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: taskIndex * 0.05 }}
                    className="kanban-card group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className={cn("text-[10px]", priorityStyles[task.priority])}>
                        {task.priority}
                      </Badge>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4 text-white/40" />
                      </button>
                    </div>
                    
                    <h4 className="text-sm font-medium text-white mb-1">{task.title}</h4>
                    <p className="text-xs text-white/50 mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-white/40">
                        <span className="w-5 h-5 rounded-lg bg-white/[0.06] flex items-center justify-center text-[10px]">
                          {task.suggestedBy[0]}
                        </span>
                        <span>{task.createdAt}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        {column.id === "suggested" && (
                          <>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="w-7 h-7"
                              onClick={() => moveTask(task.id, "approved")}
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="w-7 h-7"
                              onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}
                            >
                              <XCircle className="w-4 h-4 text-rose-400" />
                            </Button>
                          </>
                        )}
                        {column.id === "approved" && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="w-7 h-7"
                            onClick={() => moveTask(task.id, "in-progress")}
                          >
                            <Play className="w-4 h-4 text-violet-400" />
                          </Button>
                        )}
                        {column.id === "in-progress" && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="w-7 h-7"
                            onClick={() => moveTask(task.id, "done")}
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        );
      })}
    </div>
  );
}
