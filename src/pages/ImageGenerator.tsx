
import React from 'react';
import { ImageIcon } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ImageGenerator = () => {
  return (
    <PlaceholderTool
      title="AI Image Generator"
      description="Generate images from text prompts using AI"
      icon={<ImageIcon className="h-8 w-8 text-primary" />}
    />
  );
};

export default ImageGenerator;
