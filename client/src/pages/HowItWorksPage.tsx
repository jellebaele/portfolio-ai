import ChatHeader from '@/components/chat-header/ChatHeader';
import LoadingScreen from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';
import { useLanguage } from '@/context/LuanguageContext';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router';

const HowItWorksPage = () => {
  const [content, setContent] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isSystemError } = useChat();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const filePath = `/content/${language.code}/how-it-works.md`;

    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load markdown: ${res.status}`);
        return res.text();
      })
      .then(data => {
        setContent(data);
      })
      .finally(() => setIsLoading(false));
    return () => {
      setIsLoading(false);
    };
  }, [language.code]);

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <ChatHeader isSystemError={isSystemError} onIconClick={() => navigate('/')} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6'
        >
          <article className='prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-primary prose-code:bg-secondary prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-th:text-foreground prose-td:text-muted-foreground prose-li:text-muted-foreground prose-hr:border-border prose-table:border-border prose-th:border-border prose-td:border-border prose-thead:border-border prose-tr:border-border'>
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
          <div className='flex justify-center mt-20'>
            <Button onClick={() => navigate('/')} className='hover:cursor-pointer'>
              <ArrowLeft />
              {t('howItWorksPage.continue')}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HowItWorksPage;
