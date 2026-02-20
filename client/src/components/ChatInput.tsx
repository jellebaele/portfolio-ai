import { motion } from 'framer-motion';
import { RotateCcw, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ChatInputProps = {
  onSend: (message: string) => void;
  lastUserMessage: string;
  isLoading: boolean;
  isError: boolean;
};
const ChatInput = ({ onSend, lastUserMessage, isLoading, isError }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = isError ? lastUserMessage : input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className='w-full max-w-3xl mx-auto px-4 pb-6'>
      <div className='relative flex items-end gap-2 rounded-2xl border border-border bg-secondary p-2 transition-all focus-within:border-primary/40 focus-within:glow-sm'>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chatInput.placeholder')}
          rows={1}
          className='flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none'
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={(!input.trim() || isLoading) && !isError}
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-30 -translate-y-0.5'
        >
          {isError && !input.trim() ? (
            <RotateCcw className='h-4 w-4' />
          ) : (
            <Send className='h-4 w-4' />
          )}
        </motion.button>
      </div>
      <p className='mt-2 text-center text-xs text-muted-foreground'>{t('chatInput.footer')}</p>
    </div>
  );
};

export default ChatInput;
