/*
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import taxRefundImage01 from "@/assets/images/contents/tax-refund/tax_refund_01.png";
import I18nMessage from "@/i18n/I18nMessage.tsx";

const TaxRefundIntroduction = () => {
  const { t } = useTranslation();

  const renderItems = (items: string[] | { [key: string]: string } | undefined) => {
    if (!items) return null;
    let itemsArray: string[];
    if (Array.isArray(items)) {
      itemsArray = items;
    } else if (typeof items === "object") {
      itemsArray = Object.values(items);
    } else {
      return null;
    }
    return itemsArray.map((item, index) => (
      <li key={index} className="info-item dot">
        <p className="f18-400-160">{item}</p>
      </li>
    ));
  };

  const renderNotices = (notices: string | { [key: string]: string } | undefined) => {
    if (!notices) return null;
    if (typeof notices === "string") {
      return <p className="info-guide-tit">{notices}</p>;
    }
    return (
      <ul className="info-guide-list">
        {Object.values(notices).map((value, index) => (
          <li key={index}>
            <p className="tit">{value}</p>
            <Link to="/" className="link-btn">
              <span className="f18-500-160">
                {typeof t("introduction.eligibleItems.ineligibleNotices.link") === "string"
                  ? t("introduction.eligibleItems.ineligibleNotices.link")
                  : "바로가기"}
              </span>
              <i className="ico ico-top-right-arrow"></i>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="refund-wrap">
        {/!* 퍼블수정 : 20250516 refund-wrap 클래스 추가 *!/}
        <section>
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">
              <I18nMessage data-ko="가입 및 일반 문의">
                { t('introduction.title') }
              </I18nMessage>
            </h2>
            {/!* <p className="desc-txt f18-400-160">
              {t("introduction.description")}
            </p> *!/}
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
              <p className="tax-txt">
                {t("introduction.whatIsTaxRefund.description")}
              </p>
              <div className="tax-img-bx">
                <img
                  src={taxRefundImage01}
                  alt={t("introduction.whatIsTaxRefund.imageAlt")}
                />
              </div>
              <div className="info-bx">
                <ul className="info-list">
                  <li className="info-item">
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
        <section>
          <div className="info-guide">
            <div className="tax-inner">
              <div className="left-bx"></div>
              <div className="right-bx">
                {renderNotices(t("introduction.eligibleItems.ineligibleNotices.title"))}
                <ul className="info-guide-list">
                  <li>
                    <p className="tit">
                      {t("introduction.eligibleItems.ineligibleNotices.items.1")}
                    </p>
                    <Link to="/" className="link-btn">
                      <span className="f18-500-160">바로가기</span>
                      <i className="ico ico-top-right-arrow"></i>
                    </Link>
                  </li>
                  <li>
                    <p className="tit">
                      {t("introduction.eligibleItems.ineligibleNotices.items.2")}
                    </p>
                    <Link to="/" className="link-btn">
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
    </>
  );
};

export default TaxRefundIntroduction;
*/
