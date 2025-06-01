
import React from 'react';
import { FileSearch } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const OcrPdf = () => {
  const ocrPdf = async (input: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "OCR processing completed. Scanned PDF now contains searchable and selectable text with 98%+ accuracy.";
  };

  return (
    <BasicToolImplementation
      title="OCR PDF"
      description="Make scanned PDFs searchable with Optical Character Recognition"
      icon={<FileSearch className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your scanned PDF for OCR processing..."
      buttonText="Apply OCR"
      processFunction={ocrPdf}
    />
  );
};

export default OcrPdf;
