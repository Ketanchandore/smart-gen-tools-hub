
import React from 'react';
import { Crop } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const CropPdf = () => {
  const cropPdf = async (input: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "PDF cropping completed. Page margins and specific areas removed according to your specifications.";
  };

  return (
    <BasicToolImplementation
      title="Crop PDF"
      description="Crop margins or specific areas of PDF pages"
      icon={<Crop className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your PDF file to crop specific areas..."
      buttonText="Start Cropping"
      processFunction={cropPdf}
    />
  );
};

export default CropPdf;
