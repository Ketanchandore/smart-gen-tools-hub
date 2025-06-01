
import React, { useState } from 'react';
import { Scissors } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { splitPDF } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SplitPdf = () => {
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  const handleSplit = async (files: File[]): Promise<Uint8Array> => {
    return await splitPDF(files[0], startPage, endPage);
  };

  return (
    <PDFToolTemplate
      title="Split PDF"
      description="Separate pages or extract specific pages from a PDF file"
      icon={<Scissors className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleSplit}
      outputFilename="split.pdf"
    >
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
    </PDFToolTemplate>
  );
};

export default SplitPdf;
