
import React from 'react';
import { Quote } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const TaglineGenerator = () => {
  return (
    <PlaceholderTool
      title="Tagline + Slogan Generator"
      description="Create catchy taglines and slogans for your brand"
      icon={<Quote className="h-8 w-8 text-primary" />}
    />
  );
};

export default TaglineGenerator;
