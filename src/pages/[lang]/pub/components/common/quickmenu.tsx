import { FC, useEffect, useState, useRef } from 'react';
import {Link, useNavigate} from "react-router-dom";
import gsap from 'gsap';
import "@/assets/scss/style.scss";
import {logoutFranchise} from "@/api/services/auth.ts";
import { useAuthStore } from '@/stores/auth-store.ts';
// import {TranslationDTO} from "@/types/translation.ts";

const QuickMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAuth, isAuthenticated, token } = useAuthStore();
  const navigate = useNavigate();
  // const { lang } = useParams<{ lang: keyof TranslationDTO }>();

  const mbrName = localStorage.getItem("mbrName");
  const userId = localStorage.getItem("userId");
  const rptAuthFlag = localStorage.getItem("rptAuthFlag");

  const quickMenuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quickMenuContentRef.current) return;
    const timeline = gsap.timeline();

    if (isOpen) {
      openMenuAnimation(timeline);
    } else {
      closeMenuAnimation(timeline);
    }
  }, [isOpen]);

  const openMenuAnimation = (timeline: gsap.core.Timeline) => {
    timeline.to(quickMenuContentRef.current, {
      visibility: 'visible',
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.1');
  };

  const closeMenuAnimation = (timeline: gsap.core.Timeline) => {
    timeline.to(quickMenuContentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        if (quickMenuContentRef.current) {
          quickMenuContentRef.current.style.visibility = 'hidden';
        }
      }
    });
  };

  const toggleQuickMenu = () => { setIsOpen(prev => !prev); };

  const handleLogout = () => {
    const isFranchisePath = window.location.pathname.includes("franchise/notice") || window.location.pathname.includes("franchise/supplies") || window.location.pathname.includes("franchise/manual");

    if(token != null && userId != null && isAuthenticated()) {
      logoutFranchise({userId,token });
    }

    clearAuth();

    if(isFranchisePath) {
      navigate("/");
    } else {
      window.location.reload()
    }
  };

  return (
    <div className={`quickmenu-wrap ${isOpen ? 'active' : ''}`}>
      <div className="quickmenu-content" ref={quickMenuContentRef}>
        <p className="quickmenu-tit">가맹점 고객 서비스</p>
        <p className="quickmenu-desc"><em>{mbrName}</em>님<br />
          원하시는 메뉴를 선택해 주세요.</p>
        <ul className="quickmenu-list">
          <li>
            <Link to="https://pf.kakao.com/_Gfxasn" target='_blank'>
              카카오 채널 바로가기
            </Link>
          </li>
          {rptAuthFlag == "Y" && (
            <li>
              <Link to="https://office.cuberefund.com" target='_blank'>
                BI Report 바로가기
              </Link>
            </li>
          )}
        </ul>
        <p className="tel">
          <i className="ico small ico-tel" role="img" aria-label="전화"></i>
          대표 전화 02-6925-2033</p>
        <button className="logout-btn" type='button' onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <button
        className="quickmenu"
        aria-label="가맹점 고객 서비스 퀵 메뉴"
        type="button"
        onClick={toggleQuickMenu}
      >
      </button>
    </div>
  );
};

export default QuickMenu;