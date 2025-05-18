
import React from 'react';
import { Youtube } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const YoutubeSummarizer = () => {
  return (
    <PlaceholderTool
      title="YouTube Video Summarizer"
      description="Get AI-generated summaries of YouTube videos"
      icon={<Youtube className="h-8 w-8 text-primary" />}
    />
  );
};

export default YoutubeSummarizer;
