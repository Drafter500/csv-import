import type { CSVRow, ValidationError } from '../types/csv';


export const validateCell = (header: string, value: string | undefined, rowIndex: number): ValidationError | null => {
  const trimmedValue = value ? value.toString().trim() : '';

  if (!trimmedValue) {
    return {
      row: rowIndex,
      column: header,
      message: `The "${header}" is missing.`
    };
  }

  // Just an example, there could be more validators added
  if (header.toLowerCase() === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValue)) {
      return {
        row: rowIndex,
        column: header,
        message: `"${trimmedValue}" is not a valid email.`
      };
    }
  }

  return null;
};

export const validateFullTable = (tableData: CSVRow[], tableHeaders: string[]): ValidationError[] => {
  const newErrors: ValidationError[] = [];
  tableData.forEach((row, rowIndex) => {
    tableHeaders.forEach((header) => {
      const error = validateCell(header, row[header], rowIndex);
      if (error) newErrors.push(error);
    });
  });
  return newErrors;
};
