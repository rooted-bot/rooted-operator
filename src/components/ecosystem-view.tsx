"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Box, 
  Activity,
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "healthy" | "warning" | "critical" | "maintenance";
  metrics: {
    users: number;
    revenue: number;
    uptime: number;
  };
  category: string;
  lastDeploy: string;
}

const statusColors = {
  healthy: "text-emerald-400 bg-emerald-500/10",
  warning: "text-amber-400 bg-amber-500/10",
  critical: "text-rose-400 bg-rose-500/10",
  maintenance: "text-blue-400 bg-blue-500/10",
};

const statusLabels = {
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
  maintenance: "Maintenance",
};

export function EcosystemView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { 
          id: "1", 
          name: "Rooted API", 
          slug: "rooted-api",
          description: "Core API infrastructure for agent management",
          status: "healthy",
          metrics: { users: 1250, revenue: 45000, uptime: 99.9 },
          category: "Infrastructure",
          lastDeploy: "2h ago"
        },
        { 
          id: "2", 
          name: "Dashboard", 
          slug: "dashboard",
          description: "Operator control panel and monitoring",
          status: "healthy",
          metrics: { users: 450, revenue: 0, uptime: 99.95 },
          category: "Frontend",
          lastDeploy: "4h ago"
        },
        { 
          id: "3", 
          name: "Agent Runtime", 
          slug: "agent-runtime",
          description: "Execution environment for AI agents",
          status: "warning",
          metrics: { users: 890, revenue: 32000, uptime: 98.5 },
          category: "Backend",
          lastDeploy: "1d ago"
        },
        { 
          id: "4", 
          name: "Content Studio", 
          slug: "content-studio",
          description: "Content creation and management platform",
          status: "healthy",
          metrics: { users: 320, revenue: 18000, uptime: 99.8 },
          category: "Product",
          lastDeploy: "12h ago"
        },
        { 
          id: "5", 
          name: "Analytics Engine", 
          slug: "analytics",
          description: "Data processing and insights",
          status: "healthy",
          metrics: { users: 180, revenue: 12000, uptime: 99.9 },
          category: "Infrastructure",
          lastDeploy: "3d ago"
        },
        { 
          id: "6", 
          name: "Chat Service", 
          slug: "chat",
          description: "Real-time messaging infrastructure",
          status: "maintenance",
          metrics: { users: 0, revenue: 0, uptime: 0 },
          category: "Backend",
          lastDeploy: "Just now"
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const healthyCount = products.filter(p => p.status === "healthy").length;
  const totalProducts = products.length;

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[280px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Box className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
                <p className="text-xs text-white/50">Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{healthyCount}</p>
                <p className="text-xs text-white/50">Healthy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3.2k</p>
                <p className="text-xs text-white/50">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$107k</p>
                <p className="text-xs text-white/50">MRR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                      <Box className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <p className="text-xs text-white/40">{product.category}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={cn("text-[10px]", statusColors[product.status])}>
                    {statusLabels[product.status]}
                  </Badge>
                </div>
                
                <p className="text-sm text-white/60 mb-4 line-clamp-2">{product.description}</p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                    <Users className="w-4 h-4 text-white/40 mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{(product.metrics.users / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-white/40">Users</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                    <TrendingUp className="w-4 h-4 text-white/40 mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">${(product.metrics.revenue / 1000).toFixed(0)}k</p>
                    <p className="text-[10px] text-white/40">Revenue</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                    <Globe className="w-4 h-4 text-white/40 mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{product.metrics.uptime}%</p>
                    <p className="text-[10px] text-white/40">Uptime</p>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="text-xs text-white/40">Last deploy: {product.lastDeploy}</span>
                  <Link href={`/ecosystem/${product.slug}`}>
                    <Button size="sm" variant="ghost" className="h-8 text-xs gap-1">
                      Details
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
