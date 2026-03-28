export type CSVRow = Record<string, string>;

export interface ValidationError {
  row: number;
  column: string;
  message: string;
}
