import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import traveler_img01 from "@/assets/images/contents/traveler/traveler_img01.png";
import traveler_img03 from "@/assets/images/contents/traveler/traveler_img03.png";
import traveler_img04 from "@/assets/images/contents/traveler/traveler_img04.png";
import traveler_img05 from "@/assets/images/contents/traveler/traveler_img05.png";
import ico_copy from "@/assets/images/icon/ico_copy.png";
import ico_address from "@/assets/images/icon/ico_address.png";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
import traveler_img02 from "@/assets/images/contents/traveler/traveler_img02.png";
import traveler_modal_img01 from "@/assets/images/contents/traveler/traveler_modal_img01.png";
import traveler_modal_img02 from "@/assets/images/contents/traveler/traveler_modal_img02.png";
import traveler_modal_img03 from "@/assets/images/contents/traveler/traveler_modal_img03.png";
import traveler_modal_img04 from "@/assets/images/contents/traveler/traveler_modal_img04.png";
import traveler_modal_img05 from "@/assets/images/contents/traveler/traveler_modal_img05.png";

// qr 이미지
import qr_img01 from "@/assets/images/dump/qr_ail.png";
import qr_img02 from "@/assets/images/dump/qr_cube.png";
import qr_img03 from "@/assets/images/dump/qr_yunu.png";
import qr_img04 from "@/assets/images/dump/qr_wechat.png";

