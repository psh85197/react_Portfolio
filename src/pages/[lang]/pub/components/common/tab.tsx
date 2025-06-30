import { FC } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import "@/assets/scss/style.scss";

const Tabwrap: FC = () => {
  return (
    <div className="component-wrap">
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Tabs</h2>
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
              <div className="temp-bx">test</div>
            </TabsContent>
            <TabsContent value="step02">
              <div className="temp-bx">test</div>
            </TabsContent>
            <TabsContent value="step03">test</TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="component-group">
        <div className="from-group">
          <Tabs defaultValue="step01" className="tab-wrap type01">
            <TabsList>
              <TabsTrigger value="step01">익명 제보</TabsTrigger>
              <TabsTrigger value="step02">실명 제보</TabsTrigger>
            </TabsList>
            <TabsContent value="step01">
              <div className="temp-bx">test</div>
            </TabsContent>
            <TabsContent value="step02">
              <div className="temp-bx">test</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="component-group">
        <div className="from-group">
          <Tabs defaultValue="step01" className="tab-wrap type02">
            <TabsList>
              <TabsTrigger value="step01">익명 제보</TabsTrigger>
              <TabsTrigger value="step02">실명 제보</TabsTrigger>
            </TabsList>
            <TabsContent value="step01">
              <div className="temp-bx">test</div>
            </TabsContent>
            <TabsContent value="step02">
              <div className="temp-bx">test</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="hgroup-wrap">
        <h2 className="f40-700-130">step-type</h2>
      </div>
      <div className="component-group">
        <div className="from-group">
          <Tabs defaultValue="step01" className="tab-wrap step-type">
            <TabsList>
              <TabsTrigger value="step01">
                <span>신청 정보 작성</span>
              </TabsTrigger>
              <TabsTrigger value="step02">
                <span>환급 대상 선택</span>
              </TabsTrigger>
              <TabsTrigger value="step03">
                <span>환급 수단 등록</span>
              </TabsTrigger>
              <TabsTrigger value="step04">
                <span>환급 신청 완료</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="step01">
              <span>test</span>
            </TabsContent>
            <TabsContent value="step02">
              <span>test</span>
            </TabsContent>
            <TabsContent value="step03">
              <span>test</span>
            </TabsContent>
            <TabsContent value="step04">
              <span>test</span>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">scroll-type</h2>
      </div>
      <div className="component-group">
        <div className="from-group">
          <Tabs defaultValue="step01" className="tab-wrap scroll-type">
            <TabsList>
              <TabsTrigger value="step01">
                <span>신청 정보 작성</span>
              </TabsTrigger>
              <TabsTrigger value="step02">
                <span>환급 대상 선택</span>
              </TabsTrigger>
              <TabsTrigger value="step03">
                <span>환급 수단 등록</span>
              </TabsTrigger>
              <TabsTrigger value="step04">
                <span>환급 신청 완료</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="step01">
              <span>test</span>
            </TabsContent>
            <TabsContent value="step02">
              <span>test</span>
            </TabsContent>
            <TabsContent value="step03">
              <span>test</span>
            </TabsContent>
            <TabsContent value="step04">
              <span>test</span>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tabwrap;
