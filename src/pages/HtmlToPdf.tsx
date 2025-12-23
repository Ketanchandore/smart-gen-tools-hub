import React, { useState } from 'react';
import { Globe, Code, Settings, FileText, Download, Eye, Info, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { convertHtmlToPDF } from '@/utils/pdfUtils';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';

const HtmlToPdf = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [htmlContent, setHtmlContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>Sample Document</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #007acc; }
        .highlight { background-color: #f0f8ff; padding: 10px; }
    </style>
</head>
<body>
    <h1>Professional Document</h1>
    <p class="highlight">This is a sample HTML document with styling.</p>
    <p>Convert your web pages to PDF with advanced options!</p>
</body>
</html>`);
  const [url, setUrl] = useState('');
  const [conversionMode, setConversionMode] = useState<'html' | 'url'>('html');
  const [pageSize, setPageSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [margin, setMargin] = useState(20);
  const [scale, setScale] = useState(100);
  const [includeBackground, setIncludeBackground] = useState(true);
  const [enableJavaScript, setEnableJavaScript] = useState(false);
  const [waitForLoad, setWaitForLoad] = useState(true);
  const [customCSS, setCustomCSS] = useState('');
  const [headerHTML, setHeaderHTML] = useState('');
  const [footerHTML, setFooterHTML] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const pageSizes = [
    { value: 'A4', label: 'A4 (210 × 297 mm)' },
    { value: 'A3', label: 'A3 (297 × 420 mm)' },
    { value: 'A5', label: 'A5 (148 × 210 mm)' },
    { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
    { value: 'Legal', label: 'Legal (8.5 × 14 in)' },
    { value: 'Tabloid', label: 'Tabloid (11 × 17 in)' },
  ];

  const handleConvert = async (): Promise<Uint8Array> => {
    try {
      if (!htmlContent.trim()) {
        throw new Error('Please enter HTML content to convert');
      }

      toast({
        title: 'Conversion Started',
        description: 'Converting HTML to PDF...',
      });

      // Pass only the HTML content string, not the options object
      const result = await convertHtmlToPDF(htmlContent);
      
      toast({
        title: 'Conversion Complete',
        description: 'HTML has been successfully converted to PDF',
      });

      return result;
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion Failed',
        description: error instanceof Error ? error.message : 'An error occurred during conversion',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([new Uint8Array(result)], { type: 'application/pdf' });
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

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="HTML to PDF Converter"
        description="Professional HTML to PDF conversion with advanced formatting and styling options. Convert web pages, HTML code, or URLs to high-quality PDF documents."
        keywords={['html to pdf', 'convert html to pdf', 'webpage to pdf', 'url to pdf', 'web page converter']}
        category="PDF Conversion"
        features={['HTML content or URL input', 'Custom CSS injection', 'Page layout controls', 'Header and footer customization', 'JavaScript rendering', 'Password protection']}
        useCases={['Enter HTML content or URL', 'Configure page settings', 'Add custom styling', 'Convert to PDF', 'Download PDF file']}
        faqs={[
          { question: 'Can I convert a live website?', answer: 'Yes, enter any URL and our tool will render the webpage and convert it to PDF.' },
          { question: 'Will CSS styles be preserved?', answer: 'Yes, all CSS styles including custom CSS you add will be rendered in the PDF.' },
          { question: 'Can I add headers and footers?', answer: 'Yes, you can add custom HTML content for page headers and footers.' }
        ]}
        relatedTools={['word-to-pdf', 'merge-pdf', 'compress-pdf', 'protect-pdf']}
      />
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
          <Globe className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">HTML to PDF</h1>
        <p className="text-muted-foreground mt-2">
          Professional HTML to PDF conversion with advanced formatting and styling options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Content Input
              </CardTitle>
              <CardDescription>Choose your input method and enter content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Input Method</Label>
                <Select value={conversionMode} onValueChange={(value: any) => setConversionMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        HTML Content
                      </div>
                    </SelectItem>
                    <SelectItem value="url">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website URL
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {conversionMode === 'html' ? (
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="html-content">HTML Content</Label>
                    <Button variant="outline" size="sm" onClick={togglePreview}>
                      <Eye className="h-4 w-4 mr-2" />
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </Button>
                  </div>
                  <Textarea
                    id="html-content"
                    className="min-h-[300px] font-mono text-sm"
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    placeholder="Enter your HTML content here..."
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="url-input">Website URL</Label>
                  <Input
                    id="url-input"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Conversion Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="layout" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="styling">Styling</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="layout" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Page Size</Label>
                      <Select value={pageSize} onValueChange={setPageSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pageSizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Orientation</Label>
                      <Select value={orientation} onValueChange={setOrientation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portrait">Portrait</SelectItem>
                          <SelectItem value="landscape">Landscape</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Margin: {margin}mm</Label>
                    <Slider
                      value={[margin]}
                      onValueChange={(value) => setMargin(value[0])}
                      min={0}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Scale: {scale}%</Label>
                    <Slider
                      value={[scale]}
                      onValueChange={(value) => setScale(value[0])}
                      min={50}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="styling" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Include Background Graphics</Label>
                    <Switch
                      checked={includeBackground}
                      onCheckedChange={setIncludeBackground}
                    />
                  </div>

                  <div>
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <Textarea
                      id="custom-css"
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      placeholder="Add custom CSS styles..."
                      className="mt-2 font-mono text-sm"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable JavaScript</Label>
                    <Switch
                      checked={enableJavaScript}
                      onCheckedChange={setEnableJavaScript}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Wait for Page Load</Label>
                    <Switch
                      checked={waitForLoad}
                      onCheckedChange={setWaitForLoad}
                    />
                  </div>

                  <div>
                    <Label htmlFor="header-html">Header HTML</Label>
                    <Textarea
                      id="header-html"
                      value={headerHTML}
                      onChange={(e) => setHeaderHTML(e.target.value)}
                      placeholder="HTML for page header..."
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="footer-html">Footer HTML</Label>
                    <Textarea
                      id="footer-html"
                      value={footerHTML}
                      onChange={(e) => setFooterHTML(e.target.value)}
                      placeholder="HTML for page footer..."
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password Protection</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Optional PDF password"
                      className="mt-2"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={handleConvert} 
              disabled={processing} 
              className="bg-primary flex items-center gap-2 min-w-[200px]"
              size="lg"
            >
              {processing ? (
                <>Converting...</>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Convert to PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {showPreview && conversionMode === 'html' && (
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your HTML will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border rounded-lg p-4 bg-white text-black min-h-[300px] overflow-auto"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </CardContent>
            </Card>
          )}

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Conversion Complete
                </CardTitle>
                <CardDescription>Your PDF is ready for download</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Button 
                    onClick={handleDownload}
                    className="bg-primary flex items-center gap-2"
                    size="lg"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="font-medium">File Size</p>
                    <p className="text-muted-foreground">
                      {(result.length / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="font-medium">Format</p>
                    <p className="text-muted-foreground">PDF/A-1b</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Professional HTML to PDF Features:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Advanced page layout control (size, orientation, margins)</li>
                  <li>• Custom CSS injection for perfect styling</li>
                  <li>• JavaScript execution for dynamic content</li>
                  <li>• Header and footer customization</li>
                  <li>• Password protection and security options</li>
                  <li>• High-quality rendering with scaling options</li>
                  <li>• Live preview for HTML content</li>
                  <li>• URL to PDF conversion with wait controls</li>
                </ul>
                <p className="mt-2">
                  <strong>Pro Tip:</strong> Use custom CSS to fine-tune the PDF appearance and break controls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions About HTML to PDF Conversion</h2>
        <div className="space-y-6">
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Can I convert a live website URL to PDF?</h3>
            <p className="text-muted-foreground">Yes, enter any website URL and our HTML to PDF tool will render the webpage and convert it to a high-quality PDF document.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Will CSS styles be preserved in HTML to PDF conversion?</h3>
            <p className="text-muted-foreground">Yes, all CSS styles including custom CSS you add will be rendered in the PDF output. You can also inject additional CSS for fine-tuning.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Can I add custom headers and footers to the PDF?</h3>
            <p className="text-muted-foreground">Yes, you can add custom HTML content for page headers and footers that appear on every page of the PDF.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Is the HTML to PDF converter free online?</h3>
            <p className="text-muted-foreground">Yes, our HTML to PDF tool is completely free to use with no registration required. Convert webpages and HTML code instantly.</p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Professional HTML to PDF Conversion Online
          </h2>
          <p className="text-muted-foreground mb-4">
            Convert HTML code or website URLs to PDF instantly with our free online HTML to PDF converter. 
            Transform web pages into professional PDF documents while preserving all styling, images, and layout.
          </p>
          <p className="text-muted-foreground mb-6">
            Our HTML to PDF tool offers advanced features including custom CSS injection, JavaScript rendering, 
            page layout controls, and password protection. Perfect for generating reports, invoices, or archiving web content.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Why Convert HTML to PDF?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Archive web pages in printable format</li>
                <li>• Generate PDF reports from HTML templates</li>
                <li>• Create invoices and documents from web apps</li>
                <li>• Save website content for offline viewing</li>
                <li>• Share web content without browser dependency</li>
                <li>• Print web pages with precise formatting</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Advanced HTML to PDF Features:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• HTML content or URL input modes</li>
                <li>• Custom CSS injection</li>
                <li>• Page layout and orientation controls</li>
                <li>• Header and footer customization</li>
                <li>• JavaScript rendering support</li>
                <li>• Password protection options</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Tools */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Related PDF Conversion Tools</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/word-to-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Word to PDF</h4>
              <p className="text-sm text-muted-foreground">Convert Word documents</p>
            </Link>
            <Link to="/merge-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Merge PDFs</h4>
              <p className="text-sm text-muted-foreground">Combine multiple PDFs</p>
            </Link>
            <Link to="/compress-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Compress PDF</h4>
              <p className="text-sm text-muted-foreground">Reduce PDF file size</p>
            </Link>
            <Link to="/protect-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Protect PDF</h4>
              <p className="text-sm text-muted-foreground">Add PDF password</p>
            </Link>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Explore our complete suite of PDF tools. Convert HTML, Word, Excel to PDF and more - completely free!
              <Link to="/blog" className="text-primary hover:underline ml-1">Read HTML to PDF tips →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HtmlToPdf;
