import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import ico_copy from "@/assets/images/icon/ico_copy.png";
import ico_address from "@/assets/images/icon/ico_address.png";
import ico_close from "@/assets/images/icon/ico_modal_close.png";
import { useTranslation } from "react-i18next";
import { CommonCode } from "@/types/common-code.ts";
import { RefundCounterDTO, RefundCounterListData } from "@/types/refund-counter.ts";
import { useParams } from "react-router-dom";
import { TranslationDTO } from "@/types/translation.ts";
import { getCommonCodeList } from "@/api/services/common-code.ts";
import { toast } from "@/hooks/use-toast.ts";
import { getRefundCounterList } from "@/api/services/refund-counter.ts";
import CityTaxRefundMapPage from "@/pages/[lang]/traveler/refund-methods/CityTaxRefundMap.tsx";
import { CommonAlertDialog } from "@/components/ui/common-alert-dialog.tsx";
import traveler_modal_img01 from "@/assets/images/contents/traveler/traveler_modal_img01.png";
import traveler_modal_img02 from "@/assets/images/contents/traveler/traveler_modal_img02.png";
import traveler_modal_img03 from "@/assets/images/contents/traveler/traveler_modal_img03.png";
import traveler_modal_img04 from "@/assets/images/contents/traveler/traveler_modal_img04.png";
import traveler_modal_img05 from "@/assets/images/contents/traveler/traveler_modal_img05.png";
import NoContentCase from "@/pages/[lang]/pub/components/layouts/nocontent-case.tsx";
import {useLoadingStore} from "@/stores/loading-store.ts";

