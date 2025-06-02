import React, { useState } from 'react';
import { Droplets, Upload, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { addWatermark } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const WatermarkPdf = () => {
  const { toast } = useToast();
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(50);
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('diagonal');
  const [color, setColor] = useState('#808080');
  const [pageSelection, setPageSelection] = useState<'all' | 'odd' | 'even' | 'custom'>('all');
  const [customPages, setCustomPages] = useState('1-5, 8, 10');
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [imageWatermark, setImageWatermark] = useState<File | null>(null);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file (JPG, PNG)',
          variant: 'destructive',
        });
        return;
      }
      setImageWatermark(file);
      toast({
        title: 'Image uploaded',
        description: `${file.name} selected as watermark`,
      });
    }
  };

  const handleWatermark = async (files: File[]): Promise<Uint8Array> => {
    try {
      // Convert hex color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255
        } : { r: 0.5, g: 0.5, b: 0.5 };
      };

      // Parse custom pages if selected and convert to the correct type
      let targetPages: number[] | 'all' | 'odd' | 'even';
      if (pageSelection === 'custom') {
        const pages: number[] = [];
        const ranges = customPages.split(',').map(r => r.trim());
        
        for (const range of ranges) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(n => parseInt(n.trim()));
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
          } else {
            pages.push(parseInt(range));
          }
        }
        targetPages = pages;
      } else {
        targetPages = pageSelection;
      }

      const finalWatermarkText = `${prefix}${watermarkText}${suffix}`;

      const result = await addWatermark(files[0], finalWatermarkText, {
        opacity: opacity / 100,
        fontSize,
        rotation,
        position,
        color: hexToRgb(color),
        pages: targetPages,
        imageWatermark: watermarkType === 'image' ? imageWatermark : undefined
      });

      toast({
        title: 'Watermark Added Successfully',
        description: `Watermark applied to ${pageSelection === 'all' ? 'all pages' : pageSelection === 'custom' ? 'selected pages' : pageSelection + ' pages'}`,
      });

      return result;
    } catch (error) {
      console.error('Watermark error:', error);
      toast({
        title: 'Watermark Failed',
        description: 'An error occurred while adding watermark',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <PDFToolTemplate
      title="Watermark PDF"
      description="Add customizable text or image watermarks to PDF files with advanced positioning and styling options"
      icon={<Droplets className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleWatermark}
      outputFilename="watermarked.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Watermark Type</CardTitle>
            <CardDescription>Choose between text or image watermark</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="watermark-type">Watermark Type</Label>
              <Select value={watermarkType} onValueChange={(value: any) => setWatermarkType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select watermark type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Watermark</SelectItem>
                  <SelectItem value="image">Image Watermark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {watermarkType === 'text' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="watermark-text">Watermark Text</Label>
                  <Input
                    id="watermark-text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prefix">Prefix (Optional)</Label>
                    <Input
                      id="prefix"
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      placeholder="e.g., 'DRAFT - '"
                    />
                  </div>
                  <div>
                    <Label htmlFor="suffix">Suffix (Optional)</Label>
                    <Input
                      id="suffix"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      placeholder="e.g., ' - COPY'"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                    <Slider
                      id="font-size"
                      min={12}
                      max={120}
                      step={2}
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
                      max={90}
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
              </div>
            ) : (
              <div>
                <Label htmlFor="image-upload">Upload Image Watermark</Label>
                <div className="mt-2">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm">
                        {imageWatermark ? imageWatermark.name : 'Click to upload image (JPG, PNG)'}
                      </p>
                    </div>
                  </Label>
                </div>
              </div>
            )}
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

        <Card>
          <CardHeader>
            <CardTitle>Page Selection</CardTitle>
            <CardDescription>Choose which pages to watermark</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="page-selection">Apply Watermark To</Label>
              <Select value={pageSelection} onValueChange={(value: any) => setPageSelection(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="odd">Odd Pages Only</SelectItem>
                  <SelectItem value="even">Even Pages Only</SelectItem>
                  <SelectItem value="custom">Custom Page Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {pageSelection === 'custom' && (
              <div>
                <Label htmlFor="custom-pages">Custom Page Range</Label>
                <Input
                  id="custom-pages"
                  value={customPages}
                  onChange={(e) => setCustomPages(e.target.value)}
                  placeholder="e.g., 1-5, 8, 10-15"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use commas to separate ranges and hyphens for page ranges
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Watermark Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Type: {watermarkType === 'text' ? 'Text' : 'Image'}</p>
            {watermarkType === 'text' && (
              <>
                <p>Text: "{prefix}{watermarkText}{suffix}"</p>
                <p>Size: {fontSize}px, Opacity: {opacity}%, Rotation: {rotation}°</p>
                <p>Color: {color}</p>
              </>
            )}
            {watermarkType === 'image' && imageWatermark && (
              <p>Image: {imageWatermark.name}</p>
            )}
            <p>Position: {position.replace('-', ' ')}</p>
            <p>Pages: {pageSelection === 'custom' ? customPages : pageSelection}</p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Advanced Watermarking Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Support for both text and image watermarks</li>
                <li>• Selective page watermarking (all, odd, even, custom ranges)</li>
                <li>• Customizable opacity, rotation, and positioning</li>
                <li>• Text prefix/suffix for dynamic watermarks</li>
                <li>• High-quality image watermark support (JPG, PNG)</li>
                <li>• Professional positioning presets</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Tip:</strong> Use 20-40% opacity for subtle watermarks, 60-80% for prominent branding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default WatermarkPdf;
