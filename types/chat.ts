export type MessageRole = "assistant" | "user";

export interface FollowUp {
  label: string;
  nodeId?: string;  // navigate to this node
  href?: string;    // open external link
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface MissionData {
  mission?: string;
  obstacle?: string;
  stakes?: string;
  internalChallenges?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  activeNodeId: string;
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
  | { type: "SET_NODE"; payload: string }
  | { type: "SET_FOLLOW_UPS"; payload: FollowUp[] }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "SET_INPUT_PLACEHOLDER"; payload: string }
  | { type: "SET_INPUT_DISABLED"; payload: boolean }
  | { type: "HIDE_INITIAL_PROMPTS" }
  | { type: "STORE_MISSION_FIELD"; payload: { field: keyof MissionData; value: string } }
  | { type: "RESET" };
