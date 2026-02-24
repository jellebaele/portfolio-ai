import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = { code: string; label: string; shortLabel: string };

const supportedLanguages: Language[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'nl', label: 'Nederlands', shortLabel: 'NL' }
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  supportedLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  const [language, setLanguageState] = useState<Language>(
    supportedLanguages.find(l => l.code === i18n.language) || supportedLanguages[0]
  );

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    i18n.changeLanguage(newLang.code);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
