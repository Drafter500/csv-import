import React, { useState, useCallback } from 'react';
import { validateCell } from '../utils/validation';

export interface TableCellProps {
  rowIndex: number;
  header: string;
  initialValue: string;
  onCellEdit: (rowIndex: number, header: string, newValue: string) => void;
}

const TableCell = React.memo<TableCellProps>(({ rowIndex, header, initialValue, onCellEdit }) => {
  const [value, setValue] = useState(initialValue);
  const error = validateCell(header, value, rowIndex);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onCellEdit(rowIndex, header, e.target.value);
  }, [rowIndex, header, onCellEdit]);

  return (
    <td className={`flex-1 min-w-0 p-0 border-b border-r last:border-r-0 border-gray-200
      ${error ? 'bg-red-100 relative z-[1]' : ''}`}>
      <div className="relative h-full group">
        <input
          className={`text-sm bg-transparent outline-none
          ${error ? 'absolute -inset-[1px] px-2 border border-red-400 focus:border-red-600 z-[2]' : 'w-full h-full px-2'}`}
          value={value}
          onChange={handleChange}
        />
        {error && (
          <span className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-20 pointer-events-none transition-opacity
            ${rowIndex === 0
              ? 'top-full mt-1 after:content-[\'\'] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-900'
              : 'bottom-full mb-1 after:content-[\'\'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900'
            }`}>
            {error.message}
          </span>
        )}
      </div>
    </td>
  );
});

export default TableCell;
