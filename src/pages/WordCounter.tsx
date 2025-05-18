
import React from 'react';
import { Hash } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const WordCounter = () => {
  return (
    <PlaceholderTool
      title="Word Counter + Keyword Extractor"
      description="Count words and extract key phrases from your content"
      icon={<Hash className="h-8 w-8 text-primary" />}
    />
  );
};

export default WordCounter;
