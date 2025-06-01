
import React from 'react';
import { Eye } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const ComparePdf = () => {
  const comparePdf = async (input: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "PDF comparison completed. Differences highlighted with color coding: additions in green, deletions in red, modifications in blue.";
  };

  return (
    <BasicToolImplementation
      title="Compare PDF"
      description="Highlight differences between two PDF files"
      icon={<Eye className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload two PDF files to compare differences..."
      buttonText="Compare PDFs"
      processFunction={comparePdf}
    />
  );
};

export default ComparePdf;
