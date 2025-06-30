import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { TranslationDTO } from "@/types/translation.ts";
import { useTranslation } from "react-i18next";

// 이미지들을 import 문으로 가져와서 사용
import serviceImage01 from "@/assets/images/contents/franchise/locations_01.png";
import serviceImage02 from "@/assets/images/contents/franchise/locations_02.png";
import serviceImage03 from "@/assets/images/contents/franchise/locations_03.png";
import serviceImage04 from "@/assets/images/contents/franchise/locations_04.png";
import serviceImage05 from "@/assets/images/contents/franchise/locations_05.png";
import serviceImage06 from "@/assets/images/contents/franchise/locations_06.png";

const Locations = () => {
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="refund-wrap">
        <section>
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">{t('locations.title')}</h2>
          </div>
        </section>
        <section>
          <div className="tax-inner">
            <div className="left-bx">
              <div className="hgroup-wrap">
                <h2 className="f40-700-130">
                  {t('locations.subtitle')}
                </h2>
              </div>
            </div>
            <div className="right-bx">
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={serviceImage01} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        {t('locations.services.service1.title')}
                      </strong>
                      <ul className="desc-list">
                        <li>{t('locations.services.service1.desc1')}</li>
                        <li>{t('locations.services.service1.desc2')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={serviceImage02} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        {t('locations.services.service2.title')}
                      </strong>
                      <ul className="desc-list">
                        <li>{t('locations.services.service2.desc1')}</li>
                        <li>{t('locations.services.service2.desc2')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={serviceImage03} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        {t('locations.services.service3.title')}
                      </strong>
                      <ul className="desc-list">
                        <li>{t('locations.services.service3.desc1')}</li>
                        <li>{t('locations.services.service3.desc2')}</li>
                        <li>{t('locations.services.service3.desc3')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={serviceImage04} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        {t('locations.services.service4.title')}
                      </strong>
                      <ul className="desc-list">
                        <li>{t('locations.services.service4.desc')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={serviceImage05} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        {t('locations.services.service5.title')}
                      </strong>
                      <ul className="desc-list">
                        <li>{t('locations.services.service5.desc')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="info-content">
                <div className="tax-img-bx">
                  <img src={serviceImage06} alt="" />
                </div>
                <div className="info-bx no-scroll">
                  <ul className="info-list">
                    <li className="info-item">
                      <strong className="info-title02">
                        {t('locations.services.service6.title')}
                      </strong>
                      <ul className="desc-list">
                        <li>{t('locations.services.service6.desc')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="btn-wrap line-type">
            <div className="btn-inner line-type">
              <Button
                className="btn btn-primary"
                onClick={() => navigate(`/${trans}/contact/signup-inquiry`)}
              >
                {t('locations.inquiry')}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Locations;
