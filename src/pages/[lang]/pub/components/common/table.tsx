import { FC } from "react";
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
import "@/assets/scss/style.scss";

interface TableDemoProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TableDemo: FC<TableDemoProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="component-wrap">
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Data Table</h2>
      </div>
      <div className="component-group">
        <div className="from-group">
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
          <div className="pagination-wrap">
            <button 
              className="btn-page prev" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className={`btn-page ${page === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="btn-page next" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDemo;
