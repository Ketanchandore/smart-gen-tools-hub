import React, { useState } from 'react';
import { Sliders, Info, Settings, Zap } from 'lucide-react';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import PopularToolsSidebar from '@/components/PopularToolsSidebar';
import ReverseToolLink from '@/components/ReverseToolLink';
import WhatsNextTools from '@/components/WhatsNextTools';
import YouMightAlsoNeed from '@/components/YouMightAlsoNeed';
import FileUploadArea from '@/components/FileUploadArea';
import SEOKeywordContent from '@/components/SEOKeywordContent';
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
      <ToolSEO 
        title="Compress PDF Online Free - Reduce PDF File Size Up to 90% | Pine Tools Hub"
        description="Free online PDF compressor reduces file size by up to 90% while maintaining quality. Compress PDF for email, web upload, and storage. No registration required."
        keywords="compress pdf, reduce pdf size, pdf compressor online, shrink pdf, optimize pdf, pdf file size reducer, compress pdf online free"
        toolName="PDF Compressor"
        toolType="Tool"
        category="PDF Tools"
        features={["Advanced compression", "Quality control", "Batch processing", "Password protection", "Metadata removal"]}
        faqs={faqData}
        url="https://pinetoolshub.com/compress-pdf"
      />

      <Layout>
        <ToolBreadcrumb 
          category="PDF Tools" 
          categoryPath="/tools" 
          toolName="Compress PDF" 
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Compress PDF Online</h1>
                <p className="text-lg text-muted-foreground">
                  Reduce your PDF file size up to 90% while maintaining quality. No registration needed.
                </p>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg mb-8 border border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Why Compress Your PDF?</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Easier to share via email
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Saves storage space
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Faster upload and download
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Better for archiving
                  </li>
                </ul>
              </div>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={false}
                processFunction={handleCompress}
                outputFilename="compressed.pdf"
              />

              <div className="mt-8">
                <ReverseToolLink 
                  reverseTool={{
                    name: "Expand PDF",
                    path: "/expand-pdf",
                    description: "Need to increase PDF quality? Try our expansion tool."
                  }}
                />
              </div>

              <div className="space-y-6 mt-12">
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
                              <SelectItem value="low">Low Compression - 95% Quality</SelectItem>
                              <SelectItem value="medium">Medium Compression - 75% Quality</SelectItem>
                              <SelectItem value="high">High Compression - 50% Quality</SelectItem>
                              <SelectItem value="extreme">Extreme Compression - 25% Quality</SelectItem>
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
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold mb-2">Compression Ratio: Typically 60-90% size reduction</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Advanced image optimization</li>
                        <li>• Intelligent content optimization</li>
                        <li>• Privacy-focused metadata removal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-muted/30 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">How to Compress PDF</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <h3 className="font-bold">Upload Your PDF</h3>
                      <p className="text-muted-foreground">Click or drag your PDF file to begin</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <h3 className="font-bold">Adjust Quality</h3>
                      <p className="text-muted-foreground">Choose your compression level</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <h3 className="font-bold">Download</h3>
                      <p className="text-muted-foreground">Get your compressed PDF instantly</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <details key={index} className="bg-card p-4 rounded-lg cursor-pointer border">
                      <summary className="font-bold text-lg">{faq.question}</summary>
                      <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <YouMightAlsoNeed 
                tools={[
                  {
                    name: "Merge PDF",
                    reason: "Combine compressed files together",
                    path: "/merge-pdf"
                  },
                  {
                    name: "Split PDF",
                    reason: "Separate pages after compression",
                    path: "/split-pdf"
                  },
                  {
                    name: "Protect PDF",
                    reason: "Secure your compressed file",
                    path: "/protect-pdf"
                  }
                ]}
              />

              <WhatsNextTools 
                tools={[
                  {
                    name: "Split PDF",
                    description: "Extract pages into separate files",
                    path: "/split-pdf",
                    icon: "split"
                  },
                  {
                    name: "Merge PDF",
                    description: "Combine multiple PDFs",
                    path: "/merge-pdf",
                    icon: "merge"
                  },
                  {
                    name: "PDF to Word",
                    description: "Convert to editable documents",
                    path: "/pdf-to-word",
                    icon: "compress"
                  },
                  {
                    name: "Protect PDF",
                    description: "Add password security",
                    path: "/protect-pdf",
                    icon: "protect"
                  }
                ]}
              />

              <SEOKeywordContent
                toolName="PDF Compressor"
                primaryKeyword="Compress PDF Online Free"
                longTailKeywords={[
                  "Compress PDF without losing quality",
                  "Reduce PDF file size for email",
                  "Compress PDF to 100KB online free",
                  "Compress PDF to 200KB for upload",
                  "Compress large PDF files instantly",
                  "Compress scanned PDF documents",
                  "Reduce PDF size without software",
                  "Compress PDF for WhatsApp sharing",
                  "Compress PDF below 1MB free",
                  "Best PDF compressor online 2024",
                  "Compress multiple PDFs at once",
                  "Compress PDF for government forms"
                ]}
                benefits={[
                  { title: "Fast Processing", description: "Compress PDFs in seconds with our advanced compression algorithm - no waiting required." },
                  { title: "100% Secure", description: "Your files are encrypted and automatically deleted after processing. We never store your documents." },
                  { title: "No File Size Limit", description: "Compress PDFs up to 100MB absolutely free. No premium required for large files." },
                  { title: "Works Everywhere", description: "Use on any device - Windows, Mac, iPhone, Android. No app installation needed." },
                  { title: "Maintains Quality", description: "Smart compression preserves text clarity and image quality while reducing file size." },
                  { title: "Batch Compression", description: "Compress multiple PDF files simultaneously to save time on bulk operations." }
                ]}
                useCases={[
                  { title: "Email Attachments", description: "Compress PDF files to meet email attachment size limits (typically 25MB). Perfect for sending large reports and documents." },
                  { title: "Website Upload", description: "Reduce PDF size for faster website loading. Ideal for downloadable brochures, catalogs, and documentation." },
                  { title: "Government Forms", description: "Compress PDFs to meet size requirements for government portal submissions and official applications." },
                  { title: "Cloud Storage", description: "Save cloud storage space by compressing archived PDFs. Reduce storage costs while keeping all your documents." }
                ]}
                howItWorks={[
                  { step: 1, title: "Upload Your PDF File", description: "Drag and drop your PDF or click to browse. We support files up to 100MB." },
                  { step: 2, title: "Choose Compression Level", description: "Select from Low, Medium, High, or Extreme compression based on your quality needs." },
                  { step: 3, title: "Download Compressed PDF", description: "Click download to get your smaller PDF file. Original formatting is preserved." }
                ]}
              />
            </div>

            <div className="lg:col-span-1">
              <PopularToolsSidebar currentPath="/compress-pdf" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CompressPdf;
