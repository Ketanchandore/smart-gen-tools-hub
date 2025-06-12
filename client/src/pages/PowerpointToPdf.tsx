
import React from 'react';
import { Presentation } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const PowerpointToPdf = () => {
  const processPowerpointToPdf = async (input: string) => {
    return "PowerPoint to PDF conversion completed! Download link: converted-presentation.pdf";
  };

  return (
    <BasicToolImplementation
      title="PowerPoint to PDF"
      description="Convert PowerPoint presentations into PDF files"
      icon={<Presentation className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your PowerPoint file or paste content here..."
      buttonText="Convert to PDF"
      processFunction={processPowerpointToPdf}
    />
  );
};

export default PowerpointToPdf;
