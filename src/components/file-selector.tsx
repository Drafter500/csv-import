import React, { useState, useRef } from 'react';

interface CSVUploadZoneProps {
  onFileSelected: (file: File) => void;
  onError: (message: string) => void;
}

const FileSelector: React.FC<CSVUploadZoneProps> = ({ onFileSelected, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
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
    <div
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer mb-6 transition-colors
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <p className="m-0 text-gray-500">
        {isDragging
          ? 'Drop your CSV here...'
          : 'Drag and drop your CSV file here, or click to browse'}
      </p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default FileSelector;
