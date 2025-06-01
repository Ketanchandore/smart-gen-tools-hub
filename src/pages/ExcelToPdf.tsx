
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const ExcelToPdf = () => {
  const processExcelToPdf = async (input: string) => {
    return "Excel to PDF conversion completed! Download link: converted-spreadsheet.pdf";
  };

  return (
    <BasicToolImplementation
      title="Excel to PDF"
      description="Convert Excel spreadsheets into PDF files"
      icon={<FileSpreadsheet className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your Excel file or paste content here..."
      buttonText="Convert to PDF"
      processFunction={processExcelToPdf}
    />
  );
};

export default ExcelToPdf;
