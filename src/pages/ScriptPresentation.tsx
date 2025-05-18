
import React from 'react';
import { Presentation } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ScriptPresentation = () => {
  return (
    <PlaceholderTool
      title="Script + Presentation Generator"
      description="Generate scripts and presentations for your content"
      icon={<Presentation className="h-8 w-8 text-primary" />}
    />
  );
};

export default ScriptPresentation;
