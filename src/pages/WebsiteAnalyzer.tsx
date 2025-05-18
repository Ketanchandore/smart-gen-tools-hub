
import React from 'react';
import { Globe } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const WebsiteAnalyzer = () => {
  return (
    <PlaceholderTool
      title="Website Analyzer"
      description="Analyze websites for SEO and UX improvements"
      icon={<Globe className="h-8 w-8 text-primary" />}
    />
  );
};

export default WebsiteAnalyzer;
