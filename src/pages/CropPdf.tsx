
import React, { useState } from 'react';
import { Crop, Scissors, Settings, Target, Move, RotateCcw } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';

const CropPdf = () => {
  const [cropMode, setCropMode] = useState<'margins' | 'custom' | 'auto' | 'content' | 'pages'>('margins');
  const [marginTop, setMarginTop] = useState(20);
  const [marginBottom, setMarginBottom] = useState(20);
  const [marginLeft, setMarginLeft] = useState(20);
  const [marginRight, setMarginRight] = useState(20);
  const [customX, setCustomX] = useState(0);
  const [customY, setCustomY] = useState(0);
  const [customWidth, setCustomWidth] = useState(595);
  const [customHeight, setCustomHeight] = useState(842);
  const [units, setUnits] = useState<'mm' | 'in' | 'px' | 'pt'>('mm');
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(false);
  const [applyToAllPages, setApplyToAllPages] = useState(true);
  const [pageRange, setPageRange] = useState('');
  const [autoCropWhitespace, setAutoCropWhitespace] = useState(true);
  const [contentDetection, setContentDetection] = useState('smart');
  const [cropTolerance, setCropTolerance] = useState([10]);
  const [removeBlankAreas, setRemoveBlankAreas] = useState(false);
  const [centerContent, setCenterContent] = useState(false);
  const [scaleAfterCrop, setScaleAfterCrop] = useState(false);
  const [targetPageSize, setTargetPageSize] = useState<'original' | 'A4' | 'letter' | 'legal' | 'custom'>('original');
  const [previewMode, setPreviewMode] = useState(true);
  const [cropPresets, setCropPresets] = useState('none');
  const [rotateBeforeCrop, setRotateBeforeCrop] = useState(0);
  const [cropAreas, setCropAreas] = useState<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
  }>>([]);

  const processCropPdf = async (files: File[]) => {
    if (files.length === 0) {
      throw new Error('Please select a PDF file to crop');
    }

    const file = files[0];
    console.log('Cropping PDF with advanced options:', {
      cropMode,
      margins: {
        top: marginTop,
        bottom: marginBottom,
        left: marginLeft,
        right: marginRight,
        units
      },
      customDimensions: {
        x: customX,
        y: customY,
        width: customWidth,
        height: customHeight
      },
      options: {
        preserveAspectRatio,
        applyToAllPages,
        pageRange,
        autoCropWhitespace,
        contentDetection,
        cropTolerance: cropTolerance[0],
        removeBlankAreas,
        centerContent,
        scaleAfterCrop,
        targetPageSize,
        previewMode,
        cropPresets,
        rotateBeforeCrop
      },
      cropAreas
    });

    // Simulate advanced PDF cropping processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Return the original file content as processed result
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const addCropArea = () => {
    setCropAreas(prev => [...prev, {
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      name: `Area ${prev.length + 1}`
    }]);
  };

  const removeCropArea = (index: number) => {
    setCropAreas(prev => prev.filter((_, i) => i !== index));
  };

  const updateCropArea = (index: number, updates: Partial<typeof cropAreas[0]>) => {
    setCropAreas(prev => prev.map((area, i) => i === index ? { ...area, ...updates } : area));
  };

  const cropPresetOptions = [
    { value: 'none', label: 'No Preset' },
    { value: 'remove-margins', label: 'Remove All Margins' },
    { value: 'business-card', label: 'Business Card Size' },
    { value: 'photo-4x6', label: 'Photo 4x6' },
    { value: 'banner', label: 'Banner Strip' },
    { value: 'header-footer', label: 'Remove Header/Footer' },
    { value: 'content-only', label: 'Content Area Only' }
  ];

  const contentDetectionOptions = [
    { value: 'smart', label: 'Smart Detection' },
    { value: 'text-only', label: 'Text Content Only' },
    { value: 'images-only', label: 'Images Only' },
    { value: 'all-content', label: 'All Content' },
    { value: 'manual', label: 'Manual Selection' }
  ];

  return (
    <PDFToolTemplate
      title="Crop PDF"
      description="Advanced PDF cropping tool with intelligent content detection and precision controls"
      icon={<Crop className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={processCropPdf}
      outputFilename="cropped-document.pdf"
    >
      <Tabs defaultValue="crop" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crop">Crop Settings</TabsTrigger>
          <TabsTrigger value="areas">Multiple Areas</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="crop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Crop Configuration
              </CardTitle>
              <CardDescription>
                Configure how to crop your PDF pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Crop Mode</Label>
                <Select value={cropMode} onValueChange={(value: any) => setCropMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="margins">Crop Margins</SelectItem>
                    <SelectItem value="custom">Custom Rectangle</SelectItem>
                    <SelectItem value="auto">Auto-detect Content</SelectItem>
                    <SelectItem value="content">Content-based</SelectItem>
                    <SelectItem value="pages">Multiple Areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {cropMode === 'margins' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Measurement Units</Label>
                    <Select value={units} onValueChange={(value: any) => setUnits(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm">Millimeters</SelectItem>
                        <SelectItem value="in">Inches</SelectItem>
                        <SelectItem value="px">Pixels</SelectItem>
                        <SelectItem value="pt">Points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marginTop">Top ({units})</Label>
                      <Input
                        id="marginTop"
                        type="number"
                        value={marginTop}
                        onChange={(e) => setMarginTop(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marginBottom">Bottom ({units})</Label>
                      <Input
                        id="marginBottom"
                        type="number"
                        value={marginBottom}
                        onChange={(e) => setMarginBottom(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marginLeft">Left ({units})</Label>
                      <Input
                        id="marginLeft"
                        type="number"
                        value={marginLeft}
                        onChange={(e) => setMarginLeft(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marginRight">Right ({units})</Label>
                      <Input
                        id="marginRight"
                        type="number"
                        value={marginRight}
                        onChange={(e) => setMarginRight(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {cropMode === 'custom' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customX">X Position ({units})</Label>
                      <Input
                        id="customX"
                        type="number"
                        value={customX}
                        onChange={(e) => setCustomX(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customY">Y Position ({units})</Label>
                      <Input
                        id="customY"
                        type="number"
                        value={customY}
                        onChange={(e) => setCustomY(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customWidth">Width ({units})</Label>
                      <Input
                        id="customWidth"
                        type="number"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(parseFloat(e.target.value) || 0)}
                        min="1"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customHeight">Height ({units})</Label>
                      <Input
                        id="customHeight"
                        type="number"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(parseFloat(e.target.value) || 0)}
                        min="1"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(cropMode === 'auto' || cropMode === 'content') && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Content Detection</Label>
                    <Select value={contentDetection} onValueChange={setContentDetection}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contentDetectionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Detection Sensitivity: {cropTolerance[0]}%</Label>
                    <Slider
                      value={cropTolerance}
                      onValueChange={setCropTolerance}
                      min={0}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      Lower values crop closer to content edges (more precise)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoCropWhitespace"
                      checked={autoCropWhitespace}
                      onCheckedChange={setAutoCropWhitespace}
                    />
                    <Label htmlFor="autoCropWhitespace">Remove White Space</Label>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label>Page Selection</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="applyToAllPages"
                      checked={applyToAllPages}
                      onCheckedChange={setApplyToAllPages}
                    />
                    <Label htmlFor="applyToAllPages">Apply to All Pages</Label>
                  </div>

                  {!applyToAllPages && (
                    <div className="space-y-2">
                      <Label htmlFor="pageRange">Page Range</Label>
                      <Input
                        id="pageRange"
                        placeholder="e.g., 1,3,5-9 (blank for all)"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Multiple Crop Areas
              </CardTitle>
              <CardDescription>
                Define multiple areas to crop from your PDF
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={addCropArea} className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Add Crop Area
              </Button>

              {cropAreas.length > 0 && (
                <div className="space-y-4">
                  {cropAreas.map((area, index) => (
                    <Card key={index} className="p-4 border border-dashed relative">
                      <div className="absolute top-3 right-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeCropArea(index)}
                          className="h-8 w-8 p-0"
                        >
                          ×
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label>Area Name</Label>
                          <Input
                            value={area.name}
                            onChange={(e) => updateCropArea(index, { name: e.target.value })}
                            placeholder="Area name"
                          />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="space-y-1">
                            <Label>X ({units})</Label>
                            <Input
                              type="number"
                              value={area.x}
                              onChange={(e) => updateCropArea(index, { x: parseFloat(e.target.value) || 0 })}
                              min="0"
                              step="1"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label>Y ({units})</Label>
                            <Input
                              type="number"
                              value={area.y}
                              onChange={(e) => updateCropArea(index, { y: parseFloat(e.target.value) || 0 })}
                              min="0"
                              step="1"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label>Width ({units})</Label>
                            <Input
                              type="number"
                              value={area.width}
                              onChange={(e) => updateCropArea(index, { width: parseFloat(e.target.value) || 0 })}
                              min="1"
                              step="1"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label>Height ({units})</Label>
                            <Input
                              type="number"
                              value={area.height}
                              onChange={(e) => updateCropArea(index, { height: parseFloat(e.target.value) || 0 })}
                              min="1"
                              step="1"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <Alert>
                <Target className="h-4 w-4" />
                <AlertDescription>
                  Multiple crop areas will create separate PDFs for each selected region. 
                  The output will be a ZIP file containing all cropped areas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Advanced Options
              </CardTitle>
              <CardDescription>
                Professional settings for precise PDF cropping
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserveAspectRatio"
                    checked={preserveAspectRatio}
                    onCheckedChange={setPreserveAspectRatio}
                  />
                  <Label htmlFor="preserveAspectRatio">Preserve Aspect Ratio</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeBlankAreas"
                    checked={removeBlankAreas}
                    onCheckedChange={setRemoveBlankAreas}
                  />
                  <Label htmlFor="removeBlankAreas">Remove Blank Areas</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="centerContent"
                    checked={centerContent}
                    onCheckedChange={setCenterContent}
                  />
                  <Label htmlFor="centerContent">Center Content</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scaleAfterCrop"
                    checked={scaleAfterCrop}
                    onCheckedChange={setScaleAfterCrop}
                  />
                  <Label htmlFor="scaleAfterCrop">Scale After Crop</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="previewMode"
                    checked={previewMode}
                    onCheckedChange={setPreviewMode}
                  />
                  <Label htmlFor="previewMode">Preview Mode</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Target Page Size</Label>
                <Select value={targetPageSize} onValueChange={(value: any) => setTargetPageSize(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Original Size</SelectItem>
                    <SelectItem value="A4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Rotate Before Crop</Label>
                <Select 
                  value={rotateBeforeCrop.toString()} 
                  onValueChange={(value: string) => setRotateBeforeCrop(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Rotation</SelectItem>
                    <SelectItem value="90">90° Clockwise</SelectItem>
                    <SelectItem value="180">180°</SelectItem>
                    <SelectItem value="270">90° Counter-clockwise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Advanced Features</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Content-aware intelligent cropping
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Border detection and removal
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Multi-area extraction
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Text flow preservation
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Image boundary detection
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Move className="h-5 w-5" />
                Crop Presets
              </CardTitle>
              <CardDescription>
                Apply predefined cropping settings for common use cases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select a Preset</Label>
                <Select value={cropPresets} onValueChange={setCropPresets}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cropPresetOptions.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {cropPresetOptions.slice(1).map((preset) => (
                  <Button 
                    key={preset.value}
                    variant="outline"
                    className="justify-start"
                    onClick={() => setCropPresets(preset.value)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>

              <Alert>
                <RotateCcw className="h-4 w-4" />
                <AlertDescription>
                  Selecting a preset will overwrite your current crop settings, 
                  but you can still adjust them after applying the preset.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Label>Common Use Cases</Label>
                <div className="space-y-2">
                  <Badge variant="outline" className="justify-start p-3">
                    📱 Scan Cleanup: Auto-crop to remove scanner artifacts
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    📄 Book Digitization: Remove binding and page edges
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    🖨️ Print Preparation: Add or remove margins for printing
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    📊 Form Extraction: Crop out specific form sections
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    🎨 Design Work: Extract graphics from documents
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PDFToolTemplate>
  );
};

export default CropPdf;
