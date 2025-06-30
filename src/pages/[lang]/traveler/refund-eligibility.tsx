import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs-anchor";
import refund_eligibility_01 from "@/assets/images/contents/traveler/refund_eligibility_01.png";
import refund_eligibility_02 from "@/assets/images/contents/traveler/refund_eligibility_02.png";
import refund_eligibility_03 from "@/assets/images/contents/traveler/refund_eligibility_03.png";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const RefundEligibility = () => {
  const contentRef = React.useRef(null);
  const { lang } = useParams();
  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const { t } = useTranslation();

  return (
    <>
      <div className="refund-eligibility-wrap">
        <section>
        <div className="inner type02">
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">{t('traveler.refundEligibility.title')}</h2>
          </div>
          </div>
        </section>
        <section>
          <Tabs defaultValue="step01" className="tab-wrap type02">
            <TabsList>
            <div className="inner type04 flex-type">
              <TabsTrigger value="step01">{t('traveler.refundEligibility.tabs.goods')}</TabsTrigger>
              <TabsTrigger value="step02">{t('traveler.refundEligibility.tabs.medical')}</TabsTrigger>
              <TabsTrigger value="step03">{t('traveler.refundEligibility.tabs.accommodation')}</TabsTrigger>
              </div>
            </TabsList>
            <TabsContent ref={contentRef}>
            <div className="inner type02">
              <div className="refund-eligibility-content" data-value="step01">
                <div className="title-wrap">
                  <dl data-title>
                    <dt className="tit f40-700-130">{t('traveler.refundEligibility.goods.title')}</dt>
                    {/* <dd className="f18-400-160">
                      {t('traveler.refundEligibility.goods.description1')}
                      <br />{t('traveler.refundEligibility.goods.description2')}
                    </dd> */}
                  </dl>
                </div>
                <div className="cont-wrap">
                  <div className="img-cont">
                    <img
                      src={refund_eligibility_01}
                      alt="큐브리펀드 모바일 셀프 반출 오픈"
                    />
                  </div>

                  {/* 퍼블수정 : 20250528 레이아웃 수정 */}
                  <div className="txt-cont">
                    <div className="txt-cont-title">
                      <span>{t('traveler.refundEligibility.goods.eligiblePerson.title')}</span>
                      <p>{t('traveler.refundEligibility.goods.eligiblePerson.description')}</p>
                    </div>
                    <div className="info-bx no-scroll border-none light-blue-type">
                      <p className="info-txt">{t('traveler.refundEligibility.goods.eligiblePerson.eligible')}</p>
                      <ul className="info-list ">
                        {(t('traveler.refundEligibility.goods.eligiblePerson.eligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 퍼블수정 : 20250528 레이아웃 수정 */}
                  <div className="txt-cont">
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">{t('traveler.refundEligibility.goods.eligiblePerson.ineligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.goods.eligiblePerson.ineligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 퍼블수정 : 20250528 레이아웃 수정 */}
                  <div className="txt-cont">
                    <div className="txt-cont-title">
                      <span>{t('traveler.refundEligibility.goods.eligibleItems.title')}</span>
                      <p>{t('traveler.refundEligibility.goods.eligibleItems.description')}</p>
                    </div>
                    <div className="info-bx no-scroll border-none light-blue-type">
                      <p className="info-txt">{t('traveler.refundEligibility.goods.eligibleItems.eligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.goods.eligibleItems.eligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 퍼블수정 : 20250528 레이아웃 수정 */}
                  <div className="txt-cont">
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">{t('traveler.refundEligibility.goods.eligibleItems.ineligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.goods.eligibleItems.ineligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <p className="f20-700-140">{t('traveler.refundEligibility.goods.procedures.title')}</p>
                    <div className="link-list">
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step01`}>{t('traveler.refundEligibility.goods.procedures.immediate')}</Link>
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step03`}>{t('traveler.refundEligibility.goods.procedures.departure')}</Link>
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step02`}>{t('traveler.refundEligibility.goods.procedures.city')}</Link>
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step04`}>{t('traveler.refundEligibility.goods.procedures.mobile')}</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="refund-eligibility-content" data-value="step02">
                <div className="title-wrap">
                  <dl data-title>
                    {/* 퍼블수정 : 20250515 줄바꿈 */}
                    <dt className="tit f40-700-130">{t('traveler.refundEligibility.medical.title')}</dt>
                    {/* <dd className="f18-400-160">
                      {t('traveler.refundEligibility.medical.description1')}
                      <br />{t('traveler.refundEligibility.medical.description2')}
                    </dd> */}
                  </dl>
                </div>
                <div className="cont-wrap">
                  <div className="img-cont">
                    <img
                      src={refund_eligibility_02}
                      alt={t('traveler.refundEligibility.medical.imageAlt')}
                    />
                  </div>
                  
                  <div className="txt-cont">
                    <div className="txt-cont-title">
                      <span>{t('traveler.refundEligibility.medical.eligiblePerson.title')}</span>
                      <p>{t('traveler.refundEligibility.medical.eligiblePerson.description')}</p>
                    </div>
                    <div className="info-bx no-scroll border-none light-blue-type">
                      <p className="info-txt">{t('traveler.refundEligibility.medical.eligiblePerson.eligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.medical.eligiblePerson.eligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">{t('traveler.refundEligibility.medical.eligiblePerson.ineligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.medical.eligiblePerson.ineligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="txt-cont">
                    <div className="txt-cont-title">
                      <span>{t('traveler.refundEligibility.medical.eligibleItems.title')}</span>
                      <p>{t('traveler.refundEligibility.medical.eligibleItems.description')}</p>
                    </div>
                    <div className="info-bx no-scroll border-none light-blue-type">
                      <p className="info-txt">{t('traveler.refundEligibility.medical.eligibleItems.eligible')}</p>
                      <div className="grid-type-wrap">
                        <ul className="info-list">
                          {(t('traveler.refundEligibility.medical.eligibleItems.eligibleList1', { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index} className="info-item dot">{item}</li>
                          ))}
                        </ul>
                        <ul className="info-list">
                          {(t('traveler.refundEligibility.medical.eligibleItems.eligibleList2', { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index} className="info-item dot">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">{t('traveler.refundEligibility.medical.eligibleItems.ineligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.medical.eligibleItems.ineligibleList', { returnObjects: true })as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <p className="f20-700-140">{t('traveler.refundEligibility.medical.procedures.title')}</p>
                    <div className="link-list">
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step03`}>{t('traveler.refundEligibility.medical.procedures.departure')}</Link>
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step02`}>{t('traveler.refundEligibility.medical.procedures.city')}</Link>
                      {/*<Link to={`/${currentLang}/traveler/refund-methods?tab=step04`}>{t('traveler.refundEligibility.medical.procedures.mobile')}</Link>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="refund-eligibility-content" data-value="step03">
                <div className="title-wrap">
                  <dl data-title>
                    <dt className="tit f40-700-130">{t('traveler.refundEligibility.accommodation.title')}</dt>
                    {/* <dd className="f18-400-160">
                      {t('traveler.refundEligibility.accommodation.description1')} <br />
                      {t('traveler.refundEligibility.accommodation.description2')}
                    </dd> */}
                  </dl>
                </div>
                <div className="cont-wrap">
                  <div className="img-cont">
                    <img
                      src={refund_eligibility_03}
                      alt={t('traveler.refundEligibility.accommodation.imageAlt')}
                    />
                  </div>

                  <div className="txt-cont">
                    <div className="txt-cont-title">
                      <span>{t('traveler.refundEligibility.accommodation.eligiblePerson.title')}</span>
                      <p>{t('traveler.refundEligibility.accommodation.eligiblePerson.description')}</p>
                    </div>
                    <div className="info-bx no-scroll border-none light-blue-type">
                      <p className="info-txt">{t('traveler.refundEligibility.accommodation.eligiblePerson.eligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.accommodation.eligiblePerson.eligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">{t('traveler.refundEligibility.accommodation.eligiblePerson.ineligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.accommodation.eligiblePerson.ineligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <div className="txt-cont-title">
                      <span>{t('traveler.refundEligibility.accommodation.eligibleItems.title')}</span>
                      <p>{t('traveler.refundEligibility.accommodation.eligibleItems.description')}</p>
                    </div>
                    <div className="info-bx no-scroll border-none light-blue-type">
                      <p className="info-txt">{t('traveler.refundEligibility.accommodation.eligibleItems.eligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.accommodation.eligibleItems.eligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <div className="info-bx no-scroll border-none">
                      <p className="info-txt">{t('traveler.refundEligibility.accommodation.eligibleItems.ineligible')}</p>
                      <ul className="info-list">
                        {(t('traveler.refundEligibility.accommodation.eligibleItems.ineligibleList', { returnObjects: true }) as string[]).map((item, index) => (
                          <li key={index} className="info-item dot">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="txt-cont">
                    <p className="f20-700-140">{t('traveler.refundEligibility.accommodation.procedures.title')}</p>
                    <div className="link-list">
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step03`}>{t('traveler.refundEligibility.accommodation.procedures.departure')}</Link>
                      <Link to={`/${currentLang}/traveler/refund-methods?tab=step02`}>{t('traveler.refundEligibility.accommodation.procedures.city')}</Link>
                      {/*<Link to={`/${currentLang}/traveler/refund-methods?tab=step04`}>{t('traveler.refundEligibility.accommodation.procedures.mobile')}</Link>*/}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  );
};

export default RefundEligibility;
