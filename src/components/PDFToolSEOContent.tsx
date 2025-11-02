import React from 'react';
import { FileText, Shield, Zap, CheckCircle2, FileType } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PDFToolSEOContentProps {
  toolName: string;
  whatIsIt: {
    title: string;
    description: string;
  };
  benefits: string[];
  features: string[];
  formats?: string[];
  security: {
    title: string;
    points: string[];
  };
}

const PDFToolSEOContent: React.FC<PDFToolSEOContentProps> = ({
  toolName,
  whatIsIt,
  benefits,
  features,
  formats,
  security,
}) => {
  return (
    <div className="mt-12 space-y-8">
      {/* What is [Tool Name] */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          {whatIsIt.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {whatIsIt.description}
        </p>
      </section>

      {/* Benefits and Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Key Benefits
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Features
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* File Format Support */}
      {formats && formats.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileType className="h-5 w-5 text-primary" />
              Supported File Formats
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our {toolName} supports all standard PDF formats and ensures compatibility with:
            </p>
            <div className="flex flex-wrap gap-2">
              {formats.map((format, index) => (
                <span key={index} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                  {format}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security and Privacy */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {security.title}
          </h3>
          <ul className="space-y-3">
            {security.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFToolSEOContent;
