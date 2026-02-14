"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Calendar as CalendarIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  format, 
  startOfWeek, 
  addDays, 
  isSameDay,
  isToday,
  addWeeks,
  subWeeks
} from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarTask {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  project: string;
  status: "todo" | "in-progress" | "done";
}

const projectColors: Record<string, string> = {
  "API": "bg-blue-500",
  "Frontend": "bg-violet-500",
  "Content": "bg-amber-500",
  "DevOps": "bg-emerald-500",
  "Design": "bg-pink-500",
};

const statusColors = {
  todo: "opacity-60",
  "in-progress": "opacity-100",
  done: "opacity-40 line-through",
};

export function TasksCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [tasks, setTasks] = useState<Record<string, CalendarTask[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const weekStart = startOfWeek(currentWeek);
      const mockTasks: Record<string, CalendarTask[]> = {};
      
      // Generate some sample tasks for the week
      for (let i = 0; i < 7; i++) {
        const date = addDays(weekStart, i);
        const dateKey = format(date, "yyyy-MM-dd");
        
        if (i === 0) {
          mockTasks[dateKey] = [
            { id: "1", title: "Team Standup", startTime: "09:00", endTime: "09:30", project: "DevOps", status: "done" },
            { id: "2", title: "Code Review", startTime: "10:00", endTime: "11:00", project: "API", status: "in-progress" },
            { id: "3", title: "Client Meeting", startTime: "14:00", endTime: "15:00", project: "Frontend", status: "todo" },
          ];
        } else if (i === 2) {
          mockTasks[dateKey] = [
            { id: "4", title: "Sprint Planning", startTime: "10:00", endTime: "12:00", project: "DevOps", status: "todo" },
            { id: "5", title: "Design Review", startTime: "15:00", endTime: "16:00", project: "Design", status: "todo" },
          ];
        } else if (i === 4) {
          mockTasks[dateKey] = [
            { id: "6", title: "Deploy to Prod", startTime: "16:00", endTime: "17:00", project: "DevOps", status: "todo" },
          ];
        }
      }
      
      setTasks(mockTasks);
      setLoading(false);
    }, 600);
  }, [currentWeek]);

  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  if (loading) {
    return (
      <Card className="h-[600px]">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-64 mt-2" />
        <Skeleton className="h-10 w-48 mt-2" />
        <Skeleton className="h-8 w-32 mt-2" />
        <Skeleton className="h-6 w-40 mt-2" />
        <Skeleton className="h-10 w-72 mt-2" />
        <Skeleton className="h-6 w-56 mt-2" />
        <Skeleton className="h-8 w-48 mt-2" />
        <Skeleton className="h-10 w-64 mt-2" />
        <Skeleton className="h-6 w-36 mt-2" />
        <Skeleton className="h-10 w-80 mt-2" />
        <Skeleton className="h-8 w-44 mt-2" />
        <Skeleton className="h-6 w-52 mt-2" />
        <Skeleton className="h-10 w-68 mt-2" />
        <Skeleton className="h-6 w-40 mt-2" />
        <Skeleton className="h-8 w-60 mt-2" />
        <Skeleton className="h-10 w-76 mt-2" />
        <Skeleton className="h-6 w-48 mt-2" />
      </Card>
    );
  }

  return (
    <Card className="h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-violet-400" />
            Week View
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8"
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-white/70 min-w-[140px] text-center">
              {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => setCurrentWeek(new Date())}
        >
          Today
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-7 border-b border-white/[0.06]">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "p-3 text-center border-r border-white/[0.06] last:border-r-0",
                isToday(day) && "bg-white/[0.03]"
              )}
            >
              <p className="text-xs text-white/50 uppercase">{format(day, "EEE")}</p>
              <p className={cn(
                "text-lg font-semibold mt-1",
                isToday(day) ? "text-blue-400" : "text-white"
              )}>
                {format(day, "d")}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 h-[480px]">
          {weekDays.map((day, dayIndex) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayTasks = tasks[dateKey] || [];
            
            return (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: dayIndex * 0.05 }}
                className={cn(
                  "border-r border-white/[0.06] last:border-r-0 p-2 overflow-y-auto",
                  isToday(day) && "bg-white/[0.02]"
                )}
              >
                <div className="space-y-2">
                  {dayTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity",
                        projectColors[task.project] || "bg-slate-500",
                        "bg-opacity-20"
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={cn("w-2 h-2 rounded-full", projectColors[task.project])} />
                        <span className="text-[10px] text-white/70 font-medium">
                          {task.startTime}
                        </span>
                      </div>
                      <p className={cn("text-xs text-white font-medium leading-tight", statusColors[task.status])}>
                        {task.title}
                      </p>
                      <p className="text-[10px] text-white/50 mt-0.5">{task.project}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
