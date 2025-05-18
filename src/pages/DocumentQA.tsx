
import React from 'react';
import { FileQuestion } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const DocumentQA = () => {
  return (
    <PlaceholderTool
      title="Document Q&A"
      description="Chat with your PDFs and documents using AI"
      icon={<FileQuestion className="h-8 w-8 text-primary" />}
    />
  );
};

export default DocumentQA;
