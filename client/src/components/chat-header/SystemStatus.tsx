import { cn } from '@/lib/utils';

type SystemStatusProps = {
  isSystemError: boolean;
  className?: string;
};

const SystemStatus = ({ isSystemError, className }: SystemStatusProps) => {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div
        className={`h-2 w-2 rounded-full animate-pulse ${isSystemError ? 'bg-amber-500' : 'bg-primary'}`}
      />
      <span className='text-xs text-muted-foreground'>{isSystemError ? 'Degraded' : 'Online'}</span>
    </div>
  );
};

export default SystemStatus;
