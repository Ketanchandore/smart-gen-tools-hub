
import React from 'react';
import { Briefcase } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const JobMatcher = () => {
  return (
    <PlaceholderTool
      title="Job Matcher"
      description="Find the perfect job match based on your resume and skills"
      icon={<Briefcase className="h-8 w-8 text-primary" />}
    />
  );
};

export default JobMatcher;
