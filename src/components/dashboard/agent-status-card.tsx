"use client";

import { useEffect, useState } from "react";
import { Bot, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Agent {
  id: string;
  name: string;
  status: "online" | "idle" | "offline";
  model: string;
  lastActivity: string;
  task: string;
}

export function AgentStatusCard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        setAgents(data.agents || []);
        setLoading(false);
      })
      .catch(() => {
        setAgents([{
          id: "1",
          name: "Main Agent",
          status: "online",
          model: "moonshot/kimi-k2.5",
          lastActivity: "now",
          task: "Managing projects"
        }]);
        setLoading(false);
      });
  }, []);

  const onlineCount = agents.filter(a => a.status === "online").length;
  const totalCount = agents.length;

  if (loading) {
    return (
      <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32 bg-white/10" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full bg-white/10" />
            <Skeleton className="h-12 w-full bg-white/10" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Bot className="w-4 h-4 text-blue-400" />
            Agent Status
          </CardTitle>
          <Badge 
            variant="outline" 
            className={onlineCount > 0 ? "border-emerald-500/50 text-emerald-400" : "border-white/20 text-white/50"}
          >
            {onlineCount}/{totalCount} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {agents.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${agent.status === "online" ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
                <div>
                  <p className="text-sm font-medium text-white">{agent.name}</p>
                  <p className="text-xs text-white/50 truncate max-w-[120px]">{agent.task}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/40">
                <Clock className="w-3 h-3" />
                {agent.lastActivity}
              </div>
            </div>
          ))}
          
          {agents.length === 0 && (
            <div className="text-center py-4 text-white/40 text-sm">
              No active agents
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
