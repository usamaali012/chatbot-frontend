import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types';
import { sendMessage as sendMessageApi, fetchChatHistory } from '../services/chatService';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadChatHistory();
    }
  }, [user?.id]);

  const loadChatHistory = async () => {
    if (!user?.id) return;
    
    try {
      console.log('Fetching chat history for user:', user.id);
      const response = await fetchChatHistory(user.id);
      console.log('Received chat history:', response);
      setMessages(response.history || []);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }

    // Add user message immediately
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    console.log('Adding user message:', userMessage);
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      console.log('Updated messages after user message:', newMessages);
      return newMessages;
    });
    setIsTyping(true);

    try {
      // Send message to API
      const response = await sendMessageApi(content, user.id);
      console.log('Received API response:', response);
      
      // Add AI response
      setMessages(prev => {
        const newMessages = [...prev, response];
        console.log('Updated messages after bot message:', newMessages);
        return newMessages;
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      const errorMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
}