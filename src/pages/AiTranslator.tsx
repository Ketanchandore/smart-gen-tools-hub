
import React from 'react';
import { Globe } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const AiTranslator = () => {
  return (
    <PlaceholderTool
      title="AI-powered Translator"
      description="Translate text between multiple languages with AI"
      icon={<Globe className="h-8 w-8 text-primary" />}
    />
  );
};

export default AiTranslator;
