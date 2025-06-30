import { FC, useEffect, useState } from 'react';
import "@/assets/scss/style.scss";

const TopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300); // 300px 이상 스크롤되면 버튼 표시
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      className="top-btn"
      onClick={scrollToTop}
      aria-label="페이지 상단으로 이동"
    >
      <i className="ico-top-btn"><span className="hide-txt">탑버튼 이미지</span></i>
    </button>
  );
};

export default TopButton;
