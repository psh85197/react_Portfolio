import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs-anchor";
import process_image_01 from "@/assets/images/contents/franchise/process_img01.png";
import process_image_02 from "@/assets/images/contents/franchise/process_img02.png";
import process_image_03 from "@/assets/images/contents/franchise/process_img03.png";
import {Link, useNavigate, useParams} from "react-router-dom";
import { Button } from "@/components/ui/button";
import {TranslationDTO} from "@/types/translation.ts";
import { useTranslation } from 'react-i18next';

const ProcessPage = () => {
  const contentRef = React.useRef(null);
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="process-wrap">
      <section>
      <div className="inner type02">
        <div className="hgroup-wrap mb-16">
          <h2 className="f48-700-140">{t('franchise.process.title')}</h2>
        </div>
        </div>
      </section>
      <section>
        <Tabs defaultValue="step01" className="tab-wrap type02">
          <TabsList>
          <div className="inner type04 flex-type">
            <TabsTrigger value="step01">{t('franchise.process.tabs.goods')}</TabsTrigger>
            <TabsTrigger value="step02">{t('franchise.process.tabs.medical')}</TabsTrigger>
            <TabsTrigger value="step03">{t('franchise.process.tabs.accommodation')}</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent ref={contentRef}>
          <div className="inner type02">
            <div className="process-content" data-value="step01">
              <div className="title-wrap">
                <p className="tit f40-700-130" data-title>{t('franchise.process.tabs.goods')}</p>
              </div>
              <div className="cont-wrap">
                <div className="img-cont">
                  <img
                    src={process_image_01}
                    alt="큐브리펀드 모바일 셀프 반출 오픈"
                  />
                </div>
                <div className="txt-cont">
                  <ul className="step-wrap">
                  <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 1</p>
                          <p className="tit">{t('franchise.process.steps.step2.goods.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step2.goods.description')}
                          </li>
                          <li>
                            {t('franchise.process.steps.step2.goods.subDescription')}
                          </li>
                          <li className="basic font-sm">
                            <a className="type02" href="https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09002&CappBizCD=12100000099&tp_seq=" target="_blank">
                            <span className="icon-span">{t('franchise.process.steps.step2.goods.link')}</span>
                            {/*<span className="icon-span">{t('franchise.process.steps.step2.goods.link2')}</span>*/}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">{t('franchise.process.steps.step1.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>{t('franchise.process.steps.step1.description')}</li>
                          <li className="basic font-sm">
                            <Link to={`/${currentLang}/contact/signup-inquiry`}><span className="icon-span">{t('franchise.process.steps.step1.inquiryLink')}</span></Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 3</p>
                          <p className="tit">{t('franchise.process.steps.step3.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step3.description')}
                          </li>
                          <li>{t('franchise.process.steps.step3.subDescription')}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="process-content" data-value="step02">
              <div className="title-wrap">
                <p className="tit f40-700-130" data-title>{t('franchise.process.tabs.medical')}</p>
              </div>
              <div className="cont-wrap">
                <div className="img-cont">
                  <img src={process_image_02} alt="큐브리펀드 신청 방법" />
                </div>
                <div className="txt-cont">
                  <ul className="step-wrap">
                  <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 1</p>
                          <p className="tit">{t('franchise.process.steps.step2.medical.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step2.medical.description')}
                          </li>
                          <li className="basic font-sm">
                            <a className="type02" href="https://www.medicalkorea.or.kr/korp" target="_blank">
                            <span className="icon-span">{t('franchise.process.steps.step2.medical.link')}</span>
                            {/*<span className="icon-span">{t('franchise.process.steps.step2.medical.link2')}</span>*/}
                            </a>
                            </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">{t('franchise.process.steps.step1.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step1.description')}
                          </li>
                          <li className="basic font-sm">
                            <Link to={`/${currentLang}/contact/signup-inquiry`}><span className="icon-span">{t('franchise.process.steps.step1.inquiryLink')}</span></Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 3</p>
                          <p className="tit">{t('franchise.process.steps.step3.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step3.description')}
                          </li>
                          <li>{t('franchise.process.steps.step3.subDescription')}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="process-content" data-value="step03">
              <div className="title-wrap">
                <p className="tit f40-700-130" data-title>{t('franchise.process.tabs.accommodation')}</p>
              </div>
              <div className="cont-wrap">
                <div className="img-cont">
                  <img src={process_image_03} alt="큐브리펀드 가맹 신청 방법" />
                </div>
                <div className="txt-cont">
                  <ul className="step-wrap">
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 1</p>
                          <p className="tit">{t('franchise.process.steps.step2.accommodation.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step2.accommodation.description')}
                          </li>
                          <li className="basic font-sm">
                            <a href="http://www.hotelskorea.or.kr/plaza/index_1.php?b_id=001" target="_blank">
                            <span className="icon-span">{t('franchise.process.steps.step2.accommodation.links.hotel')}</span>
                            {/*<span className="icon-span">{t('franchise.process.steps.step2.accommodation.links.hotel2')}</span>*/}
                            </a>
                            <a className="type02" href="http://www.condo.or.kr/index.asp" target="_blank">
                            <span className="icon-span">{t('franchise.process.steps.step2.accommodation.links.condo')}</span>
                            {/*<span className="icon-span">{t('franchise.process.steps.step2.accommodation.links.condo2')}</span>*/}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 2</p>
                          <p className="tit">{t('franchise.process.steps.step1.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>{t('franchise.process.steps.step1.description')}</li>
                          <li className="basic font-sm">
                            <Link to={`/${currentLang}/contact/signup-inquiry`}><span className="icon-span">{t('franchise.process.steps.step1.inquiryLink')}</span></Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="step-tit">
                        <div>
                          <p className="num">STEP 3</p>
                          <p className="tit">{t('franchise.process.steps.step3.title')}</p>
                        </div>
                      </div>
                      <div className="step-cont">
                        <ul className="desc-list">
                          <li>
                            {t('franchise.process.steps.step3.description')}
                          </li>
                          <li>{t('franchise.process.steps.step3.subDescription')}</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="btn-wrap">
              <Button className="btn btn-primary" onClick={() => navigate(`/${currentLang}/contact/signup-inquiry`)}>{t('franchise.process.inquiryButton')}</Button>
            </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ProcessPage;
