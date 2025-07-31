import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/use-pwa-install';

export function PWAInstallButton() {
  const { canInstall, installPWA } = usePWAInstall();

  if (!canInstall) {
    return null;
  }

  return (
    <Button 
      onClick={installPWA}
      className="hidden md:flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <Download className="h-4 w-4" />
      <span>Install App</span>
    </Button>
  );
}
