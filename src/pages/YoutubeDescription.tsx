
import React from 'react';
import { YoutubeIcon, FileText } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const YoutubeDescription = () => {
  return (
    <PlaceholderTool
      title="YouTube Channel Description Generator"
      description="Generate SEO-friendly descriptions for YouTube channels"
      icon={<YoutubeIcon className="h-8 w-8 text-primary" />}
    />
  );
};

export default YoutubeDescription;
