import { FC } from "react";
import { DataTable } from "./data-table";
import { createColumns } from "./columns";
import { TableNotice } from "@/types/company-notice.ts";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface NoticeListProps {
  data: TableNotice[];
  lang: string;
}

export const NoticeList: FC<NoticeListProps> = ({data, lang}) => {
  const { t } = useTranslation(); // t 함수 가져오기

  // createColumns를 호출할 때 t 함수를 함께 전달
  const columns = createColumns(lang, t);

  return (
    <div>
      <DataTable columns={columns} data={data}/>
    </div>
  )
}