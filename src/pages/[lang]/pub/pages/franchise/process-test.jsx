import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs-anchor";
import process_image_01 from "@/assets/images/contents/franchise/process_img01.png";
import process_image_02 from "@/assets/images/contents/franchise/process_img02.png";
import process_image_03 from "@/assets/images/contents/franchise/process_img03.png";
import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

const Process = () => {
  const contentRef = React.useRef(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/ko/contact/signup-inquiry`);
  };

  return (
    <div className="process-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">가맹 절차 안내</h2>
          <p className="desc-txt f18-400-160">
            분야별 가맹 신청 방법과 대상을 확인해 주세요.
          </p>
        </div>
      </section>
      <section>
        <Tabs defaultValue="step01" className="tab-wrap type02">
          <TabsList>
            <TabsTrigger value="step01">물품</TabsTrigger>
            <TabsTrigger value="step02">의료</TabsTrigger>
            <TabsTrigger value="step03">숙박</TabsTrigger>
          </TabsList>
           <TabsContent ref={contentRef}>
            <div className="process-content" data-value="step01">
              <div className="title-wrap">
                <p className="tit f40-700-130" data-title>물품</p>
              </div>
              <div className="cont-wrap">
                <div className="img-cont">
                  <img
                    src={process_image_01}
                    alt="큐브리펀드 모바일 셀프 반출 오픈"
                  />
                </div>
                <div className="txt-cont">
                  <ul className="step-wrap">
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 1</p>
                          <p className="tit">관할 세무서 신고</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            사업장 소재 관할 세무서에 [외국인 관광객 면세판매장
                            지정증] 신청
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">큐브리펀드 가맹점 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            [외국인 관광객 면세판매장 지정증] 수령 후,
                            큐브리펀드 고객센터로 가맹 신청
                          </li>
                          <li>고객센터 전화번호 : 02-6925-2033</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 3</p>
                          <p className="tit">큐브리펀드 장비 및 교육 제공</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            큐브리펀드와 가맹계약서 작성 후, 환급 장비 설치 및
                            교육{" "}
                          </li>
                          <li>단말기 및 필요물품 무료제공</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="process-content" data-value="step02">
              <div className="title-wrap">
                <p className="tit f40-700-130" data-title>의료</p>
              </div>
              <div className="cont-wrap">
                <div className="img-cont">
                  <img src={process_image_02} alt="큐브리펀드 신청 방법" />
                </div>
                <div className="txt-cont">
                  <ul className="step-wrap">
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 1</p>
                          <p className="tit">보건산업진흥원 신고</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            보건산업진흥원에 [외국인 환자 유치기관 등록증] 신청
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">큐브리펀드 가맹점 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            [외국인 환자 유치기관 등록증] 수령 후, 큐브리펀드
                            고객센터로 가맹 신청
                          </li>
                          <li>고객센터 전화번호 : 02-6925-2033</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 3</p>
                          <p className="tit">큐브리펀드 장비 및 교육 제공</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            큐브리펀드와 가맹계약서 작성 후, 환급 장비 설치 및
                            교육
                          </li>
                          <li>단말기 및 필요물품 무료제공</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="process-content" data-value="step03">
              <div className="title-wrap">
                <p className="tit f40-700-130" data-title>숙박</p>
              </div>
              <div className="cont-wrap">
                <div className="img-cont">
                  <img src={process_image_03} alt="큐브리펀드 가맹 신청 방법" />
                </div>
                <div className="txt-cont">
                  <ul className="step-wrap">
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 1</p>
                          <p className="tit">한국 호텔업 협회 신고</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>한국 호텔업 협회에 [관광사업등록증] 신청</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">큐브리펀드 가맹점 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            [관광사업등록증] 수령 후, 큐브리펀드 고객센터로 가맹
                            신청
                          </li>
                          <li>고객센터 전화번호 : 02-6925-2033</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 3</p>
                          <p className="tit">큐브리펀드 장비 및 교육 제공</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            큐브리펀드와 가맹계약서 작성 후, 환급 장비 설치 및
                            교육
                          </li>
                          <li>단말기 및 필요물품 무료제공</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="btn-wrap">
              <Button className="btn btn-primary" onClick={handleButtonClick}>
                가맹 신청 및 문의
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Process;
