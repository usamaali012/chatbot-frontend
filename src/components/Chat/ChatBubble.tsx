import { Message } from '../../types';
import { formatTime } from '../../utils/formatTime';
import { cn } from '../../utils/cn';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  const timestamp = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp);
  
  return (
    <div 
      className={cn(
        "mb-4 max-w-[80%] animate-slideUp",
        isUser ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white" 
            : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      <div 
        className={cn(
          "text-xs mt-1 text-slate-500 dark:text-slate-400",
          isUser ? "text-right mr-1" : "ml-1"
        )}
      >
        {formatTime(timestamp)}
      </div>
    </div>
  );
}