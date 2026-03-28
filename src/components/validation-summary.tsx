import React from 'react';
import type { ValidationError } from '../types/csv';

interface ValidationSummaryProps {
  errors: ValidationError[];
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-800 text-sm">
      <strong>
        We found {errors.length} item{errors.length > 1 ? 's' : ''} that need your attention:
      </strong>
      <ul className="mt-1 mb-0 pl-5">
        {errors.slice(0, 5).map((err, i) => (
          <li key={i}>{err.message}</li>
        ))}
        {errors.length > 5 && (
          <li className="italic">
            ...and {errors.length - 5} more. Fix these first to see the rest!
          </li>
        )}
      </ul>
    </div>
  );
};

export default ValidationSummary;
