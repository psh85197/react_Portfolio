import React, { useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select-custom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import securityImage from "@/assets/images/dump/security.png";
import refreshIcon from "@/assets/images/icon/ico_refresh.png";
const EthicsRealnameReport = () => {
  const [checkedItems, setCheckedItems] = useState({
    terms1: false, 
  });

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const firstOptions = [
    { value: "option1", label: "직접입력" },
    { value: "option2", label: "직접입력" },
    { value: "option3", label: "직접입력" },
    { value: "option4", label: "직접입력" },
  ];

  const secondOptions = [
    { value: "option1", label: "직접입력" },
    { value: "option2", label: "직접입력" },
    { value: "option3", label: "직접입력" },
    { value: "option4", label: "직접입력" },
  ];

  const srdOptions = [
    { value: "option1", label: "직접입력" },
    { value: "option2", label: "직접입력" },
    { value: "option3", label: "직접입력" },
    { value: "option4", label: "직접입력" },
  ];

  const fourOptions = [
    { value: "option1", label: "직접입력" },
    { value: "option2", label: "직접입력" },
    { value: "option3", label: "직접입력" },
    { value: "option4", label: "직접입력" },
  ];


  return (
    <div className="ethicsrealnamereport-wrap">
      <section>
        <div className="info-bx no-scroll">
          <p className="info-txt color-primary">제보하기 안내</p>
          <ul className="info-list ">
            <li className="info-item dot">
              당사 제보시스템은 안전한 보안체계로 보호되고 있으며, 제보자가
              익명으로 제보 시 제보자의 신분 확인이 불가합니다.
            </li>
            <li className="info-item dot">
              내용이 구체적이지 않고 사실 근거가 명확하지 않는 경우, 조사가
              불가능할 수 있습니다.
            </li>
            <li className="info-item dot">
              실명 제보 시 답변 내용은 이메일로 발송되며, 처리결과 확인 화면에서
              아이디와 비밀번호를 통해 답변 확인이 가능합니다.
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="hgroup-wrap sub">
          <p className="f24-700-140">개인정보 수집 이용 안내</p>
        </div>
        <div className="info-bx line">
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
      </section>
      <section>
        <div className="hgroup-wrap more-type line-type">
          <p className="f24-700-140">제보자 정보</p>
          <span className="label-txt">
            필수 입력 항목
            <i className="ico-required-mark" role="img" aria-label="필수">
              *
            </i>
          </span>
        </div>
        <div className="component-group">
          <div className="from-group grid-type">
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                  회사

                </span>
              </label>
              <div className="input-group">
                <Select
                  options={firstOptions}
                  title="첫 번째 선택"
                  onChange={(value) => console.log("First Selected:", value)}
                  onConfirm={() => console.log("First Confirmed")}
                />
              </div>
            </div>
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                  부서
                  
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
                  성명
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
                <span className="label-txt">
                전화번호
                  
                </span>
              </label>
              <div className="input-group">
                <ShadcnInput type="text" id="test1" placeholder="-제외하고 숫자만 입력" clearable />
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
              {/* 퍼블수정 : 20250515 pull 클래스 추가 */}
              <div className="input-group email-type pull">
                <div className="email-type-input">
                  <ShadcnInput type="text" id="test1" placeholder="ID" clearable />
                  <span>@</span>
                  <ShadcnInput type="text" id="test1" placeholder="" clearable />
                </div>

                {/* 퍼블수정 : 20250515 주석 */}
                {/* <Select
                  options={secondOptions}
                  title="첫 번째 선택"
                  onChange={(value) => console.log("First Selected:", value)}
                  onConfirm={() => console.log("First Confirmed")}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="hgroup-wrap more-type line-type">
          <p className="f24-700-140">제보 대상</p>
          <span className="label-txt">
            필수 입력 항목
            <i className="ico-required-mark" role="img" aria-label="필수">
              *
            </i>
          </span>
        </div>
        <div className="component-group">
          <div className="from-group grid-type">
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                회사
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
              <Select
                  options={srdOptions}
                  title="첫 번째 선택"
                  onChange={(value) => console.log("First Selected:", value)}
                  onConfirm={() => console.log("First Confirmed")}
                />
              </div>
            </div>
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                부서
                <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
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
                성명
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
                <ShadcnInput type="text" id="test1" placeholder="" clearable />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="hgroup-wrap more-type line-type">
          <p className="f24-700-140">제보 내용</p>
          <span className="label-txt">
            필수 입력 항목
            <i className="ico-required-mark" role="img" aria-label="필수">
              *
            </i>
          </span>
        </div>
        <div className="component-group">
          <div className="from-group grid-type">
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                제보 유형
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
              <Select
                  options={fourOptions}
                  title="첫 번째 선택"
                  onChange={(value) => console.log("First Selected:", value)}
                  onConfirm={() => console.log("First Confirmed")}
                />
              </div>
            </div>
          </div>
          <div className="from-group">
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                제목
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
                <ShadcnInput type="text" id="test1" placeholder="" clearable                   readOnly/>
              </div>
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
            {/* 퍼블수정 : 20250515 maxlenth 수정 */}
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
          <p className="f24-700-140">제보 확인용 정보</p>
          <span className="label-txt">
            필수 입력 항목
            <i className="ico-required-mark" role="img" aria-label="필수">
              *
            </i>
          </span>
        </div>
        <div className="security-group">
          <div className="component-group">
            <div className="from-group">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    아이디
                    <i
                      className="ico-required-mark"
                      role="img"
                      aria-label="필수"
                    >
                      *
                    </i>
                  </span>
                </label>
                <div className="security-inner">
                  <div className="input-group file-type">
                    <ShadcnInput
                      type="number"
                      id="test1"
                      placeholder="6자 이상 입력"
                    />
                    <Button className="btn file-btn" type="button">
                      중복 확인
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="from-group">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    비밀번호
                    <i
                      className="ico-required-mark"
                      role="img"
                      aria-label="필수"
                    >
                      *
                    </i>
                  </span>
                </label>
                <div className="input-group">
                  <ShadcnInput
                    type="password"
                    id="test1"
                    placeholder="8~20자의 영문, 숫자, 특수 문자로 조합"
                    clearable
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="under-line-type">
        <div className="hgroup-wrap more-type line-type">
          <p className="f24-700-140">보안 문자 입력</p>
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
              type="number"
              id="test1"
              placeholder="보안문자 6자리"
              clearable
            />
          </div>
        </div>
      </section>
      <div className="btn-wrap">
        <div className="btn-inner line-type">
          <Button className="btn btn-default">취소</Button>
          <Button className="btn btn-primary">등록</Button>
        </div>
      </div>
    </div>
  );
};

export default EthicsRealnameReport;
