import GlobalLayout from '@/components/layout/global-layout';
import IndexPage from '@/pages';
import {NotFound} from '@/pages/not-found';
import {RouteObject} from 'react-router-dom';

// 퍼블
import PubPage from '@/pages/[lang]/pub';

// 퍼블 컴포넌트
import PubHeaderDemo from '@/pages/[lang]/pub/components/layouts/header';
import PubFooterDemo from '@/pages/[lang]/pub/components/layouts/footer';
import Main_layout from '@/pages/[lang]/pub/components/layouts/main_layout';
import Layout from '@/pages/[lang]/pub/components/layouts/set_layout';
import Editor_layout from '@/pages/[lang]/pub/components/layouts/editor_layout';
import Layout_Noinner from '@/pages/[lang]/pub/components/layouts/noinner_layout';
import Font from '@/pages/[lang]/pub/components/common/font';
import Button from '@/pages/[lang]/pub/components/common/button';
import Inputwrap from '@/pages/[lang]/pub/components/common/input';
import Calendarwrap from '@/pages/[lang]/pub/components/common/calendar';
import Radio from '@/pages/[lang]/pub/components/common/radio';
import Checkbox from '@/pages/[lang]/pub/components/common/checkbox';
import Textarea from '@/pages/[lang]/pub/components/common/textarea';
import Tab from '@/pages/[lang]/pub/components/common/tab';
import Table from '@/pages/[lang]/pub/components/common/table';
import AlertDialogwrap from '@/pages/[lang]/pub/components/common/alertdialog';
import { CarouselDemo as Carouselwrap } from '@/pages/[lang]/pub/components/common/carousel';
import { AccordionDemo as Accordionwrap } from '@/pages/[lang]/pub/components/common/accordion';
import TopButton from '@/pages/[lang]/pub/components/common/topbtn';
import QuickMenu from '@/pages/[lang]/pub/components/common/quickmenu';
import Modalwrap from '@/pages/[lang]/pub/components/common/modal';
import Selectwrap from '@/pages/[lang]/pub/components/common/select';
// loading
import Loading from '@/pages/[lang]/pub/components/common/loading';
// main modal
import ModalMain from '@/pages/[lang]/pub/components/common/modal-main';

import FranchiseLocations from "@/pages/[lang]/franchise/locations.tsx";
import FranchiseNotice from "@/pages/[lang]/franchise/notice/index.tsx";
import FranchiseFaq from "@/pages/[lang]/franchise/faq.tsx";
import RefundMethodsPage from "@/pages/[lang]/traveler/refund-methods/refund-methods.tsx"
import SignupInquiryPage from "@/pages/[lang]/contact/signup-inquiry";
import LoginModal from '@/pages/[lang]/pub/pages/franchise/loginmodal';
import Main from '@/pages/[lang]/pub/pages/main/main.jsx';
import Process from '@/pages/[lang]/pub/pages/franchise/process.jsx';
import Faq from '@/pages/[lang]/pub/pages/franchise/faq.jsx';
import Locations from '@/pages/[lang]/pub/pages/franchise/locations.jsx';
import Manual from '@/pages/[lang]/pub/pages/franchise/manual.jsx';
import Notice from '@/pages/[lang]/pub/pages/franchise/notice.jsx';
import NoticeDetails from '@/pages/[lang]/pub/pages/franchise/notice-details.jsx';
import Supplies from '@/pages/[lang]/pub/pages/franchise/supplies.jsx';
// 퍼블 - 환급신청
import ApplyRefund from '@/pages/[lang]/pub/pages/traveler/apply-refund.jsx';
// 퍼블 - 환급대상안내
import RefundEligibility from '@/pages/[lang]/pub/pages/traveler/refund-eligibility.jsx';
// 퍼블 - 환급방식안내
import RefundMethods from '@/pages/[lang]/pub/pages/traveler/refund-methods.jsx';
// 퍼블 - 환급전표조회
import RefundReceipts from '@/pages/[lang]/pub/pages/traveler/refund-receipts.jsx';
// 퍼블 - 환급창구
import Announcement from '@/pages/[lang]/pub/pages/traveler/announcement.jsx';
// 퍼블 - 자주 묻는 질문
import InquiriesFaq from '@/pages/[lang]/pub/pages/contact/inquiries-faq.jsx';
// 퍼블 - 가입신청 및 문의
import SignupInquiry from '@/pages/[lang]/pub/pages/contact/signup-inquiry.jsx';
// 퍼블 - Tax Refund 소개
import Introduction from '@/pages/[lang]/pub/pages/tax-refund/introduction.jsx';
import Features from '@/pages/[lang]/pub/pages/tax-refund/features.jsx';
import Greeting from '@/pages/[lang]/pub/pages/company/greeting.jsx';
import History from '@/pages/[lang]/pub/pages/company/history.jsx';
import Location from '@/pages/[lang]/pub/pages/company/location.jsx';
import CompanyNotice from '@/pages/[lang]/pub/pages/company/company-notice.jsx';
import CompanyNoticeDetails from '@/pages/[lang]/pub/pages/company/company-notice-details.jsx';
import TermsOfService from '@/pages/[lang]/pub/pages/footer/terms-of-service.jsx';
import Template from '@/pages/[lang]/pub/template/template';
// nodata-case  
import NodataCase from '@/pages/[lang]/pub/components/layouts/nodata-case.tsx';

