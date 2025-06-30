import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import DefaultHeader from "@/components/layout/default/header";
import DefaultFooter from "@/components/layout/default/footer";
import '@/assets/scss/style.scss';
import {Outlet, useParams} from "react-router-dom";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MenuItems } from "@/data/menu";
import { MenuItem } from "@/types/menu";
import { Home } from "lucide-react";
import { useLocation } from "react-router-dom";
import TopButton from '../common/topbtn';
import QuickMenu from '../common/quickmenu';
import "@/assets/scss/style.scss";
import {useAuthStore} from "@/stores/auth-store.ts";

export const SampleLayout: FC<PropsWithChildren> = ({ children }) => {
  const [activeMenus, setActiveMenus] = useState<MenuItem[]>([])
  const [isHome, setIsHome] = useState<boolean>(false)
  const location = useLocation(); // React Router의 useLocation 훅 사용
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const { token } = useAuthStore();

  // 재귀적 메뉴 탐색 함수를 useCallback으로 메모이제이션
  const findMenuPath = useCallback((
    menus: MenuItem[], 
    targetPath: string, 
    breadcrumb: MenuItem[] = []
  ): MenuItem[] | null => {
    // URL 패턴과 실제 경로를 비교하는 함수
    const isPathMatch = (pattern: string, path: string): boolean => {
      // [lang] 파라미터를 실제 경로의 언어 코드로 대체
      const normalizedPattern = pattern.replace(/\[lang\]/g, '[^/]+')
      // :id와 같은 동적 파라미터도 처리
      const finalPattern = normalizedPattern.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${finalPattern}$`)
      return regex.test(path)
    }
  
    for (const menu of menus) {
      if (menu.path && isPathMatch(menu.path, targetPath)) {
        return [...breadcrumb, menu]
      }
      
      if (menu.children?.length) {
        const found = findMenuPath(
          menu.children, 
          targetPath, 
          [...breadcrumb, menu]
        )
        if (found) return found
      }
    }
    return null
  }, [])
  useEffect(() => {
    const fetchBreadcrumb = () => {
      const currPathname = location.pathname
      if (currPathname === '/home') {
        setIsHome(true)
        return
      }
      
      // MenuItems를 MenuItem[] 타입으로 캐스팅
      const menuPath = findMenuPath(MenuItems as MenuItem[], currPathname)

      if (menuPath) {
        setActiveMenus(menuPath)
        setIsHome(false)
      } else {
        // 경로를 찾지 못한 경우 기본값 설정
        setActiveMenus([])
        setIsHome(false)
      }
    }

    fetchBreadcrumb()
  }, [location, findMenuPath]) 

  return (
    <div className="wrap">
      {/* 헤더 */}
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
             <BreadcrumbLink href="/home" className="flex items-center text-zinc-500">
               <Home size={15} className="mr-1" />
            </BreadcrumbLink>
          </BreadcrumbItem>
             {activeMenus.map((menu, index) => (
               !menu.title.includes("Footer") &&(
                  <div key={menu.path} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    {menu.type === 'link' && index !== activeMenus.length - 1 ? (
                      <BreadcrumbLink href={menu.path?.replace("[lang]",currentLang)} className="text-zinc-500">
                          {menu.title}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className={index === activeMenus.length - 1 ? "text-zinc-700 font-bold" : ""}>
                          {menu.title}
                        </BreadcrumbPage>
                    )}
                    </BreadcrumbItem>
                  </div>
               )
            ))}
           </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      {/* 메인 컨텐츠 */}
      <div className="content">
      {children}
          <TooltipProvider>
            <Outlet />
          </TooltipProvider>
      </div>
      {/* 푸터 */}
      <DefaultFooter />
      {/* 가맹점 고객 서비스 퀵 메뉴 버튼 */}
      {token &&
          <QuickMenu />
        }
      {/* 탑버튼 */}
      <TopButton />
    </div>
  );
};

export default SampleLayout;
