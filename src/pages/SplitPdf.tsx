
import React, { useState } from 'react';
import { FileText, Scissors } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SplitPdf = () => {
  const [pageRanges, setPageRanges] = useState([{ start: 1, end: 1 }]);

  const handleSplit = async (files: File[]): Promise<Uint8Array[]> => {
    if (files.length !== 1) {
      throw new Error('Please select exactly one PDF file to split');
    }
    return await PDFProcessor.splitPDF(files[0], pageRanges);
  };

  const addPageRange = () => {
    setPageRanges([...pageRanges, { start: 1, end: 1 }]);
  };

  const updatePageRange = (index: number, field: 'start' | 'end', value: number) => {
    const newRanges = [...pageRanges];
    newRanges[index][field] = value;
    setPageRanges(newRanges);
  };

  const removePageRange = (index: number) => {
    if (pageRanges.length > 1) {
      setPageRanges(pageRanges.filter((_, i) => i !== index));
    }
  };

  const additionalControls = (
    <div className="space-y-4">
      <Label className="text-base font-medium">Page Ranges to Extract</Label>
      {pageRanges.map((range, index) => (
        <div key={index} className="flex items-center gap-2">
          <Label htmlFor={`start-${index}`} className="w-12">From:</Label>
          <Input
            id={`start-${index}`}
            type="number"
            min="1"
            value={range.start}
            onChange={(e) => updatePageRange(index, 'start', parseInt(e.target.value))}
            className="w-20"
          />
          <Label htmlFor={`end-${index}`} className="w-8">To:</Label>
          <Input
            id={`end-${index}`}
            type="number"
            min="1"
            value={range.end}
            onChange={(e) => updatePageRange(index, 'end', parseInt(e.target.value))}
            className="w-20"
          />
          {pageRanges.length > 1 && (
            <Button variant="outline" size="sm" onClick={() => removePageRange(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={addPageRange} className="w-full">
        Add Another Range
      </Button>
    </div>
  );

  return (
    <PDFToolTemplate
      title="Split PDF"
      description="Extract specific pages from PDF documents into separate files"
      icon={<Scissors className="h-8 w-8 text-primary" />}
      onProcess={handleSplit}
      acceptMultiple={false}
      outputFilename="split-page"
      additionalControls={additionalControls}
    />
  );
};

export default SplitPdf;
