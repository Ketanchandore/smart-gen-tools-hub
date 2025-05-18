
import React from 'react';
import { ImagePlus } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ImageToText = () => {
  return (
    <PlaceholderTool
      title="Image to Text Converter"
      description="Extract text from images using OCR technology"
      icon={<ImagePlus className="h-8 w-8 text-primary" />}
    />
  );
};

export default ImageToText;
