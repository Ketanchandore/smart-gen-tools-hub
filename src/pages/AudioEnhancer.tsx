
import React from 'react';
import { Music } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const AudioEnhancer = () => {
  return (
    <PlaceholderTool
      title="Audio Enhancer"
      description="Enhance audio quality with background noise removal"
      icon={<Music className="h-8 w-8 text-primary" />}
    />
  );
};

export default AudioEnhancer;
