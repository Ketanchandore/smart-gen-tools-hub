
import React from 'react';
import { Video } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const VideoSummarizer = () => {
  return (
    <PlaceholderTool
      title="Video/Podcast Summarizer"
      description="Generate concise summaries of videos and podcasts"
      icon={<Video className="h-8 w-8 text-primary" />}
    />
  );
};

export default VideoSummarizer;
