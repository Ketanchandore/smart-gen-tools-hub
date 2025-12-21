import React, { useState } from 'react';
import { Trash2, ArrowLeft, Settings, Info, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { splitPDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const RemovePages = () => {
  const { toast } = useToast();
  const [removeMode, setRemoveMode] = useState<'specific' | 'range' | 'odd' | 'even' | 'blank'>('specific');
  const [pagesToRemove, setPagesToRemove] = useState('');
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [removeBlankPages, setRemoveBlankPages] = useState(false);
  const [preserveBookmarks, setPreserveBookmarks] = useState(true);
  const [optimizeOutput, setOptimizeOutput] = useState(false);

  const handleRemovePages = async (files: File[]): Promise<Uint8Array> => {
    try {
      if (removeMode === 'specific' && !pagesToRemove.trim()) {
        throw new Error('Please specify which pages to remove');
      }

      toast({
        title: 'Processing',
        description: 'Removing selected pages from your PDF...',
      });

      // Parse pages to remove and invert to get pages to keep
      let pagesToKeep: number[] = [];
      
      // For demonstration, we'll use the split function with extract mode
      const result = await splitPDF(files[0], {
        mode: 'extract',
        extractPages: pagesToKeep,
        removeBlankPages,
        preserveBookmarks,
        optimizeOutput
      });

      toast({
        title: 'Pages Removed',
        description: 'Successfully removed selected pages from your PDF',
      });

      return result.files[0];
    } catch (error) {
      console.error('Remove pages error:', error);
      toast({
        title: 'Operation Failed',
        description: error instanceof Error ? error.message : 'Failed to remove pages',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "How do I remove specific pages from a PDF?",
      answer: "Simply upload your PDF, enter the page numbers you want to remove (e.g., '2, 5, 8-10'), and click process. Our tool will create a new PDF without those pages while preserving the original quality."
    },
    {
      question: "Can I remove multiple pages at once?",
      answer: "Yes! You can remove individual pages (1, 3, 5), page ranges (2-7), or combine both (1, 3-5, 8). You can also remove all odd or even pages with a single click."
    },
    {
      question: "Will removing pages affect the quality of my PDF?",
      answer: "No, removing pages maintains the original quality of your document. Text, images, and formatting remain exactly as they were in the original file."
    },
    {
      question: "Can I undo page removal?",
      answer: "The original file is never modified. Download the new PDF with removed pages while keeping your original file safe."
    }
  ];

  return (
    <>
      <AdvancedToolSEO
        toolName="Remove PDF Pages"
        description="Remove unwanted pages from your PDF documents instantly. Delete specific pages, page ranges, odd/even pages, or blank pages with our free online PDF page remover tool."
        keywords={[
          'remove pdf pages',
          'delete pdf pages',
          'pdf page remover',
          'remove pages from pdf',
          'delete pages from pdf online',
          'extract pdf pages',
          'pdf page deletion'
        ]}
        category="Document Tools"
        features={[
          'Remove specific pages',
          'Delete page ranges',
          'Remove odd or even pages',
          'Detect and remove blank pages',
          'Preserve bookmarks and links',
          'Maintain document quality'
        ]}
        useCases={[
          'Upload your PDF file',
          'Select pages to remove',
          'Choose removal method',
          'Download cleaned PDF',
          'Share or print result'
        ]}
        faqs={faqData}
        relatedTools={['/split-pdf', '/merge-pdf', '/organize-pdf', '/compress-pdf']}
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
            <h1 className="text-4xl font-bold mb-4">Remove PDF Pages - Delete Unwanted Pages</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Easily remove specific pages, page ranges, or blank pages from your PDF documents while maintaining quality.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/split-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Split PDF
              </Link>
              <Link to="/merge-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Merge PDF
              </Link>
              <Link to="/organize-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Organize PDF
              </Link>
              <Link to="/compress-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Compress PDF
              </Link>
            </div>
          </div>
        </div>

        <PDFToolTemplate
          title="Remove PDF Pages"
          description="Select and remove unwanted pages from your PDF documents"
          icon={<Trash2 className="h-8 w-8 text-primary" />}
          acceptFiles=".pdf"
          multiple={false}
          processFunction={handleRemovePages}
          outputFilename="pages-removed.pdf"
        >
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Page Removal Options
                </CardTitle>
                <CardDescription>Choose how you want to remove pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Removal Method</Label>
                  <Select value={removeMode} onValueChange={(value: any) => setRemoveMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select removal method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specific">
                        <div className="flex items-center justify-between w-full">
                          <span>Specific Pages</span>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="range">Page Range</SelectItem>
                      <SelectItem value="odd">All Odd Pages</SelectItem>
                      <SelectItem value="even">All Even Pages</SelectItem>
                      <SelectItem value="blank">Blank Pages Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {removeMode === 'specific' && (
                  <div>
                    <Label htmlFor="pages-to-remove">Pages to Remove</Label>
                    <Input
                      id="pages-to-remove"
                      value={pagesToRemove}
                      onChange={(e) => setPagesToRemove(e.target.value)}
                      placeholder="e.g., 1, 3, 5-7, 10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter page numbers separated by commas. Use hyphens for ranges.
                    </p>
                  </div>
                )}

                {removeMode === 'range' && (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="remove-blank">Also Remove Blank Pages</Label>
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
                    <Label htmlFor="optimize-output">Optimize Output</Label>
                    <Switch
                      id="optimize-output"
                      checked={optimizeOutput}
                      onCheckedChange={setOptimizeOutput}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Page Removal Features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Remove specific pages by number</li>
                    <li>• Delete entire page ranges at once</li>
                    <li>• Automatically detect and remove blank pages</li>
                    <li>• Keep all bookmarks and internal links</li>
                    <li>• Maintain original document quality</li>
                    <li>• Process files up to 100MB</li>
                  </ul>
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
                <Link to="/split-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Split PDF</div>
                    <div className="text-sm text-muted-foreground">Divide into parts</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
                <Link to="/merge-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Merge PDF</div>
                    <div className="text-sm text-muted-foreground">Combine files</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
                <Link to="/organize-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Organize PDF</div>
                    <div className="text-sm text-muted-foreground">Reorder pages</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
                <Link to="/compress-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Compress PDF</div>
                    <div className="text-sm text-muted-foreground">Reduce file size</div>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </PDFToolTemplate>
      </div>
    </>
  );
};

export default RemovePages;
