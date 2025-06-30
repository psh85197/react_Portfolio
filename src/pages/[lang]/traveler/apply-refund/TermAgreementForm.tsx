import React, { useEffect, useState } from 'react';
import { getRefundTermLast } from "@/api/services/terms.ts";
import { toast } from "@/hooks/use-toast.ts";
import { TermsDTO } from "@/types/terms.ts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { RefundTermAgreementDTO, RefundTransRefResultDTO } from "@/types/refund-receipt.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useParams } from "react-router-dom";
import { TranslationDTO } from "@/types/translation.ts";
import dompurify from "dompurify";
import {RadioItem, ShadcnRadio} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";

// STEP 01. 신청 동의
const createTermAgreementFormSchema = (t: TFunction) =>
  z.object({
    termRefund1Agreement: z.boolean().refine((val) => val === true, {
      message: t("taxRefundAlert.resultMessages.termRefund1Agreement"),
    }),
    termRefund2Agreement: z.boolean().refine((val) => val === true, {
      message: t("taxRefundAlert.resultMessages.termRefund2Agreement"),
    }),
    termRefund3Agreement: z.boolean().refine((val) => val === true, {
      message: t("taxRefundAlert.resultMessages.termRefund3Agreement"),
    }),
    termRefund4Agreement: z.boolean().refine((val) => val === true, {
      message: t("taxRefundAlert.resultMessages.termRefund4Agreement"),
    }),
    termRefund5Agreement: z.boolean().refine((val) => val === true, {
      message: t("taxRefundAlert.resultMessages.termRefund5Agreement"),
    }),
    termRefund6Agreement: z.boolean().refine((val) => val === true, {
      message: t("taxRefundAlert.resultMessages.termRefund6Agreement"),
    }),
    termRefund7Agreement: z.boolean().optional(),
  });

type termAgreementFormData = z.infer<ReturnType<typeof createTermAgreementFormSchema>>;

interface TermAgreementFormPageProps {
  checkedItems?: RefundTransRefResultDTO[];
  setActiveTab: (tab: string) => void;
  setTermAgreement: (data: RefundTermAgreementDTO) => void;
  termAgreement: RefundTermAgreementDTO | null;
  onPrevious: () => void; // 추가: 이전 버튼 핸들러
}

