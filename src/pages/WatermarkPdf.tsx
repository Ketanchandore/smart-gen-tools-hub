
import React, { useState } from 'react';
import { Droplets, Settings, Info, Type, Image as ImageIcon, Palette, Eye } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import SEOKeywordContent from '@/components/SEOKeywordContent';
import { addWatermark } from '@/utils/pdfUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const WatermarkPdf = () => {
  const { toast } = useToast();
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(48);
  const [rotation, setRotation] = useState(-45);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom'>('diagonal');
  const [color, setColor] = useState('#FF0000');
  const [pages, setPages] = useState<'all' | 'odd' | 'even' | 'range' | 'specific'>('all');
  const [pageRange, setPageRange] = useState('1-10');
  const [specificPages, setSpecificPages] = useState('1,3,5');
  const [imageWatermark, setImageWatermark] = useState<File | null>(null);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [outline, setOutline] = useState(false);
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [outlineWidth, setOutlineWidth] = useState(1);
  const [shadow, setShadow] = useState(false);
  const [shadowOffset, setShadowOffset] = useState(2);
  const [shadowBlur, setShadowBlur] = useState(3);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [spacing, setSpacing] = useState(100);
  const [scale, setScale] = useState(100);
  const [blend, setBlend] = useState<'normal' | 'multiply' | 'screen' | 'overlay'>('normal');
  const [background, setBackground] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [backgroundOpacity, setBackgroundOpacity] = useState(20);
  const [customX, setCustomX] = useState(50);
  const [customY, setCustomY] = useState(50);
  const [repeat, setRepeat] = useState(false);
  const [tiled, setTiled] = useState(false);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageWatermark(file);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      });
    }
  };

  const getPageIndices = () => {
    if (pages === 'specific') {
      return specificPages.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
    }
    return undefined;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 0, b: 0 };
  };

  const handleAddWatermark = async (files: File[]): Promise<Uint8Array> => {
    try {
      const options = {
        opacity: opacity / 100,
        fontSize,
        rotation,
        position: position === 'custom' ? 'center' : position,
        color: hexToRgb(color),
        pages: pages === 'specific' ? getPageIndices() : pages,
        imageWatermark: watermarkType === 'image' ? imageWatermark : undefined,
        fontFamily,
        fontWeight,
        fontStyle,
        outline,
        outlineColor: outline ? hexToRgb(outlineColor) : undefined,
        outlineWidth,
        shadow,
        shadowOffset,
        shadowBlur,
        shadowColor: shadow ? hexToRgb(shadowColor) : undefined,
        spacing,
        scale: scale / 100,
        blend,
        background,
        backgroundColor: background ? hexToRgb(backgroundColor) : undefined,
        backgroundOpacity: backgroundOpacity / 100,
        customPosition: position === 'custom' ? { x: customX, y: customY } : undefined,
        repeat,
        tiled,
        preserveAspectRatio
      };

      toast({
        title: 'Adding Watermark',
        description: `Adding ${watermarkType} watermark with ${opacity}% opacity...`,
      });

      const result = await addWatermark(files[0], watermarkType === 'text' ? text : '', options);
      
      toast({
        title: 'Watermark Added Successfully',
        description: `${watermarkType === 'text' ? 'Text' : 'Image'} watermark applied to ${pages} pages`,
      });

      return result;
    } catch (error) {
      console.error('Watermark error:', error);
      toast({
        title: 'Watermark Failed',
        description: 'An error occurred while adding the watermark',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <PDFToolTemplate
      title="Add Watermark to PDF"
      description="Professional watermarking with advanced text styling, image overlays, and precise positioning controls"
      icon={<Droplets className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleAddWatermark}
      outputFilename="watermarked.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Watermark Type
            </CardTitle>
            <CardDescription>Choose between text or image watermark</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="watermark-type">Watermark Type</Label>
                <Select value={watermarkType} onValueChange={(value: any) => setWatermarkType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select watermark type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        <span>Text Watermark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="image">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        <span>Image Watermark</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {watermarkType === 'text' ? (
                <div>
                  <Label htmlFor="watermark-text">Watermark Text</Label>
                  <Textarea
                    id="watermark-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter watermark text"
                    rows={3}
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="watermark-image">Watermark Image</Label>
                  <Input
                    id="watermark-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imageWatermark && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {imageWatermark.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Watermark Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="position">Position</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="effects">Effects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="space-y-4">
                <div>
                  <Label htmlFor="opacity">Opacity: {opacity}%</Label>
                  <Slider
                    id="opacity"
                    min={5}
                    max={100}
                    step={5}
                    value={[opacity]}
                    onValueChange={(value) => setOpacity(value[0])}
                    className="mt-2"
                  />
                </div>

                {watermarkType === 'text' && (
                  <>
                    <div>
                      <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                      <Slider
                        id="font-size"
                        min={12}
                        max={200}
                        step={2}
                        value={[fontSize]}
                        onValueChange={(value) => setFontSize(value[0])}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="font-family">Font Family</Label>
                        <Select value={fontFamily} onValueChange={setFontFamily}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                            <SelectItem value="Helvetica">Helvetica</SelectItem>
                            <SelectItem value="Courier">Courier</SelectItem>
                            <SelectItem value="Verdana">Verdana</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="font-weight">Font Weight</Label>
                        <Select value={fontWeight} onValueChange={(value: any) => setFontWeight(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="color">Color</Label>
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
                      placeholder="#FF0000"
                      className="flex-1"
                    />
                  </div>
                </div>

                {watermarkType === 'image' && (
                  <div>
                    <Label htmlFor="scale">Scale: {scale}%</Label>
                    <Slider
                      id="scale"
                      min={10}
                      max={200}
                      step={5}
                      value={[scale]}
                      onValueChange={(value) => setScale(value[0])}
                      className="mt-2"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="position" className="space-y-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select value={position} onValueChange={(value: any) => setPosition(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="diagonal">Diagonal</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="custom">Custom Position</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {position === 'custom' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="custom-x">X Position: {customX}%</Label>
                      <Slider
                        id="custom-x"
                        min={0}
                        max={100}
                        step={1}
                        value={[customX]}
                        onValueChange={(value) => setCustomX(value[0])}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="custom-y">Y Position: {customY}%</Label>
                      <Slider
                        id="custom-y"
                        min={0}
                        max={100}
                        step={1}
                        value={[customY]}
                        onValueChange={(value) => setCustomY(value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="rotation">Rotation: {rotation}°</Label>
                  <Slider
                    id="rotation"
                    min={-180}
                    max={180}
                    step={15}
                    value={[rotation]}
                    onValueChange={(value) => setRotation(value[0])}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="repeat">Repeat Pattern</Label>
                    <Switch
                      id="repeat"
                      checked={repeat}
                      onCheckedChange={setRepeat}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tiled">Tiled Layout</Label>
                    <Switch
                      id="tiled"
                      checked={tiled}
                      onCheckedChange={setTiled}
                    />
                  </div>
                </div>

                {(repeat || tiled) && (
                  <div>
                    <Label htmlFor="spacing">Spacing: {spacing}px</Label>
                    <Slider
                      id="spacing"
                      min={20}
                      max={200}
                      step={10}
                      value={[spacing]}
                      onValueChange={(value) => setSpacing(value[0])}
                      className="mt-2"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pages" className="space-y-4">
                <div>
                  <Label htmlFor="pages">Apply to Pages</Label>
                  <Select value={pages} onValueChange={(value: any) => setPages(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      <SelectItem value="odd">Odd Pages Only</SelectItem>
                      <SelectItem value="even">Even Pages Only</SelectItem>
                      <SelectItem value="range">Page Range</SelectItem>
                      <SelectItem value="specific">Specific Pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pages === 'range' && (
                  <div>
                    <Label htmlFor="page-range">Page Range</Label>
                    <Input
                      id="page-range"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder="e.g., 1-5, 8-10"
                    />
                  </div>
                )}

                {pages === 'specific' && (
                  <div>
                    <Label htmlFor="specific-pages">Specific Pages</Label>
                    <Input
                      id="specific-pages"
                      value={specificPages}
                      onChange={(e) => setSpecificPages(e.target.value)}
                      placeholder="e.g., 1,3,5,7"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                {watermarkType === 'text' && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="outline">Text Outline</Label>
                        <Switch
                          id="outline"
                          checked={outline}
                          onCheckedChange={setOutline}
                        />
                      </div>
                      
                      {outline && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="outline-width">Outline Width: {outlineWidth}px</Label>
                            <Slider
                              id="outline-width"
                              min={1}
                              max={5}
                              step={1}
                              value={[outlineWidth]}
                              onValueChange={(value) => setOutlineWidth(value[0])}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="outline-color">Outline Color</Label>
                            <Input
                              id="outline-color"
                              type="color"
                              value={outlineColor}
                              onChange={(e) => setOutlineColor(e.target.value)}
                              className="w-full h-10 p-1 rounded border mt-2"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="shadow">Drop Shadow</Label>
                        <Switch
                          id="shadow"
                          checked={shadow}
                          onCheckedChange={setShadow}
                        />
                      </div>
                      
                      {shadow && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="shadow-offset">Offset: {shadowOffset}px</Label>
                            <Slider
                              id="shadow-offset"
                              min={1}
                              max={10}
                              step={1}
                              value={[shadowOffset]}
                              onValueChange={(value) => setShadowOffset(value[0])}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="shadow-blur">Blur: {shadowBlur}px</Label>
                            <Slider
                              id="shadow-blur"
                              min={0}
                              max={10}
                              step={1}
                              value={[shadowBlur]}
                              onValueChange={(value) => setShadowBlur(value[0])}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="shadow-color">Shadow Color</Label>
                            <Input
                              id="shadow-color"
                              type="color"
                              value={shadowColor}
                              onChange={(e) => setShadowColor(e.target.value)}
                              className="w-full h-10 p-1 rounded border mt-2"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="background">Background</Label>
                    <Switch
                      id="background"
                      checked={background}
                      onCheckedChange={setBackground}
                    />
                  </div>
                  
                  {background && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="background-color">Background Color</Label>
                        <Input
                          id="background-color"
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-full h-10 p-1 rounded border mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="background-opacity">Background Opacity: {backgroundOpacity}%</Label>
                        <Slider
                          id="background-opacity"
                          min={5}
                          max={100}
                          step={5}
                          value={[backgroundOpacity]}
                          onValueChange={(value) => setBackgroundOpacity(value[0])}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="blend">Blend Mode</Label>
                  <Select value={blend} onValueChange={(value: any) => setBlend(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="multiply">Multiply</SelectItem>
                      <SelectItem value="screen">Screen</SelectItem>
                      <SelectItem value="overlay">Overlay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {watermarkType === 'image' && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="preserve-aspect-ratio">Preserve Aspect Ratio</Label>
                    <Switch
                      id="preserve-aspect-ratio"
                      checked={preserveAspectRatio}
                      onCheckedChange={setPreserveAspectRatio}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional Watermarking Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Text and image watermarks with advanced styling</li>
                <li>• Precise positioning with custom coordinates</li>
                <li>• Page-specific application (all, odd, even, range, specific)</li>
                <li>• Advanced text effects: outline, shadow, background</li>
                <li>• Multiple blend modes and opacity control</li>
                <li>• Tiled and repeated watermark patterns</li>
                <li>• Font customization with weight and style options</li>
                <li>• Image scaling and aspect ratio preservation</li>
              </ul>
              <p className="mt-2">
                <strong>Use Cases:</strong> Document protection, branding, copyright marking, confidentiality labels
              </p>
            </div>
          </div>
        </div>

        <SEOKeywordContent
          toolName="PDF Watermark Tool"
          primaryKeyword="Add Watermark to PDF Online Free"
          longTailKeywords={[
            "Add text watermark to PDF free",
            "Add image watermark to PDF online",
            "Watermark PDF document confidential",
            "Add logo watermark to PDF pages",
            "Watermark PDF without software",
            "Add draft watermark to PDF",
            "Watermark multiple PDF pages at once",
            "Best PDF watermark tool 2024",
            "Add copyright watermark to PDF",
            "Watermark PDF on mobile phone",
            "Transparent watermark PDF online",
            "Add company logo to PDF pages"
          ]}
          benefits={[
            { title: "Brand Protection", description: "Add company logos and branding to protect your documents from misuse." },
            { title: "Text & Image Support", description: "Add text watermarks or upload custom images for professional branding." },
            { title: "Customizable Position", description: "Place watermarks anywhere - center, diagonal, corners, or custom coordinates." },
            { title: "Opacity Control", description: "Adjust watermark transparency from subtle to prominent based on your needs." },
            { title: "Page Selection", description: "Apply to all pages, odd/even pages, or specific page ranges." },
            { title: "Professional Effects", description: "Add shadows, outlines, and backgrounds for advanced watermark styling." }
          ]}
          useCases={[
            { title: "Confidential Documents", description: "Mark sensitive business documents with 'CONFIDENTIAL' or 'DRAFT' watermarks." },
            { title: "Brand Protection", description: "Add company logos to PDFs before sharing with clients or partners." },
            { title: "Copyright Protection", description: "Watermark ebooks, reports, and creative content with copyright notices." },
            { title: "Document Tracking", description: "Add unique watermarks to track document distribution and prevent leaks." }
          ]}
          howItWorks={[
            { step: 1, title: "Upload PDF File", description: "Select the PDF document you want to watermark." },
            { step: 2, title: "Configure Watermark", description: "Enter text or upload image, set position, opacity, and styling." },
            { step: 3, title: "Download Watermarked PDF", description: "Get your professionally watermarked PDF document." }
          ]}
        />
      </div>
    </PDFToolTemplate>
  );
};

export default WatermarkPdf;
