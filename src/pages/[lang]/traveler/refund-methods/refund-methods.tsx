import {useState, useCallback} from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
// import { Button } from "@/components/ui/button";
import traveler_img01 from "@/assets/images/contents/traveler/traveler_img01.png";
import traveler_img03 from "@/assets/images/contents/traveler/traveler_img03.png";
import traveler_img04 from "@/assets/images/contents/traveler/traveler_img04.png";
import traveler_img05 from "@/assets/images/contents/traveler/traveler_img05.png";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
// import ico_copy from "@/assets/images/icon/ico_copy.png";
// import ico_address from "@/assets/images/icon/ico_address.png";
import traveler_img02 from "@/assets/images/contents/traveler/traveler_img02.png";
import traveler_modal_img01 from "@/assets/images/contents/traveler/traveler_modal_img01.png";
import traveler_modal_img02 from "@/assets/images/contents/traveler/traveler_modal_img02.png";
import traveler_modal_img03 from "@/assets/images/contents/traveler/traveler_modal_img03.png";
import traveler_modal_img04 from "@/assets/images/contents/traveler/traveler_modal_img04.png";
import traveler_modal_img05 from "@/assets/images/contents/traveler/traveler_modal_img05.png";

// 구글이미지 넣어주세요
// import {getCommonCodeList} from "@/api/services/common-code.ts";
// import {toast} from "@/hooks/use-toast.ts";
// import {getRefundCounterList} from "@/api/services/refund-counter.ts";
// import {CommonCode} from "@/types/common-code.ts";
// import {RefundCounterDTO, RefundCounterListData} from "@/types/refund-counter.ts";
import {Link, useParams, useSearchParams} from "react-router-dom"; // useSearchParams 추가
import {TranslationDTO} from "@/types/translation.ts";
// import CityTaxRefundMapPage from "@/pages/[lang]/traveler/refund-methods/CityTaxRefundMap.tsx";
import {CommonAlertDialog} from "@/components/ui/common-alert-dialog.tsx";
import qr_img01 from "@/assets/images/dump/qr_ail.png";
import qr_img02 from "@/assets/images/dump/qr_cube.png";
// import qr_img03 from "@/assets/images/dump/qr_yunu.png";
// import qr_img04 from "@/assets/images/dump/qr_wechat.png";
import {useTranslation} from "react-i18next";
// import NodataCase from "@/pages/[lang]/pub/components/layouts/nodata-case.tsx";

