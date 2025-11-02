import React from 'react';
import { Circle, Clock, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Step {
  title: string;
  description: string;
}

interface PDFToolHowToUseProps {
  steps: Step[];
  estimatedTime: string;
  tips: string[];
}

const PDFToolHowToUse: React.FC<PDFToolHowToUseProps> = ({ steps, estimatedTime, tips }) => {
  return (
    <Card className="mt-12">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">How to Use</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {estimatedTime}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips for Best Results */}
        {tips.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Tips for Best Results
            </h3>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Circle className="h-2 w-2 mt-1.5 fill-primary text-primary flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFToolHowToUse;
