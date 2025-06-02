
import React, { useState } from 'react';
import { Scissors } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { splitPDF } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SplitPdf = () => {
  const [splitMode, setSplitMode] = useState<'range' | 'every' | 'bookmarks'>('range');
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [everyNPages, setEveryNPages] = useState(1);
  const [pageRanges, setPageRanges] = useState('1-5, 8, 11-13');

  const handleSplit = async (files: File[]): Promise<Uint8Array> => {
    const results = await splitPDF(files[0], {
      mode: splitMode,
      startPage: splitMode === 'range' ? startPage : undefined,
      endPage: splitMode === 'range' ? endPage : undefined,
      everyNPages: splitMode === 'every' ? everyNPages : undefined,
      pageRanges: splitMode === 'bookmarks' ? pageRanges : undefined,
    });
    
    // Return first result for now (in real implementation, handle multiple files)
    return results[0] || new Uint8Array();
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
    >
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
                Use commas to separate ranges and hyphens for page ranges
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PDFToolTemplate>
  );
};

export default SplitPdf;
