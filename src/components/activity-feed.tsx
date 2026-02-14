"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Bot,
  MessageSquare,
  GitBranch,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "info" | "success" | "warning" | "error";
  category: "agent" | "system" | "chat" | "git" | "content";
  message: string;
  timestamp: string;
}

const categoryIcons = {
  agent: Bot,
  system: Terminal,
  chat: MessageSquare,
  git: GitBranch,
  content: FileText,
};

const typeIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: AlertCircle,
};

const typeColors = {
  info: "text-blue-400",
  success: "text-emerald-400",
  warning: "text-amber-400",
  error: "text-rose-400",
};

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setActivities([
        { id: "1", type: "success", category: "agent", message: "Agent Alice completed task 'Review PR #234'", timestamp: "2m ago" },
        { id: "2", type: "info", category: "system", message: "Scheduled backup completed successfully", timestamp: "5m ago" },
        { id: "3", type: "warning", category: "git", message: "Branch 'feature/auth' has merge conflicts", timestamp: "12m ago" },
        { id: "4", type: "success", category: "content", message: "Blog post 'AI Trends 2025' published", timestamp: "18m ago" },
        { id: "5", type: "info", category: "chat", message: "New message from client: TechCorp", timestamp: "25m ago" },
        { id: "6", type: "error", category: "system", message: "API rate limit approaching (85%)", timestamp: "32m ago" },
        { id: "7", type: "success", category: "agent", message: "Agent Bob deployed to production", timestamp: "45m ago" },
        { id: "8", type: "info", category: "git", message: "New commit on main: 'Fix navigation'", timestamp: "1h ago" },
        { id: "9", type: "success", category: "content", message: "Newsletter draft approved", timestamp: "1h ago" },
        { id: "10", type: "info", category: "system", message: "Memory usage optimized", timestamp: "2h ago" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <Card className="h-[400px]">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-5">
          <div className="space-y-2">
            {activities.map((activity, index) => {
              const CategoryIcon = categoryIcons[activity.category];
              const TypeIcon = typeIcons[activity.type];
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className={cn("mt-0.5", typeColors[activity.type])}>
                    <TypeIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90 truncate">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CategoryIcon className="w-3 h-3 text-white/40" />
                      <span className="text-xs text-white/40">{activity.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
