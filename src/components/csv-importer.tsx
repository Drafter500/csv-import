import React, { useState, useCallback, useRef } from 'react';
import Papa, { type ParseResult } from 'papaparse';
import FileSelector from './file-selector.tsx';
import ValidationSummary from './validation-summary';
import EditableTable from './editable-table';
import type { CSVRow, ValidationError } from '../types/csv';
import { validateFullTable } from '../utils/validation';


const CsvImporter: React.FC = () => {
  // Data is ref and not a state to improve performance: When user types in the
  // cell, it does not cause a re-render of the whole grid, as it makes the UI
  // sluggish when a big file is imported.
  const dataRef = useRef<CSVRow[]>([]);
  const headersRef = useRef<string[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const revalidateAll = useCallback(() => {
    setErrors(validateFullTable(dataRef.current, headersRef.current));
  }, []);

  const handleFileSelection = (file: File) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        const parsedHeaders = results.meta.fields || [];
        headersRef.current = parsedHeaders;
        setHeaders(parsedHeaders);
        dataRef.current = results.data;
        setErrors(validateFullTable(results.data, parsedHeaders));
        // This is what makes the table render the data. No rerenders are needed
        setTableKey(k => k + 1);
      },
      error: (error: Error) => {
        setErrors([{
          row: -1,
          column: 'File',
          message: `Failed to read file: ${error.message}`,
        }]);
      }
    });
  };

  const handleFileSelectError = (message: string) => {
    setErrors([{ row: -1, column: 'File', message }]);
  };

  const handleCellEdit = useCallback((rowIndex: number, header: string, newValue: string) => {
    dataRef.current[rowIndex] = { ...dataRef.current[rowIndex], [header]: newValue };

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(revalidateAll, 300);
  }, [revalidateAll]);

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Upload and Edit Data</h2>

      <FileSelector
        onFileSelected={handleFileSelection}
        onError={handleFileSelectError}
      />

      {dataRef.current.length > 0 && (
        <ValidationSummary errors={errors} />
      )}

      <EditableTable
        key={tableKey}
        data={dataRef.current}
        headers={headers}
        onCellEdit={handleCellEdit}
      />
    </>
  );
};

export default CsvImporter;
