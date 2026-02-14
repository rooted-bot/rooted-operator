"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TabBar } from "@/components/tab-bar";
import { ChatCenterView } from "@/components/chat-center-view";
import { VoiceInput } from "@/components/voice-input";

const tabs = [
  { id: "chat", label: "Chat Center" },
  { id: "voice", label: "Voice" },
];

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-white">Chat</h1>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "chat" ? <ChatCenterView /> : <VoiceInput />}
    </motion.div>
  );
}
