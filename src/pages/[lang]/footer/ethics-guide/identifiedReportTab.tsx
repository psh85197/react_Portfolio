import React, {FC, useEffect, useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input as ShadcnInput, Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CommonAlertDialog} from "@/components/ui/common-alert-dialog.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast.ts";
import axios from "axios";
import envConfig from "@/env-config.ts";
import {useLoadingStore} from "@/stores/loading-store.ts";
import {ReportUpdateDTO} from "@/types/report.ts";
import {checkExistsReporterId, createReport} from "@/api/services/report.ts";
import refreshIcon from "@/assets/images/icon/ico_refresh.png";
import {getCommonCodeList} from "@/api/services/common-code.ts";
import {CommonCode, SelectCommon} from "@/types/common-code.ts";
import Select from "@/components/ui/select-custom.tsx";
import {useParams} from "react-router-dom";
import {TranslationDTO} from "@/types/translation.ts";
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import MultiFileUploadReport from "@/components/ui/multiFile-upload-report.tsx";

interface IdentifiedReportTabPageProps {
  setActiveTab: (value: string) => void;
}

// 전체 폼 스키마 정의
// TFunction을 인자로 받도록 수정
const reportFormSchema = (isIdValidated: boolean, t: TFunction) => z.object({
  companyType: z.string().optional(),
  department: z.string().optional(),
  name: z.string({
    required_error: t("validation.selectRequired", {field: t('identifiedReport.reporterInfo.name')}),
  }).min(1, {
    message: t("validation.selectRequired", {field: t('identifiedReport.reporterInfo.name')})
  }),
  phone: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.reporterInfo.phone')}),
  })
    .min(1, {message: t("validation.required", {field: t('identifiedReport.reporterInfo.phone')})})
    .regex(/^(\d{3}\d{3,4}\d{4})$/, t('validation.invalidPhone')),
  emailLocal: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.reporterInfo.email')}),
  })
    .min(1, {message: t('validation.required', {field: t('identifiedReport.reporterInfo.email')})})
    .max(20, {
      message: t("validation.maxLength", {length: 20})
    }),
  emailDomain: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.reporterInfo.emailDomain')}),
  })
    .min(1, {message: t('validation.required', {field: t('identifiedReport.reporterInfo.emailDomain')})})
    .max(20, {
      message: t("validation.maxLength", {length: 20})
    }),
  targetCompanyType: z.string({
    required_error: t("validation.selectRequired", {field: t('identifiedReport.targetInfo.company')}),
  }).min(1, {
    message: t("validation.selectRequired", {field: t('identifiedReport.targetInfo.company')})
  }),
  targetDepartment: z.string({
    required_error: t("validation.selectRequired", {field: t('identifiedReport.targetInfo.department')}),
  }).min(1, {
    message: t("validation.selectRequired", {field: t('identifiedReport.targetInfo.department')})
  }),
  targetName: z.string({
    required_error: t("validation.selectRequired", {field: t('identifiedReport.targetInfo.name')}),
  }).min(1, {
    message: t("validation.selectRequired", {field: t('identifiedReport.targetInfo.name')})
  }),
  title: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.reportContent.subject')}),
  }).min(1, {
    message: t("validation.required", {field: t('identifiedReport.reportContent.subject')})
  }).max(100, {
    message: t("validation.maxLength", {length: 100})
  }),
  content: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.reportContent.content')}),
  }).min(1, {
    message: t("validation.required", {field: t('identifiedReport.reportContent.content')})
  }).max(1500, {
    message: t("validation.maxLength", {length: 1500})
  }),
  reporterId: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.verificationInfo.id')}),
  }).min(6, {
    message: t("validation.reporterIdMinLength"),
  }).max(20, {
    message: t("validation.reporterIdMaxLength"),
  }).refine(() => isIdValidated, {
    message: t("validation.idDuplicateCheck"),
  }),
  password: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.verificationInfo.password')}),
  }).min(6, { // 최소 6자로 되어 있지만, 실제 메시지는 8~20자 영문,숫자,특수문자 조합이므로 8자로 변경하거나 메시지에 맞게 조정 필요
    message: t("validation.passwordFormat")
  }).max(20, {
    message: t("validation.passwordFormat")
  }),
  captchaText: z.string({
    required_error: t("validation.required", {field: t('identifiedReport.security.captcha')}),
  }).min(1, {
    message: t("validation.required", {field: t('identifiedReport.security.captcha')}),
  }),
  /* termAgreement: z.boolean().refine((val) => val === true, {
      message: '약관 동의는 필수입니다.',
    }),*/
  fileMappingId: z.array(z.string()),
}).refine(
  (data) => {
    const email = `${data.emailLocal}@${data.emailDomain}`;
    return z.string().email().safeParse(email).success;
  },
  {
    message: t('validation.invalidEmail'),
    path: ['emailLocal'],
  }
).refine(
  async (data) => {
    try {
      const response = await checkExistsReporterId(data.reporterId);
      return !response.data;
    } catch {
      return false;
    }
  },
  {
    message: t('validation.idAlreadyInUse'),
    path: ['reporterId'],
  }
);


