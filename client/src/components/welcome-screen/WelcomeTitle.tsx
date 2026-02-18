import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WelcomeTitle = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className='mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 glow-md'>
        <Sparkles className='h-7 w-7 text-primary' />
      </div>
      <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
        {t('welcomeScreen.welcomeTitle.title')} <span className='text-gradient'>Jelle Baele</span>
      </h1>
      <p className='mt-3 text-base text-muted-foreground max-w-md mx-auto'>
        {t('welcomeScreen.welcomeTitle.subTitle')}
      </p>
    </>
  );
};

export default WelcomeTitle;
