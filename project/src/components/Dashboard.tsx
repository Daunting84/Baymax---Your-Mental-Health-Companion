import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Heart, 
  BookOpen, 
  MessageCircle,
  Wind
} from 'lucide-react';
import { MoodEntry, JournalEntry } from '../types';

interface DashboardProps {
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  moodEntries, 
  journalEntries, 
  onNavigate 
}) => {
  const recentMoodEntries = moodEntries.slice(-7);
  const averageMood = recentMoodEntries.length > 0 
    ? recentMoodEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentMoodEntries.length
    : 0;

  const quickActions = [
    {
      title: 'Chat with Baymax',
      description: 'Talk about your feelings',
      icon: MessageCircle,
      color: 'blue',
      action: () => onNavigate('chat')
    },
    {
      title: 'Track Your Mood',
      description: 'Log how you\'re feeling',
      icon: Heart,
      color: 'red',
      action: () => onNavigate('mood')
    },
    {
      title: 'Write in Journal',
      description: 'Reflect on your day',
      icon: BookOpen,
      color: 'purple',
      action: () => onNavigate('journal')
    },
    {
      title: 'Breathwork Session',
      description: 'Guided meditation',
      icon: Wind,
      color: 'green',
      action: () => onNavigate('meditation')
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      green: 'bg-green-50 text-green-600 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Hello! I'm Baymax, your personal healthcare companion.
        </h2>
        <p className="text-gray-600 text-lg">
          How can I help you feel better today?
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageMood > 0 ? averageMood.toFixed(1) : '--'}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mood Entries</p>
              <p className="text-2xl font-bold text-gray-900">{moodEntries.length}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Journal Entries</p>
              <p className="text-2xl font-bold text-gray-900">{journalEntries.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md hover:scale-105 ${getColorClasses(action.color)}`}
              >
                <div className="flex items-start space-x-4">
                  <Icon className="w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{action.title}</h4>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentMoodEntries.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Mood Trends</h3>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="space-y-3">
              {recentMoodEntries.slice(-5).reverse().map((entry) => (
                <div key={entry.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{entry.date}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Mood: {entry.mood}/10</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(entry.mood / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;