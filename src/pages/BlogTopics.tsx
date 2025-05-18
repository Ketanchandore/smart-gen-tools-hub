
import React from 'react';
import { List } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BlogTopics = () => {
  return (
    <PlaceholderTool
      title="Blog Topic Generator"
      description="Generate engaging blog topic ideas for your content"
      icon={<List className="h-8 w-8 text-primary" />}
    />
  );
};

export default BlogTopics;