const Announcement = () => {
  const { t } = useTranslation();
  const [cityTypes, setCityTypes] = useState<CommonCode[]>();
  const { setLoading } = useLoadingStore();
  const [isAddressCopyComplete, setIsAddressCopyComplete] = useState(false);
  const [isAddressCopyFail, setIsAddressCopyFail] = useState(false);
  const [allRefundCounterList, setAllRefundCounterList] = useState<RefundCounterListData>();
  const [refundCounterCity, setRefundCounterCity] = useState<RefundCounterDTO[]>();
  const [selectedCityTab, setSelectedCityTab] = useState("all");
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const [openModals, setOpenModals] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
  });

  const handleModalOpen = (modalId: string) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalId]: true,
    }));
  };

  const handleModalClose = (modalId: string) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalId]: false,
    }));
  };

  const fetchCityType = async () => {
    try {
      const response = await getCommonCodeList("city");
      setCityTypes(response.data);
    } catch {
      toast({
        variant: "destructive",
        title: "지역 로드 실패",
        description: "지역을 불러오지 못했습니다.",
      });
    }
  };

  const fetchRefundCounterCityType = async (cityType: string) => {
    setLoading(true);
    setRefundCounterCity([]);
    try {
      const response = await getRefundCounterList(cityType);
      setAllRefundCounterList(response.data);
      setRefundCounterCity(response.data[trans]);
      setSelectedCityTab(cityType);
    } catch {
      setAllRefundCounterList(undefined);
      setRefundCounterCity([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsAddressCopyComplete(true);
    } catch {
      setIsAddressCopyFail(true); // Update to use state instead of alert
    }
  };

  useEffect(() => {
    fetchCityType();
    fetchRefundCounterCityType("all");
  }, []);

  useEffect(() => {
    if (allRefundCounterList) {
      setRefundCounterCity([]);
      setRefundCounterCity(allRefundCounterList[trans] || []);
    }else{
      setRefundCounterCity([]);
    }
  }, [trans, allRefundCounterList]);

  const RefundList = ({ refundCounterCity,handleCopyClipBoard, t }: {
    refundCounterCity: RefundCounterDTO[],
    handleCopyClipBoard: (text: string) => void,
    t: any
  }) => (
    <div className="refund-list-bx">
      {refundCounterCity.length > 0 ? (
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
                  <dt>{t("refundLocationGuide.inCityRefundSection.contact")}</dt>
                  <dd>{rc.phoneNumber || "-"}</dd>
                </dl>
                <dl>
                  <dt>{t("refundLocationGuide.inCityRefundSection.hours")}</dt>
                  <dd>{rc.businessHours || "-"}</dd>
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
        ))
      ) : (
        <NoContentCase />
      )}
    </div>
  );

  return (
    <div className="announcement-wrap">
      <section className="inner type02">
        <div className="hgroup-wrap sub">
          <p className="f48-700-140">{t("refundLocationGuide.title")}</p>
        </div>
      </section>
      <section>
        <div className="component-group">
          <div className="from-group">
            <Tabs defaultValue="step02" className="tab-wrap">
              <TabsList>
              <div className="inner type04 flex-type">
                <TabsTrigger value="step02">{t("refundLocationGuide.airportRefund")}</TabsTrigger>
                <TabsTrigger value="step01">{t("refundLocationGuide.inCityRefund")}</TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="step01">
                <section className="announcement-section">
                  <div className="inner type02">
                    {/* <div className="hgroup-wrap sub">
                      <p className="f40-700-140">{t("refundLocationGuide.inCityRefundSection.refundCenters.title")}</p>
                    </div> */}
                    <div className="component-group">
                      <div className="from-group">
                        <Tabs value={selectedCityTab} className="tab-wrap type02">
                          <TabsList>
                            <TabsTrigger value="all" onClick={() => fetchRefundCounterCityType("all")}>
                              {t("refundLocationGuide.inCityRefundSection.refundCenters.all")}
                            </TabsTrigger>
                            {cityTypes?.map((t) => (
                              <TabsTrigger key={t.code} value={t.code} onClick={() => fetchRefundCounterCityType(t.code)}>
                                {t[trans]}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          <TabsContent value="all">
                            {refundCounterCity && refundCounterCity.length >0? (
                              <RefundList refundCounterCity={refundCounterCity} handleCopyClipBoard={handleCopyClipBoard} t={t} />
                            ):(
                              <NoContentCase/>
                            )}
                          </TabsContent>
                          {cityTypes?.map((ct) => (
                            <TabsContent key={ct.code} value={ct.code}>
                              {refundCounterCity && refundCounterCity.length >0? (
                                <RefundList refundCounterCity={refundCounterCity} handleCopyClipBoard={handleCopyClipBoard} t={t} />
                              ):(
                                <NoContentCase/>
                              )}
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="step02">
                <section className="refund-list-section">
                  <div className="inner type02">
                    {/* <div className="hgroup-wrap sub">
                      <p className="f40-700-140">{t("refundLocationGuide.airportRefundSection.refundCenters.title")}</p>
                    </div> */}
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.staffed")}</span>
                                  </div>
                                  <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.staffedHours")}</span>
                                </li>
                                <li>
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.hours.unstaffed")}</span>
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.staffed.title")}</span>
                                  </div>
                                  <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.staffed.currencies")}</span>
                                </li>
                                <li>
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.availableCurrencies.unstaffed.title")}</span>
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
                              <Button className="btn map" onClick={() => handleModalOpen("modal1")}>
                                {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT1.directions")}
                                <img src={ico_address} alt="아이콘" className="ico-refund" />
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.staffed")}</span>
                                  </div>
                                  <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.staffedHours")}</span>
                                </li>
                                <li>
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.hours.unstaffed")}</span>
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.staffed.title")}</span>
                                  </div>
                                  <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.staffed.currencies")}</span>
                                </li>
                                <li>
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.availableCurrencies.unstaffed.title")}</span>
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
                              <Button className="btn map" onClick={() => handleModalOpen("modal2")}>
                                {t("refundLocationGuide.airportRefundSection.refundCenters.incheonAirportT2.directions")}
                                <img src={ico_address} alt="아이콘" className="ico-refund" />
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.staffed")}</span>
                                  </div>
                                  <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.staffedHours")}</span>
                                </li>
                                <li>
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.hours.unstaffed")}</span>
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.staffed.title")}</span>
                                  </div>
                                  <span className="txt">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.staffed.currencies")}</span>
                                </li>
                                <li>
                                  <div className="badge-group">
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.availableCurrencies.unstaffed.title")}</span>
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
                              <Button className="btn map" onClick={() => handleModalOpen("modal3")}>
                                {t("refundLocationGuide.airportRefundSection.refundCenters.gimpoAirport.directions")}
                                <img src={ico_address} alt="아이콘" className="ico-refund" />
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.hours.staffed")}</span>
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.availableCurrencies.staffed.title")}</span>
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
                              <Button className="btn map" onClick={() => handleModalOpen("modal5")}>
                                {t("refundLocationGuide.airportRefundSection.refundCenters.gimhaeAirport.directions")}
                                <img src={ico_address} alt="아이콘" className="ico-refund" />
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.hours.staffed")}</span>
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
                                    <span className="badge badge-gray02 type02">{t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.availableCurrencies.staffed.title")}</span>
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
                              <Button className="btn map" onClick={() => handleModalOpen("modal4")}>
                                {t("refundLocationGuide.airportRefundSection.refundCenters.jejuAirport.directions")}
                                <img src={ico_address} alt="아이콘" className="ico-refund" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-bx border-none">
                      <strong className="info-txt">{t("refundLocationGuide.airportRefundSection.notice.title")}</strong>
                      <ul className="info-list">
                        <li className="info-item dot">
                          <p>
                            {t("refundLocationGuide.airportRefundSection.notice.description01")}
                          </p>
                        </li>
                        <li className="info-item dot">
                          <p>
                            {t("refundLocationGuide.airportRefundSection.notice.description02")}
                          </p>
                        </li>
                        <li className="info-item dot">
                          <p>
                            {t("refundLocationGuide.airportRefundSection.notice.description03")}
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
            <h3 className="modal-title">{t("traveler.announcement.modal.title")}</h3>
            <button className="modal-close" onClick={() => handleModalClose("modal1")}>
              <img src={ico_close} alt={t("traveler.announcement.modal.close")} />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img01} alt={t("traveler.announcement.modal.mapAlt")} />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal2}
        onClose={() => handleModalClose("modal2")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">{t("traveler.announcement.modal.title")}</h3>
            <button className="modal-close" onClick={() => handleModalClose("modal2")}>
              <img src={ico_close} alt={t("traveler.announcement.modal.close")} />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img02} alt={t("traveler.announcement.modal.mapAlt")} />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal3}
        onClose={() => handleModalClose("modal3")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">{t("traveler.announcement.modal.title")}</h3>
            <button className="modal-close" onClick={() => handleModalClose("modal3")}>
              <img src={ico_close} alt={t("traveler.announcement.modal.close")} />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img03} alt={t("traveler.announcement.modal.mapAlt")} />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal4}
        onClose={() => handleModalClose("modal4")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">{t("traveler.announcement.modal.title")}</h3>
            <button className="modal-close" onClick={() => handleModalClose("modal4")}>
              <img src={ico_close} alt={t("traveler.announcement.modal.close")} />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img04} alt={t("traveler.announcement.modal.mapAlt")} />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openModals.modal5}
        onClose={() => handleModalClose("modal5")}
        size="large"
        title={
          <div className="modal-title-wrap">
            <h3 className="modal-title">{t("traveler.announcement.modal.title")}</h3>
            <button className="modal-close" onClick={() => handleModalClose("modal5")}>
              <img src={ico_close} alt={t("traveler.announcement.modal.close")} />
            </button>
          </div>
        }
      >
        <div className="map-wrap">
          <div className="map-img-bx">
            <img src={traveler_modal_img05} alt={t("traveler.announcement.modal.mapAlt")} />
          </div>
        </div>
      </Modal>
      <CommonAlertDialog
        isOpen={isAddressCopyComplete}
        description={t("traveler.announcement.modal.addressCopySuccess")}
        confirmText={t("traveler.announcement.modal.confirm")}
        onConfirm={() => {
          setIsAddressCopyComplete(false);
        }}
      />
      <CommonAlertDialog
        isOpen={isAddressCopyFail}
        description={t("traveler.announcement.modal.addressCopyFail")}
        confirmText={t("traveler.announcement.modal.confirm")}
        onConfirm={() => {
          setIsAddressCopyFail(false);
        }}
      />
    </div>
  );
};

export default Announcement;