import {FC, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import newspaper_01 from "@/assets/images/dump/newspaper_01.png";
import newspaper_02 from "@/assets/images/dump/newspaper_02.png";
import newspaper_03 from "@/assets/images/dump/newspaper_03.png";
import newspaper_04 from "@/assets/images/dump/newspaper_04.png";
import newspaper_05 from "@/assets/images/dump/newspaper_05.png";
import newspaper_06 from "@/assets/images/dump/newspaper_06.png";

const EthicsNewspaperPage: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
    <div className="newspaper-wrap sub">
      <section>
        <div className="left-bx">
          <p className="f40-700-130">{t("ethicsNewspaper.title")}</p>
        </div>
        <div className="right-bx">
          <div className="txt-bx">
            <p className="f20-500-160">
              {t("ethicsNewspaper.description")}
            </p>
            <strong className="f20-700-160">
              {t("ethicsNewspaper.notice")}<br className="pc-show mo-hide"/>
            </strong>
          </div>
        </div>
      </section>
      <section>
        <div className="left-bx">
          <p className="f40-700-130">{t("ethicsNewspaper.reportTarget.title")}</p>
        </div>
        <div className="right-bx">
          <div className="card-list">
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_01} alt={t("ethicsNewspaper.reportTarget.corruption.title")} />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">{t("ethicsNewspaper.reportTarget.corruption.title")}</strong>
                <p className="f18-400-160">
                  {t("ethicsNewspaper.reportTarget.corruption.description")}
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_02} alt={t("ethicsNewspaper.reportTarget.humanRights.title")} />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">{t("ethicsNewspaper.reportTarget.humanRights.title")}</strong>
                <p className="f18-400-160">
                  {t("ethicsNewspaper.reportTarget.humanRights.description")}
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_03} alt={t("ethicsNewspaper.reportTarget.ethicsViolation.title")} />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">{t("ethicsNewspaper.reportTarget.ethicsViolation.title")}</strong>
                <p className="f18-400-160">
                  {t("ethicsNewspaper.reportTarget.ethicsViolation.description")}
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_04} alt={t("ethicsNewspaper.reportTarget.complaints.title")} />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">{t("ethicsNewspaper.reportTarget.complaints.title")}</strong>
                <p className="f18-400-160">
                  {t("ethicsNewspaper.reportTarget.complaints.description")}
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_05} alt={t("ethicsNewspaper.reportTarget.accountingFraud.title")} />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">{t("ethicsNewspaper.reportTarget.accountingFraud.title")}</strong>
                <p className="f18-400-160">
                  {t("ethicsNewspaper.reportTarget.accountingFraud.description")}
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_06} alt={t("ethicsNewspaper.reportTarget.codeViolation.title")} />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">{t("ethicsNewspaper.reportTarget.codeViolation.title")}</strong>
                <p className="f18-400-160">
                  {t("ethicsNewspaper.reportTarget.codeViolation.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="left-bx">
          <p className="f40-700-130">{t("ethicsNewspaper.process.title")}</p>
        </div>
        <div className="right-bx">
          <div className="component-group">
            <div className="from-group">
              <Accordion type="single" collapsible className="accordion-wrap">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("ethicsNewspaper.process.steps.reception.title")}</AccordionTrigger>
                  <AccordionContent>
                    {t("ethicsNewspaper.process.steps.reception.description")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("ethicsNewspaper.process.steps.verification.title")}</AccordionTrigger>
                  <AccordionContent>
                    {t("ethicsNewspaper.process.steps.verification.description")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t("ethicsNewspaper.process.steps.investigation.title")}</AccordionTrigger>
                  <AccordionContent>
                    {t("ethicsNewspaper.process.steps.investigation.description")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>{t("ethicsNewspaper.process.steps.completion.title")}</AccordionTrigger>
                  <AccordionContent>
                    {t("ethicsNewspaper.process.steps.completion.description")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>{t("ethicsNewspaper.process.steps.conclusion.title")}</AccordionTrigger>
                  <AccordionContent>
                    {t("ethicsNewspaper.process.steps.conclusion.description")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>{t("ethicsNewspaper.process.steps.result.title")}</AccordionTrigger>
                  <AccordionContent>
                    {t("ethicsNewspaper.process.steps.result.description")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="left-bx">
          <p className="f40-700-130">{t("ethicsNewspaper.protection.title")}</p>
        </div>
        <div className="right-bx">
          <div className="txt-bx">
            <p className="f20-500-160">
              {t("ethicsNewspaper.protection.description")}
            </p>
          </div>
          <div className="info-bx no-scroll">
            <p className="info-txt">{t("ethicsNewspaper.protection.target.title")}</p>
            <ul className="info-list">
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.target.items.security")}
              </li>
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.target.items.identity")}
              </li>
              <li className="info-item dot">{t("ethicsNewspaper.protection.target.items.evidence")}</li>
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.target.items.implication")}
              </li>
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.target.items.followUp")}
              </li>
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.target.items.relatedParties")}
              </li>
            </ul>
          </div>
          <div className="info-bx no-scroll">
            <p className="info-txt">{t("ethicsNewspaper.protection.policy.title")}</p>
            <ul className="info-list">
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.policy.items.investigation")}
              </li>
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.policy.items.confidentiality")}
              </li>
              <li className="info-item dot">{t("ethicsNewspaper.protection.policy.items.noDisadvantage")}</li>
              <li className="info-item dot">
                {t("ethicsNewspaper.protection.policy.items.reasonableHandling")}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default EthicsNewspaperPage;
