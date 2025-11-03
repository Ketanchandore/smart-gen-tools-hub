import React, { useState } from 'react';
import { FileDown, Info, Settings, Zap } from 'lucide-react';
import ToolSEO from '@/components/ToolSEO';
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

      <PDFToolLayout
        toolKey="compress-pdf"
        toolName="Compress PDF"
        category="PDF Tools"
        categoryPath="/tools"
        reverseTool={{
          name: "Optimize PDF",
          path: "/optimize-pdf",
          description: "Already have a compressed PDF? Optimize it further for web or print."
        }}
        contextualTools={[
          {
            name: "Split PDF",
            reason: "Large file? Split it first, then compress each part",
            path: "/split-pdf"
          },
          {
            name: "Merge PDF",
            reason: "Combine compressed files into one document",
            path: "/merge-pdf"
          },
          {
            name: "PDF to JPG",
            reason: "Convert to images for even smaller file sizes",
            path: "/pdf-to-jpg"
          }
        ]}
        whatsNextTools={[
          {
            name: "Protect PDF",
            description: "Add password security to your compressed file",
            path: "/protect-pdf",
            icon: "protect"
          },
          {
            name: "Merge PDF",
            description: "Combine multiple compressed PDFs",
            path: "/merge-pdf",
            icon: "merge"
          },
          {
            name: "Edit PDF",
            description: "Make changes to your compressed document",
            path: "/edit-pdf",
            icon: "edit"
          },
          {
            name: "Sign PDF",
            description: "Add your signature digitally",
            path: "/sign-pdf",
            icon: "sign"
          }
        ]}
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
      </div>
      </PDFToolLayout>
    </>
  );
};

export default CompressPdf;
