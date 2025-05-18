
import React from 'react';
import { Code } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const CodeGenerator = () => {
  return (
    <PlaceholderTool
      title="Code Generator"
      description="Generate code in multiple programming languages"
      icon={<Code className="h-8 w-8 text-primary" />}
    />
  );
};

export default CodeGenerator;
