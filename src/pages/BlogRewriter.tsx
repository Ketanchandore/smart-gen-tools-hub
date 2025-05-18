
import React from 'react';
import { RefreshCw } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BlogRewriter = () => {
  return (
    <PlaceholderTool
      title="Blog Rewriter + SEO Optimizer"
      description="Rewrite and optimize your blog content for SEO"
      icon={<RefreshCw className="h-8 w-8 text-primary" />}
    />
  );
};

export default BlogRewriter;
