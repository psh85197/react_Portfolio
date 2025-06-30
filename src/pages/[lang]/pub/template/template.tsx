import { FC, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import "@/assets/scss/style.scss";

const template: FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    terms1: false, // 고유 식별 정보의 수집 이용
    terms2: false, // 개인정보 수집 이용 안내 (필수)
    terms3: false, // 개인정보 수집 이용 안내 (선택) - 동의
    terms4: false, // 개인정보 수집 이용 안내 (선택) - 비동의
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDisabled] = useState<Record<string, boolean>>({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });

  const handleCheckboxChange = (id: string) => {
    if (isDisabled[id]) return;
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="template-wrap">
      <section className="template-list">
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
      </section>
      <section className="template-list">
        <div className="hgroup-wrap sub">
          <p className="f24-700-140">mo : no-scroll type, dot type</p>
        </div>
        <div className="info-bx no-scroll">
          <p className="info-txt">유의사항</p>
          <ul className="info-list ">
            <li className="info-item dot">
              개인정보의 수집 이용 목적
              <ul className="under-list">
                <li>- 지원 서비스 신청 및 문의</li>
              </ul>
            </li>
            <li className="info-item dot">
              수집하는 개인정보 항목 : 연락처, 이름, 이메일
            </li>
            <li className="info-item dot">개인정보의 보유·이용기간 : 6개월</li>
            <li className="info-item dot">
              개인정보 수집에 동의하지 않을 수 있습니다. 단, 동의하지 않을 경우
              가맹점 가입 신청 및 문의하기 접수가 되지 않습니다
            </li>
          </ul>
        </div>
      </section>
      <section className="template-list">
        <div className="hgroup-wrap sub">
          <p className="f24-700-140"> border-none type</p>
        </div>
        <div className="info-bx border-none">
          <p className="info-txt">유의사항</p>
          <ul className="info-list ">
            <li className="info-item dot">
              개인정보의 수집 이용 목적
              <ul className="under-list">
                <li>- 지원 서비스 신청 및 문의</li>
              </ul>
            </li>
            <li className="info-item dot">
              수집하는 개인정보 항목 : 연락처, 이름, 이메일
            </li>
            <li className="info-item dot">개인정보의 보유·이용기간 : 6개월</li>
            <li className="info-item dot">
              개인정보 수집에 동의하지 않을 수 있습니다. 단, 동의하지 않을 경우
              가맹점 가입 신청 및 문의하기 접수가 되지 않습니다
            </li>
          </ul>
        </div>
      </section>
      <section className="template-list">
        <div className="hgroup-wrap sub">
          <p className="f24-700-140"> grid-type type</p>
        </div>
        <div className="info-bx">
          <p className="info-txt">유의사항</p>
          <div className="grid-type-wrap">
            <ul className="info-list">
              <li className="info-item dot">쌍커풀수술</li>
              <li className="info-item dot">코성형수술</li>
              <li className="info-item dot">유방수술</li>
              <li className="info-item dot">지방흡입술</li>
              <li className="info-item dot">주름살제거술</li>
              <li className="info-item dot">안면윤곽술</li>
              <li className="info-item dot">치아성형술</li>
              <li className="info-item dot">악안면교정술</li>
              <li className="info-item dot">기타</li>
            </ul>
            <ul className="info-list">
              <li className="info-item dot">여드름치료술</li>
              <li className="info-item dot">제모술</li>
              <li className="info-item dot">
                색소모반, 주근깨, 흑색점, 기미치료술
              </li>
              <li className="info-item dot">탈모치료술, 모발이식술</li>
              <li className="info-item dot">문신술 및 문신제거술, 피어싱</li>
              <li className="info-item dot">지방융해술</li>
              <li className="info-item dot">피부 재생술, 피부미백술</li>
              <li className="info-item dot">향노화치료술 및 모공축소술</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="template-list">
        <div className="hgroup-wrap sub">
          <p className="f24-700-140">blue-type</p>
        </div>
        <div className="info-bx no-scroll blue-type">
          <ul className="info-list ">
            <li className="info-item">
              <strong>
                제보 내용이 담당부서에 정상적으로 접수되었습니다.{" "}
              </strong>
            </li>
          </ul>
        </div>
      </section>
      <section className="template-list">
        <div className="badge-group">
          <span className="badge badge-primary">환급 가능</span>
        </div>
        <div className="badge-group">
          <span className="badge badge-navy">환급 가능</span>
        </div>
        <div className="badge-group">
          <span className="badge badge-gray">환급 가능</span>
        </div>
        <div className="badge-group">
          <span className="badge badge-white">환급 가능</span>
        </div>
        <div className="badge-group">
          <span className="badge badge-green">환급 가능</span>
        </div>
        <div className="badge-group">
          <span className="badge badge-red">환급 가능</span>
        </div>
      </section>
      <section className="template-list">
        <div className="badge-group">
          <span className="badge badge-gray02 type02">유인</span>
          <span className="badge badge-skyblue type02">부산</span>
        </div>
      </section>
      <section className="template-list">
        <div className="round-bx">
          <div className="round-inner">
            <div className="round-item">
              <div className="badge-group">
                <span className="badge badge-primary">환급 가능</span>
              </div>
              <div className="round-item-info">
                <p className="f15-600-140">전표 일련 번호</p>
                <strong className="f18-500-160">
                  1456 9998 8774 8541 9851
                </strong>
                <span className="f15-400-140">
                  구매일자 <em>2025.03.27</em>
                </span>
              </div>
              <div className="round-item-price">
                <p className="f15-400-140">
                  총 구매 금액 <span>1,542,120</span>원
                </p>
                <dl>
                  <dt className="f15-600-140">환급 금액</dt>
                  <dd className="f16-500-160">
                    <span className="f24-700-140">1,541,200</span>원
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="template-list">
        <div className="cont-wrap">
          <div className="img-cont">
            {/* 이미지 넣어주세요 */}
            {/* <img src={} 
                      alt="큐브리펀드 모바일 셀프 반출 오픈"
                    /> */}
          </div>
          <div className="txt-cont">
            <ul className="step-wrap">
              <li>
                <div className="step-tit">
                  <div>
                    <p className="num">STEP 1</p>
                    <p className="tit">관할 세무서 신고</p>
                  </div>
                </div>
                <div className="step-cont">
                  <ul className="desc-list">
                    <li>
                      사업장 소재 관할 세무서에 [외국인 관광객 면세판매장
                      지정증] 신청
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="step-tit">
                  <div>
                    <p className="num">STEP 2</p>
                    <p className="tit">큐브리펀드 가맹점 신청</p>
                  </div>
                </div>
                <div className="step-cont">
                  <ul className="desc-list">
                    <li>
                      [외국인 관광객 면세판매장 지정증] 수령 후, 큐브리펀드
                      고객센터로 가맹 신청
                    </li>
                    <li>고객센터 전화번호 : 02-6925-2033</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="step-tit">
                  <div>
                    <p className="num">STEP 3</p>
                    <p className="tit">큐브리펀드 장비 및 교육 제공</p>
                  </div>
                </div>
                <div className="step-cont">
                  <ul className="desc-list">
                    <li>
                      큐브리펀드와 가맹계약서 작성 후, 환급 장비 설치 및 교육{" "}
                    </li>
                    <li>단말기 및 필요물품 무료제공</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="template-list">
        <div className="cont-wrap">
          <div className="img-cont">
            {/* 이미지 넣어주세요 */}
            {/* <img src={} 
                      alt="큐브리펀드 모바일 셀프 반출 오픈"
                    /> */}
          </div>
          <div className="txt-cont">
            <ul className="step-wrap">
              <li>
                <div className="step-tit">
                  <div>
                    <p className="num">STEP 1</p>
                    <p className="tit">관할 세무서 신고</p>
                  </div>
                </div>
                <div className="step-cont grid-type">
                  <div className="grid-item">
                    <p className="tit">구매 기준</p>
                    <ul className="desc-list">
                      <li>1회 구매금액 15,000원 이상 600만원 이하</li>
                      <li>총 거래가액 한도 없음</li>
                      <li>결제 시 환급전표 수령 (미수령 시 환급 불가)</li>
                    </ul>
                  </div>
                  <div className="grid-item">
                    <p className="tit">필요 서류</p>
                    <ul className="desc-list">
                      <li>여권</li>
                      <li>환급전표</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="template-list">
        <div className="round-bx list-type">
          <div className="round-inner">
            <button
              className={`round-item ${checkedItems.terms1 ? "selected" : ""} ${
                isDisabled.terms1 ? "disabled" : ""
              }`}
              onClick={() => handleCheckboxChange("terms1")}
              type="button"
              disabled={isDisabled.terms1}
            >
              <div className="badge-group">
                <span className="badge badge-primary">환급 가능</span>
                <div className="checkbox-wrap">
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-1"
                    checked={checkedItems.terms1}
                    onCheckedChange={() => handleCheckboxChange("terms1")}
                    disabled={isDisabled.terms1}
                  />
                </div>
              </div>
              <div className="round-item-info">
                <p className="f15-600-140">전표 일련 번호</p>
                <strong className="f18-500-160">
                  1456 9998 8774 8541 9851
                </strong>
                <span className="f15-400-140">
                  구매일자 <em>2025.03.27</em>
                </span>
              </div>
              <div className="round-item-price">
                <p className="f15-400-140">
                  총 구매 금액 <span>1,542,120</span>원
                </p>
                <dl>
                  <dt className="f15-600-140">환급 금액</dt>
                  <dd className="f16-500-160">
                    <span className="f24-700-140">1,541,200</span>원
                  </dd>
                </dl>
              </div>
            </button>
            <button
              className={`round-item disabled ${
                checkedItems.terms2 ? "selected" : ""
              } ${isDisabled.terms2 ? "disabled" : ""}`}
              onClick={() => handleCheckboxChange("terms2")}
              type="button"
              disabled={isDisabled.terms2}
            >
              <div className="badge-group">
                <span className="badge badge-primary">환급 가능</span>
                <div className="checkbox-wrap">
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-2"
                    checked={checkedItems.terms2}
                    onCheckedChange={() => handleCheckboxChange("terms2")}
                    disabled={isDisabled.terms2}
                  />
                </div>
              </div>
              <div className="round-item-info">
                <p className="f15-600-140">전표 일련 번호</p>
                <strong className="f18-500-160">
                  1456 9998 8774 8541 9851
                </strong>
                <span className="f15-400-140">
                  구매일자 <em>2025.03.27</em>
                </span>
              </div>
              <div className="round-item-price">
                <p className="f15-400-140">
                  총 구매 금액 <span>1,542,120</span>원
                </p>
                <dl>
                  <dt className="f15-600-140">환급 금액</dt>
                  <dd className="f16-500-160">
                    <span className="f24-700-140">1,541,200</span>원
                  </dd>
                </dl>
              </div>
            </button>
            <button
              className={`round-item ${checkedItems.terms3 ? "selected" : ""} ${
                isDisabled.terms3 ? "disabled" : ""
              }`}
              onClick={() => handleCheckboxChange("terms3")}
              type="button"
              disabled={isDisabled.terms3}
            >
              <div className="badge-group">
                <span className="badge badge-primary">환급 가능</span>
                <div className="checkbox-wrap">
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-3"
                    checked={checkedItems.terms3}
                    onCheckedChange={() => handleCheckboxChange("terms3")}
                    disabled={isDisabled.terms3}
                  />
                </div>
              </div>
              <div className="round-item-info">
                <p className="f15-600-140">전표 일련 번호</p>
                <strong className="f18-500-160">
                  1456 9998 8774 8541 9851
                </strong>
                <span className="f15-400-140">
                  구매일자 <em>2025.03.27</em>
                </span>
              </div>
              <div className="round-item-price">
                <p className="f15-400-140">
                  총 구매 금액 <span>1,542,120</span>원
                </p>
                <dl>
                  <dt className="f15-600-140">환급 금액</dt>
                  <dd className="f16-500-160">
                    <span className="f24-700-140">1,541,200</span>원
                  </dd>
                </dl>
              </div>
            </button>
            <button
              className={`round-item clear ${
                checkedItems.terms4 ? "selected" : ""
              } ${isDisabled.terms4 ? "disabled" : ""}`}
              onClick={() => handleCheckboxChange("terms4")}
              type="button"
              disabled={isDisabled.terms4}
            >
              <div className="badge-group">
                <span className="badge badge-primary">환급 가능</span>
                <div className="checkbox-wrap">
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-4"
                    checked={checkedItems.terms4}
                    onCheckedChange={() => handleCheckboxChange("terms4")}
                    disabled={isDisabled.terms4}
                  />
                </div>
              </div>
              <div className="round-item-info">
                <p className="f15-600-140">전표 일련 번호</p>
                <strong className="f18-500-160">
                  1456 9998 8774 8541 9851
                </strong>
                <span className="f15-400-140">
                  구매일자 <em>2025.03.27</em>
                </span>
              </div>
              <div className="round-item-price">
                <p className="f15-400-140">
                  총 구매 금액 <span>1,542,120</span>원
                </p>
                <dl>
                  <dt className="f15-600-140">환급 금액</dt>
                  <dd className="f16-500-160">
                    <span className="f24-700-140">1,541,200</span>원
                  </dd>
                </dl>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default template;
