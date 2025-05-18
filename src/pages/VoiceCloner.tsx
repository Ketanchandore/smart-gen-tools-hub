
import React from 'react';
import { Mic } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const VoiceCloner = () => {
  return (
    <PlaceholderTool
      title="Voice Cloner"
      description="Clone voices using advanced AI technology"
      icon={<Mic className="h-8 w-8 text-primary" />}
    />
  );
};

export default VoiceCloner;
