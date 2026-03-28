import type { CSVRow, ValidationError } from '../types/csv';


export const checkCellError = (header: string, value: string | undefined, rowIndex: number): ValidationError | null => {
  const trimmedValue = value ? value.toString().trim() : '';

  if (!trimmedValue) {
    return {
      row: rowIndex,
      column: header,
      message: `Row ${rowIndex + 1}: The "${header}" is missing.`
    };
  }

  if (header.toLowerCase() === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValue)) {
      return {
        row: rowIndex,
        column: header,
        message: `Row ${rowIndex + 1}: "${trimmedValue}" is not a valid email.`
      };
    }
  }

  return null;
};

export const validateFullTable = (tableData: CSVRow[], tableHeaders: string[]): ValidationError[] => {
  const newErrors: ValidationError[] = [];
  tableData.forEach((row, rowIndex) => {
    tableHeaders.forEach((header) => {
      const error = checkCellError(header, row[header], rowIndex);
      if (error) newErrors.push(error);
    });
  });
  return newErrors;
};
