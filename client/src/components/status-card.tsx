import { Mic } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatusCardProps {
  isListening: boolean;
  isLoading: boolean;
}

export function StatusCard({ isListening, isLoading }: StatusCardProps) {
  const getStatus = () => {
    if (isLoading) {
      return {
        title: 'Processing...',
        description: 'Getting response from Lumina AI',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30'
      };
    }
    
    if (isListening) {
      return {
        title: 'Listening...',
        description: 'Speak your question now',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/30'
      };
    }
    
    return {
      title: 'Ready to Help',
      description: 'Press the microphone to ask a question',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    };
  };

  const status = getStatus();

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${status.bgColor} rounded-full flex items-center justify-center`}>
              <Mic className={`${status.color} w-5 h-5`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{status.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{status.description}</p>
            </div>
          </div>
          
          {/* Voice Activity Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isListening || isLoading ? 'animate-pulse' : ''} ${status.color.replace('text-', 'bg-')}`}></div>
            <span className={`text-sm font-medium ${status.color}`}>
              {isLoading ? 'Processing' : isListening ? 'Listening' : 'Online'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
