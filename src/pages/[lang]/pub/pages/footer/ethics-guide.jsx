import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EthicsNewspaperPage from "@/pages/[lang]/pub/pages/footer/ethics-newspaper";
import EthicsAnonymousReportPage from "@/pages/[lang]/pub/pages/footer/ethics-anonymous-report";
import EthicsRealnameReportPage from "@/pages/[lang]/pub/pages/footer/ethics-realname-report";
import EthicsResultsPage from "@/pages/[lang]/pub/pages/footer/ethics-results";
const EthicsGuide = () => {
  return (
    <>
      
      <section className="signup-inquiry-wrap">
        <div className="hgroup-wrap">
          {/* 퍼블수정 : 20250519 문구 수정 */}
          <p className="f48-700-140 sub">신문고</p>
        </div>
        <div className="component-group">
            <div className="from-group">
              <Tabs defaultValue="step01" className="tab-wrap">
                <TabsList>
                  <TabsTrigger value="step01">이용안내</TabsTrigger>
                  <TabsTrigger value="step02">제보하기</TabsTrigger>
                  <TabsTrigger value="step03">처리결과 확인</TabsTrigger>
                </TabsList>
                <TabsContent value="step01">
                <EthicsNewspaperPage />
                </TabsContent>
                <TabsContent value="step02">
                  <Tabs defaultValue="step01" className="tab-wrap type01">
                    <TabsList>
                      <TabsTrigger value="step01">익명 제보</TabsTrigger>
                      <TabsTrigger value="step02">실명 제보</TabsTrigger>
                    </TabsList>
                    <TabsContent value="step01">
                    <EthicsAnonymousReportPage />
                    </TabsContent>
                    <TabsContent value="step02">
                    <EthicsRealnameReportPage />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                <TabsContent value="step03">
                  <EthicsResultsPage />
                </TabsContent>
              </Tabs>
            </div>
          </div>
      </section>
    </>
  );
};

export default EthicsGuide;
