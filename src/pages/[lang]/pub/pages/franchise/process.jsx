import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs-anchor";
import process_image_01 from "@/assets/images/contents/franchise/process_img01.png";
import process_image_02 from "@/assets/images/contents/franchise/process_img02.png";
import process_image_03 from "@/assets/images/contents/franchise/process_img03.png";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Process = () => {
  const contentRef = React.useRef(null); 
  const { lang } = useParams();

  return (
    <div className="process-wrap">
      <section>
        <div className="hgroup-wrap mb-16">
          <h2 className="f48-700-140">가맹 절차 안내</h2>
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
                          <p className="tit">큐브리펀드 가맹점 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                          큐브리펀드 고객센터로 가맹 신청
                          </li>
                          <li className="basic font-sm">
                            <Link to={`/${lang}/pub/pages/contact/signup-inquiry`}>가입 문의 바로가기</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">외국인 관광객 면세판매장 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                          사업장 소재 관할 세무서에 [외국인 관광객 면세판매장 지정증] 신청
                          </li>
                          <li>희망 시 큐브리펀드 신청대행 가능</li>
                          <li className="basic font-sm">
                          <a href="https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09002&CappBizCD=12100000099&tp_seq=">외국인 관광객 면세판매장 지정증 신청 바로가기</a>
                          </li>
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
                          큐브리펀드와 가맹계약서 작성 후, 환급 장비 설치 및 교육 
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
                          <p className="tit">큐브리펀드 가맹점 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                          큐브리펀드 고객센터로 가맹 신청
                          </li>
                          <li className="basic font-sm">
                          <Link to={`/${lang}/pub/pages/contact/signup-inquiry`}>가입 문의 바로가기</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">외국인 환자 유치기관 등록</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                          보건산업진흥원에 [외국인 환자 유치기관 등록증] 신청
                          </li>
                          <li className="basic font-sm"><a href="https://www.medicalkorea.or.kr/korp">보건산업진흥원 (바로가기 제공)</a></li>
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
                          <p className="tit">큐브리펀드 가맹점 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>큐브리펀드 고객센터로 가맹 신청</li>
                          <li className="basic font-sm">
                          <Link to={`/${lang}/pub/pages/contact/signup-inquiry`}>가입 문의 바로가기</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">특례적용관광숙박시설 신청</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>한국호텔업협회 또는 한국휴양콘도미니엄 경영협회에 신청</li>
                          <li className="basic font-sm"><a href="http://www.hotelskorea.or.kr/plaza/index_1.php?b_id=001">한국 호텔업 협회 (바로가기 제공)</a>
                          <a href="http://www.condo.or.kr/index.asp">한국휴양콘도미니엄 경영협회 (바로가기 제공)</a></li>
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
                          큐브리펀드와 가맹계약서 작성 후, 환급 장비 설치 및 교육 
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
              <Button className="btn btn-primary">가입 문의</Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Process;
