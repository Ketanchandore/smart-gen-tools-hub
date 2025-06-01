
import React from 'react';
import { FileImage, FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';

const JpgToPdf = () => {
  const handleConvert = async (files: File[]): Promise<Uint8Array> => {
    if (files.length === 0) {
      throw new Error('Please select at least one image file');
    }
    
    // Convert first image file for now
    return await PDFProcessor.convertImageToPDF(files[0]);
  };

  return (
    <PDFToolTemplate
      title="JPG to PDF"
      description="Convert JPG, PNG, and other image formats into PDF documents"
      icon={<FileImage className="h-8 w-8 text-primary" />}
      onProcess={handleConvert}
      acceptMultiple={true}
      outputFilename="images-to-pdf.pdf"
    />
  );
};

export default JpgToPdf;
