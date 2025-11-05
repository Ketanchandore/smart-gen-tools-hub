import React, { useState } from 'react';
import { 
  FileText, Scissors, Minimize, FileSpreadsheet, Presentation, 
  Image, PenTool, Signature, Droplets, RotateCcw, Globe, Unlock, 
  Shield, FileCheck, Hash, ScanLine, FileSearch, Eye, Crop,
  Copy, Check, Code2, Play, Sparkles, Zap, Lock, TrendingUp, Users, BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';

const Embed = () => {
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [embedWidth, setEmbedWidth] = useState(800);
  const [embedHeight, setEmbedHeight] = useState(600);
  const [embedTheme, setEmbedTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [borderRadius, setBorderRadius] = useState([8]);
  const [showBranding, setShowBranding] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const allTools = [
    { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while maintaining quality', icon: <Minimize className="h-5 w-5" />, popular: true },
    { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: <FileText className="h-5 w-5" />, popular: true },
    { id: 'split-pdf', name: 'Split PDF', description: 'Separate PDF pages into multiple files', icon: <Scissors className="h-5 w-5" />, popular: true },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to editable DOC/DOCX', icon: <FileText className="h-5 w-5" />, popular: true },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents to PDF', icon: <FileText className="h-5 w-5" /> },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Extract images from PDF files', icon: <Image className="h-5 w-5" /> },
    { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF format', icon: <Image className="h-5 w-5" /> },
    { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password protection to PDFs', icon: <Shield className="h-5 w-5" />, popular: true },
    { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Remove password from PDFs', icon: <Unlock className="h-5 w-5" /> },
    { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text and annotations to PDFs', icon: <PenTool className="h-5 w-5" /> },
    { id: 'sign-pdf', name: 'Sign PDF', description: 'Electronically sign documents', icon: <Signature className="h-5 w-5" /> },
    { id: 'watermark-pdf', name: 'Watermark PDF', description: 'Add watermarks to your PDFs', icon: <Droplets className="h-5 w-5" /> },
    { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages to any angle', icon: <RotateCcw className="h-5 w-5" /> },
    { id: 'pdf-to-powerpoint', name: 'PDF to PowerPoint', description: 'Convert PDF to PPT slides', icon: <Presentation className="h-5 w-5" /> },
    { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract data to spreadsheets', icon: <FileSpreadsheet className="h-5 w-5" /> },
    { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert web pages to PDF', icon: <Globe className="h-5 w-5" /> },
    { id: 'organize-pdf', name: 'Organize PDF', description: 'Reorder and organize pages', icon: <FileCheck className="h-5 w-5" /> },
    { id: 'page-numbers-pdf', name: 'Add Page Numbers', description: 'Number your PDF pages', icon: <Hash className="h-5 w-5" /> },
    { id: 'ocr-pdf', name: 'OCR PDF', description: 'Extract text from scanned PDFs', icon: <ScanLine className="h-5 w-5" />, popular: true },
    { id: 'compare-pdf', name: 'Compare PDF', description: 'Find differences between PDFs', icon: <FileSearch className="h-5 w-5" /> },
    { id: 'redact-pdf', name: 'Redact PDF', description: 'Remove sensitive information', icon: <Eye className="h-5 w-5" /> },
    { id: 'crop-pdf', name: 'Crop PDF', description: 'Trim and crop PDF pages', icon: <Crop className="h-5 w-5" /> },
  ];

  const popularTools = allTools.filter(tool => tool.popular);

  const generateEmbedCode = (type: 'html' | 'wordpress' | 'javascript') => {
    if (!selectedTool) return '';

    const baseUrl = 'https://www.pinetoolshub.com';
    const toolUrl = `${baseUrl}/${selectedTool}?embed=true&theme=${embedTheme}&color=${encodeURIComponent(primaryColor.replace('#', ''))}&radius=${borderRadius[0]}`;

    switch (type) {
      case 'html':
        return `<iframe 
  src="${toolUrl}" 
  width="${embedWidth}" 
  height="${embedHeight}" 
  frameborder="0" 
  style="border-radius: ${borderRadius[0]}px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" 
  allow="clipboard-write"
></iframe>${showBranding ? `\n<p style="font-size: 12px; color: #666; text-align: center; margin-top: 10px;">\n  <a href="${baseUrl}">Powered by Pine Tools Hub</a>\n</p>` : ''}`;

      case 'wordpress':
        return `[pinetoolshub-embed tool="${selectedTool}" width="${embedWidth}" height="${embedHeight}" theme="${embedTheme}" color="${primaryColor}" radius="${borderRadius[0]}" branding="${showBranding}"]`;

      case 'javascript':
        return `<script src="${baseUrl}/embed.js"></script>
<div 
  id="pinetoolshub-embed" 
  data-tool="${selectedTool}" 
  data-width="${embedWidth}" 
  data-height="${embedHeight}"
  data-theme="${embedTheme}"
  data-color="${primaryColor}"
  data-radius="${borderRadius[0]}"
  data-branding="${showBranding}"
></div>`;

      default:
        return '';
    }
  };

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    toast({
      title: "Copied to clipboard!",
      description: "The embed code has been copied successfully.",
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <SEOHead
        title="Embed PDF Tools on Your Website - Free Forever | Pine Tools Hub"
        description="Add powerful PDF tools to your website instantly. Free forever, no API key required. Fully responsive, customizable, and mobile-friendly embed codes."
        keywords="embed pdf tools, pdf widget, pdf iframe, free pdf embed, website pdf tools, pdf api free"
        url="https://pinetoolshub.com/embed"
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Embed PDF Tools on Your Website
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Add powerful PDF tools to your site instantly. Free forever, no API key required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Check className="h-4 w-4 text-primary" />
                <span>Fully responsive</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Check className="h-4 w-4 text-primary" />
                <span>Customizable</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Check className="h-4 w-4 text-primary" />
                <span>Mobile-friendly</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Check className="h-4 w-4 text-primary" />
                <span>No coding skills needed</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Select a PDF Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Choose from our collection of 20+ professional PDF tools</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Customize Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Adjust size, colors, and theme to match your website</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Copy & Paste Code</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Embed the code on your site and you're done!</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Tools Quick Access */}
        <section className="mb-16 bg-accent/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Most Popular Embeds</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {popularTools.map((tool) => (
              <Dialog key={tool.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedTool(tool.id)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          <CardDescription className="text-xs">{tool.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button size="sm" className="w-full">Get Embed Code</Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Embed {tool.name}</DialogTitle>
                    <DialogDescription>Customize and get the embed code for your website</DialogDescription>
                  </DialogHeader>
                  {/* Embed Generator Content */}
                  <EmbedGenerator 
                    toolName={tool.name}
                    toolId={tool.id}
                    embedWidth={embedWidth}
                    setEmbedWidth={setEmbedWidth}
                    embedHeight={embedHeight}
                    setEmbedHeight={setEmbedHeight}
                    embedTheme={embedTheme}
                    setEmbedTheme={setEmbedTheme}
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    borderRadius={borderRadius}
                    setBorderRadius={setBorderRadius}
                    showBranding={showBranding}
                    setShowBranding={setShowBranding}
                    generateEmbedCode={generateEmbedCode}
                    copyToClipboard={copyToClipboard}
                    copiedCode={copiedCode}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* All Tools Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">All Available Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allTools.map((tool) => (
              <Dialog key={tool.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow group" onClick={() => setSelectedTool(tool.id)}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm mb-1">{tool.name}</CardTitle>
                          <CardDescription className="text-xs line-clamp-2">{tool.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Embed {tool.name}</DialogTitle>
                    <DialogDescription>Customize and get the embed code for your website</DialogDescription>
                  </DialogHeader>
                  <EmbedGenerator 
                    toolName={tool.name}
                    toolId={tool.id}
                    embedWidth={embedWidth}
                    setEmbedWidth={setEmbedWidth}
                    embedHeight={embedHeight}
                    setEmbedHeight={setEmbedHeight}
                    embedTheme={embedTheme}
                    setEmbedTheme={setEmbedTheme}
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    borderRadius={borderRadius}
                    setBorderRadius={setBorderRadius}
                    showBranding={showBranding}
                    setShowBranding={setShowBranding}
                    generateEmbedCode={generateEmbedCode}
                    copyToClipboard={copyToClipboard}
                    copiedCode={copiedCode}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Why Embed PDF Tools?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Save Development Time</h3>
                <p className="text-sm text-muted-foreground">No need to build PDF features from scratch. Get production-ready tools instantly.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Always Updated</h3>
                <p className="text-sm text-muted-foreground">Tools get automatic improvements and new features without any work on your end.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mobile Responsive</h3>
                <p className="text-sm text-muted-foreground">Works perfectly on all devices - desktop, tablet, and mobile.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <span className="text-3xl">💰</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Free Forever</h3>
                <p className="text-sm text-muted-foreground">No hidden costs, no API keys, no usage limits. Completely free.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reliable Hosting</h3>
                <p className="text-sm text-muted-foreground">99.9% uptime guarantee. Always available and blazing fast.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Privacy Protected</h3>
                <p className="text-sm text-muted-foreground">GDPR compliant. We don't store or collect user data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Integration Guides</h2>
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            <AccordionItem value="html">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Plain HTML Websites
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Perfect for static websites, landing pages, or any HTML-based site.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Select your tool and click "Get Embed Code"</li>
                  <li>Copy the HTML embed code from the "HTML Embed" tab</li>
                  <li>Paste the code where you want the tool to appear in your HTML file</li>
                  <li>Save and upload - that's it!</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-mono">
                    Paste inside {'<body>'} tags where you want the tool to display
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wordpress">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  WordPress Sites
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Easy integration with WordPress using our shortcode format.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Choose your tool and open the embed generator</li>
                  <li>Copy the code from the "WordPress Shortcode" tab</li>
                  <li>In WordPress editor, add a "Shortcode" block or "Custom HTML" block</li>
                  <li>Paste the shortcode and publish</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Pro Tip:</p>
                  <p className="text-sm">Use Custom HTML block for best compatibility with all WordPress themes.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="react">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  React/Next.js Apps
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Integrate seamlessly into modern JavaScript frameworks.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Copy the JavaScript embed code</li>
                  <li>Add the script tag to your component or _document.js</li>
                  <li>Place the div with data attributes where needed</li>
                  <li>The tool will auto-initialize when the component mounts</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-mono break-all">
                    useEffect hook recommended for client-side only rendering
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="builders">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Wix/Squarespace/Webflow
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Works with all major website builders using their embed/custom code features.
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Wix:</p>
                    <p className="text-sm">Add an "Embed Code" element and paste the HTML code</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Squarespace:</p>
                    <p className="text-sm">Use a "Code Block" and paste the HTML embed code</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Webflow:</p>
                    <p className="text-sm">Add an "Embed" component and paste the HTML code</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="blog">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medium/Dev.to Articles
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Enhance your blog posts with interactive PDF tools.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Most platforms support iframe embeds</li>
                  <li>Copy the HTML embed code</li>
                  <li>Paste directly into your article where you want it</li>
                  <li>Platform will automatically render the iframe</li>
                </ol>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> Some platforms may require you to use their embed button instead of pasting raw HTML.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* SEO Content Section */}
        <section className="mb-16 prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <h2 className="text-3xl font-bold mb-6">What is an Embed Code?</h2>
          <p className="text-muted-foreground">
            An embed code is a snippet of HTML that lets you place interactive content (like our PDF tools) on any website. 
            When you embed Pine Tools Hub, visitors can use powerful PDF features without leaving your site.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Benefits of Offering Embedded PDF Tools on Your Website:</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">1. Keep Users on Your Site</h4>
              <p className="text-muted-foreground">
                Visitors don't need to go elsewhere for PDF tools. They can accomplish everything right on your website, 
                increasing engagement and reducing bounce rates.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">2. Add Value to Your Content</h4>
              <p className="text-muted-foreground">
                Tutorials, reviews, and guides become infinitely more valuable when readers can actually use the tools 
                you're writing about. Turn passive readers into active users.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">3. Improve SEO</h4>
              <p className="text-muted-foreground">
                More user engagement signals to search engines that your content is valuable. Longer time on page 
                and lower bounce rates can improve your search rankings.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">4. Save Development Time</h4>
              <p className="text-muted-foreground">
                Building PDF functionality from scratch takes weeks or months. We handle all the technical complexity, 
                security, and maintenance so you can focus on your core business.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">5. Look Professional</h4>
              <p className="text-muted-foreground">
                High-quality, polished tool interfaces make your website look more professional and trustworthy. 
                Your visitors get a premium experience.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-2">6. Zero Maintenance</h4>
              <p className="text-muted-foreground">
                We update and maintain everything. Bug fixes, new features, security updates - all handled automatically. 
                Your embedded tools are always up-to-date.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-12 mb-4">How to Maximize Embed Results:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Add embeds near relevant blog posts (e.g., "How to Compress PDF" with the compress tool)</li>
            <li>Write tutorials showing how to use the embedded tools</li>
            <li>Share on social media with embed links to drive traffic</li>
            <li>Link from other related content on your site</li>
            <li>Create comparison articles featuring multiple tools</li>
          </ul>

          <h3 className="text-2xl font-bold mt-12 mb-4">Common Use Cases:</h3>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li><strong>Blog Tutorial:</strong> "How to Compress PDF Files" article with working compression tool embedded</li>
            <li><strong>Business Services:</strong> Add PDF tools to your services page to provide immediate value to clients</li>
            <li><strong>Educational Resources:</strong> Help students with document management and conversion tools</li>
            <li><strong>SaaS Aggregator:</strong> Build a comprehensive PDF tools directory with all our embeds</li>
            <li><strong>Tech Reviews:</strong> Embed tools in product comparison posts so readers can try them immediately</li>
            <li><strong>WordPress Plugin Store:</strong> Create a plugin using our embed codes to distribute to thousands</li>
          </ol>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-none">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-center mb-12">Trusted by Thousands</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="h-8 w-8 text-primary mr-2" />
                    <p className="text-4xl font-bold">500K+</p>
                  </div>
                  <p className="text-muted-foreground">Files Processed</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-primary mr-2" />
                    <p className="text-4xl font-bold">1000+</p>
                  </div>
                  <p className="text-muted-foreground">Websites Using Embeds</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <BarChart className="h-8 w-8 text-primary mr-2" />
                    <p className="text-4xl font-bold">99.9%</p>
                  </div>
                  <p className="text-muted-foreground">Uptime Guarantee</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Zero Storage of User Files</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="faq1">
              <AccordionTrigger>Can I embed PDF tools for free?</AccordionTrigger>
              <AccordionContent>
                Yes! Embedding is completely free. No API key required, no usage limits, forever free. We believe in making 
                powerful tools accessible to everyone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq2">
              <AccordionTrigger>Do I need a Pine Tools Hub account?</AccordionTrigger>
              <AccordionContent>
                No. Anyone can embed tools without creating an account. Just copy the embed code and paste it on your website. 
                It's that simple!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq3">
              <AccordionTrigger>Can I customize the appearance?</AccordionTrigger>
              <AccordionContent>
                Absolutely! You can change colors, size, theme (light/dark), border radius, and more in the embed code generator. 
                Make it match your website's design perfectly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq4">
              <AccordionTrigger>Will it work on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Yes! All tools are 100% mobile responsive. They automatically adapt to any screen size - desktop, tablet, 
                or smartphone - providing an optimal experience for all users.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq5">
              <AccordionTrigger>Can I remove the "Powered by Pine Tools Hub" branding?</AccordionTrigger>
              <AccordionContent>
                The small branding link helps us get credit and grow our service. We'd appreciate if you keep it to support us! 
                However, you can toggle it off in the embed generator if needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq6">
              <AccordionTrigger>What happens if I embed and you change the tool?</AccordionTrigger>
              <AccordionContent>
                Improvements are automatic! When we update or improve a tool, your embedded version gets those updates too. 
                Users always get the latest features without you lifting a finger.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq7">
              <AccordionTrigger>Is there an embed limit?</AccordionTrigger>
              <AccordionContent>
                No limit! Embed on as many websites as you want, use as many different tools as needed. There are absolutely 
                no restrictions on where or how often you embed our tools.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq8">
              <AccordionTrigger>Does embedding affect my website speed?</AccordionTrigger>
              <AccordionContent>
                No. Tools are lazy-loaded and heavily optimized for performance. They only load when needed and don't impact 
                your page load times. We use CDN and modern optimization techniques.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq9">
              <AccordionTrigger>Can I use it for commercial websites?</AccordionTrigger>
              <AccordionContent>
                Yes! Personal blogs, business websites, commercial applications - all are allowed. Use our embeds however 
                you need to add value to your site and users.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq10">
              <AccordionTrigger>What browsers are supported?</AccordionTrigger>
              <AccordionContent>
                All modern browsers are fully supported: Chrome, Firefox, Safari, Edge, and their mobile versions. We test 
                extensively to ensure compatibility across all platforms.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary to-accent text-primary-foreground border-none">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-6 opacity-90">
                Choose a tool above and get your embed code in seconds. It's free forever!
              </p>
              <Button size="lg" variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Browse All Tools
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
};

// Embed Generator Component
interface EmbedGeneratorProps {
  toolName: string;
  toolId: string;
  embedWidth: number;
  setEmbedWidth: (width: number) => void;
  embedHeight: number;
  setEmbedHeight: (height: number) => void;
  embedTheme: string;
  setEmbedTheme: (theme: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  borderRadius: number[];
  setBorderRadius: (radius: number[]) => void;
  showBranding: boolean;
  setShowBranding: (show: boolean) => void;
  generateEmbedCode: (type: 'html' | 'wordpress' | 'javascript') => string;
  copyToClipboard: (code: string, type: string) => void;
  copiedCode: string | null;
}

const EmbedGenerator: React.FC<EmbedGeneratorProps> = ({
  toolName,
  toolId,
  embedWidth,
  setEmbedWidth,
  embedHeight,
  setEmbedHeight,
  embedTheme,
  setEmbedTheme,
  primaryColor,
  setPrimaryColor,
  borderRadius,
  setBorderRadius,
  showBranding,
  setShowBranding,
  generateEmbedCode,
  copyToClipboard,
  copiedCode,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left: Customization Panel */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Customize Appearance</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={embedWidth}
                  onChange={(e) => setEmbedWidth(Number(e.target.value))}
                  min={300}
                  max={1200}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={embedHeight}
                  onChange={(e) => setEmbedHeight(Number(e.target.value))}
                  min={400}
                  max={1200}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={embedTheme} onValueChange={setEmbedTheme}>
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="radius">Border Radius: {borderRadius[0]}px</Label>
              <Slider
                id="radius"
                value={borderRadius}
                onValueChange={setBorderRadius}
                min={0}
                max={20}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="branding" className="cursor-pointer">Show "Powered by Pine Tools Hub"</Label>
              <Switch
                id="branding"
                checked={showBranding}
                onCheckedChange={setShowBranding}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Preview & Code */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Live Preview</h3>
          <div 
            className="border rounded-lg p-4 bg-muted/50 flex items-center justify-center"
            style={{ minHeight: '300px' }}
          >
            <div 
              className="bg-background rounded-lg shadow-lg p-6 text-center"
              style={{ 
                borderRadius: `${borderRadius[0]}px`,
                maxWidth: '100%',
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <FileText className="h-6 w-6" style={{ color: primaryColor }} />
                <h4 className="font-semibold">{toolName}</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>This is a preview of your embedded tool</p>
                <p className="text-xs">Theme: {embedTheme === 'light' ? '☀️ Light' : '🌙 Dark'}</p>
                <p className="text-xs">Size: {embedWidth}×{embedHeight}px</p>
              </div>
              {showBranding && (
                <p className="text-xs text-muted-foreground mt-4">
                  <a href="https://www.pinetoolshub.com" className="hover:underline">
                    Powered by Pine Tools Hub
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get Embed Code</h3>
          <Tabs defaultValue="html" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="wordpress">WordPress</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="space-y-2">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{generateEmbedCode('html')}</code>
                </pre>
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(generateEmbedCode('html'), 'html')}
                >
                  {copiedCode === 'html' ? (
                    <><Check className="h-4 w-4 mr-1" /> Copied!</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Copy</>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="wordpress" className="space-y-2">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{generateEmbedCode('wordpress')}</code>
                </pre>
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(generateEmbedCode('wordpress'), 'wordpress')}
                >
                  {copiedCode === 'wordpress' ? (
                    <><Check className="h-4 w-4 mr-1" /> Copied!</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Copy</>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="javascript" className="space-y-2">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{generateEmbedCode('javascript')}</code>
                </pre>
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(generateEmbedCode('javascript'), 'javascript')}
                >
                  {copiedCode === 'javascript' ? (
                    <><Check className="h-4 w-4 mr-1" /> Copied!</>
                  ) : (
                    <><Copy className="h-4 w-4 mr-1" /> Copy</>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Embed;
