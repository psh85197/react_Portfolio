import { useState, useEffect } from "react";

/**
 * 데이터 페이징 처리 + 페이징 상태를 관리하는 커스텀 훅
 * 
 * @param data - 필터링된 데이터 (예: 검색 조건이 반영된 filteredData)
 * @param initialPage - 초기 페이지 번호 (기본값: 1)
 * @param initialPageSize - 초기 페이지당 항목 수 (기본값: 10)
 *
 * - currentPage, pageSize 상태 관리
 * - 페이지 변경 및 페이지당 행 수 변경 지원
 * - 현재 페이지의 잘라낸 데이터(paginatedData) 반환 (기본 10개씩)
 * - 총 페이지 수(totalPages) 계산 포함
 */
export const usePagination = <T>(data: T[], initialPage = 1, initialPageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const [pageData, setPageData] = useState<T[]>([]);

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const sliced = data.slice(start, start + pageSize).map((row, idx) => ({
      ...row,
      index: start + idx + 1,
    }));
    setPageData(sliced);
  }, [data, currentPage, pageSize]);

  return {
    pageData,        // 페이징 처리된 데이터 목록
    setPageData,     // 페이징 데이터 변경
    currentPage,     // 현재 페이지 번호
    setCurrentPage,  // 현재 페이지 번호 변경 
    pageSize,        // 페이지당 항목 수
    setPageSize,     // 페이지당 항목 수 변경
    totalPages,      // 전체 페이지 수 (필요할 경우 사용(선택사항))
  };
};
