import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs-anchor";
import history_images01 from "@/assets/images/contents/company/history_img01.png";
import history_images02 from "@/assets/images/contents/company/history_img02.png";
import history_images03 from "@/assets/images/contents/company/history_img03.png";

const History = () => {
  const contentRef = React.useRef(null); 

  return (
    <div className="history-wrap">
      <section>
        <div className="inner">
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">연혁</h2>
          </div>
        </div>
      </section>
      <section>
        <Tabs defaultValue="step01" className="tab-wrap type02 scroll-type">
          <TabsList>
            <TabsTrigger value="step01">현재 ~ 2020</TabsTrigger>
            <TabsTrigger value="step02">2019 ~ 2015</TabsTrigger>
            <TabsTrigger value="step03">2014 ~ 2010</TabsTrigger>
          </TabsList>
          <TabsContent ref={contentRef}>
            <div className="history-content" data-value="step01">
              <div className="cont-wrap">
                <div className="history-box">
                  <dl data-title>
                    <dt className="tit f40-700-130">현재 ~ 2020</dt>
                    <dd className="img-cont">
                      <img
                        src={history_images01}
                        alt="큐브리펀드 모바일 셀프 반출 오픈"
                      />
                    </dd>
                  </dl>
                </div>
                {/* 퍼블수정 : 20250519 텍스트수정 */}
                <div className="txt-cont">
                  <ul className="txt-wrap">
                  <li>
                      <p className="year f32-700-140">2025</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2025. 06</p>
                          <p className="desc">
                            큐브리펀드 리뉴얼 홈페이지 OPEN
                          </p>
                        </li>
                        <li>
                          <p className="date">2025. 04</p>
                          <p className="desc">
                            클라우드 환급시스템 구축
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2024</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2024. 12</p>
                          <p className="desc">
                            BI Report 시스템 OPEN
                          </p>
                        </li>
                        <li>
                          <p className="date">2024. 05</p>
                          <p className="desc">
                            도심환급센터 OPEN (롯데백화점 부산점)
                          </p>
                        </li>
                        <li>
                          <p className="date">2024. 04</p>
                          <p className="desc">
                            도심환급센터 OPEN (롯데호텔 부산점)
                          </p>
                        </li>
                        <li>
                          <p className="date">2024. 02</p>
                          <p className="desc">차세대 키오스크 도입</p>
                        </li>
                        <li>
                          <p className="date">2024. 02</p>
                          <p className="desc">모바일 셀프 반출 시범사업 OPEN</p>
                        </li>
                        <li>
                          <p className="date">2024. 01</p>
                          <p className="desc">전국 유지보수 서비스망 구축</p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2022</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2022. 01</p>
                          <p className="desc">예약발행 시스템 OPEN</p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2020</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2020</p>
                          <p className="desc">
                            한국관광공사 지역관광거점도시 즉시환급 사업자
                            선정(전주/안동)
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="history-content" data-value="step02">
              <div className="cont-wrap">
                <div className="history-box">
                  <dl data-title>
                    <dt className="tit f40-700-130">2019 ~ 2015</dt>
                    <dd className="img-cont">
                      <img src={history_images02} alt="큐브리펀드 큐알 이미지" />
                    </dd>
                  </dl>
                </div>
                {/* 퍼블수정 : 20250519 텍스트수정 */}
                <div className="txt-cont">
                  <ul className="txt-wrap">
                    <li>
                      <p className="year f32-700-140">2019</p>
                      <ul className="date-wrap">
                      <li>
                          <p className="date">2019. 04</p>
                          <p className="desc">
                          알리페이 앱 환급서비스 개시
                          </p>
                        </li>
                        <li>
                          <p className="date">2019. 04</p>
                          <p className="desc">
                          큐브리펀드 모바일 환급서비스 개시
                          </p>
                        </li>
                        <li>
                          <p className="date">2019. 04</p>
                          <p className="desc">
                          롯데마트 환급서비스 개시
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2018</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2018. 09</p>
                          <p className="desc">
                          알리페이 실시간 환급 업무제휴
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 08</p>
                          <p className="desc">
                          롯데백화점 본점 환급창구 운영
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 04</p>
                          <p className="desc">
                            롯데호텔 숙박용역 환급 개시(서울점,월드점,부산호텔
                            도심환급센터 운영)
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 03</p>
                          {/* 퍼블수정 : 20250520 텍스트수정 */}
                          <p className="desc">
                            텐페이社 위챗페이 실시간 환급 업무제휴
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2017</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2017. 08</p>
                          <p className="desc">
                          롯데백화점 본점 즉시환급서비스 개시
                          </p>
                        </li>
                        <li>
                          <p className="date">2017. 03</p>
                          <p className="desc">
                            도심환급센터 OPEN (롯데피트인 동대문점)
                          </p>
                        </li>
                        <li>
                          <p className="date">2017. 03</p>
                          <p className="desc">
                          유럽 Tax Refund社 Planet(舊. Fintrax) 투자유치 및 사업제휴
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2016</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2016. 09</p>
                          <p className="desc">
                          인천국제공항 환급창구 운영
                          </p>
                        </li>
                        <li>
                          <p className="date">2016. 08</p>
                          <p className="desc">
                          도심환급센터 OPEN (롯데백화점 부산 서면/광복점)
                          </p>
                        </li>
                        <li>
                          <p className="date">2016. 05</p>
                          <p className="desc">롯데이노베이트(舊.롯데정보통신) 투자유치</p>
                        </li>
                        <li>
                          <p className="date">2016. 01</p>
                          <p className="desc">국내최초 즉시환급 서비스 개시</p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2015</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2015. 10</p>
                          <p className="desc">부산항 환급창구 운영</p>
                        </li>
                        <li>
                          <p className="date">2015. 10</p>
                          <p className="desc">평택항 환급창구 운영</p>
                        </li>
                        <li>
                          <p className="date">2015. 03</p>
                          {/* 퍼블수정 : 20250520 텍스트수정 */}
                          <p className="desc">
                          도심환급센터 OPEN (서울시 홍대)
                          </p>
                        </li>
                        <li>
                          <p className="date">2015. 01</p>
                          <p className="desc">
                          인천항 제2터미널 환급서비스 개시
                          </p>
                        </li>
                        <li>
                          <p className="date">2015. 01</p>
                          <p className="desc">
                          제주항 크루즈터미널 환급서비스 개시
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="history-content" data-value="step03">
              <div className="cont-wrap">
                <div className="history-box">
                  <dl data-title>
                    <dt className="tit f40-700-130">2020 ~ 현재</dt>
                    <dd className="img-cont">
                      <img src={history_images03} alt="큐브리펀드 공항 이미지" />
                    </dd>
                  </dl>
                </div>
                {/* 퍼블수정 : 20
                250519 텍스트수정 */}
                <div className="txt-cont">
                  <ul className="txt-wrap">
                    <li>
                      <p className="year f32-700-140">2014</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2014. 12</p>
                          <p className="desc">대구/양양공항 환급서비스 개시</p>
                        </li>
                        <li>
                          <p className="date">2014. 11</p>
                          <p className="desc">청주국제공항 환급서비스 개시</p>
                        </li>
                        <li>
                          <p className="date">2014. 10</p>
                          <p className="desc">인천항 제1터미널 환급서비스 개시</p>
                        </li>
                        <li>
                          <p className="date">2014. 07</p>
                          <p className="desc">
                          특허출원 (환급창구 운영시스템 및 방법, KR2014/006536)
                          </p>
                        </li>
                        <li>
                          <p className="date">2014. 05</p>
                          {/* 퍼블수정 : 20250520 텍스트수정 */}
                          <p className="desc">
                          도심환급센터 OPEN (서울시 명동 중소기업유통센터)
                          </p>
                        </li>
                        <li>
                          <p className="date">2014. 02</p>
                          <p className="desc">
                          특허출원 (온라인을 이용한 내국세 환급시스템 및 그 방법, 10-14045860000)
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2013</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2013. 09</p>
                          <p className="desc">
                          업계 최초 인천국제공항 전자환급서비스 개시
                          </p>
                        </li>
                        <li>
                          <p className="date">2013. 01</p>
                          <p className="desc">김포국제공항 환급서비스 개시</p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2012</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2012. 12</p>
                          <p className="desc">제주국제공항 환급서비스 개시</p>
                        </li>
                        <li>
                          <p className="date">2012. 01</p>
                          <p className="desc">
                            벤처기업 등록 (기술보증기금 : 제20120108332호)
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2011</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2011. 07</p>
                          <p className="desc">
                          신한은행 - 내국세 지정운영업체 업무 제휴 계약 체결
                          </p>
                        </li>
                        <li>
                          <p className="date">2011. 07</p>
                          <p className="desc">
                            김포국제공항 무인KIOSK 설치 및 운영
                          </p>
                        </li>
                        <li>
                          <p className="date">2011. 02</p>
                          <p className="desc">
                            환급창구 운영사업자 지정
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2010</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2010. 12</p>
                          <p className="desc">
                            신한 Love KOREA 카드 서비스 개시
                          </p>
                        </li>
                        <li>
                          <p className="date">2010. 08</p>
                          <p className="desc">
                            법인설립
                          </p>
                        </li>
                      </ul>
                    </li>
                     {/* 퍼블수정 : 20250516 연혁 추가 및 간격 수정 E */}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default History;
