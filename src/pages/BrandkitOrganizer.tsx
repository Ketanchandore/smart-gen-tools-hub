
import React from 'react';
import { Palette } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const BrandkitOrganizer = () => {
  return (
    <PlaceholderTool
      title="BrandKit Organizer"
      description="Organize and maintain your brand assets in one place"
      icon={<Palette className="h-8 w-8 text-primary" />}
    />
  );
};

export default BrandkitOrganizer;
