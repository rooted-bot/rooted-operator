"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Activity, 
  Clock, 
  DollarSign,
  MoreHorizontal,
  Power,
  Pause,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  status: "idle" | "active" | "offline";
  currentTask?: string;
  lastOutput: string;
  model: string;
  costToday: number;
  tokensUsed: number;
  avatar?: string;
  specialty: string[];
}

const statusColors = {
  idle: "bg-amber-500",
  active: "bg-emerald-500",
  offline: "bg-slate-500",
};

const statusLabels = {
  idle: "Idle",
  active: "Active",
  offline: "Offline",
};

export function AgentsView() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAgents([
        { 
          id: "1", 
          name: "Alice", 
          status: "active", 
          currentTask: "Code review for PR #234",
          lastOutput: "Found 3 potential issues in authentication.ts",
          model: "claude-3-opus",
          costToday: 12.45,
          tokensUsed: 125000,
          specialty: ["Code Review", "Architecture"]
        },
        { 
          id: "2", 
          name: "Bob", 
          status: "idle", 
          currentTask: undefined,
          lastOutput: "Task completed: Documentation updated",
          model: "gpt-4",
          costToday: 8.20,
          tokensUsed: 89000,
          specialty: ["Writing", "Analysis"]
        },
        { 
          id: "3", 
          name: "Charlie", 
          status: "active", 
          currentTask: "Customer support ticket #4521",
          lastOutput: "Drafting response with technical details...",
          model: "claude-3-sonnet",
          costToday: 5.80,
          tokensUsed: 67000,
          specialty: ["Support", "Communication"]
        },
        { 
          id: "4", 
          name: "Diana", 
          status: "offline", 
          currentTask: undefined,
          lastOutput: "Agent shutdown: Maintenance mode",
          model: "gpt-4-turbo",
          costToday: 0,
          tokensUsed: 0,
          specialty: ["Research", "Data Analysis"]
        },
        { 
          id: "5", 
          name: "Eve", 
          status: "active", 
          currentTask: "Content generation for newsletter",
          lastOutput: "Generated 3 blog post ideas",
          model: "claude-3-haiku",
          costToday: 2.30,
          tokensUsed: 34000,
          specialty: ["Content", "Creative"]
        },
        { 
          id: "6", 
          name: "Frank", 
          status: "idle", 
          currentTask: undefined,
          lastOutput: "Waiting for task assignment",
          model: "gpt-4o",
          costToday: 4.15,
          tokensUsed: 56000,
          specialty: ["Testing", "QA"]
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id !== id) return a;
      const newStatus = a.status === "offline" ? "idle" : "offline";
      return { ...a, status: newStatus };
    }));
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[240px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent, index) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="h-full">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full", statusColors[agent.status], agent.status === "active" && "animate-pulse")} />
                      <span className="text-xs text-white/50">{statusLabels[agent.status]}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="w-8 h-8"
                    onClick={() => toggleAgentStatus(agent.id)}
                  >
                    {agent.status === "offline" ? (
                      <Power className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Pause className="w-4 h-4 text-amber-400" />
                    )}
                  </Button>
                </div>
              </div>

              {agent.currentTask && (
                <div className="mb-4">
                  <p className="text-xs text-white/40 mb-1">Current Task</p>
                  <p className="text-sm text-white/80 truncate">{agent.currentTask}</p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs text-white/40 mb-1">Last Output</p>
                <p className="text-sm text-white/60 line-clamp-2">{agent.lastOutput}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.specialty.map((s, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <Activity className="w-3.5 h-3.5" />
                    {agent.model}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <DollarSign className="w-3.5 h-3.5" />
                    {agent.costToday.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">{(agent.tokensUsed / 1000).toFixed(0)}k tokens</span>
                  <span className="text-white/40">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
