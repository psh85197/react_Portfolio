import React, { useEffect, useRef, useState } from "react";
import mainVisual from "@/assets/images/contents/main/main_visual_pc.png";
import mainVisualMo from "@/assets/images/contents/main/main_visual_mo.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import main_rolling_01 from "@/assets/images/contents/main/main_rolling_01.png";
import main_rolling_02 from "@/assets/images/contents/main/main_rolling_02.png";
import main_rolling_03 from "@/assets/images/contents/main/main_rolling_03.png";
import main_rolling_04 from "@/assets/images/contents/main/main_rolling_04.png";
import main_rolling_05 from "@/assets/images/contents/main/main_rolling_05.png";
import main_rolling_06 from "@/assets/images/contents/main/main_rolling_06.png";
import main_rolling_07 from "@/assets/images/contents/main/main_rolling_07.png";
import main_rolling_08 from "@/assets/images/contents/main/main_rolling_08.png";
import main_rolling_09 from "@/assets/images/contents/main/main_rolling_09.png";
import main_rolling_10 from "@/assets/images/contents/main/main_rolling_10.png";
import main_rolling_11 from "@/assets/images/contents/main/main_rolling_11.png";
import main_rolling_12 from "@/assets/images/contents/main/main_rolling_12.png";
import main_rolling_13 from "@/assets/images/contents/main/main_rolling_13.png";
import main_rolling_14 from "@/assets/images/contents/main/main_rolling_14.png";
import main_rolling_15 from "@/assets/images/contents/main/main_rolling_15.png";
import main_rolling_16 from "@/assets/images/contents/main/main_rolling_16.png";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
import qr_img01 from "@/assets/images/dump/qr_ail.png";
import qr_img02 from "@/assets/images/dump/qr_cube.png";
import ico_bulb from "@/assets/images/icon/ico_bulb.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable"; 
import { CustomEase } from "gsap/CustomEase";
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";

import { useAuthStore } from "@/stores/auth-store.ts";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { useTranslation } from "react-i18next";

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// localStorage 키 (이 페이지의 모달에 대한 고유한 키)
const MAIN_HOME_MODAL_DONT_SHOW_KEY = "mainHomePageRenewalModalDontShowDate";

