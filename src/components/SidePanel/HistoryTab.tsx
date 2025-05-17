import React from 'react';
import { ChatHistoryItem } from '../../types';
import { formatDate } from '../../utils/formatDate';

interface HistoryTabProps {
  history: ChatHistoryItem[];
  onSelect: (id: string) => void;
}

export function HistoryTab({ history, onSelect }: HistoryTabProps) {
  // Group history by date
  const groupedHistory = history.reduce<Record<string, ChatHistoryItem[]>>((groups, item) => {
    const date = formatDate(item.date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {Object.entries(groupedHistory).map(([date, items]) => (
        <div key={date} className="py-3">
          <h3 className="px-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            {date}
          </h3>
          <ul className="space-y-1">
            {items.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item.id)}
                  className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {item.preview}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {history.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No chat history yet</p>
        </div>
      )}
    </div>
  );
}