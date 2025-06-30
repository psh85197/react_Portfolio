import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadingStore } from "@/stores/loading-store.ts";
import { ReportDTO, ReportResultConfirmDTO } from "@/types/report.ts";
import { reportResultConfirm } from "@/api/services/report.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import NoData from "@/pages/[lang]/pub/components/common/NoData.tsx";
import {CommonAlertDialog} from "@/components/ui/common-alert-dialog.tsx";
import {UploadedFile} from "@/types/file.ts";
import axios from "axios";
import envConfig from "@/env-config.ts";
import { useTranslation } from 'react-i18next';
import {format} from "date-fns";
import {TFunction} from "i18next";

// 전체 폼 스키마 정의
const reportFormSchema = (t: TFunction) =>
  z.object({
  reporterId: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.verification.id") }),
  }).min(1, {
    message: t("validation.required", { field: t("anonymousReport.verification.id") })
  }),
  password: z.string({
    required_error: t("validation.required", { field: t("anonymousReport.verification.password") }),
  }).min(1, {
    message: t("validation.required", { field: t("anonymousReport.verification.password") })
  }),
});

// 폼 데이터 타입 추출
type reportFormData = z.infer<ReturnType<typeof reportFormSchema>>;

const ReportResultConfirmPage: FC = () => {
  const { t } = useTranslation();
  const form = useForm<reportFormData>({
    resolver: zodResolver(reportFormSchema(t)),
    defaultValues: {
      reporterId: "",
      password: "",
    },
  });
  const { setLoading } = useLoadingStore();
  const [isConfirm, setIsConfirm] = useState(false);
  const [report, setReport] = useState<ReportDTO | undefined>();
  const [isResultConfirm, setIsResultConfirm] = useState(false);
  const BASE_API  = envConfig.BASE_API;

  const onSubmit = async (values: reportFormData) => {
    setLoading(true);
    try {
      const payload: ReportResultConfirmDTO = {
        reporterId: values.reporterId,
        password: values.password,
      };
      const response = await reportResultConfirm(payload);
      if (response.code === 200 && "content" in response.data) {
        setIsConfirm(true);
        setReport(response.data);
      }else{
        form.reset();
        setIsResultConfirm(true);
      }
    } catch (error) {
      console.error("제보 조회에 실패하였습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    form.handleSubmit(onSubmit)();
  };

  const handleFileDownload = async (file: UploadedFile) => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_API+`v1/front/file/download/${file.id}`, {
        responseType: 'blob', // 파일 다운로드를 위해 blob 타입 지정
      });

      // Blob 데이터를 다운로드 가능한 링크로 변환
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.originName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      //showToast("destructive", "다운로드 오류", "파일을 다운로드하는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isConfirm ? (
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <section className="ethicsresults-wrap">
              <section className="ethicsresults-wrap-01">
                <div className="hgroup-wrap more-type line-type">
                  <h2 className="f24-700-140">{t('resultConfirm.title')}</h2>
                  <span className="label-txt">
                    {t('resultConfirm.required')}
                    <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                  </span>
                </div>
                <div className="security-group">
                  <div className="component-group">
                    <div className="from-group">
                      <div className="from-group-grid">
                        <FormField
                          control={form.control}
                          name="reporterId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="test1" className="input-label">
                                <span className="label-txt">
                                  {t('resultConfirm.verification.id.label')}
                                  <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                                </span>
                              </FormLabel>
                              <FormControl>
                                <div className="security-inner">
                                  <div className="input-group file-type">
                                    <Input
                                      {...field}
                                      placeholder={t('resultConfirm.verification.id.placeholder')}
                                      maxLength={20}
                                      clearable
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
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
                              <FormLabel htmlFor="test1" className="input-label">
                                <span className="label-txt">
                                  {t('resultConfirm.verification.password.label')}
                                  <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                                </span>
                              </FormLabel>
                              <FormControl>
                                <div className="input-group">
                                  <Input
                                    type="password"
                                    {...field}
                                    placeholder={t('resultConfirm.verification.password.placeholder')}
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
                </div>
                <div className="btn-wrap">
                  <div className="btn-inner">
                    <Button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleFormSubmit}
                    >
                      {t('resultConfirm.buttons.confirm')}
                    </Button>
                  </div>
                </div>
                <div className="info-bx">
                  <ul className="info-list">
                    <li className="info-item dot">
                      {t('resultConfirm.info.enterCredentials')}
                    </li>
                    <li className="info-item dot">
                      {t('resultConfirm.info.credentialsUsage')}
                    </li>
                  </ul>
                </div>
              </section>
            </section>
          </form>
        </Form>
      ) : (
        <>
          {report ? (
            <>
              <div className="ethicsresults-wrap">
                <section className="ethicsresults-wrap-02">
                  <section className="result-status">
                    <div className="hgroup-wrap line-type">
                      <p className="f24-700-140">{t('resultConfirm.result.title')}</p>
                    </div>
                    <p className="label-txt result">{t('resultConfirm.result.status')}</p>
                    <div className="info-bx no-scroll blue-type">
                      {report?.statusType == "RECEIVED" && (
                        <>
                          <div className="badge-group">
                            <span className="badge badge-primary">{t('resultConfirm.result.statusTypes.received.text')}</span>
                          </div>
                          <ul className="info-list">
                            <li className="info-item">
                              <strong>{t('resultConfirm.result.statusTypes.received.description')}</strong>
                            </li>
                          </ul>
                        </>
                      )}
                      {report?.statusType == "IN_PROGRESS" && (
                        <>
                          <div className="badge-group">
                            <span className="badge badge-white">{t('resultConfirm.result.statusTypes.inProgress.text')}</span>
                          </div>
                          <ul className="info-list">
                            <li className="info-item">
                              <strong>{t('resultConfirm.result.statusTypes.inProgress.description')}</strong>
                            </li>
                          </ul>
                        </>
                      )}
                      {report?.statusType == "COMPLETED" && (
                        <>
                          <div className="badge-group">
                            <span className="badge badge-darkgreen">{t('resultConfirm.result.statusTypes.completed.text')}</span>
                          </div>
                          <ul className="info-list">
                            <li className="info-item">
                              <strong>{t('resultConfirm.result.statusTypes.completed.description')}</strong>
                            </li>
                          </ul>
                        </>
                      )}
                    </div>
                    {report?.statusType == "COMPLETED" && report.answer && (
                      <>
                        <p className="label-txt result">{t('resultConfirm.result.content.title')}</p>
                        <div className="info-bx no-scroll">
                          <ul className="info-list">
                            <li className="info-item">
                              <p className="info-title">{t('resultConfirm.result.content.processDate')} {format(report?.answer?.answerCreatedAt, 'yyyy-MM-dd') || '-'}</p>
                            </li>
                            <li className="info-item">
                              {report?.answer?.answer || ""}
                            </li>
                            <li className="info-item">
                              {t('resultConfirm.result.content.additionalInquiry')}
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </section>

                  {!report?.isAnonymous && (
                    <section>
                      <div className="hgroup-wrap more-type line-type">
                        <h2 className="f24-700-140">{t('resultConfirm.reporterInfo.title')}</h2>
                      </div>
                      <div className="component-group">
                        <div className="from-group grid-type">
                          <div className="from-group-grid">
                            <span className="label-txt">{t('resultConfirm.reporterInfo.company')}</span>
                            <div className="input-group">
                              <Input readOnly value={report?.companyTypeText || "-"} />
                            </div>
                          </div>
                          <div className="from-group-grid">
                            <span className="label-txt">{t('resultConfirm.reporterInfo.department')}</span>
                            <div className="input-group">
                              <Input readOnly value={report?.department || "-"} />
                            </div>
                          </div>
                        </div>
                        <div className="from-group grid-type">
                          <div className="from-group-grid">
                            <span className="label-txt">{t('resultConfirm.reporterInfo.name')}</span>
                            <div className="input-group">
                              <Input readOnly value={report?.name || "-"} />
                            </div>
                          </div>
                          <div className="from-group-grid">
                            <span className="label-txt">{t('resultConfirm.reporterInfo.phone')}</span>
                            <div className="input-group">
                              <Input readOnly value={report?.phone || "-"} />
                            </div>
                          </div>
                        </div>
                        <div className="from-group grid-type">
                          <div className="from-group-grid">
                            <label htmlFor="test1" className="input-label">
                              <span className="label-txt">
                                {t('resultConfirm.reporterInfo.email')}
                                <i className="ico-required-mark" role="img" aria-label="필수">*</i>
                              </span>
                            </label>
                            <div className="input-group">
                              <Input readOnly value={report?.email || "-"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  <section>
                    <div className="hgroup-wrap more-type line-type">
                      <h2 className="f24-700-140">{t('resultConfirm.targetInfo.title')}</h2>
                    </div>
                    <div className="component-group">
                      <div className="from-group grid-type">
                        <div className="from-group-grid">
                          <label htmlFor="test1" className="input-label">
                            <span className="label-txt">{t('resultConfirm.targetInfo.company')}</span>
                          </label>
                          <div className="input-group">
                            <Input readOnly value={report?.targetCompanyTypeText || "-"} />
                          </div>
                        </div>
                        <div className="from-group-grid">
                          <label htmlFor="test1" className="input-label">
                            <span className="label-txt">{t('resultConfirm.targetInfo.department')}</span>
                          </label>
                          <div className="input-group">
                            <Input readOnly value={report?.targetDepartment || "-"} />
                          </div>
                        </div>
                      </div>
                      <div className="from-group grid-type">
                        <div className="from-group-grid">
                          <label htmlFor="test1" className="input-label">
                            <span className="label-txt">{t('resultConfirm.targetInfo.name')}</span>
                          </label>
                          <div className="input-group">
                            <Input readOnly value={report?.targetName || "-"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="hgroup-wrap more-type line-type">
                      <h2 className="f24-700-140">{t('resultConfirm.reportContent.title')}</h2>
                    </div>
                    <div className="component-group">
                      <div className="from-group">
                        <div className="from-group-grid">
                          <label htmlFor="test1" className="input-label">
                            <span className="label-txt">{t('resultConfirm.reportContent.subject')}</span>
                          </label>
                          <div className="input-group">
                            <Input readOnly value={report?.title || "-"} />
                          </div>
                        </div>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <label htmlFor="test1" className="input-label">
                            <span className="label-txt">{t('resultConfirm.reportContent.content')}</span>
                          </label>
                          <div className="textarea-wrap">
                            <Textarea readOnly value={report?.content || "-"} />
                          </div>
                        </div>
                      </div>
                      {(report?.uploadFiles ?? []).length > 0 && (
                        <div className="component-group">
                          <div className="from-group">
                            <span className="label-txt">{t('resultConfirm.reportContent.attachments')}</span>
                            {report.uploadFiles.map((file, index) => (
                              <div key={index}>
                                <Button
                                  variant="link"
                                  className="text-blue-600 underline text-sm hover:text-blue-800 detail-file"
                                  onClick={() => handleFileDownload(file)}
                                >
                                  {file.originName}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </section>
              </div>
            </>
          ) : (
            <>
              <NoData />
            </>
          )}
        </>
      )}
      <CommonAlertDialog
        type="normal"
        isOpen={isResultConfirm}
        title={t('resultConfirm.alerts.noData.title')}
        description={t('resultConfirm.alerts.noData.description')}
        confirmText={t('resultConfirm.alerts.noData.confirm')}
        onConfirm={() => setIsResultConfirm(false)}
      />
    </>
  );
};

export default ReportResultConfirmPage;
