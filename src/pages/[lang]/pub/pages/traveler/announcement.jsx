import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import traveler from "@/assets/images/dump/traveler.png";
import traveler_modal_img01 from "@/assets/images/contents/traveler/traveler_modal_img01.png";
import traveler_modal_img02 from "@/assets/images/contents/traveler/traveler_modal_img02.png";
import traveler_modal_img03 from "@/assets/images/contents/traveler/traveler_modal_img03.png";
import traveler_modal_img04 from "@/assets/images/contents/traveler/traveler_modal_img04.png";
import traveler_modal_img05 from "@/assets/images/contents/traveler/traveler_modal_img05.png";
import ico_copy from "@/assets/images/icon/ico_copy.png";
import ico_address from "@/assets/images/icon/ico_address.png";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
import { useTranslation } from "react-i18next";

const Announcement = () => {
  const [openLarge, setOpenLarge] = useState(false);
  const [openModals, setOpenModals] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
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
  const { t } = useTranslation();

  return (
    <div className="announcement-wrap">
      <section className="inner type02">
        <div className="hgroup-wrap sub">
          <p className="f48-700-140">{t("traveler.announcement.title")}</p>
        </div>
      </section>
      <section>
        <div className="component-group">
          <div className="from-group">
            <Tabs defaultValue="step01" className="tab-wrap">
              <TabsList>
                <TabsTrigger value="step01">
                  {t("traveler.announcement.tabs.cityRefund")}
                </TabsTrigger>
                <TabsTrigger value="step02">
                  {t("traveler.announcement.tabs.departureRefund")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="step01">
                <section className="announcement-section">
                  <div className="inner type02">
                    <div className="hgroup-wrap sub">
                      <p className="f40-700-140">
                        {t("traveler.announcement.location.title")}
                      </p>
                    </div>
                    <div className="component-group">
                      <div className="from-group">
                        <Tabs defaultValue="step01" className="tab-wrap type02">
                          <TabsList>
                            <TabsTrigger value="step01">
                              {t("traveler.announcement.location.tabs.all")}
                            </TabsTrigger>
                            <TabsTrigger value="step02">
                              {t("traveler.announcement.location.tabs.seoul")}
                            </TabsTrigger>
                            <TabsTrigger value="step03">
                              {t("traveler.announcement.location.tabs.incheon")}
                            </TabsTrigger>
                            <TabsTrigger value="step04">
                              {t("traveler.announcement.location.tabs.daegu")}
                            </TabsTrigger>
                            <TabsTrigger value="step05">
                              {t("traveler.announcement.location.tabs.busan")}
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="step01">
                            <div className="refund-list-bx">
                              <div className="refund-list-item">
                                <div className="top-bx">
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">
                                      {t(
                                        "traveler.announcement.badges.staffed"
                                      )}
                                    </span>
                                    <span className="badge badge-skyblue type02">
                                      {t(
                                        "traveler.announcement.badges.cities.busan"
                                      )}
                                    </span>
                                  </div>
                                  <div className="txt-bx">
                                    <p className="f20-700-140">
                                      {t(
                                        "traveler.announcement.locations.lotteHotelBusan.name"
                                      )}
                                    </p>
                                    <span className="f18-400-160">
                                      {t(
                                        "traveler.announcement.locations.lotteHotelBusan.address"
                                      )}
                                    </span>
                                  </div>
                                  <div className="refund-info-bx">
                                    <dl>
                                      <dt>
                                        {t(
                                          "traveler.announcement.locations.lotteHotelBusan.contact"
                                        )}
                                      </dt>
                                      <dd>
                                        {t(
                                          "traveler.announcement.locations.lotteHotelBusan.hours"
                                        )}
                                      </dd>
                                    </dl>
                                  </div>
                                </div>
                                <div className="bot-bx">
                                  <div className="btn-wrap">
                                    <div className="btn-inner">
                                      <Button className="btn">
                                        {t(
                                          "traveler.announcement.buttons.copyAddress"
                                        )}
                                        <img
                                          src={ico_copy}
                                          alt={t(
                                            "traveler.announcement.icons.alt"
                                          )}
                                          className="ico-refund"
                                        />
                                      </Button>
                                      <Button
                                        className="btn"
                                        onClick={() => setOpenLarge(true)}
                                      >
                                        {t(
                                          "traveler.announcement.buttons.viewMap"
                                        )}
                                        <img
                                          src={ico_address}
                                          alt={t(
                                            "traveler.announcement.icons.alt"
                                          )}
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
                                      {t(
                                        "traveler.announcement.badges.staffed"
                                      )}
                                    </span>
                                    <span className="badge badge-skyblue type02">
                                      {t(
                                        "traveler.announcement.badges.cities.busan"
                                      )}
                                    </span>
                                  </div>
                                  <div className="txt-bx">
                                    <p className="f20-700-140">
                                      {t(
                                        "traveler.announcement.locations.lotteDepartmentBusan.name"
                                      )}
                                    </p>
                                    <span className="f18-400-160">
                                      {t(
                                        "traveler.announcement.locations.lotteDepartmentBusan.address"
                                      )}
                                    </span>
                                  </div>
                                  <div className="refund-info-bx">
                                    <dl>
                                      <dt>
                                        {t(
                                          "traveler.announcement.locations.lotteDepartmentBusan.contact"
                                        )}
                                      </dt>
                                      <dd>
                                        {t(
                                          "traveler.announcement.locations.lotteDepartmentBusan.hours"
                                        )}
                                      </dd>
                                    </dl>
                                  </div>
                                </div>
                                <div className="bot-bx">
                                  <div className="btn-wrap">
                                    <div className="btn-inner">
                                      <Button className="btn">
                                        {t(
                                          "traveler.announcement.buttons.copyAddress"
                                        )}
                                        <img
                                          src={ico_copy}
                                          alt={t(
                                            "traveler.announcement.icons.alt"
                                          )}
                                          className="ico-refund"
                                        />
                                      </Button>
                                      <Button
                                        className="btn"
                                        onClick={() => setOpenLarge(true)}
                                      >
                                        {t(
                                          "traveler.announcement.buttons.viewMap"
                                        )}
                                        <img
                                          src={ico_address}
                                          alt={t(
                                            "traveler.announcement.icons.alt"
                                          )}
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
              <TabsContent value="step02">
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
                                    3층 225번, 249번, 274번 게이트 부근
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
                                    KRW, USD, JPY, 알리페이
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
            </Tabs>
          </div>
        </div>
      </section>
      <Modal
        isOpen={openModals.modal1}
        onClose={() => handleModalClose("modal1")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">
              {t("traveler.announcement.modal.title")}
            </h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal1")}
            >
              <img
                src={ico_close}
                alt={t("traveler.announcement.modal.close")}
              />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img
              src={traveler_modal_img01}
              alt={t("traveler.announcement.modal.mapAlt")}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal2}
        onClose={() => handleModalClose("modal2")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">
              {t("traveler.announcement.modal.title")}
            </h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal2")}
            >
              <img
                src={ico_close}
                alt={t("traveler.announcement.modal.close")}
              />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img
              src={traveler_modal_img02}
              alt={t("traveler.announcement.modal.mapAlt")}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal3}
        onClose={() => handleModalClose("modal3")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">
              {t("traveler.announcement.modal.title")}
            </h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal3")}
            >
              <img
                src={ico_close}
                alt={t("traveler.announcement.modal.close")}
              />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img
              src={traveler_modal_img03}
              alt={t("traveler.announcement.modal.mapAlt")}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal4}
        onClose={() => handleModalClose("modal4")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">
              {t("traveler.announcement.modal.title")}
            </h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal4")}
            >
              <img
                src={ico_close}
                alt={t("traveler.announcement.modal.close")}
              />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img
              src={traveler_modal_img04}
              alt={t("traveler.announcement.modal.mapAlt")}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal5}
        onClose={() => handleModalClose("modal5")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">
              {t("traveler.announcement.modal.title")}
            </h3>
            <button
              className="modal-close"
              onClick={() => handleModalClose("modal5")}
            >
              <img
                src={ico_close}
                alt={t("traveler.announcement.modal.close")}
              />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img
              src={traveler_modal_img05}
              alt={t("traveler.announcement.modal.mapAlt")}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Announcement;
