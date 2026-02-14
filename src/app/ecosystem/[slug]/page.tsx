"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Settings,
  Activity,
  Users,
  DollarSign,
  Server,
  Globe,
  Shield,
  GitBranch,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Zap,
  BarChart3,
  Code,
  FileText,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabBar } from "@/components/tab-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "beta" | "deprecated" | "planned";
  health: "healthy" | "warning" | "error";
  users: number;
  revenue: number;
  version: string;
  uptime: string;
  requestsPerDay: number;
  avgResponseTime: string;
  errorRate: string;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "metrics", label: "Metrics" },
  { id: "deployments", label: "Deployments" },
  { id: "settings", label: "Settings" },
];

const statusColors = {
  active: "bg-emerald-500/20 text-emerald-400",
  beta: "bg-amber-500/20 text-amber-400",
  deprecated: "bg-rose-500/20 text-rose-400",
  planned: "bg-blue-500/20 text-blue-400",
};

const healthColors = {
  healthy: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-rose-500",
};

const categoryGradients: Record<string, string> = {
  "AI Tools": "from-blue-500 to-violet-600",
  "Integrations": "from-emerald-500 to-teal-600",
  "Platform": "from-amber-500 to-orange-600",
  "Services": "from-rose-500 to-pink-600",
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/ecosystem/${slug}`);
      const data = await res.json();
      setProduct(data.product || null);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      // Fallback data
      setProduct({
        id: slug,
        name: "AI Assistant",
        description: "Conversational AI for customer support with natural language understanding and context-aware responses.",
        category: "AI Tools",
        status: "active",
        health: "healthy",
        users: 12500,
        revenue: 45000,
        version: "2.3.1",
        uptime: "99.98%",
        requestsPerDay: 245000,
        avgResponseTime: "245ms",
        errorRate: "0.02%",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50">Product not found</p>
        <Link href="/ecosystem">
          <Button variant="outline" className="mt-4">Back to Ecosystem</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/ecosystem" className="text-white/50 hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Ecosystem
        </Link>
        <span className="text-white/30">/</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center",
            categoryGradients[product.category] || "from-slate-500 to-slate-600"
          )}>
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-white">{product.name}</h1>
              <Badge variant="secondary" className={cn(statusColors[product.status])}>
                {product.status}
              </Badge>
            </div>
            <p className="text-white/50 max-w-2xl">{product.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", healthColors[product.health])} />
                <span className="text-sm text-white/70">{product.health}</span>
              </div>
              <span className="text-sm text-white/40">v{product.version}</span>
              <span className="text-sm text-white/40">{product.category}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Total Users</p>
                    <p className="text-2xl font-semibold text-white">{product.users.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+12%</span>
                  <span className="text-xs text-white/40">vs last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Monthly Revenue</p>
                    <p className="text-2xl font-semibold text-white">${(product.revenue / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+8%</span>
                  <span className="text-xs text-white/40">vs last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Uptime</p>
                    <p className="text-2xl font-semibold text-white">{product.uptime}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-violet-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Operational</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Daily Requests</p>
                    <p className="text-2xl font-semibold text-white">{(product.requestsPerDay / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-white/40">Avg response: {product.avgResponseTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Deployment", detail: "v2.3.1 deployed to production", time: "2 hours ago", icon: Server },
                  { action: "Alert", detail: "CPU spike detected on worker-02", time: "5 hours ago", icon: AlertCircle },
                  { action: "User", detail: "Premium tier activated", time: "1 day ago", icon: Users },
                  { action: "Update", detail: "Documentation updated", time: "2 days ago", icon: FileText },
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.action}</p>
                        <p className="text-xs text-white/50">{activity.detail}</p>
                      </div>
                      <span className="text-xs text-white/40">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "metrics" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end gap-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  const height = 30 + Math.random() * 50;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-blue-500/30 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:59</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Error Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end gap-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  const height = Math.random() * 15;
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-rose-500/30 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:59</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "deployments" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-violet-400" />
              Recent Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { version: "2.3.1", status: "success", env: "production", time: "2 hours ago", commit: "a1b2c3d" },
                { version: "2.3.0", status: "success", env: "production", time: "2 days ago", commit: "e4f5g6h" },
                { version: "2.2.9", status: "failed", env: "staging", time: "3 days ago", commit: "i7j8k9l" },
                { version: "2.2.8", status: "success", env: "production", time: "1 week ago", commit: "m0n1o2p" },
              ].map((deploy, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      deploy.status === "success" ? "bg-emerald-500/20" : "bg-rose-500/20"
                    )}>
                      {deploy.status === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">v{deploy.version}</p>
                      <p className="text-xs text-white/40 font-mono">{deploy.commit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-[10px]">{deploy.env}</Badge>
                    <p className="text-xs text-white/40 mt-1">{deploy.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-400" />
              Product Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Auto-deploy", description: "Automatically deploy on merge to main", value: true },
              { label: "Notifications", description: "Send alerts for critical issues", value: true },
              { label: "Public API", description: "Expose public API endpoints", value: false },
              { label: "Rate Limiting", description: "Enable rate limiting for requests", value: true },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">{setting.label}</p>
                  <p className="text-xs text-white/50">{setting.description}</p>
                </div>
                <button
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    setting.value ? "bg-blue-500" : "bg-white/[0.1]"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all",
                      setting.value ? "left-[22px]" : "left-[2px]"
                    )}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
