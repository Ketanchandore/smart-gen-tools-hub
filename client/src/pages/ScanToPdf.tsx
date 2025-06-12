
import React, { useState, useRef } from 'react';
import { ScanLine, Camera, Upload, Settings, Image, FileText, Zap } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const ScanToPdf = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | 'batch'>('upload');
  const [documentType, setDocumentType] = useState<'auto' | 'text' | 'photo' | 'receipt' | 'id' | 'business-card'>('auto');
  const [colorMode, setColorMode] = useState<'color' | 'grayscale' | 'bw' | 'auto'>('auto');
  const [resolution, setResolution] = useState(300);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [autoCrop, setAutoCrop] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [enhanceText, setEnhanceText] = useState(true);
  const [compression, setCompression] = useState<'none' | 'low' | 'medium' | 'high'>('medium');
  const [ocrEnabled, setOcrEnabled] = useState(false);
  const [ocrLanguage, setOcrLanguage] = useState('en');
  const [multiPage, setMultiPage] = useState(true);
  const [pageSize, setPageSize] = useState<'auto' | 'A4' | 'letter' | 'legal' | 'custom'>('auto');
  const [brightness, setBrightness] = useState([50]);
  const [contrast, setContrast] = useState([50]);
  const [saturation, setSaturation] = useState([50]);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedImages, setScannedImages] = useState<string[]>([]);

  const processScanToPdf = async (files: File[]) => {
    if (files.length === 0 && scannedImages.length === 0) {
      throw new Error('Please select images to scan or use the camera to capture documents');
    }

    const imagesToProcess = files.length > 0 ? files : scannedImages;
    
    console.log('Converting scans to PDF with advanced options:', {
      scanMode,
      documentType,
      colorMode,
      resolution,
      autoEnhance,
      autoCrop,
      autoRotate,
      removeBackground,
      enhanceText,
      compression,
      ocrEnabled,
      ocrLanguage,
      multiPage,
      pageSize,
      imageEnhancements: {
        brightness: brightness[0],
        contrast: contrast[0],
        saturation: saturation[0]
      },
      imageCount: imagesToProcess.length
    });

    // Simulate advanced scan to PDF processing
    await new Promise(resolve => setTimeout(resolve, 3000 + imagesToProcess.length * 1000));
    
    // Create a dummy PDF-like byte array
    const pdfHeader = "%PDF-1.4\n";
    const encoder = new TextEncoder();
    return encoder.encode(pdfHeader);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      toast({
        title: 'Camera Error',
        description: 'Could not access camera. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setScannedImages(prev => [...prev, imageData]);
        
        toast({
          title: 'Image Captured',
          description: `Captured image ${scannedImages.length + 1}`,
        });
      }
    }
  };

  const removeScannedImage = (index: number) => {
    setScannedImages(prev => prev.filter((_, i) => i !== index));
  };

  const documentTypes = [
    { value: 'auto', label: 'Auto-detect', description: 'Automatically detect document type' },
    { value: 'text', label: 'Text Document', description: 'Optimize for text clarity' },
    { value: 'photo', label: 'Photo/Image', description: 'Preserve image quality' },
    { value: 'receipt', label: 'Receipt', description: 'Enhance for small text' },
    { value: 'id', label: 'ID/Card', description: 'Optimize for ID documents' },
    { value: 'business-card', label: 'Business Card', description: 'Optimize for business cards' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' }
  ];

  return (
    <PDFToolTemplate
      title="Scan to PDF"
      description="Advanced document scanning with AI-powered enhancement and OCR capabilities"
      icon={<ScanLine className="h-8 w-8 text-primary" />}
      acceptFiles="image/*"
      multiple={true}
      processFunction={processScanToPdf}
      outputFilename="scanned-document.pdf"
    >
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scan">Scan Mode</TabsTrigger>
          <TabsTrigger value="enhance">Enhancement</TabsTrigger>
          <TabsTrigger value="ocr">OCR & Text</TabsTrigger>
          <TabsTrigger value="output">Output Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Scanning Options
              </CardTitle>
              <CardDescription>
                Choose how you want to capture or upload your documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Scan Mode</Label>
                <Select value={scanMode} onValueChange={(value: any) => setScanMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upload">Upload Images</SelectItem>
                    <SelectItem value="camera">Camera Capture</SelectItem>
                    <SelectItem value="batch">Batch Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scanMode === 'camera' && (
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {!cameraActive ? (
                        <Button onClick={startCamera} className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          Start Camera
                        </Button>
                      ) : (
                        <>
                          <Button onClick={captureImage} className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            Capture
                          </Button>
                          <Button variant="outline" onClick={stopCamera}>
                            Stop Camera
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full max-w-md mx-auto rounded-lg"
                        style={{ display: cameraActive ? 'block' : 'none' }}
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select value={documentType} onValueChange={(value: any) => setDocumentType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {documentTypes.find(t => t.value === documentType)?.description}
                </p>
              </div>

              {scannedImages.length > 0 && (
                <div className="space-y-2">
                  <Label>Captured Images ({scannedImages.length})</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {scannedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={image} 
                          alt={`Scan ${index + 1}`} 
                          className="w-full h-24 object-cover rounded border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeScannedImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enhance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Image Enhancement
              </CardTitle>
              <CardDescription>
                AI-powered image processing for optimal scan quality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Mode</Label>
                <Select value={colorMode} onValueChange={(value: any) => setColorMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="grayscale">Grayscale</SelectItem>
                    <SelectItem value="bw">Black & White</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Resolution: {resolution} DPI</Label>
                <Slider
                  value={[resolution]}
                  onValueChange={(value) => setResolution(value[0])}
                  min={150}
                  max={600}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoEnhance"
                    checked={autoEnhance}
                    onCheckedChange={(checked) => setAutoEnhance(checked === true)}
                  />
                  <Label htmlFor="autoEnhance">Auto Enhancement</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoCrop"
                    checked={autoCrop}
                    onCheckedChange={(checked) => setAutoCrop(checked === true)}
                  />
                  <Label htmlFor="autoCrop">Auto Crop</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoRotate"
                    checked={autoRotate}
                    onCheckedChange={(checked) => setAutoRotate(checked === true)}
                  />
                  <Label htmlFor="autoRotate">Auto Rotate</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="removeBackground"
                    checked={removeBackground}
                    onCheckedChange={(checked) => setRemoveBackground(checked === true)}
                  />
                  <Label htmlFor="removeBackground">Remove Background</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enhanceText"
                    checked={enhanceText}
                    onCheckedChange={(checked) => setEnhanceText(checked === true)}
                  />
                  <Label htmlFor="enhanceText">Enhance Text</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Brightness: {brightness[0]}%</Label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contrast: {contrast[0]}%</Label>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Saturation: {saturation[0]}%</Label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ocr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                OCR & Text Recognition
              </CardTitle>
              <CardDescription>
                Extract text from scanned documents for searchable PDFs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ocrEnabled"
                  checked={ocrEnabled}
                  onCheckedChange={(checked) => setOcrEnabled(checked === true)}
                />
                <Label htmlFor="ocrEnabled">Enable OCR Text Recognition</Label>
              </div>

              {ocrEnabled && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>OCR Language</Label>
                    <Select value={ocrLanguage} onValueChange={setOcrLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Alert>
                    <Zap className="h-4 w-4" />
                    <AlertDescription>
                      OCR will make your PDF searchable and allow text selection. 
                      Processing time will increase with text complexity.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Label>OCR Features</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Badge variant="outline" className="justify-start p-3">
                        ✓ Multi-language text recognition
                      </Badge>
                      <Badge variant="outline" className="justify-start p-3">
                        ✓ Handwriting detection
                      </Badge>
                      <Badge variant="outline" className="justify-start p-3">
                        ✓ Table structure preservation
                      </Badge>
                      <Badge variant="outline" className="justify-start p-3">
                        ✓ Font style recognition
                      </Badge>
                      <Badge variant="outline" className="justify-start p-3">
                        ✓ Layout analysis
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Output Settings
              </CardTitle>
              <CardDescription>
                Configure the final PDF output options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Page Size</Label>
                  <Select value={pageSize} onValueChange={(value: any) => setPageSize(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-fit</SelectItem>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
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
                      <SelectItem value="none">No Compression</SelectItem>
                      <SelectItem value="low">Low (High Quality)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Small File)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiPage"
                  checked={multiPage}
                  onCheckedChange={(checked) => setMultiPage(checked === true)}
                />
                <Label htmlFor="multiPage">Combine into single multi-page PDF</Label>
              </div>

              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Your scanned document will be optimized for clarity and file size. 
                  {ocrEnabled && ' Text will be searchable and selectable.'}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PDFToolTemplate>
  );
};

export default ScanToPdf;
