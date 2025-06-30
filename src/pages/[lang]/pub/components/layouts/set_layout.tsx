// src/components/layout/default/SampleLayout.tsx
import { FC, PropsWithChildren, useEffect, useState } from "react";
import DefaultHeader, {HeaderMenuItem} from "@/components/layout/default/header";
import DefaultFooter from "@/components/layout/default/footer";
import '@/assets/scss/style.scss';
import {Outlet, useNavigate} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useLocation } from "react-router-dom";
import TopButton from '../common/topbtn';
import QuickMenu from '../common/quickmenu';
import { useLoadingStore } from "@/stores/loading-store.ts";
import { LoadingOverlay } from "@/components/ui/loading-overlay.tsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {useMenuContext} from "@/pages/[lang]/pub/components/layouts/menu_provider.tsx";
import {LanguageKey, MenuItemBread} from "@/types/menu.ts";
import {useAuthStore} from "@/stores/auth-store.ts";

export const SampleLayout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [activeMenus, setActiveMenus] = useState<MenuItemBread[]>([]);
  const [isHome, setIsHome] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang: LanguageKey = (lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko") as LanguageKey;
  const { isLoading } = useLoadingStore();
  const { token } = useAuthStore();
  const { selectedMenuPath, refreshContentKey, setSelectedMenuPath, triggerContentRefresh } = useMenuContext();

  // MenuItemBread를 HeaderMenuItem으로 변환하는 함수
  const convertToHeaderMenuItem = (menu: MenuItemBread): HeaderMenuItem => ({
    id: menu.id ?? "", // id가 undefined일 경우 빈 문자열로 대체
    title: menu.title,
    type: menu.type ?? "link", // type이 undefined일 경우 기본값
    path: menu.path ?? "#", // path가 undefined일 경우 기본값
    ko: menu.ko,
    en: menu.en,
    zh: menu.zh,
    ja: menu.ja,
    children: menu.children?.map(convertToHeaderMenuItem), // 재귀적으로 변환
  });

  useEffect(() => {
    const currPathname = location.pathname;
    if (currPathname === '/home' || currPathname === `/${currentLang}`) {
      setIsHome(true);
      setActiveMenus([]);
      setSelectedMenuPath([]);
      return;
    }
    setIsHome(false);
    setActiveMenus(selectedMenuPath.map(convertToHeaderMenuItem));
  }, [location, selectedMenuPath]);

  const getMenuTitle = (menu: MenuItemBread, lang: LanguageKey): string => {
    return menu[lang] || menu.ko || t(menu.title);
  };

  // 브레드크럼 클릭 핸들러
  const handleBreadcrumbClick = (menu: MenuItemBread, index: number) => {
    let targetPath = menu.path?.replace("[lang]", currentLang);
    let menuPath: HeaderMenuItem[] = [];

    // 대메뉴(type: 'sub')일 경우 첫 번째 하위 메뉴로 이동
    if (menu.type === 'sub' && menu.children && menu.children.length > 0) {
      targetPath = menu.children[0].path?.replace("[lang]", currentLang);
      // 대메뉴와 첫 번째 소메뉴를 menuPath에 포함
      menuPath = [
        convertToHeaderMenuItem(menu), // 대메뉴
        convertToHeaderMenuItem(menu.children[0]), // 첫 번째 소메뉴
      ];
    } else {
      // 하위 메뉴일 경우 해당 메뉴까지만 포함
      menuPath = activeMenus.slice(0, index + 1).map(convertToHeaderMenuItem);
    }


    if (targetPath) {
      // 현재 경로와 동일하면 콘텐츠 새로고침
      if (targetPath === location.pathname) {
        triggerContentRefresh(); // 콘텐츠 새로고침
        setSelectedMenuPath(menuPath); // 메뉴 경로 업데이트
        return;
      }

      // MenuContext에 선택된 메뉴 경로 업데이트
      setSelectedMenuPath(menuPath);
      navigate(targetPath);
    }
  };

  return (
    <div className="wrap">
      <LoadingOverlay loading={isLoading}>
        <DefaultHeader />
        <Breadcrumb className="flex items-end breadcrumb">
          <BreadcrumbList>
            {isHome ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-zinc-700 font-bold">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${currentLang}`}
                    className="flex items-center text-zinc-500"
                    onClick={() => {
                      setSelectedMenuPath([]); // 홈으로 이동 시 메뉴 경로 초기화
                      navigate(`/${currentLang}`);
                    }}
                  >
                    <Home size={15} className="mr-1" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {activeMenus.map((menu, index) => (
                  <div key={`${menu.id}-${menu.path}`} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {menu.type === 'link' && index !== activeMenus.length - 1 ? (
                        <BreadcrumbLink
                          href={ menu.children && menu.children.length > 0
                            ? menu.children[0].path?.replace("[lang]", currentLang)
                            : menu.path.replace("[lang]", currentLang)}
                          className="text-zinc-500 cursor-pointer"
                          onClick={() => handleBreadcrumbClick(menu, index)}
                        >
                          {getMenuTitle(menu, currentLang)}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className={index === activeMenus.length - 1 ? "text-zinc-700 font-bold cursor-pointer" : ""} onClick={() => handleBreadcrumbClick(menu, index)}>
                          {getMenuTitle(menu, currentLang)}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="content">
          <div className="inner">
            {children}
            <TooltipProvider>
              <Outlet key={refreshContentKey} />
            </TooltipProvider>
          </div>
        </div>
        <DefaultFooter />
        {token && <QuickMenu />}
        <TopButton />
      </LoadingOverlay>
    </div>
  );
};

export default SampleLayout;