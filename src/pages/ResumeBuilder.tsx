
import React from 'react';
import { Briefcase } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ResumeBuilder = () => {
  return (
    <PlaceholderTool
      title="AI Resume Builder"
      description="Create professional resumes tailored to job descriptions with AI assistance"
      icon={<Briefcase className="h-8 w-8 text-primary" />}
    />
  );
};

export default ResumeBuilder;
