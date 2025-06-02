
import React, { useState } from 'react';
import { Droplets } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { addWatermark } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WatermarkPdf = () => {
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(50);
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('diagonal');
  const [color, setColor] = useState('#808080');

  const handleWatermark = async (files: File[]): Promise<Uint8Array> => {
    // Convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 0.5, g: 0.5, b: 0.5 };
    };

    return await addWatermark(files[0], watermarkText, {
      opacity: opacity / 100,
      fontSize,
      rotation,
      position,
      color: hexToRgb(color)
    });
  };

  return (
    <PDFToolTemplate
      title="Watermark PDF"
      description="Add customizable text watermarks to PDF files with advanced positioning and styling options"
      icon={<Droplets className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleWatermark}
      outputFilename="watermarked.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Watermark Text</CardTitle>
            <CardDescription>Configure your watermark text and appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="watermark-text">Watermark Text</Label>
              <Input
                id="watermark-text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div>
              <Label htmlFor="color">Watermark Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 p-1 rounded border"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#808080"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Position & Rotation</CardTitle>
            <CardDescription>Control watermark placement and angle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={(value: any) => setPosition(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="diagonal">Diagonal Center</SelectItem>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
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
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Preview Settings</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Text: "{watermarkText}"</p>
            <p>Size: {fontSize}px, Opacity: {opacity}%, Rotation: {rotation}°</p>
            <p>Position: {position.replace('-', ' ')}</p>
            <p>Color: {color}</p>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default WatermarkPdf;
