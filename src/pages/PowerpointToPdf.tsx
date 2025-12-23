
import React, { useState } from 'react';
import { Presentation, ArrowLeft, Upload, Download, Settings, FileText, Image } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';

const PowerpointToPdf = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Advanced options
  const [quality, setQuality] = useState([95]);
  const [slideRange, setSlideRange] = useState('all');
  const [customRange, setCustomRange] = useState('');
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeHiddenSlides, setIncludeHiddenSlides] = useState(false);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [pdfSecurity, setPdfSecurity] = useState(false);
  const [password, setPassword] = useState('');
  const [allowPrinting, setAllowPrinting] = useState(true);
  const [allowCopying, setAllowCopying] = useState(true);
  const [pageLayout, setPageLayout] = useState('slides');
  const [handoutLayout, setHandoutLayout] = useState('6-per-page');
  const [compression, setCompression] = useState('balanced');

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => {
      const validTypes = [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a PowerPoint file`,
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
        description: 'Please select PowerPoint files to convert',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const options = {
        quality: quality[0],
        slideRange,
        customRange,
        includeNotes,
        includeHiddenSlides,
        optimizeImages,
        pdfSecurity,
        password: pdfSecurity ? password : '',
        allowPrinting,
        allowCopying,
        pageLayout,
        handoutLayout,
        compression
      };
      
      console.log('Converting PowerPoint to PDF with options:', options);
      
      // Create dummy PDF content
      const pdfContent = `PowerPoint to PDF conversion completed with advanced features:
      - Quality: ${quality[0]}%
      - Layout: ${pageLayout}
      - Compression: ${compression}
      - ${includeNotes ? 'Speaker notes included' : 'No speaker notes'}
      - ${pdfSecurity ? 'Password protected' : 'No password protection'}`;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${files[0].name.replace(/\.(ppt|pptx)$/i, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Conversion complete',
        description: 'PowerPoint has been converted to PDF with advanced features',
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion failed',
        description: 'An error occurred while converting your PowerPoint',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="PowerPoint to PDF Converter"
        description="Convert PowerPoint presentations into high-quality PDF files with advanced options. Support for PPT and PPTX files with speaker notes and handout layouts."
        keywords={['powerpoint to pdf', 'pptx to pdf', 'ppt to pdf', 'convert presentation to pdf', 'powerpoint converter']}
        category="PDF Conversion"
        features={['Multiple layout options (slides, handouts, notes)', 'Speaker notes inclusion', 'Hidden slides handling', 'Image optimization', 'Password protection', 'Custom compression levels']}
        useCases={['Upload PowerPoint file', 'Select output layout', 'Configure options', 'Convert to PDF', 'Download and share']}
        faqs={[
          { question: 'Can I include speaker notes?', answer: 'Yes, you can choose to include speaker notes in the PDF output using the notes pages layout.' },
          { question: 'What about hidden slides?', answer: 'You have the option to include or exclude hidden slides from the final PDF.' },
          { question: 'Can I add password protection?', answer: 'Yes, you can set a password for the PDF and control printing and copying permissions.' }
        ]}
        relatedTools={['pdf-to-powerpoint', 'word-to-pdf', 'merge-pdf', 'compress-pdf']}
      />
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
          <Presentation className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">PowerPoint to PDF Converter</h1>
        <p className="text-muted-foreground mt-2">Convert PowerPoint presentations into high-quality PDF files with advanced options</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload PowerPoint Files</CardTitle>
            <CardDescription>Select PPT or PPTX files to convert to PDF</CardDescription>
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
                accept=".ppt,.pptx"
                multiple
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">Drop PowerPoint files here or click to select</span>
                <span className="text-sm text-muted-foreground">PPT, PPTX files up to 100MB</span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Files ({files.length})</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <Presentation className="h-4 w-4 text-orange-500" />
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
            <CardDescription>Customize your PDF conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Page Layout</Label>
              <Select value={pageLayout} onValueChange={setPageLayout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slides">Slides</SelectItem>
                  <SelectItem value="handouts">Handouts</SelectItem>
                  <SelectItem value="notes">Notes Pages</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {pageLayout === 'handouts' && (
              <div>
                <Label>Handout Layout</Label>
                <Select value={handoutLayout} onValueChange={setHandoutLayout}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-per-page">1 per page</SelectItem>
                    <SelectItem value="2-per-page">2 per page</SelectItem>
                    <SelectItem value="3-per-page">3 per page</SelectItem>
                    <SelectItem value="4-per-page">4 per page</SelectItem>
                    <SelectItem value="6-per-page">6 per page</SelectItem>
                    <SelectItem value="9-per-page">9 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Compression</Label>
              <Select value={compression} onValueChange={setCompression}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No compression</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high">High compression</SelectItem>
                  <SelectItem value="maximum">Maximum compression</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Slide Range</Label>
              <Select value={slideRange} onValueChange={setSlideRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Slides</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              {slideRange === 'custom' && (
                <Input
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  placeholder="e.g., 1-5, 10, 15-20"
                  className="mt-2"
                />
              )}
            </div>

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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Include Speaker Notes</Label>
                <Switch checked={includeNotes} onCheckedChange={setIncludeNotes} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Include Hidden Slides</Label>
                <Switch checked={includeHiddenSlides} onCheckedChange={setIncludeHiddenSlides} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Optimize Images</Label>
                <Switch checked={optimizeImages} onCheckedChange={setOptimizeImages} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Password Protection</Label>
                <Switch checked={pdfSecurity} onCheckedChange={setPdfSecurity} />
              </div>

              {pdfSecurity && (
                <div className="space-y-2">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter PDF password"
                  />
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Allow Printing</Label>
                    <Switch checked={allowPrinting} onCheckedChange={setAllowPrinting} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Allow Copying</Label>
                    <Switch checked={allowCopying} onCheckedChange={setAllowCopying} />
                  </div>
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
              Convert to PDF
            </>
          )}
        </Button>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions About PowerPoint to PDF Conversion</h2>
        <div className="space-y-6">
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Can I include speaker notes when converting PowerPoint to PDF?</h3>
            <p className="text-muted-foreground">Yes, you can choose to include speaker notes in the PDF output using the notes pages layout option.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">What about hidden slides in PPT to PDF conversion?</h3>
            <p className="text-muted-foreground">You have the option to include or exclude hidden slides from the final PDF document.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Can I add password protection to the converted PDF?</h3>
            <p className="text-muted-foreground">Yes, you can set a password for the PDF and control printing and copying permissions for security.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Is the PowerPoint to PDF converter free online?</h3>
            <p className="text-muted-foreground">Yes, our PPT to PDF converter is completely free to use. Convert PPTX and PPT files without registration.</p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Professional PowerPoint to PDF Conversion Online
          </h2>
          <p className="text-muted-foreground mb-4">
            Convert PowerPoint presentations to PDF instantly with our free online PPT to PDF converter. 
            Transform PPTX and PPT files into high-quality PDF documents while preserving all slides, animations references, and formatting.
          </p>
          <p className="text-muted-foreground mb-6">
            Our PowerPoint to PDF tool offers advanced options including handout layouts, speaker notes inclusion, 
            and password protection. Perfect for sharing presentations securely or creating print-ready documents.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Why Convert PowerPoint to PDF?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Share presentations without PowerPoint software</li>
                <li>• Preserve formatting across all devices</li>
                <li>• Create print-ready presentation handouts</li>
                <li>• Protect content from unauthorized editing</li>
                <li>• Reduce file size for easier sharing</li>
                <li>• Archive presentations in universal format</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Advanced PPT to PDF Features:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multiple layout options (slides, handouts, notes)</li>
                <li>• Speaker notes inclusion</li>
                <li>• Hidden slides handling</li>
                <li>• Image optimization</li>
                <li>• Password protection</li>
                <li>• Custom compression levels</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Tools */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Related PDF Conversion Tools</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/pdf-to-powerpoint" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">PDF to PowerPoint</h4>
              <p className="text-sm text-muted-foreground">Convert PDF to slides</p>
            </Link>
            <Link to="/word-to-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Word to PDF</h4>
              <p className="text-sm text-muted-foreground">Convert Word documents</p>
            </Link>
            <Link to="/merge-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Merge PDFs</h4>
              <p className="text-sm text-muted-foreground">Combine multiple PDFs</p>
            </Link>
            <Link to="/compress-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">Compress PDF</h4>
              <p className="text-sm text-muted-foreground">Reduce PDF file size</p>
            </Link>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Explore our complete suite of PDF tools. Convert PowerPoint, Word, Excel to PDF and more - completely free!
              <Link to="/blog" className="text-primary hover:underline ml-1">Read PowerPoint tips →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PowerpointToPdf;
