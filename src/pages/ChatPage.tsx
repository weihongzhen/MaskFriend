import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { getCharacterById } from '../data/characters';
import { useChat } from '../hooks/useChat';

export const ChatPage = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const character = getCharacterById(characterId || '');
  const { messages, isLoading, error, send } = useChat(characterId || '');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="sticky top-0 z-50 bg-white/90 px-3 py-3 shadow-sm backdrop-blur-md">
          <button
            onClick={() => window.history.back()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex min-h-[calc(100vh-56px)] items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">该角色不存在，请返回重新选择</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="sticky top-0 z-50 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-500"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative">
            <img
              src={character.avatar}
              alt={character.name}
              className="h-8 w-8 rounded-full object-cover border border-primary-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23fbcfe8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23ec4899'%3E${character.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-white" />
          </div>

          <div>
            <h1 className="text-sm font-bold text-gray-800">{character.name}</h1>
            <p className="text-[10px] text-green-500">在线中</p>
          </div>
        </div>
      </div>

      <main className="flex min-h-[calc(100vh-56px)] flex-col">
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-3 border-white shadow-md">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23fbcfe8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23ec4899'%3E${character.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
                <h3 className="mb-1 text-base font-bold text-gray-800">{character.name}</h3>
                <p className="text-xs text-gray-500">{character.description}</p>
                <p className="mt-1 text-[10px] text-gray-400">开始与{character.name}聊天吧~</p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} avatar={character.avatar} />
              ))
            )}

            {isLoading && (
              <div className="flex items-center gap-2">
                <img
                  src={character.avatar}
                  alt="avatar"
                  className="h-6 w-6 flex-shrink-0 rounded-full object-cover border border-primary-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="flex gap-1 bg-white px-3 py-1.5 rounded-xl rounded-bl-sm shadow-sm">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" style={{ animationDelay: '0.1s' }} />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 px-3 py-1.5 text-center text-xs text-red-500">
            {error}
          </div>
        )}

        <div className="border-t border-gray-100 bg-white px-3 py-2">
          <ChatInput onSend={send} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};
