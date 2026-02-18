import { Briefcase, Code2, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import WelcomeSuggestion from './WelcomeSuggestion';
import WelcomeTitle from './WelcomeTitle';

type WelcomeScreenProps = {
  onSuggestionClick: (question: string) => void;
};

const suggestions = [
  {
    icon: Code2,
    label: 'Technical Skills',
    question: 'What programming languages and technologies do you work with?',
  },
  {
    icon: Briefcase,
    label: 'Experience',
    question: 'Tell me about your most impactful project and your role in it.',
  },
  {
    icon: GraduationCap,
    label: 'Background',
    question: 'What is your educational background and how did you get into development?',
  },
  {
    icon: Sparkles,
    label: 'Why Hire Me',
    question: 'What makes you stand out as a developer and teammate?',
  },
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='text-center mb-5'>
        <WelcomeTitle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className='grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2'>
        {suggestions.map((s, i) => (
          <WelcomeSuggestion
            onSuggestionClick={onSuggestionClick}
            index={i}
            question={s.question}
            icon={s.icon}
            label={s.label}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
