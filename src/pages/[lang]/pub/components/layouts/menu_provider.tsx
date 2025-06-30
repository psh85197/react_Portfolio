import { createContext, useContext, useState, FC, PropsWithChildren, useEffect, useCallback } from "react";
import { CommonMenuItem } from "@/types/menu.ts"; // DashboardHeader에서 정의된 타입

interface MenuContextType {
  selectedMenuPath: CommonMenuItem[];
  setSelectedMenuPath: (menuItems: CommonMenuItem[]) => void;
  refreshContentKey: number; // 새로고침 키 추가
  triggerContentRefresh: () => void; // 새로고침 트리거 함수
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  // localStorage에서 초기 상태 복원
  const [selectedMenuPath, setSelectedMenuPathState] = useState<CommonMenuItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMenuPath = localStorage.getItem('selectedMenuPath');
      return savedMenuPath ? JSON.parse(savedMenuPath) : [];
    }
    return [];
  });

  const [refreshContentKey, setRefreshContentKey] = useState(0);

  // selectedMenuPath가 변경될 때 localStorage에 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedMenuPath', JSON.stringify(selectedMenuPath));
    }
  }, [selectedMenuPath]);

  // setSelectedMenuPath 함수 메모이제이션
  const setSelectedMenuPath = useCallback((menuItems: CommonMenuItem[]) => {
    setSelectedMenuPathState(menuItems);
  }, []);

  // triggerContentRefresh 함수 메모이제이션
  const triggerContentRefresh = useCallback(() => {

    setRefreshContentKey((prev) => prev + 1); // 키를 증가시켜 새로고침 유도
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <MenuContext.Provider
      value={{ selectedMenuPath, setSelectedMenuPath, refreshContentKey, triggerContentRefresh }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};