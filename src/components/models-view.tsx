"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  DollarSign, 
  Layers,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Model {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
  inputCost: number;
  outputCost: number;
  specialties: string[];
  isActive: boolean;
  usageToday: {
    tokens: number;
    cost: number;
  };
  avgLatency: number;
}

export function ModelsView() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setModels([
        { 
          id: "1", 
          name: "Claude 3 Opus", 
          provider: "Anthropic",
          contextWindow: 200000,
          inputCost: 0.015,
          outputCost: 0.075,
          specialties: ["Complex reasoning", "Code", "Analysis"],
          isActive: true,
          usageToday: { tokens: 450000, cost: 28.50 },
          avgLatency: 2.3
        },
        { 
          id: "2", 
          name: "Claude 3 Sonnet", 
          provider: "Anthropic",
          contextWindow: 200000,
          inputCost: 0.003,
          outputCost: 0.015,
          specialties: ["Balanced", "Coding", "Writing"],
          isActive: true,
          usageToday: { tokens: 890000, cost: 18.20 },
          avgLatency: 1.2
        },
        { 
          id: "3", 
          name: "Claude 3 Haiku", 
          provider: "Anthropic",
          contextWindow: 200000,
          inputCost: 0.00025,
          outputCost: 0.00125,
          specialties: ["Speed", "Simple tasks", "Chat"],
          isActive: true,
          usageToday: { tokens: 1200000, cost: 5.80 },
          avgLatency: 0.4
        },
        { 
          id: "4", 
          name: "GPT-4", 
          provider: "OpenAI",
          contextWindow: 8192,
          inputCost: 0.03,
          outputCost: 0.06,
          specialties: ["General purpose", "Analysis"],
          isActive: true,
          usageToday: { tokens: 230000, cost: 12.45 },
          avgLatency: 1.8
        },
        { 
          id: "5", 
          name: "GPT-4 Turbo", 
          provider: "OpenAI",
          contextWindow: 128000,
          inputCost: 0.01,
          outputCost: 0.03,
          specialties: ["Long context", "Knowledge"],
          isActive: false,
          usageToday: { tokens: 0, cost: 0 },
          avgLatency: 2.1
        },
        { 
          id: "6", 
          name: "GPT-4o", 
          provider: "OpenAI",
          contextWindow: 128000,
          inputCost: 0.005,
          outputCost: 0.015,
          specialties: ["Vision", "Multimodal", "Speed"],
          isActive: true,
          usageToday: { tokens: 560000, cost: 8.90 },
          avgLatency: 0.8
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const totalCost = models.reduce((acc, m) => acc + m.usageToday.cost, 0);
  const totalTokens = models.reduce((acc, m) => acc + m.usageToday.tokens, 0);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{models.filter(m => m.isActive).length}</p>
                <p className="text-xs text-white/50">Active Models</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${totalCost.toFixed(2)}</p>
                <p className="text-xs text-white/50">Today's Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{(totalTokens / 1000000).toFixed(2)}M</p>
                <p className="text-xs text-white/50">Tokens Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Models Table */}
      <Card>
        <CardHeader>
          <CardTitle>Model Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Model</th>
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Provider</th>
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Context</th>
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Cost/1K</th>
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Today&apos;s Usage</th>
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Latency</th>
                  <th className="text-left text-xs font-medium text-white/50 py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <motion.tr
                    key={model.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{model.name}</p>
                        <div className="flex gap-1 mt-1">
                          {model.specialties.slice(0, 2).map((s, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px]">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-white/70">{model.provider}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-white/70">{(model.contextWindow / 1000).toFixed(0)}k</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-xs text-white/50">
                        <div>In: ${model.inputCost}</div>
                        <div>Out: ${model.outputCost}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-sm text-white">${model.usageToday.cost.toFixed(2)}</div>
                        <div className="text-xs text-white/40">{(model.usageToday.tokens / 1000).toFixed(0)}k tokens</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-white/70">{model.avgLatency}s</span>
                    </td>
                    <td className="py-4 px-4">
                      {model.isActive ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-white/30">
                          <XCircle className="w-4 h-4" />
                          <span className="text-xs">Inactive</span>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
