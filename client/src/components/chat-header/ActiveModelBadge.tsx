import { useChat } from '@/context/ChatContext';
import { cn } from '@/lib/utils';
import { Cpu } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Badge } from '../ui/badge';

type ActiveModelBadgeProps = { className?: string };

const ActiveModelBadge = ({ className }: ActiveModelBadgeProps) => {
  const { model } = useChat();
  return (
    <Badge
      variant='outline'
      className={cn('gap-1.5 text-xs font-normal text-muted-foreground py-2 px-3 ml-2', className)}
    >
      <Cpu className='h-3 w-3' />
      <div className='relative flex items-center'>
        <AnimatePresence mode='wait'>
          <motion.span
            key={model}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {model}
          </motion.span>
        </AnimatePresence>
      </div>
    </Badge>
  );
};

export default ActiveModelBadge;
