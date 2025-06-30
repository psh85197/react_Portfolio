import React, { useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefundTransRefDTO, RefundTransRefResultDTO, ResultDTO } from "@/types/refund-receipt.ts";
import { getRefundReceiptTransRef } from "@/api/services/refund-receipt.ts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Link, useParams } from "react-router-dom";
import ico_top_right_arrow from "@/assets/images/icon/ico_top_right_arrow.png";
import { CommonAlertDialog } from "@/components/ui/common-alert-dialog.tsx";
import CustomTooltip from "@/pages/[lang]/pub/components/common/tooltip.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { TranslationDTO } from "@/types/translation.ts";
import { dateStrText } from "@/lib/utils.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import TermAgreementFormPage from "@/pages/[lang]/traveler/apply-refund/TermAgreementForm.tsx";
import RefundReceiptFormPage from "@/pages/[lang]/traveler/apply-refund/ReceiptForm.tsx";
import ResultTabPage from "@/pages/[lang]/traveler/apply-refund/ResultTab.tsx";
import { RefundTermAgreementDTO } from "@/types/refund-receipt.ts";
import {useTranslation} from "react-i18next";
import NodataCase from "@/pages/[lang]/pub/components/layouts/nodata-case.tsx";
import {TFunction} from "i18next";

// 환급 전표 조회 스키마
const createRefundReceiptFormSchema = (t: TFunction) =>
  z.object({
    tranRefNo: z
      .string({
        required_error: t("taxRefundAlert.validation.tranRefNo.required"),
      })
      .min(1, { message: t("taxRefundAlert.validation.tranRefNo.required") })
      .max(100, { message: t("taxRefundAlert.validation.tranRefNo.maxLength") })
      .length(12, { message: t("taxRefundAlert.validation.tranRefNo.length") }),
    amount: z
      .string({
        required_error: t("taxRefundAlert.validation.amount.required"),
      })
      .min(1, { message: t("taxRefundAlert.validation.amount.required") })
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 15000), {
        message: t("taxRefundAlert.validation.amount.minimum"),
      }),
  });
type RefundReceiptFormData = z.infer<ReturnType<typeof createRefundReceiptFormSchema>>;

