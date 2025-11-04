import React from 'react';
import FileUploadArea from '@/components/FileUploadArea';

interface PDFToolTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptFiles: string;
  multiple: boolean;
  processFunction: (files: File[]) => Promise<Uint8Array>;
  outputFilename: string;
  children?: React.ReactNode;
  customActions?: React.ReactNode;
}

const PDFToolTemplate: React.FC<PDFToolTemplateProps> = ({
  title,
  description,
  icon,
  acceptFiles,
  multiple,
  processFunction,
  outputFilename,
  children,
  customActions,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        {icon}
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{description}</p>
        </div>
      </div>

      {children}

      <div className="mt-8">
        <FileUploadArea
          acceptFiles={acceptFiles}
          multiple={multiple}
          processFunction={processFunction}
          outputFilename={outputFilename}
        />
      </div>

      {customActions}
    </div>
  );
};

export default PDFToolTemplate;
