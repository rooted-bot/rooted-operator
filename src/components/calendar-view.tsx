"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, isToday, isSameDay, startOfWeek } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "meeting" | "deadline" | "task" | "reminder";
  time?: string;
}

const eventColors = {
  meeting: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  deadline: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  task: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  reminder: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export function CalendarStrip() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setTimeout(() => {
      const today = new Date();
      setEvents([
        { id: "1", title: "Team Standup", date: today, type: "meeting", time: "09:00" },
        { id: "2", title: "Review Q4 Goals", date: addDays(today, 1), type: "task" },
        { id: "3", title: "Client Call: TechCorp", date: addDays(today, 1), type: "meeting", time: "14:00" },
        { id: "4", title: "Deploy to Prod", date: addDays(today, 2), type: "deadline" },
        { id: "5", title: "Weekly Review", date: addDays(today, 4), type: "reminder" },
        { id: "6", title: "Update Documentation", date: addDays(today, 5), type: "task" },
        { id: "7", title: "Quarterly Planning", date: addDays(today, 6), type: "meeting", time: "10:00" },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(new Date()), i));
  const selectedEvents = events.filter(e => isSameDay(e.date, selectedDate));

  if (loading) {
    return (
      <Card className="h-[400px]">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-violet-400" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Week Strip */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
          {weekDays.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            const dayEvents = events.filter(e => isSameDay(e.date, day));
            
            return (
              <motion.button
                key={index}
                onClick={() => setSelectedDate(day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl min-w-[52px] transition-colors",
                  isSelected ? "bg-white/[0.1]" : "bg-white/[0.03] hover:bg-white/[0.06]",
                  isTodayDate && "ring-1 ring-blue-500/50"
                )}
              >
                <span className="text-[10px] text-white/50 uppercase">
                  {format(day, "EEE")}
                </span>
                <span className={cn(
                  "text-sm font-semibold",
                  isTodayDate ? "text-blue-400" : "text-white"
                )}>
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 mt-1">
                    {dayEvents.slice(0, 3).map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-blue-400" />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Events for Selected Day */}
        <div className="space-y-2">
          <p className="text-xs text-white/50 mb-2">
            {isToday(selectedDate) ? "Today" : format(selectedDate, "EEEE, MMMM d")}
          </p>
          {selectedEvents.length === 0 ? (
            <div className="text-center py-8 text-white/30 text-sm">
              No events scheduled
            </div>
          ) : (
            selectedEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border",
                  eventColors[event.type]
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.title}</p>
                  {event.time && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 opacity-70" />
                      <span className="text-xs opacity-70">{event.time}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
