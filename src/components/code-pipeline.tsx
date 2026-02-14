"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  GitBranch, 
  GitCommit,
  GitPullRequest,
  Clock,
  CircleCheck,
  CircleX,
  Circle,
  FolderGit2,
  Code2,
  ExternalLink,
  MoreHorizontal,
  ChevronRight,
  Terminal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  branch: string;
  status: "clean" | "dirty" | "ahead" | "behind";
  commits: {
    ahead: number;
    behind: number;
  };
  lastCommit: {
    message: string;
    author: string;
    timestamp: string;
    sha: string;
  };
  languages: Record<string, number>;
  size: string;
}

interface PipelineStage {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "failed";
  duration?: string;
}

const statusIcons = {
  clean: CircleCheck,
  dirty: Circle,
  ahead: ChevronRight,
  behind: ChevronRight,
};

const statusColors = {
  clean: "text-emerald-400",
  dirty: "text-amber-400",
  ahead: "text-blue-400",
  behind: "text-violet-400",
};

const pipelineStatusColors = {
  pending: "text-white/40",
  running: "text-blue-400",
  success: "text-emerald-400",
  failed: "text-rose-400",
};

export function CodePipeline() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRepos([
        {
          id: "1",
          name: "rooted-operator",
          description: "Premium AI agent control panel",
          url: "https://github.com/rooted/operator",
          branch: "main",
          status: "ahead",
          commits: { ahead: 3, behind: 0 },
          lastCommit: {
            message: "Add dark mode support",
            author: "Alice",
            timestamp: "2h ago",
            sha: "a1b2c3d"
          },
          languages: { TypeScript: 65, CSS: 20, Python: 15 },
          size: "2.4 MB"
        },
        {
          id: "2",
          name: "agent-runtime",
          description: "AI agent execution environment",
          url: "https://github.com/rooted/runtime",
          branch: "develop",
          status: "dirty",
          commits: { ahead: 0, behind: 0 },
          lastCommit: {
            message: "Fix memory leak in worker",
            author: "Bob",
            timestamp: "4h ago",
            sha: "e4f5g6h"
          },
          languages: { Python: 80, Rust: 20 },
          size: "5.1 MB"
        },
        {
          id: "3",
          name: "api-gateway",
          description: "GraphQL API gateway",
          url: "https://github.com/rooted/gateway",
          branch: "main",
          status: "clean",
          commits: { ahead: 0, behind: 0 },
          lastCommit: {
            message: "Update rate limiting config",
            author: "Charlie",
            timestamp: "1d ago",
            sha: "i7j8k9l"
          },
          languages: { Go: 70, YAML: 30 },
          size: "1.8 MB"
        },
        {
          id: "4",
          name: "content-service",
          description: "Content management service",
          url: "https://github.com/rooted/content",
          branch: "feature/cms",
          status: "behind",
          commits: { ahead: 0, behind: 12 },
          lastCommit: {
            message: "WIP: New editor component",
            author: "Diana",
            timestamp: "30m ago",
            sha: "m0n1o2p"
          },
          languages: { TypeScript: 60, Vue: 40 },
          size: "3.2 MB"
        },
        {
          id: "5",
          name: "analytics-engine",
          description: "Data processing and analytics",
          url: "https://github.com/rooted/analytics",
          branch: "main",
          status: "clean",
          commits: { ahead: 0, behind: 0 },
          lastCommit: {
            message: "Add real-time dashboards",
            author: "Eve",
            timestamp: "3d ago",
            sha: "q3r4s5t"
          },
          languages: { Python: 50, SQL: 30, TypeScript: 20 },
          size: "8.7 MB"
        },
        {
          id: "6",
          name: "infrastructure",
          description: "Terraform and k8s configs",
          url: "https://github.com/rooted/infra",
          branch: "main",
          status: "ahead",
          commits: { ahead: 5, behind: 0 },
          lastCommit: {
            message: "Scale worker nodes to 6",
            author: "Frank",
            timestamp: "5h ago",
            sha: "u6v7w8x"
          },
          languages: { HCL: 60, YAML: 40 },
          size: "1.2 MB"
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[300px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, index) => {
        const StatusIcon = statusIcons[repo.status];
        const totalLines = Object.values(repo.languages).reduce((a, b) => a + b, 0);
        
        return (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full group">
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
                      <FolderGit2 className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{repo.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <GitBranch className="w-3 h-3" />
                        {repo.branch}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={cn("w-4 h-4", statusColors[repo.status])} />
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4 text-white/40" />
                    </button>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-white/60 mb-4 line-clamp-2">{repo.description}</p>
                
                {/* Last Commit */}
                <div className="p-3 rounded-lg bg-white/[0.03] mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <GitCommit className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-xs text-white/40 font-mono">{repo.lastCommit.sha}</span>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-1">{repo.lastCommit.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                    <span>{repo.lastCommit.author}</span>
                    <span>•</span>
                    <span>{repo.lastCommit.timestamp}</span>
                  </div>
                </div>
                
                {/* Language Breakdown */}
                <div className="mb-4">
                  <div className="flex h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                    {Object.entries(repo.languages).map(([lang, pct], i) => (
                      <div
                        key={lang}
                        className={cn(
                          "h-full",
                          i === 0 ? "bg-blue-500" : i === 1 ? "bg-violet-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {Object.entries(repo.languages).map(([lang, pct]) => (
                      <div key={lang} className="flex items-center gap-1.5 text-xs">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-white/60">{lang}</span>
                        <span className="text-white/40">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    {repo.commits.ahead > 0 && (
                      <span className="text-xs text-blue-400">↑ {repo.commits.ahead}</span>
                    )}
                    {repo.commits.behind > 0 && (
                      <span className="text-xs text-violet-400">↓ {repo.commits.behind}</span>
                    )}
                    <span className="text-xs text-white/40">{repo.size}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 text-xs gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
