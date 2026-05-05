"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ onSubmit, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3 transition-all duration-200"
      style={{
        background: "#0c0c0b",
        border: "1px solid #1f2228",
        borderRadius: "24px",
        boxShadow: focused ? "rgb(113, 113, 122) 0px 0px 0px 2px" : "none",
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder ?? "What do you want to know?"}
        disabled={disabled}
        rows={1}
        style={{ caretColor: "#2563eb", letterSpacing: "-0.025em" }}
        className={cn(
          "flex-1 resize-none overflow-hidden bg-transparent text-[0.9375rem] font-normal text-white placeholder:text-[#7d8187] focus:outline-none leading-relaxed min-h-[1.5rem] max-h-40",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      />
      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-150",
          canSubmit
            ? "bg-white text-[#0c0c0b] hover:bg-[#e5e7eb]"
            : "border border-[#1f2228] text-[#474747] cursor-not-allowed"
        )}
        style={{ borderRadius: "9999px" }}
      >
        <ArrowUp size={15} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
