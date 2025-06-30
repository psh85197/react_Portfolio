import * as React from "react"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils"

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 전역 상태 추가 (모든 컴포넌트에서 접근 가능)
let isClickScrolling = false;

interface TabsProps {
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  className, 
  onValueChange,
  children 
}) => {
  const [activeTab, setActiveTab] = React.useState<string>(defaultValue || '');

  const handleTabChange = React.useCallback((value: string) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value);
    }
  }, [onValueChange]);

  const context = React.useMemo(() => ({
    value: activeTab,
    onValueChange: handleTabChange
  }), [activeTab, handleTabChange]);

  return (
    <TabsContext.Provider value={context}>
      <div className={cn("tabs", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: '',
  onValueChange: () => {}
});

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  const [padding, setPadding] = React.useState('2.4rem 0');
  
  React.useEffect(() => {
    // 초기 화면 크기에 따라 패딩 설정
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setPadding('1.2rem 0');
      } else {
        setPadding('2.4rem 0');
      }
    };
    
    // 초기 설정
    handleResize();
    
    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      className={cn("tab-head tab-sticky", className)}
      style={{ padding }}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, className, children }) => {
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 클릭 스크롤 중임을 표시
    isClickScrolling = true;
    
    // 상태 업데이트
    onValueChange(value);
    
    // DOM에 직접 활성 상태 적용
    const tabsContainer = document.querySelector('.tab-head');
    if (tabsContainer) {
      // 모든 탭 비활성화
      const allTabs = tabsContainer.querySelectorAll('.tab-head-item');
      allTabs.forEach(tab => {
        tab.setAttribute('data-state', 'inactive');
      });
      
      // 클릭한 탭 활성화
      const clickedTab = tabsContainer.querySelector(`.tab-head-item[data-value="${value}"]`);
      if (clickedTab) {
        clickedTab.setAttribute('data-state', 'active');
      }

      // 모바일에서 탭 헤드 스크롤
      if (window.innerWidth <= 1023) {
        const tabList = e.currentTarget.closest('.tab-head');
        if (tabList) {
          const tabListRect = tabList.getBoundingClientRect();
          const tabRect = e.currentTarget.getBoundingClientRect();
          const scrollLeft = tabList.scrollLeft + (tabRect.left - tabListRect.left) - (tabListRect.width / 2) + (tabRect.width / 2);
          
          tabList.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  
    // 클릭 시 해당 콘텐츠로 스크롤
    setTimeout(() => {
      const targetElement = document.querySelector(`div[data-value="${value}"]`);
      
      if (targetElement) {
        // 화면 크기에 따라 오프셋 값 조정
        const offset = window.innerWidth <= 1023 ? 150 : 240;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
  
        // 스크롤 애니메이션이 완료된 후 상태 복원
        setTimeout(() => {
          isClickScrolling = false;
        }, 500); // 스크롤 애니메이션 완료 시간 고려
      }
    }, 100);
  };

  return (
    <button 
      type="button"
      className={cn(
        "tab-head-item",
        className
      )}
      onClick={handleClick}
      data-state={isActive ? "active" : "inactive"}
      data-value={value}
    >
      {children}
    </button>
  );
};

// 탭 앵커 기능 및 gsap 기능 추가
interface TabsContentProps { className?: string; children: React.ReactNode; }
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, children }, ref) => {
      // 내부 ref 대신 전달받은 ref 사용
      React.useLayoutEffect(() => {
        // 약간의 지연 후 실행
         const timer = setTimeout(() => {
           // 모바일 전용 스크롤 트리거 설정 함수
           const setupMobileScrollTriggers = () => {
            if (ref && 'current' in ref && ref.current) {
              const processContents = ref.current.querySelectorAll('[data-value]');
              
              // 탭 활성화 함수 (중복 코드 제거)
              const updateActiveTab = (self: any) => {                
                const processContent = self.trigger.closest('[data-value]');
                const dataValue = processContent?.getAttribute('data-value');
                const tabHeads = ref.current?.closest('.tab-wrap')?.querySelector(`.tab-head [data-value="${dataValue}"]`);
                
                if (tabHeads) {
                  // 클릭 스크롤 중이 아닐 때만 실행
                  if (isClickScrolling) return;
                
                  // 모든 탭 비활성화
                  const allTabs = ref.current?.closest('.tab-wrap')?.querySelectorAll('.tab-head-item');
                  allTabs?.forEach(tab => {
                    tab.setAttribute('data-state', 'inactive');
                  });
                  
                  // 활성화된 탭 업데이트
                  tabHeads.setAttribute('data-state', 'active');
                }
              };
              
              processContents.forEach((content) => {
                ScrollTrigger.create({
                  trigger: content,
                  start: "top-=50 top+=140", 
                  end: `bottom top+=140`,
                  onEnter: updateActiveTab,
                  onEnterBack: updateActiveTab,
                });
              });
            }  
           };
           
           // PC 전용 스크롤 트리거 설정 함수
           const setupPcScrollTriggers = () => {
             if (ref && 'current' in ref && ref.current) {
               const processTits = ref.current.querySelectorAll('[data-title]');
               
               // 탭 활성화 함수 (중복 코드 제거)
               const updateActiveTab = (self: any) => {
                const processContent = self.trigger.closest('[data-value]');
                const dataValue = processContent?.getAttribute('data-value');
                const tabHeads = ref.current?.closest('.tab-wrap')?.querySelector(`.tab-head [data-value="${dataValue}"]`);
              
                const element = self.trigger?.closest('[data-value]') as HTMLElement | null;
                if (element) {
                  gsap.to(element, {
                    opacity: 1,
                    duration: 0.3
                  });
                }

                // 클릭 스크롤 중이 아닐 때만 실행
                if (isClickScrolling) return;
                if (tabHeads) {
                  // 모든 탭 비활성화
                  const allTabs = ref.current?.closest('.tab-wrap')?.querySelectorAll('.tab-head-item');
                  allTabs?.forEach(tab => {
                    tab.setAttribute('data-state', 'inactive');
                  });
                  
                  // 활성화된 탭 업데이트
                  tabHeads.setAttribute('data-state', 'active');
                }
               };
               
               processTits.forEach((content, index) => {
                const processContents = content.closest('[data-value]');
                
                // null check
                if (!processContents) return;
            
                const isLastElement = index === processTits.length - 1;
            
                ScrollTrigger.create({
                    trigger: processContents,
                    start: "top-=160 top+=88", 
                    end: `bottom-=200 top`,
                    onEnter: updateActiveTab,
                    onLeave: isLastElement ? undefined : (self) => {                    
                        const element = self.trigger?.closest('[data-value]') as HTMLElement | null;
                        if (element) {
                            gsap.to(element, {
                                opacity: 0,
                                duration: 0.3
                            });
                        }
                    },
                    onEnterBack: updateActiveTab,
                });
            });
             }
           };
           
           // 메인 스크롤 트리거 업데이트 함수
           const updateScrollTriggers = () => {
             // 기존 트리거 제거
             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
             
             // 화면 크기에 따라 PC 또는 모바일 기능 적용
             if (window.innerWidth <= 1023) {
               // 모바일 기능 실행
               setupMobileScrollTriggers();
               return;
             }
             
             // PC 전용 기능 실행
             setupPcScrollTriggers();
           };
           
           updateScrollTriggers();
           
           // 리사이즈 이벤트 리스너 추가
           window.addEventListener('resize', updateScrollTriggers);
           
           // 정리 함수
           return () => {
             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
             window.removeEventListener('resize', updateScrollTriggers);
           };
         }, 500); // 렌더링이 완료될 시간을 충분히 줍니다
         
         return () => clearTimeout(timer);
       }, []);
      return (
        <div ref={ref} className={cn("tabs-content", className)}>
          {children}
        </div>
      );
    }
  );

export { Tabs, TabsList, TabsTrigger, TabsContent }