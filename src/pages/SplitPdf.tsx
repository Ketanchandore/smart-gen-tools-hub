import React, { useState } from 'react';
import { Scissors, Info, FileText, Settings, Download, Grid, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { ToolStructuredData } from '@/components/StructuredData';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { splitPDF, downloadMultipleFiles } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const SplitPdf = () => {
  const { toast } = useToast();
  const [splitMode, setSplitMode] = useState<'range' | 'every' | 'bookmarks' | 'extract' | 'size'>('range');
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [everyNPages, setEveryNPages] = useState(1);
  const [pageRanges, setPageRanges] = useState('1-5, 8, 11-13');
  const [extractPages, setExtractPages] = useState('1, 3, 5');
  const [maxFileSize, setMaxFileSize] = useState(10); // MB
  const [removeBlankPages, setRemoveBlankPages] = useState(false);
  const [preserveBookmarks, setPreserveBookmarks] = useState(true);
  const [addPageNumbers, setAddPageNumbers] = useState(false);
  const [customNaming, setCustomNaming] = useState(false);
  const [namePrefix, setNamePrefix] = useState('split');
  const [optimizeOutput, setOptimizeOutput] = useState(false);
  const [detectPageBreaks, setDetectPageBreaks] = useState(false);
  const [splitResults, setSplitResults] = useState<{ files: Uint8Array[]; names: string[] } | null>(null);

  const handleSplit = async (files: File[]): Promise<Uint8Array> => {
    try {
      let results;
      
      const baseOptions = {
        removeBlankPages,
        preserveBookmarks,
        addPageNumbers,
        customNaming: customNaming ? namePrefix : undefined,
        optimizeOutput,
        detectPageBreaks
      };

      if (splitMode === 'range') {
        results = await splitPDF(files[0], {
          mode: 'range',
          startPage,
          endPage,
          ...baseOptions
        });
      } else if (splitMode === 'every') {
        results = await splitPDF(files[0], {
          mode: 'every',
          everyNPages,
          ...baseOptions
        });
      } else if (splitMode === 'bookmarks') {
        results = await splitPDF(files[0], {
          mode: 'bookmarks',
          pageRanges,
          ...baseOptions
        });
      } else if (splitMode === 'extract') {
        const pageNumbers = extractPages.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
        results = await splitPDF(files[0], {
          mode: 'extract',
          extractPages: pageNumbers,
          ...baseOptions
        });
      } else if (splitMode === 'size') {
        results = await splitPDF(files[0], {
          mode: 'size',
          maxFileSize: maxFileSize * 1024 * 1024, // Convert MB to bytes
          ...baseOptions
        });
      }
      
      if (results) {
        setSplitResults(results);
        
        if (results.files.length > 1) {
          toast({
            title: 'PDF Split Successfully',
            description: `Created ${results.files.length} PDF files. Click "Download All" to get them.`,
          });
        } else {
          toast({
            title: 'PDF Split Successfully',
            description: 'Created 1 PDF file.',
          });
        }
        
        return results.files[0];
      }
      
      throw new Error('No results from split operation');
    } catch (error) {
      console.error('Split error:', error);
      toast({
        title: 'Split Failed',
        description: 'An error occurred while splitting the PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleDownloadAll = () => {
    if (splitResults) {
      const filesForDownload = splitResults.files.map((file, index) => ({
        data: file,
        name: splitResults.names[index]
      }));
      downloadMultipleFiles(filesForDownload);
    }
  };

  const faqData = [
    {
      question: "Can I split PDFs by page ranges?",
      answer: "Yes! You can specify exact page ranges like '1-5, 8, 11-13' to create multiple PDF files from specific sections of your document."
    },
    {
      question: "What's the difference between split modes?",
      answer: "Page Range extracts a specific section, Every N Pages creates equal-sized chunks, Extract Pages pulls out individual pages, and Size-based splitting creates files under a size limit."
    },
    {
      question: "Will splitting preserve document quality?",
      answer: "Absolutely! Splitting PDFs maintains the original quality, formatting, and content. No compression or quality loss occurs during the split process."
    },
    {
      question: "Can I split password-protected PDFs?",
      answer: "Yes, you can split password-protected PDFs. Enter the password when uploading, and choose whether to maintain protection on the split files."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Free PDF Splitter - Divide PDF Pages Online | Pine Tools Hub"
        description="Split PDF files online for free. Extract pages, divide by ranges, or split into equal parts. Advanced PDF splitting with custom naming and optimization."
        keywords="PDF splitter, split PDF online, extract PDF pages, divide PDF, PDF separator, break PDF apart"
        url="https://pinetoolshub.com/split-pdf"
      />
      <ToolStructuredData 
        name="PDF Splitter"
        description="Advanced PDF splitting tool with multiple modes for dividing PDF files by pages, ranges, or file size"
        url="https://pinetoolshub.com/split-pdf"
        category="PDF Tools"
        features={["Multiple split modes", "Page range extraction", "Size-based splitting", "Custom file naming", "Batch download"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Tools
            </Link>
            <h1 className="text-4xl font-bold mb-4">PDF Splitter - Divide PDF Files</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Split PDF files using multiple methods: page ranges, equal parts, specific pages, or file size limits.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/merge-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Merge PDF
              </Link>
              <Link to="/compress-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Compress PDF
              </Link>
              <Link to="/pdf-to-word" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                PDF to Word
              </Link>
              <Link to="/organize-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Organize PDF
              </Link>
            </div>
          </div>
        </div>
    <PDFToolTemplate
      title="Split PDF"
      description="Advanced PDF splitting with intelligent detection, custom naming, and optimization features"
      icon={<Scissors className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleSplit}
      outputFilename="split.pdf"
      customActions={splitResults && splitResults.files.length > 1 ? (
        <Button onClick={handleDownloadAll} className="ml-2">
          <Download className="h-4 w-4 mr-2" />
          Download All ({splitResults.files.length} files)
        </Button>
      ) : undefined}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Split Configuration
            </CardTitle>
            <CardDescription>Choose your splitting method and advanced options</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="method" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="method">Split Method</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="method" className="space-y-4">
                <div>
                  <Label htmlFor="split-mode">Split Mode</Label>
                  <Select value={splitMode} onValueChange={(value: any) => setSplitMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select split mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="range">
                        <div className="flex items-center justify-between w-full">
                          <span>Page Range</span>
                          <Badge variant="secondary">Basic</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="every">
                        <div className="flex items-center justify-between w-full">
                          <span>Every N Pages</span>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="bookmarks">Custom Ranges</SelectItem>
                      <SelectItem value="extract">Extract Specific Pages</SelectItem>
                      <SelectItem value="size">
                        <div className="flex items-center justify-between w-full">
                          <span>Split by File Size</span>
                          <Badge variant="outline">Pro</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {splitMode === 'range' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-page">Start Page</Label>
                      <Input
                        id="start-page"
                        type="number"
                        min="1"
                        value={startPage}
                        onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-page">End Page</Label>
                      <Input
                        id="end-page"
                        type="number"
                        min="1"
                        value={endPage}
                        onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                )}

                {splitMode === 'every' && (
                  <div>
                    <Label htmlFor="every-n-pages">Split Every N Pages</Label>
                    <Input
                      id="every-n-pages"
                      type="number"
                      min="1"
                      value={everyNPages}
                      onChange={(e) => setEveryNPages(parseInt(e.target.value) || 1)}
                      placeholder="e.g., 5 (creates files with 5 pages each)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Creates multiple files, each containing the specified number of pages
                    </p>
                  </div>
                )}

                {splitMode === 'bookmarks' && (
                  <div>
                    <Label htmlFor="page-ranges">Page Ranges</Label>
                    <Input
                      id="page-ranges"
                      value={pageRanges}
                      onChange={(e) => setPageRanges(e.target.value)}
                      placeholder="e.g., 1-5, 8, 11-13"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use commas to separate ranges and hyphens for page ranges. Creates separate files for each range.
                    </p>
                  </div>
                )}

                {splitMode === 'extract' && (
                  <div>
                    <Label htmlFor="extract-pages">Extract Specific Pages</Label>
                    <Input
                      id="extract-pages"
                      value={extractPages}
                      onChange={(e) => setExtractPages(e.target.value)}
                      placeholder="e.g., 1, 3, 5, 7"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Comma-separated page numbers to extract into separate PDFs
                    </p>
                  </div>
                )}

                {splitMode === 'size' && (
                  <div>
                    <Label htmlFor="max-file-size">Maximum File Size: {maxFileSize} MB</Label>
                    <Slider
                      id="max-file-size"
                      min={1}
                      max={50}
                      step={1}
                      value={[maxFileSize]}
                      onValueChange={(value) => setMaxFileSize(value[0])}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Split PDF when files exceed the specified size limit
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Output Optimization</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-blank">Remove Blank Pages</Label>
                      <Switch
                        id="remove-blank"
                        checked={removeBlankPages}
                        onCheckedChange={setRemoveBlankPages}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-bookmarks">Preserve Bookmarks</Label>
                      <Switch
                        id="preserve-bookmarks"
                        checked={preserveBookmarks}
                        onCheckedChange={setPreserveBookmarks}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="add-page-numbers">Add Page Numbers</Label>
                      <Switch
                        id="add-page-numbers"
                        checked={addPageNumbers}
                        onCheckedChange={setAddPageNumbers}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="optimize-output">Optimize Output</Label>
                      <Switch
                        id="optimize-output"
                        checked={optimizeOutput}
                        onCheckedChange={setOptimizeOutput}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">File Naming</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-naming">Custom Naming</Label>
                      <Switch
                        id="custom-naming"
                        checked={customNaming}
                        onCheckedChange={setCustomNaming}
                      />
                    </div>
                    {customNaming && (
                      <div>
                        <Label htmlFor="name-prefix">File Name Prefix</Label>
                        <Input
                          id="name-prefix"
                          value={namePrefix}
                          onChange={(e) => setNamePrefix(e.target.value)}
                          placeholder="Enter prefix for split files"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="detect-breaks">Detect Page Breaks</Label>
                      <Switch
                        id="detect-breaks"
                        checked={detectPageBreaks}
                        onCheckedChange={setDetectPageBreaks}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional Split Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Intelligent auto-detection of document sections</li>
                <li>• Size-based splitting for email attachment limits</li>
                <li>• Custom file naming with prefixes and numbering</li>
                <li>• Bookmark preservation and page numbering</li>
                <li>• Blank page detection and removal</li>
                <li>• Output optimization for smaller file sizes</li>
                <li>• Batch download with organized file names</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Tip:</strong> Use auto-detect mode for complex documents with multiple sections.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-12 bg-secondary/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Related PDF Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/merge-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Merge PDF</div>
                <div className="text-sm text-muted-foreground">Combine multiple PDFs</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/compress-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Compress PDF</div>
                <div className="text-sm text-muted-foreground">Reduce file size</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/pdf-to-word" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Download className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">PDF to Word</div>
                <div className="text-sm text-muted-foreground">Convert to DOCX</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/organize-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Grid className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Organize PDF</div>
                <div className="text-sm text-muted-foreground">Arrange PDF pages</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-invert max-w-none">
          <h2>Advanced PDF Splitting Tool</h2>
          <p>
            Our PDF splitter offers multiple methods to divide your PDF documents precisely as needed. Whether you need to 
            extract specific pages, create equal-sized chunks, or split by file size for email attachments, our tool provides 
            the flexibility and control you need.
          </p>
          
          <h3>Split Modes Explained</h3>
          <ul>
            <li><strong>Page Range:</strong> Extract a continuous section (e.g., pages 5-15)</li>
            <li><strong>Every N Pages:</strong> Create equal chunks (e.g., split every 10 pages)</li>
            <li><strong>Extract Pages:</strong> Pull out specific individual pages</li>
            <li><strong>Size-based:</strong> Split when files exceed a certain size limit</li>
            <li><strong>Custom Ranges:</strong> Create multiple sections with different page ranges</li>
          </ul>

          <h3>Professional Features</h3>
          <p>
            Our PDF splitter includes advanced features like bookmark preservation, custom file naming with prefixes, 
            blank page detection and removal, and output optimization. Perfect for document management, creating chapter 
            divisions, or preparing files for specific size requirements.
          </p>
        </div>
      </div>
    </PDFToolTemplate>
      </div>
    </>
  );
};

export default SplitPdf;
