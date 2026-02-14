"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Layers,
  ArrowUpRight,
  Users,
  DollarSign,
  Activity,
  GitBranch,
  TrendingUp,
  Globe,
  Shield,
  Server,
  Zap,
  ChevronRight,
  Star,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  icon?: string;
}

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
  "AI Tools": "from-blue-500/20 to-violet-500/20",
  "Integrations": "from-emerald-500/20 to-teal-500/20",
  "Platform": "from-amber-500/20 to-orange-500/20",
  "Services": "from-rose-500/20 to-pink-500/20",
};

export default function EcosystemPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    activeDeployments: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/ecosystem");
      const data = await res.json();
      const products = data.products || [];
      setProducts(products);
      
      // Calculate stats
      setStats({
        totalProducts: products.length,
        totalUsers: products.reduce((acc: number, p: Product) => acc + p.users, 0),
        totalRevenue: products.reduce((acc: number, p: Product) => acc + p.revenue, 0),
        activeDeployments: products.filter((p: Product) => p.status === "active").length,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Fallback data
      const fallback = [
        { id: "1", name: "AI Assistant", description: "Conversational AI for customer support", category: "AI Tools", status: "active", health: "healthy", users: 12500, revenue: 45000, version: "2.3.1" },
        { id: "2", name: "Data Pipeline", description: "Real-time data processing and analytics", category: "Platform", status: "active", health: "healthy", users: 8200, revenue: 32000, version: "1.8.0" },
        { id: "3", name: "Slack Bot", description: "Automated team notifications and commands", category: "Integrations", status: "active", health: "warning", users: 5600, revenue: 12000, version: "3.1.2" },
        { id: "4", name: "Code Review AI", description: "Automated code review and suggestions", category: "AI Tools", status: "beta", health: "healthy", users: 2100, revenue: 8500, version: "0.9.5" },
        { id: "5", name: "Analytics Dashboard", description: "Business intelligence and reporting", category: "Platform", status: "active", health: "healthy", users: 9800, revenue: 28000, version: "2.0.0" },
        { id: "6", name: "API Gateway", description: "Unified API management layer", category: "Services", status: "active", health: "healthy", users: 15000, revenue: 55000, version: "4.2.1" },
      ];
      setProducts(fallback);
      setStats({
        totalProducts: fallback.length,
        totalUsers: fallback.reduce((acc, p) => acc + p.users, 0),
        totalRevenue: fallback.reduce((acc, p) => acc + p.revenue, 0),
        activeDeployments: fallback.filter(p => p.status === "active").length,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" />
            Ecosystem
          </h1>
          <p className="text-sm text-white/50 mt-1">Manage your products and services</p>
        </div>
        <Button className="gap-2">
          <Zap className="w-4 h-4" />
          New Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">Products</p>
                <p className="text-xl font-semibold text-white">{stats.totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">Total Users</p>
                <p className="text-xl font-semibold text-white">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">MRR</p>
                <p className="text-xl font-semibold text-white">${(stats.totalRevenue / 1000).toFixed(1)}k</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-white/50">Active</p>
                <p className="text-xl font-semibold text-white">{stats.activeDeployments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/ecosystem/${product.id}`}>
              <Card className="h-full hover:bg-white/[0.05] transition-colors cursor-pointer group">
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                      categoryGradients[product.category] || "from-slate-500/20 to-slate-600/20"
                    )}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", healthColors[product.health])} />
                      <ArrowUpRight className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-white/50 mb-3 line-clamp-2">{product.description}</p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className={cn("text-[10px]", statusColors[product.status])}>
                      {product.status}
                    </Badge>
                    <span className="text-[10px] text-white/40">v{product.version}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Users</p>
                      <p className="text-sm font-medium text-white">{product.users.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Revenue</p>
                      <p className="text-sm font-medium text-emerald-400">${(product.revenue / 1000).toFixed(1)}k</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
