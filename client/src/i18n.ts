import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          chatInput: {
            placeholder: 'Ask my anything...',
          },
          // here we will place our translations...
        },
      },
      nl: {
        translation: {
          chatInput: {
            placeholder: 'Vraag me wat je wilt...',
          },
          // here we will place our translations...
        },
      },
    },
  });

export default i18n;
