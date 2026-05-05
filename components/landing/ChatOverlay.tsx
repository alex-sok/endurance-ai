"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatShell } from "@/components/chat/ChatShell";
import { MonoLabel } from "@/components/ui/MonoLabel";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ChatOverlay({ open, onClose }: Props) {
  // ESC to close + lock body scroll while open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: "#f7f7f4" }}
        >
          {/* Overlay header — replaces ChatShell's own header */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-6 h-14"
            style={{ borderBottom: "1px solid #e6e5e0" }}
          >
            <img src="/logo-endurance.svg" alt="Endurance AI Labs" className="h-4 w-auto" />

            <button
              onClick={onClose}
              className="flex items-center gap-2 transition-colors duration-150 text-[#7a7974] hover:text-[#262510]"
            >
              <MonoLabel>Mission Briefing</MonoLabel>
              <span
                className="text-xs"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                ✕
              </span>
            </button>
          </div>

          {/* Chat — hideHeader since we rendered our own above */}
          <div className="flex-1 overflow-hidden px-4 sm:px-6">
            <ChatShell hideHeader />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
