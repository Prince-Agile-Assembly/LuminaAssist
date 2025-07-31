import { useState, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';

interface FloatingMicProps {
  language: string;
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export function FloatingMic({ language, onTranscript, disabled = false }: FloatingMicProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const { isListening, transcript, error, toggleListening } = useSpeechRecognition(language);

  useEffect(() => {
    setShowTranscript(isListening && transcript.length > 0);
  }, [isListening, transcript]);

  useEffect(() => {
    if (!isListening && transcript) {
      onTranscript(transcript);
    }
  }, [isListening, transcript, onTranscript]);

  const handleMicToggle = () => {
    if (disabled) return;
    toggleListening();
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Voice Recognition Status */}
        {isListening && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap opacity-100 transition-opacity duration-200">
            <Mic className="inline-block w-3 h-3 text-red-500 mr-1" />
            Listening... (tap to stop)
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap opacity-100 transition-opacity duration-200">
            {error}
          </div>
        )}
        
        {/* Main Mic Button */}
        <Button
          onClick={handleMicToggle}
          disabled={disabled}
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-primary hover:bg-primary/90'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{
            boxShadow: isListening ? '0 0 0 0 rgba(239, 68, 68, 0.4)' : undefined,
            animation: isListening ? 'pulse-ring 1.5s infinite' : undefined
          }}
        >
          {isListening ? (
            <Square className="text-white w-6 h-6" />
          ) : (
            <Mic className="text-white w-6 h-6" />
          )}
        </Button>
        
        {/* Transcript Display */}
        {showTranscript && (
          <Card className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 max-w-sm shadow-lg opacity-100 transition-opacity duration-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mic className="text-primary w-3 h-3" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">You're saying:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{transcript}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
