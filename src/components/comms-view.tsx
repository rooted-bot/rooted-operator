"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail,
  MessageSquare,
  Bell,
  Send,
  AtSign,
  Hash,
  MoreHorizontal,
  Paperclip,
  Smile,
  Phone,
  Video,
  Search,
  Filter,
  Archive,
  Trash2,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  type: "email" | "chat" | "notification";
  channel: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  avatar?: string;
}

interface Channel {
  id: string;
  name: string;
  type: "email" | "slack" | "discord" | "telegram";
  unread: number;
  icon: string;
}

const channelColors = {
  email: "bg-blue-500/20 text-blue-400",
  slack: "bg-emerald-500/20 text-emerald-400",
  discord: "bg-indigo-500/20 text-indigo-400",
  telegram: "bg-sky-500/20 text-sky-400",
};

export function CommsView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTimeout(() => {
      setChannels([
        { id: "1", name: "support@rooted.io", type: "email", unread: 5, icon: "M" },
        { id: "2", name: "#general", type: "slack", unread: 12, icon: "S" },
        { id: "3", name: "Alerts", type: "discord", unread: 0, icon: "D" },
        { id: "4", name: "Ops Channel", type: "telegram", unread: 3, icon: "T" },
      ]);

      setMessages([
        { id: "1", sender: "Sarah Johnson", subject: "API Integration Help", content: "Hi team, I'm having trouble integrating the API with our CRM. Could someone help me troubleshoot the authentication flow? I've followed the docs but keep getting 401 errors.", type: "email", channel: "support@rooted.io", timestamp: "10 min ago", isRead: false, isStarred: true },
        { id: "2", sender: "System", subject: "Deployment Complete", content: "Production deployment v2.3.1 completed successfully. All health checks passed.", type: "notification", channel: "Alerts", timestamp: "25 min ago", isRead: true, isStarred: false },
        { id: "3", sender: "Alex Chen", subject: "Feature Request: Export", content: "Would love to see an export feature for the dashboard data. CSV and JSON formats would be ideal for our reporting needs.", type: "chat", channel: "#general", timestamp: "1 hour ago", isRead: false, isStarred: false },
        { id: "4", sender: "Monitoring", subject: "High CPU Alert", content: "CPU usage on api-prod-02 has exceeded 85% for more than 5 minutes.", type: "notification", channel: "Ops Channel", timestamp: "2 hours ago", isRead: true, isStarred: false },
        { id: "5", sender: "Mike Davis", subject: "Contract Question", content: "Quick question about the enterprise contract terms. Can we discuss the SLA details?", type: "email", channel: "support@rooted.io", timestamp: "3 hours ago", isRead: true, isStarred: true },
        { id: "6", sender: "Product Team", subject: "Q1 Roadmap Review", content: "Please review the updated Q1 roadmap and provide feedback by Friday.", type: "chat", channel: "#general", timestamp: "5 hours ago", isRead: false, isStarred: false },
      ]);
      setLoading(false);
    }, 800);
  };

  const toggleStar = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isStarred: !m.isStarred } : m));
  };

  const markAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    
    // Simulate sending reply
    setReplyText("");
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.subject.toLowerCase().includes(search.toLowerCase()) ||
                         m.sender.toLowerCase().includes(search.toLowerCase()) ||
                         m.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || m.type === filter || (filter === "unread" && !m.isRead) || (filter === "starred" && m.isStarred);
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-4 h-[calc(100vh-200px)]">
        <Skeleton className="h-full" />
        <Skeleton className="lg:col-span-3 h-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-4 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <Card className="h-full overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Inbox
            {unreadCount > 0 && (
              <Badge className="ml-auto">{unreadCount}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-3 pb-3 space-y-1">
            {[
              { id: "all", label: "All Messages", icon: Mail },
              { id: "unread", label: "Unread", icon: AlertCircle },
              { id: "starred", label: "Starred", icon: Star },
              { id: "email", label: "Email", icon: Mail },
              { id: "chat", label: "Chat", icon: MessageSquare },
              { id: "notification", label: "Notifications", icon: Bell },
            ].map(item => {
              const Icon = item.icon;
              const count = item.id === "unread" ? unreadCount : 
                           item.id === "all" ? messages.length :
                           item.id === "starred" ? messages.filter(m => m.isStarred).length :
                           messages.filter(m => m.type === item.id).length;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                    filter === item.id ? "bg-white/[0.08] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                  <span className="ml-auto text-xs text-white/40">{count}</span>
                </button>
              );
            })}
          </div>
          
          <div className="border-t border-white/[0.06] pt-3 px-3">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Channels</p>
            <div className="space-y-1">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors text-left"
                >
                  <div className={cn("w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold", channelColors[channel.type])}>
                    {channel.icon}
                  </div>
                  <span className="text-sm text-white/70 truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <Badge className="ml-auto text-[10px] h-5">{channel.unread}</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message List */}
      <Card className="lg:col-span-2 h-full overflow-hidden">
        <CardHeader className="pb-3 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Messages</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input 
                  placeholder="Search..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-8 w-48"
                />
              </div>
              <Button size="icon" variant="ghost" className="w-8 h-8">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100%-60px)]">
            <div className="divide-y divide-white/[0.06]">
              {filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    markAsRead(message.id);
                  }}
                  className={cn(
                    "w-full p-4 text-left hover:bg-white/[0.03] transition-colors",
                    selectedMessage?.id === message.id && "bg-white/[0.06]",
                    !message.isRead && "bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center text-sm font-medium text-white shrink-0">
                      {message.sender[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn("text-sm", !message.isRead ? "font-semibold text-white" : "text-white/70")}>
                          {message.sender}
                        </span>
                        <span className="text-xs text-white/40">{message.timestamp}</span>
                      </div>
                      <p className={cn("text-sm mb-1 truncate", !message.isRead ? "text-white" : "text-white/60")}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-white/40 line-clamp-2">{message.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {message.channel}
                        </Badge>
                        {message.isStarred && <Star className="w-3 h-3 text-amber-400 fill-current" />}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Detail */}
      <Card className="h-full overflow-hidden">
        {selectedMessage ? (
          <>
            <CardHeader className="pb-3 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="w-8 h-8" onClick={() => toggleStar(selectedMessage.id)}>
                    <Star className={cn("w-4 h-4", selectedMessage.isStarred ? "text-amber-400 fill-current" : "text-white/40")} />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8">
                    <Archive className="w-4 h-4 text-white/40" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8">
                    <Trash2 className="w-4 h-4 text-white/40" />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="w-8 h-8">
                    <Phone className="w-4 h-4 text-white/40" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-8 h-8">
                    <Video className="w-4 h-4 text-white/40" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[calc(100%-60px)]">
              <ScrollArea className="flex-1 p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center text-sm font-medium text-white shrink-0">
                    {selectedMessage.sender[0]}
                  </div>
                  <div>
                    <p className="font-medium text-white">{selectedMessage.sender}</p>
                    <p className="text-xs text-white/40">{selectedMessage.channel} • {selectedMessage.timestamp}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{selectedMessage.subject}</h3>
                <p className="text-sm text-white/70 whitespace-pre-wrap">{selectedMessage.content}</p>
              </ScrollArea>
              
              {/* Reply */}
              <div className="p-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Reply..."
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendReply()}
                  />
                  <Button size="icon" variant="ghost" className="w-9 h-9 shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-9 h-9 shrink-0">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="w-9 h-9 shrink-0"
                    onClick={sendReply}
                    disabled={!replyText.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-6">
            <div>
              <Mail className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">Select a message to view</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
