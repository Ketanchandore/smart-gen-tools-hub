
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface BasicToolImplementationProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  inputPlaceholder: string;
  buttonText: string;
  processFunction: (input: string) => string | Promise<string>;
}

const BasicToolImplementation: React.FC<BasicToolImplementationProps> = ({ 
  title, 
  description, 
  icon, 
  inputPlaceholder, 
  buttonText, 
  processFunction 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleProcess = async () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please provide some input to process",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await processFunction(input);
      setOutput(result);
      toast({
        title: "Success",
        description: "Your content has been processed",
      });
    } catch (error) {
      console.error('Error processing input:', error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing your input",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          {icon}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Input</h2>
              <Textarea
                placeholder={inputPlaceholder}
                className="min-h-[200px] mb-4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button 
                className="w-full" 
                onClick={handleProcess} 
                disabled={loading}
              >
                {loading ? "Processing..." : buttonText}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Output</h2>
              <div className="bg-muted p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                {output || "Your processed content will appear here..."}
              </div>
              {output && (
                <Button 
                  className="w-full mt-4"
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    toast({
                      title: "Copied!",
                      description: "Output copied to clipboard",
                    });
                  }}
                >
                  Copy to Clipboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BasicToolImplementation;
