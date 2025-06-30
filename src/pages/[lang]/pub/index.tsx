import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

interface PageItem {
  id: number;
  name: string;
  path: string;
  description: string;
  lastModified: string;
}

interface ComponentItem {
  name: string;
  path: string;
  description: string;
  category: string;
}

const pages: PageItem[] = [
  {
    id: 0,
    name: "Template",
    path: "/ko/pub/components/layouts/template",
    description: "Template 컴포넌트",
    lastModified: "2024-04-07"
  },
  {
    id: 0,
    name: "Header",
    path: "/ko/pub/components/layouts/header",
    description: "Header 컴포넌트",
    lastModified: "2024-04-07"
  },
  {
    id: 1,
    name: "Footer",
    path: "/ko/pub/components/layouts/footer",
    description: "Footer 컴포넌트",
    lastModified: "2024-04-07"
  },
  {
    id: 2,
    name: "SampleLayout",
    path: "/ko/pub/components/layouts/samplelayout",
    description: "SampleLayout",
    lastModified: "2024-04-07"
  },
  {
    id: 2,
    name: "Main",
    path: "/ko/pub/pages/main/main",
    description: "메인 페이지",
    lastModified: "2024-04-07"
  },
  {
    id: 2,
    name: "LoginModal",
    path: "/ko/pub/pages/franchise/loginmodal",
    description: "가맹점 > 로그인 모달",
    lastModified: "2024-04-07"
  },
  {
    id: 3,
    name: "Locations",
    path: "/ko/pub/pages/franchise/locations",
    description: "가맹점 > 가맹점 고객",
    lastModified: "2024-04-07"
  },
  {
    id: 3,
    name: "Process",
    path: "/ko/pub/pages/franchise/process",
    description: "가맹점 > 가맹 절차 안내",
    lastModified: "2024-04-07"
  },
  {
    id: 6,
    name: "Manual",
    path: "/ko/pub/pages/franchise/manual",
    description: "가맹점 > 매뉴얼",
    lastModified: "2024-04-07"
  },
  {
    id: 7,
    name: "Notice",
    path: "/ko/pub/pages/franchise/notice",
    description: "가맹점 > 가맹점 공지사항",
    lastModified: "2024-04-07"
  },
  {
    id: 8,
    name: "NoticeDetails",
    path: "/ko/pub/pages/franchise/notice-details",
    description: "가맹점 > 가맹점 공지사항 상세",
    lastModified: "2024-04-07"
  },
  {
    id: 8,
    name: "Supplies",
    path: "/ko/pub/pages/franchise/supplies",
    description: "가맹점 > 소모품 신청",
    lastModified: "2024-04-07"
  },
  {
    id: 9,
    name: "ApplyRefund",
    path: "/ko/pub/pages/traveler/apply-refund",
    description: "여행객 > 환급 신청",
    lastModified: "2024-04-07"
  },
  {
    id: 10,
    name: "RefundEligibility",
    path: "/ko/pub/pages/traveler/refund-eligibility",
    description: "여행객 > 환급 대상 안내",
    lastModified: "2024-04-07"
  },
  {
    id: 11,
    name: "RefundMethods",
    path: "/ko/pub/pages/traveler/refund-methods",
    description: "여행객 > 환급 절차 안내",
    lastModified: "2024-04-07"
  },
  {
    id: 12,
    name: "RefundReceipts",
    path: "/ko/pub/pages/traveler/refund-receipts",
    description: "여행객 > 환급 전표 조회",
    lastModified: "2024-04-07"
  },
  {
    id: 13,
    name: "Announcement",
    path: "/ko/pub/pages/traveler/announcement",
    description: "여행객 > 환급창구",
    lastModified: "2024-04-07"
  },
  {
    id: 13,
    name: "InquiriesFaq",
    path: "/ko/pub/pages/contact/inquiries-faq",
    description: "문의 > 자주 묻는 질문",
    lastModified: "2024-04-07"
  },
  {
    id: 14,
    name: "SignupInquiry",
    path: "/ko/pub/pages/contact/signup-inquiry",
    description: "문의 > 가입 신청 및 문의",
    lastModified: "2024-04-07"
  },
  {
    id: 15,
    name: "Introduction",
    path: "/ko/pub/pages/tax-refund/introduction",
    description: "Tax Refund 서비스안내 > Tax Refund 소개",
    lastModified: "2024-04-07"
  },
  {
    id: 16,
    name: "Features",
    path: "/ko/pub/pages/tax-refund/features",
    description: "Tax Refund 서비스안내 > Tax Refund 특장점",
    lastModified: "2024-04-07"
  },
  {
    id: 16,
    name: "Greeting",
    path: "/ko/pub/pages/company/greeting",
    description: "company > 인사말",
    lastModified: "2024-04-07"
  },
  {
    id: 17,
    name: "History",
    path: "/ko/pub/pages/company/history",
    description: "company > 연혁",
    lastModified: "2024-04-07"
  },
  {
    id: 18,
    name: "Location",
    path: "/ko/pub/pages/company/location",
    description: "company > 오시는 길",
    lastModified: "2024-04-07"
  },
  {
    id: 19,
    name: "CompanyNotice",
    path: "/ko/pub/pages/company/company-notice",
    description: "company > 공지사항",
    lastModified: "2024-04-07"
  },
  {
    id: 20,
    name: "CompanyNoticeDetails",
    path: "/ko/pub/pages/company/company-notice-details",
    description: "company > 공지사항 상세",
    lastModified: "2024-04-07"
  },
  {
    id: 20,
    name: "Sitemap",
    path: "/ko/pub/pages/footer/sitemap",
    description: "footer > 사이트맵",
    lastModified: "2024-04-07"
  },
  {
    id: 21,
    name: "CctvPolicy",
    path: "/ko/pub/pages/footer/cctv-policy",
    description: "footer > 영상정보처리기기 운영 지침",
    lastModified: "2024-04-07"
  },
  {
    id: 22,
    name: "EmailCollectionRefusal",
    path: "/ko/pub/pages/footer/email-collection-refusal",
    description: "footer > 이메일무단수집거부",
    lastModified: "2024-04-07"
  },
  {
    id: 23,
    name: "EthicsGuide",
    path: "/ko/pub/pages/footer/ethics-guide",
    description: "footer > 윤리경영 > 이용안내, 제보하기, 처리결과확인인",
    lastModified: "2024-04-07"
  },
  {
    id: 25,
    name: "FairTrade",
    path: "/ko/pub/pages/footer/fair-trade",
    description: "footer > 공정거래",
    lastModified: "2024-04-07"
  },
  {
    id: 26,
    name: "LegalNotice",
    path: "/ko/pub/pages/footer/legal-notice",
    description: "footer > 법적고지",
    lastModified: "2024-04-07"
  },
  {
    id: 27,
    name: "PrivacyPolicy",
    path: "/ko/pub/pages/footer/privacy-policy",
    description: "footer > 개인정보처리방침",
    lastModified: "2024-04-07"
  },
  {
    id: 28,
    name: "TermsOfService",
    path: "/ko/pub/pages/footer/terms-of-service",
    description: "footer > 이용약관",
    lastModified: "2024-04-07"
  },
  {
    id: 29,
    name: "EmailKo",
    path: "/ko/pub/pages/email/email_ko",
    description: "이메일 폼 국문",
    lastModified: "2024-04-07"
  }
  ,
  {
    id: 30,
    name: "EmailEn",
    path: "/ko/pub/pages/email/email_en",
    description: "이메일 폼 영문",
    lastModified: "2024-04-07"
  },
  {
    id: 31,
    name: "EmailQr",
    path: "/ko/pub/pages/email/email_qr",
    description: "이메일 폼 qr",
    lastModified: "2024-04-07"
  },
  {
    id: 32,
    name: "NodataCase",
    path: "/ko/pub/components/layouts/nodata-case",
    description: "노데이터 케이스",
    lastModified: "2024-04-07"
  }
];

