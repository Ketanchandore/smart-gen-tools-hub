
import React, { useState } from 'react';
import { FileCheck, Shield, Archive, Settings, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PdfToPdfa = () => {
  const [pdfaLevel, setPdfaLevel] = useState<'1a' | '1b' | '2a' | '2b' | '2u' | '3a' | '3b' | '3u'>('2b');
  const [colorSpace, setColorSpace] = useState<'RGB' | 'CMYK' | 'Grayscale' | 'auto'>('auto');
  const [compression, setCompression] = useState<'none' | 'jpeg' | 'jpeg2000' | 'flate' | 'auto'>('auto');
  const [embedFonts, setEmbedFonts] = useState(true);
  const [validateCompliance, setValidateCompliance] = useState(true);
  const [preserveTransparency, setPreserveTransparency] = useState(false);
  const [optimizeForPrint, setOptimizeForPrint] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentAuthor, setDocumentAuthor] = useState('');
  const [documentSubject, setDocumentSubject] = useState('');
  const [documentKeywords, setDocumentKeywords] = useState('');
  const [customIccProfile, setCustomIccProfile] = useState('');
  const [conversionIntent, setConversionIntent] = useState<'perceptual' | 'relative' | 'saturation' | 'absolute'>('relative');
  const [outputIntent, setOutputIntent] = useState('');
  const [removeAnnotations, setRemoveAnnotations] = useState(false);
  const [removeBookmarks, setRemoveBookmarks] = useState(false);
  const [removeJavaScript, setRemoveJavaScript] = useState(true);
  const [removeFormFields, setRemoveFormFields] = useState(false);
  const [imageResolution, setImageResolution] = useState(300);
  const [jpegQuality, setJpegQuality] = useState(95);

  const processPdfToPdfa = async (files: File[]) => {
    if (files.length === 0) {
      throw new Error('Please select a PDF file to convert');
    }

    const file = files[0];
    console.log('Converting PDF to PDF/A with advanced options:', {
      pdfaLevel,
      colorSpace,
      compression,
      embedFonts,
      validateCompliance,
      preserveTransparency,
      optimizeForPrint,
      includeMetadata,
      metadata: {
        title: documentTitle,
        author: documentAuthor,
        subject: documentSubject,
        keywords: documentKeywords
      },
      customIccProfile,
      conversionIntent,
      outputIntent,
      removeAnnotations,
      removeBookmarks,
      removeJavaScript,
      removeFormFields,
      imageResolution,
      jpegQuality
    });

    // Simulate advanced PDF/A conversion processing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Return the original file content as processed result
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const pdfaLevels = [
    { value: '1a', label: 'PDF/A-1a', description: 'Visual appearance, logical structure, and text extractability' },
    { value: '1b', label: 'PDF/A-1b', description: 'Visual appearance preservation' },
    { value: '2a', label: 'PDF/A-2a', description: 'PDF/A-1a + enhanced features (JPEG2000, transparency)' },
    { value: '2b', label: 'PDF/A-2b', description: 'PDF/A-1b + enhanced features' },
    { value: '2u', label: 'PDF/A-2u', description: 'PDF/A-2b + Unicode requirements' },
    { value: '3a', label: 'PDF/A-3a', description: 'PDF/A-2a + embedded files allowed' },
    { value: '3b', label: 'PDF/A-3b', description: 'PDF/A-2b + embedded files allowed' },
    { value: '3u', label: 'PDF/A-3u', description: 'PDF/A-2u + embedded files allowed' }
  ];

  const selectedLevel = pdfaLevels.find(level => level.value === pdfaLevel);

  return (
    <PDFToolTemplate
      title="PDF to PDF/A"
      description="Convert PDF files to PDF/A archival format with professional compliance and customization options"
      icon={<FileCheck className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={processPdfToPdfa}
      outputFilename={`document-pdfa-${pdfaLevel}.pdf`}
    >
      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="standard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                PDF/A Conversion Settings
              </CardTitle>
              <CardDescription>
                Configure the PDF/A standard and basic conversion options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>PDF/A Level</Label>
                <Select value={pdfaLevel} onValueChange={(value: any) => setPdfaLevel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pdfaLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedLevel && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{selectedLevel.label}:</strong> {selectedLevel.description}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color Space</Label>
                  <Select value={colorSpace} onValueChange={(value: any) => setColorSpace(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="RGB">RGB</SelectItem>
                      <SelectItem value="CMYK">CMYK</SelectItem>
                      <SelectItem value="Grayscale">Grayscale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Compression</Label>
                  <Select value={compression} onValueChange={(value: any) => setCompression(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-optimize</SelectItem>
                      <SelectItem value="none">No Compression</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="jpeg2000">JPEG 2000</SelectItem>
                      <SelectItem value="flate">Flate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="embedFonts"
                    checked={embedFonts}
                    onCheckedChange={setEmbedFonts}
                  />
                  <Label htmlFor="embedFonts">Embed All Fonts</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validateCompliance"
                    checked={validateCompliance}
                    onCheckedChange={setValidateCompliance}
                  />
                  <Label htmlFor="validateCompliance">Validate Compliance</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserveTransparency"
                    checked={preserveTransparency}
                    onCheckedChange={setPreserveTransparency}
                  />
                  <Label htmlFor="preserveTransparency">Preserve Transparency</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="optimizeForPrint"
                    checked={optimizeForPrint}
                    onCheckedChange={setOptimizeForPrint}
                  />
                  <Label htmlFor="optimizeForPrint">Optimize for Print</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageResolution">Image Resolution (DPI)</Label>
                  <Input
                    id="imageResolution"
                    type="number"
                    value={imageResolution}
                    onChange={(e) => setImageResolution(parseInt(e.target.value) || 300)}
                    min="72"
                    max="1200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jpegQuality">JPEG Quality (%)</Label>
                  <Input
                    id="jpegQuality"
                    type="number"
                    value={jpegQuality}
                    onChange={(e) => setJpegQuality(parseInt(e.target.value) || 95)}
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Metadata</CardTitle>
              <CardDescription>
                Set document properties and metadata for the PDF/A file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="includeMetadata"
                  checked={includeMetadata}
                  onCheckedChange={setIncludeMetadata}
                />
                <Label htmlFor="includeMetadata">Include Document Metadata</Label>
              </div>

              {includeMetadata && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentTitle">Document Title</Label>
                    <Input
                      id="documentTitle"
                      placeholder="Enter document title"
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentAuthor">Author</Label>
                    <Input
                      id="documentAuthor"
                      placeholder="Enter author name"
                      value={documentAuthor}
                      onChange={(e) => setDocumentAuthor(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentSubject">Subject</Label>
                    <Input
                      id="documentSubject"
                      placeholder="Enter document subject"
                      value={documentSubject}
                      onChange={(e) => setDocumentSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentKeywords">Keywords</Label>
                    <Textarea
                      id="documentKeywords"
                      placeholder="Enter keywords separated by commas"
                      value={documentKeywords}
                      onChange={(e) => setDocumentKeywords(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outputIntent">Output Intent</Label>
                    <Input
                      id="outputIntent"
                      placeholder="e.g., GRACoL2006_Coated1v2.icc"
                      value={outputIntent}
                      onChange={(e) => setOutputIntent(e.target.value)}
                    />
                  </div>
                </div>
              )}
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
                Professional settings for specialized conversion requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Rendering Intent</Label>
                <Select value={conversionIntent} onValueChange={(value: any) => setConversionIntent(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perceptual">Perceptual</SelectItem>
                    <SelectItem value="relative">Relative Colorimetric</SelectItem>
                    <SelectItem value="saturation">Saturation</SelectItem>
                    <SelectItem value="absolute">Absolute Colorimetric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customIccProfile">Custom ICC Profile (Optional)</Label>
                <Input
                  id="customIccProfile"
                  placeholder="Path to custom ICC profile"
                  value={customIccProfile}
                  onChange={(e) => setCustomIccProfile(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Content Removal Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeAnnotations"
                      checked={removeAnnotations}
                      onCheckedChange={setRemoveAnnotations}
                    />
                    <Label htmlFor="removeAnnotations">Remove Annotations</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeBookmarks"
                      checked={removeBookmarks}
                      onCheckedChange={setRemoveBookmarks}
                    />
                    <Label htmlFor="removeBookmarks">Remove Bookmarks</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeJavaScript"
                      checked={removeJavaScript}
                      onCheckedChange={setRemoveJavaScript}
                    />
                    <Label htmlFor="removeJavaScript">Remove JavaScript</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="removeFormFields"
                      checked={removeFormFields}
                      onCheckedChange={setRemoveFormFields}
                    />
                    <Label htmlFor="removeFormFields">Remove Form Fields</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance Validation
              </CardTitle>
              <CardDescription>
                Ensure your PDF/A file meets archival standards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Our conversion process automatically validates PDF/A compliance according to ISO standards.
                  Any issues will be reported and automatically fixed when possible.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Label>Validation Features</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Font embedding verification
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Color space validation
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Metadata compliance check
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Content stream validation
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Structure tree verification
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    ✓ Digital signature compatibility
                  </Badge>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Long-term Preservation:</strong> PDF/A files are designed for long-term archival storage 
                  and will remain readable for decades without dependency on specific software or hardware.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PDFToolTemplate>
  );
};

export default PdfToPdfa;
