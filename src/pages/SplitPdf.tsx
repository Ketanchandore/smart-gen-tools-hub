
import React, { useState } from 'react';
import { Scissors, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { splitPDF, downloadMultipleFiles } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SplitPdf = () => {
  const { toast } = useToast();
  const [splitMode, setSplitMode] = useState<'range' | 'every' | 'bookmarks' | 'extract'>('range');
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [everyNPages, setEveryNPages] = useState(1);
  const [pageRanges, setPageRanges] = useState('1-5, 8, 11-13');
  const [extractPages, setExtractPages] = useState('1, 3, 5');
  const [removeBlankPages, setRemoveBlankPages] = useState(false);
  const [splitResults, setSplitResults] = useState<{ files: Uint8Array[]; names: string[] } | null>(null);

  const handleSplit = async (files: File[]): Promise<Uint8Array> => {
    try {
      let results;
      
      if (splitMode === 'range') {
        results = await splitPDF(files[0], {
          mode: 'range',
          startPage,
          endPage,
        });
      } else if (splitMode === 'every') {
        results = await splitPDF(files[0], {
          mode: 'every',
          everyNPages,
        });
      } else if (splitMode === 'bookmarks') {
        results = await splitPDF(files[0], {
          mode: 'bookmarks',
          pageRanges,
        });
      } else if (splitMode === 'extract') {
        const pageNumbers = extractPages.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
        results = await splitPDF(files[0], {
          mode: 'extract',
          extractPages: pageNumbers,
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
      description="Separate pages or extract specific pages from a PDF file with advanced options"
      icon={<Scissors className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleSplit}
      outputFilename="split.pdf"
      customActions={splitResults && splitResults.files.length > 1 ? (
        <Button onClick={handleDownloadAll} className="ml-2">
          Download All ({splitResults.files.length} files)
        </Button>
      ) : undefined}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Split Options</CardTitle>
            <CardDescription>Choose how you want to split your PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="split-mode">Split Mode</Label>
              <Select value={splitMode} onValueChange={(value: any) => setSplitMode(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select split mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="range">Page Range</SelectItem>
                  <SelectItem value="every">Every N Pages</SelectItem>
                  <SelectItem value="bookmarks">Custom Ranges</SelectItem>
                  <SelectItem value="extract">Extract Specific Pages</SelectItem>
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
                  Comma-separated page numbers to extract into a single new PDF
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remove-blank"
                checked={removeBlankPages}
                onCheckedChange={(checked) => setRemoveBlankPages(checked as boolean)}
              />
              <Label htmlFor="remove-blank" className="text-sm">
                Remove blank pages during split
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Split Modes:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Page Range:</strong> Extract pages from start to end number</li>
                <li>• <strong>Every N Pages:</strong> Split into multiple files with N pages each</li>
                <li>• <strong>Custom Ranges:</strong> Create separate files for each specified range</li>
                <li>• <strong>Extract Pages:</strong> Extract specific pages into one new PDF</li>
              </ul>
              <p className="mt-2">
                <strong>Advanced Features:</strong> Blank page removal, multiple output files, batch processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default SplitPdf;
