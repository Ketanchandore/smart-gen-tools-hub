
import React, { useState } from 'react';
import { Hash } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { addPageNumbers } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PageNumbersPdf = () => {
  const [position, setPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-center');
  const [fontSize, setFontSize] = useState(12);
  const [startNumber, setStartNumber] = useState(1);
  const [color, setColor] = useState('#000000');
  const [format, setFormat] = useState('number'); // number, page-of-total, roman

  const handleAddPageNumbers = async (files: File[]): Promise<Uint8Array> => {
    // Convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 0, g: 0, b: 0 };
    };

    return await addPageNumbers(files[0], {
      position,
      fontSize,
      startNumber,
      color: hexToRgb(color)
    });
  };

  return (
    <PDFToolTemplate
      title="Add Page Numbers"
      description="Add customizable page numbers to PDF with advanced positioning and formatting options"
      icon={<Hash className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleAddPageNumbers}
      outputFilename="numbered.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Number Format</CardTitle>
            <CardDescription>Configure how page numbers appear</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="format">Number Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Simple (1, 2, 3...)</SelectItem>
                    <SelectItem value="page-of-total">Page X of Y</SelectItem>
                    <SelectItem value="roman">Roman (i, ii, iii...)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="start-number">Start Number</Label>
                <Input
                  id="start-number"
                  type="number"
                  min="0"
                  value={startNumber}
                  onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
              <Slider
                id="font-size"
                min={8}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="color">Text Color</Label>
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
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Position</CardTitle>
            <CardDescription>Choose where to place the page numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`p-3 border rounded text-sm ${position === 'top-left' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                onClick={() => setPosition('top-left')}
              >
                Top Left
              </button>
              <button
                className={`p-3 border rounded text-sm ${position === 'top-center' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                onClick={() => setPosition('top-center')}
              >
                Top Center
              </button>
              <button
                className={`p-3 border rounded text-sm ${position === 'top-right' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                onClick={() => setPosition('top-right')}
              >
                Top Right
              </button>
              <button
                className={`p-3 border rounded text-sm ${position === 'bottom-left' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                onClick={() => setPosition('bottom-left')}
              >
                Bottom Left
              </button>
              <button
                className={`p-3 border rounded text-sm ${position === 'bottom-center' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                onClick={() => setPosition('bottom-center')}
              >
                Bottom Center
              </button>
              <button
                className={`p-3 border rounded text-sm ${position === 'bottom-right' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                onClick={() => setPosition('bottom-right')}
              >
                Bottom Right
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Preview Settings</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Format: {format === 'number' ? 'Simple numbers' : format === 'page-of-total' ? 'Page X of Y' : 'Roman numerals'}</p>
            <p>Position: {position.replace('-', ' ')}</p>
            <p>Font Size: {fontSize}px</p>
            <p>Starting from: {startNumber}</p>
            <p>Color: {color}</p>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default PageNumbersPdf;
