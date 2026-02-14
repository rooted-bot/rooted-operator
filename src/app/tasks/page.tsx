"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { TasksKanban } from "@/components/tasks-kanban";
import { TasksCalendar } from "@/components/tasks-calendar";

const tabs = [
  { id: "kanban", label: "Tasks" },
  { id: "calendar", label: "Calendar" },
];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("kanban");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Tasks</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "kanban" ? <TasksKanban /> : <TasksCalendar />}
    </motion.div>
  );
}
