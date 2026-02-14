"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Cpu,
  TrendingUp,
  Activity,
  Calendar,
  Zap,
  Server,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityFeed } from "./activity-feed";
import { CalendarView } from "./calendar-view";

interface Agent {
  id: string;
  name: string;
  status: "online" | "idle" | "offline";
  lastActive: string;
  tasksCompleted: number;
  type: string;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  activeAgents: number;
  uptime: string;
}

interface RevenueMetrics {
  today: number;
  week: number;
  month: number;
  change: number;
}

export function DashboardOverview() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [revenue, setRevenue] = useState<RevenueMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, systemRes, revenueRes] = await Promise.all([
          fetch("/api/agents"),
          fetch("/api/system-state"),
          fetch("/api/revenue"),
        ]);

        const agentsData = await agentsRes.json();
        const systemData = await systemRes.json();
        const revenueData = await revenueRes.json();

        setAgents(agentsData.agents?.slice(0, 4) || []);
        setMetrics(systemData);
        setRevenue(revenueData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Agents"
          value={metrics?.activeAgents || 0}
          icon={Bot}
          trend="+2 this week"
          trendUp={true}
        />
        <StatCard
          title="System CPU"
          value={`${metrics?.cpu || 0}%`}
          icon={Cpu}
          trend="Optimal"
          trendUp={true}
          subtitle={metrics && metrics.cpu > 80 ? "High usage" : "Normal"}
        />
        <StatCard
          title="Today's Revenue"
          value={`$${revenue?.today.toLocaleString() || 0}`}
          icon={TrendingUp}
          trend={`${revenue?.change > 0 ? "+" : ""}${revenue?.change || 0}%`}
          trendUp={(revenue?.change || 0) >= 0}
        />
        <StatCard
          title="Uptime"
          value={metrics?.uptime || "0h"}
          icon={Clock}
          trend="Stable"
          trendUp={true}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              Active Agents
            </h2>
            <a
              href="/agents"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            {agents.length === 0 && (
              <div className="glass-card p-6 text-center text-white/50 sm:col-span-2">
                No agents found
              </div>
            )}
          </div>

          {/* System Health */}
          <div className="glass-card p-5 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-violet-400" />
                System Health
              </h3>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                All systems operational
              </span>
            </div>
            <div className="space-y-3">
              <HealthBar label="CPU Usage" value={metrics?.cpu || 0} color="blue" />
              <HealthBar label="Memory" value={metrics?.memory || 0} color="violet" />
              <HealthBar label="Disk I/O" value={45} color="amber" />
              <HealthBar label="Network" value={72} color="emerald" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Activity
              </h2>
            </div>
            <ActivityFeed limit={6} />
          </div>

          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-400" />
                Calendar
              </h2>
            </div>
            <CalendarView compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
  subtitle?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card-hover p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-white/40 mt-1">{subtitle}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
          <Icon className="w-5 h-5 text-white/70" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "text-xs font-medium",
            trendUp ? "text-emerald-400" : "text-rose-400"
          )}
        >
          {trend}
        </span>
      </div>
    </motion.div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card-hover p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">{agent.name}</h4>
            <p className="text-xs text-white/50">{agent.type}</p>
          </div>
        </div>
        <div
          className={cn(
            "status-dot",
            agent.status === "online" && "online active",
            agent.status === "idle" && "idle",
            agent.status === "offline" && "offline"
          )}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-white/50">
          {agent.tasksCompleted} tasks completed
        </span>
        <span className="text-white/30 text-xs">{agent.lastActive}</span>
      </div>
    </motion.div>
  );
}

function HealthBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "violet" | "amber" | "emerald";
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="text-white/40">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", colorClasses[color])}
        />
      </div>
    </div>
  );
}
