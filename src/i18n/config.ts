// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ko.json 파일 직접 import
import koTranslation from './locales/ko.json'; // 경로를 정확히 확인하세요.
// 다른 언어 파일들도 마찬가지로 직접 import
import zhTranslation from './locales/zh.json';
import enTranslation from './locales/en.json';
import jaTranslation from './locales/ja.json';


i18n
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next) // React와 통합
  .init({
    resources: {
      ko: {
        translation: koTranslation
      },
      zh: {
        translation: zhTranslation
      },
      en: {
        translation: enTranslation
      },
      ja: {
        translation: jaTranslation
      },
    },
    fallbackLng: ['en', 'ko'], // 'en'이 없으면 'ko'로 폴백
    supportedLngs: ['ko', 'en', 'zh', 'ja'], // 지원 언어 목록
    interpolation: {
      escapeValue: false, // React는 XSS 방지를 자체적으로 처리
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'], // localStorage와 cookie를 navigator보다 우선
      caches: ['localStorage', 'cookie'], // 언어 저장 위치
    },
    react: {
      useSuspense: false,
    },
    returnObjects: true,
  });

export default i18n;