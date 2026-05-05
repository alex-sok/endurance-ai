"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-sm leading-[1.6]" style={{ color: "#262510" }}>{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: "#141414" }}>{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 space-y-1 pl-0 list-none">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 text-sm leading-[1.6]" style={{ color: "#262510" }}>
      <span className="mt-[6px] shrink-0 w-1 h-1 rounded-full" style={{ background: "#7a7974" }} />
      <span>{children}</span>
    </li>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="underline underline-offset-2 transition-colors hover:opacity-70"
      style={{ color: "#f54e00" }}>
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h1 className="text-sm font-semibold mb-2 mt-4 first:mt-0 uppercase tracking-wide" style={{ color: "#141414" }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xs font-semibold mb-1.5 mt-3 first:mt-0 uppercase tracking-widest" style={{ color: "#7a7974", fontFamily: "var(--font-jetbrains)" }}>{children}</h2>
  ),
};

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { setDone(true); clearInterval(interval); }
      }, 22);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(start);
  }, [text]);

  return (
    <p className="text-sm leading-[1.6]" style={{ color: "#262510" }}>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-[1.1em] ml-0.5 animate-pulse align-middle" style={{ background: "#f54e00" }} />
      )}
    </p>
  );
}

export function Message({ message, typewriter = false }: {
  message: ChatMessage; isLast?: boolean; typewriter?: boolean;
}) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn("w-full flex", isAssistant ? "justify-start" : "justify-end")}
    >
      <div
        className={cn("max-w-[85%] sm:max-w-[75%]")}
        style={!isAssistant ? {
          background: "#e6e5e0",
          border: "1px solid #cdcdc9",
          borderRadius: "4px",
          padding: "8px 14px",
        } : undefined}
      >
        {isAssistant ? (
          typewriter ? (
            <TypewriterText text={message.content} />
          ) : (
            <div className="prose prose-sm max-w-none leading-relaxed">
              <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: "#262510" }}>{message.content}</p>
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
            style={{ background: "#cdcdc9" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
