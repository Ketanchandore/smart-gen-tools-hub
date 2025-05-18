
import React from 'react';
import { FileText } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const CoverLetter = () => {
  return (
    <PlaceholderTool
      title="Cover Letter Generator"
      description="Create personalized cover letters tailored to specific job positions"
      icon={<FileText className="h-8 w-8 text-primary" />}
    />
  );
};

export default CoverLetter;
