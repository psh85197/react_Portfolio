import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from 'zod';
import {toast} from "@/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input as ShadcnInput} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CommonAlertDialog} from "@/components/ui/common-alert-dialog.tsx";
import envConfig from "@/env-config.ts";
import {useLoadingStore} from "@/stores/loading-store.ts";
import {ContactUpdateDTO} from "@/types/contact.ts";
import {createContact} from "@/api/services/contact.ts";
import {useParams} from "react-router-dom";
import {RadioItem, ShadcnRadio} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import refreshIcon from "@/assets/images/icon/ico_refresh.png";
import {TranslationDTO} from "@/types/translation.ts";
import {useTranslation} from "react-i18next";
import {getCommonCodeList} from "@/api/services/common-code.ts";
import {CommonCode} from "@/types/common-code.ts";
import MultiFileUpload from "@/components/ui/multiFile-upload.tsx";

// 전체 폼 스키마 정의
const createContactFormSchema = (t: (key: string) => string) => z.object({
  contactType: z.string({
    required_error: t('validation.contact.contactType.required'),
  }).min(1, {
    message: t('validation.contact.contactType.required')
  }), franchiseName: z.string().optional(), name: z.string({
    required_error: t('validation.contact.name.required'),
  }).min(1, {
    message: t('validation.contact.name.required')
  }).max(100, {
    message: t('validation.contact.name.maxLength')
  }), phoneNumber: z.string({
    required_error: t('validation.contact.phoneNumber.required'),
  })
    .min(1, {message: t('validation.contact.phoneNumber.required')})
    .regex(/^(\d{3}\d{3,4}\d{4})$/, t('validation.contact.phoneNumber.format')), emailLocal: z.string({
    required_error: t('validation.contact.email.localRequired'),
  })
    .min(1, {
      message: t('validation.contact.email.localRequired')
    })
    .max(20, {
      message: t('validation.contact.email.maxLength')
    }), emailDomain: z.string({
    required_error: t('validation.contact.email.domainRequired'),
  })
    .min(1, {
      message: t('validation.contact.email.domainRequired')
    }).max(20, {
      message: t('validation.contact.email.maxLength')
    }), title: z.string({
    required_error: t('validation.contact.title.required'),
  }).min(1, {
    message: t('validation.contact.title.required')
  }).max(100, {
    message: t('validation.contact.title.maxLength')
  }), content: z.string({
    required_error: t('validation.contact.content.required'),
  }).min(1, {
    message: t('validation.contact.content.required')
  }).max(1500, {
    message: t('validation.contact.content.maxLength')
  }), captchaText: z.string({
    required_error: t('validation.contact.captcha.required'),
  }).min(1, {
    message: t('validation.contact.captcha.required')
  }), fileMappingId: z.array(z.string()), /*  termAgreement: z.boolean().refine((val) => val === true, {
    message: '약관 동의는 필수입니다.',
  }),*/
}).refine((data) => {
  const email = `${data.emailLocal}@${data.emailDomain}`;
  return z.string().email().safeParse(email).success;
}, {
  message: t('validation.contact.email.format'), path: ['emailLocal'],
}).refine((data) => {
  if (data.contactType === 'FRANCHISE') {
    return !!data.franchiseName && data.franchiseName.length > 0;
  }
  return true;
}, {
  message: t('validation.contact.franchiseName.required'), path: ['franchiseName'],
});

// 폼 데이터 타입 추출
type contactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;

