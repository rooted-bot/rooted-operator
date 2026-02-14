"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  BookOpen,
  FileText,
  Code,
  Video,
  ExternalLink,
  Clock,
  Star,
  History,
  Command,
  Sparkles,
  Bookmark
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface KnowledgeItem {
  id: string;
  title: string;
  type: "doc" | "article" | "video" | "code" | "guide";
  excerpt: string;
  tags: string[];
  author: string;
  updatedAt: string;
  views: number;
  isBookmarked: boolean;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "trending" | "suggestion";
}

const typeIcons = {
  doc: FileText,
  article: BookOpen,
  video: Video,
  code: Code,
  guide: Sparkles,
};

const typeColors = {
  doc: "bg-blue-500/20 text-blue-400",
  article: "bg-violet-500/20 text-violet-400",
  video: "bg-rose-500/20 text-rose-400",
  code: "bg-emerald-500/20 text-emerald-400",
  guide: "bg-amber-500/20 text-amber-400",
};

export function KnowledgeBase() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions] = useState<SearchSuggestion[]>([
    { id: "1", text: "API authentication", type: "recent" },
    { id: "2", text: "Webhook integration", type: "recent" },
    { id: "3", text: "Best practices for AI agents", type: "trending" },
    { id: "4", text: "Rate limiting guide", type: "suggestion" },
    { id: "5", text: "Error handling patterns", type: "suggestion" },
  ]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setTimeout(() => {
      setItems([
        { id: "1", title: "Getting Started with Agents", type: "guide", excerpt: "Learn how to set up and configure your first AI agent in under 5 minutes.", tags: ["Beginner", "Setup"], author: "Alice", updatedAt: "2 days ago", views: 12500, isBookmarked: true },
        { id: "2", title: "API Reference v2.0", type: "doc", excerpt: "Complete API documentation including endpoints, authentication, and examples.", tags: ["API", "Reference"], author: "Bob", updatedAt: "1 week ago", views: 8900, isBookmarked: false },
        { id: "3", title: "Building Custom Integrations", type: "article", excerpt: "Step-by-step guide to building custom integrations with third-party services.", tags: ["Integration", "Advanced"], author: "Charlie", updatedAt: "3 days ago", views: 5600, isBookmarked: true },
        { id: "4", title: "Authentication Patterns", type: "code", excerpt: "Common authentication patterns and security best practices.", tags: ["Security", "Code"], author: "Diana", updatedAt: "5 days ago", views: 7200, isBookmarked: false },
        { id: "5", title: "Webhook Setup Tutorial", type: "video", excerpt: "Video tutorial covering webhook configuration and event handling.", tags: ["Video", "Webhooks"], author: "Eve", updatedAt: "1 day ago", views: 3400, isBookmarked: false },
        { id: "6", title: "Rate Limiting Strategies", type: "doc", excerpt: "Understanding rate limits and implementing backoff strategies.", tags: ["Performance", "API"], author: "Frank", updatedAt: "2 weeks ago", views: 4500, isBookmarked: true },
        { id: "7", title: "Agent Configuration Guide", type: "guide", excerpt: "Deep dive into agent configuration options and optimization.", tags: ["Configuration", "Advanced"], author: "Grace", updatedAt: "4 days ago", views: 6700, isBookmarked: false },
        { id: "8", title: "Error Handling Examples", type: "code", excerpt: "Common error scenarios and how to handle them gracefully.", tags: ["Errors", "Code"], author: "Henry", updatedAt: "6 days ago", views: 5100, isBookmarked: false },
      ]);
      setLoading(false);
    }, 800);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleBookmark = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            placeholder="Search knowledge base..."
            className="pl-12 h-14 text-lg bg-white/[0.05] border-white/[0.08] rounded-2xl"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-white/30">
            <Command className="w-4 h-4" />
            <span className="text-xs">K</span>
          </div>
        </div>

        {/* Search Suggestions */}
        {isSearching && !search && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 glass-card z-50"
          >
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <History className="w-3 h-3" /> Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.filter(s => s.type === "recent").map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSearch(s.text)}
                      className="px-3 py-1.5 text-sm text-white/60 bg-white/[0.05] rounded-lg hover:bg-white/[0.08] transition-colors"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.filter(s => s.type === "trending").map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSearch(s.text)}
                      className="px-3 py-1.5 text-sm text-white/60 bg-white/[0.05] rounded-lg hover:bg-white/[0.08] transition-colors"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(typeIcons).map(([type, Icon], index) => (
          <motion.button
            key={type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-colors text-left"
          >
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", typeColors[type as keyof typeof typeColors])}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-white capitalize">{type}s</span>
          </motion.button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredItems.map((item, index) => {
            const Icon = typeIcons[item.type];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", typeColors[item.type])}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-white/50 line-clamp-2">{item.excerpt}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(item.id);
                              }}
                              className={cn(
                                "p-2 rounded-lg transition-colors",
                                item.isBookmarked ? "text-amber-400" : "text-white/30 hover:text-white/60"
                              )}
                            >
                              <Bookmark className={cn("w-4 h-4", item.isBookmarked && "fill-current")} />
                            </button>
                            <ExternalLink className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5 text-xs text-white/40">
                            <Clock className="w-3 h-3" />
                            {item.updatedAt}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-white/40">
                            <Star className="w-3 h-3" />
                            {item.views.toLocaleString()} views
                          </div>
                          <div className="flex items-center gap-2">
                            {item.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
