import React from 'react';
import { cn } from '../../utils/cn';

export function TypingIndicator() {
  return (
    <div 
      className={cn(
        "flex items-center space-x-1.5 px-4 py-3 max-w-[70%] rounded-2xl shadow-sm",
        "bg-white dark:bg-slate-800"
      )}
      aria-label="Bot is typing"
    >
      <span className="sr-only">Bot is typing</span>
      <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '120ms' }}></div>
      <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse" style={{ animationDelay: '240ms' }}></div>
    </div>
  );
}