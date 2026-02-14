"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Wifi, WifiOff, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Agent {
  id: string;
  name: string;
  status: "online" | "idle" | "offline";
  model: string;
  lastActivity: string;
}

export function AgentStatusCard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching agent data
    setTimeout(() => {
      setAgents([
        { id: "1", name: "Alice", status: "online", model: "claude-3-opus", lastActivity: "2m ago" },
        { id: "2", name: "Bob", status: "idle", model: "gpt-4", lastActivity: "15m ago" },
        { id: "3", name: "Charlie", status: "online", model: "claude-3-sonnet", lastActivity: "Just now" },
        { id: "4", name: "Diana", status: "offline", model: "gpt-4-turbo", lastActivity: "2h ago" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const onlineCount = agents.filter(a => a.status === "online").length;
  const totalCount = agents.length;

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            Agents
          </CardTitle>
          <Badge variant={onlineCount === totalCount ? "success" : onlineCount > 0 ? "warning" : "destructive"}>
            {onlineCount}/{totalCount} Online
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
                <div className={`status-dot ${agent.status} ${agent.status === "online" ? "active" : ""}`} />
                <div>
                  <p className="text-sm font-medium text-white">{agent.name}</p>
                  <p className="text-xs text-white/50">{agent.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/40">
                <Clock className="w-3 h-3" />
                {agent.lastActivity}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
