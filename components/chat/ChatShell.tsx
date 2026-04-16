"use client";

import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { chatReducer, INITIAL_STATE } from "@/lib/conversation";
import { CALENDLY_URL } from "@/lib/conversation-flows";
import type { ChatMessage } from "@/types/chat";

import { Message, TypingIndicator } from "./Message";
import { PromptChips } from "./PromptChips";
import { ChatInput } from "./ChatInput";

const TALK_TO_TEAM_NODE = "contact";

// ── Streaming bubble ──────────────────────────────────────────────────────────
function StreamingBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex justify-start"
    >
      <div className="max-w-[85%] sm:max-w-[75%] text-stone-800">
        <div className="prose prose-stone prose-sm max-w-none leading-relaxed">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 text-stone-700 text-[0.9375rem] leading-[1.65] font-light">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-stone-900">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 space-y-1.5 pl-0 list-none">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 text-stone-700 text-[0.9375rem] leading-[1.65] font-light">
                  <span className="text-stone-400 mt-0.5 shrink-0">—</span>
                  <span>{children}</span>
                </li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-900 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-600 transition-colors"
                >
                  {children}
                </a>
              ),
              h1: ({ children }) => (
                <h1 className="text-base font-semibold text-stone-900 mb-2 mt-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-sm font-semibold text-stone-900 mb-1.5 mt-3 first:mt-0 uppercase tracking-wide">
                  {children}
                </h2>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
          <span className="inline-block w-0.5 h-3.5 bg-stone-400 ml-0.5 animate-pulse align-middle" />
        </div>
      </div>
    </motion.div>
  );
}

export function ChatShell() {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Has the conversation started (beyond the initial welcome)?
  const hasStarted = state.messages.length > 1;

  // ── Scroll to bottom ────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.isTyping, streamingText]);

  // ── Cleanup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  // ── Slack/notify (fire-and-forget) ──────────────────────────────────────
  const notify = useCallback((payload: Record<string, unknown>, messages: ChatMessage[]) => {
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    }).catch(() => {});
  }, []);

  // ── LLM streaming call ──────────────────────────────────────────────────
  const callLLM = useCallback(
    async (messages: ChatMessage[]) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setIsStreaming(true);
      setStreamingText("");
      dispatch({ type: "SET_INPUT_DISABLED", payload: true });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error(`API error ${res.status}`);

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setStreamingText(fullText);
        }

        dispatch({ type: "ASSISTANT_MESSAGE", payload: fullText });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          dispatch({
            type: "ASSISTANT_MESSAGE",
            payload:
              "I'm having trouble connecting right now. Please try again or reach us at [hello@endurancelabs.ai](mailto:hello@endurancelabs.ai).",
          });
        }
      } finally {
        setIsStreaming(false);
        setStreamingText("");
        dispatch({ type: "SET_INPUT_DISABLED", payload: false });
      }
    },
    []
  );

  // ── Send a user message and call the LLM ────────────────────────────────
  const sendMessage = useCallback(
    (text: string, isContactRequest = false) => {
      dispatch({ type: "USER_MESSAGE", payload: text });
      dispatch({ type: "HIDE_INITIAL_PROMPTS" });

      const messagesWithUser: ChatMessage[] = [
        ...state.messages,
        { id: `u-${Date.now()}`, role: "user", content: text, timestamp: new Date() },
      ];

      if (isContactRequest) {
        notify({ type: "talk-to-team" }, messagesWithUser);
      }

      callLLM(messagesWithUser);
    },
    [state.messages, callLLM, notify]
  );

  // ── Initial chip selection ──────────────────────────────────────────────
  const handlePromptSelect = useCallback(
    (label: string, nodeId: string) => {
      sendMessage(label, nodeId === TALK_TO_TEAM_NODE);
    },
    [sendMessage]
  );

  // ── Free text input ─────────────────────────────────────────────────────
  const handleTextInput = useCallback(
    (value: string) => { sendMessage(value); },
    [sendMessage]
  );

  // ── Reset ───────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setStreamingText("");
    dispatch({ type: "RESET" });
  }, []);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* ── Header ───────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-1 pt-6 pb-4 shrink-0"
      >
        <div className="flex items-center">
          <img src="/endurance-logo.svg" alt="Endurance AI Labs" className="h-6 w-auto" />
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@endurancelabs.ai"
            className="hidden sm:inline-flex text-xs text-stone-400 hover:text-stone-700 transition-colors duration-150 font-light tracking-wide"
          >
            hello@endurancelabs.ai
          </a>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors duration-150 font-light"
            aria-label="Start over"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Start over</span>
          </button>
        </div>
      </motion.header>

      {/* ── Message list ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-5 scroll-smooth">
        <AnimatePresence initial={false}>
          {state.messages.map((msg, i) => (
            <Message key={msg.id} message={msg} isLast={i === state.messages.length - 1} />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {state.isTyping && !isStreaming && <TypingIndicator key="typing" />}
        </AnimatePresence>

        <AnimatePresence>
          {isStreaming && (
            <motion.div
              key="streaming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {streamingText ? <StreamingBubble text={streamingText} /> : <TypingIndicator />}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Input area ───────────────────────────────────── */}
      <div className="shrink-0 pb-8 pt-2 space-y-3">
        <AnimatePresence>
          {state.showInitialPrompts && (
            <motion.div
              key="chips"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <PromptChips onSelect={handlePromptSelect} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Persistent CTA after first exchange ── */}
        <AnimatePresence>
          {hasStarted && !isStreaming && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-2"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-sm font-light text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all duration-150"
              >
                Book a briefing →
              </a>
              <button
                onClick={() => sendMessage("I'd like to talk to the team.", true)}
                className="px-3.5 py-2 text-sm font-light text-stone-600 border border-stone-200 rounded-full hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all duration-150"
              >
                Talk to the team
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <ChatInput
          onSubmit={handleTextInput}
          placeholder="Type a message or choose an option above"
          disabled={state.inputDisabled || state.isTyping || isStreaming}
        />

        <p className="text-center text-[11px] text-stone-300 font-light tracking-wide">
          Endurance AI Labs · Strategic AI advisory for high-stakes initiatives
        </p>
      </div>
    </div>
  );
}
