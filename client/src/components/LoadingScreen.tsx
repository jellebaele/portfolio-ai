import { motion } from 'motion/react';
import { useEffect } from 'react';

const LoadingScreen = () => {
  // LoadingScreen is rendered outside ThemeProvider
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') document.documentElement.classList.add('light');
  }, []);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-background'>
      <div className='relative flex items-center justify-center'>
        <motion.div
          className='absolute h-32 w-32 rounded-full bg-primary/20 blur-2xl'
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <svg
            viewBox='0 0 24 24'
            className='h-7 w-7 text-primary'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.8}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='4 17 10 11 4 5' />
            <line x1='12' y1='19' x2='20' y2='19' />
          </svg>
        </motion.div>
      </div>
      <div className='mt-10 flex items-center gap-2'>
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className='h-1.5 w-1.5 rounded-full bg-primary'
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
      <motion.p
        className='mt-4 text-xs tracking-widest text-muted-foreground uppercase'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Loading
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
