
import { format } from "date-fns";
import {NoticeFrontListDTO, TableNotice} from "@/types/company-notice.ts";

export const convertToTableData = (notice: NoticeFrontListDTO): TableNotice => {
  return {
    id: notice.id,
    title : '',
    koTitle: notice.ko.title,
    enTitle: notice.en.title,
    zhTitle: notice.zh.title,
    jaTitle: notice.ja.title,
    createdAt: format(notice.createdAt, 'yyyy-MM-dd'),
    createdBy: notice.createdByNm,
    isTopNotice: notice.isTopNotice
  };
};

// 리스트 변환 함수
export const convertToTableDataList = (data: NoticeFrontListDTO[]): TableNotice[] => {
  return data.map(convertToTableData);
}