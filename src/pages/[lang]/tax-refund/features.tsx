import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import features01 from "@/assets/images/contents//tax-refund/features_01.png";
import features02 from "@/assets/images/contents//tax-refund/features_02.png";
import features03 from "@/assets/images/contents//tax-refund/features_03.png";

import {useNavigate, useParams} from "react-router-dom";
import {TranslationDTO} from "@/types/translation.ts";

const Features = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const navigate = useNavigate();

  const renderDescription = (description: string | string[] | undefined) => {
    if (Array.isArray(description)) {
      return (
        <ul className="desc-list">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="f18-400-160 info-desc">{description}</p>;
  };

  return (
    <div className="service-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">{t("features.title")}</h2>
          {/* 2025.05.23 : 주석 처리 */}
          {/* <p className="desc-txt f18-400-160">
            {t("features.description")}
          </p> */}
        </div>
      </section>
      <section>
        <div className="tax-inner">
          <div className="left-bx">
            <div className="hgroup-wrap">
              <h2 className="f40-700-130">
                {t("features.mainTitle")}
              </h2>
            </div>
          </div>
          <div className="right-bx">
            <div className="info-content">
              <div className="tax-img-bx">
                <img src={features01} alt={t("features.feature1.imageAlt")} />
              </div>
              <div className="info-bx no-scroll">
                <ul className="info-list">
                  <li className="info-item">
                    <strong className="info-title02">{t("features.feature1.title")}</strong>
                    {renderDescription(t("features.feature1.description"))}
                  </li>
                </ul>
              </div>
            </div>
            <div className="info-content">
              <div className="tax-img-bx">
                <img src={features02} alt={t("features.feature2.imageAlt")} />
              </div>
              <div className="info-bx no-scroll">
                <ul className="info-list">
                  <li className="info-item">
                    <strong className="info-title02">{t("features.feature2.title")}</strong>
                    {renderDescription(t("features.feature2.description"))}
                  </li>
                </ul>
              </div>
            </div>
            <div className="info-content">
              <div className="tax-img-bx">
                <img src={features03} alt={t("features.feature3.imageAlt")} />
              </div>
              <div className="info-bx no-scroll">
                <ul className="info-list">
                  <li className="info-item">
                    <strong className="info-title02">{t("features.feature3.title")}</strong>
                    {renderDescription(t("features.feature3.description"))}
                  </li>
                </ul>
              </div>
            </div>
            { /* 20250604 : 현업요청 주석 */ }
            {/* <div className="info-content">
              <div className="tax-img-bx">
                <img src={features04} alt={t("features.feature4.imageAlt")} />
              </div>
              <div className="info-bx no-scroll">
                <ul className="info-list">
                  <li className="info-item">
                    <strong className="info-title02">{t("features.feature4.title")}</strong>
                    {renderDescription(t("features.feature4.description") as string | string[])}
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section>
        <div className="btn-wrap">
          <div className="btn-inner line-type">
            <Button className="btn btn-primary" onClick={() => navigate(`/${trans}/franchise/locations`)}>{t("features.whyCubeRefundButton")}</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
