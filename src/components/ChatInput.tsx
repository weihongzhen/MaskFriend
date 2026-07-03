import { useState, KeyboardEvent } from 'react';
import { Send, Smile } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors active:bg-gray-100 active:text-primary-500">
        <Smile size={18} />
      </button>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入消息..."
        disabled={isLoading}
        className="flex-1 resize-none rounded-xl border-none bg-gray-50 px-3 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none transition-colors focus:bg-white"
        rows={1}
        style={{ maxHeight: '100px' }}
      />
      
      <button
        onClick={handleSubmit}
        disabled={!message.trim() || isLoading}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-sm transition-all active:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <Send size={16} />
        )}
      </button>
    </div>
  );
};
