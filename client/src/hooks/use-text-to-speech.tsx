import { useState, useRef } from 'react';
import { TTSState } from '@/types/chat';

declare global {
  interface Window {
    puter: any;
  }
}

export function useTextToSpeech() {
  const [state, setState] = useState<TTSState>({
    isSpeaking: false,
    error: null
  });

  const currentUtteranceRef = useRef<any>(null);

  const speak = async (text: string, language: string = 'en') => {
    if (state.isSpeaking) {
      stop();
    }

    try {
      setState(prev => ({ ...prev, isSpeaking: true, error: null }));

      // Try Puter.js TTS first
      if (window.puter && window.puter.ai && window.puter.ai.txt2speech) {
        try {
          await window.puter.ai.txt2speech(text, {
            voice: getVoiceForLanguage(language)
          });
          setState(prev => ({ ...prev, isSpeaking: false }));
          return;
        } catch (puterError) {
          console.warn('Puter.js TTS failed, falling back to Web Speech API:', puterError);
        }
      }

      // Fallback to Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getLanguageCode(language);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setState(prev => ({ ...prev, isSpeaking: false }));
          currentUtteranceRef.current = null;
        };

        utterance.onerror = (event) => {
          setState(prev => ({ 
            ...prev, 
            error: `Speech synthesis error: ${event.error}`,
            isSpeaking: false 
          }));
          currentUtteranceRef.current = null;
        };

        currentUtteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
      } else {
        throw new Error('Text-to-speech not supported in this browser');
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown TTS error',
        isSpeaking: false 
      }));
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current = null;
    }
    setState(prev => ({ ...prev, isSpeaking: false }));
  };

  return {
    ...state,
    speak,
    stop
  };
}

function getLanguageCode(lang: string): string {
  const languageMap: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN'
  };
  return languageMap[lang] || 'en-US';
}

function getVoiceForLanguage(lang: string): string {
  const voiceMap: Record<string, string> = {
    'en': 'en-US-Standard-A',
    'hi': 'hi-IN-Standard-A',
    'ta': 'ta-IN-Standard-A',
    'te': 'te-IN-Standard-A'
  };
  return voiceMap[lang] || 'en-US-Standard-A';
}
