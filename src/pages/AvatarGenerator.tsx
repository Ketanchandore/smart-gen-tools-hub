
import React from 'react';
import { User } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const AvatarGenerator = () => {
  return (
    <PlaceholderTool
      title="AI Avatar/Character Generator"
      description="Create unique avatars and characters using AI"
      icon={<User className="h-8 w-8 text-primary" />}
    />
  );
};

export default AvatarGenerator;
