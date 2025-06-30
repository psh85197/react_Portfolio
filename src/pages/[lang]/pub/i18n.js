import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koTranslation from '@/i18n/locales/ko.json';
import enTranslation from '@/i18n/locales/en.json';
import jaTranslation from '@/i18n/locales/ja.json';
import zhTranslation from '@/i18n/locales/zh.json';

// Get language from URL path
const getLanguageFromPath = () => {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(ko|en|ja|zh)/);
  return langMatch ? langMatch[1] : 'ko';
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: koTranslation
      },
      en: {
        translation: enTranslation
      },
      ja: {
        translation: jaTranslation
      },
      zh: {
        translation: zhTranslation
      }
    },
    lng: getLanguageFromPath(),
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    },
    returnObjects: true,
    keySeparator: '.',
    nsSeparator: ':',
    initImmediate: false,
    load: 'languageOnly',
    caches: ['localStorage'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

// Force initial language
const initialLang = getLanguageFromPath();
i18n.changeLanguage(initialLang);

// Update language when URL changes
window.addEventListener('popstate', () => {
  const newLang = getLanguageFromPath();
  i18n.changeLanguage(newLang);
});

// Watch for URL changes
const observer = new MutationObserver(() => {
  const newLang = getLanguageFromPath();
  if (i18n.language !== newLang) {
    i18n.changeLanguage(newLang);
  }
});

observer.observe(document, {
  subtree: true,
  childList: true
});

export default i18n;
