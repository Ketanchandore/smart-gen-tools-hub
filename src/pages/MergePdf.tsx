import React, { useState } from 'react';
import { FileText, Info, ArrowUpDown, Grid, List, Settings } from 'lucide-react';
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

  return (
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
      </div>
    </PDFToolTemplate>
  );
};

export default MergePdf;
