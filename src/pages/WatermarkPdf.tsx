
import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { addWatermark } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WatermarkPdf = () => {
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');

  const handleWatermark = async (files: File[]): Promise<Uint8Array> => {
    return await addWatermark(files[0], watermarkText);
  };

  return (
    <PDFToolTemplate
      title="Watermark PDF"
      description="Add text or image watermark to PDF with transparency options"
      icon={<Droplets className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleWatermark}
      outputFilename="watermarked.pdf"
    >
      <div>
        <Label htmlFor="watermark-text">Watermark Text</Label>
        <Input
          id="watermark-text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="Enter watermark text"
        />
      </div>
    </PDFToolTemplate>
  );
};

export default WatermarkPdf;
