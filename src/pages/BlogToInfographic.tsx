
import React from 'react';
import { BarChart2 } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BlogToInfographic = () => {
  return (
    <PlaceholderTool
      title="Blog to Infographic Converter"
      description="Convert blog posts into visually appealing infographics"
      icon={<BarChart2 className="h-8 w-8 text-primary" />}
    />
  );
};

export default BlogToInfographic;
