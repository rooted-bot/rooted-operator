"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface RevenueData {
  today: number;
  yesterday: number;
  week: number;
  month: number;
}

export function RevenueCard() {
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        today: 2847.50,
        yesterday: 2150.00,
        week: 18420.75,
        month: 67250.00,
      });
      setLoading(false);
    }, 1200);
  }, []);

  const todayChange = data ? ((data.today - data.yesterday) / data.yesterday) * 100 : 0;
  const isPositive = todayChange >= 0;

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-violet-400" />
          Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                ${data?.today.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <Badge variant={isPositive ? "success" : "destructive"} className="text-xs">
                {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {Math.abs(todayChange).toFixed(1)}%
              </Badge>
            </div>
            <p className="text-xs text-white/50 mt-1">Today vs yesterday</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
            <div>
              <p className="text-xs text-white/50">This Week</p>
              <p className="text-sm font-semibold text-white">
                ${data?.week.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/50">This Month</p>
              <p className="text-sm font-semibold text-white">
                ${data?.month.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
