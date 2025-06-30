import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import taxRefundImage01 from "@/assets/images/contents//tax-refund/tax_refund_01.png";

const TaxRefundIntroduction = () => {
  const { t } = useTranslation();

  const renderItems = (items) => {
    if (!items || !Array.isArray(items)) return null;
    return items.map((item, index) => (
      <li key={index} className="info-item dot">
        <p className="f18-400-160">{item}</p>
      </li>
    ));
  };

  return (
    <div class="refund-wrap">
      {/* 퍼블수정 : 20250516 refund-wrap 클래스 추가 */}
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">{t('introduction.title')}</h2>
          {/* <p className="desc-txt f18-400-160">
            {t("introduction.description")}
          </p> */}
          {/* <p>
            {
              t('introduction.eligibleItems.eligiblePersons.items', 
                { returnObjects: true })
                .map((item, index) => 
                <span key={index}>{item}</span>
              )
            }
          </p> */}
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
                  {/* 퍼블수정 : 20250516 마크업 수정 */}
                  <Link to="/" className="info-title link" target="_blank">
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
              <h2 className="f40-700-130">
                {t("introduction.eligibleItems.title")}
              </h2>
            </div>
          </div>
          <div className="right-bx">
            {/* 퍼블수정 : 20250516 주석 */}
            {/* <p className="tax-txt">
              {t('introduction.eligibleItems.description')}
            </p>
            <div className="tax-txt-bx">
              <p className="f20-700-140">{t('introduction.eligibleItems.taxRefund')}</p>
            </div> */}
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
              <p className="info-guide-tit">
                {" "}
                {t("introduction.eligibleItems.ineligibleNotices.title", {
                  returnObjects: true,
                })}
              </p>

              <ul className="info-guide-list">
                <li>
                  <p className="tit">
                    {t("introduction.eligibleItems.ineligibleNotices.items.1", {
                      returnObjects: true,
                    })}
                  </p>

                  <Link to="/" className="link-btn">
                    <span className="f18-500-160">바로가기</span>
                    <i className="ico ico-top-right-arrow"></i>
                  </Link>
                </li>

                <li>
                  <p className="tit">
                    {t("introduction.eligibleItems.ineligibleNotices.items.2", {
                      returnObjects: true,
                    })}
                  </p>

                  <Link to="/" className="link-btn">
                    <span className="f18-500-160">
                      {t("introduction.eligibleItems.ineligibleNotices.link", {
                        returnObjects: true,
                      })}
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
