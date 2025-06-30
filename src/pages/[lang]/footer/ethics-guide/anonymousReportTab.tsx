import React, { FC, useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CommonAlertDialog } from "@/components/ui/common-alert-dialog.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast.ts";
import axios from "axios";
import envConfig from "@/env-config.ts";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { ReportAnonymousUpdateDTO } from "@/types/report.ts";
import { checkExistsReporterId, createAnonymousReport } from "@/api/services/report.ts";
import refreshIcon from "@/assets/images/icon/ico_refresh.png";
import { getCommonCodeList } from "@/api/services/common-code.ts";
import { CommonCode, SelectCommon } from "@/types/common-code.ts";
import Select from "@/components/ui/select-custom.tsx";
import { useTranslation } from "react-i18next";
import { TFunction } from 'i18next';
import MultiFileUploadReport from "@/components/ui/multiFile-upload-report.tsx"; // TFunction 임포트 위치 수정

interface AnonymousReportTabPageProps {
  setActiveTab: (value: string) => void;
}

// reportFormSchema가 t 함수를 인자로 받도록 수정
const reportFormSchema = (isIdValidated: boolean, t: TFunction) => z.object({
  targetCompanyType: z.string({
    required_error: t("validation.selectRequired", { field: t("anonymousReport.target.company") }),
  }).min(1, {
    message: t("validation.selectRequired", { field: t("anonymousReport.target.company") })
  }),
  targetDepartment: z.string({
    required_error: t("validation.selectRequired", { field: t("anonymousReport.target.department") }),
  }).min(1, {
    message: t("validation.selectRequired", { field: t("anonymousReport.target.department") })
  }),
  targetName: z.string({
    required_error: t("validation.selectRequired", { field: t("anonymousReport.target.name") }),
  }).min(1, {
    message: t("validation.selectRequired", { field: t("anonymousReport.target.name") })
  }),
  title: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.content.titleLabel") }),
  }).min(1, {
    message: t("validation.required", { field: t("anonymousReport.content.titleLabel") })
  }).max(100, {
    message: t("validation.maxLength", { length: 100 })
  }),
  content: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.content.contentLabel") }),
  }).min(1, {
    message: t("validation.required", { field: t("anonymousReport.content.contentLabel") })
  }).max(1500, {
    message: t("validation.maxLength", { length: 1500 })
  }),
  reporterId: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.verification.id") }),
  }).min(6, {
    message: t("validation.reporterIdMinLength")
  }).max(20, {
    message: t("validation.reporterIdMaxLength")
  }).refine(() => isIdValidated, {
    message: t("validation.idDuplicateCheck"),
  }),
  password: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.verification.password") }),
  })
    .min(8, t("validation.passwordFormat"))
    .max(20, t("validation.passwordFormat"))
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
      t("validation.passwordFormat")
    ),
  captchaText: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.captcha.label") }),
  }).min(1, {
    message: t("validation.required", { field: t("anonymousReport.captcha.label") })
  }),
  fileMappingId: z.array(z.string()),
});

type reportFormData = z.infer<ReturnType<typeof reportFormSchema>>;

