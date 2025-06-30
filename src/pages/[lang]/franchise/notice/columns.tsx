import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "react-router-dom";
import {TableFranchiseNotice} from "@/types/franchiseNotice.ts";

interface TableHandlers {
  lang?: string;
}

const columnHelper = createColumnHelper<TableFranchiseNotice>()

export const createColumns = (handlers?: TableHandlers) => [
  columnHelper.display({
    id: 'No',
    header: () => (
      <div className="text-center">No</div>
    ),
    cell: ({row, table}) => {
      const totalRows = table.options.data.length;
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      const rowIndex = row.index % pageSize; 
      const no = totalRows - (pageIndex * pageSize + rowIndex);
      const isTopNotice = row.original.isTopNotice

      return (
        <div className="text-center">
          {isTopNotice ? (
            <span className="bage">공지</span>
          ) : (
            no
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('title', {
    header: () => (
      <div className="text-center">제목</div>
    ),
    cell: ({row}) => {
      const title = row.getValue('title') as string;
      const id = row.original.id;
      const lang = handlers?.lang;

      return (
        <div className="text-left">
          <Link
            to={`/${lang}/franchise/notice/${id}`}
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
      <div className="text-center">등록일</div>
    ),
  })
]