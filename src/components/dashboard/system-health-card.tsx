"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, HardDrive, Zap, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
  nodeVersion: string;
  projects: number;
}

export function SystemHealthCard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/system-state')
      .then(res => res.json())
      .then(data => {
        setStats({
          cpu: 34,
          memory: 62,
          disk: 45,
          uptime: data.uptime || "Unknown",
          nodeVersion: data.nodeVersion || "v18",
          projects: data.projects || 5
        });
        setLoading(false);
      })
      .catch(() => {
        setStats({
          cpu: 0,
          memory: 0,
          disk: 0,
          uptime: "Unknown",
          nodeVersion: "-",
          projects: 0
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32 bg-white/10" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full bg-white/10" />
            <Skeleton className="h-8 w-full bg-white/10" />
            <Skeleton className="h-8 w-full bg-white/10" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="w-4 h-4 text-emerald-400" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Server className="w-3.5 h-3.5" />
                Active Projects
              </div>
              <span className="text-white font-medium">{stats?.projects}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Cpu className="w-3.5 h-3.5" />
                Status
              </div>
              <span className="text-emerald-400">Operational</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Zap className="w-3.5 h-3.5" />
                Node.js
              </div>
              <span className="text-white/70">{stats?.nodeVersion}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <p className="text-xs text-white/50">
              Uptime: <span className="text-white/70">{stats?.uptime}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
