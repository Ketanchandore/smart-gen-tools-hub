
import React from 'react';
import { Share2 } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ArticleSocial = () => {
  return (
    <PlaceholderTool
      title="Article-to-Social Package"
      description="Convert articles to social media content in one click"
      icon={<Share2 className="h-8 w-8 text-primary" />}
    />
  );
};

export default ArticleSocial;
