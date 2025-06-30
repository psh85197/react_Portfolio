import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const InquiriesFaq = () => {
  return (
    <div className="inquiries-faq-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">자주 묻는 질문</h2>
          {/* <p className="desc-txt f18-400-160">
          궁금한 사항을 확인해 보세요. 
          </p> */}
        </div>
      </section>
      <section>
        <Tabs defaultValue="step01" className="tab-wrap type02">
          <TabsList>
            <TabsTrigger value="step01">전체</TabsTrigger>
            <TabsTrigger value="step02">환급</TabsTrigger>
            <TabsTrigger value="step03">가맹</TabsTrigger>
          </TabsList>
          <TabsContent value="step01">
            {/* 퍼블수정 : 20250519 클랴스 추가 line */}
            <Accordion
              type="single"
              collapsible
              className="accordion-wrap ico-type line"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  환급 가능한 구매금액은 얼마인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>환급 대상자는 아래 경로에서 확인할 수 있습니다.</p>
                  <a href="https://www.cuberefund.com/ko/tax-refund/introduction" target="_blank" >환급 대상자 확인</a> {/* 번역 키 사용 예시 */}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  환급 가능한 구매금액은 얼마인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  단일매장에서의 구매금액이 1만5천원 이상인 경우 환급이 가능합니다.

                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  구매 영수증으로 환급이 가능한가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 물품 구매 후 환급전표를 발행 받으셔야 환급이 가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                환급전표는 어떻게 발행하나요?
                </AccordionTrigger>
                <AccordionContent>
                <p>물품 구매 시 매장 직원에게 환급전표 발행을 요청합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                여권 없이 환급전표를  발행할 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 여권이 있어야 환급전표를 발행 가능합니다.

                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                한국 여권 소지자인데 환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  가능합니다. 다만, 국내체류 3개월, 해외 2년 이상 거주한 해외교포만 가능합니다.

                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                환급은 공항에서만 가능한가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>아닙니다. 시내에서도 환급을 받을 수 있습니다. 단, 의료와 숙박 제외</p>
                  <Link to="https://www.cuberefund.com/ko/traveler/refund-methods">환급 창구 위치 확인</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>
                숙박도 도심환급 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  현재 숙박영역은 롯데호텔 부산점에서만 도심환급을 진행하고 있습니다. (2025.02.20 기준)

                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>
                의료도 도심환급 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  의료영역은 출국항환급, 메일박스환급, 모바일환급만 가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger>
                환급 수단에 따라 환급액이 달라지나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 환급 수단에 따라 환급액이 동일합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger>즉시환급이 무엇인가요?</AccordionTrigger>
                <AccordionContent>
                  <p>
                  즉시환급은 물품만 가능하며, 매장에서 물품 구매 시 물품에 포된된 세액상당액을 즉시 차감하여 결제하는 제도입니다.
                  </p>
                  <p>단, 물품 구매 시 반드시 여권을 소지해야 합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger>
                즉시환급 선별검사대상자가 무엇인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  관세청에서 정한 대상자이며, 즉시환급 선별검사대상자는 즉시환급이불가합니다.
                  </p>
                  <p>
                  사후환급을 진행해 주시기 바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-13">
                <AccordionTrigger>
                물품 중 환급을 받을 수 있는 항목은 무엇인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>환급 대상 품목은 아래 경로에서 확인할 수 있습니다.</p>
                  <Link to="https://www.cuberefund.com/ko/traveler/refund-eligibility">환급 대상 확인</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-14">
                <AccordionTrigger>
                현금 결제 후, 현금영수증을 발행했는데 환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 현금영수증 발행 시, 이중 세금 허택으로 환급을 받을 수 없습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-15">
                <AccordionTrigger>
                결제 카드의 명의자와 환급자의 여권명이 일치해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>네, 일치해야 합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-16">
                <AccordionTrigger>
                  호텔 인보이스 예약자명과 환급자 여권명이 일치해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>네, 일치해야 합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-17">
                <AccordionTrigger>
                  호환급을 받지 않고 출국했습니다. 환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    네, 가능합니다. 큐브리펀드 대표메일로 환급전표 사진을
                    보내주시면 확인 후 환급을 도와드리겠습니다. 다만, 물품의
                    경우 반출확인을 받은 환급전표만 가능하며, 숙박용역 및
                    의료용역온 법무부에 출국확인 후 환급을 도와드릴 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-18">
                <AccordionTrigger>
                  세관에 반출 신고를 하지 않고 출국했습니다. 재입국해서 신고하고
                  환급받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>불가능합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-19">
                <AccordionTrigger>
                  다튼 회사의 환급 전표도 도심환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    도심환급은 큐브리펀드의 환급전프만 가능하며, 타 회사의
                    환급전프는 출국항메서 환급받을 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-20">
                <AccordionTrigger>
                  항구로 춥입국하는 경우 환급받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    네, 가능합니다. 다만 출국항환급, 메일박스환급, 모바일환급만
                    가능합니다. (도심환급 붙가)
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-21">
                <AccordionTrigger>
                  외국인 관광객에게 부가세를 왜 환급해주나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    택스리펀드는 외국인 관광객이 물품을 구입 후 소지하고 출국할
                    경우, 해당 물품어 포합된 세액상당액을 돌려주는 제도로,
                    대한민국 정부에서 관광을 황성화하기 위한 제도로 운영되고
                    있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-22">
                <AccordionTrigger>
                  신규 가맹 문의는 어떻게 해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    신규 가맹은 1:1 문의를 남겨주시거나, 큐브리펀드로 연락주시기
                    바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-23">
                <AccordionTrigger>
                  사업자 정보 변경 시 어떻게 해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    사업자 정보 변경 시 1:1 문의를 남겨주시거나, 큐브리펀드로
                    연락주시기 바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="step02">
            {/* 퍼블수정 : 20250519 클랴스 추가 line */}
            <Accordion type="single" collapsible className="accordion-wrap ico-type line">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  환급 가능한 구매금액은 얼마인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>환급 대상자는 아래 경로에서 확인할 수 있습니다.</p>
                  <Link to="/">환급 대상자 확인</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  환급 가능한 구매금액은 얼마인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    단일매장에서 구매금액 15,000원 이상인 경우 환급이
                    가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  구매 영수증으로 환급이 가능한가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    물품 구매 후 환급전표를 발행 받으셔야 환급이 가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  여권 없이 환급 전표를 발행할 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 여권이 있어야 환급전표를 발행 가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  한국 여권 소지자인데 환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    국내체류 3개월, 해외 2년 이상 거주한 해외교포만 가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  환급은 공항에서만 가능한가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 시내에서도 환급을 받을 수 있습니다. 단, 의료와 숙박 제외
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  도심환급센터의 위치가 어떻게 되나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>도심환급센터 위치는 아래 경로에서 확인할 수 있습니다.</p>
                  <Link to="/">환급 창구 위치 확인</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>
                  숙박도 도심환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    현재 숙박용역은 롯데호텔 부산점에서만 도심환급을 진행하고
                    있습니다. (2025.02.20 기준)
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>
                  의료도 도심환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    의료용역은 출국항환급, 메일박스환급, 모바일환급만
                    가능합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger>
                  환급 수단에 따라 환급액이 달라지나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 환급 수단에 따라 환급액이 동일합니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger>즉시환급이 무엇인가요?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    즉시환급은 물품만 가능하며, 매장에서 물품 구매 시 물품에
                    포합된 세액상당액을 즉시 차감하여 결제하는 제도입니다.
                  </p>
                  <p>단, 물품 구매 시 반드시 여권을 소지해야 합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger>
                  즉시환급 선별검사대상자가 무엇인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  관세청에서 정한 대상자이며, 즉시환급 선별검사대상자는 즉시환급이 불가합니다. 사후환급을 진행해 주시기 바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-13">
                <AccordionTrigger>
                  물품 중 환급을 받을 수 있는 항목은 무엇인가요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>환급 대상 품목온 아래 경로에서 확인할 수 있습니다.</p>
                  <Link to="/">환급 대상 확인</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-14">
                <AccordionTrigger>
                  현금 결제 후, 현금영수증을 발행했는데 환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  아닙니다. 현금영수증 발행 시, 이중 세금 혜택으로 환급을 받을 수 없습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-15">
                <AccordionTrigger>
                  결제 카드의 명의자와 환급자의 여권명이 일치해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>네, 일치해야 합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-16">
                <AccordionTrigger>
                  호텔 인보이스 예약자명과 환급자 여권명이 일치해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>네, 일치해야 합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-17">
                <AccordionTrigger>
                  환급을 받지 않고 출국했습니다. 환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  네, 가능합니다. 큐브리펀드 대표메일로 환급전표 사진을 보내주시면 확인 후 환급을 도와드리겠습니다.
다만, 물품의 경우 반출확인을 받은 환급전표만 가능하며, 숙박용역 및 의료영역은 법무부에 출국확인 후
환급을 도와드릴 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-18">
                <AccordionTrigger>
                세관에 반출 신고를 하지 않고 출국했습니다. 재입국해서 신고하고 환급받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>불가능합니다.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-19">
                <AccordionTrigger>
                다른 회사의 환급 전표도 도심환급을 받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  도심환급은 큐브리펀드의 환급전표만 가능하며, 타 회사의 환급전표는 출국항에서 환급받을 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-20">
                <AccordionTrigger>
                항만으로 출입국하는 경우 환급받을 수 있나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  네, 가능합니다. 다만, 모바일 환급만 가능합니다. (도심환급 불가)
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-21">
                <AccordionTrigger>
                  외국인 관광객에게 부가세를 왜 환급해주나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  택스리펀드는 외국인 관광객이 물품을 구입 후 소지하고 출국할 경우, 해당 물품이 포함된 세액상당액을 돌려주는 제도로, 대한민국 정부에서 관광을 활성화하기 위한 제도로 운영되고 있습니다.

                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-22">
                <AccordionTrigger>
                신규 가맹 문의는 어떻게 해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  네, 가능합니다. 다만, 출국항(메일박스)환급, 셀프환급(모바일)만 가능합니다. (도심환급 불가)
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-23">
                <AccordionTrigger>
                사업자 정보 변경 시 어떻게 해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                  사업자 정보 변경 시 1:1 문의를 남겨주시거나, 큐브리펀드로 연락주시기 바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="step03">
            {/* 퍼블수정 : 20250519 클랴스 추가 line */}
            <Accordion type="single" collapsible className="accordion-wrap ico-type line">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  신규 가맹 문의는 어떻게 해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    신규 가맹은 1:1 문의를 남겨주시거나, 큐브리펀드로 연락주시기
                    바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  사업자 정보 변경 시 어떻게 해야 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    사업자 정보 변경 시 1:1 문의를 남겨주시거나, 큐브리펀드로
                    연락주시기 바랍니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default InquiriesFaq;
