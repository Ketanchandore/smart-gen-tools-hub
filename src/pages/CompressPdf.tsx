
import React from 'react';
import { Minimize } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { compressPDF } from '@/utils/pdfUtils';

const CompressPdf = () => {
  const handleCompress = async (files: File[]): Promise<Uint8Array> => {
    return await compressPDF(files[0]);
  };

  return (
    <PDFToolTemplate
      title="Compress PDF"
      description="Reduce the file size of a PDF document while maintaining quality"
      icon={<Minimize className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleCompress}
      outputFilename="compressed.pdf"
    />
  );
};

export default CompressPdf;
