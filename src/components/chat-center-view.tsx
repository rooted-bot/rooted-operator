"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Hash, 
  Command,
  MessageSquare,
  MoreHorizontal,
  Search,
  Bot,
  User,
  Phone,
  Video,
  Paperclip
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  type: "telegram" | "discord" | "slack" | "email";
  unread: number;
  lastMessage: string;
  timestamp: string;
  isActive: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: string;
  isAgent: boolean;
  timestamp: string;
  avatar?: string;
}

const quickCommands = [
  { id: "1", command: "/status", description: "Get system status" },
  { id: "2", command: "/agents", description: "List active agents" },
  { id: "3", command: "/task", description: "Create new task" },
  { id: "4", command: "/deploy", description: "Deploy to production" },
  { id: "5", command: "/logs", description: "View recent logs" },
  { id: "6", command: "/help", description: "Show available commands" },
];

const channelIcons = {
  telegram: "T",
  discord: "D",
  slack: "S",
  email: "E",
};

const channelColors = {
  telegram: "bg-blue-500/20 text-blue-400",
  discord: "bg-indigo-500/20 text-indigo-400",
  slack: "bg-emerald-500/20 text-emerald-400",
  email: "bg-amber-500/20 text-amber-400",
};

export function ChatCenterView() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("1");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "commands">("messages");

  useEffect(() => {
    setTimeout(() => {
      setChannels([
        { id: "1", name: "general", type: "telegram", unread: 3, lastMessage: "New deployment ready", timestamp: "2m ago", isActive: true },
        { id: "2", name: "alerts", type: "discord", unread: 0, lastMessage: "CPU spike detected", timestamp: "15m ago", isActive: false },
        { id: "3", name: "team-chat", type: "slack", unread: 12, lastMessage: "Alice: Working on the fix", timestamp: "1h ago", isActive: false },
        { id: "4", name: "support", type: "email", unread: 5, lastMessage: "Re: API Access Request", timestamp: "2h ago", isActive: false },
        { id: "5", name: "ops", type: "telegram", unread: 0, lastMessage: "Backup completed", timestamp: "3h ago", isActive: false },
      ]);

      setMessages([
        { id: "1", content: "Hey team, the new feature is ready for review!", sender: "Alice", isAgent: true, timestamp: "10:30 AM" },
        { id: "2", content: "Great! I'll take a look at it now.", sender: "You", isAgent: false, timestamp: "10:32 AM" },
        { id: "3", content: "Found a small issue with the auth flow. Should be a quick fix.", sender: "Alice", isAgent: true, timestamp: "10:45 AM" },
        { id: "4", content: "Thanks for catching that. Let me know when it's updated.", sender: "You", isAgent: false, timestamp: "10:46 AM" },
        { id: "5", content: "Fixed! The token validation was missing a check. Deployed to staging.", sender: "Alice", isAgent: true, timestamp: "11:02 AM" },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "You",
      isAgent: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    
    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Got it! I'll process that for you.",
        sender: "Alice",
        isAgent: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-4 h-[calc(100vh-200px)]">
        <Skeleton className="h-full" />
        <Skeleton className="lg:col-span-3 h-full" />
      </div>
    );
  }

  const activeChannel = channels.find(c => c.id === selectedChannel);

  return (
    <div className="grid gap-4 lg:grid-cols-4 h-[calc(100vh-200px)]">
      {/* Channel List */}
      <Card className="h-full overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Channels
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input 
              placeholder="Search channels..." 
              className="pl-9 h-8 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100%-100px)]">
            <div className="space-y-1 px-3 pb-3">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left",
                    selectedChannel === channel.id 
                      ? "bg-white/[0.08]" 
                      : "hover:bg-white/[0.04]"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold",
                    channelColors[channel.type]
                  )}>
                    {channelIcons[channel.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white truncate">{channel.name}</p>
                      <span className="text-[10px] text-white/40">{channel.timestamp}</span>
                    </div>
                    <p className="text-xs text-white/50 truncate">{channel.lastMessage}</p>
                  </div>
                  {channel.unread > 0 && (
                    <Badge variant="default" className="text-[10px] h-5 min-w-5">
                      {channel.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-3 h-full overflow-hidden flex flex-col">
        {/* Header */}
        <CardHeader className="pb-3 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeChannel && (
                <>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold",
                    channelColors[activeChannel.type]
                  )}>
                    {channelIcons[activeChannel.type]}
                  </div>
                  <div>
                    <CardTitle className="text-base">{activeChannel.name}</CardTitle>
                    <p className="text-xs text-white/50">{channels.length} participants</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="w-9 h-9">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="w-9 h-9">
                <Video className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="w-9 h-9">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center gap-1 mt-3">
            <button
              onClick={() => setActiveTab("messages")}
              className={cn(
                "px-4 py-1.5 text-sm rounded-lg transition-colors",
                activeTab === "messages" ? "bg-white/[0.08] text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab("commands")}
              className={cn(
                "px-4 py-1.5 text-sm rounded-lg transition-colors",
                activeTab === "commands" ? "bg-white/[0.08] text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              Commands
            </button>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 overflow-hidden p-0">
          {activeTab === "messages" ? (
            <>
              <ScrollArea className="h-[calc(100%-80px)] px-5 py-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "flex gap-3",
                        !message.isAgent && "flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        message.isAgent 
                          ? "bg-gradient-to-br from-blue-500 to-violet-600" 
                          : "bg-white/[0.08]"
                      )}>
                        {message.isAgent ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white/70" />
                        )}
                      </div>
                      <div className={cn(
                        "max-w-[70%]",
                        !message.isAgent && "text-right"
                      )}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-white/70">{message.sender}</span>
                          <span className="text-[10px] text-white/40">{message.timestamp}</span>
                        </div>
                        <div className={cn(
                          "inline-block px-4 py-2.5 rounded-2xl text-sm",
                          message.isAgent 
                            ? "bg-white/[0.06] text-white/90 rounded-tl-none" 
                            : "bg-blue-500/20 text-blue-100 rounded-tr-none"
                        )}>
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Input */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06] bg-[#0a0a0a]">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="w-9 h-9 shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    className="w-9 h-9 shrink-0"
                    onClick={sendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <ScrollArea className="h-full px-5 py-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {quickCommands.map((cmd) => (
                  <motion.button
                    key={cmd.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] transition-all text-left"
                    onClick={() => setInputValue(cmd.command)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Command className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white font-mono">{cmd.command}</p>
                      <p className="text-xs text-white/50 mt-0.5">{cmd.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
