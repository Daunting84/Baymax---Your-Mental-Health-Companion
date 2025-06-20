import React from 'react';
import { 
  Home, 
  MessageCircle, 
  Heart, 
  BookOpen, 
  Wind,
  Download
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'Chat with Baymax', icon: MessageCircle },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'meditation', label: 'Breathwork', icon: Wind },
  ];

  const exportData = () => {
    const moodEntries = JSON.parse(localStorage.getItem('baymax-mood-entries') || '[]');
    const journalEntries = JSON.parse(localStorage.getItem('baymax-journal-entries') || '[]');
    
    // Convert mood data to CSV
    const csvData = [
      ['Date', 'Mood', 'Stress', 'Energy', 'Notes'],
      ...moodEntries.map((entry: any) => [
        entry.date,
        entry.mood,
        entry.stress,
        entry.energy,
        entry.notes || ''
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `baymax-mood-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    window.URL.revokeObjectURL(url);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Baymax</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              title="Export mood data as CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;