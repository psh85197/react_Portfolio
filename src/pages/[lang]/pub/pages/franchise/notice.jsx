import React, { useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NodataCase from "@/pages/[lang]/pub/components/layouts/nodata-case";
import { Link } from "react-router-dom";

const DataPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button first-arrow"
      >
        <span className="hide-txt">처음</span>
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button prev-arrow"
      >
        <span className="hide-txt">이전</span>
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button next-arrow"
      >
        <span className="hide-txt">다음</span>
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button last-arrow"
      >
        <span className="hide-txt">맨뒤</span>
      </button>
    </div>
  );
};

const BoardPage = () => {
  // 예시 데이터
  const totalItems = 100; // 전체 아이템 수
  const itemsPerPage = 20; // 페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 여기에 페이지 변경 시 필요한 데이터 로딩 로직 추가
    console.log("Page changed:", page);
  };

  return (
    <div className="notice-wrap">
      <section>
        <div className="hgroup-wrap">
          <h2 className="f48-700-140">가맹점 공지사항</h2>
        </div>
      </section>
      <section>
        <div className="table-search-bx">
          <div className="component-group">
            <div className="from-group">
              <div className="input-group">
                <ShadcnInput
                  type="text"
                  id="test1"
                  placeholder="검색어를 입력해 주세요."
                  search
                />
              </div>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="number">번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="data">등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="number">
                <span className="bage">공지</span>
              </TableCell>
              {/* 신규일때 class : new-bage */}
              <TableCell className="title">
                <Link to="/">
                  <span className="new-bage">제목</span>
                </Link>
              </TableCell>
              <TableCell className="date">2025.04.01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="number">1</TableCell>
              <TableCell className="title">
                <Link to="/">
                  <span className="">제목</span>
                </Link>
              </TableCell>
              <TableCell className="date">2025.04.01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} className="nodata">
                <NodataCase />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex items-center justify-center space-x-2 py-4">
          <DataPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default BoardPage;
