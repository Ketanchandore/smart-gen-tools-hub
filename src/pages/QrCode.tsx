
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
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';

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

  const faqData = [
    {
      question: "What is a QR code and how does it work?",
      answer: "A QR code (Quick Response code) is a two-dimensional barcode that stores information readable by smartphones and scanners. When scanned, it instantly directs users to websites, displays text, or shares contact information."
    },
    {
      question: "Can I customize my QR code colors?",
      answer: "Yes! Our generator allows you to customize both the QR code color and background color. However, ensure sufficient contrast between colors for reliable scanning."
    },
    {
      question: "What can I encode in a QR code?",
      answer: "You can encode URLs, plain text, contact information (vCard), WiFi credentials, email addresses, phone numbers, SMS messages, and much more."
    },
    {
      question: "Are the generated QR codes permanent?",
      answer: "Yes, static QR codes are permanent. Once generated, the content cannot be changed. For dynamic content, consider using a URL shortener that allows updating the destination."
    }
  ];

  return (
    <>
      <ToolSEO
        title="Free QR Code Generator - Create Custom QR Codes Online"
        description="Generate custom QR codes instantly for free. Create QR codes for URLs, text, contact info with customizable colors and sizes. Download high-quality QR codes in seconds."
        keywords="qr code generator, free qr code, qr code creator, custom qr code, qr code maker, barcode generator, url to qr code"
        toolName="QR Code Generator"
        toolType="Generator"
        category="Marketing Tools"
        features={[
          "Instant QR code generation",
          "Customizable colors and sizes",
          "URL, text, and contact QR codes",
          "High-quality image download",
          "No registration required",
          "Mobile-friendly interface"
        ]}
        faqs={faqData}
      />
      <Layout>
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
        <h1 className="text-4xl font-bold mb-4">Free QR Code Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create custom QR codes instantly for websites, text, or contact information. Download high-quality QR codes for free.
        </p>
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
      
      {/* SEO Content Section */}
      <section className="mt-16 max-w-4xl mx-auto">
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4">What is a QR Code Generator?</h2>
          <p className="text-muted-foreground mb-6">
            A QR code generator is an online tool that creates Quick Response (QR) codes instantly. These two-dimensional 
            barcodes can store various types of information including website URLs, plain text, contact details, WiFi credentials, 
            and more. Our free QR code generator allows you to create professional, scannable QR codes in seconds.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">How to Create a QR Code</h2>
          <ol className="list-decimal pl-6 space-y-3 text-muted-foreground mb-6">
            <li><strong>Enter Your Content:</strong> Input the URL, text, or contact information you want to encode</li>
            <li><strong>Customize Design:</strong> Choose your preferred size, colors, and style options</li>
            <li><strong>Generate QR Code:</strong> Click generate to create your unique QR code instantly</li>
            <li><strong>Download & Share:</strong> Download your high-quality QR code image and use it anywhere</li>
          </ol>

          <h2 className="text-2xl font-bold mb-4 mt-8">QR Code Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Marketing & Advertising</h3>
              <p className="text-sm text-muted-foreground">Add QR codes to posters, flyers, and business cards to drive traffic to your website</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Product Packaging</h3>
              <p className="text-sm text-muted-foreground">Link customers directly to product information, manuals, or support pages</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Event Management</h3>
              <p className="text-sm text-muted-foreground">Use QR codes for event tickets, check-ins, and sharing event details</p>
            </div>
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Contact Sharing</h3>
              <p className="text-sm text-muted-foreground">Share vCards instantly without typing - perfect for networking</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
      </Layout>
    </>
  );
};

export default QrCode;