// footer
import Sitemap from '@/pages/[lang]/pub/pages/footer/sitemap.jsx';
import CctvPolicy from '@/pages/[lang]/pub/pages/footer/cctv-policy.jsx';
import EmailCollectionRefusal from '@/pages/[lang]/pub/pages/footer/email-collection-refusal.jsx';
import EthicsGuide from '@/pages/[lang]/pub/pages/footer/ethics-guide.jsx';
import FairTrade from '@/pages/[lang]/pub/pages/footer/fair-trade.jsx';
import LegalNotice from '@/pages/[lang]/pub/pages/footer/legal-notice.jsx';
// 퍼블 - 개인정보처리방침
import PrivacyPolicy from '@/pages/[lang]/pub/pages/footer/privacy-policy.jsx';
import  AnnouncementPage from '@/pages/[lang]/traveler/announcement.tsx';

import SitemapPage from "@/pages/[lang]/footer/sitemap.tsx";
// 퍼블 - 윤리경영 > 이용앤내 > 신문고
import EthicsNewspaperPage from "@/pages/[lang]/pub/pages/footer/ethics-newspaper.jsx";
// 퍼블 - 윤리경영 > 이용앤내 > 익명제보
import EthicsAnonymousReportPage from "@/pages/[lang]/pub/pages/footer/ethics-anonymous-report.jsx";
// 퍼블 - 윤리경영 > 이용앤내 > 실명제보
import EthicsRealnameReportPage from "@/pages/[lang]/pub/pages/footer/ethics-realname-report.jsx";
// 퍼블 - 윤리경영 > 이용앤내 > 처리결과
import EthicsResultsPage from "@/pages/[lang]/pub/pages/footer/ethics-results.jsx";


