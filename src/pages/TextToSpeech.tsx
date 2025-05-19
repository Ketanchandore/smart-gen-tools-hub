
import React from 'react';
import { Headphones } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const TextToSpeech = () => {
  return (
    <PlaceholderTool
      title="Text to Speech"
      description="Convert text to natural-sounding speech with AI voices"
      icon={<Headphones className="h-8 w-8 text-primary" />}
    />
  );
};

export default TextToSpeech;
