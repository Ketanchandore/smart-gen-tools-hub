
import React from 'react';
import { ClipboardList } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const SurveyCreator = () => {
  return (
    <PlaceholderTool
      title="AI Survey Creator"
      description="Create effective surveys with AI assistance"
      icon={<ClipboardList className="h-8 w-8 text-primary" />}
    />
  );
};

export default SurveyCreator;
