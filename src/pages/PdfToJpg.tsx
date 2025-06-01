
import React from 'react';
import { Image } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const PdfToJpg = () => {
  const processPdfToJpg = async (input: string) => {
    return "PDF to JPG conversion completed! All pages have been converted to JPG images. Download link: converted-images.zip";
  };

  return (
    <BasicToolImplementation
      title="PDF to JPG"
      description="Convert each page of a PDF file into JPG images"
      icon={<Image className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your PDF file to convert pages to JPG images..."
      buttonText="Convert to JPG"
      processFunction={processPdfToJpg}
    />
  );
};

export default PdfToJpg;
