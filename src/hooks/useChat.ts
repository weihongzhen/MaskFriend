import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';
import { getCharacterById } from '../data/characters';
import { getChatHistory, saveChatHistory, generateId } from '../utils/storage';
import { sendMessage } from '../utils/api';

export const useChat = (characterId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const history = getChatHistory(characterId);
    setMessages(history);
  }, [characterId]);

  const send = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const character = getCharacterById(characterId);
    if (!character) {
      setError('角色不存在');
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      role: 'user',
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveChatHistory(characterId, newMessages);

    try {
      const historyForApi = newMessages.slice(-20).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await sendMessage({
        message: content.trim(),
        characterId,
        history: historyForApi,
      });

      if (response.success && response.message) {
        const assistantMessage: Message = {
          id: generateId(),
          content: response.message,
          role: 'assistant',
          timestamp: Date.now(),
        };

        const updatedMessages = [...newMessages, assistantMessage];
        setMessages(updatedMessages);
        saveChatHistory(characterId, updatedMessages);
      } else {
        setError(response.error || '发送失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送失败');
    } finally {
      setIsLoading(false);
    }
  }, [characterId, messages]);

  const clear = useCallback(() => {
    setMessages([]);
    saveChatHistory(characterId, []);
  }, [characterId]);

  return {
    messages,
    isLoading,
    error,
    send,
    clear,
  };
};