const components: ComponentItem[] = [
  {
    name: "Font",
    path: "/ko/pub/components/common/font",
    description: "폰트 컴포넌트",
    category: "common"
  },
  {
    name: "Button",
    path: "/ko/pub/components/common/button",
    description: "버튼 컴포넌트",
    category: "common"
  },
  {
    name: "Input",
    path: "/ko/pub/components/common/input",
    description: "입력 컴포넌트",
    category: "common"
  },
  {
    name: "Calendar",
    path: "/ko/pub/components/common/calendar",
    description: "캘린더 컴포넌트",
    category: "common"
  },
  {
    name: "Select",
    path: "/ko/pub/components/common/select",
    description: "셀렉트 컴포넌트",
    category: "common"
  },
  {
    name: "Radio",
    path: "/ko/pub/components/common/radio",
    description: "라디오 컴포넌트",
    category: "common"
  },
  {
    name: "Checkbox",
    path: "/ko/pub/components/common/checkbox",
    description: "체크박스 컴포넌트",
    category: "common"
  },
  {
    name: "Textarea",
    path: "/ko/pub/components/common/textarea",
    description: "텍스트영역 컴포넌트",
    category: "common"
  },
  {
    name: "Tab",
    path: "/ko/pub/components/common/tab",
    description: "탭 컴포넌트",
    category: "common"
  },
  {
    name: "Table",
    path: "/ko/pub/components/common/table",
    description: "테이블 컴포넌트",
    category: "common"
  },
  {
    name: "AlertDialog",
    path: "/ko/pub/components/common/alertdialog",
    description: "알림 다이얼로그 컴포넌트",
    category: "common"
  },
  {
    name: "Carousel",
    path: "/ko/pub/components/common/carousel",
    description: "캐러셀 컴포넌트",
    category: "common"
  },
  {
    name: "Accordion",
    path: "/ko/pub/components/common/accordion",
    description: "아코디언 컴포넌트",
    category: "common"
  },
  {
    name: "Modal",
    path: "/ko/pub/components/common/modal",
    description: "모달 컴포넌트",
    category: "common"
  },
  {
    name: "Modal-main",
    path: "/ko/pub/components/common/modal-main",
    description: "메인 모달 컴포넌트",
    category: "common"
  },
  {
    name: "Loading",
    path: "/ko/pub/components/common/loading",
    description: "로딩 컴포넌트",
    category: "common"
  }
];

