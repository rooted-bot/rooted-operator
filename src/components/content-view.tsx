"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Edit3, 
  Eye, 
  Send,
  MoreHorizontal,
  Image,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  preview: string;
  platform: "twitter" | "linkedin" | "youtube" | "blog" | "newsletter";
  status: "draft" | "review" | "scheduled" | "published";
  createdAt: string;
  scheduledFor?: string;
  author: string;
  thumbnail?: string;
}

const columns = [
  { id: "draft", label: "Draft", color: "text-slate-400" },
  { id: "review", label: "Review", color: "text-amber-400" },
  { id: "scheduled", label: "Scheduled", color: "text-violet-400" },
  { id: "published", label: "Published", color: "text-emerald-400" },
];

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  blog: Globe,
  newsletter: FileText,
};

const platformColors = {
  twitter: "text-sky-400",
  linkedin: "text-blue-600",
  youtube: "text-red-500",
  blog: "text-emerald-400",
  newsletter: "text-amber-400",
};

const statusColors = {
  draft: "bg-slate-500/10 text-slate-400",
  review: "bg-amber-500/10 text-amber-400",
  scheduled: "bg-violet-500/10 text-violet-400",
  published: "bg-emerald-500/10 text-emerald-400",
};

export function ContentView() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setItems([
        { id: "1", title: "AI Trends 2025", preview: "Exploring the future of artificial intelligence...", platform: "blog", status: "draft", createdAt: "2h ago", author: "Alice" },
        { id: "2", title: "Product Launch Thread", preview: "🚀 Excited to announce our new feature...", platform: "twitter", status: "draft", createdAt: "4h ago", author: "Bob" },
        { id: "3", title: "Company Update", preview: "This quarter has been incredible...", platform: "linkedin", status: "review", createdAt: "1d ago", author: "Charlie" },
        { id: "4", title: "Tutorial Video", preview: "Learn how to use our API in 5 minutes...", platform: "youtube", status: "review", createdAt: "2d ago", author: "Diana" },
        { id: "5", title: "Weekly Newsletter", preview: "Here's what happened this week...", platform: "newsletter", status: "scheduled", scheduledFor: "Tomorrow, 9:00 AM", createdAt: "3d ago", author: "Eve" },
        { id: "6", title: "Feature Announcement", preview: "We're launching something big...", platform: "twitter", status: "scheduled", scheduledFor: "Feb 15, 10:00 AM", createdAt: "3d ago", author: "Frank" },
        { id: "7", title: "Developer Guide", preview: "Complete guide to our platform...", platform: "blog", status: "published", createdAt: "1w ago", author: "Grace" },
        { id: "8", title: "Community Update", preview: "Thank you to our amazing community...", platform: "linkedin", status: "published", createdAt: "1w ago", author: "Henry" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const moveItem = (itemId: string, newStatus: ContentItem["status"]) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, status: newStatus } : i));
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[600px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((column, colIndex) => {
        const columnItems = items.filter(i => i.status === column.id);
        
        return (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.05 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={cn("text-sm font-semibold", column.color)}>
                {column.label}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {columnItems.length}
              </Badge>
            </div>
            
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-2">
                {columnItems.map((item, itemIndex) => {
                  const PlatformIcon = platformIcons[item.platform];
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 }}
                      className="kanban-card group"
                    >
                      {/* Thumbnail */}
                      <div className="w-full h-24 rounded-lg bg-white/[0.04] mb-3 flex items-center justify-center">
                        <Image className="w-8 h-8 text-white/20" />
                      </div>
                      
                      {/* Platform */}
                      <div className="flex items-center gap-2 mb-2">
                        <PlatformIcon className={cn("w-3.5 h-3.5", platformColors[item.platform])} />
                        <span className="text-[10px] uppercase text-white/40">{item.platform}</span>
                      </div>
                      
                      {/* Title & Preview */}
                      <h4 className="text-sm font-medium text-white mb-1 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-white/50 mb-3 line-clamp-2">{item.preview}</p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-[10px] text-white">
                            {item.author[0]}
                          </div>
                          <span className="text-[10px] text-white/40">{item.createdAt}</span>
                        </div>
                        
                        {item.scheduledFor && (
                          <div className="flex items-center gap-1 text-[10px] text-violet-400">
                            <Clock className="w-3 h-3" />
                            {item.scheduledFor}
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-1 mt-3 pt-3 border-t border-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="h-7 text-xs flex-1">
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        {column.id !== "published" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs flex-1"
                            onClick={() => {
                              const nextColumn = columns[columns.findIndex(c => c.id === column.id) + 1];
                              if (nextColumn) moveItem(item.id, nextColumn.id as ContentItem["status"]);
                            }}
                          >
                            {column.id === "scheduled" ? (
                              <><Send className="w-3 h-3 mr-1" /> Publish</>
                            ) : (
                              "Next →"
                            )}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </motion.div>
        );
      })}
    </div>
  );
}
