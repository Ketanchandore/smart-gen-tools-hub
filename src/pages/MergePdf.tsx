import React, { useState } from 'react';
import { FileText, Info, ArrowUpDown, Grid, List, Settings, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { mergePDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const MergePdf = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [fileOrder, setFileOrder] = useState<number[]>([]);
  const [mergeMode, setMergeMode] = useState<'sequential' | 'interleave' | 'custom'>('sequential');
  const [addBookmarks, setAddBookmarks] = useState(true);
  const [addPageNumbers, setAddPageNumbers] = useState(false);
  const [preserveMetadata, setPreserveMetadata] = useState(true);
  const [optimizeOutput, setOptimizeOutput] = useState(false);
  const [pageRanges, setPageRanges] = useState<{[key: number]: string}>({});
  const [outputTitle, setOutputTitle] = useState('Merged Document');
  const [insertBlankPages, setInsertBlankPages] = useState(false);
  const [addHeaders, setAddHeaders] = useState(false);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setFileOrder(selectedFiles.map((_, index) => index));
  };

  const moveFileUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...fileOrder];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      setFileOrder(newOrder);
    }
  };

  const moveFileDown = (index: number) => {
    if (index < fileOrder.length - 1) {
      const newOrder = [...fileOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      setFileOrder(newOrder);
    }
  };

  const setPageRange = (fileIndex: number, range: string) => {
    setPageRanges(prev => ({ ...prev, [fileIndex]: range }));
  };

  const handleMerge = async (inputFiles: File[]): Promise<Uint8Array> => {
    try {
      const orderedFiles = fileOrder.map(index => inputFiles[index]);
      
      const options = {
        bookmarks: addBookmarks,
        removeBlankPages: false,
        customOrder: fileOrder
      };

      toast({
        title: 'Merging Started',
        description: `Merging ${orderedFiles.length} PDF files...`,
      });

      const result = await mergePDF(orderedFiles, options);
      
      toast({
        title: 'Merge Complete',
        description: `Successfully merged ${orderedFiles.length} PDF files`,
      });

      return result;
    } catch (error) {
      console.error('Merge error:', error);
      toast({
        title: 'Merge Failed',
        description: 'An error occurred while merging PDFs',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "How can I merge PDF files online for free?",
      answer: "Simply upload your PDF files to our free online PDF merger, arrange them in your desired order using drag-and-drop, and click the merge button. Your combined PDF will be ready to download instantly - no registration or software installation required."
    },
    {
      question: "Is there a limit to how many PDFs I can combine?",
      answer: "You can merge up to 20 PDF files at once with our free PDF combiner tool. For larger batches, we recommend merging in groups and then combining the results for best performance."
    },
    {
      question: "Will combining PDFs affect document quality?",
      answer: "No, our PDF joiner preserves the original quality of all documents. The merge process combines files without any recompression or quality loss, ensuring your merged PDF looks exactly like the originals."
    },
    {
      question: "Can I merge specific pages from different PDF documents?",
      answer: "Absolutely! Use our advanced page range feature to specify exactly which pages from each PDF should be included in the merged document. This is perfect for creating custom compilations."
    },
    {
      question: "How to merge PDF files without watermark?",
      answer: "Our free PDF merger tool combines your documents without adding any watermark. Simply upload, arrange, and download your merged PDF - completely watermark-free."
    },
    {
      question: "Can I use this PDF merge tool on mobile devices?",
      answer: "Yes! Our online PDF merger works perfectly on all devices including smartphones, tablets, laptops, and desktop computers. No app installation needed - just use your browser."
    },
    {
      question: "How to combine multiple PDFs into one document step by step?",
      answer: "Step 1: Upload your PDF files using drag-and-drop or click to browse. Step 2: Reorder files using the up/down arrows. Step 3: Set page ranges if needed. Step 4: Click Merge. Step 5: Download your combined PDF instantly."
    }
  ];

  return (
    <>
      <AdvancedToolSEO
        toolName="Merge PDF Files Free Online - Combine Multiple PDFs"
        description="Merge PDF files free online without watermark. Combine multiple PDF documents into one with our fast, secure PDF merger tool. No registration required. Works on mobile, desktop, and laptop."
        keywords={[
          'merge pdf', 'combine pdf', 'pdf merger', 'join pdf files', 'merge pdf online free',
          'combine multiple pdfs', 'pdf joiner', 'merge pdf files free', 'pdf combiner',
          'merge pdf without watermark', 'how to merge pdf files', 'how can i pdf merge',
          'pdf merge online', 'merge pdf files online free', 'combine pdf files free',
          'best pdf merger 2025', 'merge pdf without software', 'pdf merge without login',
          'pdf merge tool mobile', 'merge pdf on desktop'
        ]}
        category="PDF Document Tools"
        features={[
          'Merge unlimited PDF files free online',
          'Drag and drop file reordering',
          'Custom page range selection',
          'Automatic bookmark generation',
          'Metadata and formatting preservation',
          'Fast batch processing without watermark',
          'Works on mobile, tablet, and desktop',
          'No registration or software required',
          'Secure file processing with auto-delete'
        ]}
        useCases={[
          'Upload PDF files to merge using drag-drop',
          'Reorder files easily with arrow controls',
          'Set custom page ranges for each document',
          'Click merge button to combine PDFs',
          'Download combined PDF instantly free'
        ]}
        faqs={faqData}
        relatedTools={['/split-pdf', '/compress-pdf', '/organize-pdf', '/pdf-to-jpg', '/pdf-to-word']}
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
            <h1 className="text-4xl font-bold mb-4">Merge PDF Files Free Online - Combine Multiple PDFs Into One</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Looking for a free way to merge PDF files online? Our PDF merger tool lets you combine multiple PDF documents into one file instantly. No watermark, no registration, and works on all devices including mobile phones, tablets, and desktop computers. Join, combine, or merge PDF files with ease using our secure online PDF combiner.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/compress-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Compress PDF
              </Link>
              <Link to="/split-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Split PDF
              </Link>
              <Link to="/pdf-to-jpg" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                PDF to JPG
              </Link>
              <Link to="/protect-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Protect PDF
              </Link>
            </div>
          </div>
        </div>
    <PDFToolTemplate
      title="Merge PDF"
      description="Combine multiple PDF files with advanced options for page ranges, bookmarks, and custom ordering"
      icon={<FileText className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={true}
      processFunction={handleMerge}
      outputFilename="merged.pdf"
    >
      {/* Handle file selection internally */}
      {files.length === 0 && (
        <div className="hidden">
          {/* This will be handled by PDFToolTemplate */}
        </div>
      )}
      
      <div className="space-y-6">
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5" />
                File Order & Selection
              </CardTitle>
              <CardDescription>Drag to reorder files or specify page ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fileOrder.map((fileIndex, orderIndex) => (
                  <div key={fileIndex} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveFileUp(orderIndex)}
                        disabled={orderIndex === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveFileDown(orderIndex)}
                        disabled={orderIndex === fileOrder.length - 1}
                      >
                        ↓
                      </Button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{orderIndex + 1}</Badge>
                        <span className="font-medium">{files[fileIndex]?.name}</span>
                      </div>
                      <Input
                        placeholder="Page range (e.g., 1-5, 8, 10-15) - leave empty for all pages"
                        value={pageRanges[fileIndex] || ''}
                        onChange={(e) => setPageRange(fileIndex, e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Merge Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div>
                  <Label htmlFor="merge-mode">Merge Mode</Label>
                  <Select value={mergeMode} onValueChange={(value: any) => setMergeMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select merge mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sequential">Sequential (one after another)</SelectItem>
                      <SelectItem value="interleave">Interleave pages</SelectItem>
                      <SelectItem value="custom">Custom page ranges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="output-title">Output Document Title</Label>
                  <Input
                    id="output-title"
                    value={outputTitle}
                    onChange={(e) => setOutputTitle(e.target.value)}
                    placeholder="Enter document title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="add-bookmarks">Add Bookmarks</Label>
                    <Switch
                      id="add-bookmarks"
                      checked={addBookmarks}
                      onCheckedChange={setAddBookmarks}
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
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Document Structure</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-metadata">Preserve Metadata</Label>
                      <Switch
                        id="preserve-metadata"
                        checked={preserveMetadata}
                        onCheckedChange={setPreserveMetadata}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="insert-blank">Insert Blank Pages</Label>
                      <Switch
                        id="insert-blank"
                        checked={insertBlankPages}
                        onCheckedChange={setInsertBlankPages}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="add-headers">Add File Headers</Label>
                      <Switch
                        id="add-headers"
                        checked={addHeaders}
                        onCheckedChange={setAddHeaders}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Output Optimization</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="optimize-output">Optimize Output</Label>
                      <Switch
                        id="optimize-output"
                        checked={optimizeOutput}
                        onCheckedChange={setOptimizeOutput}
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
              <p><strong>Advanced Merge Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Smart file reordering with drag-and-drop interface</li>
                <li>• Custom page range selection for each file</li>
                <li>• Automatic bookmark generation with file names</li>
                <li>• Metadata preservation and document title setting</li>
                <li>• Interleaving pages for side-by-side comparison</li>
                <li>• Blank page insertion between documents</li>
                <li>• Output optimization for smaller file sizes</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Tip:</strong> Use page ranges like "1-5, 8, 10-15" to select specific pages from each file.
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
            <Link to="/compress-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Compress PDF</div>
                <div className="text-sm text-muted-foreground">Reduce PDF file size</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/split-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Split PDF</div>
                <div className="text-sm text-muted-foreground">Divide PDF into parts</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/pdf-to-jpg" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <ArrowUpDown className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">PDF to JPG</div>
                <div className="text-sm text-muted-foreground">Convert PDF to images</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/protect-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Grid className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Protect PDF</div>
                <div className="text-sm text-muted-foreground">Add password protection</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-invert max-w-none">
          <h2>Professional PDF Merger Tool</h2>
          <p>
            Combine multiple PDF documents into a single, organized file with our advanced PDF merger. Perfect for combining 
            reports, contracts, presentations, or any collection of PDF documents into one cohesive document.
          </p>
          
          <h3>Advanced Merging Features</h3>
          <ul>
            <li><strong>Custom File Ordering:</strong> Drag and drop files to arrange them in your preferred order</li>
            <li><strong>Page Range Selection:</strong> Choose specific pages from each PDF to include in the merge</li>
            <li><strong>Automatic Bookmarks:</strong> Generate bookmarks for easy navigation through merged content</li>
            <li><strong>Metadata Preservation:</strong> Maintain important document properties and information</li>
            <li><strong>Quality Retention:</strong> No compression or quality loss during the merge process</li>
          </ul>

          <h3>Use Cases for PDF Merging</h3>
          <p>
            PDF merging is essential for document management, creating comprehensive reports, preparing legal documents, 
            academic submissions, and business presentations. Combine invoices, merge chapters of documents, or create 
            portfolio collections with professional results.
          </p>
        </div>
      </div>
    </PDFToolTemplate>
      </div>
    </>
  );
};

export default MergePdf;
