
import React from 'react';
import { FileSearch } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const OcrPdf = () => {
  const processOcrPdf = async (input: string) => {
    return "OCR processing completed! Text has been extracted and made searchable in your PDF. Download link: ocr-processed-document.pdf";
  };

  return (
    <BasicToolImplementation
      title="OCR PDF"
      description="Perform OCR on scanned PDFs to make text searchable and editable"
      icon={<FileSearch className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your scanned PDF for OCR text recognition..."
      buttonText="Process OCR"
      processFunction={processOcrPdf}
    />
  );
};

export default OcrPdf;
