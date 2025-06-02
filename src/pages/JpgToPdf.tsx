
import React, { useState } from 'react';
import { Image } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { convertImagesToPdf } from '@/utils/pdfUtils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const JpgToPdf = () => {
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [quality, setQuality] = useState(80);
  const [margin, setMargin] = useState(20);

  const handleConvert = async (files: File[]): Promise<Uint8Array> => {
    return await convertImagesToPdf(files, {
      pageSize,
      orientation,
      quality: quality / 100,
      margin
    });
  };

  return (
    <PDFToolTemplate
      title="JPG to PDF"
      description="Convert JPG, PNG, and other images into a PDF file with advanced layout options"
      icon={<Image className="h-8 w-8 text-primary" />}
      acceptFiles=".jpg,.jpeg,.png,.gif,.bmp,.webp"
      multiple={true}
      processFunction={handleConvert}
      outputFilename="images.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
            <CardDescription>Configure the PDF page layout and size</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page-size">Page Size</Label>
                <Select value={pageSize} onValueChange={(value: any) => setPageSize(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                    <SelectItem value="Letter">Letter (8.5 × 11 in)</SelectItem>
                    <SelectItem value="Legal">Legal (8.5 × 14 in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="orientation">Orientation</Label>
                <Select value={orientation} onValueChange={(value: any) => setOrientation(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image Quality & Layout</CardTitle>
            <CardDescription>Adjust image quality and spacing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="quality">Image Quality: {quality}%</Label>
              <Slider
                id="quality"
                min={50}
                max={100}
                step={5}
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher quality = larger file size
              </p>
            </div>

            <div>
              <Label htmlFor="margin">Page Margin: {margin}px</Label>
              <Slider
                id="margin"
                min={0}
                max={50}
                step={5}
                value={[margin]}
                onValueChange={(value) => setMargin(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Space around images on each page
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Conversion Settings</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Page Size: {pageSize} ({orientation})</p>
            <p>Image Quality: {quality}%</p>
            <p>Page Margin: {margin}px</p>
            <p>• Each image will be placed on a separate page</p>
            <p>• Images will be scaled to fit while maintaining aspect ratio</p>
            <p>• Supported formats: JPG, PNG, GIF, BMP, WebP</p>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default JpgToPdf;
