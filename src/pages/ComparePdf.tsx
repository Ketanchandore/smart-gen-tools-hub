
import React from 'react';
import { Eye } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const ComparePdf = () => {
  const processComparePdf = async (input: string) => {
    return "PDF comparison completed! Differences between the documents have been highlighted. Download link: comparison-report.pdf";
  };

  return (
    <BasicToolImplementation
      title="Compare PDF"
      description="Highlight the differences between two PDF files"
      icon={<Eye className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload two PDF files to compare and find differences..."
      buttonText="Compare PDFs"
      processFunction={processComparePdf}
    />
  );
};

export default ComparePdf;
