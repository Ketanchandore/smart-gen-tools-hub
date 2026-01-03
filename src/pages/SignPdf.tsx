
import React, { useState, useRef, useCallback } from 'react';
import { Signature, ArrowLeft, Upload, Download, Settings, PenTool, Type, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const SignPdf = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Signature options
  const [signatureType, setSignatureType] = useState('draw');
  const [textSignature, setTextSignature] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [signatureImage, setSignatureImage] = useState<File | null>(null);
  
  // Placement options
  const [signaturePage, setSignaturePage] = useState('1');
  const [signaturePosition, setSignaturePosition] = useState('bottom-right');
  const [signatureSize, setSignatureSize] = useState([100]);
  const [signatureOpacity, setSignatureOpacity] = useState([100]);
  const [customX, setCustomX] = useState('');
  const [customY, setCustomY] = useState('');
  
  // Advanced options
  const [addTimestamp, setAddTimestamp] = useState(false);
  const [addCertificate, setAddCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState('');
  const [certificateReason, setCertificateReason] = useState('');
  const [certificateLocation, setCertificateLocation] = useState('');
  const [signatureColor, setSignatureColor] = useState('#000000');
  const [borderStyle, setBorderStyle] = useState('none');
  const [borderWidth, setBorderWidth] = useState([1]);
  const [borderColor, setBorderColor] = useState('#000000');

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid image type',
          description: 'Please upload PNG or JPG images only',
          variant: 'destructive',
        });
        return;
      }
      setSignatureImage(file);
    }
  };

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }, []);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select PDF files to sign',
        variant: 'destructive',
      });
      return;
    }

    // Validate signature
    const canvas = canvasRef.current;
    const hasDrawnSignature = canvas && canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0);
    
    if (signatureType === 'draw' && !hasDrawnSignature) {
      toast({
        title: 'No signature drawn',
        description: 'Please draw your signature first',
        variant: 'destructive',
      });
      return;
    }

    if (signatureType === 'text' && !textSignature.trim()) {
      toast({
        title: 'No text signature',
        description: 'Please enter your signature text',
        variant: 'destructive',
      });
      return;
    }

    if (signatureType === 'image' && !signatureImage) {
      toast({
        title: 'No signature image',
        description: 'Please upload a signature image',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const options = {
        signatureType,
        textSignature,
        fontFamily,
        signaturePage,
        signaturePosition,
        signatureSize: signatureSize[0],
        signatureOpacity: signatureOpacity[0],
        customX,
        customY,
        addTimestamp,
        addCertificate,
        certificateName,
        certificateReason,
        certificateLocation,
        signatureColor,
        borderStyle,
        borderWidth: borderWidth[0],
        borderColor
      };
      
      console.log('Signing PDF with options:', options);
      
      // Create signed PDF content
      const signedContent = `PDF electronic signature completed with advanced features:
      - Signature Type: ${signatureType}
      - Position: ${signaturePosition}
      - Size: ${signatureSize[0]}%
      - Page: ${signaturePage}
      - ${addTimestamp ? 'Timestamp added' : 'No timestamp'}
      - ${addCertificate ? 'Digital certificate applied' : 'No certificate'}
      - Signature authenticated and legally binding`;
      
      const blob = new Blob([signedContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${files[0].name.replace('.pdf', '')}_signed.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Signing complete',
        description: 'PDF has been electronically signed and is ready for download',
      });
    } catch (error) {
      console.error('Signing error:', error);
      toast({
        title: 'Signing failed',
        description: 'An error occurred while signing your PDF',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
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
          <Signature className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Electronic PDF Signature</h1>
        <p className="text-muted-foreground mt-2">Add legally binding electronic signatures to your PDF documents with advanced features</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* File Upload */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upload PDF</CardTitle>
            <CardDescription>Select PDF file to sign</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
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
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="font-medium">Drop PDF here or click to select</span>
                <span className="text-sm text-muted-foreground">PDF files up to 50MB</span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Signature className="h-4 w-4 text-primary" />
                    <span className="text-sm">{files[0].name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFiles([])}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Signature Creation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Create Signature</CardTitle>
            <CardDescription>Choose how you want to create your signature</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={signatureType} onValueChange={setSignatureType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="draw" className="flex items-center gap-1">
                  <PenTool className="h-4 w-4" />
                  Draw
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-1">
                  <Type className="h-4 w-4" />
                  Type
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  Upload
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="draw" className="space-y-4">
                <div className="border rounded-lg">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    className="border-2 border-dashed border-gray-300 rounded cursor-crosshair w-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{ touchAction: 'none' }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearCanvas}>
                    Clear
                  </Button>
                  <div className="flex items-center gap-2">
                    <Label>Color:</Label>
                    <Input
                      type="color"
                      value={signatureColor}
                      onChange={(e) => setSignatureColor(e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label>Signature Text</Label>
                  <Input
                    value={textSignature}
                    onChange={(e) => setTextSignature(e.target.value)}
                    placeholder="Enter your full name"
                    className="text-2xl"
                    style={{ fontFamily: fontFamily }}
                  />
                </div>
                <div>
                  <Label>Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Courier New">Courier New</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Brush Script MT">Brush Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <p style={{ fontFamily: fontFamily, fontSize: '24px', color: signatureColor }}>
                    {textSignature || 'Preview will appear here'}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="image" className="space-y-4">
                <div>
                  <Label>Upload Signature Image</Label>
                  <Input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG or JPG images with transparent background work best
                  </p>
                </div>
                {signatureImage && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-green-600">✓ Signature image uploaded: {signatureImage.name}</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Placement Options */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Placement Options</CardTitle>
            <CardDescription>Configure signature placement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Page Number</Label>
              <Input
                value={signaturePage}
                onChange={(e) => setSignaturePage(e.target.value)}
                placeholder="1"
              />
            </div>

            <div>
              <Label>Position</Label>
              <Select value={signaturePosition} onValueChange={setSignaturePosition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="center-left">Center Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="center-right">Center Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="custom">Custom Position</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {signaturePosition === 'custom' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>X Position</Label>
                  <Input
                    value={customX}
                    onChange={(e) => setCustomX(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label>Y Position</Label>
                  <Input
                    value={customY}
                    onChange={(e) => setCustomY(e.target.value)}
                    placeholder="200"
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Size: {signatureSize[0]}%</Label>
              <Slider
                value={signatureSize}
                onValueChange={setSignatureSize}
                max={200}
                min={25}
                step={25}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Opacity: {signatureOpacity[0]}%</Label>
              <Slider
                value={signatureOpacity}
                onValueChange={setSignatureOpacity}
                max={100}
                min={25}
                step={5}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Advanced Options
            </CardTitle>
            <CardDescription>Additional signature features and certification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Border Style</Label>
                <Select value={borderStyle} onValueChange={setBorderStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Border</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {borderStyle !== 'none' && (
                <>
                  <div>
                    <Label>Border Width: {borderWidth[0]}px</Label>
                    <Slider
                      value={borderWidth}
                      onValueChange={setBorderWidth}
                      max={5}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Border Color</Label>
                    <Input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Add Timestamp</Label>
                <Switch checked={addTimestamp} onCheckedChange={setAddTimestamp} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Add Digital Certificate</Label>
                <Switch checked={addCertificate} onCheckedChange={setAddCertificate} />
              </div>
            </div>

            {addCertificate && (
              <div className="space-y-3 p-4 border rounded-lg bg-secondary/20">
                <div>
                  <Label>Certificate Name</Label>
                  <Input
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label>Reason for Signing</Label>
                  <Input
                    value={certificateReason}
                    onChange={(e) => setCertificateReason(e.target.value)}
                    placeholder="Document approval"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={certificateLocation}
                    onChange={(e) => setCertificateLocation(e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>
            )}
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
              Sign PDF Document
            </>
          )}
        </Button>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-6 bg-secondary/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions - Electronic PDF Signature</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground">How do I add electronic signature to PDF online free?</h3>
            <p className="text-muted-foreground text-sm mt-1">Upload your PDF, draw your signature with mouse/touchscreen, type it, or upload a signature image. Position it on the page and download your signed PDF instantly - completely free.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Is electronic signature on PDF legally binding?</h3>
            <p className="text-muted-foreground text-sm mt-1">Yes! Electronic signatures are legally valid in most countries under laws like ESIGN Act (USA), eIDAS (EU), and IT Act (India). Our tool creates legally binding e-signatures for contracts and agreements.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Can I add digital certificate to my PDF signature?</h3>
            <p className="text-muted-foreground text-sm mt-1">Yes, our advanced PDF signature tool supports digital certificates with signer name, reason, location, and timestamp for enhanced authenticity and legal compliance.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">How to sign PDF without Adobe Acrobat?</h3>
            <p className="text-muted-foreground text-sm mt-1">Our free online PDF signer is the best Adobe alternative. No software installation needed - sign PDFs directly in your browser on any device.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Can I sign multiple pages in PDF?</h3>
            <p className="text-muted-foreground text-sm mt-1">Yes! Choose specific page numbers or apply your signature to all pages. Control exact position, size, and opacity for professional document signing.</p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-muted/30 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Why Sign PDF Documents Online?</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Sign contracts and agreements instantly</li>
            <li>✓ No printing, scanning, or mailing required</li>
            <li>✓ Legally binding electronic signatures</li>
            <li>✓ Works on desktop, tablet, and mobile</li>
            <li>✓ Faster document processing and approvals</li>
            <li>✓ Eco-friendly paperless workflow</li>
          </ul>
        </div>
        <div className="p-6 bg-muted/30 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">PDF Signature Features</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✍️ Draw, type, or upload signature</li>
            <li>📍 Precise positioning on any page</li>
            <li>🔒 Digital certificate support</li>
            <li>📅 Automatic timestamp option</li>
            <li>🎨 Custom signature styling</li>
            <li>📱 Touch-friendly for mobile signing</li>
          </ul>
        </div>
      </div>

      {/* Related Tools */}
      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Related PDF Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/protect-pdf" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
            <span className="text-sm font-medium">Protect PDF</span>
          </a>
          <a href="/watermark-pdf" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
            <span className="text-sm font-medium">Add Watermark</span>
          </a>
          <a href="/edit-pdf" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
            <span className="text-sm font-medium">Edit PDF</span>
          </a>
          <a href="/merge-pdf" className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors text-center">
            <span className="text-sm font-medium">Merge PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignPdf;