const RefundMethods = () => {
  const { t } = useTranslation();
  // const [setCityTypes] = useState<CommonCode[]>();
  const [isAddressCopyComplete, setIsAddressCopyComplete] = useState(false);
  const [isAddressCopyFail, setIsAddressCopyFail] = useState(false);
  // const [allRefundCounterList, setAllRefundCounterList] = useState<RefundCounterListData>();
  // const [setRefundCounterCity] = useState<RefundCounterDTO[]>();
  // const [setSelectedCityTab] = useState("all");
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  // const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const [openModals, setOpenModals] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false
  });

  const [openLoginModal, setOpenLoginModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false
  });

  const [searchParams] = useSearchParams(); // useSearchParams 훅 사용
  const initialTab = searchParams.get('tab') || 'step01'; // URL에서 'tab' 파라미터 읽기, 없으면 'step01' 기본값

  // const handleModalOpen = (modalId:string) => {
  //   setOpenModals(prev => ({
  //     ...prev,
  //     [modalId]: true
  //   }));
  // };

  const handleModalClose = (modalId:string) => {
    setOpenModals(prev => ({
      ...prev,
      [modalId]: false
    }));
  };

  // const fetchCityType = async () => {
  //   try {
  //     const response = await getCommonCodeList('city');
  //     setCityTypes(response.data);
  //   } catch {
  //     toast({
  //       variant: "destructive",
  //       title: "지역 로드 실패",
  //       description: "지역을 불러오지 못했습니다.",
  //     });
  //   }
  // };

  // const fetchRefundCounterCityType = async (cityType:string) => {
  //   try {
  //     const response = await getRefundCounterList(cityType);
  //     setAllRefundCounterList(response.data);
  //     const refundCounter = response.data[trans].length > 0 ? response.data[trans] : response.data.en.length >0?response.data.en:response.data.ko;
  //     setRefundCounterCity(refundCounter);
  //     setSelectedCityTab(cityType);
  //   } catch {
  //     toast({
  //       variant: "destructive",
  //       title: "도심창구 로드 실패",
  //       description: "도심창구을 불러오지 못했습니다.",
  //     });
  //   }
  // };
  // const handleCopyClipBoard = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     setIsAddressCopyComplete(true);
  //     setIsAddressCopyFail(false); // 복사 성공 시 실패 상태 초기화
  //   } catch (error) {
  //     console.error("복사 실패:", error);
  //     setIsAddressCopyComplete(false); // 복사 실패 시 성공 상태 초기화
  //     setIsAddressCopyFail(true);
  //   }
  // };

  const handleLoginModalOpen = (modalId:string) => {
    setOpenLoginModal(prev => ({
      ...prev,
      [modalId]: true
    }));
  };

  const handleLoginModalClose = (modalId:string) => {
    setOpenLoginModal(prev => ({
      ...prev,
      [modalId]: false
    }));
  };

  // useEffect(() => {
  //   fetchCityType();
  //   fetchRefundCounterCityType('all');
  // }, []);

  // useEffect(() => {
  //   if( allRefundCounterList ) {
  //     const refundCounter = allRefundCounterList[trans].length > 0 ? allRefundCounterList[trans] : allRefundCounterList.en.length>0?allRefundCounterList.en:allRefundCounterList.ko;
  //     setRefundCounterCity(refundCounter);
  //   }
  // }, [trans,allRefundCounterList]);

  // handleTabChange 함수는 Tabs 컴포넌트의 onValueChange prop에 전달되지만,
  // 여기서는 단순히 초기값을 설정하므로 추가적인 로직이 필요하지 않습니다.
  const handleTabChange = useCallback(() => {
  }, []);

  return (
    <>
      <div className="refund-methods-wrap">
        <section className="inner type02">
          <div className="hgroup-wrap sub">
            <p className="f48-700-140">{t("refundProcedureGuide.title")}</p>
          </div>
        </section>
        <section>
          <div className="component-group">
            <div className="from-group">
              <Tabs defaultValue={initialTab} className="tab-wrap" onValueChange={handleTabChange}> {/* defaultValue를 initialTab으로 설정 */}
                <TabsList>
                  <TabsTrigger value="step01">{t("refundProcedureGuide.refundType.instantRefund")}</TabsTrigger>
                  <TabsTrigger value="step03">{t("refundProcedureGuide.refundType.airportRefund")}</TabsTrigger>
                  <TabsTrigger value="step02">{t("refundProcedureGuide.refundType.inCityRefund")}</TabsTrigger>
                  <TabsTrigger value="step04">{t("refundProcedureGuide.refundType.mobileRefund")}</TabsTrigger>
                </TabsList>
                <TabsContent value="step01">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img01} />
                      </div>
                      <div className="txt-cont">
                        <div className="mark-bx">
                          <Link
                            to={`/${lang}/contact/faq`}
                            className="link"
                          >
                            <img src={traveler_img02} />
                          </Link>
                        </div>
                        <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcessTit")}</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <span>{t("refundProcedureGuide.instantRefundSection.tag")}</span>
                            <p>
                              {t("refundProcedureGuide.instantRefundSection.description")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">{t("refundProcedureGuide.instantRefundSection.refundProcessTitle")}</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.instantRefundSection.refundProcess.step1.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step1.goodsPurchase.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step1.goodsPurchase.purchaseCriteria.title")}</p>
                                <ul className="desc-list">
                                  <li>
                                    {t("refundProcedureGuide.instantRefundSection.refundProcess.step1.goodsPurchase.purchaseCriteria.criteria1")}
                                  </li>
                                  <li>{t("refundProcedureGuide.instantRefundSection.refundProcess.step1.goodsPurchase.purchaseCriteria.criteria2")}</li>
                                  <li>{t("refundProcedureGuide.instantRefundSection.refundProcess.step1.goodsPurchase.purchaseCriteria.criteria3")}</li>
                                  <li className="no-dot">{t("refundProcedureGuide.instantRefundSection.refundProcess.step1.goodsPurchase.purchaseCriteria.criteria4")}</li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <div className="grid-item">
                                  {/* <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.refundMethod.title")}</p> */}
                                  <ul className="desc-list">
                                    <li>
                                      {t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.refundMethod.method1")}
                                    </li>
                                    <li>{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.refundMethod.method2")}</li>
                                    {/* <li>{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.refundMethod.method3")}</li> */}
                                  </ul>
                                </div>
                                {/* <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.refundMeans.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.instantRefundSection.refundProcess.step2.refundReceipt.refundMeans.passport")}</li>
                                  </ul>
                                </div> */}
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.instantRefundSection.refundProcess.step3.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step3.departure.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                {/* <p className="tit">{t("refundProcedureGuide.instantRefundSection.refundProcess.step3.departure.departureMethod.title")}</p> */}
                                <ul className="desc-list">
                                  <li>
                                    {t("refundProcedureGuide.instantRefundSection.refundProcess.step3.departure.departureMethod.method")}
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
                          <Link
                            to={`/${lang}/contact/faq`}
                            className="link"
                          >
                            <img src={traveler_img02} alt="도심 환급" />
                          </Link>
                        </div>
                        <p className="tit">{t("refundProcedureGuide.inCityRefundSection.title")}</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <div className="desc-bx">
                              <span>{t("refundProcedureGuide.inCityRefundSection.tag")}</span>
                            </div>
                            <p>
                              {t("refundProcedureGuide.inCityRefundSection.description")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">{t("refundProcedureGuide.inCityRefundSection.refundProcessTitle")}</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.purchaseCriteria.title")}</p>
                                  <ul className="desc-list">
                                    <li>
                                      {t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.purchaseCriteria.criteria1")}
                                    </li>
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.purchaseCriteria.criteria2")}</li>
                                    <li>
                                      {t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.purchaseCriteria.criteria3")}
                                    </li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.requiredDocuments.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step1.purchaseAndPayment.requiredDocuments.passport")}</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMethod.title")}</p>
                                  <ul className="desc-list">
                                    <li>
                                      {t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMethod.method")}
                                    </li>
                                    <li>
                                      {t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMethod.method1")}
                                    </li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMeans.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMeans.means1")}</li>
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMeans.means2")}</li>
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMeans.means3")}</li>
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMeans.means4")}</li>
                                    <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step2.refundReceipt.refundMeans.means5")}</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step3.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step3.customsDeclaration.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                {/* <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step3.customsDeclaration.howToProceed.title")}</p> */}
                                <ul className="desc-list">
                                  <li>
                                    {t("refundProcedureGuide.inCityRefundSection.refundProcess.step3.customsDeclaration.howToProceed.method1")}
                                  </li>
                                  <li>
                                    {t("refundProcedureGuide.inCityRefundSection.refundProcess.step3.customsDeclaration.howToProceed.method2")}
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step4.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step4.departure.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                {/* <p className="tit">{t("refundProcedureGuide.inCityRefundSection.refundProcess.step4.departure.departureRequirements.title")}</p> */}
                                <ul className="desc-list">
                                  <li>{t("refundProcedureGuide.inCityRefundSection.refundProcess.step4.departure.departureRequirements.criteria1")}</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* 20250604 : 현업 수정요청 주석 */}
                  {/* <section className="refund-list-section">
                    <div className="inner type02">
                      <div className="hgroup-wrap sub">
                        <p className="f40-700-140">{t("refundLocationGuide.inCityRefundSection.refundCenters.title")}</p>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <Tabs value={selectedCityTab} className="tab-wrap type02">
                            <TabsList>
                              <TabsTrigger value="all" onClick={()=> fetchRefundCounterCityType('all')}>
                                전체
                              </TabsTrigger>
                              {cityTypes?.map((t) => (
                                <TabsTrigger  key={t.code} value={t.code} onClick={()=> fetchRefundCounterCityType(t.code)}>
                                  {t[trans]}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            <TabsContent value="all">
                              <div className="refund-list-bx">
                                {refundCounterCity &&
                                  refundCounterCity.map((rc) => (
                                    <div key={rc.franchiseName} className="refund-list-item">
                                      <div className="top-bx">
                                        <div className="badge-group">
                                          <span className="badge badge-gray02 type02">{rc.counterText}</span>
                                          <span className="badge badge-skyblue type02">{rc.cityText}</span>
                                        </div>
                                        <div className="txt-bx">
                                          <p className="f20-700-140">{rc.franchiseName}</p>
                                          <span className="f18-400-160">{rc.address}</span>
                                        </div>
                                        <div className="refund-info-bx">
                                          <dl>
                                            <dt>{t("refundLocationGuide.inCityRefundSection.refundCenters.phoneNumber")}</dt>
                                            <dd>{rc.phoneNumber}</dd>
                                          </dl>
                                          <dl>
                                          <dt>{t("refundLocationGuide.inCityRefundSection.refundCenters.phoneNumber")}</dt>
                                            <dd>{rc.businessHours}</dd>
                                          </dl>
                                        </div>
                                      </div>
                                      <div className="bot-bx">
                                        <div className="btn-wrap">
                                          <div className="btn-inner">
                                            <Button className="btn" onClick={() => handleCopyClipBoard(rc.address)}>
                                              {t("refundLocationGuide.inCityRefundSection.copyAddress")}
                                              <img src={ico_copy} alt="아이콘" className="ico-refund" />
                                            </Button>
                                            <CityTaxRefundMapPage latitude={rc.latitude} longitude={rc.longitude} title={rc.franchiseName} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabsContent>
                            {cityTypes?.map((t) => (
                              <TabsContent key={t.code} value={t.code}>
                                {refundCounterCity ? (
                                  (() => {
                                    const filteredItems = refundCounterCity.filter((rc) => rc.cityType === t.code);
                                    return filteredItems.length > 0 ? (
                                      <div className="refund-list-bx">
                                        {filteredItems.map((rc) => (
                                          <div key={rc.franchiseName} className="refund-list-item">
                                            <div className="top-bx">
                                              <div className="badge-group">
                                                <span className="badge badge-gray02 type02">{rc.counterText}</span>
                                                <span className="badge badge-skyblue type02">{rc.cityText}</span>
                                              </div>
                                              <div className="txt-bx">
                                                <p className="f20-700-140">{rc.franchiseName}</p>
                                                <span className="f18-400-160">{rc.address}</span>
                                              </div>
                                              <div className="refund-info-bx">
                                                <dl>
                                                  <dt>연락처</dt>
                                                  <dd>{rc.phoneNumber}</dd>
                                                </dl>
                                                <dl>
                                                  <dt>운영 시간</dt>
                                                  <dd>{rc.businessHours}</dd>
                                                </dl>
                                              </div>
                                            </div>
                                            <div className="bot-bx">
                                              <div className="btn-wrap">
                                                <div className="btn-inner">
                                                  <Button className="btn" onClick={() => handleCopyClipBoard(rc.address)}>
                                                    주소 복사
                                                    <img src={ico_copy} alt="아이콘" className="ico-refund" />
                                                  </Button>
                                                  <CityTaxRefundMapPage
                                                    latitude={rc.latitude}
                                                    longitude={rc.longitude}
                                                    title={rc.franchiseName}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <NodataCase />
                                    );
                                  })()
                                ) : (
                                  <NodataCase />
                                )}
                              </TabsContent>
                            ))}
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </section> */}
                </TabsContent>
                <TabsContent value="step03">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img04} alt={t("refundProcedureGuide.airportRefundSection.title")} />
                      </div>
                      <div className="txt-cont">
                        <div className="mark-bx">
                          <Link to={`/${lang}/contact/faq`} className="link">
                            <img src={traveler_img02} alt={t("refundProcedureGuide.airportRefundSection.title")} />
                          </Link>
                        </div>
                        <p className="tit">{t("refundProcedureGuide.airportRefundSection.title")}</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <div className="desc-bx">
                              <span>{t("refundProcedureGuide.airportRefundSection.tag")}</span>
                            </div>
                            <p>{t("refundProcedureGuide.airportRefundSection.description")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">{t("refundProcedureGuide.airportRefundSection.refundProcessTitle")}</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.criteria1")}</li>
                                    {/* <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.criteria2")}</li> */}
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.criteria3")}</li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.requiredDocuments.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step1.goodsPurchase.requiredDocuments.passport")}</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.airportRefundSection.refundProcess.step2.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step2.customsDeclaration.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                {/* <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step2.customsDeclaration.howToProceed.title")}</p> */}
                                <ul className="desc-list">
                                  <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step2.customsDeclaration.howToProceed.method")}</li>
                                </ul>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMethod.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMethod.method")}</li>
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMethod.method1")}</li>
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMethod.method2")}</li>
                                  </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMeans.title")}</p>
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMeans.means1")}</li>
                                    <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step3.refundPayment.refundMeans.means2")}</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.airportRefundSection.refundProcess.step4.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step4.departure.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                {/* <p className="tit">{t("refundProcedureGuide.airportRefundSection.refundProcess.step4.departure.departureRequirements.title")}</p> */}
                                <ul className="desc-list">
                                  <li>{t("refundProcedureGuide.airportRefundSection.refundProcess.step4.departure.departureRequirements.method")}</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* 20250604 : 현업요청 주석 */}
                  {/* <section className="refund-list-section">
                    <div className="inner type02">
                      <div className="hgroup-wrap sub">
                        <p className="f40-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.title")}</p>
                      </div>
                      <div className="refund-list-bx">
                        <div className="refund-list-item">
                          <div className="top-bx">
                            <div className="txt-bx">
                              <p className="f20-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.title")}</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.customsLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.customsLocation.location")}</dd>
                              </dl>
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.refundCenterLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.refundCenterLocation.location")}</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.staffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.staffedHours")}</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.unstaffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.unstaffedHours")}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.staffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.staffed.currencies")}</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.unstaffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.unstaffed.currencies")}</span>
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
                                  {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.directions")}
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
                              <p className="f20-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.title")}</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.customsLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.customsLocation.location")}</dd>
                              </dl>
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.refundCenterLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.refundCenterLocation.location")}</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.staffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.staffedHours")}</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.unstaffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.unstaffedHours")}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.staffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.staffed.currencies")}</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.unstaffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.unstaffed.currencies")}</span>
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
                                  {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.directions")}
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
                              <p className="f20-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.title")}</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.customsLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.customsLocation.location")}</dd>
                              </dl>
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.refundCenterLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.refundCenterLocation.location")}</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.staffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.staffedHours")}</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.unstaffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.unstaffedHours")}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.staffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.staffed.currencies")}</span>
                                  </li>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.unstaffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.unstaffed.currencies")}</span>
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
                                  {t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.directions")}
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
                              <p className="f20-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.title")}</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.customsLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.customsLocation.location")}</dd>
                              </dl>
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.refundCenterLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.refundCenterLocation.location")}</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.hours.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.hours.staffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.hours.staffedHours")}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.availableCurrencies.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.availableCurrencies.staffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.availableCurrencies.staffed.currencies")}</span>
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
                                  {t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.directions")}
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
                              <p className="f20-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.title")}</p>
                            </div>
                            <div className="refund-info-bx">
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.customsLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.customsLocation.location")}</dd>
                              </dl>
                              <dl>
                                <dt>{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.refundCenterLocation.title")}</dt>
                                <dd>{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.refundCenterLocation.location")}</dd>
                              </dl>
                            </div>
                            <div className="refund-info-bx02">
                              <div className="info-left-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.hours.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.hours.staffed")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.hours.staffedHours")}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="info-right-bx">
                                <p>{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.availableCurrencies.title")}</p>
                                <ul>
                                  <li>
                                    <div className="badge-group">
                                      <span className="badge badge-gray02 type02">
                                        {t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.availableCurrencies.staffed.title")}
                                      </span>
                                    </div>
                                    <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.availableCurrencies.staffed.currencies")}</span>
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
                                  {t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.directions")}
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
                      <div className="info-bx border-none">
                        <strong className="info-txt">{t("refundLocationGuide.airportRefundSection.notice.title")}</strong>
                        <ul className="info-list">
                          <li className="info-item">
                            <p>{t("refundLocationGuide.airportRefundSection.notice.description")}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section> */}
                </TabsContent>
                <TabsContent value="step04">
                  <section className="inner type02">
                    <div className="refund-methods-top-bx">
                      <div className="img-cont">
                        <img src={traveler_img05} alt={t("refundProcedureGuide.mobileRefundSection.title")} />
                      </div>
                      <div className="txt-cont">
                        <div className="mark-bx">
                          <Link
                            to={`/${lang}/contact/faq`}
                            className="link"
                          >
                            <img src={traveler_img02} alt={t("refundProcedureGuide.mobileRefundSection.title")} />
                          </Link>
                        </div>
                        <p className="tit">{t("refundProcedureGuide.mobileRefundSection.title")}</p>
                        <div className="info-txt-bx">
                          <div className="info-txt-bx-inner">
                            <div className="desc-bx">
                              <span>{t("refundProcedureGuide.mobileRefundSection.tag")}</span>
                            </div>
                            <p>
                              {t("refundProcedureGuide.mobileRefundSection.description")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="inner type02">
                    <div className="refund-methods-mid-bx">
                      <div className="left-bx">
                        <p className="f40-700-130">{t("refundProcedureGuide.mobileRefundSection.refundProcessTitle")}</p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="step-wrap">
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.goodsPurchase.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont grid-type">
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.title")}</p>
                                  <ul className="desc-list">
                                  <li>{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.criteria1")}</li>
                                  <li>{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.criteria2")}</li>
                                </ul>
                                </div>
                                <div className="grid-item">
                                  <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.title2")}</p>
                                  <ul className="desc-list">
                                  <li>{t("refundProcedureGuide.mobileRefundSection.refundProcess.step1.goodsPurchase.purchaseRequirements.criteria3")}</li>
                                  
                                  
                                </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step2.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step2.customsDeclaration.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <div className="grid-item">
                                  {/* <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step2.customsDeclaration.howToProceed.title")}</p> */}
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.mobileRefundSection.refundProcess.step2.customsDeclaration.howToProceed.method")}</li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step3.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step3.refundRequest.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                <div className="grid-item">
                                  {/* <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step3.refundRequest.howToProceed.title")}</p> */}
                                  <ul className="desc-list">
                                    <li>{t("refundProcedureGuide.mobileRefundSection.refundProcess.step3.refundRequest.howToProceed.method")}</li>
                                    <li className="not-dot">
                                    <button
                                    className="link pc-alipay"
                                    type="button"
                                    onClick={() => handleLoginModalOpen("modal1")}
                                  >
                                  <span>{t("refundProcedureGuide.mobileRefundSection.viewAlipayQR")}</span>
                                    <span className="arrow"></span>
                                  </button>
                                  <button
                                    className="link pc-cube"
                                    type="button"
                                    onClick={() => handleLoginModalOpen("modal2")}
                                  >
                                  <span>{t("refundProcedureGuide.mobileRefundSection.viewCubeQR")}</span>
                                    <span className="arrow"></span>
                                  </button>
                                  <Link className="mo-alipay" to="https://qr.alipay.com/_d?_b=PAI_LOGIN_DY&amp;securityId=web%257Cauthcenter_qrcode_login%257Cfce82111-cc97-4acc-b42c-ba2c31126794RZ54">
                                    <span>{t("refundProcedureGuide.mobileRefundSection.viewAlipayQR")}</span>
                                    <span className="arrow"></span>
                                  </Link>
                                  <a
                                  className="mo-cube"
                                    href="https://m.cuberefund.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span>{t("refundProcedureGuide.mobileRefundSection.viewCubeQR")}</span>
                                    <span className="arrow"></span>
                                  </a>
                                      {/* <Link to="https://qr.alipay.com/_d?_b=PAI_LOGIN_DY&amp;securityId=web%257Cauthcenter_qrcode_login%257Cfce82111-cc97-4acc-b42c-ba2c31126794RZ54">
                                        {t("refundProcedureGuide.mobileRefundSection.refundProcess.step3.refundRequest.alipayAppLink")}
                                      </Link>
                                      <a href="m.cuberefund.com" target="_blank" rel="noopener noreferrer">
                                        {t("refundProcedureGuide.mobileRefundSection.refundProcess.step3.refundRequest.cubeRefundMobileLink")}
                                      </a> */}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="step-tit">
                                <div>
                                  <p className="num">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.stepTitle")}</p>
                                  <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.title")}</p>
                                </div>
                              </div>
                              <div className="step-cont">
                                {/* <p className="tit">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.departureRequirements.title")}</p> */}
                                <ul className="desc-list">
                                  <li>{t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.departureRequirements.criteria")}</li>
                                  <li className="no-dot">{t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.departureRequirements.criteria2")}</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="refund-methods-mid-bx mobile-refund">
                      <div className="left-bx">
                        <p className="f40-700-130">
                          {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.mobileRefundLink")}
                        </p>
                      </div>
                      <div className="cont-wrap">
                        <div className="txt-cont">
                          <ul className="mobile-refund-list">
                            <li>
                              <p className="tit">
                                <i className="ico ico-alipay-mini" role="img" aria-label="알리페이"></i>
                                {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.alipayRefund.title")}
                              </p>
                              <button
                                className="link"
                                type="button"
                                onClick={() => handleLoginModalOpen("modal1")}
                              >
                                {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.alipayRefund.qrCode.title")}
                              </button>
                              <Link
                                to="https://qr.alipay.com/_d?_b=PAI_LOGIN_DY&amp;securityId=web%257Cauthcenter_qrcode_login%257Cfce82111-cc97-4acc-b42c-ba2c31126794RZ54"
                                className="btn-app mo-show"
                                type="button"
                              >
                                {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.alipayRefund.qrCode.value")}
                              </Link>
                            </li>
                            <li>
                              <p className="tit">
                                <i className="ico ico-cube-mini" role="img" aria-label="큐브리펀드"></i>
                                {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.cubeRefund.title")}
                              </p>
                              <button
                                className="link"
                                type="button"
                                onClick={() => handleLoginModalOpen("modal2")}
                              >
                                {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.cubeRefund.qrCode.title")}
                              </button>
                              <Link
                                to="https://m.cuberefund.com"
                                className="btn-app mo-show"
                                type="button"
                              >
                                {t("refundProcedureGuide.mobileRefundSection.refundProcess.step4.departure.cubeRefund.qrCode.value")}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                  </section>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </div>

      <CommonAlertDialog
        isOpen={isAddressCopyComplete}
        title="주소 복사 완료"
        description={t("traveler.announcement.modal.addressCopySuccess")}
        confirmText={t("traveler.announcement.modal.confirm")}
        onConfirm={() => {
          setIsAddressCopyComplete(false);
        }}
      />
      <CommonAlertDialog
        isOpen={isAddressCopyFail}
        title="주소 복사 실패"
        description="주소 복사에 실패하였습니다."
        confirmText="확인"
        onConfirm={() => {
          setIsAddressCopyFail(false);
        }}
      />
      <Modal
        isOpen={openModals.modal1}
        onClose={() => handleModalClose('modal1')}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button className="modal-close" onClick={() => handleModalClose('modal1')}>
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
        onClose={() => handleModalClose('modal2')}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button className="modal-close" onClick={() => handleModalClose('modal2')}>
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
        onClose={() => handleModalClose('modal3')}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button className="modal-close" onClick={() => handleModalClose('modal3')}>
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
        onClose={() => handleModalClose('modal4')}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button className="modal-close" onClick={() => handleModalClose('modal4')}>
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
        onClose={() => handleModalClose('modal5')}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">약도보기</h3>
            <button className="modal-close" onClick={() => handleModalClose('modal5')}>
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
          <p className="qr-desc">
            {t("main.qrCode1")}
            <br />
            {t("main.qrCode2")}
          </p>
        </div>
      </Modal>

    </>
  );
};

export default RefundMethods;