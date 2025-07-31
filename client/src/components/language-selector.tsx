import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language, LanguageOption } from '@/types/chat';

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', localName: 'English' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', localName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', localName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', localName: 'తెలుగు' }
];

interface LanguageSelectorProps {
  value: Language;
  onValueChange: (language: Language) => void;
}

export function LanguageSelector({ value, onValueChange }: LanguageSelectorProps) {
  const currentLanguage = languages.find(lang => lang.code === value) || languages[0];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-auto min-w-[140px] bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
        <SelectValue>
          <div className="flex items-center space-x-2">
            <span>{currentLanguage.flag}</span>
            <span className="text-sm font-medium">{currentLanguage.localName}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{language.flag}</span>
              <span>{language.localName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
