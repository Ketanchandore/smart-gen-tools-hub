
import React, { useState } from 'react';
import { FileText, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { convertHtmlToPdf } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const HtmlToPdf = () => {
  const { toast } = useToast();
  const [htmlContent, setHtmlContent] = useState('<h1>Hello World</h1><p>This is a sample HTML content.</p>');
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState(20);
  const [includeBackground, setIncludeBackground] = useState(true);
  const [printMediaType, setPrintMediaType] = useState(true);

  const handleConvert = async (files: File[]): Promise<Uint8Array> => {
    try {
      const result = await convertHtmlToPdf(htmlContent);
      
      toast({
        title: 'HTML to PDF Conversion Complete',
        description: 'Your HTML content has been converted to PDF successfully',
      });

      return result;
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion Failed',
        description: 'An error occurred while converting HTML to PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <PDFToolTemplate
      title="HTML to PDF"
      description="Convert HTML content to professional PDF documents with advanced formatting options"
      icon={<FileText className="h-8 w-8 text-primary" />}
      acceptFiles=".html,.htm"
      multiple={false}
      processFunction={handleConvert}
      outputFilename="converted.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>HTML Content</CardTitle>
            <CardDescription>Enter your HTML content or upload an HTML file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="html-content">HTML Content</Label>
              <Textarea
                id="html-content"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Enter your HTML content here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PDF Settings</CardTitle>
            <CardDescription>Configure the PDF output format and styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page-size">Page Size</Label>
                <Select value={pageSize} onValueChange={(value: any) => setPageSize(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                    <SelectItem value="Letter">Letter (8.5 × 11 in)</SelectItem>
                    <SelectItem value="Legal">Legal (8.5 × 14 in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="orientation">Orientation</Label>
                <Select value={orientation} onValueChange={(value: any) => setOrientation(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="margin">Page Margin (mm)</Label>
              <Input
                id="margin"
                type="number"
                min="0"
                max="50"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value) || 20)}
              />
            </div>

            <div className="space-y-3">
              <Label>Conversion Options</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-background"
                  checked={includeBackground}
                  onCheckedChange={(checked) => setIncludeBackground(checked as boolean)}
                />
                <Label htmlFor="include-background" className="text-sm">
                  Include background graphics and colors
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="print-media"
                  checked={printMediaType}
                  onCheckedChange={(checked) => setPrintMediaType(checked as boolean)}
                />
                <Label htmlFor="print-media" className="text-sm">
                  Use print media type for CSS styling
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Conversion Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Page Size: {pageSize} ({orientation})</p>
            <p>Margin: {margin}mm</p>
            <p>Background Graphics: {includeBackground ? 'Included' : 'Excluded'}</p>
            <p>Print Styles: {printMediaType ? 'Applied' : 'Not Applied'}</p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>HTML to PDF Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Full CSS support including media queries</li>
                <li>• Responsive design conversion</li>
                <li>• Custom page breaks and formatting</li>
                <li>• Font embedding for consistent rendering</li>
                <li>• Table and complex layout support</li>
                <li>• Print-optimized styling options</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Tip:</strong> Use CSS @media print rules for optimal PDF formatting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default HtmlToPdf;
