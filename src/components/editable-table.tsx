import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  styled,
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
    <StyledTableContainer>
      <Table size="small">
        <StyledTableHead>
          <TableRow>
            <TableCell width="50px"><strong>#</strong></TableCell>
            {headers.map(header => (
              <TableCell key={header}><strong>{header}</strong></TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              <TableCell color="text.secondary">
                {rowIndex + 1}
              </TableCell>
              {headers.map(header => {
                const cellError = getCellError(rowIndex, header);

                return (
                  <StyledTableCell key={header}>
                    <Tooltip
                      title={cellError?.message || ''}
                      placement="top"
                      arrow
                      color="error"
                      disableHoverListener={!cellError}
                      disableFocusListener={!cellError}
                      disableTouchListener={!cellError}
                    >
                      <StyledTextField
                        ownerState={{ hasError: !!cellError }}
                        value={row[header] || ''}
                        onChange={(e) => onCellEdit(rowIndex, header, e.target.value)}
                        error={!!cellError}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Tooltip>
                  </StyledTableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: 'white',
  borderRadius: 8,
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

const StyledTableCell = styled(TableCell)({
  padding: 0,
  borderRight: '1px solid #eee',
});

const StyledTextField = styled(TextField)<{ ownerState: { hasError: boolean } }>(
  ({ ownerState }) => ({
    backgroundColor: ownerState.hasError ? '#fff0f0' : 'transparent',
    '& .MuiOutlinedInput-notchedOutline': {
      border: ownerState.hasError ? undefined : 'none',
    },
  }),
);

export default EditableTable;
