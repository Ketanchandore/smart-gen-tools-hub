import React, { useState } from 'react';
import { Image, Settings, Info, Grid, Palette, FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { convertImagesToPdf } from '@/utils/pdfUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const JpgToPdf = () => {
  const { toast } = useToast();
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal' | 'Custom'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [quality, setQuality] = useState(85);
  const [margin, setMargin] = useState(20);
  const [fitToPage, setFitToPage] = useState(true);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [compression, setCompression] = useState<'none' | 'low' | 'medium' | 'high'>('medium');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [addBorder, setAddBorder] = useState(false);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#000000');
  const [customWidth, setCustomWidth] = useState(210);
  const [customHeight, setCustomHeight] = useState(297);
  const [imageLayout, setImageLayout] = useState<'single' | 'grid' | 'collage'>('single');
  const [imagesPerPage, setImagesPerPage] = useState(1);
  const [addPageNumbers, setAddPageNumbers] = useState(false);
  const [addWatermark, setAddWatermark] = useState(false);
  const [watermarkText, setWatermarkText] = useState('');
  const [mergeMode, setMergeMode] = useState<'all-in-one' | 'separate-pages'>('separate-pages');

  const handleConvert = async (files: File[]): Promise<Uint8Array> => {
    try {
      const options = {
        pageSize: pageSize === 'Custom' ? 'A4' : pageSize,
        orientation,
        quality: quality / 100,
        margin,
        fitToPage,
        maintainAspectRatio,
        compression,
        backgroundColor,
        addBorder,
        borderWidth,
        borderColor,
        customDimensions: pageSize === 'Custom' ? { width: customWidth, height: customHeight } : undefined,
        imageLayout,
        imagesPerPage,
        addPageNumbers,
        addWatermark,
        watermarkText,
        mergeMode
      };

      toast({
        title: 'Conversion Started',
        description: `Converting ${files.length} images to PDF with ${quality}% quality...`,
      });

      const result = await convertImagesToPdf(files, options);
      
      toast({
        title: 'Conversion Complete',
        description: `Successfully converted ${files.length} images to PDF`,
      });

      return result;
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion Failed',
        description: 'An error occurred during conversion',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="JPG to PDF Converter"
        description="Convert JPG, PNG, and other images to PDF with advanced layout options. Support for multiple images, custom page sizes, compression settings, and professional formatting."
        keywords={['jpg to pdf', 'image to pdf', 'png to pdf', 'convert image to pdf', 'picture to pdf', 'photo to pdf', 'image pdf converter']}
        category="PDF Conversion"
        features={['Multiple Image Formats', 'Custom Page Sizes', 'Layout Options', 'Compression Control', 'Border and Watermark', 'Batch Processing']}
        useCases={['Convert photos to PDF', 'Create photo albums', 'Archive images', 'Prepare presentations', 'Combine multiple images']}
        faqs={[
          { question: 'What image formats are supported?', answer: 'We support JPG, JPEG, PNG, GIF, BMP, WEBP, and TIFF formats.' },
          { question: 'Can I add multiple images to one PDF?', answer: 'Yes, you can add multiple images and choose to place each on a separate page or multiple images per page.' }
        ]}
      />
      <PDFToolTemplate
        title="JPG to PDF"
      description="Professional image to PDF converter with advanced layout, compression, and customization options"
      icon={<Image className="h-8 w-8 text-primary" />}
      acceptFiles=".jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff"
      multiple={true}
      processFunction={handleConvert}
      outputFilename="converted-images.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Page Configuration
            </CardTitle>
            <CardDescription>Configure PDF page settings and layout</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                <TabsTrigger value="layout">Layout & Design</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
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
                        <SelectItem value="Custom">Custom Size</SelectItem>
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

                {pageSize === 'Custom' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="custom-width">Width (mm)</Label>
                      <Input
                        id="custom-width"
                        type="number"
                        min="50"
                        max="500"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(parseInt(e.target.value) || 210)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="custom-height">Height (mm)</Label>
                      <Input
                        id="custom-height"
                        type="number"
                        min="50"
                        max="500"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(parseInt(e.target.value) || 297)}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="quality">Image Quality: {quality}%</Label>
                  <Slider
                    id="quality"
                    min={10}
                    max={100}
                    step={5}
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="margin">Page Margin: {margin}mm</Label>
                  <Slider
                    id="margin"
                    min={0}
                    max={50}
                    step={1}
                    value={[margin]}
                    onValueChange={(value) => setMargin(value[0])}
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4">
                <div>
                  <Label htmlFor="merge-mode">Output Mode</Label>
                  <Select value={mergeMode} onValueChange={(value: any) => setMergeMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select output mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="separate-pages">Each Image on Separate Page</SelectItem>
                      <SelectItem value="all-in-one">Multiple Images per Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {mergeMode === 'all-in-one' && (
                  <div>
                    <Label htmlFor="images-per-page">Images per Page: {imagesPerPage}</Label>
                    <Slider
                      id="images-per-page"
                      min={1}
                      max={9}
                      step={1}
                      value={[imagesPerPage]}
                      onValueChange={(value) => setImagesPerPage(value[0])}
                      className="mt-2"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fit-to-page">Fit to Page</Label>
                    <Switch
                      id="fit-to-page"
                      checked={fitToPage}
                      onCheckedChange={setFitToPage}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintain-aspect">Maintain Aspect Ratio</Label>
                    <Switch
                      id="maintain-aspect"
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="background-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 rounded border"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="add-border">Add Border</Label>
                    <Switch
                      id="add-border"
                      checked={addBorder}
                      onCheckedChange={setAddBorder}
                    />
                  </div>
                  
                  {addBorder && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="border-width">Border Width: {borderWidth}px</Label>
                        <Slider
                          id="border-width"
                          min={1}
                          max={10}
                          step={1}
                          value={[borderWidth]}
                          onValueChange={(value) => setBorderWidth(value[0])}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="border-color">Border Color</Label>
                        <Input
                          id="border-color"
                          type="color"
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className="w-full h-10 p-1 rounded border mt-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <Label htmlFor="compression">Compression Level</Label>
                  <Select value={compression} onValueChange={(value: any) => setCompression(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select compression" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Compression (Largest Size)</SelectItem>
                      <SelectItem value="low">Low Compression (High Quality)</SelectItem>
                      <SelectItem value="medium">Medium Compression (Balanced)</SelectItem>
                      <SelectItem value="high">High Compression (Smallest Size)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="add-page-numbers">Add Page Numbers</Label>
                  <Switch
                    id="add-page-numbers"
                    checked={addPageNumbers}
                    onCheckedChange={setAddPageNumbers}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="add-watermark">Add Watermark</Label>
                    <Switch
                      id="add-watermark"
                      checked={addWatermark}
                      onCheckedChange={setAddWatermark}
                    />
                  </div>
                  
                  {addWatermark && (
                    <div>
                      <Label htmlFor="watermark-text">Watermark Text</Label>
                      <Input
                        id="watermark-text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional Image to PDF Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Multiple image formats support (JPG, PNG, GIF, WEBP, TIFF, BMP)</li>
                <li>• Advanced layout options with multiple images per page</li>
                <li>• Custom page sizes and orientations</li>
                <li>• Intelligent compression with quality control</li>
                <li>• Background color and border customization</li>
                <li>• Watermark and page numbering options</li>
                <li>• Aspect ratio preservation and fit-to-page options</li>
                <li>• Batch processing with drag-and-drop support</li>
              </ul>
              <p className="mt-2">
                <strong>Supported Formats:</strong> JPG, JPEG, PNG, GIF, BMP, WEBP, TIFF
              </p>
            </div>
          </div>
        </div>
      </div>
      </PDFToolTemplate>
    </>
  );
};

export default JpgToPdf;
