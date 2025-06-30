import { useTranslation } from "react-i18next";
import {Link, useParams} from "react-router-dom";
import taxRefundImage01 from "@/assets/images/contents//tax-refund/tax_refund_01.png";
import { $SpecialObject } from "node_modules/i18next/typescript/helpers";
import {TranslationDTO} from "@/types/translation.ts";

const TaxRefundIntroduction = () => {
  const {t} = useTranslation();
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";

  const renderItems = (items: $SpecialObject) => {
    if (!items || !Array.isArray(items)) return null;
    return items.map((item, index) => (
      <li key={index} className="info-item dot">
        <p className="f18-400-160">{item}</p>
      </li>
    ));
  };

  return (
    <div className="refund-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">{t('introduction.title')}</h2>
        </div>
      </section>
      <section>
        <div className="tax-inner">
          <div className="left-bx">
            <div className="hgroup-wrap">
              <h2 className="f40-700-130">
                {t("introduction.whatIsTaxRefund.title")}
              </h2>
            </div>
          </div>
          <div className="right-bx">
            <p className="tax-txt" dangerouslySetInnerHTML={{__html: t("introduction.whatIsTaxRefund.description")}}/>
            <div className="tax-img-bx">
              <img
                src={taxRefundImage01}
                alt={t("introduction.whatIsTaxRefund.imageAlt")}
              />
            </div>
            <div className="info-bx">
              <ul className="info-list">
                <li className="info-item">
                  <Link to="https://www.law.go.kr/법령/외국인관광객%20등에%20대한%20부가가치세%20및%20개별소비세%20특례규정" className="info-title link" target="_blank">
                    {t("introduction.whatIsTaxRefund.relatedLaw")}
                  </Link>
                  <p className="f14-400-140 mt-8">
                    {t("introduction.whatIsTaxRefund.lawDescription")}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="tax-inner">
          <div className="left-bx">
            <div className="hgroup-wrap">
              {/* <h2 className="f40-700-130">
                {t("introduction.eligibleItems.title")}
              </h2> */}
            </div>
          </div>
          <div className="right-bx">
            <div className="tax-info-bx">
              <div className="info-bx">
                <div className="info-head">
                  <strong className="f20-700-140">
                    {t("introduction.eligibleItems.eligiblePersons.title")}
                  </strong>
                </div>
                <ul className="info-list">
                  {renderItems(
                    t("introduction.eligibleItems.eligiblePersons.items", {
                      returnObjects: true,
                    })
                  )}
                </ul>
              </div>
              <div className="info-bx">
                <div className="info-head">
                  <strong className="f20-700-140">
                    {t("introduction.eligibleItems.ineligiblePersons.title")}
                  </strong>
                </div>
                <ul className="info-list">
                  {renderItems(
                    t("introduction.eligibleItems.ineligiblePersons.items", {
                      returnObjects: true,
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 퍼블수정 : 20250516 추가 */}
      <section>
        <div className="info-guide">
          <div className="tax-inner">
            <div className="left-bx"></div>
            <div className="right-bx">
              {/* <p className="info-guide-tit">
                {t("introduction.eligibleItems.ineligibleNotices.title")}
              </p> */}

              <ul className="info-guide-list">
                <li>
                  <p className="tit">
                    {t("introduction.eligibleItems.ineligibleNotices.items.1")}
                  </p>
                  <Link to={`/${trans}/traveler/refund-eligibility`} className="link-btn">
                    <span className="f18-500-160">
                       {t("introduction.eligibleItems.ineligibleNotices.link")}
                    </span>
                    <i className="ico ico-top-right-arrow"></i>
                  </Link>
                </li>

                <li>
                  <p className="tit">
                    {t("introduction.eligibleItems.ineligibleNotices.items.2")}
                  </p>
                  <Link to={`/${trans}/traveler/refund-methods`}  className="link-btn">
                    <span className="f18-500-160">
                        {t("introduction.eligibleItems.ineligibleNotices.link")}
                    </span>
                    <i className="ico ico-top-right-arrow"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaxRefundIntroduction;
