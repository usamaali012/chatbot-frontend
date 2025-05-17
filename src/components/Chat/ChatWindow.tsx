import { useRef, useEffect } from 'react';
import { Message } from '../../types';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from '../UI/TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && containerRef.current) {
      const container = containerRef.current;
      const shouldAutoScroll = 
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (shouldAutoScroll) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Add debug logging
  useEffect(() => {
    console.log('ChatWindow received messages:', messages);
  }, [messages]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto py-4 px-4 sm:px-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600"
      aria-live="polite"
      aria-atomic="false"
      aria-relevant="additions"
    >
      <div className="flex flex-col max-w-2xl mx-auto space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <ChatBubble 
              key={message.id} 
              message={message} 
            />
          ))
        ) : (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            No messages yet. Start a conversation!
          </div>
        )}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}