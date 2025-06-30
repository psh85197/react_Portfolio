import { FC } from "react";
import {useTranslation} from "react-i18next";


const NoData: FC = () => {
  const { t }= useTranslation();
  return (
    <div className="nodata">
      <div className="nodata-bx">
        <span className="nodata-txt">{t('common.noData')}</span>
      </div>
    </div>
  );
};

export default NoData; 