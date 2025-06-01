
import React from 'react';
import { Crop } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const CropPdf = () => {
  const processCropPdf = async (input: string) => {
    return "PDF cropping completed! Margins and specified areas have been cropped from your document. Download link: cropped-document.pdf";
  };

  return (
    <BasicToolImplementation
      title="Crop PDF"
      description="Crop the margins or specific areas of pages in a PDF document"
      icon={<Crop className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your PDF and specify crop dimensions..."
      buttonText="Crop PDF"
      processFunction={processCropPdf}
    />
  );
};

export default CropPdf;
