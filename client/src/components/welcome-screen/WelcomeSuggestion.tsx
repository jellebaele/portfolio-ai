import type { LucideProps } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
type WelcomeSuggestionProps = {
  onSuggestionClick: (question: string) => void;
  index: number;
  question: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};
const WelcomeSuggestion = ({
  onSuggestionClick,
  index,
  question,
  icon: Icon,
  label,
}: WelcomeSuggestionProps) => {
  return (
    <>
      <motion.button
        key={index}
        whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--secondary))' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSuggestionClick(question)}
        className='flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/30'>
        <Icon className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
        <div>
          <p className='text-sm font-medium text-foreground'>{label}</p>
          <p className='mt-0.5 text-xs text-muted-foreground line-clamp-2'>{question}</p>
        </div>
      </motion.button>
    </>
  );
};

export default WelcomeSuggestion;
