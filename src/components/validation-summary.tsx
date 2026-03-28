import React from 'react';
import { Alert, AlertTitle, styled } from '@mui/material';
import type { ValidationError } from '../types/csv';


const StyledAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

const ErrorList = styled('ul')({
  margin: 0,
  paddingLeft: '20px',
});

interface ValidationSummaryProps {
  errors: ValidationError[];
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <StyledAlert severity="error">
      <AlertTitle>
        <strong>
          We found {errors.length} item{errors.length > 1 ? 's' : ''} that need your attention:
        </strong>
      </AlertTitle>
      <ErrorList>
        {errors.slice(0, 5).map((err, i) => (
          <li key={i}>{err.message}</li>
        ))}
        {errors.length > 5 && (
          <li>
            <em>
            ...and {errors.length - 5} more. Fix these first to see the rest!
            </em>
          </li>
        )}
      </ErrorList>
    </StyledAlert>
  );
};

export default ValidationSummary;
