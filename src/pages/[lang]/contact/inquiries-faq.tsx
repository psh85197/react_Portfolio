import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.js";
import {Link, useParams} from "react-router-dom";
import {TranslationDTO} from "@/types/translation.ts"; // TranslationDTO 경로가 올바른지 확인해주세요.
import {useTranslation} from "react-i18next";

// FAQ 항목의 타입을 정의합니다.
interface FaqItem {
  id: string;
  category: 'all' | 'taxRefund' | 'membership'; // 탭 카테고리
  questionKey: string; // 질문 텍스트 또는 i18n 번역 키
  // 답변 내용을 ReactNode로 직접 넣거나, t와 currentLang을 받아 ReactNode를 반환하는 함수 형태
  answer: React.ReactNode | ((t: (key: string) => string, currentLang?: string) => React.ReactNode);
}

// FAQ 질문 데이터를 배열로 정의합니다.
// 모든 질문/답변은 가능한 한 i18n 키를 사용하거나,
// 그렇지 않을 경우 직접 문자열을 입력하며 t와 currentLang 인자를 사용하지 않도록 합니다.
const faqData: FaqItem[] = [
  {
    id: "item-1",
    category: "taxRefund", // "전체" 탭에 표시됨
    questionKey: "faq.question1", // t("faq.q2Title")로 번역될 질문
    answer: (t, currentLang) => (
      <>
        <p>{t("faq.answer1-1")}</p>
        <Link to={`/${currentLang}/traveler/refund-eligibility`}>{t("faq.answer1-2")}</Link> {/* 번역 키 사용 예시 */}
      </>
    )
  },
  {
    id: "item-2",
    category: "taxRefund", // "환급" 탭과 "전체" 탭에 표시됨
    questionKey: "faq.question2", // i18n 키가 아니므로 직접 문자열 사용
    answer: (t) => ( // t, currentLang 인자가 필요 없으므로 생략 (또는 정의하되 사용하지 않음)
      <p>{t("faq.answer2-1")}</p>
    )
  },
  {
    id: "item-3",
    category: "taxRefund",
    questionKey: "faq.question3",
    answer: (t) => (
      <p>{t("faq.answer3-1")}</p>
    )
  },
  {
    id: "item-4",
    category: "taxRefund",
    questionKey: "faq.question4",
    answer: (t) => (
      <p>{t("faq.answer4-1")}</p>
    )
  },
  {
    id: "item-5",
    category: "taxRefund",
    questionKey: "faq.question5",
    answer: (t, currentLang) => (
      <>
        <p>{t("faq.answer5-1")}</p>
        <p>{t("faq.answer5-2")}</p>
        <Link to={`/${currentLang}/traveler/refund-methods`}>{t("faq.answer5-3")}</Link>
      </>
    )
  },
  {
    id: "item-6",
    category: "taxRefund",
    questionKey: "faq.question6",
    answer: (t) => (
      <>
        <p>{t("faq.answer6-1")}</p>
        <p>{t("faq.answer6-2")}</p>
      </>
    )
  },
  {
    id: "item-7",
    category: "taxRefund",
    questionKey: "faq.question7",
    answer: (t) => (
      <>
        <p>{t("faq.answer7-1")}</p>
      </>
    )
  },
  {
    id: "item-8",
    category: "taxRefund",
    questionKey: "faq.question8",
    answer: (t) => (
        <>
          <p>{t("faq.answer8-1")}</p>
          <p>{t("faq.answer8-2")}</p>
        </>
    )
  },
  {
    id: "item-9",
    category: "taxRefund",
    questionKey: "faq.question9",
    answer: (t) => (
      <p>{t("faq.answer9-1")}</p>
    )
  },
  {
    id: "item-10",
    category: "taxRefund",
    questionKey: "faq.question10",
    answer: (t) => (
      <p>{t("faq.answer10-1")}</p>
    )
  },
  {
    id: "item-11",
    category: "membership",
    questionKey: "faq.question11",
    answer: (t) => (
      <>
      <p>{t("faq.answer11-1")}</p>
      </>

    )
  },
  {
    id: "item-12",
    category: "membership",
    questionKey: "faq.question12",
    answer: (t) => (
      <p>{t("faq.answer12-1")}</p>
    )
  },
  {
    id: "item-13",
    category: "membership",
    questionKey: "faq.question13",
    // answer: (t, currentLang) => (
    answer: (t) => (
      <>
        <p>{t("faq.answer13-1")}</p>
      </>
    )
  },
  {
    id: "item-14",
    category: "membership",
    questionKey: "faq.question14",
    answer: (t) => (
      <p>{t("faq.answer14-1")}</p>
    )
  },
  {
    id: "item-15",
    category: "membership",
    questionKey: "faq.question15",
    answer: (t) => (
      <p>{t("faq.answer15-1")}</p>
    )
  },
  {
    id: "item-16",
    category: "membership",
    questionKey: "faq.question16",
    answer: (t) => (
        <>
          <p>{t("faq.answer16-1")}</p>
          <p>{t("faq.answer16-2")}</p>
        </>
    )
  },
  {
    id: "item-17",
    category: "membership",
    questionKey: "faq.question17",
    answer: (t) => (
      <>
        <p>{t("faq.answer17-1")}</p>
        <p>{t("faq.answer17-2")}</p>
      </>
    )
  },
  {
    id: "item-18",
    category: "membership",
    questionKey: "faq.question18",
    answer: (t) => (
      <p>{t("faq.answer18-1")}</p>
    )
  },
];


