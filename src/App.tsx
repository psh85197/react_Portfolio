import './i18n/config.ts'; // i18n 설정 파일 임포트
import { Spinner } from "@/components/common/spinner";
import {FC, Suspense, useEffect} from "react";
import { routes } from "@/routes";
import {useLocation, useRoutes, useNavigate} from "react-router-dom";
import ReactGA from 'react-ga4'
import envConfig from "@/env-config.ts";
import ScrollToTop from '@/components/common/scroll-to-top.tsx';
import AuthComponent from "@/components/auth/AuthComponent.tsx";
import { useAuthStore } from '@/stores/auth-store.ts';

// i18next 인스턴스를 직접 임포트합니다.
import i18n from './i18n/config.ts';
import {MenuProvider} from "@/pages/[lang]/pub/components/layouts/menu_provider.tsx";

// --- 이 부분을 변경합니다 ---
// 컴포넌트 렌더링 트리 외부에 위치시켜, App 컴포넌트가 마운트되기 전에 실행되도록 합니다.
// 즉, 파일이 로드될 때 즉시 실행됩니다.
useAuthStore.getState().initializeAuth();

const App: FC = () => {
  const element = useRoutes(routes);
  const googleAnalyticsApiKey = `${envConfig.GOOGLE_ANALYTICS_API_KEY}`;
  const location = useLocation();
  const navigate = useNavigate();

  // Google Analytics 설정
  useEffect(() => {
    if(googleAnalyticsApiKey) {
      ReactGA.send({hitType: 'pageview', page: location.pathname});
    }
  }, [location, googleAnalyticsApiKey]);

  if(googleAnalyticsApiKey && !ReactGA.isInitialized) {
    ReactGA.initialize(googleAnalyticsApiKey);
  }

  // URL 경로 변경 감지 및 data-path 속성 업데이트
  useEffect(() => {
    const currentPath = location.pathname;
    document.documentElement.setAttribute('data-path', currentPath);
  }, [location.pathname]);

  // --- 언어 설정 및 리다이렉트 로직 추가 ---
  useEffect(() => {
    const currentPathname = location.pathname;
    const pathSegments = currentPathname.split('/').filter(Boolean);
    const langInPath = pathSegments[0];

    const supportedLanguages = ['ko', 'en', 'zh', 'ja'];

    if (!langInPath) {
      if (i18n.language !== 'ko') {
        i18n.changeLanguage('ko');
      }
      navigate('/ko', { replace: true });
      return;
    }

    if (langInPath && !supportedLanguages.includes(langInPath)) {
      console.warn(`Unsupported language "${langInPath}" in URL. Redirecting to default language 'ko'.`);
      if (i18n.language !== 'ko') {
        i18n.changeLanguage('ko');
      }
      navigate('/ko', { replace: true });
      return;
    }

    if (i18n.language !== langInPath) {
      i18n.changeLanguage(langInPath);
    }
  }, [location.pathname, i18n, navigate]);

  useEffect(() => {
    const setHtmlLangAttribute = (languageCode: string | undefined) => {
      if (languageCode) {
        document.documentElement.lang = languageCode.split('-')[0];
      }
    };

    setHtmlLangAttribute(i18n.language);
    i18n.on('languageChanged', setHtmlLangAttribute);

    return () => {
      i18n.off('languageChanged', setHtmlLangAttribute);
    };
  }, [i18n]);

  return (
    <>
      <MenuProvider>
        <ScrollToTop />
        <Suspense fallback={<Spinner />}>{element}</Suspense>
        <AuthComponent />
      </MenuProvider>
    </>
  );
};

export default App;