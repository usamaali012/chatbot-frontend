import { ChatMessage } from '../types/auth';
import { Message } from '../types';

const API_BASE_URL = 'https://03k4o8ww63.execute-api.us-east-1.amazonaws.com';

export async function sendMessage(message: string, userId: string): Promise<Message> {
  const response = await fetch(`${API_BASE_URL}/dev/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  console.log('API Response:', data);
  
  // Transform the response to match our Message type
  return {
    id: data.id || Math.random().toString(36).substr(2, 9),
    content: data.message || data.content,
    sender: 'bot',
    timestamp: new Date().toISOString()
  };
}

interface HistoryResponse {
  history: Message[];
}

export async function fetchChatHistory(userId: string): Promise<HistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/dev/api/chat/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }

  const data = await response.json();
  console.log('History Response:', data);
  return data;
} 