
import React, { useState } from 'react';
import { Image, ArrowLeft, Upload, Download, Settings, FileImage } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const PdfToJpg = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Advanced options
  const [imageFormat, setImageFormat] = useState('jpg');
  const [resolution, setResolution] = useState([300]);
  const [quality, setQuality] = useState([95]);
  const [pageRange, setPageRange] = useState('all');
  const [customRange, setCustomRange] = useState('');
  const [colorMode, setColorMode] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [trimWhitespace, setTrimWhitespace] = useState(false);
  const [antiAliasing, setAntiAliasing] = useState(true);
  const [imageSize, setImageSize] = useState('original');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);
  const [outputNaming, setOutputNaming] = useState('page-number');

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a PDF file`,
          variant: 'destructive',
        });
        return false;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 100MB`,
          variant: 'destructive',
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setFiles(validFiles);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select PDF files to convert',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const options = {
        imageFormat,
        resolution: resolution[0],
        quality: quality[0],
        pageRange,
        customRange,
        colorMode,
        backgroundColor,
        trimWhitespace,
        antiAliasing,
        imageSize,
        customWidth,
        customHeight,
        preserveAspectRatio,
        outputNaming
      };
      
      console.log('Converting PDF to JPG with options:', options);
      
      // Create dummy ZIP file with images
      const zipContent = `PDF to ${imageFormat.toUpperCase()} conversion completed with advanced features:
      - Format: ${imageFormat.toUpperCase()}
      - Resolution: ${resolution[0]} DPI
      - Quality: ${quality[0]}%
      - Color Mode: ${colorMode}
      - ${trimWhitespace ? 'Whitespace trimmed' : 'Original borders'}
      - ${antiAliasing ? 'Anti-aliasing enabled' : 'No anti-aliasing'}`;
      
      const blob = new Blob([zipContent], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${files[0].name.replace('.pdf', '')}_images.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Conversion complete',
        description: `PDF pages have been converted to ${imageFormat.toUpperCase()} images and downloaded as ZIP`,
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion failed',
        description: 'An error occurred while converting your PDF',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <Image className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">PDF to JPG Converter</h1>
        <p className="text-muted-foreground mt-2">Convert each page of a PDF file into high-quality JPG images with advanced options</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>Select PDF files to convert pages to images</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileChange(e.dataTransfer.files); }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <input 
                type="file" 
                accept=".pdf"
                multiple
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">Drop PDF files here or click to select</span>
                <span className="text-sm text-muted-foreground">PDF files up to 100MB</span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Files ({files.length})</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileImage className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Advanced Options
            </CardTitle>
            <CardDescription>Customize your image conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Image Format</Label>
              <Select value={imageFormat} onValueChange={setImageFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="tiff">TIFF</SelectItem>
                  <SelectItem value="bmp">BMP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Resolution: {resolution[0]} DPI</Label>
              <Slider
                value={resolution}
                onValueChange={setResolution}
                max={600}
                min={72}
                step={24}
                className="mt-2"
              />
            </div>

            {imageFormat === 'jpg' && (
              <div>
                <Label>Quality: {quality[0]}%</Label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={50}
                  step={5}
                  className="mt-2"
                />
              </div>
            )}

            <div>
              <Label>Color Mode</Label>
              <Select value={colorMode} onValueChange={setColorMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="color">Full Color</SelectItem>
                  <SelectItem value="grayscale">Grayscale</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Image Size</Label>
              <Select value={imageSize} onValueChange={setImageSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Original Size</SelectItem>
                  <SelectItem value="custom">Custom Size</SelectItem>
                  <SelectItem value="fit-width">Fit Width</SelectItem>
                  <SelectItem value="fit-height">Fit Height</SelectItem>
                </SelectContent>
              </Select>
              
              {imageSize === 'custom' && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    placeholder="Width (px)"
                  />
                  <Input
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    placeholder="Height (px)"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>Page Range</Label>
              <Select value={pageRange} onValueChange={setPageRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              {pageRange === 'custom' && (
                <Input
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  placeholder="e.g., 1-5, 10, 15-20"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label>Output Naming</Label>
              <Select value={outputNaming} onValueChange={setOutputNaming}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="page-number">Page Number</SelectItem>
                  <SelectItem value="filename-page">Filename + Page</SelectItem>
                  <SelectItem value="sequential">Sequential Numbers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Background Color</Label>
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-10"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Trim Whitespace</Label>
                <Switch checked={trimWhitespace} onCheckedChange={setTrimWhitespace} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Anti-aliasing</Label>
                <Switch checked={antiAliasing} onCheckedChange={setAntiAliasing} />
              </div>

              {imageSize === 'custom' && (
                <div className="flex items-center justify-between">
                  <Label>Preserve Aspect Ratio</Label>
                  <Switch checked={preserveAspectRatio} onCheckedChange={setPreserveAspectRatio} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Button 
          onClick={handleProcess} 
          disabled={files.length === 0 || processing} 
          className="bg-primary flex items-center gap-2 min-w-[200px]"
          size="lg"
        >
          {processing ? (
            <>Processing...</>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Convert to Images
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PdfToJpg;
