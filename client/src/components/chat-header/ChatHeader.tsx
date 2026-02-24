import { Terminal } from 'lucide-react';
import ActiveModelBadge from './ActiveModelBadge';
import LanguageSelector from './LanguageSelector';
import SystemStatus from './SystemStatus';
import ThemeSelector from './ThemeSelector';

type ChatHeaderProps = {
  isSystemError: boolean;
};

const ChatHeader = ({ isSystemError }: ChatHeaderProps) => {
  return (
    <header className='flex items-center justify-between border-b border-border px-4 py-3 sm:px-6'>
      <div className='flex items-center gap-2.5'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
          <Terminal className='h-4 w-4 text-primary' />
        </div>
        <div>
          <h2 className='text-sm font-semibold text-left text-foreground'>Jelle Baele</h2>
          <p className='text-xs text-muted-foreground'>AI Portfolio Assistant</p>
        </div>
        <ActiveModelBadge className='hidden sm:flex' />
      </div>
      <div className='flex items-center gap-3'>
        <LanguageSelector />
        <ThemeSelector />
        <SystemStatus className='hidden sm:flex' isSystemError={isSystemError} />
      </div>
    </header>
  );
};

export default ChatHeader;
