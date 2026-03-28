import React, { useState, useRef } from 'react';
import { Box, Typography, styled } from '@mui/material';

interface CSVUploadZoneProps {
  onFileSelected: (file: File) => void;
  onError: (message: string) => void;
}

const DropZone = styled(Box)<{ ownerState: { isDragging: boolean } }>(
  ({ theme, ownerState }) => ({
    border: '2px dashed',
    borderColor: ownerState.isDragging
      ? theme.palette.primary.main
      : theme.palette.grey[400],
    backgroundColor: ownerState.isDragging
      ? theme.palette.primary.light
      : theme.palette.grey[50],
    padding: theme.spacing(6),
    textAlign: 'center',
    borderRadius: Number(theme.shape.borderRadius) * 2,
    cursor: 'pointer',
    marginBottom: theme.spacing(4),
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
  }),
);

const HiddenInput = styled('input')({
  display: 'none',
});

const FileSelector: React.FC<CSVUploadZoneProps> = ({ onFileSelected, onError }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileSelected(file);
      } else {
        onError('Please upload a valid CSV file.');
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelected(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <DropZone
      ownerState={{ isDragging }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Typography variant="body1" color="text.secondary">
        {isDragging
          ? 'Drop your CSV here...'
          : 'Drag and drop your CSV file here, or click to browse'
        }
      </Typography>
      <HiddenInput
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
    </DropZone>
  );
};

export default FileSelector;