// 환급 전표 조회 결과 상태 메시지
const statusMessages: Record<string, { message: string; className: string; translation: string}> = {
  NF: { message: "전표가 존재하지 않거나 발행 승인 외 거래입니다.", className: "badge-red", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.noSlip.status"},
  NX: { message: "환급 불가", className: "badge-red", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundImpossible.status" },
  YY: { message: "환급 완료", className: "badge-darkgreen", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundComplete.status" },
  NH: { message: "도심 환급 중", className: "badge-green", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.inCityRefundInProgress.status" },
  YH: { message: "환급 중", className: "badge-green", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundInProgress.status" },
  NN: { message: "미반출", className: "badge-gray", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.awaitingCustomsRelease.status" },
  YN: { message: "환급 가능", className: "badge-primary", translation: "refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.refundAvailable.status" },
};

// 환급 신청 폼 데이터 인터페이스
interface ReceiptFormData {
  passportNo: string;
  passportNameLast: string;
  passportNameFirst: string;
  expireDate?: string;
  nationality: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
  emailLocal: string;
  emailDomain: string;
  id?: number;
  refundInfo: string;
  refundType: string;
}

const CombinedRefundPage: React.FC = () => {
  const { t } = useTranslation();
  // 페이지 뙥 상태 (ApplyRefundPage 또는 RefundReceiptTabPage)
  const [view, setView] = useState<"apply" | "tabs">("apply");
  const [results, setResults] = useState<RefundTransRefResultDTO[]>([]);
  const [isResult, setIsResult] = useState(false);
  const [isNoReceipt, setIsNoReceipt] = useState(false);
  const [isDuplicateReceipt, setIsDuplicateReceipt] = useState(false);
  const [checkedItems, setCheckedItems] = useState<RefundTransRefResultDTO[]>([]);
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";

  // 탭 관련 상태
  const [activeTab, setActiveTab] = useState("step01");
  const [termAgreement, setTermAgreement] = useState<RefundTermAgreementDTO | null>(null);
  const [receiptFormData, setReceiptFormData] = useState<ReceiptFormData | null>(null);
  const [resultDto, setResultDto] = useState<ResultDTO | null>(null);
  const [isStep01Completed, setIsStep01Completed] = useState(false);
  const [isStep02Completed, setIsStep02Completed] = useState(false);

  // 환급 전표 조회 폼
  const receiptFormSchema = createRefundReceiptFormSchema(t);

  const form = useForm<RefundReceiptFormData>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: { tranRefNo: "", amount: "" },
  });

  // 모든 상태 초기화 함수
  const resetAllState = () => {
    setView("apply");
    setResults([]);
    setCheckedItems([]);
    setTermAgreement(null);
    setReceiptFormData(null);
    setResultDto(null);
    setIsStep01Completed(false);
    setIsStep02Completed(false);
    setIsResult(false);
    setIsNoReceipt(false);
    setActiveTab("step01");
    form.reset();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 환급 전표 조회 제출
  const onSubmit = async (values: RefundReceiptFormData) => {
    try {
      if (values.amount === undefined) {
        form.setError("amount", { type: "manual", message: t("taxRefundAlert.validation.amount.required") });
        return;
      }

      const isDuplicate = results.some((result) => result.tranRefNo === values.tranRefNo);
      if (isDuplicate) {
        setIsDuplicateReceipt(true);
        return;
      }

      const payload: RefundTransRefDTO = {
        tranRefNo: values.tranRefNo,
        amount: String(values.amount),
      };
      const response = await getRefundReceiptTransRef(payload);
      setIsResult(true);
      if (response.data.rspCode === "0000" && "NX,YY,NH,YH,NN,YN".includes(response.data.status)) {
        setResults((prev) => [...prev, response.data]);
        form.reset();
      } else {
        setIsNoReceipt(true);
        form.reset();
      }
    } catch (error) {
      console.error("등록에 실패하였습니다.", error);
    }
  };

  // 체크박스 처리
  const handleCheckboxChange = (item: RefundTransRefResultDTO) => {
    setCheckedItems((prev) =>
      prev.some((i) => i.tranRefNo === item.tranRefNo)
        ? prev.filter((i) => i.tranRefNo !== item.tranRefNo)
        : [...prev, item]
    );
  };

  // 환급 신청 버튼 클릭
  const handleRefundApplication = () => {
    if (checkedItems.length > 0) {
      setView("tabs"); // 탭 페이지로 전환
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 이전 버튼 클릭
  const handlePrevious = () => {
    setView("apply"); // ApplyRefundPage로 돌아감
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 탭 변경 핸들러
  const handleTabChange = (value: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (activeTab === "step03") return;
    if (value === "step02" && !isStep01Completed) return;
    if (value === "step03" && !isStep02Completed) return;
    setActiveTab(value);
  };

  // Step 01 완료
  const handleStep01Complete = (agreement: RefundTermAgreementDTO) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTermAgreement(agreement);
    setIsStep01Completed(true);
    setActiveTab("step02");
  };

  // Step 02 완료
  const handleStep02Complete = (result: ResultDTO) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setResultDto(result);
    setIsStep02Completed(true);
    setActiveTab("step03");
  };


  return (
    <>
      {view === "apply" ? (
        <>
          <section>
            <div className="hgroup-wrap">
              <h2 className="f48-700-140">{t("refundInquiryAndApplication.title")}</h2>
            </div>
            {/* 환급전표 조회 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="component-form">
              <section>
                <div className="hgroup-wrap more-type line-type">
                  <h2 className="f24-700-140">{t("refundInquiryAndApplication.searchRefundSlip.title")}</h2>
                  <span className="label-txt">
                    {t("refundInquiryAndApplication.searchRefundSlip.requiredFields")}
                    <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                  </span>
                </div>
                <div className="component-group">
                  <div className="from-group grid-type">
                    <div className="from-group-grid">
                      <FormField
                        control={form.control}
                        name="tranRefNo"
                        render={({ field }) => (
                          <FormItem>
                            <label htmlFor="tranRefNo" className="input-label">
                              <FormLabel>
                                <span className="label-txt">
                                  {t("refundInquiryAndApplication.searchRefundSlip.serialNo.label")}
                                  <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                                </span>
                              </FormLabel>
                            </label>
                            <FormControl>
                              <div className="input-group">
                                <ShadcnInput {...field}
                                             filterType="number"
                                             placeholder={t("refundInquiryAndApplication.searchRefundSlip.serialNo.placeholder")}
                                             maxLength={100}
                                             clearable />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="from-group-grid">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <label htmlFor="amount" className="input-label">
                              <FormLabel>
                                <span className="label-txt">
                                  {t("refundInquiryAndApplication.searchRefundSlip.paymentTotal.label")}
                                  <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                                </span>
                              </FormLabel>
                            </label>
                            <FormControl>
                              <div className="input-group">
                                <ShadcnInput
                                  {...field}
                                  placeholder={t("refundInquiryAndApplication.searchRefundSlip.paymentTotal.placeholder")}
                                  filterType="number"
                                  onChange={(e) => field.onChange(e.target.value === "" ? "" : e.target.value)}
                                  value={field.value ?? ""}
                                  maxLength={10}
                                  clearable
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="btn-wrap">
                    <div className="btn-inner line-type mt-64">
                      <Button className="btn btn-primary" type="submit">{t("refundInquiryAndApplication.searchRefundSlip.searchButton")}</Button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </Form>
          </section>
          {isResult && results?.length > 0 && (
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
                  {results.map((result, index) => (
                    <div
                      className={`round-item ${"YN".includes(result.status) ? "" : " disabled"} ${
                        checkedItems.some((i) => i.tranRefNo === result.tranRefNo) ? "selected" : ""
                      }`}
                      onClick={() => handleCheckboxChange(result)}
                      role="button"
                      key={index}
                    >
                      <div className="badge-group">
                        <span className={`badge ${statusMessages[result.status]?.className}`}>
                          {t(statusMessages[result.status]?.translation) || result.resultCode}
                        </span>
                        <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            className="checkbox-input"
                            id={`checkbox-${index}`}
                            checked={checkedItems.some((i) => i.tranRefNo === result.tranRefNo)}
                            onCheckedChange={() => handleCheckboxChange(result)}
                          />
                        </div>
                      </div>
                      <div className="round-item-info">
                        <p className="f15-600-140">{t("refundInquiryAndApplication.searchRefundSlip.slipDetails.serialNo")}</p>
                        <strong className="f18-500-160">{result.tranRefNo || "-"}</strong>
                        <span className="f15-400-140">
                          {t("refundInquiryAndApplication.searchRefundSlip.slipDetails.purchaseDate")} <em>{dateStrText(result.tranDate) || "-"}</em>
                        </span>
                      </div>
                      <div className="round-item-price">
                        <p className="f15-400-140">
                          {t("refundInquiryAndApplication.searchRefundSlip.slipDetails.totalPurchaseAmount")} <span>{Number(result.amount).toLocaleString() || "-"}</span>{t("unit")}
                        </p>
                        <dl>
                          <dt className="f15-600-140">{t("refundInquiryAndApplication.searchRefundSlip.slipDetails.refundAmount")}</dt>
                          <dd className="f16-500-160">
                            <span className="f24-700-140">{Number(result.refundAmt).toLocaleString() || "-"}</span>{t("unit")}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {isResult && results.length === 0 && (
            <section>
              <div className="hgroup-wrap line-type">
                <h2 className="f24-700-140">{t("refundInquiryAndApplication.searchRefundSlip.searchResultsTitle")}</h2>
              </div>
              <NodataCase />
            </section>
          )}
          {isResult && (
            <>
              <section>
                <div className="info-bx no-scroll border-none">
                  <p className="info-txt">{t("refundInquiryAndApplication.searchRefundSlip.notice.title")}</p>
                  <ul className="info-list">
                    <li className="info-item dot">{t("refundInquiryAndApplication.searchRefundSlip.notice.item1")}</li>
                    <li className="info-item dot">{t("refundInquiryAndApplication.searchRefundSlip.notice.item2")}</li>
                    <li className="info-item dot">{t("refundInquiryAndApplication.searchRefundSlip.notice.item3")}</li>
                    <li className="info-item dot">{t("refundInquiryAndApplication.searchRefundSlip.notice.item4")}</li>
                    <li className="info-item dot">{t("refundInquiryAndApplication.searchRefundSlip.notice.item5")}</li>
                    <li className="info-item dot">
                      {t("refundInquiryAndApplication.searchRefundSlip.notice.item6")}
                    </li>
                  </ul>
                </div>
                <div className="btn-wrap">
                  <div className="btn-inner line-type">
                    <Button
                      className={`btn ${checkedItems.length > 0 ? "btn-primary" : "btn-disabled"}`}
                      onClick={handleRefundApplication}
                      disabled={checkedItems.length === 0}
                    >
                      {t("refundInquiryAndApplication.searchRefundSlip.requestRefundButton")}
                    </Button>
                  </div>
                </div>
              </section>
              <section>
                <p className="f20-700-140">{t("refundInquiryAndApplication.searchRefundSlip.questionsAboutRefund")}</p>
                <div className="refund-bx">
                  <ul className="refund-list">
                    <li className="refund-item">
                      <p className="f20-700-140">{t("refundInquiryAndApplication.searchRefundSlip.faq.title")}</p>
                      <Link to={`/${trans}/contact/faq`} className="f18-500-160">
                        <span>{t("refundInquiryAndApplication.searchRefundSlip.faq.link")}</span>
                        <img src={ico_top_right_arrow} alt="아이콘" className="ico-top-right-arrow" />
                      </Link>
                    </li>
                    <li className="refund-item">
                      <p className="f20-700-140">{t("refundInquiryAndApplication.searchRefundSlip.refundInquiry.title")}</p>
                      <Link to={`/${trans}/contact/signup-inquiry`} className="f18-500-160">
                        <span>{t("refundInquiryAndApplication.searchRefundSlip.refundInquiry.link")}</span>
                        <img src={ico_top_right_arrow} alt="아이콘" className="ico-top-right-arrow" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>
            </>
          )}
          <CommonAlertDialog
            type="normal"
            isOpen={isDuplicateReceipt}
            title="전표 조회"
            description={t('taxRefundAlert.validation.tranRefNo.duplicate')}
            confirmText={t('taxRefundAlert.confirm')}
            onConfirm={() => setIsDuplicateReceipt(false)}
          />
          <CommonAlertDialog
            type="normal"
            isOpen={isNoReceipt}
            title="전표 조회"
            description={t("refundInquiryAndApplication.searchRefundSlip.refundStatusGuide.noSlip.description")}
            confirmText={t('taxRefundAlert.confirm')}
            onConfirm={() => setIsNoReceipt(false)}
          />
        </>
      ) : (
        <div className="refundstep-wrap">
          <section>
            <div className="hgroup-wrap">
              <h2 className="f48-700-140">{t('traveler.applyRefund.title')}</h2>
              {/* <p className="desc-txt f18-400-160">홈페이지를 통해 환급을 신청해 주세요.</p> */}
            </div>
          </section>
          <section>
            <div className="component-group">
              <div className="from-group">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="tab-wrap step-type">
                  <TabsList>
                    <TabsTrigger value="step01" disabled={true}>
                      <span>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.title")}</span>
                    </TabsTrigger>
                    <TabsTrigger value="step02" disabled={true}>
                    <span dangerouslySetInnerHTML={{ __html: t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.title") }} />
                    </TabsTrigger>
                    <TabsTrigger value="step03" disabled={true}>
                      <span>{t("refundInquiryAndApplication.refundApplicationResult.title")}</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="step01">
                    <TermAgreementFormPage
                      checkedItems={checkedItems}
                      setActiveTab={setActiveTab}
                      setTermAgreement={handleStep01Complete}
                      termAgreement={termAgreement}
                      onPrevious={handlePrevious}
                    />
                  </TabsContent>
                  <TabsContent value="step02">
                    <RefundReceiptFormPage
                      checkedItems={checkedItems}
                      termAgreement={termAgreement}
                      setActiveTab={setActiveTab}
                      setResultDto={handleStep02Complete}
                      receiptFormData={receiptFormData}
                      setReceiptFormData={setReceiptFormData}
                    />
                  </TabsContent>
                  <TabsContent value="step03">
                    <ResultTabPage
                      checkedItems={checkedItems}
                      resultDto={resultDto}
                      setActiveTab={setActiveTab}
                      resetAllState={resetAllState}/>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default CombinedRefundPage;