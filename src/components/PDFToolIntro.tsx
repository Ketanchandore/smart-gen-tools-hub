import React from 'react';
import { CheckCircle2, Shield, Zap, Clock } from 'lucide-react';

interface PDFToolIntroProps {
  title: string;
  description: string;
  benefits: string[];
  whyUse: {
    title: string;
    points: string[];
  };
}

const PDFToolIntro: React.FC<PDFToolIntroProps> = ({ title, description, benefits, whyUse }) => {
  return (
    <div className="space-y-6 mb-8">
      {/* Introduction Paragraph */}
      <div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.slice(0, 3).map((benefit, index) => {
          const icons = [
            <Zap className="h-5 w-5 text-primary" />,
            <Shield className="h-5 w-5 text-primary" />,
            <Clock className="h-5 w-5 text-primary" />
          ];
          return (
            <div key={index} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {icons[index]}
              </div>
              <div>
                <p className="text-sm font-medium">{benefit}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Use Our Tool Section */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-lg p-6 border border-primary/10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          {whyUse.title}
        </h2>
        <ul className="space-y-3">
          {whyUse.points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PDFToolIntro;
