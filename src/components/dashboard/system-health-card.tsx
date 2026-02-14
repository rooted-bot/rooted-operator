"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, HardDrive, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
}

export function SystemHealthCard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching system stats
    setTimeout(() => {
      setStats({
        cpu: 34,
        memory: 62,
        disk: 45,
        uptime: "3d 12h 45m",
      });
      setLoading(false);
    }, 800);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => prev ? {
        ...prev,
        cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(30, prev.memory + (Math.random() - 0.5) * 5)),
      } : null);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Cpu className="w-3.5 h-3.5" />
                CPU
              </div>
              <span className="text-white">{stats?.cpu.toFixed(0)}%</span>
            </div>
            <Progress value={stats?.cpu} className="h-1" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Zap className="w-3.5 h-3.5" />
                Memory
              </div>
              <span className="text-white">{stats?.memory.toFixed(0)}%</span>
            </div>
            <Progress value={stats?.memory} className="h-1" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <HardDrive className="w-3.5 h-3.5" />
                Disk
              </div>
              <span className="text-white">{stats?.disk}%</span>
            </div>
            <Progress value={stats?.disk} className="h-1" />
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
