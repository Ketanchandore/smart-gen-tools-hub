
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { FileTextIcon, Upload, Download, Plus, Minus, MoveHorizontal, FileText, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { splitPDF, mergePDFs, downloadPdf } from '@/utils/pdfUtils';

interface PDFFile {
  id: string;
  file: File;
  selected: boolean;
}

const PdfSplitMerge = () => {
  const { toast } = useToast();
  
  // Split PDF state
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState<[number, number]>([1, 5]);
  const [splitProcessing, setSplitProcessing] = useState(false);
  const [splitCompleted, setSplitCompleted] = useState(false);
  
  // Merge PDF state
  const [mergeFiles, setMergeFiles] = useState<PDFFile[]>([]);
  const [mergeProcessing, setMergeProcessing] = useState(false);
  const [mergeCompleted, setMergeCompleted] = useState(false);
  
  const handleSplitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please select a PDF file',
          variant: 'destructive',
        });
        return;
      }
      
      if (selectedFile.size > 20 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 20MB',
          variant: 'destructive',
        });
        return;
      }
      
      setSplitFile(selectedFile);
      setSplitCompleted(false);
    }
  };

  const handleMergeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles: PDFFile[] = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        if (file.type !== 'application/pdf') {
          toast({
            title: 'Invalid file type',
            description: `${file.name} is not a PDF file`,
            variant: 'destructive',
          });
          continue;
        }
        
        if (file.size > 20 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} is larger than 20MB limit`,
            variant: 'destructive',
          });
          continue;
        }
        
        newFiles.push({
          id: `pdf-${Date.now()}-${i}`,
          file,
          selected: true,
        });
      }
      
      setMergeFiles([...mergeFiles, ...newFiles]);
      setMergeCompleted(false);
    }
  };
  
  const removeMergeFile = (id: string) => {
    setMergeFiles(mergeFiles.filter((file) => file.id !== id));
    setMergeCompleted(false);
  };
  
  const moveFileUp = (index: number) => {
    if (index > 0) {
      const newFiles = [...mergeFiles];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index - 1];
      newFiles[index - 1] = temp;
      setMergeFiles(newFiles);
      setMergeCompleted(false);
    }
  };
  
  const moveFileDown = (index: number) => {
    if (index < mergeFiles.length - 1) {
      const newFiles = [...mergeFiles];
      const temp = newFiles[index];
      newFiles[index] = newFiles[index + 1];
      newFiles[index + 1] = temp;
      setMergeFiles(newFiles);
      setMergeCompleted(false);
    }
  };

  const handleSplitPdf = async () => {
    if (!splitFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file first',
        variant: 'destructive',
      });
      return;
    }

    setSplitProcessing(true);
    
    try {
      const result = await splitPDF(splitFile, pageRange[0], pageRange[1]);
      downloadPdf(result, `split-pages-${pageRange[0]}-${pageRange[1]}.pdf`);
      setSplitCompleted(true);
      
      toast({
        title: 'PDF split successful',
        description: `PDF has been split into pages ${pageRange[0]}-${pageRange[1]}`,
      });
    } catch (error) {
      console.error('Split error:', error);
      toast({
        title: 'Split failed',
        description: 'An error occurred while splitting the PDF',
        variant: 'destructive',
      });
    } finally {
      setSplitProcessing(false);
    }
  };
  
  const handleMergePdf = async () => {
    if (mergeFiles.length < 2) {
      toast({
        title: 'Not enough files',
        description: 'Please select at least 2 PDF files to merge',
        variant: 'destructive',
      });
      return;
    }

    setMergeProcessing(true);
    
    try {
      const files = mergeFiles.map(f => f.file);
      const result = await mergePDFs(files);
      downloadPdf(result, 'merged-pdfs.pdf');
      setMergeCompleted(true);
      
      toast({
        title: 'PDFs merged successfully',
        description: `${mergeFiles.length} PDF files have been merged into one`,
      });
    } catch (error) {
      console.error('Merge error:', error);
      toast({
        title: 'Merge failed',
        description: 'An error occurred while merging the PDFs',
        variant: 'destructive',
      });
    } finally {
      setMergeProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">PDF Split & Merge Tool</h1>
          <p className="text-muted-foreground mb-8">Split a PDF into separate pages or merge multiple PDFs into one</p>

          <Tabs defaultValue="split" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="split">Split PDF</TabsTrigger>
              <TabsTrigger value="merge">Merge PDFs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="split">
              <Card>
                <CardHeader>
                  <CardTitle>Split PDF File</CardTitle>
                  <CardDescription>Extract specific pages from a PDF document</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleSplitFileChange} 
                        className="hidden" 
                        id="split-pdf-upload"
                      />
                      <Label htmlFor="split-pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <FileTextIcon className="h-10 w-10 text-muted-foreground" />
                        <span className="text-lg font-medium">
                          {splitFile ? splitFile.name : 'Click to select PDF file or drop it here'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {splitFile ? `${(splitFile.size / 1024 / 1024).toFixed(2)} MB` : 'Max file size: 20MB'}
                        </span>
                      </Label>
                    </div>
                    
                    {splitFile && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Select Page Range</Label>
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium">Page {pageRange[0]}</div>
                            <Slider 
                              className="flex-1" 
                              value={[pageRange[0]]} 
                              min={1} 
                              max={20} 
                              step={1}
                              onValueChange={(values) => setPageRange([values[0], pageRange[1]])}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium">Page {pageRange[1]}</div>
                            <Slider 
                              className="flex-1" 
                              value={[pageRange[1]]} 
                              min={pageRange[0]} 
                              max={20} 
                              step={1}
                              onValueChange={(values) => setPageRange([pageRange[0], values[0]])}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            Extracting pages {pageRange[0]} to {pageRange[1]}
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button 
                            onClick={handleSplitPdf} 
                            disabled={splitProcessing} 
                            className="bg-primary flex items-center gap-2"
                          >
                            {splitProcessing ? (
                              <>Processing...</>
                            ) : (
                              <>
                                <FileText className="h-4 w-4" />
                                Split PDF
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {splitCompleted && (
                      <div className="p-4 bg-secondary/30 rounded-lg text-center">
                        <p className="font-medium mb-2">PDF Split Complete!</p>
                        <Button className="bg-primary flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Split PDF
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="merge">
              <Card>
                <CardHeader>
                  <CardTitle>Merge PDF Files</CardTitle>
                  <CardDescription>Combine multiple PDF documents into a single file</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleMergeFileChange} 
                        className="hidden" 
                        id="merge-pdf-upload"
                        multiple
                      />
                      <Label htmlFor="merge-pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <Plus className="h-10 w-10 text-muted-foreground" />
                        <span className="text-lg font-medium">Click to add PDF files</span>
                        <span className="text-sm text-muted-foreground">Select multiple files to merge</span>
                      </Label>
                    </div>
                    
                    {mergeFiles.length > 0 && (
                      <div className="space-y-4">
                        <div className="text-sm font-medium">PDF Files ({mergeFiles.length})</div>
                        <div className="space-y-2">
                          {mergeFiles.map((pdf, index) => (
                            <div 
                              key={pdf.id} 
                              className="flex items-center justify-between p-3 bg-secondary/30 rounded-md"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <FileTextIcon className="h-5 w-5 flex-shrink-0" />
                                <span className="text-sm truncate">{pdf.file.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => moveFileUp(index)}
                                  disabled={index === 0}
                                  className="h-8 w-8"
                                >
                                  <MoveHorizontal className="h-4 w-4 rotate-90" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => moveFileDown(index)}
                                  disabled={index === mergeFiles.length - 1}
                                  className="h-8 w-8"
                                >
                                  <MoveHorizontal className="h-4 w-4 -rotate-90" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeMergeFile(pdf.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-center">
                          <Button 
                            onClick={handleMergePdf} 
                            disabled={mergeProcessing || mergeFiles.length < 2} 
                            className="bg-primary flex items-center gap-2"
                          >
                            {mergeProcessing ? (
                              <>Processing...</>
                            ) : (
                              <>
                                <FileText className="h-4 w-4" />
                                Merge PDFs
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {mergeCompleted && (
                      <div className="p-4 bg-secondary/30 rounded-lg text-center">
                        <p className="font-medium mb-2">PDFs Merged Successfully!</p>
                        <Button className="bg-primary flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download Merged PDF
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Fully Functional:</strong> This tool now includes complete PDF processing capabilities.</p>
                <p>Split and merge operations are performed using the pdf-lib library for reliable PDF manipulation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PdfSplitMerge;
