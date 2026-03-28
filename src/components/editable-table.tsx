import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import type { CSVRow, ValidationError } from '../types/csv';


interface EditableTableProps {
  data: CSVRow[];
  headers: string[];
  errors: ValidationError[];
  onCellEdit: (rowIndex: number, header: string, newValue: string) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({ data, headers, errors, onCellEdit }) => {
  const getCellError = (rowIndex: number, header: string) => {
    return errors.find(err => err.row === rowIndex && err.column === header);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: 'grey.100' }}>
          <TableRow>
            <TableCell width="50px"><strong>#</strong></TableCell>
            {headers.map(header => (
              <TableCell key={header}><strong>{header}</strong></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              <TableCell color="text.secondary">
                {rowIndex + 1}
              </TableCell>
              {headers.map(header => {
                const cellError = getCellError(rowIndex, header);

                return (
                  <TableCell key={header} sx={{ p: 0, borderRight: '1px solid #eee' }}>
                    <Tooltip
                      title={cellError?.message || ''}
                      placement="top"
                      arrow
                      color="error"
                      disableHoverListener={!cellError}
                      disableFocusListener={!cellError}
                      disableTouchListener={!cellError}
                    >
                      <TextField
                        value={row[header] || ''}
                        onChange={(e) => onCellEdit(rowIndex, header, e.target.value)}
                        error={!!cellError}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: cellError ? undefined : 'none',
                          },
                          bgcolor: cellError ? '#fff0f0' : 'transparent',
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableTable;
