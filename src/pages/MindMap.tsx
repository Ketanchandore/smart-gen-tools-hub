
import React from 'react';
import { Network } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const MindMap = () => {
  return (
    <PlaceholderTool
      title="Mind Map Generator"
      description="Create visual mind maps from your content"
      icon={<Network className="h-8 w-8 text-primary" />}
    />
  );
};

export default MindMap;
