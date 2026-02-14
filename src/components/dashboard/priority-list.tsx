"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flag, ArrowRight, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Priority {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "blocked";
  due?: string;
}

const priorityStyles = {
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
};

const statusIcons = {
  pending: Clock,
  "in-progress": ArrowRight,
  blocked: AlertCircle,
};

export function PriorityList() {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPriorities([
        { id: "1", title: "Review and merge critical security patch", priority: "high", status: "in-progress", due: "Today" },
        { id: "2", title: "Update API documentation", priority: "medium", status: "pending", due: "Tomorrow" },
        { id: "3", title: "Prepare quarterly report", priority: "high", status: "blocked" },
        { id: "4", title: "Refactor authentication module", priority: "low", status: "pending" },
      ]);
      setLoading(false);
    }, 900);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-amber-400" />
          Priorities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {priorities.map((item, index) => {
            const StatusIcon = statusIcons[item.status];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group cursor-pointer"
              >
                <div className={cn("mt-1 w-2 h-2 rounded-full shrink-0", 
                  item.priority === "high" ? "bg-rose-400" :
                  item.priority === "medium" ? "bg-amber-400" : "bg-emerald-400"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", priorityStyles[item.priority])}>
                      {item.priority}
                    </Badge>
                    {item.due && (
                      <span className="text-xs text-white/40">{item.due}</span>
                    )}
                  </div>
                </div>
                <StatusIcon className={cn("w-4 h-4 shrink-0",
                  item.status === "blocked" ? "text-rose-400" : "text-white/30"
                )} />
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
