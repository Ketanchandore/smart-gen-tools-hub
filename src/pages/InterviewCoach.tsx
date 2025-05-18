
import React from 'react';
import { MessageSquare } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const InterviewCoach = () => {
  return (
    <PlaceholderTool
      title="Interview Coach"
      description="Practice for job interviews with AI-powered mock interviews"
      icon={<MessageSquare className="h-8 w-8 text-primary" />}
    />
  );
};

export default InterviewCoach;
