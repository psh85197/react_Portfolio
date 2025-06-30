import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fair_trade_img01 from "@/assets/images/contents/footer/fair_trade_img01.png";

const FairTrade = () => {
  const { t } = useTranslation();

  return (
    <div className="fair-trade-wrap">
      <section>
        <div className="hgroup-wrap sub">
          <p className="f40-700-140">{t("fairTrade.title")}</p>
        </div>
      </section>
      <section>
        <div className="fair-trade-bx">
          <div className="fair-trade-img-bx">
            <img src={fair_trade_img01} alt={t("fairTrade.imageAlt")} />
          </div>
          <div className="fair-trade-info-bx">
            <p>
              {t("fairTrade.description1")} <br className="pc-show"/> {t("fairTrade.description2")}
            </p>
          </div>
        </div>
      </section>
      <section className="link-bx">
        <div>
          <div className="go-link-wrap">
            <Link to="https://www.lotte.co.kr/compliance/lc.do" target="_blank" className="">
              <p className="link-tit f20-700-140">
                {t("fairTrade.lotteCompliance.title")}
                <br />
                {t("fairTrade.lotteCompliance.subtitle")}
              </p>
              <div className="link-btn">
                <span className="f18-500-160">{t("fairTrade.goToLink")}</span>
                <i className="ico ico-top-right-arrow"></i>
              </div>
            </Link>
            <Link to="https://www.lotte.co.kr/compliance/inquiry.do" target="_blank" className="">
              <p className="link-tit f20-700-140">
                {t("fairTrade.lotteGroup.title")}
                <br />
                {t("fairTrade.lotteGroup.subtitle")}
              </p>
              <div className="link-btn">
                <span className="f18-500-160">{t("fairTrade.goToLink")}</span>
                <i className="ico ico-top-right-arrow"></i>
              </div>
            </Link>
            <Link to="https://www.lotteinnovate.com/ko/cscenter/sinmungo" target="_blank" className="active">
              <p className="link-tit f20-700-140">
                {t("fairTrade.lotteInnovate.title")}
                <br />
                {t("fairTrade.lotteInnovate.subtitle")}
              </p>
              <div className="link-btn">
                <span className="f18-500-160">{t("fairTrade.goToLink")}</span>
                <i className="ico ico-top-right-arrow"></i>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FairTrade;
