import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, Plus } from 'lucide-react';

export const ChatComponent = ({isChatOpen, setIsChatOpen}: any) => {
  // const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your financial assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickMessages = [
    'Check my recent transactions',
    "What's my spending this month?",
    'Help me budget',
    'Add a new expense',
    'Show spending categories',
    'Financial tips',
  ];

  const botResponses = {
    'check my recent transactions':
      "I can see your recent transactions. You've spent GHS 54.30 today on lunch and paid for a ride. Would you like me to show more details?",
    "what's my spending this month?":
      "This month you've spent GHS 1,982.10 total. Most of your spending went to food, bills, and data. That's a (+75%) increase from last 2 weeks.",
    'help me budget':
      "I'd be happy to help you create a budget! Based on your spending patterns, I can suggest allocating 50% for needs, 30% for wants, and 20% for savings. Would you like a detailed breakdown?",
    'add a new expense':
      "To add a new expense, you can click the 'Add New Transaction' button at the top, or tell me what you spent and I'll help you categorize it.",
    'show spending categories':
      'Your main spending categories are: Food & Transport (GHS 99.30), Groceries (GHS 45.80), and Utilities (GHS 25.00). Which category would you like to explore?',
    'financial tips':
      'Here are some tips: 1) Track every expense 2) Set monthly budgets 3) Build an emergency fund 4) Review your spending weekly. Would you like specific advice for any area?',
  };

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleSendMessage = (text: any) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

          botResponses[text.toLowerCase()] ||
          "I understand your question. Let me help you with that. Is there anything specific you'd like to know about your finances?",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickMessage = (message: any) => {
    handleSendMessage(message);
  };

  const formatTime = (date: any) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };
  return (
    <div className="flex flex-col h-screen bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Penny Wise AI Chatbot</h2>
        </div>
        <button
          onClick={handleCloseChat}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close chat"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.isBot ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <span className="block text-xs mt-1 text-gray-400 text-right">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-900 italic">
              Penny Wise is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer: Quick actions + Input combined */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col gap-3">
        <p className="text-sm text-gray-600 mb-2">Quick actions:</p>
        <div className="flex flex-wrap gap-2">
          {quickMessages.map((msg, i) => (
            <button
              key={i}
              onClick={() => handleQuickMessage(msg)}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              {msg}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }
              }}
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className={`p-2 rounded-lg ${
                inputText.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
