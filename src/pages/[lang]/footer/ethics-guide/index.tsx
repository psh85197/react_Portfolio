import {FC, useState} from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.tsx";
import ReportTabPage from "@/pages/[lang]/footer/ethics-guide/reportTab.tsx";
import ReportResultConfirmPage from "@/pages/[lang]/footer/ethics-guide/resultConfirmTab.tsx";
import EthicsNewspaperPage from "@/pages/[lang]/footer/ethics-guide/ethicsNewspaperTab.tsx";

const EthicsGuidePage: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("step01");
  
  return (
    <>
      <section className="signup-inquiry-wrap">
        <div className="hgroup-wrap sub">
          <p className="f48-700-140">{t('ethicsGuide.pageTitle')}</p>
        </div>
        <div className="component-group">
          <div className="from-group">
            <Tabs 
              value={activeTab}
              onValueChange={setActiveTab}
              className="tab-wrap"
            >
              <TabsList>
                <TabsTrigger value="step01">
                  {t('ethicsGuide.tabs.guide')}
                </TabsTrigger>
                <TabsTrigger value="step02">
                  {t('ethicsGuide.tabs.report')}
                </TabsTrigger>
                <TabsTrigger value="step03">
                  {t('ethicsGuide.tabs.result')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="step01">
                <EthicsNewspaperPage/>
              </TabsContent>
              <TabsContent value="step02">
                <ReportTabPage setActiveTab={setActiveTab}/>
              </TabsContent>
              <TabsContent value="step03">
                <ReportResultConfirmPage/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default EthicsGuidePage;
