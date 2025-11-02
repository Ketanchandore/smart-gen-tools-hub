import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface PDFToolFAQProps {
  faqs: FAQ[];
}

const PDFToolFAQ: React.FC<PDFToolFAQProps> = ({ faqs }) => {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border rounded-lg px-6 bg-card"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              <span className="font-semibold pr-4">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PDFToolFAQ;
