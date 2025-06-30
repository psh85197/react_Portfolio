// CustomHeader.tsx
import { FC } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { IHeaderParams } from "ag-grid-community";

interface CustomHeaderProps extends IHeaderParams {
  headerSort: { field: string; direction: string };
}

const CustomHeader: FC<CustomHeaderProps> = ({ displayName, column, headerSort }) => {
  const field = column.getColDef().field;
  const isSorted = headerSort.field === field;
  const direction = headerSort.direction;

  return (
    <div className="flex items-center gap-1 font-bold cursor-pointer">
      {displayName}
      {isSorted && direction === "ASC" && <ArrowUp size={16} />}
      {isSorted && direction === "DESC" && <ArrowDown size={16} />}
    </div>
  );
};

export default CustomHeader;