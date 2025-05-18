
import React from 'react';
import { Code2 } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const CodeExplainer = () => {
  return (
    <PlaceholderTool
      title="Code Explainer"
      description="Get detailed explanations of code snippets"
      icon={<Code2 className="h-8 w-8 text-primary" />}
    />
  );
};

export default CodeExplainer;
