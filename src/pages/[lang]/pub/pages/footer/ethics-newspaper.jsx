import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import newspaper_01 from "@/assets/images/dump/newspaper_01.png";
import newspaper_02 from "@/assets/images/dump/newspaper_02.png";
import newspaper_03 from "@/assets/images/dump/newspaper_03.png";
import newspaper_04 from "@/assets/images/dump/newspaper_04.png";
import newspaper_05 from "@/assets/images/dump/newspaper_05.png";
import newspaper_06 from "@/assets/images/dump/newspaper_06.png";

const EthicsNewspaper = () => {
  return (
    <div className="newspaper-wrap">
      <section>
        <div className="left-bx">
          {/* 퍼블수정 : 20250515 텍스트수정 */}
          <p className="f40-700-130">신문고란?</p>
        </div>
        <div className="right-bx">
          <div className="txt-bx">
            <p className="f20-500-160">
            큐브리펀드에서 경험하신 ‘직무 관련 권한 남용 등을 통한 자기 또는 제3자 이익 도모 행위, 내부회계관리규정 위반 행위, 성희롱 행위, 부패 행위, 직장 내 괴롭힘 행위, 기타 사회적 책임에 반하는 사항’에 대한 제보를 받는 열린 공간입니다.
            의견이나 신고사항이 있으시다면 언제든지 신문고를 이용하십시오.
            </p>
            <strong className="f20-700-160">
              {/* 퍼블수정 : 20250519 클래스 추가 */}
              의견이나 신고사항이 있으시다면 언제든지 신문고를 이용하십시오.<br className="pc-show mo-hide"/>
              항상 윤리적이고 책임감 있는 큐브리펀드가 되도록 하겠습니다.
            </strong>
          </div>
        </div>
      </section>
      <section>
        <div className="left-bx">
          <p className="f40-700-130">제보 대상</p>
        </div>
        <div className="right-bx">
          <div className="card-list">
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_01} alt="부정/비리" />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">부정/비리</strong>
                <p className="f18-400-160">
                  직원의 비리, 부당행위, 금품 및 향응 접대 수수 등 사회적 통념상
                  용인될 수 없는 행위
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_02} alt="인권/환경" />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">인권/환경</strong>
                <p className="f18-400-160">
                  직장 내 성희롱 및 직원상호간의 품위 손상 행위
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_03} alt="법규 윤리 위반" />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">법규 윤리 위반</strong>
                <p className="f18-400-160">
                  큐브리펀드와 거래상 비윤리 행위로 제반의 불이익을 당한 사항
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_04} alt="불만사항" />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">불만사항</strong>
                <p className="f18-400-160">
                  비효율 요소 및 윤리경영 활동을 위한 제도 개선 사항
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_05} alt="회계부정" />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">회계부정</strong>
                <p className="f18-400-160">
                  임직원의 내부회계관련 비리 및 부정 행위
                </p>
              </div>
            </div>
            <div className="card-item">
              <div className="img-bx">
                <img src={newspaper_06} alt="윤리행동강령 위배" />
              </div>
              <div className="card-info-bx">
                <strong className="f20-700-140">윤리행동강령 위배</strong>
                <p className="f18-400-160">
                  큐브리펀드 윤리행동강령에 위반 되는 행위
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="left-bx">
          <p className="f40-700-130">처리 절차</p>
        </div>
        <div className="right-bx">
          <div className="component-group">
            <div className="from-group">
              <Accordion type="single" collapsible className="accordion-wrap">
                <AccordionItem value="item-1">
                  <AccordionTrigger>제보 접수</AccordionTrigger>
                  <AccordionContent>
                    제보자가 신문하기 제보하기를 통해 등록한 사항은 담당부서에
                    접수 됩니다
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>내용 확인</AccordionTrigger>
                  <AccordionContent>
                    제보하신 내용은 제보자 신분보호 원칙하에 관련 부서 확인 등
                    사전 절차를 거치게 됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>조사 개시</AccordionTrigger>
                  <AccordionContent>
                    조사인원, 기간 등 조사계획이 확정된 후 순차적으로 진행되며,
                    조사 대상 및 범위에 따라 조사 기간이 달라질 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>조사 완료</AccordionTrigger>
                  <AccordionContent>
                    객관적인 근거 확보 및 조사를 통해 제보 내용의 사실 여부가
                    확인 되면 제보 조사가 완료됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>종결</AccordionTrigger>
                  <AccordionContent>
                    조사 완료 후 회사 내부 규정에 따라 징계가 확정 된 경우
                    종결처리하게 됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>처리결과 확인</AccordionTrigger>
                  <AccordionContent>
                    회사의 정당한 권리와 이익을 침해하는 경우를 제외하고 신문고
                    처리결과를 확인 할 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="left-bx">
          <p className="f40-700-130">제보자 보호</p>
        </div>
        <div className="right-bx">
          <div className="txt-bx">
            <p className="f20-500-160">
              제보자에 대해서는 본인의 동의 없이 그 신분을 노출하거나 <br className="pc-show" /> 이를
              암시하는 어떠한 정보도 공개하지 않으며, 불이익을 당하지 않도록
              하겠습니다.
            </p>
          </div>
          <div className="info-bx no-scroll">
            <p className="info-txt">보호 대상</p>
            <ul className="info-list">
              <li className="info-item dot">
              접수된 내용은 철저한 보안유지를 통해 비공개로 조사되며, 제보자 및 관련 이해관계자들에 대한 제보 정보도 철저히 보호하겠습니다.
              <br className="pc-show" />단, 타인에 대한 근거없는 비방이나 음해를 목적으로 한 이용은 삼가바랍니다.
              </li>
              <li className="info-item dot">
              제보자 신분
              </li>
              <li className="info-item dot">제보자가 제시한 증거 또는 제보 관련 수집 정보</li>
              <li className="info-item dot">
              협의 대상자를 암시할 수 있는 사항
              </li>
              <li className="info-item dot">
              제보 이후 결과 사후조치 등
              </li>
              <li className="info-item dot">
              조사 협조자 등 관련 이해관계자들에 대한 정보
              </li>
            </ul>
          </div>
          <div className="info-bx no-scroll">
            <p className="info-txt">보호 정책</p>
            <ul className="info-list">
              <li className="info-item dot">
              제보 내용이 구체적이고 사실근거가 명확한 경우 조사를 실시합니다.
              </li>
              <li className="info-item dot">
              제보자 및 제보 내용은 대외비로 엄격히 처리되며, 제보 시스템은 안전한 보안 체계로 보호되고 있습니다. 또한 제보 처리는 제보 내용에 대한 엄격한 비밀준수를 서약한 제한된 인원에 의해 수행되고 있습니다.
              </li>
              <li className="info-item dot">제보자에 대한 불이익 처분 또는 처벌이 발생하지 않도록 하겠습니다.</li>
              <li className="info-item dot">
              본인이 관련된 부정/비리를 제보할 경우에는 충분한 정상참작을 통하여 합리적으로 처리될 것입니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EthicsNewspaper;
