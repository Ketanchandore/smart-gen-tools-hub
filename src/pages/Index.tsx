
import React, { useState, useContext } from 'react';
import { 
  Briefcase, FileText, FileUp, CreditCard, Calendar, User, 
  Image, BarChart2, Search, Binary, Mail, Mic, FileVideo, 
  Instagram, Twitter, MessageSquare, Book, Zap, Lightbulb,
  Code, Globe, Youtube, Workflow, FileCheck, BarChart, 
  PenTool, Layout, CheckCircle, Database, Headphones, 
  Filter, BrainCircuit, ArrowUpRight, Palette, AtSign,
  BadgeDollarSign, CircleUser, QrCode, Network, Layers,
  Chrome, BookOpen, Send, Scissors, Minimize, FileSpreadsheet,
  Presentation, Signature, Droplets, RotateCcw, Unlock, Shield,
  Hash, ScanLine, FileSearch, Eye, Crop, Trash2, FileOutput
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import AdvancedSEO from '@/components/AdvancedSEO';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();

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
    },
    
    // Comprehensive PDF Tools
    { 
      id: 'merge-pdf', 
      title: 'Merge PDF', 
      description: 'Combine multiple PDF files into a single document', 
      icon: <FileText />, 
      route: '/merge-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'split-pdf', 
      title: 'Split PDF', 
      description: 'Separate pages or extract specific pages from a PDF file', 
      icon: <Scissors />, 
      route: '/split-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'compress-pdf', 
      title: 'Compress PDF', 
      description: 'Reduce the file size of a PDF document while maintaining quality', 
      icon: <Minimize />, 
      route: '/compress-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'pdf-to-powerpoint', 
      title: 'PDF to PowerPoint', 
      description: 'Convert PDF files into editable PowerPoint presentations', 
      icon: <Presentation />, 
      route: '/pdf-to-powerpoint',
      category: 'document',
      isNew: true
    },
    { 
      id: 'pdf-to-excel', 
      title: 'PDF to Excel', 
      description: 'Convert PDF files into editable Excel spreadsheets', 
      icon: <FileSpreadsheet />, 
      route: '/pdf-to-excel',
      category: 'document',
      isNew: true
    },
    { 
      id: 'powerpoint-to-pdf', 
      title: 'PowerPoint to PDF', 
      description: 'Convert PowerPoint presentations into PDF files', 
      icon: <Presentation />, 
      route: '/powerpoint-to-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'excel-to-pdf', 
      title: 'Excel to PDF', 
      description: 'Convert Excel spreadsheets into PDF files', 
      icon: <FileSpreadsheet />, 
      route: '/excel-to-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'edit-pdf', 
      title: 'Edit PDF', 
      description: 'Add text, images, shapes, or make annotations to a PDF document', 
      icon: <PenTool />, 
      route: '/edit-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'pdf-to-jpg', 
      title: 'PDF to JPG', 
      description: 'Convert each page of a PDF file into JPG images', 
      icon: <Image />, 
      route: '/pdf-to-jpg',
      category: 'document',
      isNew: true
    },
    { 
      id: 'jpg-to-pdf', 
      title: 'JPG to PDF', 
      description: 'Convert JPG images into a PDF file with orientation options', 
      icon: <Image />, 
      route: '/jpg-to-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'sign-pdf', 
      title: 'Sign PDF', 
      description: 'Allow users to sign PDF documents electronically', 
      icon: <Signature />, 
      route: '/sign-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'watermark-pdf', 
      title: 'Watermark PDF', 
      description: 'Add text or image watermark to PDF with transparency options', 
      icon: <Droplets />, 
      route: '/watermark-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'rotate-pdf', 
      title: 'Rotate PDF', 
      description: 'Rotate pages within a PDF document individually or entirely', 
      icon: <RotateCcw />, 
      route: '/rotate-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'html-to-pdf', 
      title: 'HTML to PDF', 
      description: 'Convert web pages (HTML) into PDF files', 
      icon: <Globe />, 
      route: '/html-to-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'unlock-pdf', 
      title: 'Unlock PDF', 
      description: 'Remove password protection and restrictions from PDF files', 
      icon: <Unlock />, 
      route: '/unlock-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'protect-pdf', 
      title: 'Protect PDF', 
      description: 'Add password protection and set permissions for PDF files', 
      icon: <Shield />, 
      route: '/protect-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'organize-pdf', 
      title: 'Organize PDF', 
      description: 'Reorder, delete, or add pages within a PDF document', 
      icon: <Layout />, 
      route: '/organize-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'pdf-to-pdfa', 
      title: 'PDF to PDF/A', 
      description: 'Convert PDF files to the PDF/A archival format', 
      icon: <FileCheck />, 
      route: '/pdf-to-pdfa',
      category: 'document',
      isNew: true
    },
    { 
      id: 'repair-pdf', 
      title: 'Repair PDF', 
      description: 'Attempt to repair and recover data from corrupted PDF files', 
      icon: <FileCheck />, 
      route: '/repair-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'page-numbers-pdf', 
      title: 'Add Page Numbers', 
      description: 'Add page numbers to PDF with positioning and formatting options', 
      icon: <Hash />, 
      route: '/page-numbers-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'scan-to-pdf', 
      title: 'Scan to PDF', 
      description: 'Scan documents and save them directly as PDF files', 
      icon: <ScanLine />, 
      route: '/scan-to-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'ocr-pdf', 
      title: 'OCR PDF', 
      description: 'Perform OCR on scanned PDFs to make text searchable and editable', 
      icon: <FileSearch />, 
      route: '/ocr-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'compare-pdf', 
      title: 'Compare PDF', 
      description: 'Highlight the differences between two PDF files', 
      icon: <Eye />, 
      route: '/compare-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'redact-pdf', 
      title: 'Redact PDF', 
      description: 'Permanently remove sensitive text and graphics from PDF', 
      icon: <Eye />, 
      route: '/redact-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'crop-pdf', 
      title: 'Crop PDF', 
      description: 'Crop the margins or specific areas of pages in a PDF document', 
      icon: <Crop />, 
      route: '/crop-pdf',
      category: 'document',
      isNew: true
    },
    { 
      id: 'remove-pages', 
      title: 'Remove Pages', 
      description: 'Delete unwanted pages from your PDF documents instantly', 
      icon: <Trash2 />, 
      route: '/remove-pages',
      category: 'document',
      isNew: true
    },
    { 
      id: 'extract-pages', 
      title: 'Extract Pages', 
      description: 'Pull specific pages from PDF and save as new document', 
      icon: <FileOutput />, 
      route: '/extract-pages',
      category: 'document',
      isNew: true
    },
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
    <>
      <SEOHead
        title="PineToolsHub - Best Free Online Tools & PDF Converters (PineTools Alternative)"
        description="Looking for useful online utilities? PineToolsHub offers free PDF tools, image editors, and code formatters. A faster, modern alternative to Pinetools."
        keywords="free online tools, pdf converter, pinetools alternative, utilities, online utilities, pdf tools, ai tools, resume builder"
        url="https://pinetoolshub.com"
      />
      
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "PineToolsHub",
          "url": "https://pinetoolshub.com/",
          "description": "A collection of free online tools, similar to Pinetools but with a modern UI.",
          "creator": {
            "@type": "Organization",
            "name": "PineToolsHub"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://pinetoolshub.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })
      }} />
      
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
              PineToolsHub - Best Free Online Tools
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
              Your Complete Suite of Free AI-Powered Tools & Utilities
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Access 100+ professional tools including AI resume builders, PDF converters, content generators, 
              and productivity utilities. All completely free with no registration required. The best Pinetools alternative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/pdf-tools">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore PDF Tools
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Success Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Why Use PineToolsHub Section */}
        <div className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Why Use PineToolsHub?</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            If you are looking for reliable utilities similar to PineTools, our platform provides faster processing for PDF merging, 
            color picking, and string manipulation. We've built PineToolsHub to deliver the same functionality with a modern, 
            user-friendly interface, no ads, and lightning-fast performance.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-background/80 rounded-xl border border-border/50 shadow-sm">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-lg mb-2">Modern & Intuitive Interface</h3>
              <p className="text-muted-foreground">Cleaner design than traditional tool collections. Works perfectly on all devices.</p>
            </div>
            <div className="p-6 bg-background/80 rounded-xl border border-border/50 shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Lightning-Fast Processing</h3>
              <p className="text-muted-foreground">Optimized for speed across all tools. No waiting, no loading screens.</p>
            </div>
            <div className="p-6 bg-background/80 rounded-xl border border-border/50 shadow-sm">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-lg mb-2">Ad-Free & Privacy-Focused</h3>
              <p className="text-muted-foreground">No tracking, no distractions, just tools. Your data is never stored.</p>
            </div>
          </div>
        </div>

        <div className="mb-6 max-w-2xl mx-auto">
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
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList className="flex w-auto min-w-fit justify-center">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
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
        
        {/* SEO Content & Internal Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">100% Free Professional Tools</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            All tools completely free forever. No subscriptions, no hidden costs, unlimited usage for personal and commercial projects.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/resume-builder" className="text-primary hover:underline">Resume Builder</Link> • 
            <Link to="/blog-writer" className="text-primary hover:underline">AI Blog Writer</Link> • 
            <Link to="/word-to-pdf" className="text-primary hover:underline">PDF Converter</Link> • 
            <Link to="/pricing" className="text-primary hover:underline">Why Free?</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Index;
