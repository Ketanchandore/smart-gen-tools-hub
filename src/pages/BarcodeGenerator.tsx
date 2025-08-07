
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BarcodeGenerator = () => {
  const { toast } = useToast();
  const [text, setText] = useState('https://example.com');
  const [activeTab, setActiveTab] = useState<string>('qr');
  const qrRef = useRef<HTMLImageElement>(null);
  const barcodeRef = useRef<HTMLImageElement>(null);

  // Generate QR Code URL
  const getQRCodeUrl = () => {
    const encodedText = encodeURIComponent(text);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}`;
  };

  // Generate Barcode URL
  const getBarcodeUrl = () => {
    const encodedText = encodeURIComponent(text);
    return `https://barcodeapi.org/api/128/${encodedText}`;
  };

  // Download function
  const downloadImage = () => {
    const imageRef = activeTab === 'qr' ? qrRef.current : barcodeRef.current;
    
    if (!imageRef || !imageRef.src) {
      toast({
        title: 'Error',
        description: 'No image to download',
        variant: 'destructive',
      });
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = imageRef.naturalWidth;
    canvas.height = imageRef.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(imageRef, 0, 0);
      
      const a = document.createElement('a');
      a.download = `${activeTab === 'qr' ? 'qrcode' : 'barcode'}-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: 'Downloaded!',
        description: `${activeTab === 'qr' ? 'QR Code' : 'Barcode'} downloaded successfully.`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Could not generate download',
        variant: 'destructive',
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Barcode & QR Code Generator</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Text or URL</CardTitle>
            <CardDescription>Generate a QR code or barcode from your text</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="text">Text or URL</Label>
                <Input
                  id="text"
                  placeholder="Enter text or URL"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Tabs defaultValue="qr" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qr">QR Code</TabsTrigger>
                <TabsTrigger value="barcode">Barcode</TabsTrigger>
              </TabsList>
              <TabsContent value="qr" className="space-y-4 mt-6">
                <CardTitle>Your QR Code</CardTitle>
                <CardDescription>Scan with any QR code reader</CardDescription>
              </TabsContent>
              <TabsContent value="barcode" className="space-y-4 mt-6">
                <CardTitle>Your Barcode</CardTitle>
                <CardDescription>Scan with any barcode reader</CardDescription>
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              {activeTab === 'qr' ? (
                <div className="bg-white p-4 rounded-md">
                  <img 
                    ref={qrRef}
                    src={getQRCodeUrl()} 
                    alt="QR Code" 
                    width={200} 
                    height={200} 
                    className="mx-auto"
                  />
                </div>
              ) : (
                <div className="bg-white p-4 rounded-md">
                  <img 
                    ref={barcodeRef}
                    src={getBarcodeUrl()} 
                    alt="Barcode" 
                    width={300} 
                    height={100} 
                    className="mx-auto"
                  />
                </div>
              )}

              <Button 
                className="bg-gradient-to-r from-primary to-accent flex items-center gap-2"
                onClick={downloadImage}
              >
                <Download className="h-4 w-4" />
                Download {activeTab === 'qr' ? 'QR Code' : 'Barcode'}
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground">
              <p>
                {activeTab === 'qr' ? 
                  'QR codes can store various types of data such as URLs, text, contact information, and more.' : 
                  'This generates a Code 128 barcode, which is commonly used for alphanumeric data in logistics and retail.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
