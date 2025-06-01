
import React from 'react';
import { FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';

const MergePdf = () => {
  const handleMerge = async (files: File[]): Promise<Uint8Array> => {
    if (files.length < 2) {
      throw new Error('Please select at least 2 PDF files to merge');
    }
    return await PDFProcessor.mergePDFs(files);
  };

  return (
    <PDFToolTemplate
      title="Merge PDF"
      description="Combine multiple PDF files into a single document while maintaining quality and formatting"
      icon={<FileText className="h-8 w-8 text-primary" />}
      onProcess={handleMerge}
      acceptMultiple={true}
      outputFilename="merged-document.pdf"
    />
  );
};

export default MergePdf;
