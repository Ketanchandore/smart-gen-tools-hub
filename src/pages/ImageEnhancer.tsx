
import React from 'react';
import { Wand2 } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ImageEnhancer = () => {
  return (
    <PlaceholderTool
      title="Image Enhancer / Background Remover"
      description="Enhance images and remove backgrounds with AI"
      icon={<Wand2 className="h-8 w-8 text-primary" />}
    />
  );
};

export default ImageEnhancer;