const TermAgreementFormPage: React.FC<TermAgreementFormPageProps> = ({
                                                                       setTermAgreement,
                                                                       termAgreement,
                                                                       onPrevious,
                                                                     }) => {
  const { t } = useTranslation();
  const { setLoading } = useLoadingStore();
  const [termRefund1, setTermRefund1] = useState<TermsDTO>();
  const [termRefund2, setTermRefund2] = useState<TermsDTO>();
  const [termRefund3, setTermRefund3] = useState<TermsDTO>();
  const [termRefund4, setTermRefund4] = useState<TermsDTO>();
  const [termRefund5, setTermRefund5] = useState<TermsDTO>();
  const [termRefund6, setTermRefund6] = useState<TermsDTO>();
  const [termRefund7, setTermRefund7] = useState<TermsDTO>();
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";

  const termAgreementFormSchema = createTermAgreementFormSchema(t);

  const form = useForm<termAgreementFormData>({
    resolver: zodResolver(termAgreementFormSchema),
    defaultValues: {
      termRefund1Agreement: false,
      termRefund2Agreement: false,
      termRefund3Agreement: false,
      termRefund4Agreement: false,
      termRefund5Agreement: false,
      termRefund6Agreement: false,
      termRefund7Agreement: undefined,
    },
  });

  // 고유식별정보 약관 가져오기
  const fetchTermRefund = async () => {
    try {
      const response1 = await getRefundTermLast('REFUND_TERM_1');
      setTermRefund1(response1.data[trans] == null ? (response1.data.en == null ? response1.data.ko : response1.data.en) : response1.data[trans]);
      const response2 = await getRefundTermLast('REFUND_TERM_2');
      setTermRefund2(response2.data[trans] == null ? (response2.data.en == null ? response2.data.ko : response2.data.en) : response2.data[trans]);
      const response3 = await getRefundTermLast('REFUND_TERM_3');
      setTermRefund3(response3.data[trans] == null ? (response3.data.en == null ? response3.data.ko : response3.data.en) : response3.data[trans]);
      const response4 = await getRefundTermLast('REFUND_TERM_4');
      setTermRefund4(response4.data[trans] == null ? (response4.data.en == null ? response1.data.ko : response1.data.en) : response4.data[trans]);
      const response5 = await getRefundTermLast('REFUND_TERM_5');
      setTermRefund5(response5.data[trans] == null ? (response5.data.en == null ? response1.data.ko : response1.data.en) : response5.data[trans]);
      const response6 = await getRefundTermLast('REFUND_TERM_6');
      setTermRefund6(response6.data[trans] == null ? (response6.data.en == null ? response1.data.ko : response1.data.en) : response6.data[trans]);
      const response7 = await getRefundTermLast('REFUND_TERM_7');
      setTermRefund7(response7.data[trans] == null ? (response7.data.en == null ? response1.data.ko : response1.data.en) : response7.data[trans]);
    } catch {
      toast({
        variant: "destructive",
        title: "약관 로드 실패",
        description: "약관을 불러오지 못했습니다.",
      });
    }
  };

  const onSubmit = async (values: termAgreementFormData) => {
    setLoading(true);

    try {
      const termIds: number[] = [];
      if (values.termRefund1Agreement && termRefund1?.id) termIds.push(termRefund1.id);
      if (values.termRefund2Agreement && termRefund2?.id) termIds.push(termRefund2.id);
      if (values.termRefund3Agreement && termRefund3?.id) termIds.push(termRefund3.id);
      if (values.termRefund4Agreement && termRefund4?.id) termIds.push(termRefund4.id);
      if (values.termRefund5Agreement && termRefund5?.id) termIds.push(termRefund5.id);
      if (values.termRefund6Agreement && termRefund6?.id) termIds.push(termRefund6.id);
      if (values.termRefund7Agreement && termRefund7?.id) termIds.push(termRefund7.id);

      const payload: RefundTermAgreementDTO = {
        termAgreement: termIds,
        selectGender: values.termRefund7Agreement ?? false,
      };

      const requiredTermIds = [
        termRefund1?.id,
        termRefund2?.id,
        termRefund3?.id,
        termRefund4?.id,
        termRefund5?.id,
        termRefund6?.id,
      ].filter((id) => id !== undefined) as number[];
      const missingTerms = requiredTermIds.filter((id) => !termIds.includes(id));
      if (missingTerms.length > 0) {
        throw new Error("모든 필수 약관에 동의해야 합니다.");
      }

      setTermAgreement(payload);
      console.log('Tab changed to step02');
    } catch (error) {
      console.error('등록에 실패하였습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeAll = (checked: boolean) => {
    form.setValue('termRefund1Agreement', checked);
    form.setValue('termRefund2Agreement', checked);
    form.setValue('termRefund3Agreement', checked);
    form.setValue('termRefund4Agreement', checked);
    form.setValue('termRefund5Agreement', checked);
    form.setValue('termRefund6Agreement', checked);
    form.setValue('termRefund7Agreement', checked);
  };

  useEffect(() => {
    if (termAgreement && termAgreement.termAgreement) {
      const termIds = termAgreement.termAgreement;
      form.setValue('termRefund1Agreement', termIds.includes(termRefund1?.id ?? -1));
      form.setValue('termRefund2Agreement', termIds.includes(termRefund2?.id ?? -1));
      form.setValue('termRefund3Agreement', termIds.includes(termRefund3?.id ?? -1));
      form.setValue('termRefund4Agreement', termIds.includes(termRefund4?.id ?? -1));
      form.setValue('termRefund5Agreement', termIds.includes(termRefund5?.id ?? -1));
      form.setValue('termRefund6Agreement', termIds.includes(termRefund6?.id ?? -1));
      form.setValue('termRefund7Agreement', termIds.includes(termRefund7?.id ?? -1));
      console.log('Term agreement data restored:', termAgreement);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [termAgreement, termRefund1, termRefund2, termRefund3, termRefund4, termRefund5, termRefund6, termRefund7, form]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = form.formState.errors;
      const priorityFields: (keyof termAgreementFormData)[] = [
        'termRefund1Agreement',
        'termRefund2Agreement',
        'termRefund3Agreement',
        'termRefund4Agreement',
        'termRefund5Agreement',
        'termRefund6Agreement',
        'termRefund7Agreement',
      ];
      const firstErrorField = priorityFields.find((field) => errors[field]);
      if (firstErrorField) {
        setTimeout(() => {
          form.setFocus(firstErrorField);
          // 대체 포커스 로직
          const inputElement = document.querySelector(`#${firstErrorField}`) as HTMLInputElement;
          if (inputElement) {
            inputElement.focus();
          }
        }, 0);
      }
      return;
    }
    form.handleSubmit(onSubmit)();
  };
  useEffect(() => {
    fetchTermRefund();
  }, [trans]);

  return (
    <section>
      <div className="info-list-wrap">
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="component-form">
            {/* 고유 식별 정보 수집·이용 동의 (필수) */}
            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund1Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToUniqueIdCollection.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund1?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox className="checkbox-input" id="termRefund1Agreement" checked={field.value} onCheckedChange={field.onChange} />
                            <label htmlFor="termRefund1Agreement" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToUniqueIdCollection.agreement")}</label>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund2Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToPersonalInfoCollection.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund2?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox className="checkbox-input" id="termRefund2Agreement" checked={field.value} onCheckedChange={field.onChange} />
                            <label htmlFor="termRefund2Agreement" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToPersonalInfoCollection.agreement")}</label>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund3Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyUniqueIdSharing.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund3?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox className="checkbox-input" id="termRefund3Agreement" checked={field.value} onCheckedChange={field.onChange} />
                            <label htmlFor="termRefund3Agreement" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyUniqueIdSharing.agreement")}</label>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund4Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyPersonalDataSharing1.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund4?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox className="checkbox-input" id="termRefund4Agreement" checked={field.value} onCheckedChange={field.onChange} />
                            <label htmlFor="termRefund4Agreement" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyPersonalDataSharing1.agreement")}</label>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund5Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyPersonalDataSharing2.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund5?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox className="checkbox-input" id="termRefund5Agreement" checked={field.value} onCheckedChange={field.onChange} />
                            <label htmlFor="termRefund5Agreement" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyPersonalDataSharing2.agreement")}</label>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund6Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyPersonalDataSharing3.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund6?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox className="checkbox-input" id="termRefund6Agreement" checked={field.value} onCheckedChange={field.onChange} />
                            <label htmlFor="termRefund6Agreement" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToThirdPartyPersonalDataSharing3.agreement")}</label>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item">
              <FormField
                control={form.control}
                name="termRefund7Agreement"
                render={({ field }) => (
                  <FormItem>
                    <div className="hgroup-wrap sub">
                      <p className="f24-700-140">
                        <FormLabel>{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToPersonalInfoCollectionOptional.title")}</FormLabel>
                      </p>
                    </div>
                    <div className="info-bx">
                      <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(termRefund7?.content || "") }} />
                    </div>
                    <FormControl>
                      <div className="component-group radio-container">
                        <div className="from-group">
                          <div className="radio-group">
                            <ShadcnRadio
                              value={field.value === true ? "agree" : field.value === false ? "disagree" : ""}
                              onValueChange={(value) => {
                                field.onChange(value === "agree" ? true : false);
                              }}
                            >
                              <div className="radio-item">
                                <RadioItem value="agree" id="radio-7" />
                                <Label htmlFor="radio-7">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToPersonalInfoCollectionOptional.agreement")}</Label>
                              </div>
                              <div className="radio-item">
                                <RadioItem value="disagree" id="radio-8" />
                                <Label htmlFor="radio-8">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.consentToPersonalInfoCollectionOptional.disagreement")}</Label>
                              </div>
                            </ShadcnRadio>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="info-list-item border-top">
              <div className="component-group">
                <div className="from-group flex-type">
                  <div className="checkbox-wrap">
                    <Checkbox className="checkbox-input" id="agree-all" onCheckedChange={handleAgreeAll} />
                    <label htmlFor="agree-all" className="">{t("refundInquiryAndApplication.acknowledgmentOfPolicy.agreeAll")}</label>
                  </div>
                </div>
              </div>
            </div>

            <section className="btn-section">
              <div className="btn-wrap">
                <div className="btn-inner line-type">
                  <Button className="btn btn-default" onClick={onPrevious}>
                    {t("refundInquiryAndApplication.acknowledgmentOfPolicy.backButton")}
                  </Button>
                  <Button type="submit" className="btn btn-primary">
                    {t("refundInquiryAndApplication.acknowledgmentOfPolicy.nextButton")}
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default TermAgreementFormPage;