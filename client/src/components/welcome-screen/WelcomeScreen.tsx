import { Briefcase, Code2, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import WelcomeSuggestion from './WelcomeSuggestion';
import WelcomeTitle from './WelcomeTitle';

type WelcomeScreenProps = {
  onSuggestionClick: (question: string) => void;
};

type Suggestion = { icon: any; id: 'technical' | 'experience' | 'background' | 'hireMe' };

const suggestions: Suggestion[] = [
  { icon: Code2, id: 'technical' },
  { icon: Briefcase, id: 'experience' },
  { icon: GraduationCap, id: 'background' },
  { icon: Sparkles, id: 'hireMe' }
];

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='text-center mb-5'
      >
        <WelcomeTitle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className='grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2'
      >
        {suggestions.map((s, i) => (
          <WelcomeSuggestion
            onSuggestionClick={onSuggestionClick}
            index={i}
            question={t(`welcomeScreen.suggestions.${s.id}.question` as any)}
            icon={s.icon}
            label={t(`welcomeScreen.suggestions.${s.id}.label` as any)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
