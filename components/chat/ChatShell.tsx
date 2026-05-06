"use client";

import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { chatReducer, INITIAL_STATE } from "@/lib/conversation";
import { CALENDLY_URL } from "@/lib/conversation-flows";
import type { ChatMessage } from "@/types/chat";

import { Message, TypingIndicator } from "./Message";
import { PromptChips } from "./PromptChips";
import { ChatInput } from "./ChatInput";
import { LeadCaptureCard } from "./LeadCaptureCard";

const TALK_TO_TEAM_NODE = "contact";

// ── Streaming bubble ──────────────────────────────────────────────────────────
// Renders plain text during streaming to avoid markdown re-parse jitter.
// The final message is rendered as markdown once streaming completes.
function StreamingBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex justify-start"
    >
      <div className="max-w-[85%] sm:max-w-[75%]">
        <p className="text-white text-base leading-[1.7] font-medium tracking-wide whitespace-pre-wrap">
          {text}
          <span className="inline-block w-0.5 h-[1em] ml-0.5 animate-pulse align-middle" style={{ background: "#f54e00" }} />
        </p>
      </div>
    </motion.div>
  );
}

interface ChatShellProps {
  /** Pass true inside the landing-page overlay — the overlay renders its own header */
  hideHeader?: boolean;
}

export function ChatShell({ hideHeader = false }: ChatShellProps) {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeadForm, setShowLeadForm] = useState(true);
  const [leadDismissed, setLeadDismissed] = useState(false);
  const [leadInfo, setLeadInfo] = useState<{ name: string; email: string; company: string } | null>(null);
  const [leadSent, setLeadSent] = useState(false);
  const leadInfoRef = useRef<{ name: string; email: string; company: string } | null>(null);
  const leadSentRef = useRef(false);

  // Has the conversation started (beyond the initial welcome)?
  const hasStarted = state.messages.length > 1;


  // ── Scroll to bottom ────────────────────────────────────────────────────
  // Smooth scroll when a message is added or typing indicator changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.isTyping]);

  // Instant scroll while streaming — avoids competing scroll animations
  useEffect(() => {
    if (!isStreaming) return;
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [streamingText, isStreaming]);

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
          // Strip any partial/complete lead signal from the displayed text
          setStreamingText(fullText.replace(/\n?\[LEAD:[\s\S]*$/, ""));
        }

        // Extract lead capture signal before dispatching to UI
        const leadMatch = fullText.match(/\[LEAD:(\{[\s\S]*?\})\]/);
        const cleanText = fullText.replace(/\n?\[LEAD:[\s\S]*$/, "").trim();

        if (leadMatch) {
          try {
            const lead = JSON.parse(leadMatch[1]);
            const messagesForNotify = [
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "assistant" as const, content: cleanText },
            ];
            fetch("/api/notify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "lead-capture",
                name: lead.name ?? "",
                email: lead.email ?? "",
                company: lead.company ?? "",
                messages: messagesForNotify,
              }),
            }).catch(console.error);
          } catch (e) {
            console.error("[lead-capture] Failed to parse signal:", e);
          }
        }

        dispatch({ type: "ASSISTANT_MESSAGE", payload: cleanText });
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

  // ── Lead form: store info and fire immediately ───────────────────────────
  const handleLeadSubmit = useCallback(
    async (name: string, email: string, company: string) => {
      const info = { name, email, company };
      setLeadInfo(info);
      leadInfoRef.current = info;
      setLeadDismissed(true);
      // Fire right away — don't wait for the 4th message trigger
      if (!leadSentRef.current) {
        leadSentRef.current = true;
        setLeadSent(true);
        fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "lead-capture",
            name,
            email,
            company,
            messages: state.messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        }).catch(console.error);
      }
    },
    [state.messages]
  );

  // ── Fire lead to Slack (once only) ──────────────────────────────────────
  const fireLeadNotify = useCallback(
    (messages: ChatMessage[]) => {
      if (!leadInfoRef.current || leadSentRef.current) return;
      leadSentRef.current = true;
      setLeadSent(true);
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead-capture",
          ...leadInfoRef.current,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      }).catch(console.error);
    },
    []
  );

  // Trigger 1: after 4th user message — enough context for a rich score
  const userMessageCount = state.messages.filter((m) => m.role === "user").length;
  useEffect(() => {
    if (userMessageCount >= 4 && leadInfo && !leadSent) {
      fireLeadNotify(state.messages);
    }
  }, [userMessageCount, leadInfo, leadSent, fireLeadNotify, state.messages]);

  // Trigger 2: page unload — sendBeacon as safety net for early leavers
  useEffect(() => {
    const handleUnload = () => {
      if (!leadInfoRef.current || leadSentRef.current) return;
      const messages = state.messages.map((m) => ({ role: m.role, content: m.content }));
      navigator.sendBeacon(
        "/api/notify",
        new Blob(
          [JSON.stringify({ type: "lead-capture", ...leadInfoRef.current, messages })],
          { type: "application/json" }
        )
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [state.messages]);


  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      {/* ── Header ───────────────────────────────────────── */}
      {!hideHeader && (
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-1 pt-6 pb-4 shrink-0 border-b border-[#e6e5e0]"
        >
          <div className="flex items-center">
            <img src="/logo-endurance.svg" alt="Endurance AI Labs" className="h-5 w-auto" />
          </div>
          <a
            href="mailto:hello@endurancelabs.ai"
            className="hidden sm:inline-flex text-xs text-[#7a7974] hover:text-[#262510] transition-colors duration-150 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.1em" }}
          >
            hello@endurancelabs.ai
          </a>
        </motion.header>
      )}

      {/* ── Message list ─────────────────────────────────── */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-1 pt-6 pb-4 space-y-5 scroll-smooth">
        <AnimatePresence initial={false}>
          {state.messages.map((msg, i) => (
            <Message
              key={msg.id}
              message={msg}
              isLast={i === state.messages.length - 1}
              typewriter={i === 0 && msg.role === "assistant"}
            />
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
              exit={{ opacity: 0, transition: { duration: 0 } }}
            >
              {streamingText ? <StreamingBubble text={streamingText} /> : <TypingIndicator />}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showLeadForm && (
            <motion.div key="lead-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LeadCaptureCard
                onSubmit={handleLeadSubmit}
                onSkip={() => { setShowLeadForm(false); setLeadDismissed(true); }}
              />
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
                onClick={() => fireLeadNotify(state.messages)}
                className="px-4 py-2 text-xs uppercase transition-all duration-150 text-[#f7f7f4] bg-[#262510] hover:bg-[#141414]"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  letterSpacing: "0.1em",
                  borderRadius: "4px",
                }}
              >
                Brief us →
              </a>
              <button
                onClick={() => { fireLeadNotify(state.messages); sendMessage("I'd like to talk to the team.", true); }}
                className="px-4 py-2 text-xs uppercase transition-all duration-150 text-[#f54e00] hover:bg-[#f54e00]/5"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  letterSpacing: "0.1em",
                  border: "1px solid #f54e00",
                  borderRadius: "4px",
                }}
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

        <p className="text-center text-[11px] uppercase" style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.1em", color: "#7a7974" }}>
          Endurance AI Labs · AI transformation, delivered under contract
        </p>
      </div>
    </div>
  );
}
