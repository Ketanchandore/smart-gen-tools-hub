
import React, { useState } from 'react';
import { 
  FileText, Scissors, Minimize, FileSpreadsheet, Presentation, 
  Image, PenTool, Signature, Droplets, RotateCcw, Globe, Unlock, 
  Shield, Layout, FileCheck, Hash, ScanLine, FileSearch, Eye, Crop,
  Search, BookOpen, Zap, Briefcase, User, CreditCard, Calendar,
  BarChart2, Binary, Mail, Mic, FileVideo, Instagram, Twitter,
  MessageSquare, Book, Lightbulb, Code, Youtube, Workflow,
  BarChart, CheckCircle, Database, Headphones, Filter, BrainCircuit,
  ArrowUpRight, Palette, AtSign, BadgeDollarSign, CircleUser, QrCode,
  Network, Layers, Chrome, Send, FileUp
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
      icon: <Layout />, 
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

  return (
    <>
      <SEOHead
        title="Pine Tools Hub - Free PDF Tools & AI Utilities"
        description="Every tool you need to work with PDFs in one place. Plus AI-powered tools for content, career, design and more. All 100% FREE and easy to use!"
        keywords="pdf tools, merge pdf, split pdf, compress pdf, pdf converter, ai tools, free online tools"
        url="https://www.pinetoolshub.com"
      />
      
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center space-y-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Every tool you need to work with PDFs in one place
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
            </p>
          </div>
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              className="pl-10 w-full h-12 text-base"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <div className="overflow-x-auto pb-2 mb-8">
            <TabsList className="inline-flex w-auto min-w-full justify-start bg-muted/50">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="min-w-[100px] whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {categoryTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    route={tool.route}
                  />
                ))}
              </div>
              
              {categoryTools.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No tools found matching your search.
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 md:p-8 border border-border">
            <h2 className="text-2xl font-bold mb-4">The easiest way to edit and manage your documents</h2>
            <p className="text-muted-foreground mb-4">
              Pine Tools Hub provides a complete suite of tools for all your document and productivity needs. Whether you need PDF tools, AI content generators, career tools, or design utilities - we have everything in one place.
            </p>
            <p className="text-muted-foreground mb-4">
              All our tools are 100% free to use with no registration required. Process your files securely in your browser with professional-quality results instantly.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Popular Tools:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link to="/merge-pdf" className="text-primary hover:underline">Merge PDF</Link>
                <Link to="/split-pdf" className="text-primary hover:underline">Split PDF</Link>
                <Link to="/compress-pdf" className="text-primary hover:underline">Compress PDF</Link>
                <Link to="/pdf-to-word" className="text-primary hover:underline">PDF to Word</Link>
                <Link to="/resume-builder" className="text-primary hover:underline">Resume Builder</Link>
                <Link to="/blog-writer" className="text-primary hover:underline">Blog Writer</Link>
                <Link to="/image-generator" className="text-primary hover:underline">Image Generator</Link>
                <Link to="/code-generator" className="text-primary hover:underline">Code Generator</Link>
                <Link to="/qr-code" className="text-primary hover:underline">QR Code</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Index;
