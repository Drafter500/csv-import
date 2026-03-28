import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface CSVUploadZoneProps {
  onFileSelected: (file: File) => void;
  onError: (message: string) => void;
}

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
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'grey.400',
        bgcolor: isDragging ? 'primary.50' : 'grey.50',
        p: 6,
        textAlign: 'center',
        borderRadius: 2,
        cursor: 'pointer',
        mb: 4,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'primary.50',
        }
      }}
    >
      <Typography variant="body1" color="text.secondary">
        {isDragging
          ? 'Drop your CSV here...'
          : 'Drag and drop your CSV file here, or click to browse'
        }
      </Typography>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default FileSelector;
