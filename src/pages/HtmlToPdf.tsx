
import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { convertHtmlToPdf } from '@/utils/pdfUtils';

const HtmlToPdf = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [htmlContent, setHtmlContent] = useState('<h1>Hello World</h1><p>This is a sample HTML content.</p>');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleConvert = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: 'No HTML content',
        description: 'Please enter HTML content to convert',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);
    try {
      const pdfBytes = await convertHtmlToPdf(htmlContent);
      setResult(pdfBytes);
      toast({
        title: 'Conversion complete',
        description: 'HTML has been converted to PDF successfully',
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion failed',
        description: 'An error occurred while converting HTML to PDF',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'html-to-pdf.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
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
          <Globe className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">HTML to PDF</h1>
        <p className="text-muted-foreground mt-2">Convert web pages (HTML) into PDF files</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>HTML Content</CardTitle>
          <CardDescription>Enter the HTML content you want to convert to PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="html-content">HTML Content</Label>
              <Textarea
                id="html-content"
                className="min-h-[200px]"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Enter your HTML content here..."
              />
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleConvert} 
                disabled={!htmlContent.trim() || processing} 
                className="bg-primary flex items-center gap-2"
              >
                {processing ? 'Converting...' : 'Convert to PDF'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Conversion Complete</CardTitle>
            <CardDescription>Your HTML has been successfully converted to PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button 
                onClick={handleDownload}
                className="bg-primary flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HtmlToPdf;
