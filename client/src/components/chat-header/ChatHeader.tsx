import { Info, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import ActiveModelBadge from './ActiveModelBadge';
import LanguageSelector from './LanguageSelector';
import SystemStatus from './SystemStatus';
import ThemeSelector from './ThemeSelector';

type ChatHeaderProps = {
  isSystemError: boolean;
  onIconClick: () => void;
};

const ChatHeader = ({ isSystemError, onIconClick }: ChatHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className='flex items-center justify-between border-b border-border px-4 py-3 sm:px-6'>
      <div className='flex items-center gap-2.5'>
        <button className='flex items-center gap-2.5 hover:cursor-pointer' onClick={onIconClick}>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
            <Terminal className='h-4 w-4 text-primary' />
          </div>
          <div>
            <h2 className='text-sm font-semibold text-left text-foreground'>Jelle Baele</h2>
            <p className='text-xs text-muted-foreground'>AI Portfolio Assistant</p>
          </div>
        </button>
        <ActiveModelBadge className='hidden sm:flex' />
      </div>
      <div className='flex items-center gap-3'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => navigate('/how-it-works')}
          title='How it works'
          className='hover:cursor-pointer'
        >
          <Info className='h-4 w-4' />
        </Button>
        <LanguageSelector />
        <ThemeSelector />
        <SystemStatus className='hidden sm:flex' isSystemError={isSystemError} />
      </div>
    </header>
  );
};

export default ChatHeader;
