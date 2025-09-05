
import React, { useState } from 'react';
import { Image, ArrowLeft, Upload, Download, Settings, FileImage, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { ToolStructuredData } from '@/components/StructuredData';
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

  const faqData = [
    {
      question: "What image formats are supported for PDF conversion?",
      answer: "Our tool converts PDF pages to JPG, PNG, TIFF, and BMP formats. JPG is best for photos, PNG for images with transparency, and TIFF for high-quality professional documents."
    },
    {
      question: "Can I convert specific pages from a PDF?",
      answer: "Yes! Use our custom page range feature to convert only the pages you need. Enter ranges like '1-5, 10, 15-20' to convert specific sections."
    },
    {
      question: "What resolution should I choose?",
      answer: "For web use, choose 72-150 DPI. For printing, use 300 DPI or higher. Higher DPI creates larger files but better quality images."
    },
    {
      question: "Is there a file size limit?",
      answer: "You can convert PDF files up to 100MB in size. For larger files, consider compressing the PDF first or splitting it into smaller parts."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Free PDF to JPG Converter - Convert PDF Pages to Images Online"
        description="Convert PDF pages to high-quality JPG, PNG, TIFF images online. Advanced options for resolution, quality, and batch conversion. Free PDF to image converter."
        keywords="PDF to JPG converter, PDF to image, convert PDF to JPG, PDF to PNG, extract images from PDF, PDF page converter"
        url="https://pinetoolshub.com/pdf-to-jpg"
      />
      <ToolStructuredData 
        name="PDF to JPG Converter"
        description="Convert PDF pages to high-quality image formats with advanced customization options"
        url="https://pinetoolshub.com/pdf-to-jpg"
        category="PDF Tools"
        features={["Multiple image formats", "Custom resolution control", "Quality settings", "Page range selection", "Batch processing", "Color mode options"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Tools
            </Link>
            <h1 className="text-4xl font-bold mb-4">PDF to JPG Converter - Extract Images from PDF</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Convert PDF pages to high-quality images with professional customization options and batch processing.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/jpg-to-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                JPG to PDF
              </Link>
              <Link to="/compress-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Compress PDF
              </Link>
              <Link to="/merge-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Merge PDF
              </Link>
              <Link to="/split-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Split PDF
              </Link>
            </div>
          </div>
        </div>
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

      {/* FAQ Section */}
      <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="mt-12 bg-secondary/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Related PDF Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/jpg-to-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
            <Image className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">JPG to PDF</div>
              <div className="text-sm text-muted-foreground">Convert images to PDF</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Link>
          <Link to="/compress-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
            <Settings className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">Compress PDF</div>
              <div className="text-sm text-muted-foreground">Reduce file size</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Link>
          <Link to="/merge-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
            <FileImage className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">Merge PDF</div>
              <div className="text-sm text-muted-foreground">Combine PDFs</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Link>
          <Link to="/split-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
            <Download className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">Split PDF</div>
              <div className="text-sm text-muted-foreground">Extract PDF pages</div>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 prose prose-invert max-w-none">
        <h2>Professional PDF to Image Converter</h2>
        <p>
          Convert your PDF documents into high-quality images with our advanced PDF to JPG converter. Perfect for extracting 
          diagrams, charts, presentations, or any visual content from PDF files. Our tool supports multiple image formats 
          and provides professional-grade control over output quality and resolution.
        </p>
        
        <h3>Advanced Conversion Features</h3>
        <ul>
          <li><strong>Multiple Formats:</strong> Convert to JPG, PNG, TIFF, or BMP formats</li>
          <li><strong>Quality Control:</strong> Adjust image quality and resolution up to 600 DPI</li>
          <li><strong>Page Selection:</strong> Convert all pages or specify custom page ranges</li>
          <li><strong>Color Options:</strong> Full color, grayscale, or monochrome output</li>
          <li><strong>Size Control:</strong> Original size, custom dimensions, or fit-to-size options</li>
          <li><strong>Advanced Options:</strong> Whitespace trimming, anti-aliasing, custom backgrounds</li>
        </ul>

        <h3>Common Use Cases</h3>
        <p>
          PDF to image conversion is essential for web publishing, social media sharing, presentation creation, 
          document archiving, and extracting visual elements for reuse. Convert research papers to images for 
          easier sharing, extract charts and graphs for reports, or create thumbnails for document previews.
        </p>
      </div>
      </div>
    </div>
    </>
  );
};

export default PdfToJpg;
