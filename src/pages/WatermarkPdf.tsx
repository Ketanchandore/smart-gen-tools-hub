
import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { addWatermark } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WatermarkPdf = () => {
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(50);
  const [rotation, setRotation] = useState(45);

  const handleWatermark = async (files: File[]): Promise<Uint8Array> => {
    return await addWatermark(files[0], watermarkText, {
      opacity: opacity / 100,
      fontSize,
      rotation,
      color: { r: 0.5, g: 0.5, b: 0.5 }
    });
  };

  return (
    <PDFToolTemplate
      title="Watermark PDF"
      description="Add a text watermark to a PDF file with custom positioning and formatting"
      icon={<Droplets className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleWatermark}
      outputFilename="watermarked.pdf"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="watermark-text">Watermark Text</Label>
          <Input
            id="watermark-text"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            placeholder="Enter watermark text"
          />
        </div>
        <div>
          <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
          <Slider
            id="font-size"
            min={20}
            max={100}
            step={5}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="opacity">Opacity: {opacity}%</Label>
          <Slider
            id="opacity"
            min={10}
            max={80}
            step={5}
            value={[opacity]}
            onValueChange={(value) => setOpacity(value[0])}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="rotation">Rotation: {rotation}°</Label>
          <Slider
            id="rotation"
            min={0}
            max={360}
            step={15}
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0])}
            className="mt-2"
          />
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default WatermarkPdf;
