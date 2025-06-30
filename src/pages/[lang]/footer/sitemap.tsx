import {Link, useNavigate, useParams} from "react-router-dom";
import {getMenuUriList, MenuUri} from "@/api/services/uri-menu.ts";
import {useEffect, useRef, useState} from "react";
import {useAuthStore} from "@/stores/auth-store.ts";
import {useLoadingStore} from "@/stores/loading-store.ts";
import {useTranslation} from "react-i18next";
// 언어 키 타입 정의
type LanguageKey = 'ko' | 'en' | 'zh' | 'ja';
const Sitemap = () => {

  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang: LanguageKey = (lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko") as LanguageKey;
  const [uriMenu, setUriMenu] = useState<MenuUri[] | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { isAuthenticated } = useAuthStore(); // 인증 상태 가져오기
  const { setLoginModalOpen } = useLoadingStore(); // 로그인 모달 함수 가져오기
  const navigate = useNavigate();
  const { setLoading } = useLoadingStore();

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await getMenuUriList();
      setUriMenu(response.data);
    } catch (error) {
      console.error("Failed to fetch uriMenu:", error);
      setUriMenu([]);
    }finally{
      setLoading(false);
    }
  };

  // 프랜차이즈 경로인지 확인하는 함수
  const isFranchiseMenu = (path: string) =>
    path.includes("franchise/notice") ||
    path.includes("franchise/supplies") ||
    path.includes("franchise/manual");

  // 메뉴 클릭 핸들러: 인증이 필요한 경우 로그인 모달 띄우기
  const handleMenuClick = (e: React.MouseEvent, path: string | undefined) => {
    if (!path) {
      e.preventDefault(); // 유효하지 않은 경로인 경우 Link 기본 동작 방지
      return;
    }

    // [lang] 플레이스홀더를 현재 언어로 대체한 최종 목적지 경로
    const targetPath = path.replace("[lang]", currentLang);

    // 이동하려는 경로가 가맹점 관련 경로인지 체크
    const isTargetFranchisePath = targetPath.includes("franchise/notice") ||
      targetPath.includes("franchise/supplies") ||
      targetPath.includes("franchise/manual");

    // PC 메뉴에서 메뉴 클릭 시 메뉴 닫기 (모바일에서도 동일하게 적용)
    const closeMenu = () => {
      const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
      if (headerInner) {
        headerInner.style.height = '';
      }
    };

    // 가맹점 페이지이고, 인증되지 않은 경우 로그인 모달 띄우기
    if (isTargetFranchisePath && !isAuthenticated()) {

      e.preventDefault(); // Link의 기본 동작 (페이지 이동) 방지
      setLoginModalOpen(true, () => {
        // 로그인 성공 후 원래 가려던 페이지로 이동
        navigate(path.replace("[lang]", currentLang));
        closeMenu(); // 메뉴 닫기
      });
      closeMenu(); // 로그인 모달을 띄우기 전에 메뉴 닫기
      return;
    }

    // 일반 메뉴 클릭 시 메뉴 닫기 (탭 이동 후 실행되도록 setTimeout 사용)
    setTimeout(closeMenu, 100);
    // 인증되었거나 가맹점 페이지가 아닌 경우 Link의 기본 동작으로 페이지 이동 (별도 navigate 필요 없음)
    // Link의 기본 동작이 실행되므로, 여기서는 추가 navigate 호출이 필요 없습니다.
  };

  // 언어에 따른 메뉴 제목 반환 함수
  const getMenuTitle = (menu: MenuUri, lang: LanguageKey): string => {
    return menu[lang] || menu.ko; // lang에 해당하는 제목, 없으면 ko, 최종적으로 'Menu' fallback
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="sitemap-wrap">
      <section>
        <div className="hgroup-wrap more-type">
          <p className="f40-700-140">{t('menu.footerSitemap')}</p>
        </div>
      </section>

      <section>
        <div className="sitemap-content">
          <ul className="sitemap-list">
            {uriMenu && uriMenu.map((item) => (
              <li className="sitemap-category">
                <h3 className="category-title">{getMenuTitle(item,currentLang)}</h3>
                <ul className="category-links">
                  {item.sub && item?.sub.map((item) => (
                  (<li>
                    <Link to={`/${currentLang}${item.uri}`}
                          onClick={(e) => {
                            handleMenuClick(e, `/${currentLang}${item.uri}`);
                          }} className={currentLang !== 'ko' && isFranchiseMenu(item.uri) ? 'hidden' : ''}>
                      {getMenuTitle(item,currentLang)}
                    </Link>
                  </li>)
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;