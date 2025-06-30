import { Select } from "@/components/ui/select-custom";
import conditions_01 from "@/assets/images/contents/footer/conditions_01.png";
import conditions_02 from "@/assets/images/contents/footer/conditions_02.png";
import conditions_03 from "@/assets/images/contents/footer/conditions_03.png";
import conditions_04 from "@/assets/images/contents/footer/conditions_04.png";
import conditions_05 from "@/assets/images/contents/footer/conditions_05.png";
import conditions_06 from "@/assets/images/contents/footer/conditions_06.png";
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  const firstOptions = [
    { value: "option1", label: t("privacyPolicy.selectOptions.option1_2025_06_02") },
  ];

  return (
    <div className="privacy-policy-wrap">
      <section>
        <div className="hgroup-wrap more-type">
          <p className="f40-700-140">{t("privacyPolicy.pageTitle")}</p>
          <Select
            options={firstOptions}
            onChange={(value) => console.log("First Selected:", value)}
            onConfirm={() => console.log("First Confirmed")}
            value={"option1"}
          />
        </div>
      </section>
      <section>
        <div className="txt-list-bx">
          <div className="block-bx">
            <p className="f18-400-160">{t("privacyPolicy.intro.paragraph1")}</p>
          </div>
        </div>
      </section>
      <section>
        <p className="f20-700-140">{t("privacyPolicy.mainPoints.title")}</p>
        <div className="conditions-grid-wrap">
          <div className="conditions-grid">
            {/* Item 1 */}
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_01} alt={t("privacyPolicy.mainPoints.item1.alt")} />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">{t("privacyPolicy.mainPoints.item1.title")}</strong>
                <p className="f16-400-160">{t("privacyPolicy.mainPoints.item1.description")}</p>
                <span className="f14-400-140">{t("privacyPolicy.mainPoints.itemNote")}</span>
              </div>
            </div>
            {/* Item 2 */}
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_02} alt={t("privacyPolicy.mainPoints.item2.alt")} />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">{t("privacyPolicy.mainPoints.item2.title")}</strong>
                <p className="f16-400-160">{t("privacyPolicy.mainPoints.item2.description")}</p>
                <span className="f14-400-140">{t("privacyPolicy.mainPoints.itemNote")}</span>
              </div>
            </div>
            {/* Item 3 */}
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_03} alt={t("privacyPolicy.mainPoints.item3.alt")} />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">{t("privacyPolicy.mainPoints.item3.title")}</strong>
                <p className="f16-400-160">{t("privacyPolicy.mainPoints.item3.description")}</p>
              </div>
            </div>
            {/* Item 4 */}
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_04} alt={t("privacyPolicy.mainPoints.item4.alt")} />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">{t("privacyPolicy.mainPoints.item4.title")}</strong>
                <p className="f16-400-160">{t("privacyPolicy.mainPoints.item4.description")}</p>
              </div>
            </div>
            {/* Item 5 */}
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_05} alt={t("privacyPolicy.mainPoints.item5.alt")} />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">{t("privacyPolicy.mainPoints.item5.title")}</strong>
                <p className="f16-400-160">{t("privacyPolicy.mainPoints.item5.description")}</p>
              </div>
            </div>
            {/* Item 6 */}
            <div className="conditions-grid-item">
              <div className="img-bx">
                <img src={conditions_06} alt={t("privacyPolicy.mainPoints.item6.alt")} />
              </div>
              <div className="info-bx">
                <strong className="f16-600-160">{t("privacyPolicy.mainPoints.item6.title")}</strong>
                <p className="f16-400-160">{t("privacyPolicy.mainPoints.item6.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <p className="f20-700-140">{t("privacyPolicy.contentsOverview.title")}</p>
        <div className="conditions-notice">
          <div>{t("privacyPolicy.contentsOverview.item1")}</div>
          <div>{t("privacyPolicy.contentsOverview.item2")}</div>
          <div>{t("privacyPolicy.contentsOverview.item3")}</div>
          <div>{t("privacyPolicy.contentsOverview.item4")}</div>
          <div>{t("privacyPolicy.contentsOverview.item5")}</div>
          <div>{t("privacyPolicy.contentsOverview.item6")}</div>
          <div>{t("privacyPolicy.contentsOverview.item7")}</div>
          <div>{t("privacyPolicy.contentsOverview.item8")}</div>
          <div>{t("privacyPolicy.contentsOverview.item9")}</div>
        </div>
      </section>
      <section>
        <div className="txt-list-bx">
          {/* Section 1 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section1.title")}</p>
            <p>{t("privacyPolicy.section1.paragraph1")}</p>
            <strong>{t("privacyPolicy.section1.subPointA")}</strong>
            <strong>{t("privacyPolicy.section1.subPointB")}</strong>
          </div>
          {/* Section 2 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section2.title")}</p>
            <p>{t("privacyPolicy.section2.paragraph1")}</p>
            <strong>{t("privacyPolicy.section2.subSection2_1.title")}</strong>
            <ul>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_1.paragraph1")}</p></li>
            </ul>
            <div className="footer-table-wrap">
              <table className="footer-table">
                <thead>
                  <tr>
                    <th>{t("privacyPolicy.table1.header1")}</th>
                    <th>{t("privacyPolicy.table1.header2")}</th>
                    <th>{t("privacyPolicy.table1.header3")}</th>
                    <th>{t("privacyPolicy.table1.header4")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="title">{t("privacyPolicy.table1.row1.col1")}</td>
                    <td>{t("privacyPolicy.table1.row1.col2")}</td>
                    <td>{t("privacyPolicy.table1.row1.col3")}</td>
                    <td>{t("privacyPolicy.table1.row1.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title">{t("privacyPolicy.table1.row2.col1")}</td>
                    <td>{t("privacyPolicy.table1.row2.col2")}</td>
                    <td>{t("privacyPolicy.table1.row2.col3")}</td>
                    <td>{t("privacyPolicy.table1.row2.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title">{t("privacyPolicy.table1.row3.col1")}</td>
                    <td>{t("privacyPolicy.table1.row3.col2")}</td>
                    <td>{t("privacyPolicy.table1.row3.col3")}</td>
                    <td>{t("privacyPolicy.table1.row3.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title">{t("privacyPolicy.table1.row4.col1")}</td>
                    <td>{t("privacyPolicy.table1.row4.col2")}</td>
                    <td>{t("privacyPolicy.table1.row4.col3")}</td>
                    <td>{t("privacyPolicy.table1.row4.col4")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <strong>{t("privacyPolicy.section2.subSection2_2.title")}</strong>
            <ul>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_2.paragraph1")}</p></li>
            </ul>
            <div className="footer-table-wrap">
              <table className="footer-table">
                <thead>
                  <tr>
                    <th>{t("privacyPolicy.table2.header1")}</th>
                    <th colSpan={2}>{t("privacyPolicy.table2.header2")}</th>
                    <th>{t("privacyPolicy.table2.header3")}</th>
                    <th>{t("privacyPolicy.table2.header4")}</th>
                    <th>{t("privacyPolicy.table2.header5")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="title" rowSpan={3}>{t("privacyPolicy.table2.row1.col1")}</td>
                    <td scope="col" rowSpan={3}>{t("privacyPolicy.table2.row1.col2")}</td>
                    <td>{t("privacyPolicy.table2.row1.col3")}</td>
                    <td rowSpan={3}>{t("privacyPolicy.table2.row1.col4")}</td>
                    <td>{t("privacyPolicy.table2.row1.col5")}</td>
                    <td>{t("privacyPolicy.table2.row1.col6")}</td>
                   </tr>
                  <tr>
                    {/* <td className="title" rowSpan={2}>{t("privacyPolicy.table2.row2.col1")}</td>  This cell is covered by rowspan from above */}
                    <td className="left-border">{t("privacyPolicy.table2.row2.col2")}</td>
                    <td>{t("privacyPolicy.table2.row2.col3")}</td>
                    <td rowSpan={2}>{t("privacyPolicy.table2.row2.col4")}</td>
                  </tr>
                  <tr>
                    <td className="left-border">{t("privacyPolicy.table2.row3.col1")}</td>
                    <td>{t("privacyPolicy.table2.row3.col2")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <strong>{t("privacyPolicy.section2.subSection2_3.title")}</strong>
            <ul>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_3.item1")}</p></li>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_3.item2")}</p></li>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_3.item3")}</p></li>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_3.item4")}</p></li>
            </ul>
            <strong>{t("privacyPolicy.section2.subSection2_4.title")}</strong>
            <ul>
              <li><p className="type02">{t("privacyPolicy.section2.subSection2_4.item1")}</p></li>
              <li>
                <strong className="type02">{t("privacyPolicy.section2.subSection2_4.subItemA.title")}</strong>
                <ul>
                  <li className="under">{t("privacyPolicy.section2.subSection2_4.subItemA.paragraph1")}</li>
                  <li><ol><li className="under">{t("privacyPolicy.section2.subSection2_4.subItemA.point1")}</li></ol></li>
                </ul>
              </li>
              <li>
                <strong>{t("privacyPolicy.section2.subSection2_4.subItemB.title")}</strong>
                <ul>
                  <li className="under">{t("privacyPolicy.section2.subSection2_4.subItemB.paragraph1")}</li>
                  <li className="under">{t("privacyPolicy.section2.subSection2_4.subItemB.paragraph2")}</li>
                  <li>
                    <ol>
                      <li className="under">{t("privacyPolicy.section2.subSection2_4.subItemB.point1")}</li>
                      <li className="under">{t("privacyPolicy.section2.subSection2_4.subItemB.point2")}</li>
                    </ol>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* Section 3 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section3.title")}</p>
            <p>{t("privacyPolicy.section3.paragraph1")}</p>
            <strong>{t("privacyPolicy.section3.subPointA")}</strong>
            <strong>{t("privacyPolicy.section3.subPointB")}</strong>
            <strong>{t("privacyPolicy.section3.subPointC.title")}</strong>
            <ul>
              <li><p className="type02">{t("privacyPolicy.section3.subPointC.item1")}</p></li>
              <li><p className="type02">{t("privacyPolicy.section3.subPointC.item2")}</p></li>
              <li><p className="type02">{t("privacyPolicy.section3.subPointC.item3")}</p></li>
            </ul>
          </div>
          {/* Section 4 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section4.title")}</p>
            <p>{t("privacyPolicy.section4.paragraph1")}</p>
            <div className="footer-table-wrap">
              <table className="footer-table">
                <thead>
                  <tr>
                    <th>{t("privacyPolicy.table3.header1")}</th>
                    <th>{t("privacyPolicy.table3.header2")}</th>
                    <th>{t("privacyPolicy.table3.header3")}</th>
                    <th>{t("privacyPolicy.table3.header4")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="title">{t("privacyPolicy.table3.row1.col1")}</td>
                    <td>{t("privacyPolicy.table3.row1.col2")}</td>
                    <td>{t("privacyPolicy.table3.row1.col3")}</td>
                    <td>{t("privacyPolicy.table3.row1.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title">{t("privacyPolicy.table3.row2.col1")}</td>
                    <td>{t("privacyPolicy.table3.row2.col2")}</td>
                    <td>{t("privacyPolicy.table3.row2.col3")}</td>
                    <td>{t("privacyPolicy.table3.row2.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title">{t("privacyPolicy.table3.row3.col1")}</td>
                    <td>{t("privacyPolicy.table3.row3.col2")}</td>
                    <td>{t("privacyPolicy.table3.row3.col3")}</td>
                    <td>{t("privacyPolicy.table3.row3.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title">{t("privacyPolicy.table3.row4.col1")}</td>
                    <td>{t("privacyPolicy.table3.row4.col2")}</td>
                    <td>{t("privacyPolicy.table3.row4.col3")}</td>
                    <td>{t("privacyPolicy.table3.row4.col4")}</td>
                  </tr>
                  <tr>
                    <td className="title color-red">{t("privacyPolicy.table3.row5.col1")}</td>
                    <td className="color-red">{t("privacyPolicy.table3.row5.col2")}</td>
                    <td className="color-red">{t("privacyPolicy.table3.row5.col3")}</td>
                    <td className="color-red">{t("privacyPolicy.table3.row5.col4")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Section 5 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section5.title")}</p>
            <ul>
              <li><strong>{t("privacyPolicy.section5.subPointA.title")}</strong></li>
              <li>
                <ol>
                  <li className="under">{t("privacyPolicy.section5.subPointA.item1")}</li>
                  <li className="under">{t("privacyPolicy.section5.subPointA.item2")}</li>
                  <li className="under">{t("privacyPolicy.section5.subPointA.item3")}</li>
                  <li className="under">{t("privacyPolicy.section5.subPointA.item4")}</li>
                </ol>
              </li>
              <li><strong className="type02">{t("privacyPolicy.section5.subPointB")}</strong></li>
              <li><strong className="type02">{t("privacyPolicy.section5.subPointC")}</strong></li>
              <li><strong className="type02">{t("privacyPolicy.section5.subPointD")}</strong></li>
            </ul>
          </div>
          {/* Section 6 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section6.title")}</p>
            <p>{t("privacyPolicy.section6.paragraph1")}</p>
            <ul>
              <li>
                <strong>{t("privacyPolicy.section6.subPointA.title")}</strong>
                <ol><li className="under">{t("privacyPolicy.section6.subPointA.item1")}</li></ol>
              </li>
              <li>
                <strong>{t("privacyPolicy.section6.subPointB.title")}</strong>
                <ol>
                  <li className="under">{t("privacyPolicy.section6.subPointB.item1")}</li>
                  <li className="under">{t("privacyPolicy.section6.subPointB.item2")}</li>
                </ol>
              </li>
            </ul>
          </div>
          {/* Section 7 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section7.title")}</p>
            <p>{t("privacyPolicy.section7.paragraph1")}</p>
            <ul>
              <li>
                <strong>{t("privacyPolicy.section7.subPointA.title")}</strong>
                <ol>
                  <li className="under type02">{t("privacyPolicy.section7.subPointA.item1.title")}</li>
                  <li><ol><li className="under">{t("privacyPolicy.section7.subPointA.item1.description")}</li></ol></li>
                </ol>
              </li>
              <li>
                <strong>{t("privacyPolicy.section7.subPointB.title")}</strong>
                <ol><li className="under type02">{t("privacyPolicy.section7.subPointB.item1")}</li></ol>
              </li>
              <li>
                <strong>{t("privacyPolicy.section7.subPointC.title")}</strong>
                <ol><li className="under type02">{t("privacyPolicy.section7.subPointC.item1")}</li></ol>
              </li>
            </ul>
          </div>
          {/* Section 8 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section8.title")}</p>
            <strong className="number-1">{t("privacyPolicy.section8.paragraph1")}</strong>
            <ul>
              <li className="type02">{t("privacyPolicy.section8.officer.title")}</li>
              <li>
                <ol>
                  <li className="under">{t("privacyPolicy.section8.officer.name")}</li>
                  <li className="under">{t("privacyPolicy.section8.officer.position")}</li>
                  <li className="under">{t("privacyPolicy.section8.officer.contact")}</li>
                </ol>
              </li>
            </ul>
            <ul>
              <li className="type02">{t("privacyPolicy.section8.manager.title")}</li>
              <li>
                <ol>
                  <li className="under">{t("privacyPolicy.section8.manager.name")}</li>
                  <li className="under">{t("privacyPolicy.section8.manager.position")}</li>
                  <li className="under">{t("privacyPolicy.section8.manager.contact")}</li>
                </ol>
              </li>
            </ul>
            <strong className="number-2">{t("privacyPolicy.section8.paragraph2")}</strong>
            <ol>
              <li className="under type02">{t("privacyPolicy.section8.externalContact1")}</li>
              <li className="under type02">{t("privacyPolicy.section8.externalContact2")}</li>
              <li className="under type02">{t("privacyPolicy.section8.externalContact3")}</li>
            </ol>
          </div>
          {/* Section 9 */}
          <div className="block-bx">
            <p className="f20-700-140">{t("privacyPolicy.section9.title")}</p>
            <p>{t("privacyPolicy.section9.paragraph1")}</p>
            <ol>
              <li className="under type02">{t("privacyPolicy.section9.announcementDate")}</li>
              <li className="under type02">{t("privacyPolicy.section9.effectiveDate")}</li>
              <li className="under type02">{t("privacyPolicy.section9.version")}</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;