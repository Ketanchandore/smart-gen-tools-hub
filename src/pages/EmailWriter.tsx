
import React from 'react';
import { Mail } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const EmailWriter = () => {
  return (
    <PlaceholderTool
      title="Smart Email Writer"
      description="Generate professional emails based on your goals"
      icon={<Mail className="h-8 w-8 text-primary" />}
    />
  );
};

export default EmailWriter;
