
import React from 'react';
import { User } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const LinkedInBio = () => {
  return (
    <PlaceholderTool
      title="LinkedIn Profile Optimizer"
      description="Enhance your LinkedIn presence with AI-optimized content"
      icon={<User className="h-8 w-8 text-primary" />}
    />
  );
};

export default LinkedInBio;
