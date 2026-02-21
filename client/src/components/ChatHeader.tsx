import { useChat } from '@/context/ChatContext';
import { Cpu, Terminal } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import { Badge } from './ui/badge';

type ChatHeaderProps = {
  isSystemError: boolean;
};

const ChatHeader = ({ isSystemError }: ChatHeaderProps) => {
  const { model } = useChat();

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
        <Badge
          variant='outline'
          className='gap-1.5 text-xs font-normal text-muted-foreground py-2 px-3 ml-2'
        >
          <Cpu className='h-3 w-3' />
          {model}
        </Badge>
      </div>
      <div className='flex items-center gap-3'>
        <LanguageSelector />

        <ThemeSelector />
        <div className='flex items-center gap-1.5 w-20'>
          <div
            className={`h-2 w-2 rounded-full animate-pulse ${isSystemError ? 'bg-amber-500' : 'bg-primary'}`}
          />
          <span className='text-xs text-muted-foreground'>
            {isSystemError ? 'Degraded' : 'Online'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
