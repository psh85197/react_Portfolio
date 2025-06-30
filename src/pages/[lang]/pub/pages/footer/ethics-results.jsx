import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Select } from "@/components/ui/select-custom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const EthicsResults = () => {

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

  const fiveOptions = [
    { value: "option1", label: "직접입력" },
    { value: "option2", label: "직접입력" },
    { value: "option3", label: "직접입력" },
  ];

  return (
    <div className="ethicsresults-wrap">
      <section className="ethicsresults-wrap-01">
        <section className="under-line-type">
          <div className="hgroup-wrap more-type line-type">
            <p className="f24-700-140">제보 처리결과 확인</p>
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

        <div className="btn-wrap">
          <div className="btn-inner line-type">
            <Button className="btn btn-primary">확인</Button>
          </div>
        </div>
        <div className="info-bx">
          <ul className="info-list ">
            <li className="info-item dot">
              제보 확인용 정보로 입력 했던 아이디, 비밀번호를 입력해 주세요.
            </li>
            <li className="info-item dot">
              입력하신 아이디, 비밀번호는 제보 확인용으로 사용되며 별도의 찾기
              기능을 제공하지 않습니다.
            </li>
          </ul>
        </div>
      </section>
      <section className="ethicsresults-wrap-02">
        <section className="result-status">
          <div className="hgroup-wrap line-type">
            <p className="f24-700-140">처리 결과</p>
          </div>
          <p className="label-txt result">처리 상태</p>
          <div className="info-bx no-scroll blue-type">
            <div className="badge-group">
              <span className="badge badge-white">접수 완료</span>
            </div>
            <ul className="info-list ">
              <li className="info-item">
                <strong>
                  제보 내용이 담당부서에 정상적으로 접수되었습니다.
                </strong>
              </li>
            </ul>
          </div>
          {/* 20250527 퍼블수정 */}
          <div className="info-bx no-scroll blue-type">
            <div className="badge-group">
              <span className="badge badge-darkgreen">처리 완료</span>
            </div>
            <ul className="info-list ">
              <li className="info-item">
                <strong>
                조사 완료 후 종결 처리되었습니다. 처리 내용을 확인해 주세요.
                </strong>
              </li>
            </ul>
          </div>
          <p className="label-txt result">내용</p>
          <div className="info-bx no-scroll">
            <ul className="info-list ">
              <li className="info-item">
                <p className="info-title">처리일 2025.04.02</p>
              </li>
              {/* 퍼블수정 : 20250515 문구 수정 */}
              <li className="info-item">안녕하세요 큐브리펀드 입니다. <br />
                  제보 해주신 내용으로 조사 진행하여, 조치 완료 하였습니다. <br />
                  조치 결과에 대해 추가적으로 문의주실 내용이 있으신 경우, 재접수 부탁 드립니다.</li>
            </ul>
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
                  <span className="label-txt">회사</span>
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
                  <span className="label-txt">부서</span>
                </label>
                <div className="input-group">
                  <ShadcnInput
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
                </div>
              </div>
            </div>
            <div className="from-group grid-type">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    성명
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
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
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
            <div className="from-group">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    제목
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
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
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
              <div className="textarea-wrap">
                {/* 퍼블수정 : 20250515 문구 수정 */}
                <Textarea
                  placeholder=""
                  value={"가맹사에게 부정하게 접근하는걸 봤습니다. 부서는 제대로 모르겠고 빅데이터 관련한 팀에서 높은 직급을 가지고 있는 사람이라고 했습니다. 사진으로 제보합니다."}
                />
              </div>
            </div>
            <div className="from-group">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                파일첨부
                </span>
              </label>
              <div className="file-results">
                <p className="file-name">현장사진448949116.jpeg</p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="ethicsresults-wrap-03">
        <section className="result-status">
          <div className="hgroup-wrap line-type">
            <p className="f24-700-140">처리 결과</p>
          </div>
          <p className="label-txt result">처리 상태</p>
          <div className="info-bx no-scroll blue-type">
            <div className="badge-group">
              <span className="badge badge-primary">내용 확인</span>
            </div>
            <ul className="info-list ">
              <li className="info-item">
                <strong>
                제보 내용 기준으로 조사 계획에 맞춰 내용 확인 및 조사 진행중입니다.
                </strong>
              </li>
            </ul>
          </div>
          <p className="label-txt result">내용</p>
          <div className="info-bx no-scroll">
            <ul className="info-list ">
              <li className="info-item">
                <p className="info-title">처리일 2025.04.02</p>
              </li>
              <li className="info-item">안녕하세요 큐브리펀드 입니다. <br />
                  제보 해주신 내용으로 조사 진행하여, 조치 완료 하였습니다. <br />
                  조치 결과에 대해 추가적으로 문의주실 내용이 있으신 경우, 재접수 부탁 드립니다.</li>
            </ul>
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
                  <span className="label-txt">회사</span>
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
                  <span className="label-txt">부서</span>
                </label>
                <div className="input-group">
                  <ShadcnInput
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
                </div>
              </div>
            </div>
            <div className="from-group grid-type">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    성명
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
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
                </div>
              </div>
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                  전화번호
                    
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
            <div className="from-group grid-type">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  {/* 퍼블수정 : 20250515 문구 수정 */}
                  <span className="label-txt">
                    이메일
                    <i
                      className="ico-required-mark"
                      role="img"
                      aria-label="필수"
                    >
                      *
                    </i>
                  </span>
                </label>
                <div className="input-group email-type pull">
                  <div className="email-type-input">
                    <ShadcnInput type="text" id="test1" placeholder="ID" clearable />
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
                  <span className="label-txt">회사</span>
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
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">부서</span>
                </label>
                <div className="input-group">
                  <ShadcnInput
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
                </div>
              </div>
            </div>
            <div className="from-group grid-type">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    성명
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
                    type="text"
                    id="test1"
                    placeholder=""
                    clearable
                  />
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
            <div className="from-group">
              <div className="from-group-grid">
                <label htmlFor="test1" className="input-label">
                  <span className="label-txt">
                    제목
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
                  {/* 퍼블수정 : 20250516 문구 추가 및 수정 */}
                  <ShadcnInput
                    type="text"
                    id="test1"
                    placeholder=""
                    value="가맹사에게 부정하게 접근하는걸 봤습니다."
                    clearable
                    disabled
                  />
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
              <div className="textarea-wrap">
                {/* 퍼블수정 : 20250516 수정 */}
                <Textarea
                  placeholder=""
                  value={"가맹사에게 부정하게 접근하는걸 봤습니다. 부서는 제대로 모르겠고 빅데이터 관련한 팀에서 높은 직급을 가지고 있는 사람이라고 했습니다. 사진으로 제보합니다. "}
                  disabled
                  
                />
              </div>
            </div>
            <div className="from-group">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                파일첨부
                </span>
              </label>
              <div className="file-results">
                <p className="file-name">현장사진448949116.jpeg</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default EthicsResults;
