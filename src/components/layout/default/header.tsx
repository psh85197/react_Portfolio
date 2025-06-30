import {FC, useState, useRef, useEffect, useMemo, useCallback} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {MenuItems, MenuItem} from "@/data/menu.ts";
import {useTranslation} from "react-i18next";
import {useAuthStore} from "@/stores/auth-store.ts";
import {useLoadingStore} from "@/stores/loading-store.ts";
import {getMenuUriList, MenuUri} from "@/api/services/uri-menu.ts";
import {useMenuContext} from "@/pages/[lang]/pub/components/layouts/menu_provider.tsx";
import {checkToken} from "@/api/services/auth.ts";

// 메뉴 아이템 인터페이스 정의
export interface HeaderMenuItem {
  id: string;
  title: string;
  type: string;
  path: string;
  ko: string;
  en: string;
  zh: string;
  ja: string;
  children?: HeaderMenuItem[];
}

// 언어 키 타입 정의
type LanguageKey = "ko" | "en" | "zh" | "ja";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const DashboardHeader: FC = () => {
  const {t} = useTranslation();
  const baseLanguageMap: { [key: string]: string } = {
    KR: "ko", EN: "en", CN: "zh", JP: "ja",
  };
  const languageMap: { [key: string]: string } = {...baseLanguageMap};
  Object.entries(baseLanguageMap).forEach(([displayCode, internalCode]) => {
    languageMap[internalCode] = displayCode;
  });

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const {lang} = useParams<{ lang: string }>();
  const currentLang: LanguageKey = (lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko") as LanguageKey;
  const [selectedLanguage, setSelectedLanguage] = useState(languageMap[currentLang]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeAccordion') || '';
    }
    return '';
  });
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1023);
  const location = useLocation();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const languageSelectRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const {i18n} = useTranslation();
  const isFranchisePath = location.pathname.includes("franchise/notice") || location.pathname.includes("franchise/supplies") || location.pathname.includes("franchise/manual");

  const {clearAuth, isAuthenticated, token} = useAuthStore();
  const {setLoginModalOpen} = useLoadingStore();
  const [uriMenu, setUriMenu] = useState<MenuUri[] | null>(null);
  const {setSelectedMenuPath, triggerContentRefresh, selectedMenuPath} = useMenuContext();
  const userId = localStorage.getItem("userId");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const fetchMenu = async () => {
    try {
      const response = await getMenuUriList();
      setUriMenu(response.data);
    } catch (error) {
      console.error("Failed to fetch uriMenu:", error);
      setUriMenu([]);
    }
  };

  useEffect(() => {
    fetchMenu();
    checkInitToken();
  }, []);

  const checkInitToken = useCallback(async () => {
    // 프랜차이즈 경로인 경우에만 인증 상태 확인 및 토큰 체크
    if (!isFranchisePath && isAuthenticated() && token && userId) {
      const response = await checkToken(); // 토큰 유효성 검사

      if (response.code === 200 && response.data.success) {
        return true; // 토큰 유효
      } else {
        clearAuth(); // 인증 정보 초기화
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && activeAccordion) {
      localStorage.setItem('activeAccordion', activeAccordion);
    }
  }, [activeAccordion]);

  // MenuItems를 id 기준으로 빠르게 검색하기 위해 Map 생성
  const menuItemsMap = new Map<string, MenuItem>(MenuItems.map((item) => [item.id || item.title, item]));

  // 프랜차이즈 경로인지 확인하는 함수
  const isFranchiseMenu = (path: string) => path.includes("franchise/notice") || path.includes("franchise/supplies") || path.includes("franchise/manual");

  // filteredMenuItems 생성: uriMenu 순서를 따르고 MenuItems에 존재하는 항목만 포함
  const filteredMenuItems: HeaderMenuItem[] = useMemo(() => {
    return uriMenu ? uriMenu
      .map((uri): HeaderMenuItem | null => {
        const menu = menuItemsMap.get(uri.id);
        if (!menu) {
          return null; // MenuItems에 없는 uriMenu 항목은 제외
        }

        // 하위 메뉴 필터링
        const filteredChildren: HeaderMenuItem[] = uri.sub
          ?.map((subItem): HeaderMenuItem | null => {
            const childMenu = menu.children?.find((child) => child.id === subItem.id);
            if (!childMenu) {
              return null; // MenuItems.children에 없는 sub 항목은 제외
            }
            if (isFranchiseMenu(childMenu.path || "") && currentLang !== "ko") {
              return null; // 프랜차이즈 경로이고 언어가 'ko'가 아닌 경우 제외
            }
            return {
              id: childMenu.id || subItem.id,
              title: childMenu.title,
              type: childMenu.type || "link",
              path: childMenu.path || "#",
              ko: subItem.ko || childMenu.title,
              en: subItem.en || childMenu.title,
              zh: subItem.zh || childMenu.title,
              ja: subItem.ja || childMenu.title,
              children: [],
            };
          })
          .filter((child): child is HeaderMenuItem => child !== null) || [];

        if (isFranchiseMenu(menu.path || "") && currentLang !== "ko") {
          return null; // 프랜차이즈 경로이고 언어가 'ko'가 아닌 경우 제외
        }

        return {
          id: menu.id || uri.id,
          title: menu.title,
          type: menu.type || "sub",
          path: menu.path || "#",
          ko: uri.ko || menu.title,
          en: uri.en || menu.title,
          zh: uri.zh || menu.title,
          ja: uri.ja || menu.title,
          children: filteredChildren,
        };
      })
      .filter((item): item is HeaderMenuItem => item !== null) : [];
  }, [uriMenu, currentLang]);

  const updateMenuSelection = useCallback(() => {
    const currentPath = location.pathname;
    let newActiveMenuId: string | null = null;
    let newMenuPath: HeaderMenuItem[] = [];
    if (!currentPath.includes("footer")) {
      for (const menu of filteredMenuItems) {
        if (menu.path?.replace("[lang]", currentLang) === currentPath) {
          newActiveMenuId = menu.id;
          newMenuPath = [menu];
          break;
        }
        for (const submenu of menu.children || []) {
          if (submenu.path.replace("[lang]", currentLang) === currentPath) {
            newActiveMenuId = menu.id;
            newMenuPath = [menu, submenu];
            break;
          }
        }
        if (newMenuPath.length > 0) break;
      }

      // 조건적 상태 업데이트로 무한 루프 방지
      if (newActiveMenuId !== activeMenuId) {
        setActiveMenuId(newActiveMenuId);
      }
      if (JSON.stringify(newMenuPath) !== JSON.stringify(selectedMenuPath)) {
        setSelectedMenuPath(newMenuPath);
      }
    }
  }, [location.pathname, currentLang, filteredMenuItems, activeMenuId, selectedMenuPath]);

// useEffect로 메뉴 선택 로직 실행
  useEffect(() => {
    updateMenuSelection();
  }, [updateMenuSelection]);

  useEffect(() => {
    if (isFranchisePath && isAuthenticated()) {
      setSelectedLanguage("KR");
      changeLanguage("ko");
      const currentPath = location.pathname;
      if (!currentPath.includes("/ko")) {
        navigate(currentPath.replace(/\/(en|zh|ja)/, "/ko"));
      }
    } else {
      setSelectedLanguage(languageMap[currentLang]);
      changeLanguage(currentLang);
    }
  }, [isFranchisePath, currentLang, navigate, isAuthenticated]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrollingUp = scrollPosition < lastScrollY;
      setIsScrolled(scrollPosition > 0);
      const header = headerRef.current;
      if (header) {
        if (isScrollingUp) {
          header.classList.add('scrolling-up');
        } else {
          header.classList.remove('scrolling-up');
        }
      }
      lastScrollY = scrollPosition;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isMobileView) return;
    const headerRect = headerRef.current?.getBoundingClientRect();
    if (headerRect && e.clientY <= headerRect.bottom) {
      openMenu();
    }
  };

  const openMenu = () => {
    if (isMobileView) return;
    setHoveredMenu('active');
    const depth2Elements = headerRef.current?.querySelectorAll('.depth2');
    if (depth2Elements) {
      let maxHeight = 0;
      depth2Elements.forEach(element => {
        const height = element.getBoundingClientRect().height;
        maxHeight = Math.max(maxHeight, height);
      });
      const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
      if (headerInner && maxHeight > 0) {
        headerInner.style.height = `${maxHeight + 100}px`;
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isMobileView) return;
    const headerRect = headerRef.current?.getBoundingClientRect();
    const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
    if (headerRect && headerInner) {
      const headerInnerRect = headerInner.getBoundingClientRect();
      const isLeavingHeaderArea = e.clientY > headerInnerRect.bottom || e.clientY < headerRect.top || e.clientX < headerRect.left || e.clientX > headerRect.right;

      if (isLeavingHeaderArea) {
        setTimeout(() => {
          const isHoveringSubmenu = document.querySelector('.header:hover');

          if (!isHoveringSubmenu) {

            setHoveredMenu(null);
            headerInner.style.height = '';
          }
        }, 300);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 1023;
      setIsMobileView(isMobile);
      if (isMobile) {
        setHoveredMenu(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileView || hoveredMenu === 'active') return;
      if (e.clientY <= 50) {
        openMenu();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredMenu, isMobileView]);

  useEffect(() => {
    const handleTouchOutside = (e: TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        if (isMobileView) {
          setIsMobileMenuOpen(false);
          handleClickMenu(false);
        } else {
          setHoveredMenu(null);
          const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
          if (headerInner) {
            headerInner.style.height = '';
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchOutside, {passive: true});
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, [isMobileView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageSelectRef.current && !languageSelectRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (isMobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node) && !headerRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        handleClickMenu(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileMenuOpen) return;
      const headerRect = headerRef.current?.getBoundingClientRect();
      const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
      const headerInnerRect = headerInner?.getBoundingClientRect();
      if (headerRect && headerInnerRect) {
        const isOutsideHeader = e.clientY > Math.max(headerRect.bottom, headerInnerRect.bottom) || e.clientY < Math.min(headerRect.top, headerInnerRect.top) || e.clientX < Math.min(headerRect.left, headerInnerRect.left) || e.clientX > Math.max(headerRect.right, headerInnerRect.right);
        if (isOutsideHeader) {
          setHoveredMenu(null);
          headerInner.style.height = '';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobileMenuOpen]);

  const handleClickMenu = (isOpen: boolean) => {
    setHoveredMenu(isOpen ? 'active' : null);
    if (isOpen) {
      document.body.classList.add('body-hidden');
    } else {
      document.body.classList.remove('body-hidden');
    }
  };

  const handleMobileMenuClick = () => {
    const newIsOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(newIsOpen);
    handleClickMenu(newIsOpen);
  };

  const handleMenuClick = async (e: React.MouseEvent, path: string | undefined, menu: HeaderMenuItem, parentMenu?: HeaderMenuItem) => {

    if (!path || path === "#") {
      e.preventDefault();
      return;
    }
    const targetPath = path.replace("[lang]", currentLang);
    const currentPath = location.pathname;
    const isTargetFranchisePath = isFranchiseMenu(targetPath);
    const closeMenu = () => {
      if (isMobileView) {
        setIsMobileMenuOpen(false);
        handleClickMenu(false);
      } else {
        setHoveredMenu(null);
        const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
        if (headerInner) {
          headerInner.style.height = '';
        }
      }
    };
    // 메뉴 경로 구성: 부모 메뉴와 현재 메뉴를 포함
    const menuPath: HeaderMenuItem[] = parentMenu ? [parentMenu, menu] : [menu];

    // 프랜차이즈 경로면 토큰 검사
    if (isTargetFranchisePath) {
      e.preventDefault();
      const isValid = await performTokenCheck(targetPath, menuPath);
      if (!isValid) {
        if (isFranchisePath) {
          navigate(`/${currentLang}`);
        }
        closeMenu();
        return;
      } else {
        setSelectedMenuPath(menuPath);
        setActiveMenuId(parentMenu ? parentMenu.id : menu.id);
        navigate(targetPath);
      }
    } else {
      await performTokenCheck(targetPath, menuPath);
    }


    // 동일 경로면 새로고침 및 메뉴 닫기
    if (targetPath === currentPath) {
      setSelectedMenuPath(menuPath);
      triggerContentRefresh();
      closeMenu();
      return;
    }

    setSelectedMenuPath(menuPath);
    setActiveMenuId(parentMenu ? parentMenu.id : menu.id);
    navigate(targetPath);
    setTimeout(closeMenu, 100);

  };

  const getMenuTitle = (menu: HeaderMenuItem, lang: LanguageKey): string => {
    return menu[lang] || menu.ko || t(menu.title);
  };


  const performTokenCheck = useCallback(async (targetPath: string, menuPath: HeaderMenuItem[]): Promise<boolean> => {
    const isTargetFranchise = isFranchiseMenu(targetPath);

    if (!isTargetFranchise) {
      // 프랜차이즈 경로가 아니면 토큰 체크는 필요 없음.
      // 하지만, 혹시 모를 경우를 대비해 토큰이 있다면 checkToken 한 번 수행 가능.
      // 여기서는 굳이 필요 없다고 판단하고 true 반환
      return true;
    }

    // 프랜차이즈 경로인 경우에만 인증 상태 확인 및 토큰 체크
    if (!isAuthenticated() || !token || !userId) {
      // 인증 정보가 없으면 로그인 모달 띄우기
      setLoginModalOpen(true, () => {
        setSelectedMenuPath(menuPath);
        navigate(targetPath);
      });
      return false;
    }

    try {
      const response = await checkToken(); // 토큰 유효성 검사

      if (response.code === 200 && response.data.success) {
        return true; // 토큰 유효
      } else {
        // 토큰 유효성 검사 실패 또는 응답 구조 오류
        console.error("Token check failed or unexpected response:", response);
        clearAuth(); // 인증 정보 초기화
        setLoginModalOpen(true, () => {
          setSelectedMenuPath(menuPath);
          navigate(targetPath);
        });
        return false;
      }
    } catch (error) {
      console.error('Error in performTokenCheck:', error);
      clearAuth(); // 에러 발생 시에도 인증 정보 초기화
      setLoginModalOpen(true, () => {
        setSelectedMenuPath(menuPath);
        navigate(targetPath);
      });
      return false;
    }
  }, [isAuthenticated, token, userId, isFranchiseMenu, setLoginModalOpen, clearAuth, setSelectedMenuPath, navigate]);

  return (<header
    ref={headerRef}
    className={cn("header", isScrolled && "scrolled", isMobileView ? (isMobileMenuOpen && "active") : (hoveredMenu && "active"))}
    onMouseEnter={isMobileView ? undefined : handleMouseEnter}
    onMouseLeave={isMobileView ? undefined : handleMouseLeave}
  >
    <ul className="skipnav">
      <li>
        <a href="#content" className="hide-txt">컨텐츠 바로가기</a>
      </li>
    </ul>
    <div className="header-inner">
      <div className="header-content">
        <div className="gnb-wrap">
          <div className="gnb-logo">
            <h1>
              <Link to={`/${currentLang}`} className="logo">
                <span className="hide-txt">Logo</span>
              </Link>
            </h1>
          </div>
          <div className="gnb-menu-mobile-wrap mo-show">
            <Button
              className="gnb-menu-mobile-btn"
              onClick={handleMobileMenuClick}
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
                <span className={cn("hamburger", isMobileMenuOpen && "active")} aria-hidden="true">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </span>
            </Button>
          </div>
          <div className={cn("gnb-menu-mobile-list mo-show", isMobileMenuOpen && "active")}>
            <div className="gnb-menu" onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveAccordion('');
              }
            }}>
              <Accordion
                type="single"
                collapsible
                value={activeAccordion}
                onValueChange={setActiveAccordion}
                className="accordion-wrap"
              >
                {filteredMenuItems.map((menu: HeaderMenuItem) => (
                  <AccordionItem value={`item-${menu.id}-${menu.path}`} key={`${menu.id}-${menu.path}`}>
                    <AccordionTrigger>
                      <span>{getMenuTitle(menu, currentLang)}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="gnb-menu-list">
                        {menu.children?.map((submenu) => (
                          <li className="gnb-menu-item" key={`${submenu.id}-${submenu.path}`}>
                            <Link
                              to={submenu.path.replace("[lang]", currentLang) || "#"}
                              onClick={(e) => {
                                handleMenuClick(e, submenu.path, submenu, menu);
                              }}
                            >
                              <span>{getMenuTitle(submenu, currentLang)}</span>
                            </Link>
                          </li>))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>))}
              </Accordion>
            </div>
          </div>
          <nav ref={navRef} className="nav pc-show">
            <ul className="nav-list depth1">
              {filteredMenuItems.map((menu: HeaderMenuItem) => {
                const firstChild = menu.children?.[0];
                return (<li key={`${menu.id}-${menu.path}`}
                            className={cn("nav-item", activeMenuId === menu.id && "active")}>
                  <Link
                    to={firstChild ? firstChild.path.replace("[lang]", currentLang) : "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      openMenu();
                      return;
                      // handleMenuClick(e, firstChild.path, firstChild, menu);
                    }}
                  >
                    <span>{getMenuTitle(menu, currentLang)}</span>
                  </Link>
                  <ul className="depth2">
                    {menu.children?.map((submenu) => (<li className="depth2-item" key={`${submenu.id}-${submenu.path}`}>
                      <Link
                        to={submenu.path.replace("[lang]", currentLang) || "#"}
                        onClick={(e) => {
                          handleMenuClick(e, submenu.path, submenu, menu);
                        }}
                      >
                        <span>{getMenuTitle(submenu, currentLang)}</span>
                      </Link>
                    </li>))}
                  </ul>
                </li>);
              })}
            </ul>
          </nav>
          <div className={`language-select-wrap ${isFranchisePath ? "login" : ""}`} ref={languageSelectRef}>
            <div
              className={cn("language-select", isLanguageOpen && "active", isFranchisePath && isAuthenticated() && "disabled")}
              onClick={(e) => {
                e.stopPropagation();
                if (!isFranchisePath || !isAuthenticated()) {
                  setIsLanguageOpen(!isLanguageOpen);
                }
              }}
            >
              <div className="language-select-current">
                <span>{selectedLanguage}</span>
              </div>
              {!(isFranchisePath && isAuthenticated()) && (<div
                className={cn("language-select-options", isLanguageOpen && "active")}
                onClick={(e) => e.stopPropagation()}
              >
                {['KR', 'EN', 'CN', 'JP'].map((lang) => (<div
                  key={lang}
                  className="language-select-option"
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsLanguageOpen(false);
                    const langCode = lang === 'KR' ? 'ko' : lang === 'EN' ? 'en' : lang === 'CN' ? 'zh' : 'ja';
                    const currentPath = location.pathname;
                    const newPath = currentPath.replace(/^\/(ko|en|zh|ja)/, `/${langCode}`) || `/${langCode}`;
                    changeLanguage(langCode);

                    // 모바일이 아닐 때만 실행
                    if (!isMobileView) {
                      setHoveredMenu(null);
                      const headerInner = headerRef.current?.querySelector('.header-inner') as HTMLElement;
                      if (headerInner) {
                        headerInner.style.height = '';
                      }
                    }

                    navigate(newPath);
                  }}
                >
                  <span>{lang}</span>
                </div>))}
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>);
}

export default DashboardHeader;
