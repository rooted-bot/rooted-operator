"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  FileText, 
  GitBranch, 
  Bot,
  Terminal,
  Mail,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickActions = [
  { id: "task", label: "New Task", icon: Plus, color: "text-blue-400" },
  { id: "agent", label: "Spawn Agent", icon: Bot, color: "text-violet-400" },
  { id: "message", label: "Send Message", icon: MessageSquare, color: "text-emerald-400" },
  { id: "content", label: "Create Content", icon: FileText, color: "text-amber-400" },
  { id: "git", label: "Git Command", icon: GitBranch, color: "text-orange-400" },
  { id: "terminal", label: "Terminal", icon: Terminal, color: "text-slate-400" },
  { id: "email", label: "Compose Email", icon: Mail, color: "text-cyan-400" },
  { id: "event", label: "Schedule Event", icon: Calendar, color: "text-pink-400" },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] transition-all"
              >
                <Icon className={`w-5 h-5 ${action.color}`} />
                <span className="text-xs text-white/70">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
