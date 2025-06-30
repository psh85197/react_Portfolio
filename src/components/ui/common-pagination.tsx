import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pageGroupSize = 10;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  return (
    <div className="flex justify-center items-center gap-1 mt-4">
      {currentPage > 1 && (
        <>
          <Button variant="ghost" size="icon" 
                  className="p-1 text-black bg-transparent hover:bg-gray-100 hover:border-transparent" 
                  onClick={() => onPageChange(1)}>
            <ChevronsLeft size={16} />
          </Button>
          <Button variant="ghost" size="icon" 
                  className="p-1 text-black bg-transparent hover:bg-gray-100 hover:border-transparent" 
                  onClick={() => onPageChange(currentPage - 1)}>
            <ChevronLeft size={16} />
          </Button>
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <Button
          key={page}
          variant="ghost"
          size="icon"
          className={`px-3 py-1 rounded-md border bg-transparent text-black transition-all ${
            page === currentPage ? "border-gray-300 font-bold " : "border-transparent hover:bg-gray-100 hover:border-transparent"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages && (
        <>
          <Button variant="ghost" size="icon" 
                  className="p-1 text-black bg-transparent hover:bg-gray-100 hover:border-transparent" 
                  onClick={() => onPageChange(currentPage + 1)}>
            <ChevronRight size={16} />
          </Button>
          <Button variant="ghost" size="icon" 
                  className="p-1 text-black bg-transparent hover:bg-gray-100 hover:border-transparent" 
                  onClick={() => onPageChange(totalPages)}>
            <ChevronsRight size={16} />
          </Button>
        </>
      )}
    </div>
  );
};