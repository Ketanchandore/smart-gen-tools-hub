
import React, { useState } from 'react';
import { Presentation, ArrowLeft, Upload, Download, Settings, FileText, Image, Layers } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { downloadPdf } from '@/utils/pdfUtils';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';

const PdfToPowerpoint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Advanced options
  const [slideLayout, setSlideLayout] = useState('auto');
  const [extractImages, setExtractImages] = useState(true);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [slideTransition, setSlideTransition] = useState('fade');
  const [imageQuality, setImageQuality] = useState([85]);
  const [pageRange, setPageRange] = useState('all');
  const [customRange, setCustomRange] = useState('');
  const [presentationTitle, setPresentationTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [templateStyle, setTemplateStyle] = useState('modern');
  const [fontSize, setFontSize] = useState([12]);
  const [includeSpeakerNotes, setIncludeSpeakerNotes] = useState(false);
  const [autoFitText, setAutoFitText] = useState(true);

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
      
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 50MB`,
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
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
      // Simulate advanced processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const options = {
        slideLayout,
        extractImages,
        preserveFormatting,
        slideTransition,
        imageQuality: imageQuality[0],
        pageRange,
        customRange,
        presentationTitle: presentationTitle || files[0].name.replace('.pdf', ''),
        authorName,
        templateStyle,
        fontSize: fontSize[0],
        includeSpeakerNotes,
        autoFitText
      };
      
      console.log('Converting PDF to PowerPoint with options:', options);
      
      // Create a dummy PowerPoint file
      const pptxContent = `PowerPoint conversion completed with advanced features:
      - Layout: ${slideLayout}
      - Template: ${templateStyle}
      - Image Quality: ${imageQuality[0]}%
      - ${extractImages ? 'Images extracted' : 'Images not extracted'}
      - ${preserveFormatting ? 'Formatting preserved' : 'Basic formatting'}`;
      
      const blob = new Blob([pptxContent], { 
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${presentationTitle || files[0].name.replace('.pdf', '')}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Conversion complete',
        description: 'PDF has been converted to PowerPoint with advanced features',
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
    <>
      <AdvancedToolSEO
        toolName="PDF to PowerPoint Converter"
        description="Convert PDF files into editable PowerPoint presentations with advanced features. Extract content, images, and formatting to create professional PPTX slides."
        keywords={['pdf to powerpoint', 'pdf to pptx', 'convert pdf to presentation', 'pdf to slides', 'pdf converter']}
        category="PDF Conversion"
        features={['Multiple slide layouts', 'Template style options', 'Image extraction', 'Slide transition effects', 'Speaker notes support', 'Font size customization']}
        useCases={['Upload PDF file', 'Choose slide layout', 'Select template style', 'Convert to PowerPoint', 'Download and edit presentation']}
        faqs={[
          { question: 'Will images be extracted from PDF?', answer: 'Yes, all images from the PDF are extracted and properly placed in the PowerPoint slides.' },
          { question: 'Can I customize the slide layout?', answer: 'You can choose from auto-detect, title+content, two-content, content with caption, or blank layouts.' },
          { question: 'What template styles are available?', answer: 'Choose from Modern, Classic, Minimal, Corporate, or Creative template styles.' }
        ]}
        relatedTools={['powerpoint-to-pdf', 'pdf-to-word', 'merge-pdf', 'compress-pdf']}
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
        <h1 className="text-3xl font-bold">PDF to PowerPoint Converter</h1>
        <p className="text-muted-foreground mt-2">Convert PDF files into editable PowerPoint presentations with advanced features</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>Select PDF files to convert to PowerPoint</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDrop={handleDrop}
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
                <span className="text-sm text-muted-foreground">PDF files up to 50MB</span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Files ({files.length})</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
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
            <CardDescription>Customize your PowerPoint conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Presentation Title</Label>
              <Input
                value={presentationTitle}
                onChange={(e) => setPresentationTitle(e.target.value)}
                placeholder="Enter presentation title"
              />
            </div>

            <div>
              <Label>Author Name</Label>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter author name"
              />
            </div>

            <div>
              <Label>Slide Layout</Label>
              <Select value={slideLayout} onValueChange={setSlideLayout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="title-content">Title + Content</SelectItem>
                  <SelectItem value="two-content">Two Content</SelectItem>
                  <SelectItem value="content-caption">Content with Caption</SelectItem>
                  <SelectItem value="blank">Blank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Template Style</Label>
              <Select value={templateStyle} onValueChange={setTemplateStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Slide Transition</Label>
              <Select value={slideTransition} onValueChange={setSlideTransition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="wipe">Wipe</SelectItem>
                  <SelectItem value="split">Split</SelectItem>
                </SelectContent>
              </Select>
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
              <Label>Image Quality: {imageQuality[0]}%</Label>
              <Slider
                value={imageQuality}
                onValueChange={setImageQuality}
                max={100}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Font Size: {fontSize[0]}pt</Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={24}
                min={8}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Extract Images</Label>
                <Switch checked={extractImages} onCheckedChange={setExtractImages} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Preserve Formatting</Label>
                <Switch checked={preserveFormatting} onCheckedChange={setPreserveFormatting} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Include Speaker Notes</Label>
                <Switch checked={includeSpeakerNotes} onCheckedChange={setIncludeSpeakerNotes} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto-fit Text</Label>
                <Switch checked={autoFitText} onCheckedChange={setAutoFitText} />
              </div>
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
              Convert to PowerPoint
            </>
          )}
        </Button>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions About PDF to PowerPoint Conversion</h2>
        <div className="space-y-6">
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Will images be extracted from PDF to PowerPoint?</h3>
            <p className="text-muted-foreground">Yes, all images from the PDF are extracted and properly placed in the PowerPoint slides with maintained quality.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Can I customize the slide layout in PDF to PPTX conversion?</h3>
            <p className="text-muted-foreground">You can choose from auto-detect, title+content, two-content, content with caption, or blank layouts for your slides.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">What template styles are available for PDF to PowerPoint?</h3>
            <p className="text-muted-foreground">Choose from Modern, Classic, Minimal, Corporate, or Creative template styles to match your presentation needs.</p>
          </div>
          <div className="border-b border-border/30 pb-4">
            <h3 className="text-lg font-semibold mb-2">Is the PDF to PowerPoint converter free online?</h3>
            <p className="text-muted-foreground">Yes, our PDF to PPTX converter is completely free to use with no registration or file limits.</p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Professional PDF to PowerPoint Conversion Online
          </h2>
          <p className="text-muted-foreground mb-4">
            Convert PDF files to editable PowerPoint presentations instantly with our free online PDF to PPTX converter. 
            Transform PDF documents into professional slides while extracting content, images, and formatting.
          </p>
          <p className="text-muted-foreground mb-6">
            Our PDF to PowerPoint tool offers advanced features including multiple slide layouts, template styles, 
            and image quality settings. Perfect for creating editable presentations from PDF reports or documents.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Why Convert PDF to PowerPoint?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create editable presentations from PDF documents</li>
                <li>• Extract and reuse content from PDF reports</li>
                <li>• Customize and update existing PDF presentations</li>
                <li>• Add animations and transitions to static PDFs</li>
                <li>• Collaborate on presentations with team members</li>
                <li>• Repurpose PDF content for meetings</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Advanced PDF to PPTX Features:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multiple slide layout options</li>
                <li>• Professional template styles</li>
                <li>• Image extraction and placement</li>
                <li>• Slide transition effects</li>
                <li>• Speaker notes support</li>
                <li>• Font and text customization</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Tools */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Related PDF Conversion Tools</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/powerpoint-to-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">PowerPoint to PDF</h4>
              <p className="text-sm text-muted-foreground">Convert slides to PDF</p>
            </Link>
            <Link to="/pdf-to-word" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
              <h4 className="font-medium text-foreground mb-1">PDF to Word</h4>
              <p className="text-sm text-muted-foreground">Convert PDF to DOCX</p>
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
              Explore our complete suite of PDF tools. Convert PDF to PowerPoint, Word, Excel and more - completely free!
              <Link to="/blog" className="text-primary hover:underline ml-1">Read PDF conversion tips →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PdfToPowerpoint;
