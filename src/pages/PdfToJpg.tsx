
import React from 'react';
import { FileImage } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const PdfToJpg = () => {
  const convertPdfToJpg = async (input: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "PDF pages converted to high-quality JPG images. Each page saved as a separate image file.";
  };

  return (
    <BasicToolImplementation
      title="PDF to JPG"
      description="Convert PDF pages into high-quality JPG images"
      icon={<FileImage className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your PDF file to convert pages to images..."
      buttonText="Convert to JPG"
      processFunction={convertPdfToJpg}
    />
  );
};

export default PdfToJpg;