const RefundMethods = () => {
  const { lang } = useParams();
  const [openLarge, setOpenLarge] = useState(false);
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

  const handleModalOpen = (modalId) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalId]: true,
    }));
  };

  const handleModalClose = (modalId) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalId]: false,
    }));
  };

  const handleLoginModalOpen = (modalId) => {
    setOpenLoginModal((prev) => ({
      ...prev,
      [modalId]: true,
    }));
  };

  const handleLoginModalClose = (modalId) => {
    setOpenLoginModal((prev) => ({
      ...prev,
      [modalId]: false,
    }));
  };

  return (
    <>
      <div className="refund-methods-wrap">
        <section className="inner type02">
          <div className="hgroup-wrap sub">
            {/* 퍼블수정 : 20250515 calll 수정 */}
            <p className="f48-700-140">환급 절차 안내</p>
          </div>
        </section>
        <section>
          <div className="component-group">
            <div className="from-group">
              <Tabs defaultValue="step01" className="tab-wrap">
                <TabsList>
                  <TabsTrigger value="step01">즉시 환급</TabsTrigger>
                  <TabsTrigger value="step02">도심 환급</TabsTrigger>
                  <TabsTrigger value="step03">출국항 환급</TabsTrigger>
                  <TabsTrigger value="step04">모바일 환급</TabsTrigger>
                </TabsList>
                <TabsContent value="step01">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img01} alt="즉시 환급" />
                      </div>
                      {/* 퍼블수정 20250515 구조변경경 */}
                      <div className="txt-cont">
                        <div className="mark-bx">
                          {/* 20250527 퍼블수정 */}
                          <Link
                            to={`/${lang}/contact/inquiries-faq`}
                            className="link"
                          >
                            <img src={traveler_img02} alt="즉시 환급" />
                          </Link>
                        </div>
                        <p className="tit">즉시 환급</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <span>#물품</span>
                            <p>
                              사후면세사업장에서 물품을구매하는 시점에
                              {/* 20250527 : 문구 수정 */}
                              환급액을 차감한 금액으로 결제하는 제도
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">환급 절차</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 1</p>
                                  <p className="tit">물품 구매</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">구매 기준</p>
                                <ul className="desc-list">
                                  <li>
                                    1회 구매금액 15,000원 이상 100만원 미만
                                  </li>
                                  {/* 20250527 : 문구 수정 */}
                                  <li>1인당 최대 구매금액 500만원 이하</li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 2</p>
                                  <p className="tit">결제</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">환급 방법</p>
                                  <ul className="desc-list">
                                    <li>
                                    {/* 20250527 : 문구 수정 */}
                                    여권 조회를 통해 즉시환급 가능 여부를 확인
                                    </li>
                                    {/* 20250527 : 문구 수정 */}
                                    <li>구매금액에서 세액 상당액을 차감하여 결제</li>
                                    {/* 20250527 : 문구 수정 */}
                                    <li>환급전표 수령</li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">필요 서류</p>
                                  <ul className="desc-list">
                                    <li>여권</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 3</p>
                                  <p className="tit">출국</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">출국 방법</p>
                                <ul className="desc-list">
                                  {/* 20250527 : 문구 수정 */}
                                  <li>
                                  별도의 세관반출 또는 환급신청 불필요
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="step02">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img03} alt="도심 환급" />
                      </div>
                      {/* 퍼블수정 20250515 구조변경경 */}
                      <div className="txt-cont">
                        <div className="mark-bx">
                          {/* 20250527 퍼블수정 */}
                          <Link
                            to={`/${lang}/contact/inquiries-faq`}
                            className="link"
                          >
                            <img src={traveler_img02} alt="도심 환급" />
                          </Link>
                        </div>
                        <p className="tit">도심 환급</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <div className="desc-bx">
                              <span>#물품</span>
                              <span>#의료</span>
                              <span>#숙박</span>
                            </div>
                            {/* 20250527 : 문구 수정 */}
                            <p>
                              시내에 설치된 도심환급창구와 무인환급기(KIOSK)를
                              이용하여 환급받는 절차
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">환급 절차</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 1</p>
                                  {/* 퍼블수정 20250515 텍스트수정 */}
                                  <p className="tit">물품 구매 및 결제</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">구매 기준</p>
                                  <ul className="desc-list">
                                    {/* 20250527 : 문구 수정 */}
                                    <li>
                                      1회 구매금액 15,000원 이상 600만원 이하
                                    </li>
                                    {/* 퍼블수정 20250515 텍스트수정 */}
                                    <li>총 구매금액 한도 없음</li>
                                    <li>
                                      결제 시 환급전표 수령 (미수령 시 환급
                                      불가)
                                    </li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">필요 서류</p>
                                  <ul className="desc-list">
                                    <li>여권</li>
                                    {/* 퍼블수정 20250515 텍스트수정 */}
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 2</p>
                                  <p className="tit">환급금 수령</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">환급 방법</p>
                                  <ul className="desc-list">
                                    {/* 20250527 : 문구 수정 */}
                                    <li>
                                      여권과 환급전표를 환급창구에
                                      제시하거나KIOSK에 스캔 후 환급
                                    </li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">환급 수단</p>
                                  <ul className="desc-list">
                                    <li>현금, 알리페이, 위챗페이</li>
                                    <li>출국항별 상이</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 3</p>
                                  <p className="tit">세관 반출 신고</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">신고 방법</p>
                                <ul className="desc-list">
                                  <li>
                                    출국 전 세관에 구매물품과 여권을 제시하고
                                    환급 전표 반출 확인 필수
                                  </li>
                                  {/* 20250527 : 문구 수정 */}
                                  <li>
                                    미반출 시, 신용카드 담보금 청구
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 4</p>
                                  <p className="tit">출국</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">출국 기준</p>
                                <ul className="desc-list">
                                  <li>환급전표 발행일로부터 3개월 이내 출국</li>
                                  <li>현금 환급 시, 2주 이내 출국</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="refund-list-section">
                    <div className="inner type02">
                      <div className="hgroup-wrap sub">
                        <p className="f40-700-140">환급 위치</p>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <Tabs
                            defaultValue="step01"
                            className="tab-wrap type02"
                          >
                            <TabsList>
                              <TabsTrigger value="step01">전체</TabsTrigger>
                              <TabsTrigger value="step02">서울</TabsTrigger>
                              <TabsTrigger value="step03">인천</TabsTrigger>
                              <TabsTrigger value="step04">대구</TabsTrigger>
                              <TabsTrigger value="step05">부산</TabsTrigger>
                            </TabsList>
                            <TabsContent value="step01">
                              <div className="refund-list-bx">
                                <div className="refund-list-item">
                                  <div className="top-bx">
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                      <span className="badge badge-skyblue type02">
                                        부산
                                      </span>
                                    </div>
                                    <div className="txt-bx">
                                      <p className="f20-700-140">
                                        롯데호텔 부산
                                      </p>
                                      <span className="f18-400-160">
                                        부산광역시 부산진구 가야대로 772,
                                        롯데호텔 부산 1층
                                      </span>
                                    </div>
                                    <div className="refund-info-bx">
                                      <dl>
                                        <dt>연락처</dt>
                                        <dd>070-5070-0422</dd>
                                      </dl>
                                      <dl>
                                        <dt>운영 시간</dt>
                                        <dd>08:00 ~ 13:00 (화,수 휴무)</dd>
                                      </dl>
                                    </div>
                                  </div>
                                  <div className="bot-bx">
                                    <div className="btn-wrap">
                                      <div className="btn-inner">
                                        <Button className="btn">
                                          주소 복사
                                          <img
                                            src={ico_copy}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                        <Button
                                          className="btn map"
                                          onClick={() =>
                                            handleModalOpen("modal1")
                                          }
                                        >
                                          약도 보기
                                          <img
                                            src={ico_address}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="refund-list-item">
                                  <div className="top-bx">
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                      <span className="badge badge-skyblue type02">
                                        부산
                                      </span>
                                    </div>
                                    <div className="txt-bx">
                                      <p className="f20-700-140">
                                        롯데백화점 부산본점
                                      </p>
                                      <span className="f18-400-160">
                                        부산광역시 부산진구 가야대로 772,
                                        롯데백화점 부산본점 7층
                                      </span>
                                    </div>
                                    <div className="refund-info-bx">
                                      <dl>
                                        <dt>연락처</dt>
                                        <dd>070-5070-0422</dd>
                                      </dl>
                                      <dl>
                                        <dt>운영 시간</dt>
                                        <dd>08:00 ~ 13:00 (화,수 휴무)</dd>
                                      </dl>
                                    </div>
                                  </div>
                                  <div className="bot-bx">
                                    <div className="btn-wrap">
                                      <div className="btn-inner">
                                        <Button className="btn">
                                          주소 복사
                                          <img
                                            src={ico_copy}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                        <Button
                                          className="btn map"
                                          onClick={() =>
                                            handleModalOpen("modal2")
                                          }
                                        >
                                          약도 보기
                                          <img
                                            src={ico_address}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="refund-list-item">
                                  <div className="top-bx">
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                      <span className="badge badge-skyblue type02">
                                        부산
                                      </span>
                                    </div>
                                    <div className="txt-bx">
                                      <p className="f20-700-140">
                                        롯데백화점 부산본점
                                      </p>
                                      <span className="f18-400-160">
                                        부산광역시 부산진구 가야대로 772,
                                        롯데백화점 부산본점 7층
                                      </span>
                                    </div>
                                  </div>
                                  <div className="bot-bx">
                                    <div className="btn-wrap">
                                      <div className="btn-inner">
                                        <Button className="btn">
                                          주소 복사
                                          <img
                                            src={ico_copy}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                        <Button
                                          className="btn map"
                                          onClick={() =>
                                            handleModalOpen("modal3")
                                          }
                                        >
                                          약도 보기
                                          <img
                                            src={ico_address}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="refund-list-item">
                                  <div className="top-bx">
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                      <span className="badge badge-skyblue type02">
                                        부산
                                      </span>
                                    </div>
                                    <div className="txt-bx">
                                      <p className="f20-700-140">
                                        롯데백화점 부산본점
                                      </p>
                                      <span className="f18-400-160">
                                        부산광역시 부산진구 가야대로 772,
                                        롯데백화점 부산본점 7층
                                      </span>
                                    </div>
                                  </div>
                                  <div className="bot-bx">
                                    <div className="btn-wrap">
                                      <div className="btn-inner">
                                        <Button className="btn">
                                          주소 복사
                                          <img
                                            src={ico_copy}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                        <Button
                                          className="btn map"
                                          onClick={() =>
                                            handleModalOpen("modal4")
                                          }
                                        >
                                          약도 보기
                                          <img
                                            src={ico_address}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="refund-list-item">
                                  <div className="top-bx">
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                      <span className="badge badge-skyblue type02">
                                        부산
                                      </span>
                                    </div>
                                    <div className="txt-bx">
                                      <p className="f20-700-140">
                                        롯데백화점 부산본점
                                      </p>
                                      <span className="f18-400-160">
                                        부산광역시 부산진구 가야대로 772,
                                        롯데백화점 부산본점 7층
                                      </span>
                                    </div>
                                  </div>
                                  <div className="bot-bx">
                                    <div className="btn-wrap">
                                      <div className="btn-inner">
                                        <Button className="btn">
                                          주소 복사
                                          <img
                                            src={ico_copy}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                        <Button
                                          className="btn map"
                                          onClick={() =>
                                            handleModalOpen("modal5")
                                          }
                                        >
                                          약도 보기
                                          <img
                                            src={ico_address}
                                            alt="아이콘"
                                            className="ico-refund"
                                          />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="step02">
                              <div className="temp-bx">test</div>
                            </TabsContent>
                            <TabsContent value="step03">
                              <div className="temp-bx">test</div>
                            </TabsContent>
                            <TabsContent value="step04">
                              <div className="temp-bx">test</div>
                            </TabsContent>
                            <TabsContent value="step05">
                              <div className="temp-bx">test</div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="step03">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img04} alt="즉시 환급" />
                      </div>
                      {/* 퍼블수정 20250515 구조변경경 */}
                      <div className="txt-cont">
                        <div className="mark-bx">
                          {/* 20250527 퍼블수정 */}
                          <Link
                            to={`/${lang}/contact/inquiries-faq`}
                            className="link"
                          >
                            <img src={traveler_img02} alt="즉시 환급" />
                          </Link>
                        </div>
                        <p className="tit">출국항 환급</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <div className="desc-bx">
                              <span>#물품</span>
                              <span>#의료</span>
                              <span>#숙박</span>
                            </div>
                            {/* 20250527 : 문구 수정 */}
                            <p>
                              출국 전 출국항에 설치된 환급창구와
                              무인환급기(KIOSK)를 이용하여 환급받는 절차
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">환급 절차</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 1</p>
                                  <p className="tit">물품 구매</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">구매 기준</p>
                                  <ul className="desc-list">
                                     {/* 20250527 : 문구 수정 */}
                                    <li>1회 구매금액 15,000원 이상</li>
                                    <li>총 구매금액 한도 없음</li>
                                    <li>
                                      결제 시 환급전표 수령 (미수령 시 환급
                                      불가)
                                    </li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">필요 서류</p>
                                  <ul className="desc-list">
                                    <li>여권</li>
                                     {/* 20250527 : 문구 수정 : 환급전표 삭제 */}                       
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 2</p>
                                  <p className="tit">세관 반출 신고</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">신고 방법</p>
                                <ul className="desc-list">
                                  <li>
                                    출국 전 세관에 구매물품과 여권을 제시하고
                                    환급 전표 반출 확인 필수
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 3</p>
                                  <p className="tit">환급금 결제</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">환급 방법</p>
                                  <ul className="desc-list">
                                    {/* 20250527 : 문구 수정 */}
                                    <li>
                                      여권과 환급 전표를 환급창구에 제시하거나
                                      KIOSK에 스캔 후 환급
                                    </li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">환급 수단</p>
                                  <ul className="desc-list">
                                    {/* 20250527 : 문구 수정 */}
                                    <li>
                                      현금(신용카드 담보 필수, 담보금액은
                                      환급금의 115%)
                                    </li>
                                    {/* <li>신용카드(VISA, MASTER, JCB 가능)</li> */}
                                    <li>알리페이</li>
                                    <li>위챗페이</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 4</p>
                                  <p className="tit">출국</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">출국 방법</p>
                                <ul className="desc-list">
                                  <li>
                                    환급 전표 발행일로부터 3개월 이내 출국
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="refund-list-section">
                    <div className="inner type02">
                      <div className="hgroup-wrap sub">
                        <p className="f40-700-140">환급 위치</p>
                      </div>
                      <div className="refund-list-bx">
                        <div className="refund-list-item">
                          <div className="top-bx">
                            <div className="txt-bx">
                              <p className="f20-700-140">인천국제공항 T1</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>세관 위치</dt>
                                <dd>3층 E, J카운터 부근</dd>
                              </dl>
                              <dl>
                                <dt>창구 위치</dt>
                                <dd>3층 28번 게이트 부근</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>운영시간</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">24시간</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        무인
                                      </span>
                                    </div>
                                    <span className="txt">24시간</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>지급 가능 통화</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">
                                      KRW, USD, CNY, JPY
                                    </span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        무인
                                      </span>
                                    </div>
                                    <span className="txt">
                                      KRW, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bot-bx">
                            <div className="btn-wrap">
                              <div className="btn-inner">
                                <Button
                                  className="btn map"
                                  onClick={() => handleModalOpen("modal1")}
                                >
                                  약도 보기
                                  <img
                                    src={ico_address}
                                    alt="아이콘"
                                    className="ico-refund"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="refund-list-item">
                          <div className="top-bx">
                            <div className="txt-bx">
                              <p className="f20-700-140">인천국제공항 T2</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>세관 위치</dt>
                                <dd>3층 F, G 카운터 부근</dd>
                              </dl>
                              <dl>
                                <dt>창구 위치</dt>
                                <dd>3층 225번, 249번, 274번 게이트 부근</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>운영시간</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">07:00 ~ 21:30</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        무인
                                      </span>
                                    </div>
                                    <span className="txt">24시간</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>지급 가능 통화</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">
                                    KRW, USD, JPY, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        무인
                                      </span>
                                    </div>
                                    <span className="txt">
                                      KRW, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bot-bx">
                            <div className="btn-wrap">
                              <div className="btn-inner">
                                <Button
                                  className="btn map"
                                  onClick={() => handleModalOpen("modal2")}
                                >
                                  약도 보기
                                  <img
                                    src={ico_address}
                                    alt="아이콘"
                                    className="ico-refund"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="refund-list-item">
                          <div className="top-bx">
                            <div className="txt-bx">
                              <p className="f20-700-140">김포국제공항</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>세관 위치</dt>
                                <dd>2층 1번 게이트 부근</dd>
                              </dl>
                              <dl>
                                <dt>창구 위치</dt>
                                <dd>3층 36번 게이트 부근</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>운영시간</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">06:30 ~ 20:00</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        무인
                                      </span>
                                    </div>
                                    <span className="txt">24시간</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>지급 가능 통화</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">
                                    KRW, USD, JPY, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        무인
                                      </span>
                                    </div>
                                    <span className="txt">
                                      KRW, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bot-bx">
                            <div className="btn-wrap">
                              <div className="btn-inner">
                                <Button
                                  className="btn map"
                                  onClick={() => handleModalOpen("modal3")}
                                >
                                  약도 보기
                                  <img
                                    src={ico_address}
                                    alt="아이콘"
                                    className="ico-refund"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="refund-list-item">
                          <div className="top-bx">
                            <div className="txt-bx">
                              <p className="f20-700-140">김해국제공항</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>세관 위치</dt>
                                <dd>2층 B24 체크인 카운터 부근</dd>
                              </dl>
                              <dl>
                                <dt>창구 위치</dt>
                                <dd>2층 4번 게이트 부근</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>운영시간</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">06:30 ~ 21:00</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>지급 가능 통화</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">
                                      KRW, USD, JPY, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bot-bx">
                            <div className="btn-wrap">
                              <div className="btn-inner">
                                <Button
                                  className="btn map"
                                  onClick={() => handleModalOpen("modal4")}
                                >
                                  약도 보기
                                  <img
                                    src={ico_address}
                                    alt="아이콘"
                                    className="ico-refund"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="refund-list-item">
                          <div className="top-bx">
                            <div className="txt-bx">
                              <p className="f20-700-140">제주국제공항</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>세관 위치</dt>
                                <dd>3층 5번 게이트 부근</dd>
                              </dl>
                              <dl>
                                <dt>창구 위치</dt>
                                <dd>3층 16번 게이트 부근</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>운영시간</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">06:00 ~ 22:00</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>지급 가능 통화</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        유인
                                      </span>
                                    </div>
                                    <span className="txt">
                                      KRW, USD, CNY, 알리페이, 위챗페이
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="bot-bx">
                            <div className="btn-wrap">
                              <div className="btn-inner">
                                <Button
                                  className="btn map"
                                  onClick={() => handleModalOpen("modal5")}
                                >
                                  약도 보기
                                  <img
                                    src={ico_address}
                                    alt="아이콘"
                                    className="ico-refund"
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 20250526 퍼블 추가 */}
                      <div className="info-bx border-none">
                        <strong className="info-txt">유의사항</strong>
                        <ul className="info-list">
                          <li className="info-item">
                            <p>
                              상기외 다른 출국항은 환급창구 대신 메일박스를
                              운영하고 있습니다. 환급 신청을 원하는 경우
                              메일박스를 이용해주시기 바랍니다.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="step04">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img05} alt="즉시 환급" />
                      </div>
                      {/* 퍼블수정 20250515 구조변경경 */}
                      <div className="txt-cont">
                        <div className="mark-bx">
                          {/* 20250527 퍼블수정 */}
                          <Link
                            to={`/${lang}/contact/inquiries-faq`}
                            className="link"
                          >
                            <img src={traveler_img02} alt="즉시 환급" />
                          </Link>
                        </div>
                        <p className="tit">모바일 환급</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <div className="desc-bx">
                              <span>#물품</span>
                              <span>#의료</span>
                              <span>#숙박</span>
                            </div>
                            <p>
                              출국 전후에 모바일 시스템을 이용하여 환급받는 절차
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">환급 절차</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 1</p>
                                  <p className="tit">물품 구매</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">구매 기준</p>
                                <ul className="desc-list">
                                  {/* 20250527 : 문구 수정 */}
                                  <li>1회 구매금액 15,000원 이상</li>
                                   {/* 20250527 : 문구 수정 */}
                                  <li>총 구매금액 한도 없음</li>
                                  <li>
                                    결제 시 환급전표 수령 (미수령 시 환급 불가)
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 2</p>
                                  <p className="tit">세관 반출 신고</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <div className="grid-item">
                                  <p className="tit">신고 방법</p>
                                  <ul className="desc-list">
                                    {/* 20250527 : 문구 수정 */}
                                    <li>
                                      출국 전 세관에 구매물품과 여권을 제시하고 환급 전표 반출 확인 필수
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 3</p>
                                  <p className="tit">환급 요청</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <div className="grid-item">
                                  <p className="tit">요청 방법</p>
                                  <ul className="desc-list">
                                    <li>
                                      큐브리펀드 모바일 환급신청 사이트 또는
                                      알리페이앱을 이용하여 환급 요청
                                    </li>
                                    <li>
                                      <Link to="https://qr.alipay.com/_d?_b=PAI_LOGIN_DY&amp;securityId=web%257Cauthcenter_qrcod// e_login%257Cfce82111-cc97-4acc-b42c-ba2c31126794RZ54">알리페이앱 바로가기</Link>
                                      <a
              href="m.cuberefund.com"
              target="_blank"
              rel="noopener noreferrer"
            >
                                        큐브리펀드 모바일 환급신청 바로가기
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">STEP 4</p>
                                  <p className="tit">출국</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">출국 기준</p>
                                <ul className="desc-list">
                                  <li>
                                    환급 전표 발행일로부터 3개월 이내 출국
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* 20250527 : 모바일 환급 바로가기 추가 */}
                    <div className="refund-methods-mid-bx mobile-refund">
                      <div className="left-bx">
                        <p className="f40-700-130">
                          모바일 환급
                          <br />
                          바로가기
                        </p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="mobile-refund-list">
                            {/* 알리페이 */}
                            <li>
                              <p className="tit">
                                <i
                                  className="ico ico-alipay-mini"
                                  role="img"
                                  aria-label="알리페이"
                                ></i>
                                알리페이 환급
                              </p>
                              <button
                                className="link"
                                type="button"
                                onClick={() => handleLoginModalOpen("modal1")}
                              >
                                알리페이 QR보기
                              </button>
                              <Link
                                to="https://qr.alipay.com/_d?_b=PAI_LOGIN_DY&amp;securityId=web%257Cauthcenter_qrcode_login%257Cfce82111-cc97-4acc-b42c-ba2c31126794RZ54"
                                className="btn-app mo-show"
                                type="button"
                              >
                                알리페이 환급 바로가기
                              </Link>
                            </li>
                            {/* 큐브리펀드 */}
                            <li>
                              <p className="tit">
                                <i
                                  className="ico ico-cube-mini"
                                  role="img"
                                  aria-label="큐브리펀드"
                                ></i>
                                큐브리펀드 환급
                              </p>
                              <button
                                className="link"
                                type="button"
                                onClick={() => handleLoginModalOpen("modal2")}
                              >
                                큐브리펀드 QR 보기
                              </button>
                              <Link
                                to="https://m.cuberefund.com"
                                className="btn-app mo-show"
                                type="button"
                              >
                                큐브리펀드 환급 바로가기
                              </Link>
                            </li>
                            {/* Yun-U Pay 환급 */}
                            {/* <li className="pc-show">
                              <p className="tit"><i className="ico ico-yunu-mini" role="img" aria-label="Yun-U"></i>Yun-U Pay 환급</p>
                              <button className="link pc-show" type="button" onClick={() => handleLoginModalOpen('modal3')}>Yun-U Pay QR 보기</button>
                              <Link to="/" className="btn-app mo-show" type="button">Yun-U Pay환급 바로가기</Link>
                            </li> */}
                            {/* WeChat Pay 환급 */}
                            {/* <li className="pc-show">
                              <p className="tit"><i className="ico ico-wechat-mini" role="img" aria-label="wechat"></i>WeChat Pay 환급</p>
                              <button className="link pc-show" type="button" onClick={() => handleLoginModalOpen('modal4')}>WeChat Pay QR 보기</button>
                              <Link to="/" className="btn-app mo-show" type="button">WeChat Pay 환급 바로가기</Link>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
      <Modal
        isOpen={openModals.modal1}
        onClose={() => handleModalClose("modal1")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal1")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
        className="map-modal"
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img01} alt="구글지도" />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal2}
        onClose={() => handleModalClose("modal2")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal2")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
        className="map-modal"
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img02} alt="구글지도" />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal3}
        onClose={() => handleModalClose("modal3")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal3")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
        className="map-modal"
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img03} alt="구글지도" />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal4}
        onClose={() => handleModalClose("modal4")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal4")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
        className="map-modal"
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img04} alt="구글지도" />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal5}
        onClose={() => handleModalClose("modal5")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal5")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img05} alt="구글지도" />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={openLoginModal.modal1}
        onClose={() => handleLoginModalClose("modal1")}
        size="small"
        className="login mini-modal"
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
        <div className="modal-content modal-qr">
          <div className="qr-content">
            <img src={qr_img01} alt="qr 코드" />
          </div>
          <p className="qr-desc">
            QR 코드를 스캔하시면
            <br />
            해당 페이지로 이동합니다.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={openLoginModal.modal2}
        onClose={() => handleLoginModalClose("modal2")}
        size="small"
        className="login mini-modal"
        title={
          <div className="modal-title-wrap">
            <button
              className="modal-close"
              onClick={() => handleLoginModalClose("modal2")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <div className="modal-content modal-qr">
          <div className="qr-content">
            <img src={qr_img02} alt="qr 코드" />
          </div>
          <p className="qr-desc">
            QR 코드를 스캔하시면
            <br />
            해당 페이지로 이동합니다.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={openLoginModal.modal3}
        onClose={() => handleLoginModalClose("modal3")}
        size="small"
        className="login mini-modal"
        title={
          <div className="modal-title-wrap">
            <button
              className="modal-close"
              onClick={() => handleLoginModalClose("modal3")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <div className="modal-content modal-qr">
          <div className="qr-content">
            <img src={qr_img03} alt="qr 코드" />
          </div>
          <p className="qr-desc">
            QR 코드를 스캔하시면
            <br />
            해당 페이지로 이동합니다.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={openLoginModal.modal4}
        onClose={() => handleLoginModalClose("modal4")}
        size="small"
        className="login mini-modal"
        title={
          <div className="modal-title-wrap">
            <button
              className="modal-close"
              onClick={() => handleLoginModalClose("modal4")}
            >
              <img src={ico_close} alt="닫기" />
            </button>
          </div>
        }
      >
        <div className="modal-content modal-qr">
          <div className="qr-content">
            <img src={qr_img04} alt="qr 코드" />
          </div>
          <p className="qr-desc">
            QR 코드를 스캔하시면
            <br />
            해당 페이지로 이동합니다.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default RefundMethods;
