"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript("");
      // Simulate voice recognition
      const phrases = [
        "Hey, can you check the system status?",
        "Deploy the latest changes to production",
        "Create a new task for code review",
        "What's the weather like today?",
      ];
      setTimeout(() => {
        setTranscript(phrases[Math.floor(Math.random() * phrases.length)]);
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Volume2 className="w-5 h-5 text-violet-400" />
            Voice Interface
          </CardTitle>
          <CardDescription>
            Speak naturally to interact with your agents
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col items-center justify-center">
          {/* Wave Animation */}
          <AnimatePresence>
            {isListening && (
              <div className="flex items-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-violet-500 rounded-full"
                    initial={{ height: 20 }}
                    animate={{
                      height: [20, 60, 20],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={toggleListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative w-32 h-32 rounded-full flex items-center justify-center transition-all",
              isListening 
                ? "bg-rose-500/20 border-2 border-rose-500/50" 
                : "bg-violet-500/20 border-2 border-violet-500/50 hover:bg-violet-500/30"
            )}
          >
            <motion.div
              animate={isListening ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 text-rose-400" />
              ) : (
                <Mic className="w-10 h-10 text-violet-400" />
              )}
            </motion.div>
            
            {/* Pulse rings when listening */}
            {isListening && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-rose-500/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-rose-500/20"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.button>

          <p className="mt-6 text-white/50 text-sm">
            {isListening ? "Listening..." : "Tap to speak"}
          </p>

          {/* Transcript */}
          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-4 rounded-xl bg-white/[0.03] max-w-md text-center"
              >
                <p className="text-white/80">"{transcript}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-white/50">Voice service connected</span>
          </div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