const AnonymousReportTabPage: FC<AnonymousReportTabPageProps> = ({ setActiveTab }) => {
  const { t } = useTranslation();
  const [isIdValidated, setIsIdValidated] = useState(false);
  const { setLoading } = useLoadingStore();
  const [companySelect, setCompanySelect] = useState<SelectCommon[]>([]);
  const BASE_API = envConfig.BASE_API;
  const [captchaImage, setCaptchaImage] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCreateFail, setIsCreateFail] = useState(false);
  const [resetSignal, setResetSignal] = useState(false);
  const [idState, setIdState] = useState('');

  const form = useForm<reportFormData>({
    resolver: zodResolver(reportFormSchema(isIdValidated, t)), // t 함수 전달
    defaultValues: {
      targetCompanyType: "",
      targetDepartment: "",
      targetName: "",
      title: "",
      content: "",
      reporterId: "",
      password: "",
      captchaText: "",
      fileMappingId: [],
    },
  });

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
        title: t("anonymousReport.initialDataLoadFailTitle"), // 다국어 적용
        description: t("anonymousReport.initialDataLoadFailDescription"), // 다국어 적용
      });
    }
  };

  const loadCaptcha = async () => {
    try {
      const response = await axios.get(BASE_API + 'v1/front/captcha', {
        responseType: 'blob',
        withCredentials: true,
      });
      const imageUrl = URL.createObjectURL(response.data);
      setCaptchaImage(imageUrl);
      form.setValue('captchaText', '');
    } catch (error) {
      console.error('CAPTCHA 로드 오류:', error);
      form.setError('captchaText', {
        type: 'manual',
        message: t("anonymousReport.captchaLoadError"), // 다국어 적용
      });
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchCompanyType(),
          loadCaptcha(),
        ]);
      } catch (error) {
        console.error('초기 데이터 로드 오류:', error);
        toast({
          variant: "destructive",
          title: t("anonymousReport.initialDataLoadFailTitle"), // 다국어 적용
          description: t("anonymousReport.initialDataLoadFailDescription"), // 다국어 적용
        });
      } finally {
        setLoading(false);
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
        message: t("validation.reporterIdMinLength"), // 다국어 적용
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
          message: t("validation.idAlreadyInUse"), // 다국어 적용
        });
        const reporterIdInput = document.querySelector<HTMLInputElement>('input[name="reporterId"]');
        if (form.formState.errors.reporterId && reporterIdInput) {
          reporterIdInput.focus();
        }
        return false; // 중복 확인 실패
      } else {
        setIdState(t("anonymousReport.idAvailableMessage")); // 다국어 적용
        setIsIdValidated(true);
        form.clearErrors('reporterId');
        return true; // 중복 확인 성공
      }
    } catch {
      form.setError('reporterId', {
        type: 'manual',
        message: t("anonymousReport.idCheckErrorMessage"), // 다국어 적용
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
        { captcha: captchaValue },
        { withCredentials: true }
      );

      if (response.data) {

        setIsCreateOpen(true);
      } else {
        form.setError('captchaText', {
          type: 'manual',
          message: t("contact.captchaReInput"), // 다국어 적용
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
        message: t("contact.captchaReInput"), // 다국어 적용
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
    setLoading(true);
    setIsCreateOpen(false);
    try {
      const payload: ReportAnonymousUpdateDTO = {
        isAnonymous: true,
        targetCompanyType: values.targetCompanyType,
        targetDepartment: values.targetDepartment,
        targetName: values.targetName,
        title: values.title,
        content: values.content,
        reporterId: values.reporterId,
        password: values.password,
        fileMappingId: values.fileMappingId ? values.fileMappingId : [],
      };

      const response = await createAnonymousReport(payload);
      if (response.code === 200) {
        setIsCreateCompleted(true);
        form.reset();
        setResetSignal(true);
        setIsIdValidated(false);
      } else {
        setIsCreateFail(true);
      }
    } catch (error) {
      console.error(t("anonymousReport.reportRegisterFailed"), error); // 다국어 적용
      toast({
        variant: "destructive",
        title: t("anonymousReport.reportRegisterFailed"), // 다국어 적용
        description: t("anonymousReport.reportRegisterErrorDescription"), // 다국어 적용
      });
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
      // 2. reporterId 중복 확인
      // onCheckExistsReporterId는 이미 내부에서 에러 메시지를 설정하므로, 여기서 추가 설정은 필요 없음
      const isIdValid = await onCheckExistsReporterId();
      if (!isIdValid) {
        // onCheckExistsReporterId에서 이미 에러 메시지를 설정했기 때문에 여기서는 추가하지 않음
        setLoading(false);
        return; // 중복 확인 실패 시 제출 중단
      }else{
        form.clearErrors('reporterId'); // 중복 확인 성공 시 에러 메시지 제거
      }

      // 3. CAPTCHA 검증
      const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
      if (captchaInput) {
        captchaInput.focus();
      }
      await onCaptchaVerify();
    } catch (error) {
      console.error(t("anonymousReport.formSubmitError"), error); // 다국어 적용
      toast({
        variant: "destructive",
        title: t("anonymousReport.formSubmitError"), // 다국어 적용
        description: t("anonymousReport.formSubmitErrorDescription"), // 다국어 적용
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
    setIsIdValidated(false);
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
            <p className="info-txt color-primary">{t("anonymousReport.guide.title")}</p>
            <ul className="info-list">
              <li className="info-item dot">
                {t("anonymousReport.guide.security")}
              </li>
              <li className="info-item dot">
                {t("anonymousReport.guide.content")}
              </li>
              <li className="info-item dot">
                {t("anonymousReport.guide.response")}
              </li>
            </ul>
          </div>
        </section>
        <Form {...form}>
          <form onSubmit={handleFormSubmit}>
            <section>
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t("anonymousReport.target.title")}</h2>
                <span className="label-txt">
                  {t("anonymousReport.required")}
                  <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <label htmlFor="test1" className="input-label">
                              <span className="label-txt">
                                {t("anonymousReport.target.company")}
                                <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                                  *
                                </i>
                              </span>
                            </label>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Select
                                options={companySelect}
                                placeholder={t("anonymousReport.target.companyPlaceholder")}
                                {...field}
                                onChange={(value: string) => field.onChange(value)}
                                id={"targetCompanyType"}
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
                      name="targetDepartment"
                      render={({ field }) => (
                        <FormItem>
                          <label htmlFor="test1" className="input-label">
                            <FormLabel>
                              <span className="label-txt">
                                {t("anonymousReport.target.department")}
                                <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                                  *
                                </i>
                              </span>
                            </FormLabel>
                          </label>
                          <FormControl>
                            <div className="input-group">
                              <Input
                                {...field}
                                placeholder={t("anonymousReport.target.departmentPlaceholder")}
                                maxLength={100}
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
              </div>
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="targetName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <label htmlFor="test1" className="input-label">
                            <span className="label-txt">
                              {t("anonymousReport.target.name")}
                              <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                                *
                              </i>
                            </span>
                          </label>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={t("anonymousReport.target.namePlaceholder")}
                              maxLength={100}
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
            </section>
            <section>
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t("anonymousReport.content.title")}</h2>
                <span className="label-txt">
                  {t("anonymousReport.required")}
                  <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                    *
                  </i>
                </span>
              </div>
              <div className="component-group">
                <div className="from-group">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="label-txt">
                            {t("anonymousReport.content.titleLabel")}
                            <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                              *
                            </i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="input-group">
                            <Input
                              {...field}
                              placeholder={t("anonymousReport.content.titlePlaceholder")}
                              maxLength={100}
                              clearable
                            />
                            <div className="absolute bottom-2 right-3 text-sm font-medium text-gray-500">
                              {field.value.length}/100
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="label-txt">
                            {t("anonymousReport.content.contentLabel")}
                            <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                              *
                            </i>
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="textarea-wrap">
                            <Textarea
                              placeholder={t("anonymousReport.content.contentPlaceholder")}
                              maxLength={1500}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="from-group">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">{t("anonymousReport.content.fileUpload")}</span>
                </label>
                <MultiFileUploadReport uploadType={"REPORT"} resetSignal={resetSignal} />
              </div>
            </section>
            <section className="under-line-type">
              <div className="hgroup-wrap more-type line-type">
                <h2 className="f24-700-140">{t("anonymousReport.verification.title")}</h2>
                <span className="label-txt">
                  {t("anonymousReport.required")}
                  <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span className="label-txt">
                              {t("anonymousReport.verification.id")}
                              <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                                *
                              </i>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="security-inner">
                              <div className="input-group file-type">
                                <Input
                                  {...field}
                                  placeholder={t("anonymousReport.verification.idPlaceholder")}
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
                                  {t("anonymousReport.verification.checkId")}
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <label htmlFor="test1" className="input-label">
                              <span className="label-txt">
                                {t("anonymousReport.verification.password")}
                                <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                                  *
                                </i>
                              </span>
                            </label>
                          </FormLabel>
                          <FormControl>
                            <div className="input-group">
                              <Input
                                {...field}
                                type="password"
                                placeholder={t("anonymousReport.verification.passwordPlaceholder")}
                                maxLength={20}
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
              </div>
            </section>
            <section className="under-line-type">
              <div className="hgroup-wrap more-type line-type">
                <p className="f24-700-140">{t("anonymousReport.captcha.title")}</p>
                <span className="label-txt">
                  {t("anonymousReport.required")}
                  <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                    *
                  </i>
                </span>
              </div>
              <div className="security-group">
                <FormField
                  control={form.control}
                  name="captchaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("anonymousReport.captcha.label")}
                            <i className="ico-required-mark" role="img" aria-label={t("anonymousReport.required")}>
                              *
                            </i>
                          </span>
                        </label>
                      </FormLabel>
                      <div className="security-inner">
                        <div className="security-img-bx">
                          {captchaImage && <img src={captchaImage} alt="CAPTCHA" />}
                        </div>
                        <Button className="btn refresh-btn" onClick={() => loadCaptcha()}  type={"button"}>
                          <img src={refreshIcon} alt={t("anonymousReport.captcha.refresh")} className="ico-refresh" />
                          {t("anonymousReport.captcha.refresh")}
                        </Button>
                      </div>
                      <FormControl>
                        <div className="input-group">
                          <Input
                            {...field}
                            placeholder={t("anonymousReport.captcha.placeholder")}
                            clearable
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            <div className="btn-wrap">
              <div className="btn-inner">
                <Button className="btn btn-default" type="button" onClick={()=>setIsCancelOpen(true)}>
                  {t("anonymousReport.cancel")}
                </Button>
                <Button
                  className="btn btn-primary"
                  type="submit"
                >
                  {t("anonymousReport.submit")}
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <CommonAlertDialog
          type="destructive"
          isOpen={isCreateOpen}
          title={t("anonymousReport.dialog.confirm.title")}
          description={t("anonymousReport.dialog.confirm.description")}
          confirmText={t("anonymousReport.dialog.confirm.confirm")}
          onConfirm={onCreateConfirm}
          cancelText={t("anonymousReport.cancel")}
          onCancel={() => {
            setIsCreateOpen(false);
            form.setValue('captchaText', '');
            loadCaptcha();
          }}
        />
        <CommonAlertDialog
          type="normal"
          isOpen={isCreateCompleted}
          title={t("anonymousReport.dialog.completed.title")}
          description={t("anonymousReport.dialog.completed.description")}
          confirmText={t("anonymousReport.dialog.cancel.confirm")}
          onConfirm={onCreateCompletedConfirm}
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
        <CommonAlertDialog
          type="normal"
          isOpen={isCreateFail}
          title={t("anonymousReport.dialog.fail.title")}
          description={t("anonymousReport.dialog.fail.description")}
          confirmText={t("anonymousReport.dialog.fail.confirm")}
          onConfirm={onCreateFailConfirm}
        />
      </div>
    </div>
  );
};

export default AnonymousReportTabPage;