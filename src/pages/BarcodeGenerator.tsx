
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';

const BarcodeGenerator = () => {
  const { toast } = useToast();

  const faqData = [
    {
      question: "What's the difference between QR codes and barcodes?",
      answer: "QR codes can store much more information (up to 4,296 characters) and can be scanned from any direction, while traditional barcodes hold less data and must be scanned linearly. QR codes can contain URLs, text, and contact info."
    },
    {
      question: "Can I customize the barcode size and format?",
      answer: "Yes! Our generator creates Code 128 barcodes which are commonly used for alphanumeric data. You can download the image and resize it as needed while maintaining the aspect ratio for proper scanning."
    },
    {
      question: "Are these barcodes/QR codes free to use commercially?",
      answer: "Yes, all generated codes are free to use for personal and commercial purposes. There's no registration required and no hidden fees."
    },
    {
      question: "What can I encode in a barcode or QR code?",
      answer: "Barcodes work best with product codes, SKUs, and short identifiers. QR codes can store URLs, plain text, contact information (vCards), WiFi passwords, email addresses, phone numbers, and much more."
    }
  ];
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
    <>
      <ToolSEO
        title="Free Barcode & QR Code Generator - Create Codes Instantly"
        description="Generate barcodes and QR codes online for free. Create Code 128 barcodes and custom QR codes instantly. Download high-quality images for products, URLs, and text."
        keywords="barcode generator, qr code generator, free barcode maker, code 128 generator, barcode creator, qr code maker, product barcode"
        toolName="Barcode & QR Code Generator"
        toolType="Generator"
        category="Utility Tools"
        features={[
          "Generate QR codes and barcodes",
          "Support for Code 128 barcodes",
          "Customizable QR code size",
          "Instant code generation",
          "High-quality downloads",
          "Free to use commercially"
        ]}
        faqSchema={faqData}
      />
      <Layout>
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Tools
            </Link>
            <h1 className="text-3xl font-bold mb-6">Barcode & QR Code Generator</h1>
            <p className="text-muted-foreground mb-8">
              Generate professional barcodes and QR codes instantly for products, URLs, and text content.
            </p>
        
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

        {/* SEO Content */}
        <section className="mt-12 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">About Barcode & QR Code Generation</h2>
          <p className="text-muted-foreground mb-4">
            Barcodes and QR codes are essential tools for modern businesses. Use our free generator to create professional codes for inventory management, product labeling, marketing campaigns, and digital content sharing. 
          </p>
          
          <h3 className="text-xl font-bold mb-3 mt-6">Common Uses</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Retail & Inventory:</strong> Product identification, stock management, and point-of-sale systems</li>
            <li><strong>Marketing:</strong> Link print materials to websites, social media, and promotional content</li>
            <li><strong>Event Management:</strong> Tickets, registration, and attendee tracking</li>
            <li><strong>Document Tracking:</strong> File management and asset tracking systems</li>
          </ul>

          <div className="mt-8 bg-secondary/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">FAQs</h3>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
      </Layout>
    </>
  );
};

export default BarcodeGenerator;
