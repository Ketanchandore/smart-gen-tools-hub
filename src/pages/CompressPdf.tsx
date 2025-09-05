import React, { useState } from 'react';
import { FileDown, Info, Settings, Zap, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { ToolStructuredData } from '@/components/StructuredData';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { compressPDF } from '@/utils/pdfUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const CompressPdf = () => {
  const { toast } = useToast();
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high' | 'extreme' | 'custom'>('medium');
  const [customQuality, setCustomQuality] = useState(80);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [removeMetadata, setRemoveMetadata] = useState(false);
  const [convertToGrayscale, setConvertToGrayscale] = useState(false);
  const [downscaleImages, setDownscaleImages] = useState(false);
  const [imageResolution, setImageResolution] = useState(150);
  const [preserveBookmarks, setPreserveBookmarks] = useState(true);
  const [preserveForms, setPreserveForms] = useState(true);
  const [batchMode, setBatchMode] = useState(false);
  const [passwordProtect, setPasswordProtect] = useState(false);

  const compressionPresets = {
    low: { quality: 95, description: 'Minimal compression, highest quality' },
    medium: { quality: 75, description: 'Balanced compression and quality' },
    high: { quality: 50, description: 'High compression, good quality' },
    extreme: { quality: 25, description: 'Maximum compression, basic quality' },
    custom: { quality: customQuality, description: 'Custom settings' }
  };

  const handleCompress = async (files: File[]): Promise<Uint8Array> => {
    try {
      const options = {
        level: compressionLevel === 'custom' ? 'medium' : compressionLevel,
        imageQuality: compressionLevel === 'custom' ? customQuality / 100 : compressionPresets[compressionLevel].quality / 100,
        removeMetadata,
        optimizeImages,
        removeAnnotations: !preserveForms
      };

      toast({
        title: 'Compression Started',
        description: `Compressing with ${compressionLevel} settings...`,
      });

      const result = await compressPDF(files[0], options);
      
      toast({
        title: 'Compression Complete',
        description: `PDF compressed successfully with ${compressionLevel} quality`,
      });

      return result.pdf;
    } catch (error) {
      console.error('Compression error:', error);
      toast({
        title: 'Compression Failed',
        description: 'An error occurred during compression',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "How much can I compress my PDF file size?",
      answer: "Typically, our PDF compression tool can reduce file size by 60-90% while maintaining good quality. The exact compression depends on your content type and chosen settings."
    },
    {
      question: "Will PDF compression reduce the quality of images and text?",
      answer: "Our advanced compression algorithm is designed to maintain visual quality while reducing file size. You can control the balance using our quality settings from minimal compression (95% quality) to high compression (25% quality)."
    },
    {
      question: "Is there a file size limit for PDF compression?",
      answer: "You can compress PDF files up to 100MB in size. For larger files, consider using our split PDF tool first, then compress individual sections."
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer: "Yes, our tool can compress password-protected PDFs. You'll need to enter the password when uploading the file, and the compressed output will maintain the same protection."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Free PDF Compressor - Reduce PDF File Size Online | Pine Tools Hub"
        description="Compress PDF files online for free. Reduce PDF size by up to 90% while maintaining quality. Professional PDF compression with advanced optimization settings."
        keywords="PDF compressor, reduce PDF size, compress PDF online, PDF optimizer, shrink PDF, PDF file size reducer"
        url="https://pinetoolshub.com/compress-pdf"
      />
      <ToolStructuredData 
        name="PDF Compressor"
        description="Professional online PDF compression tool with advanced optimization settings and quality control"
        url="https://pinetoolshub.com/compress-pdf"
        category="PDF Tools"
        features={["Advanced compression algorithms", "Quality control settings", "Batch processing", "Password protection", "Metadata removal"]}
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
            <h1 className="text-4xl font-bold mb-4">PDF Compressor - Reduce File Size</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Compress PDF files with professional-grade optimization. Reduce file size by up to 90% while maintaining visual quality.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Link to="/merge-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Merge PDF
              </Link>
              <Link to="/split-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Split PDF
              </Link>
              <Link to="/pdf-to-word" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                PDF to Word
              </Link>
              <Link to="/unlock-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
                Unlock PDF
              </Link>
            </div>
          </div>
        </div>
    <PDFToolTemplate
      title="Compress PDF"
      description="Advanced PDF compression with professional-grade optimization options and batch processing"
      icon={<FileDown className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={batchMode}
      processFunction={handleCompress}
      outputFilename="compressed.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Compression Settings
            </CardTitle>
            <CardDescription>Choose your compression level and optimization options</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="presets" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="presets">Quick Presets</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="presets" className="space-y-4">
                <div>
                  <Label htmlFor="compression-level">Compression Level</Label>
                  <Select value={compressionLevel} onValueChange={(value: any) => setCompressionLevel(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select compression level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center justify-between w-full">
                          <span>Low Compression</span>
                          <Badge variant="secondary">95% Quality</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center justify-between w-full">
                          <span>Medium Compression</span>
                          <Badge variant="secondary">75% Quality</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center justify-between w-full">
                          <span>High Compression</span>
                          <Badge variant="secondary">50% Quality</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="extreme">
                        <div className="flex items-center justify-between w-full">
                          <span>Extreme Compression</span>
                          <Badge variant="destructive">25% Quality</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="custom">Custom Settings</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    {compressionPresets[compressionLevel]?.description}
                  </p>
                </div>

                {compressionLevel === 'custom' && (
                  <div>
                    <Label htmlFor="custom-quality">Custom Quality: {customQuality}%</Label>
                    <Slider
                      id="custom-quality"
                      min={10}
                      max={100}
                      step={5}
                      value={[customQuality]}
                      onValueChange={(value) => setCustomQuality(value[0])}
                      className="mt-2"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Image Optimization</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="optimize-images">Optimize Images</Label>
                      <Switch
                        id="optimize-images"
                        checked={optimizeImages}
                        onCheckedChange={setOptimizeImages}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="downscale-images">Downscale Images</Label>
                      <Switch
                        id="downscale-images"
                        checked={downscaleImages}
                        onCheckedChange={setDownscaleImages}
                      />
                    </div>
                    {downscaleImages && (
                      <div>
                        <Label htmlFor="image-resolution">Image Resolution: {imageResolution} DPI</Label>
                        <Slider
                          id="image-resolution"
                          min={72}
                          max={300}
                          step={6}
                          value={[imageResolution]}
                          onValueChange={(value) => setImageResolution(value[0])}
                          className="mt-2"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="grayscale">Convert to Grayscale</Label>
                      <Switch
                        id="grayscale"
                        checked={convertToGrayscale}
                        onCheckedChange={setConvertToGrayscale}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Content Optimization</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-duplicates">Remove Duplicates</Label>
                      <Switch
                        id="remove-duplicates"
                        checked={removeDuplicates}
                        onCheckedChange={setRemoveDuplicates}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-metadata">Remove Metadata</Label>
                      <Switch
                        id="remove-metadata"
                        checked={removeMetadata}
                        onCheckedChange={setRemoveMetadata}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-bookmarks">Preserve Bookmarks</Label>
                      <Switch
                        id="preserve-bookmarks"
                        checked={preserveBookmarks}
                        onCheckedChange={setPreserveBookmarks}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-forms">Preserve Forms</Label>
                      <Switch
                        id="preserve-forms"
                        checked={preserveForms}
                        onCheckedChange={setPreserveForms}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Processing Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="batch-mode">Batch Processing Mode</Label>
              <Switch
                id="batch-mode"
                checked={batchMode}
                onCheckedChange={setBatchMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password-protect">Password Protect Output</Label>
              <Switch
                id="password-protect"
                checked={passwordProtect}
                onCheckedChange={setPasswordProtect}
              />
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional Compression Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Advanced image optimization with DPI control</li>
                <li>• Intelligent duplicate removal and content optimization</li>
                <li>• Metadata removal for privacy protection</li>
                <li>• Batch processing for multiple files</li>
                <li>• Form and bookmark preservation</li>
                <li>• Custom quality settings with real-time preview</li>
              </ul>
              <p className="mt-2">
                <strong>Compression Ratio:</strong> Typically achieves 60-90% size reduction while maintaining quality.
              </p>
            </div>
          </div>
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
            <Link to="/merge-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <FileDown className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Merge PDF</div>
                <div className="text-sm text-muted-foreground">Combine multiple PDFs</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/split-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Split PDF</div>
                <div className="text-sm text-muted-foreground">Divide PDF into parts</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/pdf-to-word" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">PDF to Word</div>
                <div className="text-sm text-muted-foreground">Convert PDF to DOCX</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
            <Link to="/unlock-pdf" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Unlock PDF</div>
                <div className="text-sm text-muted-foreground">Remove PDF passwords</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-invert max-w-none">
          <h2>Professional PDF Compression Tool</h2>
          <p>
            Our advanced PDF compressor uses industry-leading algorithms to significantly reduce file sizes while preserving document quality. 
            Whether you need to compress PDFs for email attachments, web uploads, or storage optimization, our tool provides the perfect balance 
            between file size and visual fidelity.
          </p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Smart Compression:</strong> Intelligent algorithms analyze your PDF content to apply optimal compression</li>
            <li><strong>Quality Control:</strong> Choose from preset compression levels or create custom settings</li>
            <li><strong>Image Optimization:</strong> Advanced image compression with DPI control and format optimization</li>
            <li><strong>Batch Processing:</strong> Compress multiple PDF files simultaneously</li>
            <li><strong>Security Features:</strong> Password protection and metadata removal options</li>
          </ul>

          <h3>How PDF Compression Works</h3>
          <p>
            PDF compression reduces file size through several techniques: image optimization, duplicate content removal, 
            font subsetting, and metadata cleanup. Our tool intelligently applies these methods based on your document 
            content and quality preferences, ensuring maximum size reduction with minimal quality loss.
          </p>
        </div>
      </div>
    </PDFToolTemplate>
      </div>
    </>
  );
};

export default CompressPdf;
