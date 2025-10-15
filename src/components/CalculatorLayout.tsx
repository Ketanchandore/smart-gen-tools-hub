import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Share2, Printer, History, Info } from 'lucide-react';
import { useCalculatorHistory } from '@/hooks/useCalculatorHistory';
import { toast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  calculatorId: string;
  calculatorPath: string;
  formula?: string;
  howToUse?: string[];
  examples?: Array<{ title: string; description: string }>;
  onShare?: () => void;
  onPrint?: () => void;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  title,
  description,
  calculatorId,
  calculatorPath,
  formula,
  howToUse,
  examples,
  onShare,
  onPrint
}) => {
  const { favorites, toggleFavorite, isFavorite } = useCalculatorHistory(calculatorId);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast({ title: "Link copied to clipboard!" });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    }
    onShare?.();
  };

  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  const handleFavorite = () => {
    toggleFavorite({
      id: calculatorId,
      name: title,
      path: calculatorPath
    });
    toast({ 
      title: isFavorite(calculatorId) ? "Removed from favorites" : "Added to favorites" 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={isFavorite(calculatorId) ? "default" : "outline"} 
              size="icon"
              onClick={handleFavorite}
              title="Add to favorites"
            >
              <Star className={isFavorite(calculatorId) ? "fill-current" : ""} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare} title="Share calculator">
              <Share2 />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrint} title="Print results">
              <Printer />
            </Button>
          </div>
        </div>
      </div>

      {/* Calculator Content */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card className="p-6">
            {children}
          </Card>
        </div>

        {/* Sidebar with Formula and How to Use */}
        <div className="space-y-4">
          {formula && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Formula</h3>
              </div>
              <p className="text-sm font-mono bg-muted p-3 rounded">{formula}</p>
            </Card>
          )}

          {howToUse && howToUse.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">How to Use</h3>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                {howToUse.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Card>
          )}

          {examples && examples.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Examples</h3>
              <div className="space-y-3">
                {examples.map((example, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium mb-1">{example.title}</p>
                    <p className="text-muted-foreground">{example.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Educational Content Section */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              <Info className="mr-2 h-4 w-4" />
              Learn More About This Calculator
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Understanding the Calculation</h3>
                  <p className="text-muted-foreground">
                    This calculator helps you quickly and accurately perform calculations that would otherwise 
                    require complex formulas and multiple steps. All calculations are performed in real-time 
                    as you enter values, providing instant results.
                  </p>
                </div>
                {formula && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">The Formula Explained</h3>
                    <p className="text-muted-foreground mb-2">
                      The calculation uses the following formula:
                    </p>
                    <p className="font-mono bg-muted p-3 rounded text-sm">{formula}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">Tips for Accurate Results</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Double-check all input values before calculating</li>
                    <li>Use the print feature to save your results for future reference</li>
                    <li>Bookmark this calculator for quick access</li>
                    <li>Share the calculator with others who might find it useful</li>
                  </ul>
                </div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default CalculatorLayout;
