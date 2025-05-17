import React, { useState } from 'react';
import { X } from 'lucide-react';
import { HistoryTab } from './HistoryTab';
import { SavedRepliesTab } from './SavedRepliesTab';
import { SettingsTab } from './SettingsTab';
import { SidePanelTab, ChatHistoryItem, SavedReply } from '../../types';
import { cn } from '../../utils/cn';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHistory: (id: string) => void;
  onUseReply: (content: string) => void;
}

export function SidePanel({ isOpen, onClose, onSelectHistory, onUseReply }: SidePanelProps) {
  const [activeTab, setActiveTab] = useState<SidePanelTab>('history');
  
  // Mock data
  const chatHistory: ChatHistoryItem[] = [
    { 
      id: '1', 
      title: 'Project Discussion', 
      preview: 'Let\'s talk about the new website design...', 
      date: new Date('2025-06-15T10:30:00') 
    },
    { 
      id: '2', 
      title: 'Task Planning', 
      preview: 'I need help organizing my tasks for the week...', 
      date: new Date('2025-06-15T14:45:00') 
    },
    { 
      id: '3', 
      title: 'Travel Recommendations', 
      preview: 'Can you suggest some places to visit in Japan?', 
      date: new Date('2025-06-14T09:15:00') 
    },
    { 
      id: '4', 
      title: 'Recipe Ideas', 
      preview: 'I need some dinner ideas for tonight...', 
      date: new Date('2025-06-12T18:20:00') 
    }
  ];
  
  const savedReplies: SavedReply[] = [
    {
      id: '1',
      content: `Thanks for your question! I'll look into this and get back to you shortly.`,
      tags: ['general', 'acknowledgment']
    },
    {
      id: '2',
      content: "That's a great point. I appreciate your insight on this matter.",
      tags: ['feedback', 'positive']
    },
    {
      id: '3',
      content: 'I recommend breaking this task down into smaller steps to make it more manageable.',
      tags: ['advice', 'productivity']
    }
  ];

  // Tab configuration
  const tabs: {id: SidePanelTab; label: string}[] = [
    { id: 'history', label: 'History' },
    { id: 'saved', label: 'Saved Replies' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 right-0 z-40 w-full sm:w-80 lg:w-96 bg-slate-50 dark:bg-slate-900 shadow-lg transition-transform duration-300 transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="flex space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'history' && (
            <HistoryTab history={chatHistory} onSelect={onSelectHistory} />
          )}
          
          {activeTab === 'saved' && (
            <SavedRepliesTab savedReplies={savedReplies} onUseReply={onUseReply} />
          )}
          
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </div>
      </div>
    </div>
  );
}