const SignupInquiryPage: React.FC = () => {
  const {setLoading} = useLoadingStore();
  const BASE_API = envConfig.BASE_API;
  const [captchaImage, setCaptchaImage] = useState('');
  const [contactTypes, setContactTypes] = useState<CommonCode[]>([]);
  //const [termTypeLast, setTermTypeLast] = useState<TermsDTO>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  //const [termId, setTermId] = useState(0);
  const {lang} = useParams<{ lang: keyof TranslationDTO }>();
  const trans = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  const {t} = useTranslation();
  const contactFormSchema = createContactFormSchema(t);
  const [resetSignal, setResetSignal] = useState(false);

  const form = useForm<contactFormData>({
    resolver: zodResolver(contactFormSchema), defaultValues: {
      contactType: "FRANCHISE", franchiseName: "", name: "", phoneNumber: "", title: "", content: "", captchaText: "", // termAgreement:false,
      emailDomain: "", emailLocal: "", fileMappingId: []
    }
  });

  const contactType = form.watch('contactType');

  const fetchContactType = async () => {
    try {
      const response = await getCommonCodeList('contact');
      setContactTypes(response.data);

    } catch {
      toast({
        variant: "destructive", title: "문의 유형 로드 실패", description: "문의 유형을 불러오지 못했습니다.",
      });
    }
  };
  /*
  const fetchTermTypeLast = async () => {
     try {
       const response = await getTermTypeLast('INQUIRY_PRIVACY');

       const termdata = response.data[trans] == null?(response.data.en == null?response.data.ko:response.data.en):response.data[trans];
       setTermTypeLast(termdata);
       setTermId(termdata.id);

     } catch {
       toast({
         variant: "destructive",
         title: "약관 로드 실패",
         description: "약관을 불러오지 못했습니다.",
       });
     }
   };
   */

  const loadCaptcha = async () => {
    try {
      const response = await axios.get(BASE_API + 'v1/front/captcha', {
        responseType: 'blob', withCredentials: true, // 세션 쿠키 전송
      });
      const imageUrl = URL.createObjectURL(response.data);
      setCaptchaImage(imageUrl);
      form.setValue('captchaText', '');
    } catch (error) {
      console.error('CAPTCHA 로드 오류:', error);
      form.setError('captchaText', {
        type: 'manual', message: t("contact.captchaError"), // 다국어 적용
      });
    }
  };

  useEffect(() => {
    //fetchTermTypeLast();
    fetchContactType();
    loadCaptcha();
    return () => {
      if (captchaImage) URL.revokeObjectURL(captchaImage);
    };
  }, [trans]);

  useEffect(() => {
    /*    const selectedType = contactTypes.find(t => t.code === contactType);
        if (selectedType) {
          const defaultTitle = trans === 'ko' ? `${selectedType.ko}드립니다` : selectedType[trans];
          form.setValue('title', defaultTitle);
        }*/
    if (contactType === 'GENERAL') {
      form.setValue('franchiseName', '');
    }
  }, [contactType]);

  const onCaptchaVerify = async () => {
    try {
      const captchaValue = form.getValues('captchaText');
      const response = await axios.post(BASE_API + 'v1/front/captcha/verify-captcha', {captcha: captchaValue}, {withCredentials: true} // 세션 쿠키 전송
      );

      if (response.data) {
        setIsCreateOpen(true);
      } else {
        form.setError('captchaText', {
          type: 'manual', message: t("contact.captchaReInput"), // 다국어 적용
        });
        await loadCaptcha(); // 성공 시 새 CAPTCHA 로드
        form.setValue('captchaText', '');
        const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
        if (captchaInput) {
          captchaInput.focus();
        }
      }

    } catch (error) {
      console.error('검증 오류:', error);
      form.setError('captchaText', {
        type: 'manual', message: t("contact.captchaReInput"), // 다국어 적용
      });
      await loadCaptcha();
      form.setValue('captchaText', '');
      const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
      if (captchaInput) {
        captchaInput.focus();
      }
    }
  };

  const onSubmit = async (values: contactFormData) => {
    //로딩바
    setLoading(true);
    setIsCreateOpen(false);
    try {
      const payload: ContactUpdateDTO = {
        contactType: values.contactType,
        franchiseName: values.franchiseName || '',
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.emailLocal + "@" + values.emailDomain,
        title: values.title,
        content: values.content, //termId: values.termAgreement? termId : 0,
        fileMappingId: values.fileMappingId ? values.fileMappingId : [],
        lang: trans
      };

      const response = await createContact(payload);
      if (response.code == 200) {
        setIsCreateCompleted(true);
        form.reset();
        setResetSignal(true);
        await loadCaptcha();
      }

    } catch (error) {
      console.error('등록에 실패하였습니다.', error);
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
        const firstErrorField = Object.keys(form.formState.errors)[0] as keyof contactFormData;
        if (firstErrorField) {
          const errorInput = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstErrorField}"]`);
          if (errorInput) {
            errorInput.focus();
          }
        }
        setLoading(false);
        return;
      }
      // 3. CAPTCHA 검증
      const captchaInput = document.querySelector<HTMLInputElement>('[name="captchaText"]');
      if (captchaInput) {
        captchaInput.focus();
      }
      await onCaptchaVerify();
    } catch (error) {
      console.error(t("anonymousReport.formSubmitError"), error); // 다국어 적용

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
  };

  const getTitlePlaceholder = () => {
    const selectedType = contactTypes.find(t => t.code === contactType);
    if (selectedType?.code == "FRANCHISE") {
      return t("contact.titleHolderFran");
    } else if (selectedType?.code == "GENERAL") {
      return t("contact.titleHolderGen");
    }
    return t("contact.enterSubject");
  };

  return (<>
    <div className="signup-inquiry-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">
            {t("contact.pageTitle")}
          </h2>
        </div>
      </section>

      <Form {...form}>
        <form
          onSubmit={handleFormSubmit}
          className="component-form"
        >
          <section>
            <div className="hgroup-wrap more-type line-type">
              <h2 className="f24-700-140">{t("contact.pagedesc")}</h2>
              <span className="label-txt">
                {t("contact.requiredItem")}
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </div>
            <div className="component-group">
              <div className="from-group">
                <div className="radio-group">
                  <FormField
                    control={form.control}
                    name="contactType"
                    render={({field}) => (<FormItem>
                      <FormLabel>
                        <span className="label-txt">
                         {t("contact.inquiryType")}
                          <i className="ico-required-mark" role="img" aria-label="필수">
                            *
                          </i>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <ShadcnRadio
                          onValueChange={(value: string) => {
                            field.onChange(value.toString());
                          }}
                          value={field.value || ''}>
                          {contactTypes?.map((t) => (<div className="radio-item">
                            <RadioItem value={t.code} id={t.code}/>
                            <Label htmlFor={t.code}> {t[trans]}</Label>
                          </div>))}
                        </ShadcnRadio>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>)}
                  />
                </div>
              </div>
              {contactType === 'FRANCHISE' && (<div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="franchiseName"
                    render={({field}) => (<FormItem>
                      <label htmlFor="test1" className="input-label">
                        <FormLabel>
                                <span className="label-txt">
                                  {t("contact.storeName")}
                                  <i className="ico-required-mark" role="img" aria-label="필수">
                                    *
                                  </i>
                                </span>
                        </FormLabel>
                      </label>
                      <FormControl>
                        <div className="input-group">
                          <ShadcnInput
                            {...field}
                            placeholder={t("contact.enterStoreName")}
                            maxLength={100}
                            clearable
                          />
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>)}
                  />
                </div>
              </div>)}
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (<FormItem>
                      <FormLabel>
                        <label htmlFor="test1" className="input-label">
                            <span className="label-txt">
                              {t("contact.name")}
                              <i className="ico-required-mark" role="img" aria-label="필수">
                                *
                              </i>
                            </span>
                        </label>
                      </FormLabel>
                      <FormControl>
                        <div className="input-group">
                          <ShadcnInput
                            {...field}
                            placeholder={t("contact.enterYourName")}
                            maxLength={100} clearable/>
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>)}
                  />
                </div>
                <div className="from-group-grid">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({field}) => (<FormItem>
                      <FormLabel>
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("contact.phone")}
                            <i className="ico-required-mark" role="img" aria-label="필수">
                              *
                            </i>
                          </span>
                        </label>
                      </FormLabel>
                      <FormControl>
                        <div className="input-group">
                          <ShadcnInput
                            {...field}
                            placeholder={t("contact.enterNumbersOnly")}
                            maxLength={100}
                            filterType={"number"}
                            clearable
                          />
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>)}
                  />
                </div>
              </div>
              <div className="from-group grid-type">
                <div className="from-group-grid">
                  <FormLabel>
                    <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    {t("contact.email")}
                    <i className="ico-required-mark" role="img" aria-label="필수">
                      *
                    </i>
                  </span>
                    </label>
                  </FormLabel>
                  <div className="input-group email-type">
                    <div className="email-type-input">
                      <FormField
                        control={form.control}
                        name="emailLocal"
                        render={({field}) => (<FormItem>
                          <FormControl>
                            <ShadcnInput
                              {...field}
                              placeholder={t("contact.mailAccount")}
                              maxLength={20}
                              clearable
                              filterType={"email"}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>)}
                      />
                      <span>@</span>
                      <FormField
                        control={form.control}
                        name="emailDomain"
                        render={({field}) => (<FormItem>
                          <ShadcnInput {...field} placeholder={t("contact.domain")} maxLength={20} clearable
                                       filterType={"email"}/>
                          <FormMessage/>
                        </FormItem>)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="from-group">
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (<FormItem>
                    <FormLabel>
                      <label htmlFor="test1" className="input-label">
                      <span className="label-txt">
                        {t("contact.subject")}
                        <i className="ico-required-mark" role="img" aria-label="필수">
                          *
                        </i>
                      </span>
                      </label>
                    </FormLabel>
                    <FormControl>
                      <div className="input-group">
                        <ShadcnInput
                          {...field}
                          placeholder={getTitlePlaceholder()}
                          maxLength={100}
                          clearable
                        />
                        <div className="absolute bottom-2 right-3 text-sm font-medium text-gray-500">
                          {field.value.length}/100
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>)}
                />
              </div>
              <div className="from-group">
                <FormField
                  control={form.control}
                  name="content"
                  render={({field}) => (<FormItem>
                    <FormLabel>
                      <label htmlFor="test1" className="input-label">
                      <span className="label-txt">
                        {t("contact.content")}
                        <i className="ico-required-mark" role="img" aria-label="필수">
                          *
                        </i>
                      </span>
                      </label>
                    </FormLabel>
                    <FormControl>
                      <div className="textarea-wrap">
                        <Textarea
                          placeholder={t("contact.enterMessage")}
                          maxlength={1500}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>)}
                />
              </div>
              <div className="from-group">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">{t("contact.fileAttachment")}</span>
                </label>
                <MultiFileUpload
                  uploadType={"CONTACT"}
                  resetSignal={resetSignal}
                />
              </div>
            </div>
          </section>

          <section className="under-line-type">
            <div className="hgroup-wrap more-type line-type">
              <h2 className="f24-700-140">{t("contact.captchaInput")}</h2>
              <span className="label-txt">
              {t("contact.captchaRequired")}
                <i className="ico-required-mark" role="img" aria-label="필수">
                *
              </i>
            </span>
            </div>
            <div className="security-group">
              <FormField
                control={form.control}
                name="captchaText"
                render={({field}) => (<FormItem>
                  <FormLabel>
                    <label htmlFor="test1" className="input-label">
                      <span className="label-txt">
                        {t("contact.captcha")}
                        <i className="ico-required-mark" role="img" aria-label="필수">
                          *
                        </i>
                      </span>
                    </label>
                  </FormLabel>
                  <div className="security-inner">
                    <div className="security-img-bx">
                      {captchaImage && <img src={captchaImage} alt="CAPTCHA"/>}
                    </div>
                    <Button className="btn refresh-btn" onClick={() => loadCaptcha()} type={"button"}>
                      <img src={refreshIcon} alt="아이콘" className="ico-refresh"/>
                      {t("contact.refresh")}
                    </Button>
                  </div>
                  <FormControl>
                    <div className="input-group">
                      <ShadcnInput
                        {...field}
                        placeholder={t("contact.enterCaptcha6Digits")}
                        clearable
                      />
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>)}
              />
            </div>
            <div className="info-bx border-none">
              <p className="info-txt">{t("contact.note")}</p>
              <ul className="info-list">
                <li className="info-item dot">
                  {t("contact.contactConfirmation")}
                </li>
                <li className="info-item dot">
                  {t("contact.tel")}
                </li>
              </ul>
            </div>
          </section>
          <div className="btn-wrap">
            <div className="btn-inner line-type">
              <Button
                className="btn btn-primary"
                type="button"
                onClick={handleFormSubmit}
              >
                {t("contact.submit")}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <CommonAlertDialog
        type="destructive"
        isOpen={isCreateOpen}
        description={t("contact.createConfirm")}
        confirmText={t("contact.submit")}
        onConfirm={onCreateConfirm}
        cancelText={t("contact.cancel")}
        onCancel={() => {
          setIsCreateOpen(false);
          form.setValue('captchaText', '');
          loadCaptcha();
        }}
      />

      <CommonAlertDialog
        type="normal"
        isOpen={isCreateCompleted}
        description={t("contact.createCompletedConfirm")}
        confirmText={t("contact.confirm")}
        onConfirm={onCreateCompletedConfirm}
      />
    </div>
  </>);
};


export default SignupInquiryPage;