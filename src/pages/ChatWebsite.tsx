
import React from 'react';
import { Globe } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ChatWebsite = () => {
  return (
    <PlaceholderTool
      title="Chat with Website"
      description="Ask questions about any website's content using AI"
      icon={<Globe className="h-8 w-8 text-primary" />}
    />
  );
};

export default ChatWebsite;
