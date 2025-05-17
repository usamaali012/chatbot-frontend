import { useState } from 'react';
import { Header } from './Header';
import { ChatWindow } from './Chat/ChatWindow';
import { InputBar } from './Chat/InputBar';
import { SidePanel } from './SidePanel/SidePanel';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';

export function ChatApp() {
  const { messages, isTyping, sendMessage } = useChat();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const { signOut } = useAuth();
  
  // Handle selecting a chat history item
  const handleSelectHistory = (id: string) => {
    // In a real app, this would load the selected chat
    console.log(`Selected chat history item: ${id}`);
    setSidePanelOpen(false);
  };
  
  // Handle using a saved reply
  const handleUseReply = (content: string) => {
    sendMessage(content);
    setSidePanelOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header onSignOut={signOut} />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <ChatWindow messages={messages} isTyping={isTyping} />
          </div>
          <InputBar onSendMessage={sendMessage} />
        </div>
      </div>
      
      {/* Overlay when side panel is open on mobile */}
      {sidePanelOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-30 sm:hidden"
          onClick={() => setSidePanelOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <SidePanel 
        isOpen={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        onSelectHistory={handleSelectHistory}
        onUseReply={handleUseReply}
      />
    </div>
  );
} 