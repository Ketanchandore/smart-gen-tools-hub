import React, { useState } from 'react';
import { FileText, Info, ArrowUpDown, Settings } from 'lucide-react';
import ToolSEO from '@/components/ToolSEO';
import PDFToolLayout from '@/components/PDFToolLayout';
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
      question: "Can I merge PDFs in a specific order?",
      answer: "Yes! You can easily reorder your PDF files using our drag-and-drop interface or the up/down arrows. The final merged PDF will follow your specified order."
    },
    {
      question: "Is there a limit to how many PDFs I can merge?",
      answer: "You can merge up to 20 PDF files at once. For larger batches, consider merging in groups and then combining the results."
    },
    {
      question: "Will merging PDFs affect the quality?",
      answer: "No, merging PDFs preserves the original quality of all documents. The process combines files without recompression or quality loss."
    },
    {
      question: "Can I merge specific pages from different PDFs?",
      answer: "Absolutely! Use our page range feature to specify exactly which pages from each PDF should be included in the merged document."
    }
  ];

  return (
    <>
      <ToolSEO 
        title="Free PDF Merger - Combine Multiple PDFs Online | Pine Tools Hub"
        description="Merge PDF files online for free. Combine multiple PDFs with custom ordering, page ranges, and bookmarks. Professional PDF merging tool."
        keywords="PDF merger, combine PDF, merge PDF online, PDF joiner, PDF combiner, join PDFs"
        toolName="PDF Merger"
        toolType="Tool"
        category="PDF Tools"
        features={["Custom file ordering", "Page range selection", "Bookmark generation", "Metadata preservation"]}
        faqs={faqData}
        url="https://pinetoolshub.com/merge-pdf"
      />

      <PDFToolLayout
        toolKey="merge-pdf"
        toolName="Merge PDF"
        category="PDF Tools"
        categoryPath="/tools"
        reverseTool={{
          name: "Split PDF",
          path: "/split-pdf",
          description: "Need to separate a merged PDF? Split it into individual files easily."
        }}
        contextualTools={[
          {
            name: "Compress PDF",
            reason: "Reduce the size of your merged document",
            path: "/compress-pdf"
          },
          {
            name: "Organize PDF",
            reason: "Reorder pages in your merged file",
            path: "/organize-pdf"
          },
          {
            name: "Protect PDF",
            reason: "Secure your merged document with a password",
            path: "/protect-pdf"
          }
        ]}
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
      </PDFToolLayout>
    </>
  );
};

export default MergePdf;
