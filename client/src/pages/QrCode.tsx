
import React, { useState } from 'react';
import { ArrowLeft, Download, Copy, QrCode as QrIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const QrCode = () => {
  const [url, setUrl] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showLogo, setShowLogo] = useState(false);
  const { toast } = useToast();

  // Generate QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    url
  )}&size=${size}x${size}&color=${qrColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;

  // Handle download
  const handleDownload = () => {
    fetch(qrCodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';
        link.click();
        URL.revokeObjectURL(link.href);
        toast({
          title: 'QR Code Downloaded',
          description: 'Your QR code has been downloaded successfully.',
        });
      })
      .catch((error) => {
        console.error('Error downloading QR code:', error);
        toast({
          title: 'Download Failed',
          description: 'There was an error downloading your QR code.',
          variant: 'destructive',
        });
      });
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    fetch(qrCodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        toast({
          title: 'Copied to Clipboard',
          description: 'QR Code image has been copied to clipboard.',
        });
      })
      .catch(() => {
        toast({
          title: 'Copy Failed',
          description: 'Could not copy the QR code to clipboard.',
          variant: 'destructive',
        });
      });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <QrIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-muted-foreground mt-2">Create custom QR codes for websites, text, or contact information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-card">
          <Tabs defaultValue="url">
            <TabsList className="mb-4">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="url">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="url-input">Website URL</Label>
                  <Input 
                    id="url-input"
                    placeholder="https://example.com" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="text">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text-input">Text Content</Label>
                  <Input 
                    id="text-input"
                    placeholder="Enter text for QR code" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name-input">Name</Label>
                  <Input 
                    id="name-input"
                    placeholder="John Doe" 
                    onChange={(e) => {
                      // In a real implementation, we would build a vCard format
                      setUrl(`BEGIN:VCARD\nVERSION:3.0\nN:${e.target.value}\nEND:VCARD`);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="phone-input">Phone</Label>
                  <Input 
                    id="phone-input"
                    placeholder="+1 (555) 123-4567" 
                  />
                </div>
                <div>
                  <Label htmlFor="email-input">Email</Label>
                  <Input 
                    id="email-input"
                    placeholder="john.doe@example.com" 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>QR Code Size: {size}px</Label>
              </div>
              <Slider 
                value={[size]} 
                onValueChange={(value) => setSize(value[0])}
                min={100}
                max={400}
                step={10}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qr-color">QR Code Color</Label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: qrColor }}
                  ></div>
                  <Input 
                    id="qr-color"
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: bgColor }}
                  ></div>
                  <Input 
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="logo"
                checked={showLogo}
                onCheckedChange={setShowLogo}
              />
              <Label htmlFor="logo">Add Logo (Pro Feature)</Label>
            </div>
          </div>
        </Card>
        
        <div className="flex flex-col items-center justify-center">
          <Card className="p-8 max-w-full">
            <CardContent className="flex flex-col items-center justify-center p-0">
              {url ? (
                <div className="relative bg-white p-4 rounded">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    width={size}
                    height={size}
                    className="mx-auto"
                  />
                </div>
              ) : (
                <div 
                  className="flex items-center justify-center bg-muted" 
                  style={{width: `${size}px`, height: `${size}px`}}
                >
                  <p className="text-muted-foreground text-sm">Enter a URL to generate a QR code</p>
                </div>
              )}
              
              <div className="flex items-center justify-center space-x-2 mt-6">
                <Button onClick={handleDownload} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={handleCopy} className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Need More QR Code Features?</h2>
        <p className="text-muted-foreground mb-4">Upgrade to Pro for advanced QR code customization, analytics, and more!</p>
        <Button>Upgrade to Pro</Button>
      </div>
    </div>
  );
};

export default QrCode;
