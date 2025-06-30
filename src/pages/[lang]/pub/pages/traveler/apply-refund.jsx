import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShadcnRadio, RadioItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import ico_complete from "@/assets/images/icon/ico_complete.png";
import CustomTooltip from "@/pages/[lang]/pub/components/common/tooltip";
import { Select } from "@/components/ui/select-custom";
import { useTranslation } from "react-i18next";

const ApplyRefund = () => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState({
    terms1: false, // 개인정보 수집·이용 동의 (필수)
    terms2: false, // 개인정보 제3자 제공 동의 (필수)
    terms3: false, // 개인정보 제3자 제공 동의 (필수) - 카드사
    terms4: false, // 개인정보 수집·이용 동의 (선택) - 동의하지 않음
    terms5: false, // 개인정보 수집·이용 동의 (선택) - 동의함
    terms6: false, // 개인정보 수집·이용 동의 (선택) - 동의함
    terms7: false, // 개인정보 수집·이용 동의 (선택) - 동의함
    terms8: false, // 개인정보 수집·이용 동의 (선택) - 동의함
    allTerms: false // 전체 동의
  });
  
  // 20250527 퍼블 수정 : 전체 동의 수정 
  const handleCheckboxChange = (termId) => {
    if (termId === 'allTerms') {
      // 전체 동의 체크박스 처리
      const newValue = !checkedItems.allTerms;
      setCheckedItems({
        terms1: newValue,
        terms2: newValue,
        terms3: newValue,
        terms4: newValue,
        terms5: newValue,
        terms6: newValue,
        terms7: newValue,  // 동의 추가
        terms8: !newValue,     // 비동의는 항상 false
        allTerms: newValue
      });
    } else if (termId === 'terms7') {
      setCheckedItems(prev => ({
        ...prev,
        terms7: true,
        terms8: false,
        allTerms: prev.terms1 && prev.terms2 && prev.terms3 && 
                 prev.terms4 && prev.terms5 && prev.terms6
      }));
    } else if (termId === 'terms8') {
      setCheckedItems(prev => ({
        ...prev,
        terms7: false,
        terms8: true,
        allTerms: false
      }));
    } else {
      setCheckedItems(prev => {
        const newState = {
          ...prev,
          [termId]: !prev[termId]
        };
        
        const allChecked = ['terms1', 'terms2', 'terms3', 'terms4', 'terms5', 'terms6']
          .every(key => newState[key]) && newState.terms7;

        return {
          ...newState,
          allTerms: allChecked
        };
      });
    }
  };


  const [date, setDate] = useState(new Date());

  const firstOptions = [
    { value: "option1", label: "한국" },
    { value: "option2", label: "중국" },
    { value: "option3", label: "미국" },
    { value: "option4", label: "일본" },
  ];

  const secondOptions = [
    { value: "value1", label: "남" },
    { value: "value2", label: "여" },
  ];

  const srdOptions = [
    { value: "value1", label: "출생연도" },
    { value: "value2", label: "2000년" },
    { value: "value3", label: "2001년" },
    { value: "value4", label: "2002년" },
  ];

  const fourOptions = [
    { value: "value1", label: "1월" },
    { value: "value2", label: "2월" },
    { value: "value3", label: "3월" },
    { value: "value4", label: "4월" },
  ];

  const fiveOptions = [
    { value: "value1", label: "1일" },
    { value: "value2", label: "2일" },
    { value: "value3", label: "3일" },
    { value: "value4", label: "4일" },
  ];

  const sixOptions = [
    { value: "value1", label: "naver.com" },
    { value: "value2", label: "gmail.com" },
    { value: "value3", label: "kakao.com" },
    { value: "value4", label: "daum.net" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="apply-refund-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">{t("traveler.applyRefund.title")}</h2>
        </div>
      </section>
      <section>
        <div className="component-group">
          <div className="from-group">
            <Tabs defaultValue="step01" className="tab-wrap step-type">
              <TabsList>
                <TabsTrigger value="step01">
                  <span>{t("traveler.applyRefund.tabs.step1")}</span>
                </TabsTrigger>
                <TabsTrigger value="step02">
                  <span>{t("traveler.applyRefund.tabs.step2")}</span>
                </TabsTrigger>
                <TabsTrigger value="step03">
                  <span>{t("traveler.applyRefund.tabs.step3")}</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="step01">
                <section>
                  <div className="info-list-wrap">
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                          {t("traveler.applyRefund.terms.uniqueId.title")}
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
  {t("traveler.applyRefund.terms.uniqueId.items", { returnObjects: true }).map(
    (item, index) => (
      <li
        key={index}
        className="info-item"
        dangerouslySetInnerHTML={{ __html: item }}
      />
      // 위와 같이 li 태그에 직접 dangerouslySetInnerHTML을 사용하면
      // li 태그의 자식으로 다른 React 요소를 넣을 수 없습니다.
      // item 문자열 자체가 li 태그의 전체 내용이 됩니다.
    )
  )}
</ul>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-1"
                              checked={checkedItems.terms1}
                              onCheckedChange={() =>
                                handleCheckboxChange("terms1")
                              }
                            />
                            <label htmlFor="checkbox-1" className="">
                              {t("traveler.applyRefund.terms.uniqueId.agree")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                          {t("traveler.applyRefund.terms.personalInfo.title")}
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
                          {t("traveler.applyRefund.terms.personalInfo.items", { returnObjects: true }).map(
                            (item, index) => (
                              <li key={index} className="info-item">
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-2"
                              checked={checkedItems.terms2}
                              onCheckedChange={() =>
                                handleCheckboxChange("terms2")
                              }
                            />
                            <label htmlFor="checkbox-2" className="">
                              {t("traveler.applyRefund.terms.personalInfo.agree")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                          {t("traveler.applyRefund.terms.uniqueIdThirdParty.title")}
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
                          {t("traveler.applyRefund.terms.uniqueIdThirdParty.items", {
                            returnObjects: true,
                          }).map((item, index) => (
                            <li key={index} className="info-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-3"
                              checked={checkedItems.terms3}
                              onCheckedChange={() =>
                                handleCheckboxChange("terms3")
                              }
                            />
                            <label htmlFor="checkbox-3" className="">
                              {t("traveler.applyRefund.terms.uniqueIdThirdParty.agree")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                          {t("traveler.applyRefund.terms.personalInfoThirdParty.title")}
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
                          {t("traveler.applyRefund.terms.personalInfoThirdParty.items", {
                            returnObjects: true,
                          }).map((item, index) => (
                            <li key={index} className="info-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-4"
                              checked={checkedItems.terms4}
                              onCheckedChange={() =>
                                handleCheckboxChange("terms4")
                              }
                            />
                            <label htmlFor="checkbox-4" className="">
                              {t("traveler.applyRefund.terms.personalInfoThirdParty.agree")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                        개인정보 제3자 제공 동의 (필수)
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
                          <li className="info-item">
                          개인정보의 수집 이용 목적
                          : 환급 절차 진행
                          </li>
                          <li className="info-item">
                          개인정보 제공받는 자 : 문화체육부, 보건복지부
                          </li>
                          <li className="info-item">
                          제공하는 개인정보 항목 : 여권번호(성명, 국적, 생년월일)
                          </li>
                          <li className="info-item">
                          개인정보의 보유·이용기간 : 5년
                          </li>
                          <li className="info-item">
                          개인정보 수집에 동의하지 않을 수 있습니다. 단, 동의하지 않을 경우 가맹점 가입 신청 및 문의하기 접수가 되지 않습니다
                          </li>
                        </ul>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-5"
                              checked={checkedItems.terms5}
                              onCheckedChange={() =>
                                handleCheckboxChange("terms5")
                              }
                            />
                            <label htmlFor="checkbox-5" className="">
                            위 개인정보 제 3자 제공에 동의합니다.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                          개인정보 제3자 제공 동의 (필수)
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
                          <li className="info-item">
                            개인정보의 제공 목적 : 환급 절차 진행
                          </li>
                          <li className="info-item">
                            개인정보 제공받는 자 : 롯데카드, VISA, Master, JCB,
                            UnionPay, 글로벌텍스프리
                          </li>
                          <li className="info-item">
                            제공하는 개인정보 항목 : 카드정보(카드번호, 이름)
                          </li>
                          <li className="info-item">
                            개인정보의 보유·이용기간 : 관련 법령 및 규약 등에
                            근거한 기간까지
                          </li>
                          <li className="info-item">
                            위의 개인정보 제공에 대한 동의를 거부할 권리가
                            있습니다. 그러나 동의를 거부할 경우 원활한 환급 절차
                            진행에 제한을 받을 수 있습니다.
                          </li>
                        </ul>
                      </div>
                      <div className="component-group">
                        <div className="from-group">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-6"
                              checked={checkedItems.terms6}
                              onCheckedChange={() =>
                                handleCheckboxChange("terms6")
                              }
                            />
                            <label htmlFor="checkbox-6" className="">
                              위 개인정보 제 3자 제공에 동의합니다.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-list-item">
                      <div className="hgroup-wrap sub">
                        <p className="f24-700-140">
                          개인정보 수집·이용 동의 (선택)
                        </p>
                      </div>
                      <div className="info-bx">
                        <ul className="info-list num-type">
                          <li className="info-item">
                            개인정보의 수집 이용 목적 : 환급 신청
                          </li>
                          <li className="info-item">
                            수집하는 개인정보 항목 : 성별
                          </li>
                          <li className="info-item">
                            개인정보의 보유·이용기간 : 5년
                          </li>
                          <li className="info-item">
                            귀하는 위와 같이 개인정보를 수집·이용하는데 동의를
                            거부할 권리가 있습니다. 그러나, 동의를 거부하는 경우
                            서비스 이용이 제한될 수 있습니다.
                          </li>
                        </ul>
                      </div>

                      {/* 20250527 : 퍼블 수정 라디오 마크업 수정 */}
                      <div className="component-group radio-container">
                        <div className="from-group">
                          <div className="radio-group">
                            <ShadcnRadio 
                                value={checkedItems.terms7 ? "agree" : checkedItems.terms8 ? "disagree" : ""}
                                onValueChange={(value) => {
                                  handleCheckboxChange(value === 'agree' ? 'terms7' : 'terms8');
                                }}
                              >
                                <div className="radio-item">
                                  <RadioItem 
                                    value="agree" 
                                    id="radio-7"
                                  />
                                  <Label htmlFor="radio-7">위 개인정보 수집 이용안내에 동의합니다.</Label>
                                </div>
                                <div className="radio-item">
                                  <RadioItem 
                                    value="disagree" 
                                    id="radio-8"
                                  />
                                  <Label htmlFor="radio-8">위 개인정보 수집 이용안내에 동의하지 않습니다.</Label>
                                </div>
                              </ShadcnRadio>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 20250526 퍼블 추가 */}
                    <div className="info-list-item border-top">
                      <div className="component-group">
                        <div className="from-group flex-type">
                          <div className="checkbox-wrap">
                            <Checkbox
                              className="checkbox-input"
                              id="checkbox-allTerms"
                              checked={checkedItems.allTerms}
                              onCheckedChange={() =>
                                handleCheckboxChange("allTerms")
                              }
                            />
                            <label htmlFor="checkbox-allTerms" className="">
                             전체 동의
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="btn-section">
                  <div className="btn-wrap">
                    <div className="btn-inner line-type">
                      <Button className="btn btn-default">이전</Button>
                      <Button className="btn btn-primary">다음</Button>
                    </div>
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="step02">
                <section>
                  <div className="hgroup-wrap line-type">
                    <h2 className="f24-700-140">{t("traveler.applyRefund.step2.title")}</h2>
                  </div>
                  <div className="round-bx list-type">
                    <div className="round-inner">
                      <div className="round-item">
                        <div className="badge-group">
                          <span className="badge badge-primary">{t("traveler.applyRefund.step2.refundable")}</span>
                        </div>
                        <div className="round-item-info">
                          <p className="f15-600-140">{t("traveler.applyRefund.step2.receiptNumber")}</p>
                          <strong className="f18-500-160">1456 9998 8774 8541 9851</strong>
                          <span className="f15-400-140">
                            {t("traveler.applyRefund.step2.purchaseDate")} <em>2025.03.27</em>
                          </span>
                        </div>
                        <div className="round-item-price">
                          <p className="f15-400-140">
                            {t("traveler.applyRefund.step2.totalAmount")} <span>1,542,120</span>원
                          </p>
                          <dl>
                            <dt className="f15-600-140">{t("traveler.applyRefund.step2.refundAmount")}</dt>
                            <dd className="f16-500-160">
                              <span className="f24-700-140">1,541,200</span>원
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amount-bx">
                    <dl>
                      <dt className="f20-700-140">{t("traveler.applyRefund.step2.totalRefundAmount")}</dt>
                      <dd className="f32-700-140">
                        <strong>154,120</strong>원
                      </dd>
                    </dl>
                  </div>
                </section>
                <section>
                  <div className="hgroup-wrap more-type line-type">
                    <h2 className="f24-700-140">{t("traveler.applyRefund.step2.passportInfo.title")}</h2>
                    <span className="label-txt">
                      {t("traveler.applyRefund.step2.passportInfo.required")}
                      <i className="ico-required-mark" role="img" aria-label="required">*</i>
                    </span>
                  </div>
                  <div className="component-group">
                    <div className="from-group grid-type">
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.passportInfo.name.label")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group">
                          <ShadcnInput
                            type="text"
                            id="test1"
                            placeholder={t("traveler.applyRefund.step2.passportInfo.name.lastName")}
                            clearable
                          />
                        </div>
                      </div>
                      <div className="from-group-grid">
                        <div className="input-group">
                          <ShadcnInput
                            type="text"
                            id="test1"
                            placeholder={t("traveler.applyRefund.step2.passportInfo.name.firstName")}
                            clearable
                          />
                        </div>
                      </div>
                    </div>
                    <div className="from-group grid-type">
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.passportInfo.number")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group">
                          <ShadcnInput type="text" id="test1" placeholder="" clearable />
                        </div>
                      </div>
                    </div>
                    <div className="from-group grid-type">
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.passportInfo.nationality")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group">
                          <Select
                            options={firstOptions}
                            title={t("traveler.applyRefund.step2.passportInfo.nationality")}
                            onChange={(value) => console.log("First Selected:", value)}
                            onConfirm={() => console.log("First Confirmed")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="from-group grid-type">
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">{t("traveler.applyRefund.step2.passportInfo.gender")}</span>
                        </label>
                        <div className="input-group">
                          <Select
                            options={secondOptions}
                            title={t("traveler.applyRefund.step2.passportInfo.gender")}
                            onChange={(value) => console.log("Second Selected:", value)}
                            onConfirm={() => console.log("Second Confirmed")}
                          />
                        </div>
                      </div>
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.passportInfo.birthDate")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group email-type">
                          <Select
                            options={srdOptions}
                            placeholder={t("traveler.applyRefund.form.birthYear.label")}
                            onChange={(value) => console.log("Second Selected:", value)}
                            onConfirm={() => console.log("Second Confirmed")}
                          />
                          <Select
                            options={fourOptions}
                            placeholder={t("traveler.applyRefund.form.birthMonth.label")}
                            onChange={(value) => console.log("Second Selected:", value)}
                            onConfirm={() => console.log("Second Confirmed")}
                          />
                          <Select
                            options={fiveOptions}
                            placeholder={t("traveler.applyRefund.form.birthDay.label")}
                            onChange={(value) => console.log("Second Selected:", value)}
                            onConfirm={() => console.log("Second Confirmed")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="hgroup-wrap more-type line-type">
                    <h2 className="f24-700-140">{t("traveler.applyRefund.step2.contactInfo.title")}</h2>
                    <span className="label-txt">
                      {t("traveler.applyRefund.step2.passportInfo.required")}
                      <i className="ico-required-mark" role="img" aria-label="required">*</i>
                    </span>
                  </div>
                  <div className="component-group">
                    <div className="from-group grid-type">
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.contactInfo.phone.label")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group">
                          <ShadcnInput
                            type="text"
                            id="test1"
                            placeholder={t("traveler.applyRefund.step2.contactInfo.phone.placeholder")}
                          />
                        </div>
                      </div>
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.contactInfo.email.label")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group email-type">
                          <div className="email-type-input">
                            <ShadcnInput
                              type="text"
                              id="test1"
                              placeholder={t("traveler.applyRefund.step2.contactInfo.email.id")}
                              clearable
                            />
                            <span>@</span>
                            <ShadcnInput type="text" id="test1" placeholder="" clearable />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="hgroup-wrap more-type line-type">
                    <h2 className="f24-700-140">{t("traveler.applyRefund.step2.paymentMethod.title")}</h2>
                    <span className="label-txt">
                      {t("traveler.applyRefund.step2.passportInfo.required")}
                      <i className="ico-required-mark" role="img" aria-label="required">*</i>
                    </span>
                  </div>
                  <div className="component-group">
                    <div className="from-group grid-type">
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.paymentMethod.cardSelection")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <ShadcnRadio defaultValue="가맹 문의">
                          <div className="radio-item">
                            <RadioItem value="creditCard" id="r1" />
                            <Label htmlFor="r1">{t("traveler.applyRefund.step2.paymentMethod.creditCard")}</Label>
                          </div>
                          <div className="radio-item">
                            <RadioItem value="alipay" id="r2" />
                            <Label htmlFor="r2">{t("traveler.applyRefund.step2.paymentMethod.alipay")}</Label>
                          </div>
                          <div className="radio-item">
                            <RadioItem value="wechatPay" id="r3" />
                            <Label htmlFor="r3">{t("traveler.applyRefund.step2.paymentMethod.wechatPay")}</Label>
                          </div>
                        </ShadcnRadio>
                      </div>
                      <div className="from-group-grid">
                        <label htmlFor="test1" className="input-label">
                          <span className="label-txt">
                            {t("traveler.applyRefund.step2.paymentMethod.cardNumber.label")}
                            <i className="ico-required-mark" role="img" aria-label="required">*</i>
                          </span>
                        </label>
                        <div className="input-group">
                          <ShadcnInput
                            type="text"
                            id="test1"
                            placeholder={t("traveler.applyRefund.step2.paymentMethod.cardNumber.placeholder")}
                            clearable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="info-bx no-scroll border-none">
                    <p className="info-txt">{t("traveler.applyRefund.step2.notes.title")}</p>
                    <ul className="info-list">
                      {t("traveler.applyRefund.step2.notes.items", { returnObjects: true }).map((item, index) => (
                        <li key={index} className="info-item dot">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                <section className="mt-40">
                  <div className="btn-wrap">
                    <div className="btn-inner line-type">
                      <Button className="btn btn-default">{t("traveler.applyRefund.step2.buttons.prev")}</Button>
                      <Button className="btn btn-primary">{t("traveler.applyRefund.step2.buttons.apply")}</Button>
                    </div>
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="step03">
                <section>
                  <div className="hgroup-wrap tooltip-type line-type">
                    <p className="f24-700-140">{t("traveler.applyRefund.step3.title")}</p>
                    <div className="tooltip">
                      <CustomTooltip
                        content={`
                          <div class='refund-type'>
                            <div class='tooltip-tit'>${t("traveler.applyRefund.step3.tooltip.title")}</div>
                            <div class='tooltip-info'>
                              ${Object.entries(t("traveler.applyRefund.step3.tooltip.status", { returnObjects: true }))
                                .map(([key, status]) => `
                                  <div class='tooltip-info-item'>
                                    <div class='badge-group'>
                                      <span class='badge badge-${key === "noReceipt" || key === "notExported" ? "gray" : 
                                        key === "refundable" ? "primary" : 
                                        key === "refunding" || key === "cityRefunding" ? "green" : 
                                        key === "completed" ? "darkgreen" : "red"}'>${status.label}</span>
                                    </div>
                                    <div class='tooltip-info-item-txt'>
                                      ${status.description}
                                    </div>
                                  </div>
                                `).join("")}
                            </div>
                          </div>
                        `}
                        showCloseButton={true}
                      />
                    </div>
                  </div>
                  <div className="round-bx list-type">
                    <div className="round-inner">
                      <div className="round-item">
                        <div className="badge-group">
                          <span className="badge badge-darkgreen">{t("traveler.applyRefund.step2.refundable")}</span>
                        </div>
                        <div className="round-item-info">
                          <p className="f15-600-140">{t("traveler.applyRefund.step2.receiptNumber")}</p>
                          <strong className="f18-500-160">1456 9998 8774 8541 9851</strong>
                          <span className="f15-400-140">
                            {t("traveler.applyRefund.step2.purchaseDate")} <em>2025.03.27</em>
                          </span>
                        </div>
                        <div className="round-item-price">
                          <p className="f15-400-140">
                            {t("traveler.applyRefund.step2.totalAmount")} <span>1,542,120</span>원
                          </p>
                          <dl>
                            <dt className="f15-600-140">{t("traveler.applyRefund.step2.refundAmount")}</dt>
                            <dd className="f16-500-160">
                              <span className="f24-700-140">1,541,200</span>원
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amount-bx mb-64">
                    <dl>
                      <dt className="f20-700-140">{t("traveler.applyRefund.step2.totalRefundAmount")}</dt>
                      <dd className="f32-700-140">
                        <strong>154,120</strong>원
                      </dd>
                    </dl>
                  </div>
                </section>
                <section>
                  <div className="info-bx no-scroll border-none">
                    <p className="info-txt">{t("traveler.applyRefund.step3.notes.title")}</p>
                    <ul className="info-list">
                      <li className="info-item dot">
                        {t("traveler.applyRefund.step3.notes.contact")}
                        <ul className="under-list">
                          <li>
                            <span className="color-primary">{t("traveler.applyRefund.step3.notes.email")}</span>
                            &nbsp; / {t("traveler.applyRefund.step3.notes.phone")}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-wrap">
                    <div className="btn-inner line-type">
                      <Button className="btn btn-primary">{t("traveler.applyRefund.step3.buttons.confirm")}</Button>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyRefund;
