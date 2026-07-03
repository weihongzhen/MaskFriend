import { ChatHistory, Message } from '../types';

const STORAGE_KEY = 'masked-boyfriend-chat-history';

export const saveChatHistory = (characterId: string, messages: Message[]): void => {
  const allHistory = getAllChatHistory();
  const existing = allHistory.find((h) => h.characterId === characterId);
  
  if (existing) {
    existing.messages = messages;
  } else {
    allHistory.push({ characterId, messages });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allHistory));
};

export const getChatHistory = (characterId: string): Message[] => {
  const allHistory = getAllChatHistory();
  const history = allHistory.find((h) => h.characterId === characterId);
  return history?.messages || [];
};

export const getAllChatHistory = (): ChatHistory[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const clearChatHistory = (characterId: string): void => {
  const allHistory = getAllChatHistory().filter((h) => h.characterId !== characterId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allHistory));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
