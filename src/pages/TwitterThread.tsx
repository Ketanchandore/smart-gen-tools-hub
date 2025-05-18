
import React from 'react';
import { Twitter } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const TwitterThread = () => {
  return (
    <PlaceholderTool
      title="AI Twitter Thread Generator"
      description="Create engaging Twitter threads with AI assistance"
      icon={<Twitter className="h-8 w-8 text-primary" />}
    />
  );
};

export default TwitterThread;
