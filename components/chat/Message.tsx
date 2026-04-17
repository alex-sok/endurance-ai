"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

interface MessageProps {
  message: ChatMessage;
  isLast?: boolean;
  typewriter?: boolean;
}

// Shared markdown components for consistent rendering
const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-white text-base leading-[1.7] font-medium tracking-wide">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#e8e4d8]">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 space-y-1.5 pl-0 list-none">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-white text-base leading-[1.7] font-medium">
      <span className="text-[#c0392b] mt-1 shrink-0">▸</span>
      <span>{children}</span>
    </li>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#c9a84c] underline underline-offset-2 decoration-[#c9a84c]/30 hover:decoration-[#c9a84c] transition-colors">
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h1 className="text-base font-semibold text-[#e8e4d8] mb-2 mt-4 first:mt-0 tracking-wide uppercase">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xs font-semibold text-[#c9a84c] mb-1.5 mt-3 first:mt-0 uppercase tracking-widest">{children}</h2>
  ),
};

// Typewriter reveal for the welcome message
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    // Brief pause before starting so the page settles
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          clearInterval(interval);
        }
      }, 22);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(start);
  }, [text]);

  return (
    <p className="text-white text-lg leading-[1.75] font-medium tracking-wide">
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-[1.1em] bg-[#c9a84c] ml-0.5 animate-pulse align-middle" />
      )}
    </p>
  );
}

export function Message({ message, typewriter = false }: MessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("w-full flex", isAssistant ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%]",
          !isAssistant &&
            "bg-[#111a2e] border border-[#c9a84c]/20 text-[#e8e4d8] rounded-2xl rounded-br-sm px-4 py-3"
        )}
      >
        {isAssistant ? (
          typewriter ? (
            <TypewriterText text={message.content} />
          ) : (
            <div className="prose prose-sm max-w-none leading-relaxed">
              <ReactMarkdown components={markdownComponents}>
                {message.content}
              </ReactMarkdown>
            </div>
          )
        ) : (
          <p className="text-base leading-relaxed font-medium tracking-wide">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25 }}
      className="flex justify-start w-full"
    >
      <div className="flex items-center gap-1.5 py-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i === 0 ? "#c0392b" : "#c9a84c" }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
