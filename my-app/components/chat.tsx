'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Send, Bot, X } from 'lucide-react';
import { useUser } from '@/lib/hooks/auth';
import { askGemini } from '@/lib/hooks/gemini';
import { useUserStore } from '@/lib/store';

interface Message {
  id: number | string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessage: Message = {
  id: 1,
  text: "Hello! I'm your financial assistant, Penny Wise. How can I help you manage your finances today?",
  isBot: true,
  timestamp: new Date(),
};

export const ChatComponent = ({
  isChatOpen,
  setIsChatOpen,
  userId,
  username,
  email,
}: {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  userId: string;
  username: string;
  email: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputText, setInputText] = useState('');
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserEmail = useUserStore((state) => state.setUserEmail);

  useEffect(() => {
    setUserId(userId);
    setUserName(username);
    setUserEmail(email);
  }, [userId, username, email]);

  const quickMessages = [
    'Check my recent transactions',
    "What's my spending this month?",
    'Show my spending categories',
    'Give me some financial tips',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isPending || !userId) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Use startTransition to call server action asynchronously
    startTransition(async () => {
      try {
        const reply = await askGemini(text, userId);

        const botMessage: Message = {
          id: Date.now() + 1,
          text: reply || "I'm having trouble responding right now.",
          isBot: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: "Sorry, I couldn't connect to the server. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col h-screen bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Penny Wise AI Chatbot</h2>
        </div>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close chat"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {msg.isBot && <Bot className="w-6 h-6 text-gray-400 flex-shrink-0" />}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.isBot ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
              <span
                className={`block text-xs mt-1 text-right ${msg.isBot ? 'text-gray-500' : 'text-blue-200'}`}
              >
                {formatTime(msg.timestamp)}
              </span>
            </div>
            {!msg.isBot && <div className="w-6 h-6 flex-shrink-0" />}
          </div>
        ))}
        {isPending && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-900 italic">
              Penny Wise is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickMessages.map((msg) => (
            <button
              key={msg}
              onClick={() => handleSendMessage(msg)}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
              disabled={isPending}
            >
              {msg}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex gap-3 items-center"
        >
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isPending}
            className="p-2 rounded-lg transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