import FranchiseNoticDetailPage from "@/pages/[lang]/franchise/notice/detail.tsx";
// import RefundReceiptPage from "@/pages/[lang]/traveler/refund-receipts";
import CompanyNoticePage from "@/pages/[lang]/company/notice";
import CompanyNoticeDetailPage from "@/pages/[lang]/company/notice/detail.tsx";
// import CompanyBoardPage from "@/pages/[lang]/company/company-notice.tsx";
import FooterTermPage from "@/pages/[lang]/footer/footer-term.tsx";
import FairTradePage from "@/pages/[lang]/footer/fair-trade.tsx"
// import SitemapPage from "@/pages/[lang]/footer/sitemap.tsx";
import EthicsGuidePage from "@/pages/[lang]/footer/ethics-guide";
import GreetingPage from "@/pages/[lang]/company/greeting.tsx";
import HistoryPage from "@/pages/[lang]/company/company-history.tsx";
import LocationPage from "@/pages/[lang]/company/location.tsx";
// import ProcessPage from "@/pages/[lang]/franchise/process.tsx";
import ManualPage from "@/pages/[lang]/franchise/manual.jsx";
import SuppliesPage from "@/pages/[lang]/franchise/supplies.tsx";
import RefundEligibilityPage from "@/pages/[lang]/traveler/refund-eligibility.tsx";
import InquiriesFaqPage from "@/pages/[lang]/contact/inquiries-faq.tsx";
import TaxRefundIntroductionPage from "@/pages/[lang]/tax-refund/introduction.tsx";
import ProcessPage from "@/pages/[lang]/franchise/process.tsx";
import PrivacyPolicyPage from "@/pages/[lang]/footer/privacy-policy.tsx";
import MainHomePage from '@/pages/[lang]/main/main.jsx';
import FeaturesPage from "@/pages/[lang]/tax-refund/features.tsx";
import CombinedRefundPage from "@/pages/[lang]/traveler/apply-refund/index.tsx";
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '',
        element: <IndexPage />,
      },
      {
        path: ':lang',
        element: (
          // <ProtectedRoute>
            <Main_layout />
          // </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <MainHomePage />
          },
          {
            path: 'pub/pages/main/main',
            element: <Main />
          },
        ],
      },
      {
        path: ':lang',
        element: (
          // <ProtectedRoute>
            <Layout_Noinner />
          // </ProtectedRoute>
        ),
        children: [
          {
            path: 'pub/pages/traveler/refund-methods',
            element: <RefundMethods />
          },
          {
            path: 'franchise',
            children: [
              {
                path: 'process',
                element: <ProcessPage />
              },
            ],
          },
          {
            path: 'traveler',
            children: [
              {
                path: 'refund-methods',
                // element: <RefundMethodsPage />
                element: <RefundMethodsPage />
              },
              {
                path: 'refund-eligibility',
                element: <RefundEligibilityPage />
              },
              {
                path: 'announcement',
                // element: <RefundReceiptPage />
                element: <AnnouncementPage />
              },
            ],
          },
          {
            path: 'contact',
            children: [
              {
                path: 'faq',
                element: <InquiriesFaqPage />
              },
            ]
          },
          {
            path: 'company',
            children: [
              {
                path: 'history',
                element: <HistoryPage />
              },
            ]
          },
        ],
      },
      {
        path: ':lang',
        element: (
          // <ProtectedRoute>
            <Layout />
          // </ProtectedRoute>
        ),
        children: [
          {
            path: 'pub',
            element: <PubPage />
          },
          {
            path: 'pub/components/layouts/header',
            element: <PubHeaderDemo />
          },
          {
            path: 'pub/components/layouts/footer',
            element: <PubFooterDemo />
          },
          {
            path: 'pub/components/layouts/layout',
            element: <Layout />
          },
          {
            path: 'pub/components/layouts/template',
            element: <Template />
          },
          {
            path: 'pub/components/common/font',
            element: <Font />
          },
          {
            path: 'pub/components/common/button',
            element: <Button />
          },
          {
            path: 'pub/components/common/input',
            element: <Inputwrap />
          },
          {
            path: 'pub/components/common/calendar',
            element: <Calendarwrap />
          },
          {
            path: 'pub/components/common/select',
            element: <Selectwrap />
          },
          {
            path: 'pub/components/common/radio',
            element: <Radio />
          },
          {
            path: 'pub/components/common/checkbox',
            element: <Checkbox />
          },
          {
            path: 'pub/components/common/textarea',
            element: <Textarea />
          },
          {
            path: 'pub/components/common/tab',
            element: <Tab />
          },
          {
            path: 'pub/components/common/table',
            element: <Table 
              currentPage={1}
              totalPages={10}
              onPageChange={(page) => console.log('Page changed:', page)}
            />
          },
          {
            path: 'pub/components/common/alertdialog',
            element: <AlertDialogwrap />
          },
          {
            path: 'pub/components/common/carousel',
            element: <Carouselwrap />
          },
          {
            path: 'pub/components/common/accordion',
            element: <Accordionwrap />
          },
          {
            path: 'pub/components/common/loading',
            element: <Loading />
          },
          {
            path: 'pub/components/common/quickmenu',
            element: <QuickMenu />
          },
          {
            path: 'pub/components/common/topbtn',
            element: <TopButton />
          },
          {
            path: 'pub/components/common/modal',
            element: <Modalwrap />
          },
          {
            path: 'pub/components/common/modal-main',
            element: <ModalMain />
          },
          {
            path: 'pub/pages/franchise/process',
            element: <Process />
          },
          {
            path: 'pub/pages/franchise/loginmodal',
            element: <LoginModal />
          },
          {
            path: 'pub/pages/franchise',
            element: <Faq />
          },
          {
            path: 'pub/pages/franchise/locations',
            element: <Locations />
          },
          {
            path: 'pub/pages/franchise/manual',
            element: <Manual />
          },
          {
            path: 'pub/pages/franchise/notice',
            element: <Notice />
          },
          {
            path: 'pub/pages/franchise/notice-details',
            element: <NoticeDetails />
          },
          {
            path: 'pub/pages/franchise/supplies',
            element: <Supplies />
          },
          {
            path: 'pub/pages/traveler/apply-refund',
            element: <ApplyRefund />
          },
          {
            path: 'pub/pages/traveler/refund-eligibility',
            element: <RefundEligibility />
          },
          {
            path: 'pub/pages/traveler/refund-receipts',
            element: <RefundReceipts />
          },
          {
            path: 'pub/pages/traveler/announcement',
            element: <Announcement />
          },
          {
            path: 'pub/pages/contact/inquiries-faq',
            element: <InquiriesFaq />
          },
          {
            path: 'pub/pages/contact/signup-inquiry',
            element: <SignupInquiry />
          },
          {
            path: 'pub/pages/tax-refund/introduction',
            element: <Introduction />
          },
          {
            path: 'pub/pages/tax-refund/features',
            element: <Features />
          },
          {
            path: 'pub/pages/company/greeting',
            element: <Greeting />
          },
          {
            path: 'pub/pages/company/history',
            element: <History />
          },
          {
            path: 'pub/pages/company/location',
            element: <Location />
          },
          {
            path: 'pub/pages/company/company-notice',
            element: <CompanyNotice />
          },
          {
            path: 'pub/pages/company/company-notice-details',
            element: <CompanyNoticeDetails />
          },
          {
            path: 'pub/pages/footer/sitemap',
            element: <Sitemap />
          },
          {
            path: 'pub/pages/footer/privacy-policy',
            element: <PrivacyPolicy />
          },
          {
            path: 'pub/pages/footer/ethics-guide',
            element: <EthicsGuide />
          },
          {
            path: 'pub/pages/footer/ethics-newspaper',
            element: <EthicsNewspaperPage />
          },
          {
            path: 'pub/pages/footer/ethics-anonymous-report',
            element: <EthicsAnonymousReportPage />
          },
          {
            path: 'pub/pages/footer/ethics-realname-report',
            element: <EthicsRealnameReportPage />
          },
          {
            path: 'pub/pages/footer/ethics-results',
            element: <EthicsResultsPage />
          },
          {
            path: 'pub/pages/footer/fair-trade',
            element: <FairTrade />
          },
          {
            path: 'pub/components/layouts/nodata-case',
            element: <NodataCase />
          },
          {
            path: 'oauth',
            element: <div>OAuth 컴포넌트</div>
          },
          {
            path: 'modal',
            element: <div>Modal 컴포넌트</div>
          },
          {
            path: 'common',
            element: <div>Common 컴포넌트</div>
          },
          // {
          //   path: '',
          //   element: <MainPage/>
          // },
          {
            path: 'franchise',
            children: [
              // {
              //   path: 'process',
              //   element: <ProcessPage />
              // },
              {
                path: 'locations',
                element: <FranchiseLocations />
              },
              {
                path: 'notice',
                children: [
                  {
                    path: "",
                    element: <FranchiseNotice/>,
                  },
                  {
                    path: ":id",
                    element: <FranchiseNoticDetailPage/>,
                  },
                ],
              },
              {
                path: 'supplies',
                element: <SuppliesPage />
              },
              {
                path: 'manual',
                element: <ManualPage />
              },
              {
                path: 'faq',
                element: <FranchiseFaq />
              },
            ]

          },
          {
            path: 'traveler',
            children: [
              // {
              //   path: 'refund-eligibility',
              //   element: <RefundEligibilityPage />
              // },
              // {
              //   path: 'refund-methods',
              //   // element: <RefundMethodsPage />
              //   element: <RefundMethodsPage />
              // },
/*              {
                path: 'refund-receipts',
                // element: <RefundReceiptPage />
                element: <RefundReceiptsPage />
              },*/
              // {
              //   path: 'announcement',
              //   // element: <RefundReceiptPage />
              //   element: <AnnouncementPage />
              // },
              {
                path: 'apply-refund',
                children: [
                  {
                    path: "",
                    element: <CombinedRefundPage/>,
                  }
                ],
              },
            ]
          },
          {
            path: 'contact',
            children: [
              {
                path: 'signup-inquiry',
                element: <SignupInquiryPage />
              },
              // {
              //   path: 'faq',
              //   element: <InquiriesFaqPage />
              // },
            ]
          },
          {
            path: 'tax-refund',
            children: [
              {
                path: 'introduction',
                element: <TaxRefundIntroductionPage />
              },
              {
                path: 'features',
                element: <FeaturesPage />
              }
            ]
          },
          {
            path: 'company',
            children: [
              {
                path: 'greeting',
                element: <GreetingPage />
              },
              // {
              //   path: 'history',
              //   element: <HistoryPage />
              // },
              {
                path: 'location',
                element: <LocationPage />
              },
              {
                path: 'notice',
                children: [
                  {
                    path: "",
                    element: <CompanyNoticePage/>,
                    // element: <CompanyBoardPage/>,
                  },
                  {
                    path: ":id",
                    element: <CompanyNoticeDetailPage/>,
                    // element: <CompanyNoticeDetailsPage/>,
                  },
                ],
              },
            ]
          },
          {
            path: 'footer',
            children: [
              {
                path: 'term/:termType',
                element: <FooterTermPage/>
              },
              {
                path: 'PRIVACY_POLICY',
                element: <PrivacyPolicyPage/>
              },
              {
                path: 'sitemap',
                // element: <SitemapPage/>
                element: <SitemapPage/>
              },
              {
                path: 'ethics-guide',
                element: <EthicsGuidePage/>
              },
              {
                path: 'fair-trade',
                element: <FairTradePage/>
              }
            ]
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
      {
        path: ':lang',
        element: (
          // <ProtectedRoute>
            <Editor_layout />
          // </ProtectedRoute>
        ),
        children: [
          {
            path: 'pub',
            element: <PubPage />
          },
          
          {
            path: 'pub/pages/footer/terms-of-service',
            element: <TermsOfService />
          },
          {
            path: 'pub/pages/footer/legal-notice',
            element: <LegalNotice />
          },
          {
            path: 'pub/pages/footer/email-collection-refusal',
            element: <EmailCollectionRefusal />
          },
          {
            path: 'pub/pages/footer/cctv-policy',
            element: <CctvPolicy />
          },
          
          
        ],
      },
    ],
  },
  {
    path: '*',  // 모든 매칭되지 않는 경로를 잡음
    element: <NotFound />
  }
];