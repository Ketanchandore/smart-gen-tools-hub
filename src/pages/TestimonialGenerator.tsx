
import React from 'react';
import { MessageCircle } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const TestimonialGenerator = () => {
  return (
    <PlaceholderTool
      title="Testimonial Generator"
      description="Create persuasive testimonials for your products or services"
      icon={<MessageCircle className="h-8 w-8 text-primary" />}
    />
  );
};

export default TestimonialGenerator;
