import React from 'react';
import type { ValidationError } from '../types/csv';

interface ValidationSummaryProps {
  errors: ValidationError[];
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({ errors }) => {
  if (errors.length === 0) {
    return (
      <div className="h-34 mb-6 p-3 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm flex align-middle">
        No issues detected. Your data looks good!
      </div>
    );
  }

  return (
    <div className="h-34 mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-800 text-sm max-h-44 overflow-y-auto">
      <strong>
        We found {errors.length} item{errors.length > 1 ? 's' : ''} that need your attention:
      </strong>
      <ul className="mt-1 mb-0 pl-3">
        {errors.slice(0, 3).map((err, i) => (
          <li key={i}>{err.message}</li>
        ))}
        {errors.length > 3 && (
          <li className="italic">
            ...and {errors.length - 3} more. Fix these first to see the rest!
          </li>
        )}
      </ul>
    </div>
  );
};

export default ValidationSummary;
