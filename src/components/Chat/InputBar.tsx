import React, { useState, useRef } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';
import { Button } from '../UI/Button';

interface InputBarProps {
  onSendMessage: (message: string) => void;
}

export function InputBar({ onSendMessage }: InputBarProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="border-t dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex-none pl-3">
            <button 
              type="button" 
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Attach file"
              title="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button 
              type="button" 
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Voice input"
              title="Voice input"
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-32 py-3 px-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
            placeholder="Ask me anything..."
            rows={1}
          />

          <div className="pr-2">
            <Button 
              type="submit" 
              disabled={!input.trim()}
              className="h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}