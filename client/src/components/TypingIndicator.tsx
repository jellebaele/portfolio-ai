import { motion } from 'motion/react';

const TypingIndicator = () => {
  return (
    <div className='w-full max-w-3xl mx-auto px-4'>
      <div className='flex gap-3 py-4'>
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <svg className='h-4 w-4' viewBox='0 0 24 24' fill='currentColor'>
            <circle cx='12' cy='12' r='3' />
          </svg>
        </div>
        <div className='flex items-center gap-1.5 px-4 py-3'>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className='h-2 w-2 rounded-full bg-muted-foreground'
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
