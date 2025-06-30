import React from "react";
import { Link, useParams } from "react-router-dom";

const Sitemap = () => {
  // 현재 언어 가져오기
  const { lang } = useParams();
  const currentLang = lang && ["ko", "en", "zh", "ja"].includes(lang) ? lang : "ko";

  return (
    <div className="sitemap-wrap">
      <section>
        <div className="hgroup-wrap more-type">
          <p className="f40-700-140">사이트맵</p>
        </div>
      </section>

      <section>
        <div className="sitemap-content">
          <ul className="sitemap-list">
            {/* 가맹 고객 */}
            <li className="sitemap-category">
              <h3 className="category-title">가맹 고객</h3>
              <ul className="category-links">
                <li><Link to={`/${currentLang}/pub/pages/tax-refund/introduction`}>Why CubeRefund?</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/franchise/process`}>가맹 절차 안내</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/franchise/notice`}>가맹점 공지사항</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/franchise/supplies`}>소모품 신청</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/franchise/manual`}>매뉴얼</Link></li>
              </ul>
            </li>

            {/* Tourist */}
            <li className="sitemap-category">
              <h3 className="category-title">Tourist</h3>
              <ul className="category-links">
                <li><Link to={`/${currentLang}/pub/pages/traveler/refund-methods`}>환급 절차 안내</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/traveler/refund-eligibility`}>환급 대상 안내</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/traveler/announcement`}>환급 위치 안내</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/traveler/apply-refund`}>환급 조회 및 신청</Link></li>
              </ul>
            </li>

            {/* Service */}
            <li className="sitemap-category">
              <h3 className="category-title">Service</h3>
              <ul className="category-links">
                <li><Link to={`/${currentLang}/pub/pages/tax-refund/introduction`}>Tax Refund 소개</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/tax-refund/features`}>서비스 특장점</Link></li>
              </ul>
            </li>

            {/* Contact */}
            <li className="sitemap-category">
              <h3 className="category-title">Contact</h3>
              <ul className="category-links">
                <li><Link to={`/${currentLang}/pub/pages/contact/signup-inquiry`}>가맹 및 일반 문의</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/contact/inquiries-faq`}>자주 묻는 질문</Link></li>
              </ul>
            </li>

            {/* Company */}
            <li className="sitemap-category">
              <h3 className="category-title">Company</h3>
              <ul className="category-links">
                <li><Link to={`/${currentLang}/pub/pages/company/greeting`}>인사말</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/company/history`}>연혁</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/company/location`}>오시는 길</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/company/company-notice`}>공지사항</Link></li>
              </ul>
            </li>

            {/* Governance */}
            <li className="sitemap-category">
              <h3 className="category-title">Governance</h3>
              <ul className="category-links">
                <li><Link to={`/${currentLang}/pub/pages/footer/`}>컴플라이언스</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/footer/ethics-guide`}>신문고</Link></li>
                <li><Link to={`/${currentLang}/pub/pages/footer/ethics-realname-report`}>제보하기</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;