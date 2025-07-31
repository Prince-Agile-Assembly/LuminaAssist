export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  error: string | null;
}

export interface TTSState {
  isSpeaking: boolean;
  error: string | null;
}

export type Language = 'en' | 'hi' | 'ta' | 'te';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  localName: string;
}
