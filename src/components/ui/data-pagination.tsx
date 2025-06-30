// components/ui/data-pagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";

interface DataPaginationProps<TData> {
  table: Table<TData>
}

export function DataPagination<TData>({ table }: DataPaginationProps<TData>) {
  // 현재 페이지 주변에 보여줄 페이지 숫자 개수
  const SIBLING_COUNT = 1;
  const DOTS = '...';

  const calculateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPaginationRange = () => {
    const totalPageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    // totalPageNumbers는 페이지 번호 목록에 항상 표시될 최소 개수 (예: 1 ... 5 6 7 ... 10)
    // 1(시작), DOTS, SIBLING_COUNT x 2(중앙), DOTS, totalPageCount(끝)
    const totalPageNumbers = SIBLING_COUNT * 2 + 3; // 시작/끝 페이지 + 양쪽 SIBLING_COUNT + 현재 페이지

    // 전체 페이지가 없거나 1페이지인 경우, 모든 페이지 번호를 보여줌 (1페이지만)
    if (totalPageCount <= 1) {
      return calculateRange(1, totalPageCount);
    }

    // 전체 페이지 수가 페이지네이션에 표시될 최소 페이지 숫자보다 적으면
    // 모든 페이지 번호를 그대로 보여줍니다.
    if (totalPageNumbers >= totalPageCount) {
      return calculateRange(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
    const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPageCount);

    // 왼쪽 생략 (...) 표시 여부
    const shouldShowLeftDots = leftSiblingIndex > 2; // 1, 2 다음이면 ... 표시
    // 오른쪽 생략 (...) 표시 여부
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2; // 전체 페이지 -2 전이면 ... 표시

    // 왼쪽에는 ... 없고 오른쪽에 ... 있을 때
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * SIBLING_COUNT; // 1,2,3 ... (중앙 페이지 포함해서 3개)
      const leftRange = calculateRange(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // 왼쪽에는 ... 있고 오른쪽에는 ... 없을 때
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * SIBLING_COUNT; // ... (전체-2), (전체-1), 전체
      const rightRange = calculateRange(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [1, DOTS, ...rightRange];
    }

    // 양쪽에 모두 ... 있을 때
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = calculateRange(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }

    return [];
  };

  const pages = getPaginationRange();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPageCount = table.getPageCount();

  // 전체 페이지가 1페이지 이하(0페이지 포함)인 경우 화살표 버튼을 숨깁니다.
  const shouldHideArrows = totalPageCount <= 1;

  return (
    <div className="pagination">
      <Pagination>
        <PaginationContent>
          {/* 이전 페이지 버튼:
                - 전체 페이지가 1페이지 이하가 아닐 때 (즉, 2페이지 이상일 때)
                - 이전 페이지로 갈 수 있을 때 (현재 페이지가 첫 페이지가 아닐 때)
                위 두 조건이 모두 참일 때만 렌더링됩니다.
            */}
          {
            !shouldHideArrows && table.getCanPreviousPage() && (
              <PaginationItem>
                <button
                  onClick={() => table.previousPage()}
                  className={"pagination-button prev-arrow"}
                >
                  <span className="hide-txt">이전</span>
                </button>
              </PaginationItem>
            )
          }

          {/* 페이지 번호들 */}
          {pages.map((pageNumber, i) => {
            // DOTS (...) 표시
            if (pageNumber === DOTS) {
              return (
                <PaginationItem key={i}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            // 실제 페이지 번호 버튼
            return (
              <PaginationItem key={pageNumber}>
                <button
                  onClick={() => table.setPageIndex(Number(pageNumber) - 1)}
                  className={`pagination-button ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              </PaginationItem>
            );
          })}

          {/* 다음 페이지 버튼:
                - 전체 페이지가 1페이지 이하가 아닐 때
                - 다음 페이지로 갈 수 있을 때 (현재 페이지가 마지막 페이지가 아닐 때)
                위 두 조건이 모두 참일 때만 렌더링됩니다.
            */}
          {
            !shouldHideArrows && table.getCanNextPage() && (
              <PaginationItem>
                <button
                  onClick={() => table.nextPage()}
                  className={"pagination-button next-arrow"}
                >
                  <span className="hide-txt">다음</span>
                </button>
              </PaginationItem>
            )
          }
        </PaginationContent>
      </Pagination>
    </div>
  );
}