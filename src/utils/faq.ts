import {FaqData, FaqDTO, TableFaq} from "@/types/customer.ts";
import {format} from "date-fns";


export const convertToTableData = (faq: FaqDTO): TableFaq => {
    return {
        id: (faq.id),
        category_code: faq.category_code,
        title: faq.title,
        createdAt: format(new Date(faq.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        createdBy: faq.createdBy
    };
};

// 리스트 변환 함수
export const convertToTableDataList = (data: FaqData): TableFaq[] => {
    return data.items.map(convertToTableData);
}