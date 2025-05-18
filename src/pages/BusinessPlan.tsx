
import React from 'react';
import { FileText } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BusinessPlan = () => {
  return (
    <PlaceholderTool
      title="AI-based Business Plan Generator"
      description="Create comprehensive business plans with AI assistance"
      icon={<FileText className="h-8 w-8 text-primary" />}
    />
  );
};

export default BusinessPlan;
