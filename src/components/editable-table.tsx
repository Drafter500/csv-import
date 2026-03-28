import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { CSVRow, ValidationError } from '../types/csv';

interface EditableTableProps {
  data: CSVRow[];
  headers: string[];
  errors: ValidationError[];
  onCellEdit: (rowIndex: number, header: string, newValue: string) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({ data, headers, errors, onCellEdit }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 20,
  });

  const getCellError = (rowIndex: number, header: string) => {
    return errors.find(err => err.row === rowIndex && err.column === header);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div ref={parentRef} className="bg-white rounded-lg max-h-[calc(100vh-280px)] overflow-auto">
      <table className="w-full border-collapse">
        <thead className="block sticky top-0 z-10">
          <tr className="flex bg-gray-100">
            <th className="w-12 shrink-0 p-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-300">#</th>
            {headers.map(header => (
              <th key={header} className="flex-1 min-w-0 p-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-300 last:border-r-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block relative" style={{ height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = data[virtualRow.index];
            return (
              <tr
                key={virtualRow.index}
                className="absolute left-0 right-0 flex h-9"
                style={{ top: virtualRow.start }}
              >
                <td className="w-12 shrink-0 flex items-center justify-center text-xs text-gray-400 p-0 border-b border-r border-gray-200">
                  {virtualRow.index + 1}
                </td>
                {headers.map(header => {
                  const cellError = getCellError(virtualRow.index, header);
                  return (
                    <td key={header} className={`flex-1 min-w-0 p-0 border-b border-r last:border-r-0 border-gray-200
                      ${cellError ? 'bg-red-100 relative z-[1]' : ''}`}>
                      <div className="relative h-full group">
                        <input
                          className={`text-sm bg-transparent outline-none
                          ${cellError ? 'absolute -inset-[1px] px-2 border border-red-400 focus:border-red-600 z-[2]' : 'w-full h-full px-2'}`}
                          value={row[header] || ''}
                          onChange={(e) => onCellEdit(virtualRow.index, header, e.target.value)}
                        />
                        {cellError && (
                          <span className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-20 pointer-events-none transition-opacity
                            ${virtualRow.index === 0
                              ? 'top-full mt-1 after:content-[\'\'] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-900'
                              : 'bottom-full mb-1 after:content-[\'\'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900'
                            }`}>
                            {cellError.message}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
