import React from 'react';
import { TableHead } from './table';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SortableTableHeadProps {
  field: string;
  label: string;
  sort: string;
  activeSortField: string;
  onSortChange: (newSort: string, field: string) => void;
  className?: string;
}

const SortableTableHead: React.FC<SortableTableHeadProps> = ({
  field,
  label,
  sort,
  activeSortField,
  onSortChange,
  className,
}) => {
  const isActive = activeSortField === field;
  const isAsc = sort.startsWith(field) && sort.endsWith('ASC');

  const handleSortToggle = () => {
    const [currentField, currentOrder] = sort.split(',');
    const newOrder = currentField === field && currentOrder === 'ASC' ? 'DESC' : 'ASC';
    onSortChange(`${field},${newOrder}`, field);
  };

  return (
    <TableHead
      className={`cursor-pointer whitespace-nowrap ${className ?? ''}`}
      onClick={handleSortToggle}
    >
      <div className="inline-flex items-center gap-1">
        {label}
        {isActive && (isAsc ? <ArrowUp size={18} /> : <ArrowDown size={18} />)}
      </div>
    </TableHead>
  );
};

export default SortableTableHead;