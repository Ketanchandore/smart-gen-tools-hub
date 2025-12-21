import React, { useState } from 'react';
import { FileOutput, ArrowLeft, Settings, Info, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { splitPDF, downloadMultipleFiles } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ExtractPages = () => {
  const { toast } = useToast();
  const [extractMode, setExtractMode] = useState<'specific' | 'range' | 'all-as-single'>('specific');
  const [pagesToExtract, setPagesToExtract] = useState('');
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [extractAsIndividual, setExtractAsIndividual] = useState(false);
  const [preserveBookmarks, setPreserveBookmarks] = useState(true);
  const [optimizeOutput, setOptimizeOutput] = useState(false);
  const [extractResults, setExtractResults] = useState<{ files: Uint8Array[]; names: string[] } | null>(null);

  const handleExtractPages = async (files: File[]): Promise<Uint8Array> => {
    try {
      if (extractMode === 'specific' && !pagesToExtract.trim()) {
        throw new Error('Please specify which pages to extract');
      }

      toast({
        title: 'Extracting Pages',
        description: 'Processing your PDF extraction request...',
      });

      // Parse pages to extract
      let pageNumbers: number[] = [];
      if (extractMode === 'specific') {
        const parts = pagesToExtract.split(',');
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.includes('-')) {
            const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()) - 1);
            for (let i = start; i <= end; i++) {
              pageNumbers.push(i);
            }
          } else {
            pageNumbers.push(parseInt(trimmed) - 1);
          }
        }
      } else if (extractMode === 'range') {
        for (let i = startPage - 1; i < endPage; i++) {
          pageNumbers.push(i);
        }
      }

      const result = await splitPDF(files[0], {
        mode: 'extract',
        extractPages: pageNumbers,
        preserveBookmarks,
        optimizeOutput
      });

      setExtractResults(result);

      toast({
        title: 'Extraction Complete',
        description: `Successfully extracted ${pageNumbers.length} pages`,
      });

      return result.files[0];
    } catch (error) {
      console.error('Extract pages error:', error);
      toast({
        title: 'Extraction Failed',
        description: error instanceof Error ? error.message : 'Failed to extract pages',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleDownloadAll = () => {
    if (extractResults) {
      const filesForDownload = extractResults.files.map((file, index) => ({
        data: file,
        name: extractResults.names[index]
      }));
      downloadMultipleFiles(filesForDownload);
    }
  };

  const faqData = [
    {
      question: "How do I extract specific pages from a PDF?",
      answer: "Upload your PDF, enter the page numbers you want to extract (e.g., '1, 3, 5-10'), and click process. You'll get a new PDF containing only the selected pages."
    },
    {
      question: "Can I extract pages as individual files?",
      answer: "Yes! Enable 'Extract as individual files' to get each page as a separate PDF. This is perfect for distributing specific pages to different recipients."
    },
    {
      question: "What's the maximum file size for extraction?",
      answer: "You can extract pages from PDFs up to 100MB in size. For larger files, consider splitting them first."
    },
    {
      question: "Will extraction preserve my PDF's quality?",
      answer: "Absolutely! Page extraction maintains the original quality, including all text, images, fonts, and formatting."
    }
  ];

  return (
    <>
      <AdvancedToolSEO
        toolName="Extract PDF Pages"
        description="Extract specific pages from your PDF documents. Pull out individual pages or page ranges and save them as a new PDF file with our free online page extractor."
        keywords={[
          'extract pdf pages',
          'pdf page extractor',
          'extract pages from pdf',
          'pdf page extraction online',
          'pull pages from pdf',
          'save pdf pages',
          'get specific pdf pages'
        ]}
        category="Document Tools"
        features={[
          'Extract specific pages',
          'Pull page ranges',
          'Save as individual files',
          'Preserve document quality',
          'Keep bookmarks intact',
          'Fast processing'
        ]}
        useCases={[
          'Upload your PDF document',
          'Select pages to extract',
          'Choose output format',
          'Download extracted pages',
          'Share individual pages'
        ]}
        faqs={faqData}
        relatedTools={['/split-pdf', '/remove-pages', '/merge-pdf', '/organize-pdf']}
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
            <h1 className="text-4xl font-bold mb-4">Extract PDF Pages - Pull Out Specific Pages</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Extract specific pages or page ranges from your PDF and save them as a new document.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/split-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Split PDF
              </Link>
              <Link to="/remove-pages" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Remove Pages
              </Link>
              <Link to="/merge-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Merge PDF
              </Link>
              <Link to="/organize-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Organize PDF
              </Link>
            </div>
          </div>
        </div>

        <PDFToolTemplate
          title="Extract PDF Pages"
          description="Pull specific pages from your PDF documents and save them separately"
          icon={<FileOutput className="h-8 w-8 text-primary" />}
          acceptFiles=".pdf"
          multiple={false}
          processFunction={handleExtractPages}
          outputFilename="extracted-pages.pdf"
          customActions={extractResults && extractResults.files.length > 1 ? (
            <Button onClick={handleDownloadAll} className="ml-2">
              <Download className="h-4 w-4 mr-2" />
              Download All ({extractResults.files.length} files)
            </Button>
          ) : undefined}
        >
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Extraction Options
                </CardTitle>
                <CardDescription>Choose which pages to extract</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Extraction Method</Label>
                  <Select value={extractMode} onValueChange={(value: any) => setExtractMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select extraction method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specific">
                        <div className="flex items-center justify-between w-full">
                          <span>Specific Pages</span>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="range">Page Range</SelectItem>
                      <SelectItem value="all-as-single">All Pages (as individual files)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {extractMode === 'specific' && (
                  <div>
                    <Label htmlFor="pages-to-extract">Pages to Extract</Label>
                    <Input
                      id="pages-to-extract"
                      value={pagesToExtract}
                      onChange={(e) => setPagesToExtract(e.target.value)}
                      placeholder="e.g., 1, 3, 5-10, 15"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter page numbers separated by commas. Use hyphens for ranges.
                    </p>
                  </div>
                )}

                {extractMode === 'range' && (
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
                    <Label htmlFor="extract-individual">Extract as Individual Files</Label>
                    <Switch
                      id="extract-individual"
                      checked={extractAsIndividual}
                      onCheckedChange={setExtractAsIndividual}
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
                  <p><strong>Page Extraction Features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Extract any combination of pages</li>
                    <li>• Save extracted pages as one or multiple PDFs</li>
                    <li>• Maintain original formatting and quality</li>
                    <li>• Preserve hyperlinks and bookmarks</li>
                    <li>• Fast processing for large documents</li>
                    <li>• Free and unlimited extractions</li>
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
                <Link to="/remove-pages" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Remove Pages</div>
                    <div className="text-sm text-muted-foreground">Delete pages</div>
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
              </div>
            </div>
          </div>
        </PDFToolTemplate>
      </div>
    </>
  );
};

export default ExtractPages;
