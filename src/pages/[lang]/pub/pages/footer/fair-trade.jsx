import React from "react";
import { Link } from "react-router-dom";
import fair_trade_img01 from "@/assets/images/contents/footer/fair_trade_img01.png";

const FairTrade = () => {
  return (
    <div className="fair-trade-wrap">
      <section>
        <div className="hgroup-wrap sub">
          <p className="f40-700-140">컴플라이언스</p>
          <span className="f18-400-160">
            책임있는 공정거래 준수를 위해 노력합니다.
          </span>
        </div>
      </section>
      <section>
        <div className="fair-trade-bx">
          <div className="fair-trade-img-bx">
            <img src={fair_trade_img01} alt="컴플라이언스 이미지" />
          </div>
          <div className="fair-trade-info-bx">
            <p>
              모든 경영 활동에 있어 ‘윤리’를 최우선 가치로 삼고, 투명하고
              적법하게 모든 업무를 수행해나가고 있습니다.{" "}
              <br className="pc-show" /> 또한 모든 임직원들이 공감하고 실천할 수
              있는 규정을 마련하여 올바른 행동과 가치 판단의 기준으로 삼고
              있습니다.
            </p>
          </div>
        </div>
      </section>
      <section className="link-bx">
        <div>
          <div className="go-link-wrap">
            <Link to="https://www.lotte.co.kr/compliance/lc.do" className="">
              <p className="link-tit f20-700-140">
                롯데
                <br />
                컴플라이언스
              </p>
              <div type="button" className="link-btn">
                <span className="f18-500-160">바로가기</span>
                <i className="ico ico-top-right-arrow"></i>
              </div>
            </Link>
            <Link to="https://www.lotte.co.kr/compliance/inquiry.do" className="">
              <p className="link-tit f20-700-140">
                롯데그룹
                <br />
                신문고
              </p>
              <div type="button" className="link-btn">
                <span className="f18-500-160">바로가기</span>
                <i className="ico ico-top-right-arrow"></i>
              </div>
            </Link>
            <Link to="https://www.lotteinnovate.com/ko/cscenter/sinmungo" className="active">
              <p className="link-tit f20-700-140">
                롯데이노베이트
                <br />
                신문고
              </p>
              <div type="button" className="link-btn">
                <span className="f18-500-160">바로가기</span>
                <i className="ico ico-top-right-arrow"></i>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FairTrade;
