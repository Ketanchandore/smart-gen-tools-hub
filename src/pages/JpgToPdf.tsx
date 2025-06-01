
import React from 'react';
import { Image } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { convertImagesToPdf } from '@/utils/pdfUtils';

const JpgToPdf = () => {
  const handleConvert = async (files: File[]): Promise<Uint8Array> => {
    return await convertImagesToPdf(files);
  };

  return (
    <PDFToolTemplate
      title="JPG to PDF"
      description="Convert JPG images into a PDF file with orientation options"
      icon={<Image className="h-8 w-8 text-primary" />}
      acceptFiles=".jpg,.jpeg,.png"
      multiple={true}
      processFunction={handleConvert}
      outputFilename="images.pdf"
    />
  );
};

export default JpgToPdf;
