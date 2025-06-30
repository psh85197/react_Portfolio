import { FC } from "react";
import "@/assets/scss/style.scss";
import {useTranslation} from "react-i18next";

const NoContentCase: FC = () => {

  const { t }= useTranslation();

  return (
    <div>
      <div className="nodata">
        <div className="nodata-bx">
          <span className="nodata-txt">{t('common.noContent')}</span>
        </div>
      </div>
    </div>
  );
};

export default NoContentCase;
