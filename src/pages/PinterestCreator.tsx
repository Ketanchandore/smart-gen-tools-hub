
import React from 'react';
import { Image } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const PinterestCreator = () => {
  return (
    <PlaceholderTool
      title="Pinterest Pin Creator"
      description="Create eye-catching Pinterest pins with AI"
      icon={<Image className="h-8 w-8 text-primary" />}
    />
  );
};

export default PinterestCreator;
