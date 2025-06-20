export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  stress: number; // 1-10 scale
  energy: number; // 1-10 scale
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
  mood?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'baymax';
  timestamp: string;
}

export interface MeditationSession {
  id: string;
  title: string;
  duration: number; // in minutes
  type: 'breathing' | 'mindfulness' | 'body-scan';
  audioUrl?: string;
}