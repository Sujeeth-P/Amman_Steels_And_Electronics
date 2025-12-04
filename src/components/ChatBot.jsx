import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const PREDEFINED_RESPONSES = {
  default: "I'm an automated assistant. For complex queries, please contact our sales team directly at +91 98765 43210.",
  greetings: ["hi", "hello", "hey", "good morning", "good evening"],
  keywords: [
    {
      keys: ["price", "cost", "rate", "quote"],
      response: "Our prices are updated daily based on market rates. You can view the catalogue for current unit prices. For bulk orders, please add items to your enquiry list to get a discounted quote."
    },
    {
      keys: ["delivery", "shipping", "transport", "deliver"],
      response: "We offer delivery across Tamil Nadu. Free delivery is available for bulk orders above ₹10,000 within a 20km radius of Perundurai."
    },
    {
      keys: ["location", "address", "where", "shop"],
      response: "551, Kunnathur Road, Perundurai West, Perundurai-638052, Tamil Nadu 638052. We are open Mon-Sat, 9 AM - 8 PM."
    },
    {
      keys: ["contact", "phone", "email", "call"],
      response: "You can reach our sales team at +91 98765 43210 or email us at sales@sriammasteels.com."
    },
    {
      keys: ["cement", "ultratech", "dalmia", "ramco"],
      response: "We are authorized dealers for UltraTech, Dalmia, and Ramco cement. We guarantee fresh stock and competitive wholesale pricing."
    },
    {
      keys: ["steel", "tmt", "bar", "iron"],
      response: "We stock Grade 550D TMT bars from Tata and JSW. Available in diameters ranging from 8mm to 32mm."
    }
  ]
};

const SUGGESTED_ACTIONS = [
  "How do I get a bulk quote?",
  "What are your delivery charges?",
  "Where is your shop located?",
  "Do you have UltraTech cement?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! Welcome to Sri Amma Steels. I can help you with product info, delivery queries, or shop details. How can I assist you today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    // Check greetings
    if (PREDEFINED_RESPONSES.greetings.some(g => lowerText.includes(g))) {
      return "Hello! How can I help you with your construction material needs today?";
    }

    // Check keywords
    for (const group of PREDEFINED_RESPONSES.keywords) {
      if (group.keys.some(k => lowerText.includes(k))) {
        return group.response;
      }
    }

    return PREDEFINED_RESPONSES.default;
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-[380px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center gap-3 shadow-sm shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white">Zyvox AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-slate-300">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  )}>
                    {msg.text}
                    <div className={cn(
                      "text-[10px] mt-1 opacity-70 text-right",
                      msg.sender === 'user' ? "text-blue-100" : "text-slate-400"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (Only show if few messages) */}
            {messages.length < 4 && (
              <div className="px-4 py-2 bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTED_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action)}
                    className="whitespace-nowrap px-3 py-1.5 bg-white border border-blue-100 text-blue-600 text-xs rounded-full hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-1"
                  >
                    <Sparkles size={10} /> {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