const PubPage: FC = () => {
  const navigate = useNavigate();
  const [showComponentList, setShowComponentList] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">퍼블리싱 목록</h1>
        <Button 
          variant="outline"
          onClick={() => setShowComponentList(!showComponentList)}
          className="ml-4"
        >
          {showComponentList ? '페이지 목록 보기' : '전체 컴포넌트 보기'}
        </Button>
      </div>

      {/* 페이지 목록 */}
      {!showComponentList && (
        <div className="border rounded-lg overflow-hidden pub-list-wrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">페이지명</TableHead>
                <TableHead>설명</TableHead>
                <TableHead className="w-[150px]">최종 수정일</TableHead>
                <TableHead className="w-[100px] text-right">보기</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow 
                  key={page.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => navigate(page.path)}
                >
                  <TableCell className="font-medium">{page.name}</TableCell>
                  <TableCell>{page.description}</TableCell>
                  <TableCell>{page.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 컴포넌트 목록 */}
      {showComponentList && (
        <div className="grid gap-8 components-wrap">

          {/* Common */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">components</h2>
            <div className="grid gap-4">
              {components
                .filter(comp => comp.category === 'common')
                .map((comp) => (
                  <div
                    key={comp.path}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{comp.name}</h3>
                      <p className="text-sm text-muted-foreground">{comp.description}</p>
                    </div>
                    <Button variant="outline" onClick={() => navigate(comp.path)}>
                      보기
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PubPage;
