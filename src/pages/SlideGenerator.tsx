
import React from 'react';
import { Presentation } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const SlideGenerator = () => {
  return (
    <PlaceholderTool
      title="Slide Generator from Text"
      description="Convert text content into presentation slides"
      icon={<Presentation className="h-8 w-8 text-primary" />}
    />
  );
};

export default SlideGenerator;
