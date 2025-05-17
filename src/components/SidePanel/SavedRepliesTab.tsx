import React from 'react';
import { SavedReply } from '../../types';

interface SavedRepliesTabProps {
  savedReplies: SavedReply[];
  onUseReply: (content: string) => void;
}

export function SavedRepliesTab({ savedReplies, onUseReply }: SavedRepliesTabProps) {
  return (
    <div className="p-4">
      <div className="grid gap-3">
        {savedReplies.map(reply => (
          <div 
            key={reply.id}
            className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <p className="text-slate-900 dark:text-slate-100 mb-2 line-clamp-3">
              {reply.content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {reply.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex text-xs px-2 py-0.5 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => onUseReply(reply.content)}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Use
              </button>
            </div>
          </div>
        ))}
        
        {savedReplies.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No saved replies yet</p>
          </div>
        )}
      </div>
    </div>
  );
}