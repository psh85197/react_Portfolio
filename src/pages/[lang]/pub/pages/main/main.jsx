import React, { useEffect, useRef, useState } from "react";
import mainVisual from "@/assets/images/contents/main/main_visual_pc.png";
import mainVisualMo from "@/assets/images/contents/main/main_visual_mo.png";
import { Link } from "react-router-dom";
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
import ico_bulb from "@/assets/images/icon/ico_bulb.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Modal } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";

const BoardPage = () => {
  const mainWrapRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    terms1: false,
  });

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // 체크 박스용
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 스크롤 이벤트 함수
  const cardScroll = () => {
    // 컨텐츠 1번
    const contentStep01 =
      mainWrapRef.current.querySelector(".content-grid-top");
    const items01 = contentStep01.querySelectorAll(".main-content-item");

    // 바텀 위치
    const contentStep04 = mainWrapRef.current.querySelector(
      ".content-grid-bottom"
    );
    const items04 = contentStep04.querySelectorAll(".main-content-item");

    // 컨텐츠 2번
    const contentStep02 = mainWrapRef.current.querySelector(
      ".main-content-step02"
    );
    const items02 = contentStep02.querySelectorAll(".link-bx a");
    const itemsText = contentStep02.querySelectorAll(".main-info-bx p");

    // 컨텐츠 3번
    const contentStep03 = mainWrapRef.current.querySelector(
      ".main-content-step03"
    );
    const items03 = contentStep03.querySelectorAll(".main-content-item");

    const isMobile = window.innerWidth < 1024;

    if (!isMobile) {
      // 탑 위치
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
            // markers: true,
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
            // markers: true,
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
            start: "top center+=300",
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

    // 클린업 함수
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  // 배경 스크롤 이벤트
  const parallaxScrolling = () => {
    const scrollElement = mainWrapRef.current.querySelector("[data-scroll]");

    // 화면 크기에 따라 다른 애니메이션 적용
    const isMobile = window.innerWidth < 1024;

    // 모바일과 데스크탑에 따라 다른 시작/끝 위치 설정
    const fromPosition = isMobile ? "100% -250px" : "0 -1020px";
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

    // 클린업 함수
    return () => {
      // ScrollTrigger 인스턴스 제거
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  // 인트로 애니메이션 함수
  const intro = () => {
    // 페이지 로드 시 body에 intro 클래스 추가
    document.body.classList.add("intro");

    // 2초 동안 계속해서 스크롤을 맨 위로 유지
    const scrollInterval = setInterval(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 1); // 1ms마다 실행
    // 2초 후에 인터벌 정지
    setTimeout(() => {
      clearInterval(scrollInterval);
    }, 2000);

    // 타임라인 생성
    const tl = gsap.timeline({
      onComplete: () => {
        // body 인트로 제거
        document.body.className = "";
        setOpenModal(false);

        cardScroll();
        parallaxScrolling();
      },
    });

    // 메인 이미지
    const mainVisual = mainWrapRef.current.querySelector(".main-visual-img");
    const mainVisualPcImg = mainWrapRef.current.querySelector(
      ".main-visual-img .pc-img"
    );
    const mainVisualMoImg = mainWrapRef.current.querySelector(
      ".main-visual-img .mo-img"
    );
    const rollingBox = mainWrapRef.current.querySelector(".rolling-bx");
    const mainTitle = mainWrapRef.current.querySelector(".main-title");
    const scrollIcon = mainWrapRef.current.querySelector(".scroll-icon");
    const isMobile = window.innerWidth < 1024;

    // PC 애니메이션 시퀀스 구성
    if (!isMobile) {
      // 첫번째
      tl.to(
        mainVisual,
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

        // 두번째
        .to(
          mainTitle,
          { color: "#ffffff", duration: 0.4, ease: "none" },
          "two-=0.6"
        )
        // .to(scrollIcon, { className: "scroll-icon active",  duration: 0.4,  color: "#ffffff",  border: "1.5px solid #ffffff", ease: "power3.out"  }, "two-=0.6" )
        .to(
          mainVisual,
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
      // 첫번째
      tl.to(
        mainVisual,
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

        // 두번째
        .to(
          mainVisual,
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

    // 컴포넌트 언마운트 시 타임라인 정리를 위한 클린업 함수 반환
    return () => {
      tl.kill();
      document.body.classList.remove("intro");
    };
  };

  useEffect(() => {
    const introCleanup = intro();
    const cardCleanup = cardScroll();
    const scrollCleanup = parallaxScrolling();

    // 컴포넌트 언마운트 시 정리 함수 실행
    return () => {
      introCleanup && introCleanup();
      scrollCleanup && scrollCleanup();
      cardCleanup && cardCleanup();
    };
  }, []);

  return (
    <div className="main-wrap" ref={mainWrapRef}>
      <section className="main-visual">
        <div className="main-visual-content">
          <div className="main-visual-img">
            <img
              className="pc-img"
              src={mainVisual}
              alt="롯데백화점 가맹점 고객 서비스"
            />
            <img
              className="mo-img"
              src={mainVisualMo}
              alt="롯데백화점 가맹점 고객 서비스"
            />
          </div>
          <div className="main-title">
            <p>당신의 특별한 여행,</p>
            <p>더 쉽고 편리한 환급으로 완성됩니다.</p>
          </div>

          <div className="scroll-icon">
            <span>scroll</span>
          </div>
        </div>
      </section>
      <section className="main-visual-rolling-wrap">
        <div className="main-visual-rolling">
          <div className="inner type03">
            <div className="rolling-bx">
              <Swiper
                ref={swiperRef}
                modules={[Autoplay]}
                centeredSlides={false}
                slidesPerView={"auto"}
                allowTouchMove={false}
                loop={true}
                speed={3000}
                autoplay={{
                  delay: 1,
                  disableOnInteraction: false,
                  stopOnLastSlide: false,
                }}
                breakpoints={{
                  0: {
                    spaceBetween: 48,
                    slidesPerView: "auto",
                    touchRatio: 0,
                  },
                  1024: {
                    spaceBetween: 104,
                    slidesPerView: "auto",
                    touchRatio: 0,
                  },
                }}
                observer={true}
                observeParents={true}
                className="rolling-swiper"
                style={{ userSelect: "none", touchAction: "none" }}
                onSwiper={(swiper) => {
                  if (swiper && swiper.autoplay) {
                    setTimeout(() => {
                      try {
                        swiper.autoplay.start();
                      } catch (error) {
                        setTimeout(() => swiper.autoplay?.start(), 1000);
                      }
                    }, 100);
                  }
                }}
              >
                {/* 롯데 백화점 */}
                <SwiperSlide>
                  <a
                    href="https://global.lotteshopping.com/eng/main"
                    target="_blank"
                  >
                    <img src={main_rolling_01} alt="롯데 백화점" />
                  </a>
                </SwiperSlide>
                {/* 롯데마트 */}
                <SwiperSlide>
                  <a
                    href="https://company.lottemart.com/en/main.asp"
                    target="_blank"
                  >
                    <img src={main_rolling_02} alt="롯데마트" />
                  </a>
                </SwiperSlide>
                {/* 롯데하이마트 */}
                <SwiperSlide>
                  <a href="https://company.himart.co.kr/en" target="_blank">
                    <img src={main_rolling_03} alt="롯데하이마트" />
                  </a>
                </SwiperSlide>
                {/* 롯데 월드 */}
                <SwiperSlide>
                  <a
                    href="https://adventure.lotteworld.com/eng/main/index.do"
                    target="_blank"
                  >
                    <img src={main_rolling_04} alt="롯데 월드" />
                  </a>
                </SwiperSlide>
                {/* 롯데 호텔 앤 리조트 */}
                <SwiperSlide>
                  <a
                    href="https://www.lottehotel.com/global/en"
                    target="_blank"
                  >
                    <img src={main_rolling_05} alt="롯데 호텔 앤 리조트" />
                  </a>
                </SwiperSlide>
                {/* grf */}
                <SwiperSlide>
                  <a href="https://www.lottegfr.co.kr/" target="_blank">
                    <img src={main_rolling_06} alt="grf" />
                  </a>
                </SwiperSlide>
                {/* stl */}
                <SwiperSlide>
                  <a href="https://www.beststl.com/index.html" target="_blank">
                    <img src={main_rolling_07} alt="stl" />
                  </a>
                </SwiperSlide>
                {/* 던던 */}
                <SwiperSlide>
                  <a href="https://www.dundun-ddm.com/en" target="_blank">
                    <img src={main_rolling_08} alt="던던" />
                  </a>
                </SwiperSlide>
                {/* 롯데이노베이트*/}
                <SwiperSlide>
                  <a href="https://www.lotteinnovate.com/en" target="_blank">
                    <img src={main_rolling_09} alt="롯데이노베이트" />
                  </a>
                </SwiperSlide>
                {/* 플래닛 */}
                <SwiperSlide>
                  <a href="https://www.planetpayment.com/" target="_blank">
                    <img src={main_rolling_10} alt="플래닛" />
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={main_rolling_11} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={main_rolling_12} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={main_rolling_13} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={main_rolling_14} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={main_rolling_15} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={main_rolling_16} alt="" />
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="status-btn-bx">
                <Button
                  className={`btn-status ${!isPlaying ? "stop" : ""}`}
                  onClick={() => {
                    const swiper = swiperRef.current.swiper;

                    if (swiper.autoplay.running) {
                      // 정지
                      swiper.autoplay.stop();

                      const currentTranslate = swiper.getTranslate();
                      swiper.setTranslate(currentTranslate);
                      swiper.wrapperEl.style.transitionDuration = "0ms";
                    } else {
                      // 복구
                      // 먼저 transition 설정
                      swiper.wrapperEl.style.transitionDuration = `${swiper.params.speed}ms`;

                      // autoplay 시작
                      swiper.autoplay.start();

                      // 약간의 지연 후 현재 위치에서 부드럽게 시작
                      setTimeout(() => {
                        const currentIndex = swiper.activeIndex;
                        swiper.slideTo(
                          currentIndex + 1,
                          swiper.params.speed,
                          false
                        );
                      }, 50);
                    }

                    setIsPlaying(!isPlaying);
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
                  <strong>Tax Refund?</strong>
                  <p>쉽고 편리한 택스리펀드를 시작해 보세요.</p>
                </div>
              </div>
              <div className="main-content-item application-bx pc-show">
                <span>TIP</span>
                <p>
                  환급 신청을 <br />
                  못하고 출국 했다면?
                </p>
                <Link to="/" className="btn-application">
                  <i className="ico ico-application">
                    <span className="hide-txt">환급신청 아이콘</span>
                  </i>
                  <span>환급 신청</span>
                </Link>
                <div className="bulb-bx">
                  <img src={ico_bulb} alt="롯데백화점 가맹점 고객 서비스" />
                </div>
              </div>
            </div>
            <div className="content-grid-bottom">
              <Link to="/" className="main-content-item">
                <div className="txt-bx">
                  {/* 20250527 퍼블 수정 */}
                  <p>환급대상안내</p>
                  <span>
                    환급 가능한 대상과 조건을
                    <br />
                    안내해드립니다.
                  </span>
                </div>

                <div className="arrow-bx">
                  <span className="arrow"></span>
                </div>
              </Link>
              <Link to="/" className="main-content-item">
                <div className="txt-bx">
                  {/* 20250527 퍼블 수정 */}
                  <p>환급 절차 안내</p>
                  <span>
                    환급방법에 따른 환급절차를
                    <br />
                    안내해드립니다.
                  </span>
                </div>

                <div className="arrow-bx">
                  <span className="arrow"></span>
                </div>
              </Link>
              <Link to="/"  className="main-content-item">
                <div className="txt-bx">
                  {/* 20250527 퍼블 수정 */}
                  <p>환급 위치 안내</p>
                  <span>
                    가까운 환급창구 위치를
                    <br />
                    쉽게 찾아보세요.
                  </span>
                </div>

                <div className="arrow-bx">
                  <span className="arrow"></span>
                </div>
              </Link>
              <div className="main-content-item application-bx mo-show">
                <span>TIP</span>
                <p>
                  환급 신청을 <br />
                  못하고 출국 했다면?
                </p>
                <Link to="/" className="btn-application">
                  <i className="ico ico-application">
                    <span className="hide-txt">환급신청 아이콘</span>
                  </i>
                  <span>환급 신청</span>
                </Link>
                <div className="bulb-bx">
                  <img src={ico_bulb} alt="롯데백화점 가맹점 고객 서비스" />
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
              여행의 즐거움을 더하는
              <br />
              편리한 환급 서비스를 지금 경험해 보세요.
            </p>
          </div>
          <div className="link-bx">
            <Link to="/">
              <span>Alipay</span>
              <span className="arrow"></span>
            </Link>
            <Link to="/">
              <span>Cube</span>
              <span className="arrow"></span>
            </Link>
            <Link to="/">
              <span>YUN-U Pay</span>
              <span className="arrow"></span>
            </Link>
            <Link to="/">
              <span>WeChat Pay</span>
              <span className="arrow"></span>
            </Link>
          </div>
        </div>
      </section>
      <section className="main-content-step03">
        <div className="inner type03">
          <div className="grid-bx">
            <div className="main-content-item">
              <div className="txt-bx">
                <dl>
                  <dt className="tit">가맹 문의</dt>
                  <dd className="desc">
                    택스리펀드의 새로운 기준을 만들어 갑니다.
                    <br />
                    성장의 여정에 함께해 주세요.
                  </dd>
                </dl>
              </div>
              <div className="link-bx">
                <Link to="/">
                  <span>가맹 가입 절차</span>
                  <span className="arrow"></span>
                </Link>
                <Link to="/">
                  <span>가입 문의</span>
                  <span className="arrow"></span>
                </Link>
              </div>
            </div>
            <div className="main-content-item">
              <div className="txt-bx">
                <dl>
                  <dt className="tit">가맹점 멤버십</dt>
                  <dd className="desc">
                    든든한 동반자로서 함께 만들어온 성장,
                    <br />
                    앞으로도 함께 하겠습니다.
                  </dd>
                </dl>
              </div>
              <div className="link-bx">
                <Link to="/">
                  <span>공지사항</span>
                  <span className="arrow"></span>
                </Link>
                <Link to="/">
                  <span>카카오 채널</span>
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
        onClose={() => setOpenModal(false)}
        size="small"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">큐브리펀드 RENEWAL OPEN</h3>
          </div>
        }
      >
        <div className="modal-cont">
          <div className="info-wrap">
            <p>
              큐브리펀드 홈페이지가 고객님께 더 편리하고 유용한 서비스로
              개편되었습니다. 앞으로도 많은 방문 부탁드리며, 항상 고객님들께
              최선을 다하고 보다 나은 서비스 이용을 위해 최선을 다하겠습니다.
            </p>
            <div className="notice-bx">
              <p>
                홈페이지 개편 작업으로 일시적으로 이용이 중단됩니다.
                2025.06.02(월) AM 02:00 - 09:00{" "}
              </p>
            </div>
          </div>
          <div className="btn-wrap">
            <div className="checkbox-wrap">
              <Checkbox
                className="checkbox-input"
                id="checkbox-1"
                checked={checkedItems.terms1}
                onCheckedChange={() => handleCheckboxChange("terms1")}
              />
              <label htmlFor="checkbox-1" className="">
                오늘 하루 보지않기
              </label>
            </div>
            <button className="btn" onClick={() => setOpenModal(false)}>
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BoardPage;
