
import React from 'react';
import { Layers } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BlogToCarousel = () => {
  return (
    <PlaceholderTool
      title="Blog to Instagram Carousel"
      description="Convert blog posts into Instagram carousel content"
      icon={<Layers className="h-8 w-8 text-primary" />}
    />
  );
};

export default BlogToCarousel;
