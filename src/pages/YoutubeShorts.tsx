
import React from 'react';
import { Video } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const YoutubeShorts = () => {
  return (
    <PlaceholderTool
      title="YouTube Shorts Generator"
      description="Create engaging short-form content for YouTube"
      icon={<Video className="h-8 w-8 text-primary" />}
    />
  );
};

export default YoutubeShorts;
