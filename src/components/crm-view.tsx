"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  DollarSign,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  status: "prospect" | "contacted" | "meeting" | "proposal" | "active";
  lastContact: string;
  nextAction?: string;
  avatar?: string;
}

const columns = [
  { id: "prospect", label: "Prospect", color: "text-slate-400" },
  { id: "contacted", label: "Contacted", color: "text-blue-400" },
  { id: "meeting", label: "Meeting", color: "text-violet-400" },
  { id: "proposal", label: "Proposal", color: "text-amber-400" },
  { id: "active", label: "Active", color: "text-emerald-400" },
];

const statusColors = {
  prospect: "bg-slate-500/10 text-slate-400",
  contacted: "bg-blue-500/10 text-blue-400",
  meeting: "bg-violet-500/10 text-violet-400",
  proposal: "bg-amber-500/10 text-amber-400",
  active: "bg-emerald-500/10 text-emerald-400",
};

export function CRMView() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClients([
        { id: "1", name: "Sarah Chen", company: "TechCorp Inc.", email: "sarah@techcorp.com", phone: "+1 555-0123", value: 50000, status: "prospect", lastContact: "3 days ago" },
        { id: "2", name: "Michael Ross", company: "StartupXYZ", email: "mike@startupxyz.com", phone: "+1 555-0124", value: 25000, status: "prospect", lastContact: "1 week ago" },
        { id: "3", name: "Emily Watson", company: "Global Systems", email: "emily@globalsys.com", phone: "+1 555-0125", value: 75000, status: "contacted", lastContact: "2 days ago", nextAction: "Follow up email" },
        { id: "4", name: "David Kim", company: "DataFlow Ltd", email: "david@dataflow.io", phone: "+1 555-0126", value: 100000, status: "contacted", lastContact: "1 day ago" },
        { id: "5", name: "Lisa Johnson", company: "CloudFirst", email: "lisa@cloudfirst.com", phone: "+1 555-0127", value: 150000, status: "meeting", lastContact: "Today", nextAction: "Product demo" },
        { id: "6", name: "James Wilson", company: "InnovateTech", email: "james@innovatetech.com", phone: "+1 555-0128", value: 200000, status: "proposal", lastContact: "Yesterday", nextAction: "Send contract" },
        { id: "7", name: "Anna Martinez", company: "SmartSolutions", email: "anna@smartsolutions.com", phone: "+1 555-0129", value: 300000, status: "active", lastContact: "Today" },
        { id: "8", name: "Robert Taylor", company: "FutureWorks", email: "rob@futureworks.com", phone: "+1 555-0130", value: 175000, status: "active", lastContact: "2 days ago" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const moveClient = (clientId: string, newStatus: Client["status"]) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, status: newStatus } : c));
  };

  const totalPipeline = clients.reduce((acc, c) => acc + c.value, 0);
  const activeRevenue = clients.filter(c => c.status === "active").reduce((acc, c) => acc + c.value, 0);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="grid gap-4 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[500px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{clients.length}</p>
                <p className="text-xs text-white/50">Total Clients</p>
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
                <p className="text-2xl font-bold text-white">${(totalPipeline / 1000).toFixed(0)}k</p>
                <p className="text-xs text-white/50">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${(activeRevenue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-white/50">Active Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {columns.map((column, colIndex) => {
          const columnClients = clients.filter(c => c.status === column.id);
          const columnValue = columnClients.reduce((acc, c) => acc + c.value, 0);
          
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
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {columnClients.length}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-white/40 mb-3">${(columnValue / 1000).toFixed(0)}k</p>
              
              <ScrollArea className="h-[450px]">
                <div className="space-y-3 pr-2">
                  {columnClients.map((client, clientIndex) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: clientIndex * 0.05 }}
                      className="kanban-card group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs text-white font-medium">
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                      
                      <h4 className="text-sm font-medium text-white">{client.name}</h4>
                      <p className="text-xs text-white/50 mb-2">{client.company}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="w-3 h-3 text-white/30" />
                        <Phone className="w-3 h-3 text-white/30" />
                      </div>
                      
                      <div className="pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-white/40">Value</span>
                          <span className="text-sm font-medium text-white">${(client.value / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-white/30">
                          <Calendar className="w-3 h-3" />
                          {client.lastContact}
                        </div>
                      </div>
                      
                      {/* Move buttons */}
                      <div className="flex gap-1 mt-3 pt-3 border-t border-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity">
                        {column.id !== "prospect" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs"
                            onClick={() => {
                              const prevColumn = columns[columns.findIndex(c => c.id === column.id) - 1];
                              if (prevColumn) moveClient(client.id, prevColumn.id as Client["status"]);
                            }}
                          >
                            ← Back
                          </Button>
                        )}
                        {column.id !== "active" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs ml-auto"
                            onClick={() => {
                              const nextColumn = columns[columns.findIndex(c => c.id === column.id) + 1];
                              if (nextColumn) moveClient(client.id, nextColumn.id as Client["status"]);
                            }}
                          >
                            Next →
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
