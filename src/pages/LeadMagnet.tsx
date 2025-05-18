
import React from 'react';
import { Magnet } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const LeadMagnet = () => {
  return (
    <PlaceholderTool
      title="Lead Magnet Creator"
      description="Create valuable lead magnets for your marketing"
      icon={<Magnet className="h-8 w-8 text-primary" />}
    />
  );
};

export default LeadMagnet;
