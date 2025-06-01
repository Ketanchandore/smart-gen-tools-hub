
import React from 'react';
import { FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { mergePDFs } from '@/utils/pdfUtils';

const MergePdf = () => {
  const handleMerge = async (files: File[]): Promise<Uint8Array> => {
    return await mergePDFs(files);
  };

  return (
    <PDFToolTemplate
      title="Merge PDF"
      description="Combine multiple PDF files into a single document"
      icon={<FileText className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={true}
      processFunction={handleMerge}
      outputFilename="merged.pdf"
    />
  );
};

export default MergePdf;
