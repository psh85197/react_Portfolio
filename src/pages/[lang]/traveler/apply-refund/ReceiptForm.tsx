import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import {Input as ShadcnInput, Input} from "@/components/ui/input.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { RefundReceiptDTO, RefundTermAgreementDTO, RefundTransRefResultDTO, ResultDTO } from "@/types/refund-receipt.ts";
import { getRefundReceipt } from "@/api/services/refund-receipt.ts";
import { RadioItem, ShadcnRadio } from "@/components/ui/radio-group.tsx";
import { Label } from "@radix-ui/react-label";
import { Select } from "@/components/ui/select-custom";
import { getCommonCodeNationalityList } from "@/api/services/common-code.ts";
import { toast } from "@/hooks/use-toast.ts";
import { dateStrText } from "@/lib/utils.ts";
import {NationalityCode} from "@/types/common-code.ts";
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";

// Luhn 알고리즘과 기타 유틸리티 함수는 동일
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};

const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString(),
  }));
};

const generateDayOptions = (year: string, month: string) => {
  if (!year || !month) return [];
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString(),
  }));
};

const isDevOrLocal = () => {
  const url = window.location.href.toLowerCase();
  return url.includes("dev") || url.includes("local");
};

// zod 스키마는 동일
const createReceiptFormSchema = (t: TFunction) =>
  z
    .object({
      passportNo: z
        .string({
          required_error: t("taxRefundAlert.validation.passportNo.required"),
        })
        .min(5, { message: t("taxRefundAlert.validation.passportNo.minLength") })
        .max(9, { message: t("taxRefundAlert.validation.passportNo.maxLength") })
        .regex(/^[A-Za-z0-9]+$/, { message: t("taxRefundAlert.validation.passportNo.format") }),
      passportNameLast: z
        .string({
          required_error: t("taxRefundAlert.validation.passportNameLast.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.passportNameLast.required") })
        .max(24, { message: t("taxRefundAlert.validation.passportNameLast.maxLength") })
        .regex(/^[A-Za-z]+$/, { message: t("taxRefundAlert.validation.passportNameLast.format") }),
      passportNameFirst: z
        .string({
          required_error: t("taxRefundAlert.validation.passportNameFirst.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.passportNameFirst.required") })
        .max(15, { message: t("taxRefundAlert.validation.passportNameFirst.maxLength") })
        .regex(/^[A-Za-z]+$/, { message: t("taxRefundAlert.validation.passportNameFirst.format") }),
      expireDate: z.string().optional(),
      nationality: z
        .string({
          required_error: t("taxRefundAlert.validation.nationality.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.nationality.required") }),
      gender: z
        .string({
          required_error: t("taxRefundAlert.validation.gender.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.gender.required") }),
      birthDate: z
        .string({
          required_error: t("taxRefundAlert.validation.birthDate.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.birthDate.required") }),
      phoneNumber: z
        .string({
          required_error: t("taxRefundAlert.validation.phoneNumber.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.phoneNumber.required") })
        .max(20, { message: t("taxRefundAlert.validation.phoneNumber.maxLength") })
        .regex(/^\d+$/, { message: t("taxRefundAlert.validation.phoneNumber.format") }),
      emailLocal: z
        .string()
        .min(1, { message: t("taxRefundAlert.validation.emailLocal.required") })
        .max(99, { message: t("taxRefundAlert.validation.emailLocal.maxLength") }),
      emailDomain: z
        .string()
        .min(1, { message: t("taxRefundAlert.validation.emailDomain.required") })
        .max(100, { message: t("taxRefundAlert.validation.emailDomain.maxLength") }),
      id: z.number().optional(),
      refundType: z
        .string({
          required_error: t("taxRefundAlert.validation.refundType.required"),
        })
        .refine((val) => ["2", "5", "6"].includes(val), {
          message: t("taxRefundAlert.validation.refundType.invalid"),
        }),
      refundInfo: z
        .string({
          required_error: t("taxRefundAlert.validation.refundInfo.required"),
        })
        .min(1, { message: t("taxRefundAlert.validation.refundInfo.required") })
        .max(40, { message: t("taxRefundAlert.validation.refundInfo.maxLength") }),
    })
    .refine(
      (data) => {
        const email = `${data.emailLocal}@${data.emailDomain}`;
        return z.string().email().safeParse(email).success;
      },
      { message: t("taxRefundAlert.validation.email.invalid"), path: ["emailLocal"] }
    )
    .refine(
      (data) => {
        const { refundType, refundInfo } = data;
        if (refundType === "2" && !isDevOrLocal()) {
          return (
            /^\d{16}$/.test(refundInfo) &&
            luhnCheck(refundInfo) &&
            /^[3-6,9]/.test(refundInfo)
          );
        }
        return true;
      },
      { message: t("taxRefundAlert.validation.refundInfo.cardNumber"), path: ["refundInfo"] }
    )
    .refine(
      (data) => {
        const { refundType, refundInfo } = data;
        if (refundType === "5") {
          return refundInfo.length >= 11;
        }
        return true;
      },
      { message: t("taxRefundAlert.validation.refundInfo.alipay"), path: ["refundInfo"] }
    )
    .refine(
      (data) => {
        const { refundType, refundInfo } = data;
        if (refundType === "6") {
          return refundInfo.length >= 5;
        }
        return true;
      },
      { message: t("taxRefundAlert.validation.refundInfo.wechatPay"), path: ["refundInfo"] }
    );

