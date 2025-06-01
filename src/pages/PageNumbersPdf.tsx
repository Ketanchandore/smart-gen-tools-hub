
import React from 'react';
import { FileText, Hash } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';

const PageNumbersPdf = () => {
  const handleAddPageNumbers = async (files: File[]): Promise<Uint8Array> => {
    if (files.length !== 1) {
      throw new Error('Please select exactly one PDF file to add page numbers');
    }
    return await PDFProcessor.addPageNumbers(files[0]);
  };

  return (
    <PDFToolTemplate
      title="Add Page Numbers"
      description="Add page numbers to PDF documents with professional formatting"
      icon={<Hash className="h-8 w-8 text-primary" />}
      onProcess={handleAddPageNumbers}
      acceptMultiple={false}
      outputFilename="numbered-document.pdf"
    />
  );
};

export default PageNumbersPdf;