const MainHomePage = () => {
  const mainWrapRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const rollingRef = useRef(null);
  const proxyRef = useRef(document.createElement("div")); // GSAP에서 사용 필요로,,, 추가
  const animationRef = useRef(null);
  const statusBtnRef = useRef(null); // 버튼을 직접 참조하기 위한 ref
  const [openModal, setOpenModal] = useState(false);

  // 체크박스 상태 ('terms1' -> 'dontShowToday'로 변경)
  const [checkedState, setCheckedState] = useState({ dontShowToday: false, });
  const dontShowTodayRef = useRef(checkedState.dontShowToday); // ref 추가

  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { setLoginModalOpen } = useLoadingStore();

  gsap.registerPlugin(ScrollTrigger, CustomEase, Draggable); // Draggable 등록

  // checkedState가 변경될 때마다 ref도 업데이트
  useEffect(() => {
    dontShowTodayRef.current = checkedState.dontShowToday;
  }, [checkedState.dontShowToday]);

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (isChecked) => {
    const newCheckedValue = !!isChecked; // boolean으로 확실히 변환
    setCheckedState({ dontShowToday: newCheckedValue });
    // dontShowTodayRef.current = newCheckedValue; // useEffect에서 이미 처리
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    if (dontShowTodayRef.current) {
      // ref 값을 사용하여 최신 상태 반영
      localStorage.setItem(MAIN_HOME_MODAL_DONT_SHOW_KEY, getTodayDateString());
    }


    setOpenModal(false);

     // pc , mobile 공통 가맹점 고객 서비스 퀵메뉴 버튼
     const quickmenuWrap = document.querySelector(".quickmenu-wrap");
     if (!quickmenuWrap) return;
     quickmenuWrap.style.display = "block";
    // 필요시 체크박스 상태 초기화
    // setCheckedState({ dontShowToday: false });
  };

  // 인트로 애니메이션 함수
  const intro = () => {
    if (!mainWrapRef.current) return () => {};
    document.body.classList.add("intro");

    const header = document.querySelector('.header');
    
    // 메인에 다시 돌아왔을 때, 헤더에 걸린 클래스들 제거
    if (header) {
      // 약간의 지연 후 실행
      setTimeout(() => {
        header.className = header.className.replace(/\bactive\b/g, '').trim();
      }, 10);
    }

    const scrollInterval = setInterval(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 1);
    setTimeout(() => {
      clearInterval(scrollInterval);
    }, 2000);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.className = "";

        // "오늘 하루 보지 않기" 로직 확인 후 모달 표시
        const storedDate = localStorage.getItem(MAIN_HOME_MODAL_DONT_SHOW_KEY);
        const today = getTodayDateString();
        if (mainWrapRef.current) {
          cardScroll();
          parallaxScrolling();
        }

        if (storedDate !== today) {
          const shouldShowModal = true; // 모달을 표시할지 여부
          setOpenModal(shouldShowModal);

          // pc , mobile 공통 가맹점 고객 서비스 퀵메뉴 버튼
          const quickmenuWrap = document.querySelector(".quickmenu-wrap");
          if (!quickmenuWrap) return;
          quickmenuWrap.style.display = shouldShowModal ? "none" : "block";
        }
      },
    });

    const mainVisualEl = mainWrapRef.current.querySelector(".main-visual-img"); // .main-visual-img 사용
    const mainVisualPcImg = mainWrapRef.current.querySelector( ".main-visual-img .pc-img");
    const mainVisualMoImg = mainWrapRef.current.querySelector( ".main-visual-img .mo-img");
    const rollingBox = mainWrapRef.current.querySelector(".rolling-bx");
    const mainTitle = mainWrapRef.current.querySelector(".main-title");
    const scrollIcon = mainWrapRef.current.querySelector(".scroll-icon");

  

    if (
      !mainVisualEl ||
      !mainVisualPcImg ||
      !mainVisualMoImg ||
      !rollingBox ||
      !mainTitle ||
      !scrollIcon
    ) {
      console.warn("One or more elements for intro animation not found.");
      tl.kill();
      document.body.classList.remove("intro");
      if (mainWrapRef.current) {
        cardScroll();
        parallaxScrolling();
      }
      return () => {};
    }

    const isMobile = window.innerWidth < 1024;

    if (!isMobile) {
      tl.to(
        mainVisualEl,
        {
          top: "10%",
          duration: 1,
          clipPath: "inset(25% 14% 20.1% 14.1% round 20px)",
          delay: 0.2,
          ease: "power3.in",
        },
        "first"
      )
        .to(
          mainVisualPcImg,
          { top: "5%", duration: 1, ease: "power3.in" },
          "first"
        )
        .to(
          mainTitle,
          { color: "#ffffff", duration: 0.4, ease: "none" },
          "two-=0.6"
        )
        .to(
          mainVisualEl,
          {
            top: "0%",
            duration: 1,
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "power3.out",
          },
          "two-=0.05"
        )
        .to(
          mainVisualPcImg,
          { top: "0%", scale: 1, duration: 1, ease: "power3.out" },
          "two-=0.05"
        )
        .to(
          mainTitle,
          {
            bottom: "16.1rem",
            duration: 1,
            fontSize: "6.4rem",
            ease: "power3.out",
          },
          "two-=0.05"
        )
        .to(
          scrollIcon,
          { opacity: "1", duration: 1, ease: "power3.out" },
          "two-=0.05"
        )
        .to(rollingBox, { opacity: 1, duration: 0.5, ease: "none" }, "two");
    } else {
      tl.to(
        mainVisualEl,
        {
          top: "10%",
          duration: 1,
          clipPath: "inset(10% 8% 10.1% 8.1% round 20px)",
          delay: 0.2,
          ease: "power3.in",
        },
        "first"
      )
        .to(
          mainVisualMoImg,
          { top: "5%", duration: 1, ease: "power3.in" },
          "first"
        )
        .to(
          mainTitle,
          {
            color: "#ffffff",
            bottom: "20.1rem",
            duration: 0.8,
            delay: 0.4,
            ease: "power3.in",
          },
          "first"
        )
        .to(
          mainVisualEl,
          {
            top: "0%",
            duration: 1,
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "power3.out",
          },
          "two-=0.05"
        )
        .to(
          mainVisualMoImg,
          { top: 0, scale: 1, duration: 1, ease: "power3.out" },
          "two-=0.05"
        )
        .to(
          mainTitle,
          { bottom: "6.4rem", duration: 1, ease: "power3.out" },
          "two-=0.05"
        )
        .to(rollingBox, { opacity: 1, duration: 0.5, ease: "none" }, "two");
    }

    



    return () => {
      tl.kill();
      document.body.classList.remove("intro");
    };
  };

  const cardScroll = () => {
    if (!mainWrapRef.current) return () => {};
    const contentStep01 =
      mainWrapRef.current.querySelector(".content-grid-top");
    if (!contentStep01) return () => {};
    const items01 = contentStep01.querySelectorAll(".main-content-item");
    const contentStep04 = mainWrapRef.current.querySelector(
      ".content-grid-bottom"
    );
    if (!contentStep04) return () => {};
    const items04 = contentStep04.querySelectorAll(".main-content-item");
    const contentStep02 = mainWrapRef.current.querySelector(
      ".main-content-step02"
    );
    if (!contentStep02) return () => {};
    const items02 = contentStep02.querySelectorAll(".link-bx a, .link-bx button");
    const itemsText = contentStep02.querySelectorAll(".main-info-bx p");
    const contentStep03 = mainWrapRef.current.querySelector(
      ".main-content-step03"
    );
    if (!contentStep03) return () => {};
    const items03 = contentStep03.querySelectorAll(".main-content-item");
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) {
      gsap.fromTo(
        items01,
        { top: "10rem", opacity: 0 },
        {
          top: "0",
          opacity: 1,
          ease: "power4.out",
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentStep01,
            start: "top center+=400",
            toggleActions: "play stop play reverse",
          },
        }
      );
      gsap.fromTo(
        items04,
        { top: "10rem", opacity: 0 },
        {
          top: "0",
          opacity: 1,
          ease: "power4.out",
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentStep04,
            start: "top center+=400",
            toggleActions: "play stop play reverse",
          },
        }
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentStep02,
          start: "top center+=300",
          toggleActions: "play stop play reverse",
        },
      });
      tl.fromTo(
        items02,
        { top: "10rem", opacity: 0 },
        { top: "0", opacity: 1, ease: "power4.out", duration: 1 },
        "text+=0.2"
      ).fromTo(
        itemsText,
        { top: "10rem", opacity: 0 },
        { top: "0", opacity: 1, ease: "power4.out", duration: 1 },
        "text"
      );
      gsap.fromTo(
        items03,
        { top: "10rem", opacity: 0 },
        {
          top: "0",
          opacity: 1,
          ease: "power4.out",
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentStep03,
            start: "top center+=500",
            toggleActions: "play stop play reverse",
          },
        }
      );
    } else {
      items01.forEach((item) => {
        gsap.fromTo(
          item,
          { top: "5rem", opacity: 0 },
          {
            top: "0",
            opacity: 1,
            ease: "power4.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top center+=400",
              toggleActions: "play stop play reverse",
            },
          }
        );
      });
      items04.forEach((item) => {
        gsap.fromTo(
          item,
          { top: "5rem", opacity: 0 },
          {
            top: "0",
            opacity: 1,
            ease: "power4.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top center+=400",
              toggleActions: "play stop play reverse",
            },
          }
        );
      });
      gsap.fromTo(
        items02,
        { top: "10rem", opacity: 0 },
        {
          top: "0",
          opacity: 1,
          ease: "power4.out",
          duration: 1,
          scrollTrigger: {
            trigger: items02,
            start: "top center+=500",
            toggleActions: "play stop play reverse",
          },
        }
      );
      gsap.fromTo(
        itemsText,
        { top: "10rem", opacity: 0 },
        {
          top: "0",
          opacity: 1,
          ease: "power4.out",
          duration: 1,
          scrollTrigger: {
            trigger: itemsText,
            start: "top center+=500",
            toggleActions: "play stop play reverse",
          },
        }
      );
      items03.forEach((item) => {
        gsap.fromTo(
          item,
          { top: "5rem", opacity: 0 },
          {
            top: "0",
            opacity: 1,
            ease: "power4.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top center+=400",
              toggleActions: "play stop play reverse",
            },
          }
        );
      });
    }
    return () => {
      /* ScrollTrigger 정리 로직 (선택적) */
    };
  };

  const parallaxScrolling = () => {
    if (!mainWrapRef.current) return () => {};
    const scrollElement = mainWrapRef.current.querySelector("[data-scroll]");
    if (!scrollElement) return () => {};
    const isMobile = window.innerWidth < 1024;
    const fromPosition = isMobile ? "100% -250px" : "0 -200px";
    const toPosition = isMobile ? "100% 0" : "0 0";
    gsap.fromTo(
      scrollElement,
      { backgroundPosition: fromPosition },
      {
        backgroundPosition: toPosition,
        scrollTrigger: {
          trigger: scrollElement,
          start: isMobile ? "top bottom" : "top-=400px bottom",
          end: isMobile ? "bottom+=1000px bottom" : "bottom+=1000px bottom",
          scrub: true,
        },
      }
    );
    return () => {
      /* ScrollTrigger 정리 로직 (선택적) */
    };
  };

  useEffect(() => {
    // Draggable 로직이 복잡하고, 현재 "오늘 하루 보지 않기"와 직접적 연관이 없어
    // 일단 setupRolling 함수 호출은 유지하되, 내부 로직은 원본을 따릅니다.
    // 만약 Draggable 관련하여 문제가 있다면 별도 디버깅이 필요합니다.
    const setupRolling = async () => {
      if (!rollingRef.current) return;

      // 기존에 작동하던 타임라인 제거
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }

      const wrapper = rollingRef.current;
      const boxes = wrapper.querySelector(".rolling-boxes");
      if (!boxes) return;

      // 기존 클론 요소 제거
      boxes.querySelectorAll('.clone').forEach(clone => { clone.remove();});

      const items = boxes.querySelectorAll(".item");
      if (items.length === 0) return;

      const isMobile = window.innerWidth <= 1024;
      const boxHeight = isMobile ? 24 : 40;
      const gap = isMobile ? 32 : 104;

      // 이미지 크기 설정
      await Promise.all(
        Array.from(items).map((item) => {
          const img = item.querySelector("img");
          if (!img) return Promise.resolve(); // img가 없을 경우 처리
          img.style.height = boxHeight + "px";
          img.style.width = "auto";
          return img.complete
            ? Promise.resolve(img)
            : new Promise((resolve) => {
                img.onload = () => resolve(img);
                img.onerror = () => resolve(img); // 에러 시에도 resolve하여 중단 방지
              });
        })
      );

      
      // 아이템 위치 및 크기 계산
      const boxWidths = [];
      let totalWidth = 0;

      // 기존 스타일 제거
      gsap.set(items, { clearProps: "all" });

      // 새로운 스타일 적용
      items.forEach((item, i) => {
        const img = item.querySelector("img");
        let width = 100; // 기본 너비

        // 이미지가 있을 때 계산산
        if (img && img.complete && img.naturalWidth && img.naturalHeight) {
          const ratio = img.naturalHeight / boxHeight;
          width = img.naturalWidth / ratio;
        }

        gsap.set(item, {
          x: totalWidth,
          width: width,
          height: boxHeight,
          margin: 0,
          marginRight: gap + "px",
          padding: 0
        });

        boxWidths.push(width);
        totalWidth += width + gap;
      });

      // 전체 영역 높이 설정
      gsap.set(wrapper, { height: boxHeight });

      // 클론 생성
      const originalItems = Array.from(items);
      originalItems.forEach((item, index) => {
        const clone = item.cloneNode(true);
        clone.classList.add("clone");
        boxes.appendChild(clone);
        const clonePos = totalWidth + (index > 0 ? boxWidths.slice(0, index).reduce((a, b) => a + b + gap, 0) : 0);
          
        gsap.set(clone, { 
          x: clonePos,
          width: boxWidths[index],
          height: boxHeight,
          margin: 0,
          marginRight: gap + "px",
          padding: 0
        });
      });

      if (totalWidth === 0) {
        console.warn("이미지가 로드되지 않았습니다.");
        return;
      }

      // 새로운 타임라인 생성
      const allBoxItems = boxes.querySelectorAll('.item, .clone');
      const animElements = gsap.utils.toArray(allBoxItems); 
      
      // 타임라인 생성
      const tl = gsap.timeline({
        repeat: -1,
        paused: !isPlaying,
        onUpdate: function() {
          // 타임라인 업데이트 시 모든 요소가 싱크되도록
          if (this.isActive()) {animElements.forEach(el => { el._gsap.x = gsap.getProperty(el, "x"); });}
        }
      });

      // 애니메이션 생성
      tl.to(animElements, {
        x: `-=${totalWidth}`,
        duration: 30,
        ease: "none",
        // onComplete 제거 또는 수정: GSAP 3에서 onComplete는 타임라인의 끝에서 한 번만 호출됨.
        // 무한 반복을 위해서는 x 값을 직접 조정하거나 다른 접근 방식 필요.
        // 가장 간단한 방법은 x 값을 매우 크게 하여 시각적으로 반복되는 것처럼 보이게 하는 것,
        // 또는 onRepeat 콜백을 사용하여 위치를 재설정하는 것.
        // 여기서는 x 값을 조정하는 방식을 유지하되, onComplete는 제거.
      });

      // tl로 타임라인 네이밍 수정정
      animationRef.current = tl;
      
      // 드래그 기능 구현
      let pressTimer;
      
      if (wrapper) {
        // 기존 드래그 인스턴스 삭제
        if (Draggable.get(proxyRef.current)) { Draggable.get(proxyRef.current).kill();}
        
        // 새 드래그 인스턴스 생성
        Draggable.create(proxyRef.current, {
          trigger: wrapper,
          type: "x",
          inertia: true,
          onPress: function() {
            if (isPlaying) {
              pressTimer = setTimeout(() => {
                if (animationRef.current) {
                  animationRef.current.pause();
                }
              }, 200);
            }
          },
          onRelease: function() {
            if (isPlaying) {
              clearTimeout(pressTimer);
              if (!this.isDragging && animationRef.current) {
                animationRef.current.play();
              }
            }
          },
          onDragStart: function() {
            clearTimeout(pressTimer);
            // 드래그 시 애니메이션 일시정지
            if (animationRef.current) {
              animationRef.current.pause();
            }
            
            // 멈춰있는 상태에서 드래그하면 실행 상태로 변경경
            setIsPlaying(true);
          },
          onDragEnd: function() {
            // 드래그 완료 후 애니메이션 재생 (상태가 이미 true로 변경되어 있음)
            if (animationRef.current) {
              animationRef.current.play();
            }
          },
          onDrag: function() {
            if (!animationRef.current || totalWidth === 0) return;
            const currentProgress = animationRef.current.progress();
            const dragValue = -this.deltaX / totalWidth;
            let newProgress = currentProgress + dragValue;
            newProgress = ((newProgress % 1) + 1) % 1; // 정규화
            animationRef.current.progress(newProgress);
          }
        });
      }
      
      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    };
    
    // 스크립트 실행 앞 짠시 대기
    const timer = setTimeout(() => {
      setupRolling();
    }, 500);
    
    // 클린업 함수 반환
    return () => {
      clearTimeout(timer);
    };
  }, []); // 마운트 시 한번만 실행

  // isPlaying 상태 변경 시 애니메이션 제어
  useEffect(() => {    
    if (animationRef.current) {
      if (isPlaying) {
        // 모든 원본과 클론에 동일한 아니메이션 상태 적용
        animationRef.current.play();
        
        // 모든 요소의 애니메이션 상태 동기화
        if (rollingRef.current) {
          const items = rollingRef.current.querySelectorAll('.item, .clone');
          items.forEach(item => {
            // 현재 타임라인 진행도에 맞게 각 요소의 속성 설정
            gsap.set(item, { opacity: 1 });
          });
          
          // 버튼 상태 갱신
          if (statusBtnRef.current) {
            statusBtnRef.current.classList.remove('stop');
          }
        }
      } else {
        // 정지 시 모든 애니메이션 일시정지
        animationRef.current.pause();
        
        // 애니메이션 멈추고 상태 동기화
        if (rollingRef.current) {
          const items = rollingRef.current.querySelectorAll('.item, .clone');
          items.forEach(item => {
            // 현재 위치 그대로 유지
            const currentX = gsap.getProperty(item, "x");
            gsap.set(item, { x: currentX });
          });
          
          // 버튼 상태 갱신
          if (statusBtnRef.current) {
            statusBtnRef.current.classList.add('stop');
          }
        }
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const introCleanup = intro();
    // cardScroll, parallaxScrolling은 intro의 onComplete에서 호출되므로,
    // 이들의 클린업은 introCleanup에 포함되지 않을 수 있음.
    // useEffect의 클린업에서 ScrollTrigger.getAll()로 정리하는 것이 안전.
    return () => {
      if (introCleanup) introCleanup();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleProtectedLinkClick = (path) => (event) => {
    if (!isAuthenticated()) {
      event.preventDefault();
      setLoginModalOpen(true, () => navigate(path));
    }
  };
  const [openModals, setOpenModals] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
  });

  const [openLoginModal, setOpenLoginModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
  });
  const handleLoginModalClose = (modalId) => {
    setOpenLoginModal((prev) => ({
      ...prev,
      [modalId]: false,
    }));
  };
  const handleModalOpen = (modalId) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalId]: true,
    }));
  };
  const handleLoginModalOpen = (modalId) => {
    setOpenLoginModal(prev => ({
      ...prev,
      [modalId]: true
    }));
  };

  return (
    <div className="main-wrap" ref={mainWrapRef}>
      <section className="main-visual">
        <div className="main-visual-content">
          <div className="main-visual-img">
            <img
              className="pc-img"
              src={mainVisual}
              alt={t("main.altMainVisual") || "롯데백화점 가맹점 고객 서비스"}
            />
            <img
              className="mo-img"
              src={mainVisualMo}
              alt={t("main.altMainVisual") || "롯데백화점 가맹점 고객 서비스"}
            />
          </div>
          <div className="main-title">
            <p>{t("main.slogan1")}</p>
            <p>{t("main.slogan2")}</p>
          </div>
          <div className="scroll-icon">
            <span>scroll</span>
          </div>
        </div>
      </section>

      <section className="main-visual-rolling-wrap">
        <div className="main-visual-rolling">
          <div className="inner type03">
            <div className="rolling-bx" ref={rollingRef}>
              <div className="rolling-wrapper">
                <div className="rolling-boxes" style={{ display: "flex", alignItems: "center"}} >
                  <div className="item">
                    <a
                      href="https://global.lotteshopping.com/eng/main"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_01} alt="롯데 백화점" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://company.lottemart.com/en/main.asp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_02} alt="롯데마트" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://company.himart.co.kr/en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_03} alt="롯데하이마트" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://adventure.lotteworld.com/eng/main/index.do"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_04} alt="롯데 월드" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.lottehotel.com/global/en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_05} alt="롯데 호텔 앤 리조트" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.lottegfr.co.kr/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_06} alt="grf" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://samanthakorea.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_07} alt="stl" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.dundun-ddm.com/en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_08} alt="던던" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.lotteinnovate.com/en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_09} alt="롯데이노베이트" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.planetpayment.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_10} alt="플래닛" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://usa.visa.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_11} alt="롤링 이미지 11" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.mastercard.com/global/en.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_12} alt="롤링 이미지 12" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.global.jcb/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_13} alt="롤링 이미지 13" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://global.alipay.com/platform/site/ihome"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_14} alt="롤링 이미지 14" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://www.unionpayintl.com/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_15} alt="롤링 이미지 15" />
                    </a>
                  </div>
                  <div className="item">
                    <a
                      href="https://pay.weixin.qq.com/index.php/public/wechatpay_en/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={main_rolling_16} alt="롤링 이미지 16" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="status-btn-bx">
                <Button
                  ref={statusBtnRef}
                  className={`btn-status ${!isPlaying ? "stop" : ""}`}
                  onClick={() => {
                    if (animationRef.current) {
                      if (isPlaying) {
                        // 정지
                        animationRef.current.pause();
                      } else {
                        // 재생
                        animationRef.current.play();
                      }
                      setIsPlaying(!isPlaying);
                    }
                  }}
                >
                  <span className="hide-txt">시작, 멈춤 버튼</span>
                </Button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-content-step01">
        <div className="inner type03">
          <div className="main-content-list">
            <div className="content-grid-top">
              <div className="main-content-item img-bx">
                <div className="main-content-item-txt-bx">
                  <strong>{t("main.taxRefundGuideTitle")}</strong>
                  <p>{t("main.taxRefundGuideSubtitle")}</p>
                </div>
              </div>
              <div className="main-content-item application-bx pc-show">
                <span>TIP</span>
                <p>
                  {t("main.taxRefundMethodIfMissed1")} <br />
                  {t("main.taxRefundMethodIfMissed2")}
                </p>
                <Link
                  to={`/${currentLang}/traveler/apply-refund`}
                  className="btn-application"
                >
                  <i className="ico ico-application">
                    <span className="hide-txt">{t("main.requestRefunds")}</span>
                  </i>
                  <span>{t("main.requestRefunds")}</span>
                </Link>
                <div className="bulb-bx">
                  <img
                    src={ico_bulb}
                    alt={t("main.altBulbIcon") || "전구 아이콘"}
                  />
                </div>
              </div>
            </div>
            <div className="content-grid-bottom">
              <Link
                to={`/${currentLang}/traveler/refund-eligibility`}
                className="main-content-item"
              >
                <div className="txt-bx">
                  <p>{t("main.refundEligibility")}</p>
                  <span>
                    {t("main.refundConditionsInfo1")}
                    <br />
                    {t("main.refundConditionsInfo2")}
                  </span>
                </div>
                <div className="arrow-bx">
                  <span className="arrow"></span>
                </div>
              </Link>
              <Link
                to={`/${currentLang}/traveler/refund-methods`}
                className="main-content-item"
              >
                <div className="txt-bx">
                  <p>{t("main.taxRefundMethodTitle")}</p>
                  <span>
                    {t("main.taxRefundMethodDetail1")}
                    <br />
                    {t("main.taxRefundMethodDetail2")}
                  </span>
                </div>
                <div className="arrow-bx">
                  <span className="arrow"></span>
                </div>
              </Link>
              <Link
                to={`/${currentLang}/traveler/announcement`}
                className="main-content-item"
              >
                <div className="txt-bx">
                  <p>{t("main.taxRefundLocationTitle")}</p>
                  <span>
                    {t("main.taxRefundLocationDetail1")}
                    <br />
                    {t("main.taxRefundLocationDetail2")}
                  </span>
                </div>
                <div className="arrow-bx">
                  <span className="arrow"></span>
                </div>
              </Link>
              <div className="main-content-item application-bx mo-show">
                <span>TIP</span>
                <p>
                  {t("main.taxRefundMethodIfMissed1")} <br />
                  {t("main.taxRefundMethodIfMissed2")}
                </p>
                <Link
                  to={`/${currentLang}/traveler/apply-refund`}
                  className="btn-application"
                >
                  <i className="ico ico-application">
                    <span className="hide-txt">{t("main.requestRefunds")}</span>
                  </i>
                  <span>{t("main.requestRefunds")}</span>
                </Link>
                <div className="bulb-bx">
                  <img
                    src={ico_bulb}
                    alt={t("main.altBulbIcon") || "전구 아이콘"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-content-step02" data-scroll>
        <div className="inner type03">
          <div className="main-info-bx">
            <p>
              {t("main.travelEnjoyment1")}
              <br />
              {t("main.travelEnjoyment2")}
            </p>
          </div>
          <div className="link-bx">
            <button
              className="link pc-alipay"
              type="button"
              onClick={() => handleLoginModalOpen("modal1")}
            >
             <span>{t("main.viewAlipayQR")}</span>
              <span className="arrow"></span>
            </button>
            <button
              className="link pc-cube"
              type="button"
              onClick={() => handleLoginModalOpen("modal2")}
            >
             <span>Mobile CubeRefund</span>
              <span className="arrow"></span>
            </button>
            <Link className="mo-alipay" to="https://qr.alipay.com/_d?_b=PAI_LOGIN_DY&amp;securityId=web%257Cauthcenter_qrcode_login%257Cfce82111-cc97-4acc-b42c-ba2c31126794RZ54">
              <span>Alipay</span>
              <span className="arrow"></span>
            </Link>
            <a
            className="mo-cube"
              href="https://m.cuberefund.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Mobile CubeRefund</span>
              <span className="arrow"></span>
            </a>{" "}
            {/* target blank 추가 */}
          </div>
        </div>
      </section>

      <section className="main-content-step03">
        <div className="inner type03">
          <div className="grid-bx">
            <div className="main-content-item">
              <div className="txt-bx">
                <dl>
                  <dt className="tit">{t("main.membershipInquiries")}</dt>
                  <dd className="desc">
                    {t("main.membershipSlogan")}
                      <br />
                      {t("main.becomeMemberJourney")}
                  </dd>
                </dl>
              </div>
              <div className="link-bx">
                <Link to={`/${currentLang}/franchise/process`}>
                  <span>{t("main.membershipJoinProcess")}</span>
                  <span className="arrow"></span>
                </Link>
                <Link to={`/${currentLang}/contact/signup-inquiry`}>
                  <span>{t("main.membershipInquiryLink")}</span>
                  <span className="arrow"></span>
                </Link>
              </div>
            </div>
            <div className="main-content-item">
              <div className="txt-bx">
                <dl>
                  <dt className="tit">{t("main.membershipService")}</dt>
                  <dd className="desc">
                    {t("main.partnerSlogan1")}
                    <br />
                    {t("main.partnerSlogan2")}
                  </dd>
                </dl>
              </div>
              <div className="link-bx">
                <Link
                  to={`/${currentLang}/franchise/notice`}
                  onClick={handleProtectedLinkClick(
                    `/${currentLang}/franchise/notice`
                  )}
                >
                  <span>{t("main.notices")}</span>
                  <span className="arrow"></span>
                </Link>
                <Link
                  to={`/${currentLang}/franchise/supplies`}
                  onClick={handleProtectedLinkClick(
                    `/${currentLang}/franchise/supplies`
                  )}
                >
                  <span>{t("main.requestSupplies")}</span>
                  <span className="arrow"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        className="modal-main"
        isOpen={openModal}
        onClose={handleModalClose} // 수정된 핸들러 연결
        size="small"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">{t("main.modal.renewalTitle").split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {word}
                {i < arr.length - 1 && ' '}
                {i === 0 && <br className="mo-show" />}
              </React.Fragment>
            ))}</h3>
          </div>
        }
      >
        <div className="modal-cont">
          <div className="info-wrap">
                <p>
                  {t("main.modal.renewalMessage1")} <br />
                  {t("main.modal.renewalMessage2")} {/* */}
                  {t("main.modal.renewalMessage3")} <br />
                  {t("main.modal.renewalMessage4")} <br />
                  {t("main.modal.renewalMessage5")}
                </p>
          </div>
          <div className="btn-wrap">
            <div className="checkbox-wrap">
              <Checkbox
                className="checkbox-input"
                id="dontShowTodayCheckboxMainPage" // 고유 ID로 변경
                checked={checkedState.dontShowToday}
                onCheckedChange={(checked) => handleCheckboxChange(checked)} // 직접 값 전달
              />
              <label htmlFor="dontShowTodayCheckboxMainPage" className="">
                {t("main.buttonTodayClose")}
              </label>
            </div>
            <button className="btn" onClick={handleModalClose}>
              {t("main.buttonClose")}
            </button>{" "}
            {/* 수정된 핸들러 연결 */}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openLoginModal.modal1}
        onClose={() => handleLoginModalClose("modal1")}
        size="small"
        className="login modal-qr"
        title={
          <div className="modal-title-wrap">
            <button
              className="modal-close"
              onClick={() => handleLoginModalClose("modal1")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <div className="modal-content ">
          <div className="qr-content">
            <img src={qr_img01} alt="qr 코드" />
          </div>
          <p className="qr-desc">
            {t("main.qrCode1")}
            <br />
            {t("main.qrCode2")}
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={openLoginModal.modal2}
        onClose={() => handleLoginModalClose('modal2')}
        size="small"
        className="login modal-qr"
        title={
          <div className="modal-title-wrap">
            <button className="modal-close" onClick={() => handleLoginModalClose('modal2')}>
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <div className="modal-content ">
          <div className="qr-content">
            <img src={qr_img02} alt="qr 코드" />
          </div>
          <p className="qr-desc">{t("main.qrCode1")}<br />
            {t("main.qrCode2")}</p>
        </div>
      </Modal>
    </div>
  );
};

export default MainHomePage;
