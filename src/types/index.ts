export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string | Date;
};

export interface HistoryResponse {
  messages: Message[];
};

export interface SendMessageBody {
  question: string;
};

export interface SendMessageResponse {
  message: Message;
};

export type ChatHistoryItem = {
  id: string;
  title: string;
  preview: string;
  date: Date;
};

export type SavedReply = {
  id: string;
  content: string;
  tags: string[];
};

export type SidePanelTab = 'history' | 'saved' | 'settings';