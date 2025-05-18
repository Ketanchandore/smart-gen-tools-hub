
import React from 'react';
import { Copy } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const SmartCopy = () => {
  return (
    <PlaceholderTool
      title="Smart Copy Generator"
      description="Generate intelligent copy for various marketing purposes"
      icon={<Copy className="h-8 w-8 text-primary" />}
    />
  );
};

export default SmartCopy;
