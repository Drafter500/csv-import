import React, { useState } from 'react';
import Papa, { type ParseResult } from 'papaparse';
import { Typography } from '@mui/material';
import FileSelector from './file-selector.tsx';
import ValidationSummary from './validation-summary';
import EditableTable from './editable-table';
import type { CSVRow, ValidationError } from '../types/csv';
import { checkCellError, validateFullTable } from '../utils/validation';


const CsvImporter: React.FC = () => {
  const [data, setData] = useState<CSVRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleFileSelection = (file: File) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        const parsedHeaders = results.meta.fields || [];
        setHeaders(parsedHeaders);
        setData(results.data);
        const errors = validateFullTable(results.data, parsedHeaders);
        setErrors(errors);
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

  const handleCellEdit = (rowIndex: number, header: string, newValue: string) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex] = { ...updatedData[rowIndex], [header]: newValue };
      return updatedData;
    });

    setErrors((prevErrors) => {
      const filteredErrors = prevErrors.filter(
        (err) => !(err.row === rowIndex && err.column === header)
      );
      const newError = checkCellError(header, newValue, rowIndex);
      return newError ? [...filteredErrors, newError] : filteredErrors;
    });
  };

  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Upload and Edit Data
      </Typography>

      <FileSelector
        onFileSelected={handleFileSelection}
        onError={handleFileSelectError}
      />

      <ValidationSummary errors={errors} />

      <EditableTable
        data={data}
        headers={headers}
        errors={errors}
        onCellEdit={handleCellEdit}
      />
    </>
  );
};

export default CsvImporter;
