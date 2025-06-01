
import React, { useState } from 'react';
import { Droplets, FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const WatermarkPdf = () => {
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState([30]);

  const handleWatermark = async (files: File[]): Promise<Uint8Array> => {
    if (files.length !== 1) {
      throw new Error('Please select exactly one PDF file to add watermark');
    }
    return await PDFProcessor.addWatermark(files[0], watermarkText, opacity[0] / 100);
  };

  const additionalControls = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="watermark-text" className="text-base font-medium">Watermark Text</Label>
        <Input
          id="watermark-text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
          placeholder="Enter watermark text"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label className="text-base font-medium">Opacity</Label>
        <div className="space-y-2">
          <Slider
            value={opacity}
            onValueChange={setOpacity}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Light</span>
            <span>{opacity[0]}%</span>
            <span>Dark</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PDFToolTemplate
      title="Watermark PDF"
      description="Add text watermarks to PDF documents with customizable opacity and positioning"
      icon={<Droplets className="h-8 w-8 text-primary" />}
      onProcess={handleWatermark}
      acceptMultiple={false}
      outputFilename="watermarked-document.pdf"
      additionalControls={additionalControls}
    />
  );
};

export default WatermarkPdf;
