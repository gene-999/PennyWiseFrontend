import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, Plus, Filter } from 'lucide-react';

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your financial assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickMessages = [
    "Check my recent transactions",
    "What's my spending this month?",
    "Help me budget",
    "Add a new expense",
    "Show spending categories",
    "Financial tips"
  ];

  const botResponses = {
    "check my recent transactions": "I can see your recent transactions. You've spent GHS 54.30 today on lunch and paid for a ride. Would you like me to show more details?",
    "what's my spending this month?": "This month you've spent GHS 1,982.10 total. Most of your spending went to food, bills, and data. That's a (+75%) increase from last 2 weeks.",
    "help me budget": "I'd be happy to help you create a budget! Based on your spending patterns, I can suggest allocating 50% for needs, 30% for wants, and 20% for savings. Would you like a detailed breakdown?",
    "add a new expense": "To add a new expense, you can click the 'Add New Transaction' button at the top, or tell me what you spent and I'll help you categorize it.",
    "show spending categories": "Your main spending categories are: Food & Transport (GHS 99.30), Groceries (GHS 45.80), and Utilities (GHS 25.00). Which category would you like to explore?",
    "financial tips": "Here are some tips: 1) Track every expense 2) Set monthly budgets 3) Build an emergency fund 4) Review your spending weekly. Would you like specific advice for any area?"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: botResponses[text.toLowerCase()] || "I understand your question. Let me help you with that. Is there anything specific you'd like to know about your finances?",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickMessage = (message) => {
    handleSendMessage(message);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Main content component
  const MainContent = () => (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Penny Wise</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Transactions</a>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              AI Chatbot
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Transaction
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            E
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hello, Eugene ✨</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Today</p>
            <p className="text-2xl font-bold text-gray-900">GHS 54.30</p>
            <p className="text-sm text-gray-500">You bought lunch and paid for a ride.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">This Week 🔥</p>
            <p className="text-2xl font-bold text-gray-900">GHS 342.75</p>
            <p className="text-sm text-gray-500">Includes groceries, fuel, and grass touching.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">This Month 💚</p>
            <p className="text-2xl font-bold text-gray-900">GHS 1,982.10</p>
            <p className="text-sm text-gray-500">Most of your spending went to food, bills, and data.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Transactions 📊</p>
            <p className="text-2xl font-bold text-gray-900">47</p>
            <p className="text-sm text-gray-500">You've logged 47 expenses so far this month.</p>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">ALL Transactions</h3>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Ask AI about transactions
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="flex-1 min-w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Transactions (8)</span>
              <span className="text-sm text-gray-600">Showing 8 of 8 transactions</span>
            </div>

            {/* Transaction List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Lunch and paid for a ride</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>🍔 Food & Transport</span>
                      <span>📅 17 Aug 2024</span>
                    </div>
                  </div>
                </div>
                <span className="text-red-600 font-medium">-GHS 54.30</span>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Grocery shopping at MaxMart</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>🛒 Groceries</span>
                      <span>📅 16 Aug 2024</span>
                    </div>
                  </div>
                </div>
                <span className="text-red-600 font-medium">-GHS 45.80</span>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Mobile data top-up</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📱 Utilities</span>
                      <span>📅 16 Aug 2024</span>
                    </div>
                  </div>
                </div>
                <span className="text-red-600 font-medium">-GHS 25.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Chat component
  const ChatComponent = () => (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Penny Wise Assistant</h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <button
          onClick={handleCloseChat}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isBot ? 'text-gray-500' : 'text-blue-100'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
            
            {!message.isBot && (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Messages */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Quick actions:</p>
        <div className="flex flex-wrap gap-2">
          {quickMessages.map((message, index) => (
            <button
              key={index}
              onClick={() => handleQuickMessage(message)}
              className="px-3 py-2 text-sm bg-white hover:bg-gray-100 text-gray-700 rounded-full border border-gray-300 transition-colors"
            >
              {message}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-hidden">
      {/* Mobile: Full screen chat or main content */}
      <div className="lg:hidden">
        {isChatOpen ? (
          <div className="h-full">
            <ChatComponent />
          </div>
        ) : (
          <MainContent />
        )}
      </div>

      {/* Desktop: Split screen layout */}
      <div className="hidden lg:flex h-full">
        {/* Main content - takes full width when chat closed, half when open */}
        <div className={`transition-all duration-300 ${isChatOpen ? 'w-1/2' : 'w-full'}`}>
          <MainContent />
        </div>
        
        {/* Chat sidebar - slides in from right */}
        <div className={`w-1/2 transition-all duration-300 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {isChatOpen && <ChatComponent />}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;