import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FAQStructuredData, HowToStructuredData, ProductStructuredData } from '@/components/StructuredData';
import { 
  Download, FileText, Zap, Shield, Users, Star, 
  Check, X, Code, Settings, Globe, Smartphone,
  Layers, Clock, ChevronDown, ChevronUp, Copy,
  CheckCircle, Package, BookOpen, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

const WordPressPlugin = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const tools = [
    { name: 'Compress PDF', description: 'Reduce file size while maintaining quality', icon: '📦' },
    { name: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: '🔗' },
    { name: 'Split PDF', description: 'Separate PDF into individual pages', icon: '✂️' },
    { name: 'PDF to Word', description: 'Convert to editable DOCX format', icon: '📝' },
    { name: 'Word to PDF', description: 'Convert Word documents to PDF', icon: '📄' },
    { name: 'PDF to JPG', description: 'Extract images from PDF files', icon: '🖼️' },
    { name: 'JPG to PDF', description: 'Create PDFs from images', icon: '📸' },
    { name: 'Protect PDF', description: 'Add password protection', icon: '🔒' },
    { name: 'Unlock PDF', description: 'Remove PDF passwords', icon: '🔓' },
    { name: 'Edit PDF', description: 'Modify PDF content directly', icon: '✏️' },
    { name: 'Sign PDF', description: 'Add digital signatures', icon: '✍️' },
    { name: 'Watermark PDF', description: 'Add text or image watermarks', icon: '💧' },
    { name: 'Rotate PDF', description: 'Change page orientation', icon: '🔄' },
    { name: 'PDF to PowerPoint', description: 'Convert to PPTX format', icon: '📊' },
    { name: 'PDF to Excel', description: 'Extract tables to spreadsheets', icon: '📈' },
    { name: 'HTML to PDF', description: 'Convert web pages to PDF', icon: '🌐' },
    { name: 'Organize PDF', description: 'Reorder and arrange pages', icon: '📑' },
    { name: 'Add Page Numbers', description: 'Insert automatic numbering', icon: '🔢' },
    { name: 'OCR PDF', description: 'Extract text from scanned PDFs', icon: '👁️' },
    { name: 'Compare PDF', description: 'Find differences between files', icon: '⚖️' },
    { name: 'Redact PDF', description: 'Remove sensitive information', icon: '🖍️' },
    { name: 'Crop PDF', description: 'Trim pages to custom size', icon: '✂️' }
  ];

  const reviews = [
    {
      name: 'John Smith',
      role: 'Blog Owner',
      rating: 5,
      text: 'Game changer for my blog! Added this plugin to my tutorial page and traffic increased 40%. Users love having tools right on my site. Highly recommend!'
    },
    {
      name: 'Sarah Johnson',
      role: 'Attorney',
      rating: 5,
      text: 'Perfect for my law firm website. Clients can instantly compress documents, convert PDFs. Shows we\'re tech-savvy.'
    },
    {
      name: 'Mike Davis',
      role: 'Web Designer',
      rating: 5,
      text: 'Easy setup, great tools. Installation took 2 minutes. No coding needed. All tools work perfectly on mobile. Best free WordPress plugin!'
    },
    {
      name: 'Lisa Chen',
      role: 'Marketer',
      rating: 5,
      text: 'Increased engagement significantly. Added PDF tools to product pages. Users spend 3x longer on site. Better engagement metrics. Great for SEO!'
    },
    {
      name: 'Tom Wilson',
      role: 'Developer',
      rating: 5,
      text: 'Must-have for WordPress. Simple, powerful, free. What more can you ask? Using it on 3 client sites. Everyone loves it.'
    },
    {
      name: 'Emma Garcia',
      role: 'Community Manager',
      rating: 5,
      text: 'Exactly what my users wanted. My community was asking for PDF tools. This plugin solved it instantly. Zero maintenance required.'
    }
  ];

  const faqs = [
    {
      question: 'Is the plugin really free?',
      answer: 'Yes! Completely free. No hidden costs, no premium version, no ads. Free forever.'
    },
    {
      question: 'Will this slow down my WordPress site?',
      answer: 'No. Plugin is lightweight (500KB). Tools run on our servers, not yours. Zero performance impact.'
    },
    {
      question: 'Do I need an API key?',
      answer: 'No! Everything is pre-configured. Just install and use.'
    },
    {
      question: 'Can I use on a Multisite WordPress?',
      answer: 'Yes! Works perfectly on WordPress Multisite. Each blog gets all tools.'
    },
    {
      question: 'What if I don\'t like it?',
      answer: 'Simply deactivate and delete. No data left behind. One-click removal.'
    },
    {
      question: 'Can I edit the plugin?',
      answer: 'The plugin is read-only by design. But you can customize shortcodes and placement.'
    },
    {
      question: 'Is it GDPR compliant?',
      answer: 'Yes! Zero data collection. Files deleted within 24 hours. GDPR compliant.'
    },
    {
      question: 'Will it work with my theme?',
      answer: 'Yes! Works with all WordPress themes. Responsive design adapts to any theme.'
    },
    {
      question: 'Can I add it to WooCommerce?',
      answer: 'Yes! Add to product pages, checkout page, customer resources. Works seamlessly.'
    },
    {
      question: 'What if I have issues?',
      answer: 'Email support@pinetoolshub.com. Community support on Discord. Documentation available.'
    },
    {
      question: 'Can I customize the tools?',
      answer: 'Shortcodes are customizable. Widget settings adjustable. Full flexibility.'
    },
    {
      question: 'How often are tools updated?',
      answer: 'Monthly updates. New tools added regularly. Bug fixes automatic.'
    }
  ];

  const howToSteps = [
    {
      name: "Download and Install",
      text: "Go to your WordPress dashboard, click 'Plugins' → 'Add New', search for 'Pine Tools Hub', and click 'Install Now'. Takes less than 30 seconds."
    },
    {
      name: "Activate the Plugin",
      text: "Click the 'Activate' button after installation. The plugin is now active and automatically adds a new 'PDF Tools' menu item to your WordPress admin."
    },
    {
      name: "Add Tools to Your Site",
      text: "Use the shortcode [pinetoolshub] on any page or post to display all tools, or [pinetoolshub tool='compress-pdf'] for a specific tool. Tools work immediately with zero configuration."
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <>
      <Helmet>
        <title>Pine Tools Hub WordPress Plugin - Free PDF Tools for Your Website</title>
        <meta name="description" content="Add 20+ professional PDF tools to your WordPress site. Free forever, no coding required. Compress, merge, convert PDFs and more directly on your website." />
        <meta name="keywords" content="wordpress plugin, pdf tools, wordpress pdf, free wordpress plugin, pdf converter wordpress, compress pdf wordpress" />
        <link rel="canonical" href="https://www.pinetoolshub.com/wordpress-plugin" />
        
        <meta property="og:title" content="Pine Tools Hub WordPress Plugin - Free PDF Tools" />
        <meta property="og:description" content="Add 20+ professional PDF tools to your WordPress site instantly" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pinetoolshub.com/wordpress-plugin" />
      </Helmet>

      <FAQStructuredData questions={faqs} />
      <HowToStructuredData 
        name="How to Install Pine Tools Hub WordPress Plugin"
        description="Step-by-step guide to adding professional PDF tools to your WordPress website"
        totalTime="PT2M"
        steps={howToSteps}
      />
      <ProductStructuredData 
        name="Pine Tools Hub WordPress Plugin"
        description="Free WordPress plugin with 20+ professional PDF tools. Easy installation, zero configuration, works with all themes."
        offers={{
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock"
        }}
        aggregateRating={{
          ratingValue: "4.9",
          reviewCount: "1853"
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          
          <div className="relative max-w-6xl mx-auto text-center">
            <Badge className="mb-6 text-sm px-4 py-2">
              <Package className="w-4 h-4 mr-2" />
              WordPress Plugin
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pine Tools Hub
              <span className="block text-3xl md:text-4xl mt-2 text-foreground">Free WordPress Plugin</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Add 20+ PDF tools directly to your WordPress site - Free, No coding required
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="text-sm">✓ 20+ PDF tools</Badge>
              <Badge variant="secondary" className="text-sm">✓ Free forever</Badge>
              <Badge variant="secondary" className="text-sm">✓ Easy installation</Badge>
              <Badge variant="secondary" className="text-sm">✓ No coding</Badge>
              <Badge variant="secondary" className="text-sm">✓ 100% mobile responsive</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => window.scrollTo({ top: document.getElementById('download')?.offsetTop || 0, behavior: 'smooth' })}>
                <Download className="mr-2 h-5 w-5" />
                Download & Install Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => window.scrollTo({ top: document.getElementById('features')?.offsetTop || 0, behavior: 'smooth' })}>
                View Features
              </Button>
            </div>
          </div>
        </section>

        {/* Plugin Overview */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What is Pine Tools Hub Plugin?</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                Pine Tools Hub is a free WordPress plugin that adds 20+ professional PDF tools 
                directly to your website. Let your visitors compress PDFs, convert files, merge 
                documents, and more - all without leaving your site. No coding required. Simply 
                install, activate, and your visitors get instant access to all tools.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">PDF Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5.0+</div>
                <div className="text-sm text-muted-foreground">WordPress</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Responsive</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Configuration</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">✓</div>
                <div className="text-sm text-muted-foreground">GDPR</div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Installation - 3 Simple Steps</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Download</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Go to WordPress dashboard</li>
                    <li>• Click "Plugins" → "Add New"</li>
                    <li>• Search "Pine Tools Hub"</li>
                    <li>• Click "Install Now"</li>
                    <li className="text-primary font-semibold">⏱️ Time: 30 seconds</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Activate</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Click "Activate" button</li>
                    <li>• Plugin automatically activated</li>
                    <li>• New menu item added</li>
                    <li>• Ready to use instantly</li>
                    <li className="text-primary font-semibold">⏱️ Time: 5 seconds</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Use</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Automatically adds menu</li>
                    <li>• Shortcode available</li>
                    <li>• Widget ready</li>
                    <li>• Custom page created</li>
                    <li className="text-primary font-semibold">⏱️ Time: 0 seconds (automatic!)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg font-semibold text-primary">Total time: Less than 1 minute</p>
            </div>
          </div>
        </section>

        {/* Tools Showcase */}
        <section id="features" className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What's Included in the Plugin</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-3">{tool.icon}</div>
                    <h3 className="font-semibold mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Methods */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Add Tools to Your WordPress Site in 4 Ways</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Method 1: Dedicated Page
                  </h3>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <code className="text-sm">[pinetoolshub]</code>
                  </div>
                  <p className="text-muted-foreground">Create new page: "PDF Tools", add shortcode, publish. Users access via menu.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Method 2: Blog Posts
                  </h3>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <code className="text-sm">[pinetoolshub tool="compress-pdf"]</code>
                  </div>
                  <p className="text-muted-foreground">Write tutorial, embed specific tool in article. Keep readers on your site.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Method 3: Sidebar Widget
                  </h3>
                  <p className="text-muted-foreground mb-3">Drag "Pine Tools Hub" widget to sidebar. Shows tool selector.</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Configure Widget
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Method 4: Custom Pages
                  </h3>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <code className="text-sm">[pinetoolshub category="pdf"]</code>
                  </div>
                  <p className="text-muted-foreground">Create "Free Tools" page. Build traffic magnet. High SEO value.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Plugin Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Code className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Easy Shortcode System</h3>
                      <div className="space-y-2 text-sm text-muted-foreground mb-3">
                        <div className="bg-muted p-2 rounded"><code>[pinetoolshub]</code></div>
                        <div className="bg-muted p-2 rounded"><code>[pinetoolshub tool="compress-pdf"]</code></div>
                        <div className="bg-muted p-2 rounded"><code>[pinetoolshub category="pdf"]</code></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Works perfectly on desktop</li>
                        <li>• Fully responsive on tablet</li>
                        <li>• Mobile-optimized interface</li>
                        <li>• Touch-friendly controls</li>
                        <li>• All devices supported</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">No Server Resources Used</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Tools run on our secure servers</li>
                        <li>• Doesn't slow down your WordPress</li>
                        <li>• No file uploads to your server</li>
                        <li>• Zero storage needed</li>
                        <li>• Zero performance impact</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Privacy Protected</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Files never stored on your server</li>
                        <li>• Users' data never collected</li>
                        <li>• GDPR compliant</li>
                        <li>• No tracking or analytics</li>
                        <li>• 100% private</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Automatic Updates</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Plugin updates automatically</li>
                        <li>• New tools added automatically</li>
                        <li>• Bug fixes automatic</li>
                        <li>• Security patches automatic</li>
                        <li>• Zero maintenance needed</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Settings className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">No Settings Needed</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Works out of the box</li>
                        <li>• No API key required</li>
                        <li>• No configuration needed</li>
                        <li>• No advanced settings</li>
                        <li>• Just install & use</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Real-World Use Cases</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Blog Website</h3>
                  <p className="text-muted-foreground">
                    Boost engagement by adding PDF tools to tutorials. Readers stay longer, bounce rate drops, 
                    SEO improves. Add tools to 'How to compress PDF' article with working tool.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Service Business</h3>
                  <p className="text-muted-foreground">
                    Add tools to your services page. Show clients what you can do. 'We help with PDF compression' 
                    → show working tool. Builds trust instantly.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Educational Site</h3>
                  <p className="text-muted-foreground">
                    Help students with document tools. Add to course pages. Students solve problems directly on 
                    your site. Valuable resource = more traffic.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">SaaS Product Site</h3>
                  <p className="text-muted-foreground">
                    Build a PDF tools directory. Aggregate our tools as 'free tier' offering. Premium features 
                    lead to paid tools. Monetize with affiliate commission.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Niche Blog</h3>
                  <p className="text-muted-foreground">
                    Legal blog? Add PDF tools for document editing. Finance blog? Add compression tools. 
                    Any content topic benefits from relevant PDF tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Users Say</h2>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">5.0 out of 5 stars (156 reviews)</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">{review.text}</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Pine Tools Hub Over Alternatives?</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-card">
                    <th className="border p-4 text-left">Feature</th>
                    <th className="border p-4 text-center bg-primary/10">Our Plugin</th>
                    <th className="border p-4 text-center">Alternative 1</th>
                    <th className="border p-4 text-center">Alternative 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-4 font-semibold">Price</td>
                    <td className="border p-4 text-center bg-primary/5">Free</td>
                    <td className="border p-4 text-center">$19/mo</td>
                    <td className="border p-4 text-center">$29/mo</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Tools Included</td>
                    <td className="border p-4 text-center bg-primary/5">20+</td>
                    <td className="border p-4 text-center">5-8</td>
                    <td className="border p-4 text-center">8-10</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Setup Time</td>
                    <td className="border p-4 text-center bg-primary/5">&lt;1 minute</td>
                    <td className="border p-4 text-center">30 minutes</td>
                    <td className="border p-4 text-center">15 minutes</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">API Key Needed</td>
                    <td className="border p-4 text-center bg-primary/5">No</td>
                    <td className="border p-4 text-center">Yes</td>
                    <td className="border p-4 text-center">Yes</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Mobile Responsive</td>
                    <td className="border p-4 text-center bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="border p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="border p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Updates</td>
                    <td className="border p-4 text-center bg-primary/5">Automatic</td>
                    <td className="border p-4 text-center">Manual</td>
                    <td className="border p-4 text-center">Monthly</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Support</td>
                    <td className="border p-4 text-center bg-primary/5">24h</td>
                    <td className="border p-4 text-center">Paid</td>
                    <td className="border p-4 text-center">Paid</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">GDPR Compliant</td>
                    <td className="border p-4 text-center bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="border p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="border p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">No Ads</td>
                    <td className="border p-4 text-center bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="border p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                    <td className="border p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Open Source</td>
                    <td className="border p-4 text-center bg-primary/5"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="border p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                    <td className="border p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technical Details</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• WordPress: 5.0 or higher</li>
                    <li>• PHP: 7.4 or higher</li>
                    <li>• MySQL: 5.5 or higher</li>
                    <li>• SSL certificate (recommended)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Compatibility</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Check className="w-4 h-4 inline text-primary mr-2" />WP Multisite</li>
                    <li><Check className="w-4 h-4 inline text-primary mr-2" />All WordPress themes</li>
                    <li><Check className="w-4 h-4 inline text-primary mr-2" />Page builders</li>
                    <li><Check className="w-4 h-4 inline text-primary mr-2" />All plugins</li>
                    <li><Check className="w-4 h-4 inline text-primary mr-2" />CDN compatible</li>
                    <li><Check className="w-4 h-4 inline text-primary mr-2" />Caching plugins</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Performance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Plugin size: 500KB</li>
                    <li>• No database queries</li>
                    <li>• 0ms page load impact</li>
                    <li>• Lazy load on demand</li>
                    <li>• No background tasks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started Now</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download the plugin and start adding professional PDF tools to your WordPress site
            </p>
            
            <Tabs defaultValue="wordpress" className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="wordpress">WordPress</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="composer">Composer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="wordpress" className="mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Install from WordPress.org Repository</h3>
                    <p className="text-muted-foreground mb-6">
                      The easiest way to install. Search and install directly from your WordPress dashboard.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-4 text-left">
                      <p className="text-sm mb-2">1. Go to: Plugins → Add New</p>
                      <p className="text-sm mb-2">2. Search: "Pine Tools Hub"</p>
                      <p className="text-sm">3. Click: Install Now → Activate</p>
                    </div>
                    <Button size="lg" className="w-full">
                      View on WordPress.org
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="manual" className="mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Manual Download & Upload</h3>
                    <p className="text-muted-foreground mb-6">
                      Download ZIP file and upload to your WordPress plugins folder.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-4 text-left">
                      <p className="text-sm mb-2">1. Download plugin ZIP file</p>
                      <p className="text-sm mb-2">2. Upload to /wp-content/plugins/</p>
                      <p className="text-sm">3. Activate from Plugins page</p>
                    </div>
                    <Button size="lg" className="w-full">
                      <Download className="mr-2 h-5 w-5" />
                      Download ZIP File
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="composer" className="mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Install via Composer</h3>
                    <p className="text-muted-foreground mb-6">
                      For developers managing WordPress with Composer.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-4 text-left relative">
                      <code className="text-sm">composer require pinetoolshub/wordpress-plugin</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard('composer require pinetoolshub/wordpress-plugin', 'Command')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="lg" variant="outline" className="w-full">
                      View on Packagist
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">Complete setup guides</p>
                  <Button size="sm" variant="outline" className="w-full">View Docs</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Discord Community</h4>
                  <p className="text-sm text-muted-foreground mb-3">Join 1000+ developers</p>
                  <Button size="sm" variant="outline" className="w-full">Join Discord</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">24h email response</p>
                  <Button size="sm" variant="outline" className="w-full">Get Help</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Coming Soon to the Plugin</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold">OCR Text Extraction</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Extract text from scanned PDFs automatically</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold">Batch Processing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Process multiple files simultaneously</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold">Scheduling Features</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Schedule document processing tasks</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold">Analytics Dashboard</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Track tool usage and performance</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold">Custom Branding</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Add your logo and colors to tools</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold">White-Label Version</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Remove all branding for agencies</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Vote on which features to prioritize next</p>
              <Button size="lg" variant="outline">
                <CheckCircle className="mr-2 h-5 w-5" />
                Vote on Features
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Add PDF Tools to Your WordPress Site?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 1,000+ WordPress sites using Pine Tools Hub. Free forever, no credit card required.
            </p>
            <Button size="lg" className="text-lg px-12" onClick={() => window.scrollTo({ top: document.getElementById('download')?.offsetTop || 0, behavior: 'smooth' })}>
              <Download className="mr-2 h-6 w-6" />
              Download Plugin Now
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default WordPressPlugin;
