export type MessageRole = "assistant" | "user";

export type RouteId =
  // ── Top-level routes ──────────────────────────────────────────────────────
  | "mission-intake"
  | "what-we-do"
  | "who-are-we"
  | "how-we-work"
  | "who-we-help"
  | "support"
  | "talk-to-team"
  // ── What we do — sub-routes ───────────────────────────────────────────────
  | "what-we-do/different"
  | "what-we-do/not"
  // ── How we work — phase deep-dives ────────────────────────────────────────
  | "how-we-work/diagnose"
  | "how-we-work/prioritize"
  | "how-we-work/deploy"
  | "how-we-work/embed"
  | "how-we-work/transfer"
  // ── Who we help — segment deep-dives ─────────────────────────────────────
  | "who-we-help/regulated"
  | "who-we-help/failed-pilot"
  | "who-we-help/mandate"
  | "who-we-help/internal-team"
  // ── Topic routes — triggered by free text or follow-ups ───────────────────
  | "topic/pilots"
  | "topic/build-vs-buy"
  | "topic/llms"
  | "topic/governance"
  | "topic/timeline"
  | "topic/talent";

export interface FollowUp {
  label: string;
  routeId?: RouteId;
  stepAction?: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface MissionData {
  goal?: string;
  blocker?: string;
  stakes?: string;
  internalFriction?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  currentRoute: RouteId | null;
  currentStep: number;
  missionData: MissionData;
  isTyping: boolean;
  showInitialPrompts: boolean;
  followUps: FollowUp[];
  inputPlaceholder: string;
  inputDisabled: boolean;
}

export type ChatAction =
  | { type: "USER_MESSAGE"; payload: string }
  | { type: "ASSISTANT_MESSAGE"; payload: string }
  | { type: "SET_ROUTE"; payload: RouteId }
  | { type: "ADVANCE_STEP" }
  | { type: "SET_FOLLOW_UPS"; payload: FollowUp[] }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "SET_INPUT_PLACEHOLDER"; payload: string }
  | { type: "SET_INPUT_DISABLED"; payload: boolean }
  | { type: "HIDE_INITIAL_PROMPTS" }
  | { type: "STORE_MISSION_FIELD"; payload: { field: keyof MissionData; value: string } }
  | { type: "RESET" };