const InquiriesFaqPage:React.FC = () => {
  const { lang } = useParams<{ lang: keyof TranslationDTO }>();
  // URL에서 언어 매개변수를 가져와 유효성을 검사합니다.
  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";
  // useTranslation 훅을 사용하여 번역 함수를 가져옵니다.
  const { t } = useTranslation();

  // 특정 카테고리에 해당하는 FAQ 항목들을 렌더링하는 헬퍼 함수
  const renderAccordionItems = (category: FaqItem['category']) => {
    // 'all' 카테고리인 경우 모든 FAQ를 반환하고, 아니면 해당 카테고리에 맞는 FAQ만 필터링합니다.
    const filteredFaqs = category === 'all'
      ? faqData
      : faqData.filter(item => item.category === category || item.category === 'all'); // 'all'은 항상 포함되어야 함

    // 각 FAQ 항목을 AccordionItem으로 맵핑하여 렌더링합니다.
    return filteredFaqs.map((item) => (
      <AccordionItem value={item.id} key={item.id}>
        <AccordionTrigger>
          {/* questionKey가 "faq."로 시작하면 t()를 사용하고, 아니면 직접 문자열을 렌더링합니다. */}
          {item.questionKey.startsWith("faq.") ? t(item.questionKey) : item.questionKey}
        </AccordionTrigger>
        <AccordionContent>
          {/* answer가 함수 타입이면 호출하여 내용을 렌더링하고, 아니면 직접 렌더링합니다. */}
          {typeof item.answer === 'function' ? item.answer(t, currentLang) : item.answer}
        </AccordionContent>
      </AccordionItem>
    ));
  };

  return (
    <div className="inquiries-faq-wrap">
      <section>
      <div className="inner type02">
        <div className="hgroup-wrap">
          {/* 페이지 제목을 번역합니다. */}
          <h2 className="f48-700-140">{t("faq.pageTitle")}</h2>
        </div>
        </div>
      </section>
      <section>
        {/* Tabs 컴포넌트의 defaultValue와 Trigger/Content의 value를 의미 있는 이름으로 변경합니다. */}
        <Tabs defaultValue="all" className="tab-wrap type02">
          <TabsList>
          <div className="inner type04 flex-type">
            <TabsTrigger value="all">{t("faq.all")}</TabsTrigger>
            <TabsTrigger value="taxRefund">{t("faq.taxRefund")}</TabsTrigger>
            <TabsTrigger value="membership">{t("faq.membership")}</TabsTrigger>
            </div>
          </TabsList>

          {/* "전체" 탭 콘텐츠: 모든 FAQ를 렌더링합니다. */}
          <TabsContent value="all">
          <div className="inner type02">
            <Accordion type="single" collapsible className="accordion-wrap ico-type line">
              {renderAccordionItems("all")}
            </Accordion>
            </div>
          </TabsContent>

          {/* "환급" 탭 콘텐츠: 환급 관련 FAQ만 렌더링합니다. */}
          <TabsContent value="taxRefund">
          <div className="inner type02">
            <Accordion type="single" collapsible className="accordion-wrap ico-type line">
              {renderAccordionItems("taxRefund")}
            </Accordion>
            </div>
          </TabsContent>

          {/* "가맹" 탭 콘텐츠: 가맹 관련 FAQ만 렌더링합니다. */}
          <TabsContent value="membership">
          <div className="inner type02">
            <Accordion type="single" collapsible className="accordion-wrap ico-type line">
              {renderAccordionItems("membership")}
            </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default InquiriesFaqPage;