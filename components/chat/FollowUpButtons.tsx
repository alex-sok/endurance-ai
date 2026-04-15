"use client";

import { motion } from "framer-motion";
import type { FollowUp } from "@/types/chat";

interface FollowUpButtonsProps {
  followUps: FollowUp[];
  onSelect: (followUp: FollowUp) => void;
}

export function FollowUpButtons({ followUps, onSelect }: FollowUpButtonsProps) {
  if (!followUps.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-2 mt-1"
    >
      {followUps.map((fu, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
          onClick={() => onSelect(fu)}
          className="px-3.5 py-1.5 text-sm font-light text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all duration-150 cursor-pointer select-none"
        >
          {fu.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
