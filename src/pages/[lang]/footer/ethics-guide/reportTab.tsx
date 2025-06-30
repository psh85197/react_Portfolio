import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.tsx";
import IdentifiedReportTabPage from "@/pages/[lang]/footer/ethics-guide/identifiedReportTab.tsx";
import AnonymousReportTabPage from "@/pages/[lang]/footer/ethics-guide/anonymousReportTab.tsx";

interface ReportTabPageProps {
  setActiveTab: (value: string) => void;
}

const ReportTabPage: FC<ReportTabPageProps> = ({ setActiveTab }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <Tabs defaultValue="step01" className="tab-wrap type01">
        <TabsList>
          <TabsTrigger value="step01">
            {t('ethicsGuide.reportTabs.anonymous')}
          </TabsTrigger>
          <TabsTrigger value="step02">
            {t('ethicsGuide.reportTabs.identified')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="step01">
          <AnonymousReportTabPage setActiveTab={setActiveTab}/>
        </TabsContent>
        <TabsContent value="step02">
          <IdentifiedReportTabPage setActiveTab={setActiveTab}/>
        </TabsContent>
      </Tabs>
</>
  );
};

export default ReportTabPage;
