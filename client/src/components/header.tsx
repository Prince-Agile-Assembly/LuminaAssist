import { Brain } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { LanguageSelector } from './language-selector';
import { PWAInstallButton } from './pwa-install-button';
import { Language } from '@/types/chat';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <Brain className="text-white text-lg w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lumina</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Academic Assistant</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            <LanguageSelector value={language} onValueChange={onLanguageChange} />
            <ThemeToggle />
            <PWAInstallButton />
          </div>
        </div>
      </div>
    </header>
  );
}
