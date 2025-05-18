
import React from 'react';
import { Search } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ContentDetector = () => {
  return (
    <PlaceholderTool
      title="Content Detector"
      description="Detect AI-generated content or plagiarism in text"
      icon={<Search className="h-8 w-8 text-primary" />}
    />
  );
};

export default ContentDetector;
