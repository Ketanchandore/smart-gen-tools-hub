
import React from 'react';
import { CloudCog } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const SaasName = () => {
  return (
    <PlaceholderTool
      title="SaaS Name & Domain Checker"
      description="Generate and check availability of SaaS names and domains"
      icon={<CloudCog className="h-8 w-8 text-primary" />}
    />
  );
};

export default SaasName;
