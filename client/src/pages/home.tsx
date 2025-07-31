import { useState, useCallback } from 'react';
import { Header } from '@/components/header';
import { StatusCard } from '@/components/status-card';
import { ChatHistory } from '@/components/chat-history';
import { FloatingMic } from '@/components/floating-mic';
import { ChatMessage, Language } from '@/types/chat';
import { useGemini } from '@/hooks/use-gemini';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  
  const { generateResponse, isLoading } = useGemini();
  const { toast } = useToast();

  const handleTranscript = useCallback(async (transcript: string) => {
    if (!transcript.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: transcript.trim(),
      timestamp: new Date(),
      language
    };

    // Add user message
    setMessages(prev => [userMessage, ...prev.slice(0, 4)]); // Keep only last 5 pairs

    try {
      // Generate AI response
      const response = await generateResponse(transcript.trim(), language);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        language
      };

      // Add assistant message
      setMessages(prev => [assistantMessage, ...prev.slice(0, 4)]);

    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Error is already handled in useGemini hook
    }
  }, [language, generateResponse]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Header 
        language={language} 
        onLanguageChange={setLanguage} 
      />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <StatusCard 
          isListening={isListening} 
          isLoading={isLoading} 
        />
        
        <ChatHistory 
          messages={messages} 
          isLoading={isLoading}
          language={language}
        />
      </main>
      
      <FloatingMic
        language={language}
        onTranscript={handleTranscript}
        disabled={isLoading}
      />
    </div>
  );
}
