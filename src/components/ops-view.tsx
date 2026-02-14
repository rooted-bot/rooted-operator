"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Server, 
  Clock, 
  GitBranch,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "success" | "warn" | "error";
  message: string;
  source: string;
}

interface ServerStatus {
  id: string;
  name: string;
  status: "healthy" | "warning" | "error";
  uptime: string;
  cpu: number;
  memory: number;
  region: string;
}

interface CronJob {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: "running" | "idle" | "failed";
}

const levelStyles = {
  info: "text-blue-400",
  success: "text-emerald-400",
  warn: "text-amber-400",
  error: "text-rose-400",
};

const serverStatusIcons = {
  healthy: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

const serverStatusColors = {
  healthy: "text-emerald-400",
  warning: "text-amber-400",
  error: "text-rose-400",
};

export function OpsView() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [servers, setServers] = useState<ServerStatus[]>([]);
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize data
    setTimeout(() => {
      setServers([
        { id: "1", name: "api-prod-01", status: "healthy", uptime: "45d 12h", cpu: 34, memory: 62, region: "us-east" },
        { id: "2", name: "api-prod-02", status: "healthy", uptime: "45d 12h", cpu: 28, memory: 55, region: "us-west" },
        { id: "3", name: "worker-01", status: "warning", uptime: "12d 4h", cpu: 78, memory: 82, region: "eu-west" },
        { id: "4", name: "db-primary", status: "healthy", uptime: "90d 6h", cpu: 15, memory: 45, region: "us-east" },
      ]);

      setCronJobs([
        { id: "1", name: "Daily Backup", schedule: "0 2 * * *", lastRun: "2 hours ago", nextRun: "22 hours", status: "idle" },
        { id: "2", name: "Health Check", schedule: "*/5 * * * *", lastRun: "3 minutes ago", nextRun: "2 minutes", status: "running" },
        { id: "3", name: "Report Generation", schedule: "0 9 * * 1", lastRun: "5 days ago", nextRun: "2 days", status: "idle" },
        { id: "4", name: "Cache Cleanup", schedule: "0 */6 * * *", lastRun: "4 hours ago", nextRun: "2 hours", status: "idle" },
      ]);

      setLoading(false);
    }, 800);

    // Simulate real-time logs
    const sources = ["api", "worker", "scheduler", "db"];
    const levels: LogEntry["level"][] = ["info", "success", "warn", "error"];
    const messages = [
      "Request processed successfully",
      "Database connection established",
      "Cache miss for key: user:1234",
      "Job queue processing 12 items",
      "Memory usage above threshold",
      "API rate limit check passed",
      "Webhook delivered successfully",
    ];

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
      };
      
      setLogs(prev => {
        const updated = [newLog, ...prev].slice(0, 100);
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[180px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Terminal Output */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2"
      >
        <Card className="h-[500px]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Real-time Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[420px] px-5 font-mono text-xs">
              <div className="space-y-1">
                {logs.map((log) => (
                  <div key={log.id} className="terminal-line">
                    <span className="terminal-timestamp">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={cn("terminal-level", log.level)}>
                      [{log.level.toUpperCase()}]
                    </span>
                    <span className="text-white/40">[{log.source}]</span>
                    <span className="text-white/70">{log.message}</span>
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="text-white/30 py-4">Waiting for logs...</div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Server Status & Cron Jobs */}
      <div className="space-y-4">
        {/* Server Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-400" />
                Server Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {servers.map((server) => {
                  const StatusIcon = serverStatusIcons[server.status];
                  
                  return (
                    <div
                      key={server.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon className={cn("w-4 h-4", serverStatusColors[server.status])} />
                        <div>
                          <p className="text-sm font-medium text-white">{server.name}</p>
                          <p className="text-xs text-white/40">{server.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/50">{server.uptime}</p>
                        <p className="text-xs text-white/30">CPU {server.cpu}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cron Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                Cron Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cronJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{job.name}</p>
                      <p className="text-xs text-white/40 font-mono">{job.schedule}</p>
                    </div>
                    <Badge 
                      variant={job.status === "running" ? "default" : job.status === "failed" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
