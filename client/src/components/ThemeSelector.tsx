import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className='flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-colors hover:border-primary/40'
      aria-label='Toggle theme'
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun className='h-3.5 w-3.5' /> : <Moon className='h-3.5 w-3.5' />}
      </motion.div>
    </button>
  );
};
export default ThemeSelector;