// 폼 데이터 타입 추출
type reportFormData = z.infer<ReturnType<typeof reportFormSchema>>;

const IdentifiedReportTabPage: FC<IdentifiedReportTabPageProps> = ({setActiveTab}) => {
  const {t} = useTranslation();
  const [isIdValidated, setIsIdValidated] = useState(false);
  const form = useForm<reportFormData>({
    resolver: zodResolver(reportFormSchema(isIdValidated, t)), // t 함수를 전달
    defaultValues: {
      companyType: "",
      department: "",
      name: "",
      phone: "",
      targetCompanyType: "",
      targetDepartment: "",
      targetName: "",
      title: "",
      content: "",
      reporterId: "",
      password: "",
      captchaText: "",
      //termAgreement:false,
      fileMappingId: []
    }
  });
  const {setLoading} = useLoadingStore();
  const BASE_API = envConfig.BASE_API;
  const [captchaImage, setCaptchaImage] = useState('');
  const [idState, setIdState] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCreateFail, setIsCreateFail] = useState(false);
  const [companySelect, setCompanySelect] = useState<SelectCommon[]>([]);
  const {lang} = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const [resetSignal, setResetSignal] = useState(false);
  const [isDuplicateId, setIsDuplicateId] = useState(false);
  const [isUseReportId, setIsUseReportId] = useState(false);

  const fetchCompanyType = async () => {
    try {
      const response = await getCommonCodeList('company');
      const transformedData: SelectCommon[] = response.data.map((item: CommonCode) => ({
        label: item.ko,
        value: item.code,
        ko: item.ko,
        en: item.en == "" ? item.ko : item.en,
        zh: item.zh == "" ? item.en == "" ? item.ko : item.en : item.zh,
        ja: item.ja == "" ? item.en == "" ? item.ko : item.en : item.ja,
      }));

      setCompanySelect(transformedData);
    } catch {
      toast({
        variant: "destructive",
        title: "회사구분 로드 실패",
        description: "회사구분을 불러오지 못했습니다.",
      });
    }
  };

  const loadCaptcha = async () => {
    try {
      const response = await axios.get(BASE_API + 'v1/front/captcha', {
        responseType: 'blob',
        withCredentials: true, // 세션 쿠키 전송
      });
      const imageUrl = URL.createObjectURL(response.data);
      setCaptchaImage(imageUrl);
    } catch (error) {
      console.error('CAPTCHA 로드 오류:', error);
      form.setError('captchaText', {
        type: 'manual',
        message: t("identifiedReport.captchaLoadError"), // 새 키 추가 (ko.json에 추가해야 함)
      });
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true); // 로딩바 표시
      try {
        await Promise.all([
          fetchCompanyType(),
          loadCaptcha(),
        ]);
      } catch (error) {
        console.error('초기 데이터 로드 오류:', error);
        toast({
          variant: "destructive",
          title: t("identifiedReport.initialDataLoadFailTitle"), // 새 키 추가
          description: t("identifiedReport.initialDataLoadFailDescription"), // 새 키 추가
        });
      } finally {
        setLoading(false); // 로딩바 숨김
      }
    };

    loadInitialData();

    return () => {
      if (captchaImage) URL.revokeObjectURL(captchaImage);
    };
  }, []);

  const onCheckExistsReporterId = async () => {
    const reporterId = form.getValues('reporterId');
    setIdState("");
    if (!reporterId || reporterId.length < 6) {
      form.setError('reporterId', {
        type: 'manual',
        message: t("validation.reporterIdMinLength"),
      });
      const reporterIdInput = document.querySelector<HTMLInputElement>('input[name="reporterId"]');
      if (reporterIdInput) {
        reporterIdInput.focus();
      }
      return false; // 중복 확인 실패
    }
    try {
      setLoading(true);
      const response = await checkExistsReporterId(reporterId);
      if (response.data) {
        form.clearErrors('reporterId');
        form.setError('reporterId', {
          message: t("identifiedReport.idCheck.duplicate"),
        });
        const reporterIdInput = document.querySelector<HTMLInputElement>('input[name="reporterId"]');
        if (form.formState.errors.reporterId && reporterIdInput) {
          reporterIdInput.focus();
        }
        return false; // 중복 확인 실패
      } else {
        setIdState(t("identifiedReport.alerts.idCheck.available")); // 새 키 추가
        setIsIdValidated(true);
        form.clearErrors('reporterId');
        return true; // 중복 확인 성공
      }
    } catch {
      form.setError('reporterId', {
        type: 'manual',
        message: t("identifiedReport.idCheck.duplicate"), // 새 키 추가
      });
      const reporterIdInput = document.querySelector<HTMLInputElement>('input[name="reporterId"]');
      if (reporterIdInput) {
        reporterIdInput.focus();
      }
      return false; // 중복 확인 실패
    } finally {
      setLoading(false);
    }
  };

  const onCaptchaVerify = async () => {
    try {
      const captchaValue = form.getValues('captchaText');
      const response = await axios.post(
        BASE_API + 'v1/front/captcha/verify-captcha',
        {captcha: captchaValue},
        {withCredentials: true} // 세션 쿠키 전송
      );

      if (response.data) {

        setIsCreateOpen(true);
      } else {
        form.setError('captchaText', {
          type: 'manual',
          message: t("contact.captchaReInput"), // 새 키 추가
        });
        await loadCaptcha();
        form.setValue('captchaText', '');
        const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
        if (captchaInput) {
          captchaInput.focus();
        }
      }
    } catch (error) {
      console.error('검증 오류:', error);
      form.setError('captchaText', {
        type: 'manual',
        message: t("contact.captchaReInput"), // 새 키 추가
      });
      await loadCaptcha();
      form.setValue('captchaText', '');
      const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
      if (captchaInput) {
        captchaInput.focus();
      }
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (values: reportFormData) => {
    //로딩바
    setLoading(true);
    setIsCreateOpen(false);
    try {
      const payload: ReportUpdateDTO = {
        isAnonymous: false,
        companyType: values.companyType || '',
        department: values.department || '',
        name: values.name,
        phone: values.phone || '',
        email: values.emailLocal + "@" + values.emailDomain,
        targetCompanyType: values.targetCompanyType,
        targetDepartment: values.targetDepartment,
        targetName: values.targetName,
        title: values.title,
        content: values.content,
        reporterId: values.reporterId,
        password: values.password,
        //termId: values.termAgreement? termId : 0,
        fileMappingId: values.fileMappingId ? values.fileMappingId : [],
        lang: trans
      };

      const response = await createReport(payload);
      if (response.code == 200) {
        setIsCreateCompleted(true);
        form.reset();
        setResetSignal(true);
      } else {
        setIsCreateFail(true);
      }

    } catch (error) {
      console.error(t('identifiedReport.registerFailed'), error); // 새 키 추가
    } finally {
      setLoading(false);
    }
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isValid = await form.trigger();
      if (!isValid) {
        const firstErrorField = Object.keys(form.formState.errors)[0] as keyof reportFormData;
        if (firstErrorField) {
          if (firstErrorField === 'targetCompanyType') {
            const selectButton = document.querySelector(`#targetCompanyType .select-display`) as HTMLButtonElement;
            if (selectButton) selectButton.focus();
          } else {
            const errorInput = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstErrorField}"]`);
            if (errorInput) {
              errorInput.focus();
            }
          }
        }
        setLoading(false);
        return;
      }
      if (!isIdValidated) {
        form.setError('reporterId', {
          type: 'manual',
          message: t("validation.idDuplicateCheck"),
        });
        const reporterIdInput = document.querySelector<HTMLInputElement>('[name="reporterId"]');
        if (reporterIdInput) {
          reporterIdInput.focus();
        }
        setLoading(false);
        return;
      }
      const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
      if (captchaInput) {
        captchaInput.focus();
      }
      await onCaptchaVerify();
    } catch (error) {
      console.error(t('identifiedReport.submitError'), error); // 새 키 추가
      toast({
        variant: "destructive",
        title: t("identifiedReport.submitErrorTitle"), // 새 키 추가
        description: t("identifiedReport.submitErrorDescription"), // 새 키 추가
      });
    } finally {
      setLoading(false);
    }
  };

  const onCreateConfirm = async () => {
    form.handleSubmit(onSubmit)();
  };
  const onCreateCompletedConfirm = async () => {
    form.reset();
    setIsCreateCompleted(false);
    setActiveTab("step01");
  };

  const onCreateFailConfirm = async () => {
    setIsCreateFail(false);
  };
  return (
    <div className="signup-inquiry-wrap">
      <div className="ethicsanonymousreportpage-wrap">
        <section>
          <div className="info-bx no-scroll">
            <p className="info-txt color-primary">{t('identifiedReport.guide.title')}</p>
            <ul className="info-list ">
              <li className="info-item dot">
                {t('identifiedReport.guide.info1')}
              </li>
              <li className="info-item dot">
                {t('identifiedReport.guide.info2')}
              </li>
              <li className="info-item dot">
                {t('identifiedReport.guide.info3')}
              </li>
            </ul>
          </div>
        </section>
        <Form {...form}>
          <form
            onSubmit={handleFormSubmit}
          >
            <section>
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t('identifiedReport.reporterInfo.title')}</h2>
                <span className="label-txt">
                  {t('identifiedReport.reporterInfo.required')}
                  <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                </span>
              </div>
              <div className="component-group">
                <div className="from-group grid-type">
                  <div className="from-group-grid">
                    <FormField
                      control={form.control}
                      name="companyType"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            <label htmlFor="companyType" className="input-label">
                              <span className="label-txt">{t('identifiedReport.reporterInfo.company')}</span>
                            </label>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Select
                                options={companySelect}
                                placeholder={t('identifiedReport.reporterInfo.companyPlaceholder')}
                                {...field}
                                onChange={(value: string) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="from-group-grid">
                    <FormField
                      control={form.control}
                      name="department"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            <label htmlFor="department" className="input-label">
                              <span className="label-txt">{t('identifiedReport.reporterInfo.department')}</span>
                            </label>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Input
                                {...field}
                                placeholder={t('identifiedReport.reporterInfo.departmentPlaceholder')}
                                maxLength={100}
                                clearable
                              />
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          <label htmlFor="name" className="input-label">
                        <span className="label-txt">
                          {t('identifiedReport.reporterInfo.name')}
                          <i className="ico-required-mark" role="img" aria-label="필수">
                            *
                          </i>
                        </span>
                          </label>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={t('identifiedReport.reporterInfo.namePlaceholder')}
                              maxLength={100}
                            />
                          </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                             {t('identifiedReport.reporterInfo.phone')}
                            <i className="ico-required-mark" role="img" aria-label="필수">
                              *
                            </i>
                          </span>
                          </label>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <ShadcnInput
                              filterType={"number"}
                              {...field}
                              placeholder={t('identifiedReport.reporterInfo.phonePlaceholder')}
                              maxLength={100}
                            />
                          </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="from-group">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    {t('identifiedReport.reporterInfo.email')}
                    <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                  </span>
                </label>
                <div className="input-group email-type pull">
                  <div className="email-type-input">
                    <FormField
                      control={form.control}
                      name="emailLocal"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <ShadcnInput
                              {...field}
                              placeholder={t("identifiedReport.reporterInfo.emailLocalPlaceholder")}
                              maxLength={20}
                              clearable
                              filterType={"email"}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <span>@</span>
                    <FormField
                      control={form.control}
                      name="emailDomain"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <ShadcnInput
                              {...field}
                              placeholder={t("identifiedReport.reporterInfo.emailDomainPlaceholder")}
                              maxLength={20}
                              clearable
                              filterType={"email"}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t('identifiedReport.targetInfo.title')}</h2>
                <span className="label-txt">
                {t('identifiedReport.reporterInfo.required')}
                  <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
              </div>
              <div className="component-group">
                <div className="from-group grid-type">
                  <div className="from-group-grid">
                    <FormField
                      control={form.control}
                      name="targetCompanyType"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="test1" className="input-label">
                          <span className="label-txt">
                                {t('identifiedReport.targetInfo.company')}
                            <i className="ico-required-mark" role="img" aria-label="필수">
                                  *
                                </i>
                              </span>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Select
                                options={companySelect}
                                placeholder={t('identifiedReport.reporterInfo.companyPlaceholder')}
                                {...field}
                                onChange={(value: string) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="from-group-grid">
                    <FormField
                      control={form.control}
                      name="targetDepartment"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="test1" className="input-label">
                          <span className="label-txt">
                             {t('identifiedReport.targetInfo.department')}
                            <i className="ico-required-mark" role="img" aria-label="필수">
                                *
                              </i>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Input
                                {...field}
                                placeholder={t('identifiedReport.reporterInfo.departmentPlaceholder')}
                                maxLength={100}
                                clearable
                              />
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="component-group">
                <div className="from-group">
                  <FormField
                    control={form.control}
                    name="targetName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel htmlFor="test1" className="input-label">
                        <span className="label-txt">
                           {t('identifiedReport.targetInfo.name')}
                          <i className="ico-required-mark" role="img" aria-label="필수">
                              *
                            </i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={t('identifiedReport.targetInfo.namePlaceholder')}
                              maxLength={100}
                              clearable
                            />
                          </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t('identifiedReport.reportContent.title')}</h2>
                <span className="label-txt">
                {t('identifiedReport.reporterInfo.required')}
                  <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
              </div>
              <div className="component-group">
                <div className="from-group">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel htmlFor="test1" className="input-label">
                        <span className="label-txt">
                           {t('identifiedReport.reportContent.subject')}
                          <i className="ico-required-mark" role="img" aria-label="필수">
                            *
                          </i>
                        </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={t('identifiedReport.reportContent.subjectPlaceholder')}
                              maxLength={100}
                              clearable
                            />
                            <div className="absolute bottom-2 right-3 text-sm font-medium text-gray-500">
                              {field.value.length}/100
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="component-group">
                <div className="from-group">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel htmlFor="test1" className="input-label">
                        <span className="label-txt">
                         {t('identifiedReport.reportContent.content')}
                          <i className="ico-required-mark" role="img" aria-label="필수">
                            *
                          </i>
                        </span>
                        </FormLabel>
                        <FormControl>
                          <div className="textarea-wrap">
                            <Textarea
                              placeholder={t('identifiedReport.reportContent.contentPlaceholder')}
                              maxLength={1500}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="from-group">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">{t('identifiedReport.reportContent.fileAttachment')}</span>
                </label>
                <MultiFileUploadReport uploadType={"REPORT"} resetSignal={resetSignal}/>
                {/*<div className="input-group file-type">
                <ShadcnInput type="text" id="test1" placeholder="" disabled />
                <Button className="btn file-btn" type="submit">
                  파일 찾기
                </Button>
              </div>*/}
              </div>
            </section>
            <section className="under-line-type">
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t('identifiedReport.verificationInfo.title')}</h2>
                <span className="label-txt">
                {t('identifiedReport.reporterInfo.required')}
                  <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
              </div>
              <div className="security-group">
                <div className="component-group">
                  <div className="from-group">
                    <FormField
                      control={form.control}
                      name="reporterId"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="test1" className="input-label">
                        <span className="label-txt">
                         {t('identifiedReport.verificationInfo.id')}
                          <i className="ico-required-mark" role="img" aria-label="필수">
                            *
                          </i>
                        </span>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group file-type">
                              <Input
                                {...field}
                                placeholder={t('identifiedReport.verificationInfo.idPlaceholder')}
                                maxLength={20}
                                clearable
                                onChange={(e) => {
                                  field.onChange(e);
                                  setIsIdValidated(false);
                                  setIdState('');
                                  form.clearErrors('reporterId');
                                }}
                              />
                              <Button
                                type="button"
                                onClick={onCheckExistsReporterId}
                                disabled={!field.value}
                                className="btn file-btn"
                              >
                                {t('identifiedReport.verificationInfo.duplicateCheck')}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage/>
                          {idState && (
                            <p className="text-success">{idState}</p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="from-group">
                  <div className="from-group-grid">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t('identifiedReport.verificationInfo.password')}
                            <i className="ico-required-mark" role="img" aria-label="필수">
                              *
                            </i>
                          </span>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Input
                                type={"password"}
                                {...field}
                                placeholder={t('identifiedReport.verificationInfo.passwordPlaceholder')}
                                maxLength={20}
                                clearable
                              />
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="under-line-type">
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t('identifiedReport.captcha.title')}</h2>
                <span className="label-txt">
                {t('identifiedReport.reporterInfo.required')}
                  <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
              </div>
              <div className="security-group">
                <FormField
                  control={form.control}
                  name="captchaText"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel htmlFor="test1" className="input-label">
                      <span className="label-txt">
                          {t('identifiedReport.security.captcha')}
                        <i className="ico-required-mark" role="img" aria-label="필수">
                            *
                          </i>
                        </span>
                      </FormLabel>
                      <div className="security-inner">
                        <div className="security-img-bx">
                          {captchaImage && <img src={captchaImage} alt="CAPTCHA"/>}
                        </div>
                        <Button className="btn refresh-btn" onClick={() => loadCaptcha()}  type={"button"}>
                          <img src={refreshIcon} alt="아이콘" className="ico-refresh"/>
                          {t('identifiedReport.security.refresh')}
                        </Button>
                      </div>
                      <FormControl>
                        <div className="input-group">
                          <Input
                            {...field}
                            placeholder={t('identifiedReport.security.captchaPlaceholder')}
                            clearable
                          />
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <div className="info-bx">
                <p className="info-txt">{t('identifiedReport.security.notice')}</p>
                <ul className="info-list">
                  <li className="info-item dot">
                    {t('identifiedReport.security.noticeContent')}
                  </li>
                </ul>
              </div>
            </section>

            <div className="btn-wrap">
              <div className="btn-inner">
                <Button className="btn btn-default" type="button" onClick={()=>setIsCancelOpen(true)}>{t('anonymousReport.cancel')}</Button>
                <Button
                  className="btn btn-primary"
                  type="submit"
                >
                  {t('anonymousReport.submit')}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <CommonAlertDialog
          type="destructive"
          isOpen={isCreateOpen}
          title={t('identifiedReport.alerts.register.title')}
          description={t('identifiedReport.alerts.register.confirm')}
          confirmText={t('identifiedReport.alerts.register.title')}
          onConfirm={onCreateConfirm}
          cancelText={t('identifiedReport.cancel')}
          onCancel={() => {
            setIsCreateOpen(false);
            form.setValue('captchaText', '');
            loadCaptcha();
          }}
        />
        <CommonAlertDialog
          type="normal"
          isOpen={isCreateCompleted}
          title={t('identifiedReport.alerts.register.title')}
          description={t('identifiedReport.alerts.register.success')}
          confirmText={t('identifiedReport.confirm')}
          onConfirm={onCreateCompletedConfirm}
        />

        <CommonAlertDialog
          type="normal"
          isOpen={isCreateFail}
          title={t('identifiedReport.alerts.register.title')}
          description={t('identifiedReport.alerts.register.fail')}
          confirmText={t('identifiedReport.confirm')}
          onConfirm={onCreateFailConfirm}
        />
        <CommonAlertDialog
          type="normal"
          isOpen={isDuplicateId}
          title=""
          description={t('identifiedReport.alerts.idCheck.duplicate')}
          confirmText={t('identifiedReport.confirm')}
          onConfirm={() => setIsDuplicateId(false)}
        />
        <CommonAlertDialog
          type="normal"
          isOpen={isUseReportId}
          title=""
          description={t('identifiedReport.alerts.idCheck.available')}
          confirmText={t('identifiedReport.confirm')}
          onConfirm={() => setIsUseReportId(false)}
        />
        <CommonAlertDialog
          type="destructive"
          isOpen={isCancelOpen}
          description={t("anonymousReport.dialog.cancel.description")}
          confirmText={t("anonymousReport.dialog.cancel.confirm")}
          onConfirm={() => setActiveTab("step01")}
          cancelText={t("anonymousReport.cancel")}
          onCancel={() => {
            setIsCancelOpen(false);
            form.setValue('captchaText', '');
            loadCaptcha();
          }}
        />
      </div>
    </div>
  );
};

export default IdentifiedReportTabPage;