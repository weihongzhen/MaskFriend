export interface Character {
  id: string;
  name: string;
  avatar: string;
  personality: string[];
  description: string;
  systemPrompt: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatHistory {
  characterId: string;
  messages: Message[];
}

export interface ChatRequest {
  message: string;
  characterId: string;
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  error?: string;
}
