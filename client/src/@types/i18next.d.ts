import 'i18next';

// We only import English as the "Source of Truth" for the types
import enTranslation from '../../public/locales/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'enTranslation';
    resources: {
      enTranslation: typeof enTranslation;
    };
  }
}
