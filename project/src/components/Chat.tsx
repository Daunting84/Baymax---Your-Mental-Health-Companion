import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatProps {
  messages: ChatMessage[];
  onAddMessage: (message: ChatMessage) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onAddMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBaymaxResponse = (userMessage: string): string => {
    const responses = {
      mood: [
        "I understand you're sharing how you feel. Your emotions are valid and important. Would you like to tell me more about what's contributing to these feelings?",
        "Thank you for opening up to me. I'm here to listen and support you. What would help you feel better right now?",
        "I care about your wellbeing. Sometimes talking through our feelings can help us understand them better. What's on your mind?"
      ],
      stress: [
        "Stress can be challenging to manage. I'm here to help you work through it. Have you tried any breathing exercises today?",
        "I notice you mentioned stress. Let's take this one step at a time. What's the main thing causing you stress right now?",
        "Managing stress is important for your health. Would you like me to guide you through a short relaxation technique?"
      ],
      anxiety: [
        "Anxiety can feel overwhelming, but you're not alone. I'm here with you. Can you tell me what's making you feel anxious?",
        "Thank you for trusting me with your feelings. Anxiety is treatable and manageable. What coping strategies have you tried before?",
        "I want to help you feel calmer. Sometimes grounding exercises can help with anxiety. Would you like to try one together?"
      ],
      sad: [
        "I'm sorry you're feeling sad. Your feelings matter, and it's okay to not be okay sometimes. What's been weighing on your heart?",
        "Sadness is a natural emotion, and I'm here to support you through it. Would you like to talk about what's making you feel this way?",
        "I care about you and want to help. Sometimes sharing our sadness can make it feel a little lighter. I'm listening."
      ],
      happy: [
        "I'm so glad to hear you're feeling happy! That's wonderful. What's bringing you joy today?",
        "Your happiness is important to me. It's great to see you in good spirits. What positive things happened recently?",
        "I love hearing when you're feeling good! Celebrating positive moments is important for our wellbeing."
      ],
      default: [
        "I'm here to listen and support you. Tell me more about what's on your mind.",
        "Thank you for sharing with me. How are you feeling right now?",
        "I care about your wellbeing. What would be most helpful for you today?",
        "I'm your personal healthcare companion, and I want to help you feel your best. What's going on?",
        "Your mental health is important. I'm here to support you in whatever way I can."
      ]
    };

    const message = userMessage.toLowerCase();
    let category = 'default';

    if (message.includes('mood') || message.includes('feel')) category = 'mood';
    else if (message.includes('stress') || message.includes('overwhelm')) category = 'stress';
    else if (message.includes('anxious') || message.includes('anxiety') || message.includes('worry')) category = 'anxiety';
    else if (message.includes('sad') || message.includes('down') || message.includes('depressed')) category = 'sad';
    else if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('joy')) category = 'happy';

    const categoryResponses = responses[category as keyof typeof responses] || responses.default;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    onAddMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    // Simulate Baymax thinking
    setTimeout(() => {
      const baymaxResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateBaymaxResponse(inputValue),
        sender: 'baymax',
        timestamp: new Date().toISOString()
      };

      onAddMessage(baymaxResponse);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Baymax</h3>
            <p className="text-sm text-gray-500">Your personal healthcare companion</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">
              Hello! I'm Baymax, your personal healthcare companion. 
              How are you feeling today?
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
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

      <div className="p-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;