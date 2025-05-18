
import React from 'react';
import { PenTool } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BlogWriter = () => {
  return (
    <PlaceholderTool
      title="AI Blog Writer"
      description="Generate complete blog posts with AI assistance"
      icon={<PenTool className="h-8 w-8 text-primary" />}
    />
  );
};

export default BlogWriter;