type ReceiptFormData = z.infer<ReturnType<typeof createReceiptFormSchema>>;

interface RefundReceiptFormPageProps {
  checkedItems: RefundTransRefResultDTO[];
  termAgreement: RefundTermAgreementDTO | null;
  setActiveTab: (tab: string) => void;
  setResultDto: (result: ResultDTO, formData: ReceiptFormData) => void;
  receiptFormData: ReceiptFormData | null;
  setReceiptFormData: (data: ReceiptFormData) => void;
}

const RefundReceiptFormPage: React.FC<RefundReceiptFormPageProps> = ({
                                                                       checkedItems,
                                                                       termAgreement,
                                                                       setActiveTab,
                                                                       setResultDto,
                                                                       receiptFormData,
                                                                       setReceiptFormData,
                                                                     }) => {
  const { t } = useTranslation();
  const { setLoading } = useLoadingStore();
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [nationalityList, setNationalityList] = useState<{ value: string; label: string }[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const genderOptions = [
    { value: "M", label: t('taxRefundAlert.genderM') },
    { value: "F", label: t('taxRefundAlert.genderF') },
  ];

  const receiptFormSchema = createReceiptFormSchema(t);

  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: receiptFormData || {
      passportNameLast: "",
      passportNameFirst: "",
      passportNo: "",
      expireDate: "",
      nationality: "",
      gender: termAgreement?.selectGender ? "" : "N",
      birthDate: "",
      phoneNumber: "",
      emailLocal: "",
      emailDomain: "",
      refundType: "2",
      refundInfo: "",
    },
  });

  const refundType = form.watch("refundType");

  useEffect(() => {
    if (receiptFormData && isInitialLoad) {
      form.reset(receiptFormData);
      if (receiptFormData.birthDate && receiptFormData.birthDate.length === 8) {
        setSelectedYear(receiptFormData.birthDate.slice(0, 4));
        setSelectedMonth(receiptFormData.birthDate.slice(4, 6));
        setSelectedDay(receiptFormData.birthDate.slice(6, 8));
      }
      setIsInitialLoad(false);
      console.log("Receipt form data restored:", receiptFormData);
    }
  }, [receiptFormData, form, isInitialLoad]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      const timeout = setTimeout(() => setReceiptFormData(value as ReceiptFormData), 300);
      return () => clearTimeout(timeout);
    });
    return () => subscription.unsubscribe();
  }, [form, setReceiptFormData]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      form.setValue("birthDate", `${selectedYear}${selectedMonth}${selectedDay}`);
    } else {
      form.setValue("birthDate", "");
    }
  }, [selectedYear, selectedMonth, selectedDay, form]);

  useEffect(() => {
    fetchNationality();
  }, []);

  const fetchNationality = async () => {
    try {
      const response = await getCommonCodeNationalityList();
      const nationArr = response.data.map((nationality: NationalityCode) => ({
        value: nationality.code,
        label: nationality.name,
      }));
      setNationalityList(nationArr);
    } catch {
      toast({
        variant: "destructive",
        title: "문의 유형 로드 실패",
        description: "문의 유형을 불러오지 못했습니다.",
      });
    }
  };

  const onSubmit = async (values: ReceiptFormData) => {
    setLoading(true);
    try {
      const payload: RefundReceiptDTO = {
        customerName: values.passportNameLast.toUpperCase() + " " + values.passportNameFirst.toUpperCase(),
        passportNo: values.passportNo.toUpperCase(),
        customerCountry: values.nationality,
        customerSex: values.gender,
        birthDate: values.birthDate,
        phoneNo: values.phoneNumber,
        customerEmail: values.emailLocal + "@" + values.emailDomain,
        termAgreement: termAgreement?.termAgreement || [],
        tranRefNo: checkedItems.map((item) => item.tranRefNo),
        reqCnt: checkedItems.length,
        refundInfo: values.refundInfo,
        refundType: parseInt(values.refundType),
      };

      const response = await getRefundReceipt(payload);

      if (response.code === 200 && response.data.params) {
        setResultDto(response.data.params, values);
      } else {
        throw new Error("환급 신청 실패");
      }
    } catch (error) {
      console.error("등록에 실패하였습니다.", error);
      toast({
        variant: "destructive",
        title: "환급 신청 실패",
        description: "환급 신청 처리 중 오류가 발생했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalRefundAmount = (items: RefundTransRefResultDTO[]): number => {
    return items.reduce((total, item) => {
      const amount = typeof item.refundAmt === "string" ? parseFloat(item.refundAmt) : item.refundAmt || 0;
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  };

  const getRefundInfoLabel = () => {
    switch (refundType) {
      case "2":
        return t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.cardNumber.label");
      case "5":
        return t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.alipay");
      case "6":
        return t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.wechatPay");
      default:
        return "환급 정보";
    }
  };

  const getRefundInfoPlaceholder = () => {
    switch (refundType) {
      case "2":
        return t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.cardNumber.placeholder");
      case "5":
        return t("taxRefundAlert.alipay");
      case "6":
        return t("taxRefundAlert.wechat");
      default:
        return "환급 정보를 입력하세요";
    }
  };

  return (
    <div className="apply-refund-wrap">
      <section>
        <div className="hgroup-wrap line-type">
          <h2 className="f24-700-140">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.requestedRefundsTitle")}</h2>
        </div>
        <div className="round-bx list-type">
          <div className="round-inner">
            {checkedItems.map((item, index) => (
              <div className="round-item" key={index}>
                <div className="badge-group">
                  <span className="badge badge-primary">{t("refundInquiryAndApplication.searchRefundSlip.statusLabels.refundAvailable")}</span>
                </div>
                <div className="round-item-info">
                  <p className="f15-600-140">{t("refundInquiryAndApplication.searchRefundSlip.slipDetails.serialNo")}</p>
                  <strong className="f18-500-160">{item.tranRefNo}</strong>
                  <span className="f15-400-140">
                    {t("refundInquiryAndApplication.searchRefundSlip.slipDetails.purchaseDate")} <em>{dateStrText(item.tranDate)}</em>
                  </span>
                </div>
                <div className="round-item-price">
                  <p className="f15-400-140">
                    {t("refundInquiryAndApplication.searchRefundSlip.slipDetails.totalPurchaseAmount")} <span>{Number(item.amount).toLocaleString()}</span>{t('unit')}
                  </p>
                  <dl>
                    <dt className="f15-600-140">{t("refundInquiryAndApplication.searchRefundSlip.slipDetails.refundAmount")}</dt>
                    <dd className="f16-500-160">
                      <span className="f24-700-140">{Number(item.refundAmt).toLocaleString()}</span>{t('unit')}
                    </dd>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="amount-bx">
          <dl>
            <dt className="f20-700-140">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.totalEstimatedRefund")}</dt>
            <dd className="f32-700-140">
              <strong>{calculateTotalRefundAmount(checkedItems).toLocaleString()}</strong>{t('unit')}
            </dd>
          </dl>
        </div>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="component-form">
          <section>
            <div className="hgroup-wrap more-type line-type">
              <h2 className="f24-700-140">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.title")}</h2>
              <span className="label-txt">
                {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.requiredFields")}
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </div>
            <div className="component-group">
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="passportNameLast"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="passportNameLast" className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.nameInPassport.label")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder="Last Name"
                              maxLength={24}
                              clearable
                              filterType="english"
                            />
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
                    name="passportNameFirst"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="passportNameFirst" className="input-label">
                          {/* 20250531 : FirstName 여권성명 주석 */}
                          {/* <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.nameInPassport.label")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span> */}
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder="First Name"
                              maxLength={15}
                              clearable
                              filterType="english"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="passportNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.passportNumber")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              maxLength={9}
                              clearable
                              filterType="passport"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.nationality.label")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Select
                              options={nationalityList}
                              placeholder={t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.nationality.placeholder")}
                              {...field}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.gender")}
                            {termAgreement?.selectGender && (
                              <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                            )}
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Select
                              options={genderOptions}
                              placeholder={t("taxRefundAlert.genderSelect")}
                              {...field}
                              disabled={!termAgreement?.selectGender}
                            />
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
                    name="birthDate"
                    render={() => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.passportDetails.dateOfBirth")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group email-type">
                            <Select
                              options={generateYearOptions()}
                              placeholder={t("taxRefundAlert.year")}
                              onChange={(value) => {
                                setSelectedYear(value);
                                setSelectedDay("");
                              }}
                              scrollToValue="1980"
                              value={selectedYear}
                            />
                            <Select
                              options={generateMonthOptions()}
                              placeholder={t("taxRefundAlert.month")}
                              onChange={(value) => {
                                setSelectedMonth(value);
                                setSelectedDay("");
                              }}
                              value={selectedMonth}
                            />
                            <Select
                              options={generateDayOptions(selectedYear, selectedMonth)}
                              placeholder={t("taxRefundAlert.day")}
                              onChange={(value) => setSelectedDay(value)}
                              disabled={!selectedYear || !selectedMonth}
                              value={selectedDay}
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{form.formState.errors.birthDate?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hgroup-wrap more-type line-type">
              <h2 className="f24-700-140">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.contactInformation.title")}</h2>
              <span className="label-txt">
                {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.contactInformation.requiredFields")}
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </div>
            <div className="component-group">
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.contactInformation.phone")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={t("contact.enterNumbersOnly")}
                              maxLength={20}
                              clearable
                              filterType="number"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="from-group-grid">
                  <FormLabel className="input-label">
                    <span className="label-txt">
                      {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.contactInformation.email")}
                      <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                    </span>
                  </FormLabel>
                  <div className="input-group email-type">
                    <div className="email-type-input">
                      <FormField
                        control={form.control}
                        name="emailLocal"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ShadcnInput
                                {...field}
                                placeholder="ID"
                                maxLength={99}
                                clearable
                                filterType={"email"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span>@</span>
                      <FormField
                        control={form.control}
                        name="emailDomain"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ShadcnInput
                                {...field}
                                placeholder=""
                                maxLength={100}
                                clearable
                                filterType={"email"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='payment'>
            {/* Payment Method */}
            <div className="hgroup-wrap more-type line-type">
              <h2 className="f24-700-140">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.title")}</h2>
              <span className="label-txt">
                {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.requiredFields")}
                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
              </span>
            </div>
            <div className="component-group">
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="refundType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.meansOfRefund")}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <ShadcnRadio
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue("refundInfo", "");
                            }}
                          >
                            <div className="radio-item">
                              <RadioItem value="2" id="r1" />
                              <Label htmlFor="r1">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.creditCard")}</Label>
                            </div>
                            <div className="radio-item">
                              <RadioItem value="5" id="r2" />
                              <Label htmlFor="r2">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.alipay")}</Label>
                            </div>
                            <div className="radio-item">
                              <RadioItem value="6" id="r3" />
                              <Label htmlFor="r3">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.refundMethod.wechatPay")}</Label>
                            </div>
                          </ShadcnRadio>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="refundInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="input-label">
                          <span className="label-txt">
                            {getRefundInfoLabel()}
                            <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={getRefundInfoPlaceholder()}
                              maxLength={refundType === "2" ?16:40}
                              clearable
                              filterType={refundType === "2" ? "number" : null}
                            />
                          </div>
                        </FormControl>
                        <FormMessage>{form.formState.errors.refundInfo?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="info-bx no-scroll">
              <p className="info-txt">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.notice.title")}</p>
              <ul className="info-list">
                <li className="info-item dot">{t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.notice.item1")}</li>
                <li className="info-item dot">
                  {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.notice.item2")}
                </li>
              </ul>
            </div>
            <div className="btn-wrap">
              <div className="btn-inner line-type">
                <Button className="btn btn-default" type="button" onClick={() => setActiveTab("step01")}>
                  {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.backButton")}
                </Button>
                <Button className="btn btn-primary" type="submit">
                  {t("refundInquiryAndApplication.refundApplicationAndPaymentMethodRegistration.submitButton")}
                </Button>
              </div>
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
};

export default RefundReceiptFormPage;