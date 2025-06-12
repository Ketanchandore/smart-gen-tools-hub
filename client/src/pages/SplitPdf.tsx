import React, { useState } from 'react';
import { Scissors, Info, FileText, Settings, Download, Grid } from 'lucide-react';
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

  return (
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
      </div>
    </PDFToolTemplate>
  );
};

export default SplitPdf;
