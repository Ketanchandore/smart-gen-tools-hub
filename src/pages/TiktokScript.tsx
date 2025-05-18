
import React from 'react';
import { FileText } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const TiktokScript = () => {
  return (
    <PlaceholderTool
      title="TikTok Script Writer"
      description="Create engaging scripts for your TikTok videos"
      icon={<FileText className="h-8 w-8 text-primary" />}
    />
  );
};

export default TiktokScript;
