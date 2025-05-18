
import React from 'react';
import { Camera } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const SocialCaptions = () => {
  return (
    <PlaceholderTool
      title="Social Media Caption Generator"
      description="Create engaging captions for your social media posts"
      icon={<Camera className="h-8 w-8 text-primary" />}
    />
  );
};

export default SocialCaptions;
