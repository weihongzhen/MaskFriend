import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  avatar?: string;
}

export const MessageBubble = ({ message, avatar }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-end gap-1.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && avatar && (
        <img
          src={avatar}
          alt="avatar"
          className="h-6 w-6 flex-shrink-0 rounded-full object-cover border border-primary-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      
      {message.content && (
        <div
          className={`max-w-[80%] rounded-xl px-3 py-2 shadow-sm ${
            isUser
              ? 'rounded-br-sm bg-gradient-to-r from-accent-500 to-accent-600 text-white'
              : 'rounded-bl-sm bg-white text-gray-800'
          }`}
        >
          <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <div
            className={`mt-0.5 text-[9px] ${
              isUser ? 'text-white/60 text-right' : 'text-gray-400'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )}
    </div>
  );
};
