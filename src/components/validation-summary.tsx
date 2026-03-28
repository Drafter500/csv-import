import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import type { ValidationError } from '../types/csv';


interface ValidationSummaryProps {
  errors: ValidationError[];
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
      <AlertTitle>
        <strong>
          We found {errors.length} item{errors.length > 1 ? 's' : ''} that need your attention:
        </strong>
      </AlertTitle>
      <ul style={{ margin: 0, paddingLeft: '20px' }}>
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
      </ul>
    </Alert>
  );
};

export default ValidationSummary;
