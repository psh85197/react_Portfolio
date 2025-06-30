import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs-anchor";
import history_images01 from "@/assets/images/contents/company/history_img01.png";
import history_images02 from "@/assets/images/contents/company/history_img02.png";
import history_images03 from "@/assets/images/contents/company/history_img03.png";
import { useTranslation } from "react-i18next";

const CompanyHistory = () => {
  const contentRef = React.useRef(null);
  const { t } = useTranslation();

  return (
    <div className="history-wrap">
      <section>
        <div className="inner type02">
          <div className="hgroup-wrap">
            <h2 className="f48-700-140">{t("history.pageTitle")}</h2>
          </div>
        </div>
      </section>
      <section>
        <Tabs defaultValue="step01" className="tab-wrap type02 scroll-type">
          <TabsList>
          <div className="inner type04 flex-type">
            <TabsTrigger value="step01">
              {t("history.tabs.2014To2010")}
            </TabsTrigger>

            <TabsTrigger value="step02">
              {t("history.tabs.2019To2015")}
            </TabsTrigger>

            <TabsTrigger value="step03">
              {t("history.tabs.currentTo2020")}
            </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent ref={contentRef}>
          <div className="inner type02">
            <div className="history-content" data-value="step01">
              <div className="cont-wrap">
                <div className="history-box">
                  <dl data-title>
                    <dt className="tit f40-700-130">
                      {t("history.milestones.currentTo2020.title")}
                    </dt>
                    <dd className="img-cont">
                      <img
                        src={history_images01}
                        alt={t("history.milestones.currentTo2020.imageAlt")}
                      />
                    </dd>
                  </dl>
                </div>
                {/* 퍼블수정 : 20250519 텍스트수정 */}
                <div className="txt-cont">
                  <ul className="txt-wrap">
                    <li>
                      <p className="year f32-700-140">2025</p>
                      <ul className="date-wrap">
                        {/* <li>
                          <p className="date">2025. 06</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2025.items.y2025_06.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2025. 04</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2025.items.y2025_04.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2024</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2024. 12</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2024.items.y2024_12.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2024. 05</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2024.items.y2024_05.desc"
                            )}
                          </p>
                        </li>
                        {/* <li>
                          <p className="date">2024. 04</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2024.items.y2024_04.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2024. 02</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2024.items.y2024_02_01.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2024. 02</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2024.items.y2024_02_02.desc"
                            )}
                          </p>
                        </li>
                        {/* <li>
                          <p className="date">2024. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2024.items.y2024_01.desc"
                            )}
                          </p>
                        </li> */}
                      </ul>
                    </li>
                      {/* <li>
                        <p className="year f32-700-140">2022</p>
                        <ul className="date-wrap">
                          <li>
                            <p className="date">2022. 01</p>
                            <p className="desc">
                              {t(
                                "history.milestones.currentTo2020.years.y2022.items.y2022_01.desc"
                              )}
                            </p>
                          </li>
                        </ul>
                      </li> */}
                    <li>
                      <p className="year f32-700-140">2020</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2020</p>
                          <p className="desc">
                            {t(
                              "history.milestones.currentTo2020.years.y2020.items.y2020.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="history-content" data-value="step02">
              <div className="cont-wrap">
                <div className="history-box">
                  <dl data-title>
                    <dt className="tit f40-700-130">
                      {t("history.milestones.2019To2015.title")}
                    </dt>
                    <dd className="img-cont">
                      <img
                        src={history_images02}
                        alt={t("history.milestones.2019To2015.imageAlt")}
                      />
                    </dd>
                  </dl>
                </div>
                {/* 퍼블수정 : 20250519 텍스트수정 */}
                <div className="txt-cont">
                  <ul className="txt-wrap">
                    <li>
                      <p className="year f32-700-140">2019</p>
                      <ul className="date-wrap">
                        {/* <li>
                          <p className="date">2019. 04</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2019.items.y2019_04_01.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2019. 04</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2019.items.y2019_04_02.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2019. 04</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2019.items.y2019_04_03.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2018</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2018. 09</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2018.items.y2018_09.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 08</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2018.items.y2018_08.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 04</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2018.items.y2018_04.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 03</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2018.items.y2018_03.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2018. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2018.items.y2018_01.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2017</p>
                      <ul className="date-wrap">
                        {/* <li>
                          <p className="date">2017. 08</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2017.items.y2017_08.desc"
                            )}
                          </p>
                        </li> */}
                        {/* <li>
                          <p className="date">2017. 03</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2017.items.y2017_03_01.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2017. 03</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2017.items.y2017_03_02.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2016</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2016. 09</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2016.items.y2016_09.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2016. 08</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2016.items.y2016_08.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2016. 05</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2016.items.y2016_05.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2016. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2016.items.y2016_01.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2015</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2015. 10</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2015.items.y2015_10_01.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2015. 10</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2015.items.y2015_10_02.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2015. 03</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2015.items.y2015_03.desc"
                            )}
                          </p>
                        </li>
                        {/* <li>
                          <p className="date">2015. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2015.items.y2015_01_01.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2015. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2019To2015.years.y2015.items.y2015_01_02.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="history-content" data-value="step03">
              <div className="cont-wrap">
                <div className="history-box">
                  <dl data-title>
                    <dt className="tit f40-700-130">
                      {t("history.milestones.2014To2010.title")}
                    </dt>
                    <dd className="img-cont">
                      <img
                        src={history_images03}
                        alt={t("history.milestones.2014To2010.imageAlt")}
                      />
                    </dd>
                  </dl>
                </div>
                {/* 퍼블수정 : 20
                250519 텍스트수정 */}
                <div className="txt-cont">
                  <ul className="txt-wrap">
                    <li>
                      <p className="year f32-700-140">2014</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2014. 12</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2014.items.y2014_12.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2014. 11</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2014.items.y2014_11.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2014. 10</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2014.items.y2014_10.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2014. 07</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2014.items.y2014_07_01.desc"
                            )}
                          </p>
                        </li>
                        {/* <li>
                          <p className="date">2014. 05</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2014.items.y2014_05.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2014. 02</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2014.items.y2014_02_01.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2013</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2013. 09</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2013.items.y2013_09.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2013. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2013.items.y2013_01.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2012</p>
                      <ul className="date-wrap">
                        <li>
                          <p className="date">2012. 12</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2012.items.y2012_12.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2012. 01</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2012.items.y2012_01.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2011</p>
                      <ul className="date-wrap">
                        {/* <li>
                          <p className="date">2011. 07</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2011.items.y2011_07_01.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2011. 07</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2011.items.y2011_07_02.desc"
                            )}
                          </p>
                        </li>
                        <li>
                          <p className="date">2011. 02</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2011.items.y2011_02.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p className="year f32-700-140">2010</p>
                      <ul className="date-wrap">
                        {/* <li>
                          <p className="date">2010. 12</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2010.items.y2010_12.desc"
                            )}
                          </p>
                        </li> */}
                        <li>
                          <p className="date">2010. 08</p>
                          <p className="desc">
                            {t(
                              "history.milestones.2014To2010.years.y2010.items.y2010_08.desc"
                            )}
                          </p>
                        </li>
                      </ul>
                    </li>
                    {/* 퍼블수정 : 20250516 연혁 추가 및 간격 수정 E */}
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default CompanyHistory;
