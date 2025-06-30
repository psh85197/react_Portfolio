import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShadcnRadio, RadioItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select-custom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import securityImage from "@/assets/images/dump/security.png";
import refreshIcon from "@/assets/images/icon/ico_refresh.png";

const SignupInquiry = () => {
  const [checkedItems, setCheckedItems] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });

  const firstOptions = [
    { value: "option1", label: "직접입력" },
    { value: "option2", label: "직접입력" },
    { value: "option3", label: "직접입력" },
    { value: "option4", label: "직접입력" },
  ];

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="signup-inquiry-wrap">
      <section>
        <div className="hgroup-wrap">      
          {/* 퍼블수정 : 20250516 문구 수정 */}
          <h2 className="f48-700-140">가입 및 일반 문의</h2>
          {/* <p className="desc-txt f18-400-160">궁금하신 사항을 문의해 주세요.</p> */}
        </div>
      </section>
      {/* 퍼블수정 : 20250520 개인정보수집이용 주석처리 */}
      {/* <section>
        <div className="hgroup-wrap sub">
          <p className="f24-700-140">개인정보 수집 이용 안내</p>
        </div>
        <div className="info-bx">
          <ul className="info-list num-type">
            <li className="info-item">
              개인정보의 수집 이용 목적
              <ul className="under-list">
                <li>- 지원 서비스 신청 및 문의</li>
              </ul>
            </li>
            <li className="info-item">
              수집하는 개인정보 항목 : 연락처, 이름, 이메일
            </li>
            <li className="info-item">개인정보의 보유·이용기간 : 6개월</li>
            <li className="info-item">
              개인정보 수집에 동의하지 않을 수 있습니다. 단, 동의하지 않을 경우
              가맹점 가입 신청 및 문의하기 접수가 되지 않습니다
            </li>
          </ul>
        </div>
        <div className="component-group">
          <div className="from-group">
            <div className="checkbox-wrap">
              <Checkbox
                className="checkbox-input"
                id="checkbox-1"
                checked={checkedItems.terms}
                onCheckedChange={() => handleCheckboxChange("terms")}
              />
              <label htmlFor="checkbox-1" className="">
                위 개인정보 수집 이용안내에 동의합니다.
              </label>
            </div>
          </div>
        </div>
      </section> */}
      <section>
        <div className="hgroup-wrap more-type line-type">
          <h2 className="f24-700-140">문의 작성</h2>
          <span className="label-txt">
            필수 입력 항목
            <i className="ico-required-mark" role="img" aria-label="필수">
              *
            </i>
          </span>
        </div>
        <div className="component-group">
          <div className="from-group">
            <div className="radio-group">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                  문의 유형
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <ShadcnRadio defaultValue="가맹 문의">
                <div className="radio-item">
                  <RadioItem value="가맹 문의" id="r1" />
                  <Label htmlFor="r1">가맹 문의</Label>
                </div>
                <div className="radio-item">
                  <RadioItem value="일반 문의" id="r2" />
                  <Label htmlFor="r2">일반 문의</Label>
                </div>
              </ShadcnRadio>
            </div>
          </div>
          <div className="from-group grid-type">
          </div>
          <div className="from-group grid-type">
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                신청인
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
                <ShadcnInput type="text" id="test1" placeholder="" clearable />
              </div>
            </div>
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">전화번호
                <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
                
              </label>
              <div className="input-group">
                <ShadcnInput
                  type="number"
                  id="test1"
                  placeholder="-제외하고 숫자만 입력"
                  clearable
                />
              </div>
            </div>
          </div>
          <div className="from-group">
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                  이메일
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group email-type pull">
                <div className="email-type-input">
                  <ShadcnInput
                    type="text"
                    id="test1"
                    placeholder="ID"
                    clearable
                  />
                  <span>@</span>
                  <ShadcnInput
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
                </div>
                {/* 퍼블수정 : 20250516 주석 */}
                {/* <Select
                  options={firstOptions}
                  title="첫 번째 선택"
                  onChange={(value) => console.log("First Selected:", value)}
                  onConfirm={() => console.log("First Confirmed")}
                /> */}
              </div>
            </div>
          </div>
          <div className="from-group">
            <label htmlFor="test1" className="input-label">
              {/* 퍼블수정 : 20250516 문구 수정 */}
              <span className="label-txt">
                제목
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </label>
            <div className="input-group">
              <ShadcnInput type="text" id="test1" placeholder="[매장명] 가맹문의 드립니다." clearable />
            </div>
          </div>
          <div className="from-group">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">
                내용
                <i className="ico-required-mark" role="img" aria-label="필수">
                  *
                </i>
              </span>
            </label>
            {/* 퍼블수정 : 20250516 100자 -> 1500자 수정 */}
            <div className="textarea-wrap">
              <Textarea
                placeholder=""
                maxlength={1500}
                value={""}
              />
            </div>
          </div>
          <div className="from-group">
            <label htmlFor="test1" className="input-label">
              <span className="label-txt">파일첨부</span>
            </label>
             {/* 퍼블수정 : 20250515 버튼 클래스명 수정 및 문구 수정 */}
             <div className="input-group file-type">
              <Button className="btn add-btn" type="submit">
                등록하기
              </Button>
              </div>
              {/* 퍼블수정 : 20250515 문구 수정 */}
              <p className="error-txt">
                최대 5개만 등록 가능하며, 10Mb 미만의 문서, 그림, 압축 파일만 등록할 수 있습니다. 
              </p>
                        
              {/* 퍼블수정 : 20250515 파일 첨부 추가 */}
              <ul className="file-box">
                <li>
                  외부감사인 선임 공고.pdf
                  <button className="close-btn" type="button">
                  </button>
                </li>
                        
                <li>
                  외부감사인 선임 공고.hwp
                  <button className="close-btn" type="button">
                  </button>
                  </li>
                </ul>
          </div>
        </div>
      </section>
      <section className="under-line-type">
        <div className="hgroup-wrap more-type line-type">
          <h2 className="f24-700-140">보안 문자 입력</h2>
          <span className="label-txt">
            필수 입력 항목
            <i className="ico-required-mark" role="img" aria-label="필수">
              *
            </i>
          </span>
        </div>
        <div className="security-group">
          <label htmlFor="test1" className="input-label">
            <span className="label-txt">
              보안문자
              <i className="ico-required-mark" role="img" aria-label="필수">
                *
              </i>
            </span>
          </label>
          <div className="security-inner">
            <div className="security-img-bx">
              <img src={securityImage} alt="보안 이미지" />
            </div>
            <Button className="btn refresh-btn">
              <img src={refreshIcon} alt="아이콘" className="ico-refresh" />
              새로고침
            </Button>
          </div>
          <div className="input-group">
            <ShadcnInput
              type="text"
              id="test1"
              placeholder="보안문자 6자리"
              clearable
            />
          </div>
        </div>
        <div className="info-bx">
          {/* 퍼블수정 : 20250515 문구 수정 */}
          <p className="info-txt">비고</p>
          <ul className="info-list">
            {/* 퍼블수정 : 20250515 문구 수정 */}
            <li className="info-item dot">
              담당자 확인 후 입력하신 이메일 또는 전화로 연락드리겠습니다.
            </li>
          </ul>
        </div>
      </section>
      <div className="btn-wrap">
        <div className="btn-inner line-type">
          {/* 퍼블수정 : 주석 */}
          {/* <Button className="btn btn-default">취소</Button> */}
          <Button className="btn btn-primary">등록</Button>
        </div>
      </div>
    </div>
  );
};

export default SignupInquiry;
