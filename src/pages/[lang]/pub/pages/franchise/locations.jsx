import React from "react";
import { Button } from "@/components/ui/button";
import locations_01 from "@/assets/images/contents/franchise/locations_01.png";
import locations_02 from "@/assets/images/contents/franchise/locations_02.png";
import locations_03 from "@/assets/images/contents/franchise/locations_03.png";
import locations_04 from "@/assets/images/contents/franchise/locations_04.png";
import locations_05 from "@/assets/images/contents/franchise/locations_05.png";
import locations_06 from "@/assets/images/contents/franchise/locations_06.png";

const locations = () => {
  return (
    <div class="refund-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">Why CubeRefund?</h2>
        </div>
      </section>
      <section>
          <div className="tax-inner">
            <div className="left-bx">
              <div className="hgroup-wrap">
                <h2 className="f40-700-130">
                  큐브리펀드의 차별화된 서비스를 소개합니다.
                </h2>
              </div>
            </div>
            <div className="right-bx">
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={locations_01} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        다양한 업종, 다양한 규모의 사후면세사업장 서비스 제공
                        경험 및 노하우 보유
                      </strong>
                      <ul className="desc-list">
                        <li>
                          국내 Tax Refund 가능한 물품 판매, 의료, 숙박업에
                          서비스 제공이 가능합니다.
                        </li>
                        <li>
                          소규모 매장부터 대형 백화점에 이르기까지 다양한 매장에
                          서비스 제공이 가능합니다.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={locations_02} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        전문 영업사원에 의한 면세사업장 오픈 지원
                      </strong>
                      <ul className="desc-list">
                        <li>
                          큐브리펀드 영업사원이 면세판매장 지정증을 관할
                          세무서에 신청해 드립니다.
                        </li>
                        <li>
                          매장에서 환급에 필요한 장비를 무상으로 제공 및 설치해
                          드립니다. (전용단말기, 전용프로그램, 여권리더기)
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={locations_03} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        전문가에 의한 안정적인 운영 지원
                      </strong>
                      <ul className="desc-list">
                        <li>
                          큐브리펀드 담당자가 전국의 환급장비에 대해 무상으로
                          관리해 드립니다. (유지보수, 소모품 지원 등)
                        </li>
                        <li>
                          매장에서 발생하는 환급 관련 문의에 대해 전문 상담사가
                          응대해 드립니다.
                        </li>
                        <li>
                          분기별 거래내역 자료를 제공하여 편리한 부가세 신고를
                          도와 드립니다.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={locations_04} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        외국인 관광객 판매 리포트 제공
                      </strong>
                      <p className="f18-400-160 info-desc">
                        외국인 판매현황 및 관광객 입국동향 데이터를 제공하여
                        수요예측과 판촉활동에 도움을 드립니다.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={locations_05} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        외국인 유치 마케팅 지원
                      </strong>
                      <p className="f18-400-160 info-desc">
                        큐브리펀드가 보유한 다양한 마케팅 채널을 통해 홍보 및
                        프로모션 지원이 가능합니다.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={locations_06} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        안정적인 IT시스템 운영
                      </strong>
                      <p className="f18-400-160 info-desc">
                        전문 데이터센터를 통하여, 최상위 등급의 보안성을
                        확보하고 단절없는 안정적인 시스템을 제공합니다.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      <section>
        <div className="btn-wrap line-type">
          <div className="btn-inner line-type">
            <Button className="btn btn-primary">가입 문의</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default locations;
