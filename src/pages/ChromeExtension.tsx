
import React from 'react';
import { Chrome } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ChromeExtension = () => {
  return (
    <PlaceholderTool
      title="Chrome Extension Idea Generator"
      description="Generate innovative ideas for Chrome extensions"
      icon={<Chrome className="h-8 w-8 text-primary" />}
    />
  );
};

export default ChromeExtension;
