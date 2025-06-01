
import React, { useState } from 'react';
import { FileText, Minimize2 } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const CompressPdf = () => {
  const [quality, setQuality] = useState([70]);

  const handleCompress = async (files: File[]): Promise<Uint8Array> => {
    if (files.length !== 1) {
      throw new Error('Please select exactly one PDF file to compress');
    }
    return await PDFProcessor.compressPDF(files[0], quality[0] / 100);
  };

  const additionalControls = (
    <div className="space-y-4">
      <Label className="text-base font-medium">Compression Quality</Label>
      <div className="space-y-2">
        <Slider
          value={quality}
          onValueChange={setQuality}
          max={100}
          min={10}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>High Compression (Smaller file)</span>
          <span>{quality[0]}%</span>
          <span>Best Quality (Larger file)</span>
        </div>
      </div>
    </div>
  );

  return (
    <PDFToolTemplate
      title="Compress PDF"
      description="Reduce PDF file size while maintaining acceptable quality for faster sharing"
      icon={<Minimize2 className="h-8 w-8 text-primary" />}
      onProcess={handleCompress}
      acceptMultiple={false}
      outputFilename="compressed-document.pdf"
      additionalControls={additionalControls}
    />
  );
};

export default CompressPdf;
