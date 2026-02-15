"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  GitBranch,
  FileText,
  Rocket
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "info" | "success" | "warning" | "error";
  category: "agent" | "system" | "git" | "deploy" | "file";
  message: string;
  timestamp: string;
}

const categoryIcons = {
  agent: Terminal,
  system: Terminal,
  git: GitBranch,
  deploy: Rocket,
  file: FileText,
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/activity')
      .then(res => res.json())
      .then(data => {
        setActivities(data.activities || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load activity');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card className="h-[400px] bg-white/[0.03] backdrop-blur-xl border-white/10">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32 bg-white/10" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-white/10" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-[400px] bg-white/[0.03] backdrop-blur-xl border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <Terminal className="w-4 h-4 text-blue-400" />
            Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[320px]">
          <p className="text-white/50">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px] bg-white/[0.03] backdrop-blur-xl border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Terminal className="w-4 h-4 text-blue-400" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-5">
          <div className="space-y-2">
            {activities.length === 0 ? (
              <p className="text-white/40 text-center py-8">No recent activity</p>
            ) : (
              activities.map((activity, index) => {
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
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
