
import React from 'react';
import { BookOpen } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const StudyNotes = () => {
  return (
    <PlaceholderTool
      title="Smart Study Notes Maker"
      description="Generate comprehensive study notes from your content"
      icon={<BookOpen className="h-8 w-8 text-primary" />}
    />
  );
};

export default StudyNotes;
