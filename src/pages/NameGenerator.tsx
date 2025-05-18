
import React from 'react';
import { Tag } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const NameGenerator = () => {
  return (
    <PlaceholderTool
      title="AI Name Generator"
      description="Generate creative names for brands and products"
      icon={<Tag className="h-8 w-8 text-primary" />}
    />
  );
};

export default NameGenerator;
