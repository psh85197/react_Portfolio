import React from 'react';
import {Button} from "@/components/ui/button.tsx";
import {RefundTransRefResultDTO, ResultDTO} from "@/types/refund-receipt.ts";
import CustomTooltip from "@/pages/[lang]/pub/components/common/tooltip.tsx";
import {dateStrText} from "@/lib/utils.ts";
import {useTranslation} from "react-i18next";

interface ResultTabPageProps {
  checkedItems: RefundTransRefResultDTO[];
  resultDto: ResultDTO | null;
  setActiveTab: (tab: string) => void;
  resetAllState: () => void;
}

const ResultTabPage: React.FC<ResultTabPageProps> = ({checkedItems,resultDto,resetAllState}) => {
  const { t } = useTranslation();
  const calculateTotalRefundAmount = (): number => {
    if (!resultDto || resultDto.rspCode != "0000" || !checkedItems.length) return 0;

    return checkedItems.reduce((total, item) => {
      // tranRefNo로 resultDto에서 해당 결과 찾기
      const result = resultDto.records.find(record => record.tranRefNo === item.tranRefNo);
      if (result && result.resultCode === "0000") {
        const amount = typeof item.refundAmt === "string" ? parseFloat(item.refundAmt) : item.refundAmt || 0;
        return total + (isNaN(amount) ? 0 : amount);
      }
      return total;
    }, 0);
  };

  // 전표의 결과 정보 가져오기
  const getResultInfo = (tranRefNo: string): { resultCode: string; resultMsg: string; } => {
    if (!resultDto || resultDto.rspCode != "0000") {
      return { resultCode: "1", resultMsg: "taxRefundAlert.resultMessages.nodata" }; // 기본값: 실패
    }

    // records 배열에서 tranRefNo에 해당하는 결과 찾기
    const record = resultDto?.records?.find(record => record.tranRefNo === tranRefNo);
    if (!record) {
      return { resultCode: "1", resultMsg: "taxRefundAlert.resultMessages.nodata" }; // 해당 전표 번호 없음
    }

    if (resultDto.rspCode === "0000") {
      if (record.resultCode === "0000"){
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.success" };
      } else if (record.resultCode === "0055") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.invalidCardCompany" };
      } else if (record.resultCode === "1001") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.invalidSlipNumber" };
      } else if (record.resultCode === "1002") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.passportMismatch" };
      } else if (record.resultCode === "1003") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.canceledSlip" };
      } else if (record.resultCode === "1004") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.refundedSlip" };
      } else if (record.resultCode === "1005") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.customsVerificationRequired" };
      } else if (record.resultCode === "5102" || record.resultMsg === "5104") {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.contactAdmin" };
      }else if (record.resultCode === "9998" ) {
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.contactAdmin" };
      }else{
        return { resultCode: record.resultCode, resultMsg: "taxRefundAlert.resultMessages.default" };
      }
    }

    return { resultCode: record.resultCode, resultMsg: record.resultMsg };
  };


  return (
    <>
      <section>
        <div className="hgroup-wrap sub tooltip-type line-type">
          <p className="f24-700-140">{t("refundInquiryAndApplication.searchRefundSlip.searchResultsTitle")}</p>
          <div className="tooltip">
            <CustomTooltip
              content={`
                      <div class='refund-type'>
                        <div class='tooltip-tit'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.title")}</div>
                        <div class='tooltip-info'>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-gray'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.noSlip.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.noSlip.description")}</div>
                          </div>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-gray'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.awaitingCustomsRelease.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.awaitingCustomsRelease.description")}</div>
                          </div>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-primary'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundAvailable.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundAvailable.description")}</div>
                          </div>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-green'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundInProgress.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundInProgress.description")}</div>
                          </div>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-green'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.inCityRefundInProgress.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.inCityRefundInProgress.description")}</div>
                          </div>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-darkgreen'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundComplete.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundComplete.description")}</div>
                          </div>
                          <div class='tooltip-info-item'>
                            <div class='badge-group'>
                              <span class='badge badge-red'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundImpossible.status")}</span>
                            </div>
                            <div class='tooltip-info-item-txt'>${t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundImpossible.description")}</div>
                          </div>
                        </div>
                      </div>
                    `}
              showCloseButton={true}
            />
          </div>
        </div>
        <div className="round-bx list-type">
          <div className="round-inner">
            {checkedItems.map((item, index) => {
              const { resultCode, resultMsg } = getResultInfo(item.tranRefNo);
              const isSuccess = resultCode === "0000";
              return (
                <div className="round-item" key={index}>
                  <div className="badge-group flex-direction">
                    <span className={`badge ${isSuccess ? 'badge-darkgreen' : 'badge-red'}`}>
                      {isSuccess ? t('taxRefundAlert.resultMessages.success') :  t('taxRefundAlert.resultMessages.fail')}
                    </span>
                    {!isSuccess && resultMsg && (
                      <span className="badge-desc">{t(resultMsg)}</span>
                    )}
                  </div>
                  <div className="round-item-info">
                    <p className="f15-600-140">{t("taxRefundAlert.transNo")}</p>
                    <strong className="f18-500-160">{item.tranRefNo}</strong>
                    <span className="f15-400-140">
                      {t("taxRefundAlert.Date")} <em>{dateStrText(item.tranDate)}</em>
                    </span>
                  </div>
                  <div className="round-item-price">
                    <p className="f15-400-140">
                      {t("taxRefundAlert.totalCont")} <span>{Number(item.amount).toLocaleString()}</span>{t('unit')}
                    </p>
                    <dl>
                      <dt className="f15-600-140">{t("taxRefundAlert.resultMessages.amount")}</dt>
                      <dd className="f16-500-160">
                        <span className="f24-700-140">{Number(item.refundAmt).toLocaleString()}</span>{t('unit')}
                      </dd>
                    </dl>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="amount-bx">
          <dl>
            <dt className="f20-700-140">{t("taxRefundAlert.resultMessages.amountTotal")} (KRW)</dt>
            <dd className="f32-700-140">
              <strong>{calculateTotalRefundAmount().toLocaleString()}</strong>{t('unit')}
            </dd>
          </dl>
        </div>
      </section>
      <section>
        <div className="info-bx no-scroll border-none">
          <p className="info-txt">{t("refundInquiryAndApplication.refundApplicationResult.notice.title")}</p>
          <ul className="info-list">
            <li className="info-item dot">
              {t("refundInquiryAndApplication.refundApplicationResult.notice.item1")}
              <ul className="under-list">
                <li>
                  <span className="color-primary">cube@cuberefund.com</span>
                  &nbsp; / 02-6925-2033
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="btn-wrap">
          <div className="btn-inner line-type">
            <Button className="btn btn-primary"  onClick={resetAllState}>{t("refundInquiryAndApplication.refundApplicationResult.confirmButton")}</Button>
          </div>
        </div>
      </section>

    </>
  );
};

// 컴포넌트 내보내기
export default ResultTabPage;