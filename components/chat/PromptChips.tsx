"use client";

import { motion } from "framer-motion";
import type { RouteId } from "@/types/chat";
import { INITIAL_PROMPTS } from "@/lib/content";

interface PromptChipsProps {
  onSelect: (label: string, routeId: RouteId) => void;
}

export function PromptChips({ onSelect }: PromptChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-2"
    >
      {INITIAL_PROMPTS.map((prompt, i) => (
        <motion.button
          key={prompt.routeId}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}
          onClick={() => onSelect(prompt.label, prompt.routeId)}
          className="px-3.5 py-2 text-sm font-light text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all duration-150 cursor-pointer select-none"
        >
          {prompt.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
