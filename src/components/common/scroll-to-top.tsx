import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로(pathname)가 변경될 때마다 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, [pathname]); // pathname이 변경될 때만 실행

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null을 반환
};

export default ScrollToTop;