import { useLanguage, type Language } from '@/context/LuanguageContext';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const LanguageSelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setOpen(false);
  };

  return (
    <div className='relative' ref={ref}>
      <button
        className='flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40'
        onClick={() => setOpen(open => !open)}
      >
        {language.label}
        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className='absolute right-0 top-full z-50 mt-1.5 min-w-30 overflow-hidden
            rounded-lg border border-border bg-popover shadow-lg'
          >
            {supportedLanguages.map(language => (
              <button
                key={language.code}
                className={`flex w-full items-center px-3 py-2 text-xs transition-colors hover:bg-accent ${
                  language.code === language.code ? 'text-primary font-medium' : 'text-foreground'
                }`}
                onClick={() => handleLanguageChange(language)}
              >
                {language.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
