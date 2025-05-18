
import React from 'react';
import { StickyNote } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const FlashcardGenerator = () => {
  return (
    <PlaceholderTool
      title="AI Flashcard Generator"
      description="Generate study flashcards from your content"
      icon={<StickyNote className="h-8 w-8 text-primary" />}
    />
  );
};

export default FlashcardGenerator;
