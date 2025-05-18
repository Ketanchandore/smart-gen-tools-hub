
import React from 'react';
import { Image } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ChatImage = () => {
  return (
    <PlaceholderTool
      title="Chat with Image"
      description="Ask questions about images and get AI-powered answers"
      icon={<Image className="h-8 w-8 text-primary" />}
    />
  );
};

export default ChatImage;
