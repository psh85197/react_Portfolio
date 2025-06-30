import { TableNotice } from "@/types/company-notice";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { TFunction } from "i18next"; // i18next의 TFunction 타입 임포트

const columnHelper = createColumnHelper<TableNotice>();

// t 함수를 인자로 받도록 변경
export const createColumns = (lang: string, t: TFunction) => [
  columnHelper.display({
    id: 'No',
    header: () => (
      // t 함수를 사용하여 'No' 텍스트 다국어 처리
      <div className="text-center">{t('notice.noLabel')}</div>
    ),
    cell: ({row, table}) => {
      const totalRows = table.options.data.length;
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      const rowIndex = row.index % pageSize;
      const no = totalRows - (pageIndex * pageSize + rowIndex);
      const isTopNotice = row.original.isTopNotice;

      return (
        <div className="text-center">
          {isTopNotice ? (
            // t 함수를 사용하여 '공지' 텍스트 다국어 처리
            <span className="bage">{t('notice.topNoticeBadge')}</span>
          ) : (
            no
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('title', {
    header: () => (
      // t 함수를 사용하여 '제목' 텍스트 다국어 처리
      <div className="text-center">{t('notice.titleLabel')}</div>
    ),
    cell: ({row}) => {
      const titles = row.original;
      const id = row.original.id;
      let title = "";
      if (lang === "ko" && titles.koTitle) title = titles.koTitle;
      else if (lang === "en" && titles.enTitle) title = titles.enTitle;
      else if (lang === "zh" && titles.zhTitle) title = titles.zhTitle;
      else if (lang === "ja" && titles.jaTitle) title = titles.jaTitle;
      else if (titles.enTitle) title = titles.enTitle; // 대체 언어: 영어
      else if (titles.koTitle) title = titles.koTitle; // 대체 언어: 한국어
      else title = t('notice.noTitle'); // 모든 제목이 없을 경우 기본값도 다국어 처리

      return (
        <div className="text-center">
          <Link
            to={`/${lang}/company/notice/${id}`}
            className="text-blue-600 hover:underline"
          >
            {title}
          </Link>
        </div>
      );
    },
  }),

  columnHelper.accessor('createdAt', {
    header: () => (
      // t 함수를 사용하여 '등록일' 텍스트 다국어 처리
      <div className="text-center">{t('notice.registrationDateLabel')}</div>
    ),
    // cell에도 필요하다면 (예: 날짜 형식 변경 등) t 함수를 사용할 수 있음
    // cell: info => <div className="text-center">{formatDate(info.getValue(), lang)}</div>,
  }),
];