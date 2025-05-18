
import React from 'react';
import { BarChart } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ResumeScore = () => {
  return (
    <PlaceholderTool
      title="Resume Score Analyzer"
      description="Get detailed feedback and scoring for your resume"
      icon={<BarChart className="h-8 w-8 text-primary" />}
    />
  );
};

export default ResumeScore;
