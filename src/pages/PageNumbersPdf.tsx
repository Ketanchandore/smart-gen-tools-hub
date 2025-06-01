
import React from 'react';
import { Hash } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { addPageNumbers } from '@/utils/pdfUtils';

const PageNumbersPdf = () => {
  const handleAddPageNumbers = async (files: File[]): Promise<Uint8Array> => {
    return await addPageNumbers(files[0]);
  };

  return (
    <PDFToolTemplate
      title="Add Page Numbers"
      description="Add page numbers to PDF with positioning and formatting options"
      icon={<Hash className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleAddPageNumbers}
      outputFilename="numbered.pdf"
    />
  );
};

export default PageNumbersPdf;
