"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatShell } from "@/components/chat/ChatShell";

interface Props {
  open: boolean;
  onClose: () => void;
  getSessionId?: () => string | null;
}

export function ChatOverlay({ open, onClose, getSessionId }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: "#ffffff" }}
          data-lenis-prevent
        >
          <div
            className="flex-shrink-0 flex items-center justify-between px-6 h-14"
            style={{ borderBottom: "1px solid rgba(28,27,22,0.12)" }}
          >
            <img src="/logo-endurance.svg" alt="Endurance AI Labs" className="h-3.5 w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                border: 0,
                background: "transparent",
                fontSize: 14,
                color: "#5a584f",
                cursor: "pointer",
                padding: "8px 4px",
              }}
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-hidden px-4 sm:px-6">
            <ChatShell hideHeader getSessionId={getSessionId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
