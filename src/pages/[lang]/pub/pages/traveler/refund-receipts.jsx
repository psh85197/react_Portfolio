import React, { useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ico_top_right_arrow from "@/assets/images/icon/ico_top_right_arrow.png";
import CustomTooltip from "@/pages/[lang]/pub/components/common/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import NodataCase from "@/pages/[lang]/pub/components/layouts/nodata-case";


const RefundReceipts = () => {
  const [checkedItems, setCheckedItems] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
  });
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">환급 조회 및 신청</h2>
        </div>
      </section>
      {/* 환급전표 조회 */}
      <section>
        <div className="hgroup-wrap more-type line-type">
          <h2 className="f24-700-140">환급전표 조회</h2>
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
                발행번호 (Serial No.)
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
                <ShadcnInput
                  type="text"
                  id="test1"
                  placeholder="TFF No. 입력"
                  clearable
                />
              </div>
            </div>
            <div className="from-group-grid">
              <label htmlFor="test1" className="input-label">
                <span className="label-txt">
                총액 (Payment Total)
                  <i className="ico-required-mark" role="img" aria-label="필수">
                    *
                  </i>
                </span>
              </label>
              <div className="input-group">
                <ShadcnInput
                  type="number"
                  id="test1"
                  placeholder="숫자만 입력"
                  clearable
                />
              </div>
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          {/* 퍼블수정 20250516 class 추가 */}
          <div className="btn-inner line-type mt-64">
            <Button className="btn btn-primary">조회</Button>
          </div>
        </div>
      </section>
      {/* 환급전표 조회 내역 */}
      <section>
        <div className="hgroup-wrap tooltip-type line-type">
          <p className="f24-700-140">환급전표 조회 내역</p>
          <div className="tooltip">
            <CustomTooltip
              content="
                          <div class='refund-type'>
                            <div class='tooltip-tit'>환급 상태 안내</div>
                            <div class='tooltip-info'>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-gray'>전표없음</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                  일치하는 전표가 없습니다.
                                </div>
                              </div>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-gray'>미반출</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                  고객님의 세관반출신고여부를 확인 중 입니다.
                                </div>
                              </div>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-primary'>환급 가능</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                  세관반출신고 또는 출국확인이 완료되었습니다. 환급 신청이 가능합니다.
                                </div>
                              </div>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-green'>환급중</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                  환급신청이 완료되었습니다. 출국항에 따라 최대 2개월이 소요 될 수 있습니다.
                                </div>
                              </div>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-green'>도심환급중</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                  환급신청이 완료되었습니다. 반출 후 환급이 진행됩니다.
                                </div>
                              </div>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-darkgreen'>환급완료</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                  환급이 완료되었습니다.
                                </div>
                              </div>
                              <div class='tooltip-info-item'>
                                <div class='badge-group'>
                                  <span class='badge badge-red'>환급불가</span>
                                </div>
                                <div class='tooltip-info-item-txt'>
                                 환급을 진행 할 수 없습니다. 자세한 사항은 대표전화로 연락바랍니다. (대표전화 +82-2-6925-2033)
                                </div>
                              </div>
                            </div>
                          </div>
                          "
              showCloseButton={true}
            />
          </div>
        </div>
        <div className="round-bx list-type">
          <div className="round-inner">
            <button
              className={`round-item ${checkedItems.terms1 ? "selected" : ""}`}
              onClick={() => handleCheckboxChange("terms1")}
              type="button"
            >
              <div className="badge-group">
                <span className="badge badge-primary">환급 가능</span>
                <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-1"
                    checked={checkedItems.terms1}
                    onCheckedChange={() => handleCheckboxChange("terms1")}
                  />
                </div>
              </div>
              <div className="round-item-info">
                <p className="f15-600-140">발행번호</p>
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
              className={`round-item ${checkedItems.terms2 ? "selected" : ""}`}
              onClick={() => handleCheckboxChange("terms2")}
              type="button"
            >
              <div className="badge-group">
                <span className="badge badge-green">환급중</span>
                <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-2"
                    checked={checkedItems.terms2}
                    onCheckedChange={() => handleCheckboxChange("terms2")}
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
                checkedItems.terms3 ? "selected" : ""
              }`}
              onClick={() => handleCheckboxChange("terms3")}
              type="button"
            >
              <div className="badge-group">
                <span className="badge badge-red">환급 불가</span>
                <p className="badge-desc pc-show">환급 존재하지 않는 전표번호. 전표번호를 확인해 주세요.
                </p>
                <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-3"
                    checked={checkedItems.terms3}
                    onCheckedChange={() => handleCheckboxChange("terms3")}
                  />
                </div>
              </div>
              <p className="badge-desc mo-show">환급 존재하지 않는 전표번호. 전표번호를 확인해 주세요.</p>
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
                checkedItems.terms4 ? "selected" : ""
              }`}
              onClick={() => handleCheckboxChange("terms4")}
              type="button"
            >
              <div className="badge-group">
                <span className="badge badge-gray">미반출</span>
                {/* 20250528 퍼블수정 */}
                <div className="checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    className="checkbox-input"
                    id="checkbox-4"
                    checked={checkedItems.terms4}
                    onCheckedChange={() => handleCheckboxChange("terms4")}
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
        <NodataCase />
      </section>
      <section>
        {/* 퍼블수정 20250516 class 추가 */}
        <div className="info-bx no-scroll border-none">
          <p className="info-txt">유의사항</p>
          <ul className="info-list">
            <li className="info-item dot">
            세관으로부터 반출 확인이 완료된 건에 한해서만 환급 신청이 가능합니다.

            </li>
            <li className="info-item dot">
            구매일로부터 3개월 초과된 건은 환급 신청이 불가능합니다.

            </li>
            <li className="info-item dot">
            구매영수증에 CubeRefund 로고가 있는지 꼭 확인하세요.

            </li>
            <li className="info-item dot">
            환율에 따라 실제 환급액과 다소 차이가 발생할 수 있습니다.
            </li>
            <li className="info-item dot">
            급 신청이 가능한 환급전표를 선택 후, 환급신청 버튼을 눌러 주세요.

            </li>
            <li className="info-item dot">
            자세한 사항은 하단의 '환급 문의'를 이용해주세요. (cube@cuberefund.com / +82-2-6925-2033)

            </li>
          </ul>
        </div>
        <div className="btn-wrap">
          <div className="btn-inner line-type">
            <Button className="btn btn-disabled">환급신청</Button>
          </div>
        </div>
      </section>
      <section>
        <p className="f20-700-140">환급에 대해 궁금한 사항이 있으신가요?</p>
        <div className="refund-bx">
          <ul className="refund-list">
            <li className="refund-item">
              <p className="f20-700-140">자주 묻는 질문</p>
              <Link to="/" className="f18-500-160">
                <span>바로가기</span>
                <img
                  src={ico_top_right_arrow}
                  alt="아이콘"
                  className=" ico-top-right-arrow"
                />
              </Link>
            </li>
            <li className="refund-item">
              <p className="f20-700-140">환급 문의</p>
              <Link to="/" className="f18-500-160">
                <span>바로가기</span>
                <img
                  src={ico_top_right_arrow}
                  alt="아이콘"
                  className="ico-top-right-arrow"
                />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default RefundReceipts;
