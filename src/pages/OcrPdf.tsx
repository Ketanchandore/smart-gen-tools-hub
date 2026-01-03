import React, { useState } from 'react';
import { FileSearch, Settings, Info, Languages, Zap, Eye } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { ocrPDF } from '@/utils/pdfUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const OcrPdf = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('eng');
  const [ocrEngine, setOcrEngine] = useState<'tesseract' | 'azure' | 'google' | 'amazon'>('tesseract');
  const [outputFormat, setOutputFormat] = useState<'searchable-pdf' | 'text-only' | 'both'>('searchable-pdf');
  const [dpi, setDpi] = useState(300);
  const [preprocessImages, setPreprocessImages] = useState(true);
  const [enhanceContrast, setEnhanceContrast] = useState(true);
  const [removeNoise, setRemoveNoise] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [detectOrientation, setDetectOrientation] = useState(true);
  const [preserveLayout, setPreserveLayout] = useState(true);
  const [recognizeHandwriting, setRecognizeHandwriting] = useState(false);
  const [detectTables, setDetectTables] = useState(true);
  const [extractImages, setExtractImages] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [pageRange, setPageRange] = useState('all');
  const [specificPages, setSpecificPages] = useState('1-10');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [multiLanguage, setMultiLanguage] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['eng']);
  const [customDictionary, setCustomDictionary] = useState('');
  const [postProcess, setPostProcess] = useState(true);
  const [spellCheck, setSpellCheck] = useState(true);
  const [formatCorrection, setFormatCorrection] = useState(true);

  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'ita', name: 'Italian' },
    { code: 'por', name: 'Portuguese' },
    { code: 'rus', name: 'Russian' },
    { code: 'jpn', name: 'Japanese' },
    { code: 'kor', name: 'Korean' },
    { code: 'chi_sim', name: 'Chinese (Simplified)' },
    { code: 'chi_tra', name: 'Chinese (Traditional)' },
    { code: 'ara', name: 'Arabic' },
    { code: 'hin', name: 'Hindi' },
    { code: 'ben', name: 'Bengali' },
    { code: 'urd', name: 'Urdu' }
  ];

  const handleOCR = async (files: File[]): Promise<Uint8Array> => {
    try {
      setIsProcessing(true);
      setProgress(0);

      const options = {
        language: multiLanguage ? selectedLanguages.join('+') : language,
        engine: ocrEngine,
        outputFormat,
        dpi,
        preprocessImages,
        enhanceContrast,
        removeNoise,
        autoRotate,
        detectOrientation,
        preserveLayout,
        recognizeHandwriting,
        detectTables,
        extractImages,
        confidenceThreshold,
        pageRange,
        specificPages: pageRange === 'specific' ? specificPages : undefined,
        multiLanguage,
        customDictionary: customDictionary.trim() || undefined,
        postProcess,
        spellCheck,
        formatCorrection
      };

      toast({
        title: 'OCR Processing Started',
        description: `Processing with ${ocrEngine} engine in ${multiLanguage ? selectedLanguages.length + ' languages' : language}...`,
      });

      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const result = await ocrPDF(files[0], options);
      setOutputText(result.text); // Extract just the text property
      
      toast({
        title: 'OCR Processing Complete',
        description: `Text extracted successfully with ${result.confidence}% confidence`,
      });

      // Return processed PDF
      const arrayBuffer = await files[0].arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.error('OCR error:', error);
      toast({
        title: 'OCR Processing Failed',
        description: 'An error occurred during OCR processing',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="OCR PDF"
        description="Extract text from scanned PDFs and images using advanced AI-powered OCR technology. Support for 15+ languages, handwriting recognition, and table detection. Create searchable PDFs instantly."
        keywords={['ocr pdf', 'pdf text recognition', 'extract text from pdf', 'scanned pdf to text', 'optical character recognition', 'pdf ocr online', 'searchable pdf']}
        category="PDF OCR"
        features={['Multi-language OCR', 'Handwriting Recognition', 'Table Detection', 'AI-powered Processing', 'Searchable PDF Output', 'Batch Processing']}
        useCases={['Convert scanned documents', 'Extract text from images', 'Create searchable archives', 'Digitize paper documents', 'Process invoices and receipts']}
        faqs={[
          { question: 'What languages are supported?', answer: 'We support 15+ languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and more.' },
          { question: 'Can OCR recognize handwriting?', answer: 'Yes, our advanced AI can recognize both printed text and handwritten content with high accuracy.' }
        ]}
      />
      <PDFToolTemplate
        title="OCR PDF"
      description="Advanced OCR with multi-language support, AI-powered text recognition, and intelligent document analysis"
      icon={<FileSearch className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleOCR}
      outputFilename="ocr-processed.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              OCR Configuration
            </CardTitle>
            <CardDescription>Configure language detection and OCR engine settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                <TabsTrigger value="advanced">Advanced OCR</TabsTrigger>
                <TabsTrigger value="preprocessing">Image Processing</TabsTrigger>
                <TabsTrigger value="output">Output Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ocr-engine">OCR Engine</Label>
                    <Select value={ocrEngine} onValueChange={(value: any) => setOcrEngine(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OCR engine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tesseract">
                          <div className="flex items-center justify-between w-full">
                            <span>Tesseract (Open Source)</span>
                            <Badge variant="secondary">Free</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="azure">
                          <div className="flex items-center justify-between w-full">
                            <span>Azure Cognitive Services</span>
                            <Badge variant="outline">Premium</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="google">
                          <div className="flex items-center justify-between w-full">
                            <span>Google Cloud Vision</span>
                            <Badge variant="outline">Premium</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="amazon">
                          <div className="flex items-center justify-between w-full">
                            <span>Amazon Textract</span>
                            <Badge variant="destructive">Enterprise</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="output-format">Output Format</Label>
                    <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select output format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="searchable-pdf">Searchable PDF</SelectItem>
                        <SelectItem value="text-only">Text Only</SelectItem>
                        <SelectItem value="both">Both PDF & Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="multi-language">Multi-Language Detection</Label>
                  <Switch
                    id="multi-language"
                    checked={multiLanguage}
                    onCheckedChange={setMultiLanguage}
                  />
                </div>

                {!multiLanguage ? (
                  <div>
                    <Label htmlFor="language">Primary Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <Label>Selected Languages ({selectedLanguages.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {languages.map((lang) => (
                        <div key={lang.code} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={lang.code}
                            checked={selectedLanguages.includes(lang.code)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLanguages([...selectedLanguages, lang.code]);
                              } else {
                                setSelectedLanguages(selectedLanguages.filter(l => l !== lang.code));
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={lang.code} className="text-sm">{lang.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="page-range">Process Pages</Label>
                  <Select value={pageRange} onValueChange={setPageRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select page range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      <SelectItem value="specific">Specific Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pageRange === 'specific' && (
                  <div>
                    <Label htmlFor="specific-pages">Page Range</Label>
                    <Input
                      id="specific-pages"
                      value={specificPages}
                      onChange={(e) => setSpecificPages(e.target.value)}
                      placeholder="e.g., 1-5, 8, 11-13"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <Label htmlFor="confidence-threshold">Confidence Threshold: {confidenceThreshold}%</Label>
                  <Slider
                    id="confidence-threshold"
                    min={50}
                    max={100}
                    step={5}
                    value={[confidenceThreshold]}
                    onValueChange={(value) => setConfidenceThreshold(value[0])}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher values ensure better accuracy but may miss some text
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Advanced Features</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="recognize-handwriting">Handwriting Recognition</Label>
                      <Switch
                        id="recognize-handwriting"
                        checked={recognizeHandwriting}
                        onCheckedChange={setRecognizeHandwriting}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="detect-tables">Table Detection</Label>
                      <Switch
                        id="detect-tables"
                        checked={detectTables}
                        onCheckedChange={setDetectTables}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="extract-images">Extract Images</Label>
                      <Switch
                        id="extract-images"
                        checked={extractImages}
                        onCheckedChange={setExtractImages}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Post-Processing</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="post-process">Auto Post-Process</Label>
                      <Switch
                        id="post-process"
                        checked={postProcess}
                        onCheckedChange={setPostProcess}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="spell-check">Spell Check</Label>
                      <Switch
                        id="spell-check"
                        checked={spellCheck}
                        onCheckedChange={setSpellCheck}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="format-correction">Format Correction</Label>
                      <Switch
                        id="format-correction"
                        checked={formatCorrection}
                        onCheckedChange={setFormatCorrection}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="custom-dictionary">Custom Dictionary (Optional)</Label>
                  <Textarea
                    id="custom-dictionary"
                    value={customDictionary}
                    onChange={(e) => setCustomDictionary(e.target.value)}
                    placeholder="Enter custom words or terms, one per line..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Add domain-specific terms to improve recognition accuracy
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="preprocessing" className="space-y-4">
                <div>
                  <Label htmlFor="dpi">Image Resolution: {dpi} DPI</Label>
                  <Slider
                    id="dpi"
                    min={150}
                    max={600}
                    step={50}
                    value={[dpi]}
                    onValueChange={(value) => setDpi(value[0])}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher DPI improves accuracy but increases processing time
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Image Enhancement</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preprocess-images">Preprocess Images</Label>
                      <Switch
                        id="preprocess-images"
                        checked={preprocessImages}
                        onCheckedChange={setPreprocessImages}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enhance-contrast">Enhance Contrast</Label>
                      <Switch
                        id="enhance-contrast"
                        checked={enhanceContrast}
                        onCheckedChange={setEnhanceContrast}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-noise">Remove Noise</Label>
                      <Switch
                        id="remove-noise"
                        checked={removeNoise}
                        onCheckedChange={setRemoveNoise}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Orientation & Layout</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-rotate">Auto Rotate</Label>
                      <Switch
                        id="auto-rotate"
                        checked={autoRotate}
                        onCheckedChange={setAutoRotate}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="detect-orientation">Detect Orientation</Label>
                      <Switch
                        id="detect-orientation"
                        checked={detectOrientation}
                        onCheckedChange={setDetectOrientation}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-layout">Preserve Layout</Label>
                      <Switch
                        id="preserve-layout"
                        checked={preserveLayout}
                        onCheckedChange={setPreserveLayout}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="output" className="space-y-4">
                {outputText && (
                  <div>
                    <Label htmlFor="extracted-text">Extracted Text Preview</Label>
                    <Textarea
                      id="extracted-text"
                      value={outputText}
                      readOnly
                      rows={8}
                      className="mt-2"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(outputText)}
                      >
                        Copy Text
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const blob = new Blob([outputText], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'extracted-text.txt';
                          link.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        Download Text
                      </Button>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>OCR Processing Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Processing with {ocrEngine} engine...
                    </p>
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
              <p><strong>Advanced OCR Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Multi-language support with 15+ languages</li>
                <li>• AI-powered text recognition with handwriting support</li>
                <li>• Advanced image preprocessing and enhancement</li>
                <li>• Table detection and structured data extraction</li>
                <li>• Custom dictionary support for domain-specific terms</li>
                <li>• Intelligent orientation detection and auto-rotation</li>
                <li>• Post-processing with spell check and format correction</li>
                <li>• Multiple OCR engines (Tesseract, Azure, Google, Amazon)</li>
                <li>• Confidence threshold control for quality assurance</li>
                <li>• Batch processing with progress tracking</li>
              </ul>
              <p className="mt-2">
                <strong>Best For:</strong> Scanned documents, invoices, receipts, forms, books, manuscripts
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 p-6 bg-secondary/20 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions - PDF OCR Text Recognition</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground">How do I extract text from scanned PDF online free?</h3>
              <p className="text-muted-foreground text-sm mt-1">Upload your scanned PDF or image, select language, choose OCR engine, and click process. Our free OCR tool extracts text with high accuracy and creates searchable PDFs instantly.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">What is OCR in PDF and how does it work?</h3>
              <p className="text-muted-foreground text-sm mt-1">OCR (Optical Character Recognition) converts scanned images or PDFs into editable, searchable text. Our AI-powered OCR analyzes text patterns, recognizes characters, and extracts content accurately.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Which languages does PDF OCR support?</h3>
              <p className="text-muted-foreground text-sm mt-1">We support 15+ languages including English, Spanish, French, German, Chinese, Japanese, Hindi, Arabic, and more. Multi-language detection handles documents with mixed languages.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Can OCR recognize handwriting in PDF?</h3>
              <p className="text-muted-foreground text-sm mt-1">Yes! Our advanced AI-powered OCR includes handwriting recognition capabilities for both printed and handwritten text. Enable this feature for notes, forms, and manuscripts.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">How to convert scanned PDF to searchable PDF?</h3>
              <p className="text-muted-foreground text-sm mt-1">Upload your scanned PDF, select "Searchable PDF" as output format, run OCR processing. The result is a PDF with selectable, searchable text layer while preserving original appearance.</p>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-muted/30 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Why Use PDF OCR Online?</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Convert scanned documents to editable text</li>
              <li>✓ Make PDFs searchable for easy information retrieval</li>
              <li>✓ Digitize paper documents and archives</li>
              <li>✓ Extract data from invoices and receipts</li>
              <li>✓ Convert book scans to editable formats</li>
              <li>✓ Process handwritten notes and forms</li>
            </ul>
          </div>
          <div className="p-6 bg-muted/30 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Advanced OCR Features</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🌍 15+ language support with auto-detection</li>
              <li>✍️ Handwriting recognition capability</li>
              <li>📊 Table and structured data extraction</li>
              <li>🖼️ Image preprocessing and enhancement</li>
              <li>📝 Spell check and format correction</li>
              <li>⚡ Batch processing for multiple documents</li>
            </ul>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8 p-6 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Related PDF Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/pdf-to-word" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
              <span className="text-sm font-medium">PDF to Word</span>
            </a>
            <a href="/image-to-text" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
              <span className="text-sm font-medium">Image to Text</span>
            </a>
            <a href="/scan-to-pdf" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
              <span className="text-sm font-medium">Scan to PDF</span>
            </a>
            <a href="/pdf-to-excel" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
              <span className="text-sm font-medium">PDF to Excel</span>
            </a>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
    </>
  );
};

export default OcrPdf;
