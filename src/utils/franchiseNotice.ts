import {FranchiseNoticeRes, FranchiseNotices, TableFranchiseNotice} from "@/types/franchiseNotice";
import {format} from "date-fns";

export const convertToTableData = (notice: FranchiseNotices): TableFranchiseNotice => {
    return {
        id: notice.id,
        title: notice.title,
        visible: notice.visible,
        createdAt: format(notice.createdAt, 'yyyy-MM-dd'),
        createdBy: notice.createdByNm,
        viewCount: notice.viewCount,
        isTopNotice: notice.isTopNotice
    };
};

// 리스트 변환 함수
export const convertToTableDataList = (data: FranchiseNoticeRes): TableFranchiseNotice[] => {
    return data.notices.map(convertToTableData);
}