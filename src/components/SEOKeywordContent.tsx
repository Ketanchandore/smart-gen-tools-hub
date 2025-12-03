import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Shield, Clock, Globe, Star } from 'lucide-react';

interface SEOKeywordContentProps {
  toolName: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  benefits: Array<{ title: string; description: string }>;
  useCases: Array<{ title: string; description: string }>;
  howItWorks: Array<{ step: number; title: string; description: string }>;
}

const SEOKeywordContent: React.FC<SEOKeywordContentProps> = ({
  toolName,
  primaryKeyword,
  longTailKeywords,
  benefits,
  useCases,
  howItWorks
}) => {
  return (
    <div className="space-y-12 mt-12">
      {/* What is Section - Primary Keyword Focus */}
      <section className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-4">What is {toolName}?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {toolName} is a free online tool that allows you to {primaryKeyword.toLowerCase()} quickly and easily. 
          Whether you need to {longTailKeywords[0]?.toLowerCase() || primaryKeyword.toLowerCase()} for work, 
          school, or personal use, our {toolName.toLowerCase()} provides professional results without 
          requiring any software installation or registration.
        </p>
      </section>

      {/* Key Benefits - Natural Keyword Integration */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Why Use Our {toolName}?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {index === 0 && <Zap className="h-5 w-5 text-primary" />}
                  {index === 1 && <Shield className="h-5 w-5 text-primary" />}
                  {index === 2 && <Clock className="h-5 w-5 text-primary" />}
                  {index === 3 && <Globe className="h-5 w-5 text-primary" />}
                  {index === 4 && <Star className="h-5 w-5 text-primary" />}
                  {index >= 5 && <CheckCircle className="h-5 w-5 text-primary" />}
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Use - Long Tail Keywords */}
      <section className="bg-muted/30 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6">How to {primaryKeyword}</h2>
        <div className="space-y-6">
          {howItWorks.map((step) => (
            <div key={step.step} className="flex gap-4">
              <span className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                {step.step}
              </span>
              <div>
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases - Target Different Search Intents */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Common Use Cases for {toolName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                {useCase.title}
              </h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features List - Additional Keywords */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Features of Our Free {toolName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {longTailKeywords.map((keyword, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm">{keyword}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SEOKeywordContent;
