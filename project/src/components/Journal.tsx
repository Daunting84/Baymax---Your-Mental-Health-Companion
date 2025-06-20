import React, { useState } from 'react';
import { BookOpen, Save, Calendar } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalProps {
  entries: JournalEntry[];
  onAddEntry: (entry: JournalEntry) => void;
}

const Journal: React.FC<JournalProps> = ({ entries, onAddEntry }) => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [content, setContent] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment today when you felt truly present.",
    "What challenge are you facing, and how might you approach it differently?",
    "Write about someone who made a positive impact on your day.",
    "What emotions did you experience today, and what triggered them?",
    "Describe a recent accomplishment, no matter how small.",
    "What would you tell your younger self about dealing with difficult emotions?",
    "Write about a place that makes you feel calm and peaceful.",
    "What patterns do you notice in your thoughts and behaviors?",
    "How did you show kindness to yourself or others today?",
    "What are you learning about yourself through your current challenges?",
    "Describe your ideal day for mental wellness.",
    "What boundaries do you need to set to protect your well-being?",
    "Write about a fear you'd like to overcome and why.",
    "How has your relationship with yourself changed recently?"
  ];

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setShowPrompts(false);
  };

  const handleSave = () => {
    if (!content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      prompt: selectedPrompt || 'Free writing',
      content: content.trim(),
    };

    onAddEntry(entry);
    
    // Reset form
    setContent('');
    setSelectedPrompt('');
    setShowPrompts(true);
  };

  const recentEntries = entries.slice(-5).reverse();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Reflection</h2>
        <p className="text-gray-600">Explore your thoughts and feelings through writing</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {showPrompts ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a prompt or write freely</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {journalPrompts.slice(0, 6).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptSelect(prompt)}
                  className="p-4 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                >
                  <p className="text-sm text-blue-800">{prompt}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPrompts(false)}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Skip prompts - Free writing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedPrompt && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium">Today's prompt:</p>
                <p className="text-blue-700">{selectedPrompt}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your thoughts
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts and feelings..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={10}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                disabled={!content.trim()}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>Save Entry</span>
              </button>
              
              <button
                onClick={() => {
                  setShowPrompts(true);
                  setSelectedPrompt('');
                  setContent('');
                }}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Back to Prompts
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Entries</h3>
          </div>
          
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{entry.date}</span>
                </div>
                
                <p className="text-sm text-purple-600 font-medium mb-2">{entry.prompt}</p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {entry.content.length > 150 
                    ? `${entry.content.substring(0, 150)}...` 
                    : entry.content
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;