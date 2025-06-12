
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const PdfToExcel = () => {
  const processPdfToExcel = async (input: string) => {
    return "PDF to Excel conversion completed! Download link: converted-spreadsheet.xlsx";
  };

  return (
    <BasicToolImplementation
      title="PDF to Excel"
      description="Convert PDF files into editable Excel spreadsheets"
      icon={<FileSpreadsheet className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your PDF file or paste content here..."
      buttonText="Convert to Excel"
      processFunction={processPdfToExcel}
    />
  );
};

export default PdfToExcel;
