import { FC, PropsWithChildren, useCallback } from "react";
import DefaultHeader from "@/components/layout/default/header";
import DefaultFooter from "@/components/layout/default/footer";
import '@/assets/scss/style.scss';
import {Outlet} from "react-router-dom";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

import { MenuItem } from "@/types/menu";
import QuickMenu from '../common/quickmenu';
import TopButton from '../common/topbtn';
import "@/assets/scss/style.scss";
import {useAuthStore} from "@/stores/auth-store.ts";

export const SampleLayout: FC<PropsWithChildren> = ({ children }) => {
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

  return (
    <div className="wrap">
      {/* 헤더 */}
      <DefaultHeader />
      
      {/* 메인 컨텐츠 */}
      <div className="main">
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
