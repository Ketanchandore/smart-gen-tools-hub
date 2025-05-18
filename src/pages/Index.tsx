
import React, { useState } from 'react';
import { 
  Briefcase, FileText, FileUp, CreditCard, Calendar, User, 
  Image, BarChart2, Search, Binary, Mail, Mic, FileVideo, 
  Instagram, Twitter, MessageSquare, Book, Zap, Lightbulb,
  Code, Globe, Youtube, Workflow, FileCheck, BarChart, 
  PenTool, Layout, CheckCircle, Database, Headphones, 
  Filter, BrainCircuit, ArrowUpRight, Palette, AtSign,
  BadgeDollarSign, CircleUser, QrCode, Network, Layers,
  Chrome, BookOpen, Send
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Tool categories
  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'career', label: 'Career Tools' },
    { id: 'content', label: 'Content Creation' },
    { id: 'multimedia', label: 'Multimedia' },
    { id: 'document', label: 'Document Tools' },
    { id: 'coding', label: 'Development' },
    { id: 'learning', label: 'Learning Tools' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'design', label: 'Design Tools' },
    { id: 'utilities', label: 'Utilities' },
  ];
  
  // All tools with their categories
  const allTools = [
    // Career Tools
    { 
      id: 'resume-builder', 
      title: 'AI Resume Builder', 
      description: 'Create professional resumes in minutes', 
      icon: <Briefcase />, 
      route: '/resume-builder',
      category: 'career',
      isNew: true
    },
    { 
      id: 'cover-letter', 
      title: 'Cover Letter Generator', 
      description: 'Generate tailored cover letters', 
      icon: <FileText />, 
      route: '/cover-letter',
      category: 'career',
      isNew: true
    },
    { 
      id: 'linkedin-bio', 
      title: 'LinkedIn Profile Optimizer', 
      description: 'Optimize your LinkedIn profile', 
      icon: <User />, 
      route: '/linkedin-bio',
      category: 'career',
      isNew: true
    },
    { 
      id: 'job-matcher', 
      title: 'Job Matcher by Resume', 
      description: 'Find job matches based on your resume', 
      icon: <CheckCircle />, 
      route: '/job-matcher',
      category: 'career',
      isNew: true
    },
    { 
      id: 'interview-coach', 
      title: 'Interview Coach', 
      description: 'Prepare for interviews with AI feedback', 
      icon: <MessageSquare />, 
      route: '/interview-coach',
      category: 'career',
      isNew: true
    },
    { 
      id: 'resume-score', 
      title: 'Resume Score Analyzer', 
      description: 'Get professional analysis of your resume', 
      icon: <BarChart />, 
      route: '/resume-score',
      category: 'career',
      isNew: true
    },
    
    // Content Creation
    { 
      id: 'blog-writer', 
      title: 'AI Blog Writer', 
      description: 'Generate full blog posts on any topic', 
      icon: <FileText />, 
      route: '/blog-writer',
      category: 'content',
      isNew: true
    },
    { 
      id: 'blog-rewriter', 
      title: 'Blog Rewriter + SEO Optimizer', 
      description: 'Rewrite content for SEO optimization', 
      icon: <FileCheck />, 
      route: '/blog-rewriter',
      category: 'content',
      isNew: true
    },
    { 
      id: 'twitter-thread', 
      title: 'AI Twitter Thread Generator', 
      description: 'Create engaging Twitter threads', 
      icon: <Twitter />, 
      route: '/twitter-thread',
      category: 'content',
      isNew: true
    },
    { 
      id: 'content-detector', 
      title: 'Content Detector (AI/Plagiarism)', 
      description: 'Check content for AI or plagiarism', 
      icon: <FileCheck />, 
      route: '/content-detector',
      category: 'content',
      isNew: true
    },
    { 
      id: 'blog-topics', 
      title: 'Blog Topic Generator', 
      description: 'Generate engaging blog topics', 
      icon: <Lightbulb />, 
      route: '/blog-topics',
      category: 'content',
      isNew: true
    },
    { 
      id: 'smart-copy', 
      title: 'Smart UI/UX Copy Generator', 
      description: 'Create compelling UI/UX copy', 
      icon: <PenTool />, 
      route: '/smart-copy',
      category: 'content',
      isNew: true
    },
    { 
      id: 'email-writer', 
      title: 'Smart Email Writer', 
      description: 'Draft professional emails based on goals', 
      icon: <Mail />, 
      route: '/email-writer',
      category: 'content',
      isNew: true
    },
    { 
      id: 'product-description', 
      title: 'Product Description Generator', 
      description: 'Create compelling product descriptions', 
      icon: <FileText />, 
      route: '/product-description',
      category: 'content',
      isNew: true
    },
    { 
      id: 'social-captions', 
      title: 'Social Media Caption Generator', 
      description: 'Generate engaging social media captions', 
      icon: <MessageSquare />, 
      route: '/social-captions',
      category: 'content',
      isNew: true
    },
    { 
      id: 'script-presentation', 
      title: 'Script + Presentation Generator', 
      description: 'Create scripts and presentations together', 
      icon: <Layout />, 
      route: '/script-presentation',
      category: 'content',
      isNew: true
    },
    { 
      id: 'email-sequence', 
      title: 'Email Marketing Sequence', 
      description: 'Generate complete email marketing campaigns', 
      icon: <Send />, 
      route: '/email-sequence',
      category: 'content',
      isNew: true
    },
    { 
      id: 'article-social', 
      title: 'Article-to-Social Package', 
      description: 'Convert articles to social media content', 
      icon: <ArrowUpRight />, 
      route: '/article-social',
      category: 'content',
      isNew: true
    },
    { 
      id: 'name-generator', 
      title: 'AI Name Generator', 
      description: 'Generate names for brands and products', 
      icon: <Lightbulb />, 
      route: '/name-generator',
      category: 'content',
      isNew: true
    },
    { 
      id: 'tagline-generator', 
      title: 'Tagline + Slogan Generator', 
      description: 'Create memorable taglines and slogans', 
      icon: <MessageSquare />, 
      route: '/tagline-generator',
      category: 'content',
      isNew: true
    },
    { 
      id: 'testimonial', 
      title: 'Testimonial Generator', 
      description: 'Create realistic customer testimonials', 
      icon: <User />, 
      route: '/testimonial-generator',
      category: 'content',
      isNew: true
    },
    { 
      id: 'lorem-ipsum', 
      title: 'Lorem Ipsum', 
      description: 'Generate placeholder text for your designs', 
      icon: <FileText />, 
      route: '/lorem-ipsum',
      category: 'content',
      isNew: false
    },
    
    // Multimedia Tools
    { 
      id: 'video-summarizer', 
      title: 'Video/Podcast Summarizer', 
      description: 'Get concise summaries of video content', 
      icon: <FileVideo />, 
      route: '/video-summarizer',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'youtube-summarizer', 
      title: 'YouTube Video Summarizer', 
      description: 'Summarize any YouTube video content', 
      icon: <Youtube />, 
      route: '/youtube-summarizer',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'blog-to-carousel', 
      title: 'Blog to Instagram Carousel', 
      description: 'Convert blog posts to Instagram carousels', 
      icon: <Instagram />, 
      route: '/blog-to-carousel',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'blog-to-infographic', 
      title: 'Blog to Infographic', 
      description: 'Transform blog content into infographics', 
      icon: <Image />, 
      route: '/blog-to-infographic',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'youtube-shorts', 
      title: 'YouTube Shorts Generator', 
      description: 'Create engaging YouTube Shorts content', 
      icon: <Youtube />, 
      route: '/youtube-shorts',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'text-to-speech', 
      title: 'Text to Speech (AI Voices)', 
      description: 'Convert text to natural-sounding speech', 
      icon: <Headphones />, 
      route: '/text-to-speech',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'voice-cloner', 
      title: 'Voice Cloner', 
      description: 'Clone voices for personalized audio', 
      icon: <Mic />, 
      route: '/voice-cloner',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'audio-enhancer', 
      title: 'Audio Enhancer', 
      description: 'Remove background noise and enhance voice', 
      icon: <Filter />, 
      route: '/audio-enhancer',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'chat-youtube', 
      title: 'Chat with YouTube Video', 
      description: 'Ask questions about any YouTube video', 
      icon: <Youtube />, 
      route: '/chat-youtube',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'youtube-description', 
      title: 'YouTube Channel Description', 
      description: 'Generate optimized channel descriptions', 
      icon: <FileText />, 
      route: '/youtube-description',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'pinterest-creator', 
      title: 'Pinterest Pin Creator', 
      description: 'Create eye-catching Pinterest pins', 
      icon: <Image />, 
      route: '/pinterest-creator',
      category: 'multimedia',
      isNew: true
    },
    { 
      id: 'tiktok-script', 
      title: 'TikTok Script Writer', 
      description: 'Write engaging TikTok scripts', 
      icon: <FileText />, 
      route: '/tiktok-script',
      category: 'multimedia',
      isNew: true
    },
    
    // Document Tools
    { 
      id: 'image-to-text', 
      title: 'Image to Text Converter (OCR)', 
      description: 'Extract text from images using OCR', 
      icon: <Image />, 
      route: '/image-to-text',
      category: 'document',
      isNew: true
    },
    { 
      id: 'document-qa', 
      title: 'Document Q&A', 
      description: 'Chat with your PDFs and documents', 
      icon: <MessageSquare />, 
      route: '/document-qa',
      category: 'document',
      isNew: true
    },
    { 
      id: 'word-counter', 
      title: 'Word Counter + Keyword Extractor', 
      description: 'Count words and extract key phrases', 
      icon: <FileText />, 
      route: '/word-counter',
      category: 'document',
      isNew: true
    },
    { 
      id: 'pdf-to-word', 
      title: 'PDF to DOCX', 
      description: 'Convert PDF documents to editable Word files', 
      icon: <FileText />, 
      route: '/pdf-to-word',
      category: 'document',
      isNew: false
    },
    { 
      id: 'word-to-pdf', 
      title: 'Word to PDF', 
      description: 'Convert Word documents to PDF format', 
      icon: <FileUp />, 
      route: '/word-to-pdf',
      category: 'document',
      isNew: false
    },
    { 
      id: 'pdf-split-merge', 
      title: 'PDF Split & Merge', 
      description: 'Split or merge PDF files easily', 
      icon: <FileText />, 
      route: '/pdf-split-merge',
      category: 'document',
      isNew: false
    },
    
    // Coding & Development
    { 
      id: 'code-generator', 
      title: 'Code Generator', 
      description: 'Generate code in Python, JS, HTML, etc.', 
      icon: <Code />, 
      route: '/code-generator',
      category: 'coding',
      isNew: true
    },
    { 
      id: 'code-explainer', 
      title: 'Code Explainer', 
      description: 'Get detailed explanations for any code', 
      icon: <MessageSquare />, 
      route: '/code-explainer',
      category: 'coding',
      isNew: true
    },
    { 
      id: 'website-analyzer', 
      title: 'Website Analyzer', 
      description: 'Analyze websites for SEO and UX scores', 
      icon: <Globe />, 
      route: '/website-analyzer',
      category: 'coding',
      isNew: true
    },
    { 
      id: 'chrome-extension', 
      title: 'Chrome Extension Idea Generator', 
      description: 'Generate unique Chrome extension ideas', 
      icon: <Chrome />, 
      route: '/chrome-extension',
      category: 'coding',
      isNew: true
    },
    { 
      id: 'saas-name', 
      title: 'SaaS Name & Domain Checker', 
      description: 'Find available SaaS names and domains', 
      icon: <Globe />, 
      route: '/saas-name',
      category: 'coding',
      isNew: true
    },
    
    // Learning Tools
    { 
      id: 'study-notes', 
      title: 'Smart Study Notes Maker', 
      description: 'Create concise study notes from content', 
      icon: <BookOpen />, 
      route: '/study-notes',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'slide-generator', 
      title: 'Slide Generator from Text', 
      description: 'Convert text content into presentation slides', 
      icon: <Layout />, 
      route: '/slide-generator',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'chat-website', 
      title: 'Chat with Website', 
      description: 'Ask questions about any website content', 
      icon: <Globe />, 
      route: '/chat-website',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'mind-map', 
      title: 'Mind Map Generator', 
      description: 'Create visual mind maps from content', 
      icon: <Network />, 
      route: '/mind-map',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'flashcard-generator', 
      title: 'AI Flashcard Generator', 
      description: 'Generate study flashcards from content', 
      icon: <Layers />, 
      route: '/flashcard-generator',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'ai-translator', 
      title: 'AI-powered Translator', 
      description: 'Translate between multiple languages', 
      icon: <Globe />, 
      route: '/ai-translator',
      category: 'learning',
      isNew: true
    },
    
    // Marketing Tools
    { 
      id: 'business-plan', 
      title: 'AI Business Plan Generator', 
      description: 'Create comprehensive business plans', 
      icon: <FileText />, 
      route: '/business-plan',
      category: 'marketing',
      isNew: true
    },
    { 
      id: 'lead-magnet', 
      title: 'Lead Magnet Creator', 
      description: 'Create lead magnets to attract customers', 
      icon: <BadgeDollarSign />, 
      route: '/lead-magnet',
      category: 'marketing',
      isNew: true
    },
    { 
      id: 'survey-creator', 
      title: 'AI Survey Creator', 
      description: 'Generate effective survey questions', 
      icon: <CheckCircle />, 
      route: '/survey-creator',
      category: 'marketing',
      isNew: true
    },
    
    // Design Tools
    { 
      id: 'image-generator', 
      title: 'AI Image Generator', 
      description: 'Create images from text prompts', 
      icon: <Image />, 
      route: '/image-generator',
      category: 'design',
      isNew: true
    },
    { 
      id: 'avatar-generator', 
      title: 'AI Avatar/Character Generator', 
      description: 'Generate personalized avatar images', 
      icon: <CircleUser />, 
      route: '/avatar-generator',
      category: 'design',
      isNew: true
    },
    { 
      id: 'chat-image', 
      title: 'Chat with Image', 
      description: 'Upload an image and ask it questions', 
      icon: <MessageSquare />, 
      route: '/chat-image',
      category: 'design',
      isNew: true
    },
    { 
      id: 'brandkit-organizer', 
      title: 'BrandKit Organizer', 
      description: 'Organize your brand assets and guidelines', 
      icon: <Palette />, 
      route: '/brandkit-organizer',
      category: 'design',
      isNew: true
    },
    { 
      id: 'image-enhancer', 
      title: 'Image Enhancer / Background Remover', 
      description: 'Enhance images and remove backgrounds', 
      icon: <Image />, 
      route: '/image-enhancer',
      category: 'design',
      isNew: true
    },
    { 
      id: 'image-compressor', 
      title: 'Image Compressor', 
      description: 'Compress your images without quality loss', 
      icon: <Image />, 
      route: '/image-compressor',
      category: 'design',
      isNew: false
    },
    
    // Utilities
    { 
      id: 'qr-code', 
      title: 'QR Code Generator', 
      description: 'Create customizable QR codes', 
      icon: <QrCode />, 
      route: '/qr-code',
      category: 'utilities',
      isNew: true
    },
    { 
      id: 'text-case-converter', 
      title: 'Text Case Converter', 
      description: 'Convert text between different cases', 
      icon: <FileText />, 
      route: '/text-case-converter',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'barcode-generator', 
      title: 'Barcode Generator', 
      description: 'Generate barcodes for various products', 
      icon: <BarChart2 />, 
      route: '/barcode-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'credit-card-generator', 
      title: 'Credit Card Generator', 
      description: 'Generate test credit card numbers', 
      icon: <CreditCard />, 
      route: '/credit-card-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'date-generator', 
      title: 'Date Generator', 
      description: 'Generate random dates for testing', 
      icon: <Calendar />, 
      route: '/date-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'fake-identity', 
      title: 'Fake Identity', 
      description: 'Generate realistic fake identities', 
      icon: <User />, 
      route: '/fake-identity',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'ifsc-finder', 
      title: 'IFSC Finder', 
      description: 'Find IFSC codes for Indian banks', 
      icon: <Search />, 
      route: '/ifsc-finder',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'number-plate', 
      title: 'Number Plate', 
      description: 'Generate random vehicle number plates', 
      icon: <Binary />, 
      route: '/number-plate',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'password-generator', 
      title: 'Password Generator', 
      description: 'Generate secure passwords', 
      icon: <Binary />, 
      route: '/password-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'pin-locator', 
      title: 'PIN Locator', 
      description: 'Find PIN codes for locations in India', 
      icon: <Search />, 
      route: '/pin-locator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'temp-email', 
      title: 'Temp Email', 
      description: 'Generate temporary email addresses', 
      icon: <AtSign />, 
      route: '/temp-email',
      category: 'utilities',
      isNew: false
    }
  ];

  // Filter tools based on search query and selected category
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">AI Pro Toolkit</h1>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-10 w-full"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-6 flex w-auto min-w-fit">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className="min-w-[100px] whitespace-nowrap"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.filter(tool => 
                category.id === 'all' || tool.category === category.id
              ).map(tool => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  route={tool.route}
                  category={
                    tool.category === 'career' ? 'Career Tools' : 
                    tool.category === 'content' ? 'Content Creation' : 
                    tool.category === 'multimedia' ? 'Multimedia' :
                    tool.category === 'document' ? 'Document Tools' :
                    tool.category === 'coding' ? 'Development' :
                    tool.category === 'learning' ? 'Learning Tools' :
                    tool.category === 'marketing' ? 'Marketing' :
                    tool.category === 'design' ? 'Design Tools' : 'Utilities'
                  }
                  isNew={tool.isNew}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="fixed bottom-6 right-6 z-10">
        <Button className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Get AI Help</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
