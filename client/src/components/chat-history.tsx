import { useState } from 'react';
import { MessageCircle, User, Copy, Volume2, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/types/chat';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { useToast } from '@/hooks/use-toast';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
  language: string;
}

export function ChatHistory({ messages, isLoading, language }: ChatHistoryProps) {
  const { speak, isSpeaking } = useTextToSpeech();
  const { toast } = useToast();

  const handleSpeak = async (text: string) => {
    try {
      await speak(text, language);
    } catch (error) {
      toast({
        title: "Speech Error",
        description: "Unable to speak the text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Error",
        description: "Unable to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  const formatTimestamp = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="text-gray-400 text-xl w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversations yet</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Press the microphone button below to start asking questions and get intelligent responses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-20">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-bubble flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.type === 'user' ? (
            <Card className="max-w-3xl bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1 text-primary-foreground/80">You asked:</p>
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <User className="text-primary-foreground/60 w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-foreground/20">
                  <span className="text-xs text-primary-foreground/60">
                    {formatTimestamp(message.timestamp)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak(message.content)}
                    className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 h-6 w-6 p-0"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <Brain className="text-white w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Lumina says:</p>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(message.timestamp)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(message.content)}
                      className="text-gray-400 hover:text-primary h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpeak(message.content)}
                      disabled={isSpeaking}
                      className="text-gray-400 hover:text-primary h-6 w-6 p-0"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}

      {/* Loading State */}
      {isLoading && (
        <div className="chat-bubble flex justify-start">
          <Card className="max-w-3xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center animate-pulse">
                    <Brain className="text-white w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Lumina is thinking...</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
