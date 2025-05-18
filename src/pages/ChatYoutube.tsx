
import React from 'react';
import { YoutubeIcon, MessageSquare } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ChatYoutube = () => {
  return (
    <PlaceholderTool
      title="Chat with YouTube Video"
      description="Ask questions about YouTube videos and get AI-powered answers"
      icon={<YoutubeIcon className="h-8 w-8 text-primary" />}
    />
  );
};

export default ChatYoutube;
