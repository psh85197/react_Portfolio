import React from "react";
import greeting_images from "@/assets/images/contents/company/greeting_images.png";

const Greeting = () => {
  return (
    <div className="greeting-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">인사말</h2>
          {/* <p className="desc-txt f18-400-160">
            큐브리펀드 홈페이지를 찾아주셔서 감사합니다.
          </p> */}
        </div>
      </section>
      <section>
        <div className="img-wrap">
          {/* 이미지 영역 */}
          <img
            src={greeting_images}
            alt="큐브리펀드 본사 위치"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="txt-wrap">
          <div className="tit f40-700-130">
          Tax Refund<br className="pc-show"/>시장의<br className="mo-show"/> 새로운 리더가<br className="pc-show"/> 되겠습니다.
          </div>
          <div className="desc-wrap">
            <p>
              (주)큐브리펀드는 한국을 방문하는 외국인 관광객들에게 더 쉽고
              편리한세금 환급(Tax Refund) 서비스를 제공하기 위해 설립되었습니다.
              <br />
              여행과 쇼핑을 즐기는 관광객들에게 더 나은 경험을 선사하고,
              가맹점과의협업을 통해 상생할 수 있는 서비스를 만들어 가고자
              합니다.
            </p>
            <br />
            <p>
              세계적인 텍스리펀드사인 Planet의 투자와 협력을 통해 혁신적인
              디지털환급 서비스를 제공하며, 나아가 대한민국 유통 및 관광 산업의
              발전에 기여하기 위해 꾸준히 노력하고 있습니다.
            </p>
            <br />
            <p>
              앞으로도 신뢰할 수 있는 환급 창구 운영, 지속적인 기술 개발, 서비스
              개선 등 고객 중심의 혁신을 통하여 최고의 환급 서비스를 제공하기
              위해 최선을 다하겠습니다.
            </p>
            <br />
            <p>감사합니다.</p>
            <div className="sign-wrap">
              <p>큐브리펀드 대표이사</p>
              <p className="name">좌정훈</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Greeting;
