import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Meditation from './components/Meditation';
import BaymaxModel from './components/BaymaxModel';
import { MoodEntry, JournalEntry, ChatMessage } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMoodEntries = localStorage.getItem('baymax-mood-entries');
    const savedJournalEntries = localStorage.getItem('baymax-journal-entries');
    const savedChatMessages = localStorage.getItem('baymax-chat-messages');

    if (savedMoodEntries) {
      setMoodEntries(JSON.parse(savedMoodEntries));
    }
    if (savedJournalEntries) {
      setJournalEntries(JSON.parse(savedJournalEntries));
    }
    if (savedChatMessages) {
      setChatMessages(JSON.parse(savedChatMessages));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('baymax-mood-entries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem('baymax-journal-entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('baymax-chat-messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries(prev => [...prev, entry]);
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [...prev, entry]);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            moodEntries={moodEntries}
            journalEntries={journalEntries}
            onNavigate={setActiveTab}
          />
        );
      case 'chat':
        return (
          <Chat 
            messages={chatMessages}
            onAddMessage={addChatMessage}
          />
        );
      case 'mood':
        return (
          <MoodTracker 
            entries={moodEntries}
            onAddEntry={addMoodEntry}
          />
        );
      case 'journal':
        return (
          <Journal 
            entries={journalEntries}
            onAddEntry={addJournalEntry}
          />
        );
      case 'meditation':
        return <Meditation />;
      default:
        return (
          <Dashboard 
            moodEntries={moodEntries}
            journalEntries={journalEntries}
            onNavigate={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {renderActiveComponent()}
          </div>
          
          {activeTab !== 'chat' && (
            <div className="lg:w-80">
              <BaymaxModel />
            </div>
          )}
        </div>
      </main>

      {/* Bolt.new Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Built with Bolt.new
        </a>
      </div>
    </div>
  );
}

export default App;