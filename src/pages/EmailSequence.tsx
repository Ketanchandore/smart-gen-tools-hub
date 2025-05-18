
import React from 'react';
import { MailPlus } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const EmailSequence = () => {
  return (
    <PlaceholderTool
      title="Email Marketing Sequence Generator"
      description="Create effective email marketing sequences"
      icon={<MailPlus className="h-8 w-8 text-primary" />}
    />
  );
};

export default EmailSequence;
