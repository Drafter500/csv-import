import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { CSVRow } from '../types/csv';
import TableCell from './table-cell';

interface EditableTableProps {
  data: CSVRow[];
  headers: string[];
  onCellEdit: (rowIndex: number, header: string, newValue: string) => void;
}

const EditableTable: React.FC<EditableTableProps> = React.memo(({ data, headers, onCellEdit }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 20,
  });

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
                {headers.map(header => (
                  <TableCell
                    key={header}
                    rowIndex={virtualRow.index}
                    header={header}
                    initialValue={row[header] || ''}
                    onCellEdit={onCellEdit}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default EditableTable;
