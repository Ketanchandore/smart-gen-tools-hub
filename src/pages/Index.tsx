import React, { useState } from 'react';
import { 
  FileText, Scissors, Minimize, FileSpreadsheet, Presentation, 
  Image, PenTool, Signature, Droplets, RotateCcw, Globe, Unlock, 
  Shield, FileCheck, Hash, ScanLine, FileSearch, Eye, Crop,
  Search, BookOpen, Zap, Briefcase, User, CreditCard, Calendar,
  BarChart2, Binary, Mail, Mic, FileVideo, Instagram, Twitter,
  MessageSquare, Book, Lightbulb, Code, Youtube, Workflow,
  BarChart, CheckCircle, Database, Headphones, Filter, BrainCircuit,
  ArrowUpRight, Palette, AtSign, BadgeDollarSign, CircleUser, QrCode,
  Network, Layers, Chrome, Send, FileUp, Smartphone, Lock, Star,
  Users, TrendingUp, Clock, MousePointerClick, Sparkles, ChevronRight
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('pdf');

  // Categories
  const categories = [
    { id: 'pdf', label: 'PDF Tools' },
    { id: 'career', label: 'Career' },
    { id: 'content', label: 'Content' },
    { id: 'multimedia', label: 'Multimedia' },
    { id: 'coding', label: 'Development' },
    { id: 'learning', label: 'Learning' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'design', label: 'Design' },
    { id: 'utilities', label: 'Utilities' },
  ];
  
  // All Tools
  const allTools = [
    // ========== PDF TOOLS ==========
    { 
      id: 'merge-pdf', 
      title: 'Merge PDF', 
      description: 'Combine PDFs in the order you want with the easiest PDF merger available.', 
      icon: <FileText />, 
      route: '/merge-pdf',
      category: 'pdf'
    },
    { 
      id: 'split-pdf', 
      title: 'Split PDF', 
      description: 'Separate one page or a whole set for easy conversion into independent PDF files.', 
      icon: <Scissors />, 
      route: '/split-pdf',
      category: 'pdf'
    },
    { 
      id: 'compress-pdf', 
      title: 'Compress PDF', 
      description: 'Reduce file size while optimizing for maximal PDF quality.', 
      icon: <Minimize />, 
      route: '/compress-pdf',
      category: 'pdf'
    },
    { 
      id: 'pdf-to-word', 
      title: 'PDF to Word', 
      description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.', 
      icon: <FileText />, 
      route: '/pdf-to-word',
      category: 'pdf'
    },
    { 
      id: 'pdf-to-powerpoint', 
      title: 'PDF to PowerPoint', 
      description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', 
      icon: <Presentation />, 
      route: '/pdf-to-powerpoint',
      category: 'pdf'
    },
    { 
      id: 'pdf-to-excel', 
      title: 'PDF to Excel', 
      description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', 
      icon: <FileSpreadsheet />, 
      route: '/pdf-to-excel',
      category: 'pdf'
    },
    { 
      id: 'pdf-to-jpg', 
      title: 'PDF to JPG', 
      description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.', 
      icon: <Image />, 
      route: '/pdf-to-jpg',
      category: 'pdf'
    },
    { 
      id: 'word-to-pdf', 
      title: 'Word to PDF', 
      description: 'Make DOC and DOCX files easy to read by converting them to PDF.', 
      icon: <FileText />, 
      route: '/word-to-pdf',
      category: 'pdf'
    },
    { 
      id: 'powerpoint-to-pdf', 
      title: 'PowerPoint to PDF', 
      description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', 
      icon: <Presentation />, 
      route: '/powerpoint-to-pdf',
      category: 'pdf'
    },
    { 
      id: 'excel-to-pdf', 
      title: 'Excel to PDF', 
      description: 'Make Excel spreadsheets easy to read by converting them to PDF.', 
      icon: <FileSpreadsheet />, 
      route: '/excel-to-pdf',
      category: 'pdf'
    },
    { 
      id: 'jpg-to-pdf', 
      title: 'JPG to PDF', 
      description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', 
      icon: <Image />, 
      route: '/jpg-to-pdf',
      category: 'pdf'
    },
    { 
      id: 'edit-pdf', 
      title: 'Edit PDF', 
      description: 'Add text, images, shapes or freehand annotations to a PDF document.', 
      icon: <PenTool />, 
      route: '/edit-pdf',
      category: 'pdf'
    },
    { 
      id: 'sign-pdf', 
      title: 'Sign PDF', 
      description: 'Sign yourself or request electronic signatures from others.', 
      icon: <Signature />, 
      route: '/sign-pdf',
      category: 'pdf'
    },
    { 
      id: 'watermark-pdf', 
      title: 'Watermark PDF', 
      description: 'Stamp an image or text over your PDF in seconds.', 
      icon: <Droplets />, 
      route: '/watermark-pdf',
      category: 'pdf'
    },
    { 
      id: 'rotate-pdf', 
      title: 'Rotate PDF', 
      description: 'Rotate your PDFs the way you need them.', 
      icon: <RotateCcw />, 
      route: '/rotate-pdf',
      category: 'pdf'
    },
    { 
      id: 'unlock-pdf', 
      title: 'Unlock PDF', 
      description: 'Remove PDF password security, giving you the freedom to use your PDFs.', 
      icon: <Unlock />, 
      route: '/unlock-pdf',
      category: 'pdf'
    },
    { 
      id: 'protect-pdf', 
      title: 'Protect PDF', 
      description: 'Protect PDF files with a password. Encrypt PDF documents.', 
      icon: <Shield />, 
      route: '/protect-pdf',
      category: 'pdf'
    },
    { 
      id: 'organize-pdf', 
      title: 'Organize PDF', 
      description: 'Sort pages of your PDF file however you like.', 
      icon: <Layers />, 
      route: '/organize-pdf',
      category: 'pdf'
    },
    { 
      id: 'pdf-to-pdfa', 
      title: 'PDF to PDF/A', 
      description: 'Transform your PDF to PDF/A, the ISO-standardized version.', 
      icon: <FileCheck />, 
      route: '/pdf-to-pdfa',
      category: 'pdf'
    },
    { 
      id: 'repair-pdf', 
      title: 'Repair PDF', 
      description: 'Repair a damaged PDF and recover data from corrupted PDF.', 
      icon: <FileCheck />, 
      route: '/repair-pdf',
      category: 'pdf'
    },
    { 
      id: 'page-numbers-pdf', 
      title: 'Page Numbers', 
      description: 'Add page numbers into PDFs with ease.', 
      icon: <Hash />, 
      route: '/page-numbers-pdf',
      category: 'pdf'
    },
    { 
      id: 'scan-to-pdf', 
      title: 'Scan to PDF', 
      description: 'Capture document scans and send them instantly to your browser.', 
      icon: <ScanLine />, 
      route: '/scan-to-pdf',
      category: 'pdf'
    },
    { 
      id: 'ocr-pdf', 
      title: 'OCR PDF', 
      description: 'Easily convert scanned PDF into searchable documents.', 
      icon: <FileSearch />, 
      route: '/ocr-pdf',
      category: 'pdf'
    },
    { 
      id: 'compare-pdf', 
      title: 'Compare PDF', 
      description: 'Show side-by-side comparison and easily spot changes.', 
      icon: <Eye />, 
      route: '/compare-pdf',
      category: 'pdf'
    },
    { 
      id: 'redact-pdf', 
      title: 'Redact PDF', 
      description: 'Permanently remove sensitive information from PDF.', 
      icon: <Eye />, 
      route: '/redact-pdf',
      category: 'pdf'
    },
    { 
      id: 'crop-pdf', 
      title: 'Crop PDF', 
      description: 'Crop margins or select specific areas.', 
      icon: <Crop />, 
      route: '/crop-pdf',
      category: 'pdf'
    },
    { 
      id: 'html-to-pdf', 
      title: 'HTML to PDF', 
      description: 'Convert webpages to PDF with just a URL.', 
      icon: <Globe />, 
      route: '/html-to-pdf',
      category: 'pdf'
    },

    // ========== CAREER TOOLS ==========
    { 
      id: 'resume-builder', 
      title: 'AI Resume Builder', 
      description: 'Create professional resumes in minutes', 
      icon: <Briefcase />, 
      route: '/resume-builder',
      category: 'career'
    },
    { 
      id: 'cover-letter', 
      title: 'Cover Letter Generator', 
      description: 'Generate tailored cover letters', 
      icon: <FileText />, 
      route: '/cover-letter',
      category: 'career'
    },
    { 
      id: 'linkedin-bio', 
      title: 'LinkedIn Optimizer', 
      description: 'Optimize your LinkedIn profile', 
      icon: <User />, 
      route: '/linkedin-bio',
      category: 'career'
    },
    { 
      id: 'job-matcher', 
      title: 'Job Matcher', 
      description: 'Find jobs matching your resume', 
      icon: <CheckCircle />, 
      route: '/job-matcher',
      category: 'career'
    },
    { 
      id: 'interview-coach', 
      title: 'Interview Coach', 
      description: 'Prepare for interviews with AI', 
      icon: <MessageSquare />, 
      route: '/interview-coach',
      category: 'career'
    },
    { 
      id: 'resume-score', 
      title: 'Resume Score Analyzer', 
      description: 'Get professional resume analysis', 
      icon: <BarChart />, 
      route: '/resume-score',
      category: 'career'
    },

    // ========== CONTENT CREATION ==========
    { 
      id: 'blog-writer', 
      title: 'AI Blog Writer', 
      description: 'Generate full blog posts instantly', 
      icon: <FileText />, 
      route: '/blog-writer',
      category: 'content'
    },
    { 
      id: 'blog-rewriter', 
      title: 'Blog Rewriter + SEO', 
      description: 'Rewrite content for SEO', 
      icon: <FileCheck />, 
      route: '/blog-rewriter',
      category: 'content'
    },
    { 
      id: 'twitter-thread', 
      title: 'Twitter Thread Generator', 
      description: 'Create engaging Twitter threads', 
      icon: <Twitter />, 
      route: '/twitter-thread',
      category: 'content'
    },
    { 
      id: 'content-detector', 
      title: 'AI/Plagiarism Detector', 
      description: 'Check content authenticity', 
      icon: <FileCheck />, 
      route: '/content-detector',
      category: 'content'
    },
    { 
      id: 'blog-topics', 
      title: 'Blog Topic Generator', 
      description: 'Generate engaging topics', 
      icon: <Lightbulb />, 
      route: '/blog-topics',
      category: 'content'
    },
    { 
      id: 'smart-copy', 
      title: 'UI/UX Copy Generator', 
      description: 'Create compelling copy', 
      icon: <PenTool />, 
      route: '/smart-copy',
      category: 'content'
    },
    { 
      id: 'email-writer', 
      title: 'Smart Email Writer', 
      description: 'Draft professional emails', 
      icon: <Mail />, 
      route: '/email-writer',
      category: 'content'
    },
    { 
      id: 'product-description', 
      title: 'Product Description', 
      description: 'Create product descriptions', 
      icon: <FileText />, 
      route: '/product-description',
      category: 'content'
    },
    { 
      id: 'social-captions', 
      title: 'Social Captions', 
      description: 'Generate social media captions', 
      icon: <MessageSquare />, 
      route: '/social-captions',
      category: 'content'
    },
    { 
      id: 'email-sequence', 
      title: 'Email Sequence', 
      description: 'Create email campaigns', 
      icon: <Send />, 
      route: '/email-sequence',
      category: 'content'
    },
    { 
      id: 'lorem-ipsum', 
      title: 'Lorem Ipsum', 
      description: 'Generate placeholder text', 
      icon: <FileText />, 
      route: '/lorem-ipsum',
      category: 'content'
    },

    // ========== MULTIMEDIA ==========
    { 
      id: 'video-summarizer', 
      title: 'Video Summarizer', 
      description: 'Summarize video content', 
      icon: <FileVideo />, 
      route: '/video-summarizer',
      category: 'multimedia'
    },
    { 
      id: 'youtube-summarizer', 
      title: 'YouTube Summarizer', 
      description: 'Summarize YouTube videos', 
      icon: <Youtube />, 
      route: '/youtube-summarizer',
      category: 'multimedia'
    },
    { 
      id: 'text-to-speech', 
      title: 'Text to Speech', 
      description: 'Convert text to speech', 
      icon: <Headphones />, 
      route: '/text-to-speech',
      category: 'multimedia'
    },
    { 
      id: 'voice-cloner', 
      title: 'Voice Cloner', 
      description: 'Clone voices for audio', 
      icon: <Mic />, 
      route: '/voice-cloner',
      category: 'multimedia'
    },
    { 
      id: 'audio-enhancer', 
      title: 'Audio Enhancer', 
      description: 'Remove noise and enhance voice', 
      icon: <Filter />, 
      route: '/audio-enhancer',
      category: 'multimedia'
    },
    { 
      id: 'image-compressor', 
      title: 'Image Compressor', 
      description: 'Compress images without quality loss', 
      icon: <Image />, 
      route: '/image-compressor',
      category: 'multimedia'
    },

    // ========== DEVELOPMENT ==========
    { 
      id: 'code-generator', 
      title: 'Code Generator', 
      description: 'Generate code in any language', 
      icon: <Code />, 
      route: '/code-generator',
      category: 'coding'
    },
    { 
      id: 'code-explainer', 
      title: 'Code Explainer', 
      description: 'Get detailed code explanations', 
      icon: <MessageSquare />, 
      route: '/code-explainer',
      category: 'coding'
    },
    { 
      id: 'website-analyzer', 
      title: 'Website Analyzer', 
      description: 'Analyze websites for SEO', 
      icon: <Globe />, 
      route: '/website-analyzer',
      category: 'coding'
    },

    // ========== LEARNING ==========
    { 
      id: 'study-notes', 
      title: 'Study Notes Maker', 
      description: 'Create concise study notes', 
      icon: <BookOpen />, 
      route: '/study-notes',
      category: 'learning'
    },
    { 
      id: 'flashcard-generator', 
      title: 'Flashcard Generator', 
      description: 'Generate study flashcards', 
      icon: <Layers />, 
      route: '/flashcard-generator',
      category: 'learning'
    },
    { 
      id: 'ai-translator', 
      title: 'AI Translator', 
      description: 'Translate between languages', 
      icon: <Globe />, 
      route: '/ai-translator',
      category: 'learning'
    },

    // ========== MARKETING ==========
    { 
      id: 'business-plan', 
      title: 'Business Plan Generator', 
      description: 'Create comprehensive plans', 
      icon: <FileText />, 
      route: '/business-plan',
      category: 'marketing'
    },
    { 
      id: 'lead-magnet', 
      title: 'Lead Magnet Creator', 
      description: 'Create lead magnets', 
      icon: <BadgeDollarSign />, 
      route: '/lead-magnet',
      category: 'marketing'
    },

    // ========== DESIGN ==========
    { 
      id: 'image-generator', 
      title: 'AI Image Generator', 
      description: 'Create images from text', 
      icon: <Image />, 
      route: '/image-generator',
      category: 'design'
    },
    { 
      id: 'avatar-generator', 
      title: 'Avatar Generator', 
      description: 'Generate avatar images', 
      icon: <CircleUser />, 
      route: '/avatar-generator',
      category: 'design'
    },
    { 
      id: 'image-enhancer', 
      title: 'Image Enhancer', 
      description: 'Enhance and remove backgrounds', 
      icon: <Image />, 
      route: '/image-enhancer',
      category: 'design'
    },

    // ========== UTILITIES ==========
    { 
      id: 'qr-code', 
      title: 'QR Code Generator', 
      description: 'Create customizable QR codes', 
      icon: <QrCode />, 
      route: '/qr-code',
      category: 'utilities'
    },
    { 
      id: 'word-counter', 
      title: 'Word Counter', 
      description: 'Count words and extract keywords', 
      icon: <FileText />, 
      route: '/word-counter',
      category: 'utilities'
    },
    { 
      id: 'text-case-converter', 
      title: 'Text Case Converter', 
      description: 'Convert text between cases', 
      icon: <FileText />, 
      route: '/text-case-converter',
      category: 'utilities'
    },
    { 
      id: 'password-generator', 
      title: 'Password Generator', 
      description: 'Generate secure passwords', 
      icon: <Binary />, 
      route: '/password-generator',
      category: 'utilities'
    },
    { 
      id: 'barcode-generator', 
      title: 'Barcode Generator', 
      description: 'Generate barcodes', 
      icon: <BarChart2 />, 
      route: '/barcode-generator',
      category: 'utilities'
    },
    { 
      id: 'credit-card-generator', 
      title: 'Credit Card Generator', 
      description: 'Generate test card numbers', 
      icon: <CreditCard />, 
      route: '/credit-card-generator',
      category: 'utilities'
    },
    { 
      id: 'ifsc-finder', 
      title: 'IFSC Finder', 
      description: 'Find bank IFSC codes', 
      icon: <Search />, 
      route: '/ifsc-finder',
      category: 'utilities'
    },
    { 
      id: 'temp-email', 
      title: 'Temp Email', 
      description: 'Generate temporary emails', 
      icon: <AtSign />, 
      route: '/temp-email',
      category: 'utilities'
    },
  ];

  // Filter tools
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get tools for selected category
  const categoryTools = selectedCategory === 'all' 
    ? filteredTools 
    : filteredTools.filter(t => t.category === selectedCategory);

  // Recently used tools from localStorage
  const [recentTools, setRecentTools] = React.useState<typeof allTools>([]);

  React.useEffect(() => {
    const recent = localStorage.getItem('recentTools');
    if (recent) {
      const recentIds = JSON.parse(recent);
      const tools = recentIds.map((id: string) => 
        allTools.find(tool => tool.route === id)
      ).filter(Boolean).slice(0, 6);
      setRecentTools(tools);
    }
  }, []);

  // Featured/Popular tools (top 6)
  const featuredTools = [
    allTools.find(t => t.route === '/resume-builder'),
    allTools.find(t => t.route === '/qr-code'),
    allTools.find(t => t.route === '/password-generator'),
    allTools.find(t => t.route === '/merge-pdf'),
    allTools.find(t => t.route === '/blog-writer'),
    allTools.find(t => t.route === '/image-compressor'),
  ].filter(Boolean) as typeof allTools;

  // Tool Categories with sample tools
  const toolCategories = [
    {
      id: 'career',
      name: 'Resume & Career Tools',
      description: 'Build your professional career',
      icon: <Briefcase className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      tools: allTools.filter(t => t.category === 'career').slice(0, 4)
    },
    {
      id: 'content',
      name: 'Content Creation Tools',
      description: 'Create engaging content easily',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      tools: allTools.filter(t => t.category === 'content').slice(0, 4)
    },
    {
      id: 'multimedia',
      name: 'AI & Multimedia Tools',
      description: 'Transform media with AI',
      icon: <Sparkles className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      tools: allTools.filter(t => t.category === 'multimedia').slice(0, 4)
    },
    {
      id: 'utilities',
      name: 'Business & Utility Tools',
      description: 'Essential tools for productivity',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      tools: allTools.filter(t => t.category === 'utilities').slice(0, 4)
    },
    {
      id: 'pdf',
      name: 'PDF & Document Tools',
      description: 'Coming Soon - Full PDF suite',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-gray-400 to-gray-500',
      tools: [],
      comingSoon: true
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      comment: 'The AI blog writer saved me hours! Generated amazing content in minutes.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Job Seeker',
      comment: 'Resume builder helped me land my dream job. Simple and professional!',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Small Business Owner',
      comment: 'Love the QR code and password generators. Use them daily for my business.',
      rating: 5
    }
  ];

  return (
    <>
      <SEOHead
        title="Free Online Tools Hub - 90+ AI-Powered Tools | PineToolsHub" 
        description="Access 90+ free AI-powered tools including resume builders, content creators, PDF tools, and more. No registration required. Join 50K+ users today!"
        keywords="free online tools, ai tools, resume builder, content creator, pdf tools, password generator, qr code generator, productivity tools"
      />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Pine Tools Hub",
          "url": "https://pinetoolshub.com",
          "description": "Free AI-powered online tools for productivity and creativity"
        })}
      </script>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          
          <div className="container relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Sparkles className="h-4 w-4" />
                <span>Trusted by 50,000+ Users Worldwide</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-fade-in">
                Free Online Tools for<br />Every Need
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
                90+ AI-powered tools to boost your productivity.<br />
                All free, no registration, instant results.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search tools (e.g., resume builder, PDF converter...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-base bg-background/80 backdrop-blur border-2 focus:border-primary shadow-lg"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm animate-fade-in">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-semibold">50K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="font-semibold">90+ Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4 text-green-500" />
                  <span className="font-semibold">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="font-semibold">4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 border-b bg-card/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:shadow-lg hover:scale-105 transition-all">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <BadgeDollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2">Free Forever</h3>
                  <p className="text-sm text-muted-foreground">All tools 100% free</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 hover:shadow-lg hover:scale-105 transition-all">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-green-500/10">
                      <Zap className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">Get results in seconds</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 hover:shadow-lg hover:scale-105 transition-all">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <Lock className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2">No Registration</h3>
                  <p className="text-sm text-muted-foreground">Start using instantly</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 hover:shadow-lg hover:scale-105 transition-all">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-orange-500/10">
                      <Smartphone className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2">Mobile Friendly</h3>
                  <p className="text-sm text-muted-foreground">Works on all devices</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Tools Showcase */}
        {!searchQuery && (
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Most Popular Tools</h2>
                <p className="text-lg text-muted-foreground">Try our most loved tools used by thousands daily</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {featuredTools.map((tool, index) => (
                  <Link 
                    key={tool.id} 
                    to={tool.route}
                    className="group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            {tool.icon}
                          </div>
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                          Try Now
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tool Categories Section */}
        {!searchQuery && (
          <section className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-background">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Tool Categories</h2>
                <p className="text-lg text-muted-foreground">Browse our extensive collection organized by category</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {toolCategories.map((category, index) => (
                  <Card 
                    key={category.id} 
                    className={`hover:shadow-xl transition-all duration-300 ${category.comingSoon ? 'opacity-75' : 'hover:-translate-y-1'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} text-white w-fit mb-4`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {category.name}
                        {category.comingSoon && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {category.comingSoon ? (
                        <div className="text-center py-4 text-muted-foreground">
                          <Clock className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">Full PDF suite coming soon!</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2 mb-4">
                            {category.tools.map((tool) => (
                              <Link 
                                key={tool.id} 
                                to={tool.route}
                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors py-1 group"
                              >
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                <span>{tool.title}</span>
                              </Link>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => {
                              const categoryElement = document.getElementById('all-tools');
                              categoryElement?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            View All Tools
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        {!searchQuery && (
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground">Get started in 3 simple steps</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full bg-blue-500/10 -z-10 group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/5 to-transparent">
                    <MousePointerClick className="h-10 w-10 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-xl font-bold mb-2">Choose a Tool</h3>
                    <p className="text-muted-foreground">Select from 90+ tools designed for your needs</p>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full bg-purple-500/10 -z-10 group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/5 to-transparent">
                    <FileUp className="h-10 w-10 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-bold mb-2">Enter Your Content</h3>
                    <p className="text-muted-foreground">Paste text, upload files, or fill in the details</p>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full bg-green-500/10 -z-10 group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/5 to-transparent">
                    <Sparkles className="h-10 w-10 mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-bold mb-2">Get Results Instantly</h3>
                    <p className="text-muted-foreground">Download, copy, or use your results right away</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Trust & Testimonials Section */}
        {!searchQuery && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
                <p className="text-lg text-muted-foreground">See what our users have to say</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
                <div className="p-6 rounded-lg bg-background/80 backdrop-blur">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="p-6 rounded-lg bg-background/80 backdrop-blur">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90+</div>
                  <div className="text-sm text-muted-foreground">Tools Available</div>
                </div>
                <div className="p-6 rounded-lg bg-background/80 backdrop-blur">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-sm text-muted-foreground">Tools Used</div>
                </div>
                <div className="p-6 rounded-lg bg-background/80 backdrop-blur">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8/5</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search Results */}
        {searchQuery && (
          <section className="py-16">
            <div className="container">
              <h2 className="text-2xl font-bold mb-6">
                Search Results for "{searchQuery}"
              </h2>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      route={tool.route}
                      category={tool.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">No tools found matching "{searchQuery}"</p>
                  <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse our categories</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {!searchQuery && (
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">Everything you need to know</p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">Is PineToolsHub really free?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes! All 90+ tools on PineToolsHub are completely free to use. No hidden fees, no premium plans, no paywalls. 
                      We believe in providing accessible tools for everyone.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">Do I need to create an account?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      No registration required! You can start using any tool immediately. Just select a tool and get started. 
                      We don't require any personal information or account creation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">What tools are available?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We offer 90+ tools across multiple categories: Resume & Career Tools (resume builder, cover letter generator), 
                      Content Creation Tools (blog writer, social media captions), AI & Multimedia Tools (image generator, video summarizer), 
                      Business & Utility Tools (password generator, QR codes), and more. PDF tools coming soon!
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">Can I use these tools for commercial purposes?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes! All tools can be used for personal and commercial projects. The content you generate is yours to use 
                      however you like. Perfect for freelancers, businesses, and professionals.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">Are my inputs saved or tracked?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Your privacy is our priority. Most tools process data directly in your browser. We don't store your content 
                      or track your usage. Your data stays private and secure.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* All Tools Section */}
        <section id="all-tools" className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">All Tools</h2>
              <p className="text-lg text-muted-foreground">Browse our complete collection</p>
            </div>
            
            {categories.map((category) => {
              const categoryTools = allTools.filter(t => t.category === category.id);
              if (categoryTools.length === 0) return null;
              
              return (
                <div key={category.id} className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 capitalize">{category.label}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        description={tool.description}
                        icon={tool.icon}
                        route={tool.route}
                        category={tool.category}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        {!searchQuery && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-accent to-primary">
            <div className="container">
              <div className="text-center text-white max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Boost Your Productivity?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join 50,000+ users and start using our free tools today
                </p>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-8 py-6"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Get Started Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Index;
