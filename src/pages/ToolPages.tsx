
import React from 'react';
import {
  Briefcase, FileText, User, CheckCircle, MessageSquare, BarChart,
  FileCheck, Twitter, Search, Lightbulb, PenTool, Mail, Image,
  Layout, Send, ArrowUpRight, Globe, Youtube, Headphones, Mic,
  Filter, AtSign, Code, BarChart2, Chrome, BookOpen, Network,
  Layers, BadgeDollarSign, QrCode, CreditCard, Calendar, Binary
} from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

// Job Matcher
export const JobMatcher = () => (
  <PlaceholderTool
    title="Job Matcher by Resume"
    description="Find job matches based on your resume"
    icon={<CheckCircle className="h-8 w-8 text-primary" />}
  />
);

// Interview Coach
export const InterviewCoach = () => (
  <PlaceholderTool
    title="Interview Coach"
    description="Prepare for interviews with AI-powered mock interviews"
    icon={<MessageSquare className="h-8 w-8 text-primary" />}
  />
);

// Resume Score Analyzer
export const ResumeScore = () => (
  <PlaceholderTool
    title="Resume Score Analyzer"
    description="Get feedback on how your resume matches job descriptions"
    icon={<BarChart className="h-8 w-8 text-primary" />}
  />
);

// Blog Writer
export const BlogWriter = () => (
  <PlaceholderTool
    title="AI Blog Writer"
    description="Generate complete blog posts on any topic"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// Blog Rewriter
export const BlogRewriter = () => (
  <PlaceholderTool
    title="Blog Rewriter + SEO Optimizer"
    description="Rewrite content to improve SEO ranking"
    icon={<FileCheck className="h-8 w-8 text-primary" />}
  />
);

// Twitter Thread Generator
export const TwitterThread = () => (
  <PlaceholderTool
    title="AI Twitter Thread Generator"
    description="Create engaging Twitter threads on any topic"
    icon={<Twitter className="h-8 w-8 text-primary" />}
  />
);

// Content Detector
export const ContentDetector = () => (
  <PlaceholderTool
    title="Content Detector (AI/Plagiarism)"
    description="Check if content is AI-generated or plagiarized"
    icon={<Search className="h-8 w-8 text-primary" />}
  />
);

// Blog Topics Generator
export const BlogTopics = () => (
  <PlaceholderTool
    title="Blog Topic Generator"
    description="Generate engaging blog topic ideas"
    icon={<Lightbulb className="h-8 w-8 text-primary" />}
  />
);

// Smart UI/UX Copy Generator
export const SmartCopy = () => (
  <PlaceholderTool
    title="Smart UI/UX Copy Generator"
    description="Create effective copy for UI elements and user flows"
    icon={<PenTool className="h-8 w-8 text-primary" />}
  />
);

// Email Writer
export const EmailWriter = () => (
  <PlaceholderTool
    title="Smart Email Writer"
    description="Draft professional emails based on your goals"
    icon={<Mail className="h-8 w-8 text-primary" />}
  />
);

// Product Description Generator
export const ProductDescription = () => (
  <PlaceholderTool
    title="Product Description Generator"
    description="Create compelling product descriptions for e-commerce"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// Social Captions
export const SocialCaptions = () => (
  <PlaceholderTool
    title="Social Media Caption Generator"
    description="Create engaging captions for social media posts"
    icon={<MessageSquare className="h-8 w-8 text-primary" />}
  />
);

// Script Presentation
export const ScriptPresentation = () => (
  <PlaceholderTool
    title="Script + Presentation Generator"
    description="Create presentation scripts and slides simultaneously"
    icon={<Layout className="h-8 w-8 text-primary" />}
  />
);

// Email Sequence
export const EmailSequence = () => (
  <PlaceholderTool
    title="Email Marketing Sequence"
    description="Generate complete email marketing campaigns"
    icon={<Send className="h-8 w-8 text-primary" />}
  />
);

// Article Social
export const ArticleSocial = () => (
  <PlaceholderTool
    title="Article-to-Social Package"
    description="Convert articles to social media content"
    icon={<ArrowUpRight className="h-8 w-8 text-primary" />}
  />
);

// Name Generator
export const NameGenerator = () => (
  <PlaceholderTool
    title="AI Name Generator"
    description="Generate names for brands, products, and businesses"
    icon={<Lightbulb className="h-8 w-8 text-primary" />}
  />
);

// Tagline Generator
export const TaglineGenerator = () => (
  <PlaceholderTool
    title="Tagline + Slogan Generator"
    description="Create memorable taglines and slogans"
    icon={<MessageSquare className="h-8 w-8 text-primary" />}
  />
);

// Testimonial Generator
export const TestimonialGenerator = () => (
  <PlaceholderTool
    title="Testimonial Generator"
    description="Create realistic customer testimonials"
    icon={<User className="h-8 w-8 text-primary" />}
  />
);

// Video Summarizer
export const VideoSummarizer = () => (
  <PlaceholderTool
    title="Video/Podcast Summarizer"
    description="Get concise summaries of video content"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// YouTube Summarizer
export const YoutubeSummarizer = () => (
  <PlaceholderTool
    title="YouTube Video Summarizer"
    description="Summarize any YouTube video content"
    icon={<Youtube className="h-8 w-8 text-primary" />}
  />
);

// Blog to Carousel
export const BlogToCarousel = () => (
  <PlaceholderTool
    title="Blog to Instagram Carousel"
    description="Convert blog posts to Instagram carousels"
    icon={<Image className="h-8 w-8 text-primary" />}
  />
);

// Blog to Infographic
export const BlogToInfographic = () => (
  <PlaceholderTool
    title="Blog to Infographic"
    description="Transform blog content into infographics"
    icon={<Image className="h-8 w-8 text-primary" />}
  />
);

// YouTube Shorts Generator
export const YoutubeShorts = () => (
  <PlaceholderTool
    title="YouTube Shorts Generator"
    description="Create engaging YouTube Shorts content"
    icon={<Youtube className="h-8 w-8 text-primary" />}
  />
);

// Voice Cloner
export const VoiceCloner = () => (
  <PlaceholderTool
    title="Voice Cloner"
    description="Clone voices for personalized audio"
    icon={<Mic className="h-8 w-8 text-primary" />}
  />
);

// Audio Enhancer
export const AudioEnhancer = () => (
  <PlaceholderTool
    title="Audio Enhancer"
    description="Remove background noise and enhance voice quality"
    icon={<Filter className="h-8 w-8 text-primary" />}
  />
);

// Chat with YouTube
export const ChatYoutube = () => (
  <PlaceholderTool
    title="Chat with YouTube Video"
    description="Ask questions about any YouTube video"
    icon={<Youtube className="h-8 w-8 text-primary" />}
  />
);

// YouTube Channel Description Generator
export const YoutubeDescription = () => (
  <PlaceholderTool
    title="YouTube Channel Description Generator"
    description="Create engaging YouTube channel descriptions"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// Pinterest Pin Creator
export const PinterestCreator = () => (
  <PlaceholderTool
    title="Pinterest Pin Creator"
    description="Create eye-catching Pinterest pins"
    icon={<Image className="h-8 w-8 text-primary" />}
  />
);

// TikTok Script Writer
export const TiktokScript = () => (
  <PlaceholderTool
    title="TikTok Script Writer"
    description="Write engaging TikTok scripts"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// Image to Text
export const ImageToText = () => (
  <PlaceholderTool
    title="Image to Text Converter (OCR)"
    description="Extract text from images using OCR"
    icon={<Image className="h-8 w-8 text-primary" />}
  />
);

// Document Q&A
export const DocumentQA = () => (
  <PlaceholderTool
    title="Document Q&A"
    description="Chat with your PDFs and documents"
    icon={<MessageSquare className="h-8 w-8 text-primary" />}
  />
);

// Word Counter
export const WordCounter = () => (
  <PlaceholderTool
    title="Word Counter + Keyword Extractor"
    description="Count words and extract key phrases"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// Code Generator
export const CodeGenerator = () => (
  <PlaceholderTool
    title="Code Generator"
    description="Generate code in Python, JS, HTML, etc."
    icon={<Code className="h-8 w-8 text-primary" />}
  />
);

// Code Explainer
export const CodeExplainer = () => (
  <PlaceholderTool
    title="Code Explainer"
    description="Get detailed explanations for any code"
    icon={<MessageSquare className="h-8 w-8 text-primary" />}
  />
);

// Website Analyzer
export const WebsiteAnalyzer = () => (
  <PlaceholderTool
    title="Website Analyzer"
    description="Analyze websites for SEO and UX scores"
    icon={<Globe className="h-8 w-8 text-primary" />}
  />
);

// Chrome Extension Idea Generator
export const ChromeExtension = () => (
  <PlaceholderTool
    title="Chrome Extension Idea Generator"
    description="Generate unique Chrome extension ideas"
    icon={<Chrome className="h-8 w-8 text-primary" />}
  />
);

// SaaS Name & Domain Checker
export const SaasName = () => (
  <PlaceholderTool
    title="SaaS Name & Domain Checker"
    description="Find available SaaS names and domains"
    icon={<Globe className="h-8 w-8 text-primary" />}
  />
);

// Study Notes Maker
export const StudyNotes = () => (
  <PlaceholderTool
    title="Smart Study Notes Maker"
    description="Create concise study notes from content"
    icon={<BookOpen className="h-8 w-8 text-primary" />}
  />
);

// Slide Generator
export const SlideGenerator = () => (
  <PlaceholderTool
    title="Slide Generator from Text"
    description="Convert text content into presentation slides"
    icon={<Layout className="h-8 w-8 text-primary" />}
  />
);

// Chat with Website
export const ChatWebsite = () => (
  <PlaceholderTool
    title="Chat with Website"
    description="Ask questions about any website content"
    icon={<Globe className="h-8 w-8 text-primary" />}
  />
);

// Mind Map Generator
export const MindMap = () => (
  <PlaceholderTool
    title="Mind Map Generator"
    description="Create visual mind maps from content"
    icon={<Network className="h-8 w-8 text-primary" />}
  />
);

// Flashcard Generator
export const FlashcardGenerator = () => (
  <PlaceholderTool
    title="AI Flashcard Generator"
    description="Generate study flashcards from content"
    icon={<Layers className="h-8 w-8 text-primary" />}
  />
);

// AI Translator
export const AiTranslator = () => (
  <PlaceholderTool
    title="AI-powered Translator"
    description="Translate between multiple languages"
    icon={<Globe className="h-8 w-8 text-primary" />}
  />
);

// Business Plan Generator
export const BusinessPlan = () => (
  <PlaceholderTool
    title="AI Business Plan Generator"
    description="Create comprehensive business plans"
    icon={<FileText className="h-8 w-8 text-primary" />}
  />
);

// Lead Magnet Creator
export const LeadMagnet = () => (
  <PlaceholderTool
    title="Lead Magnet Creator"
    description="Create lead magnets to attract customers"
    icon={<BadgeDollarSign className="h-8 w-8 text-primary" />}
  />
);

// AI Survey Creator
export const SurveyCreator = () => (
  <PlaceholderTool
    title="AI Survey Creator"
    description="Generate effective survey questions"
    icon={<CheckCircle className="h-8 w-8 text-primary" />}
  />
);

// Image Generator
export const ImageGenerator = () => (
  <PlaceholderTool
    title="AI Image Generator"
    description="Create images from text prompts"
    icon={<Image className="h-8 w-8 text-primary" />}
  />
);

// Avatar Generator
export const AvatarGenerator = () => (
  <PlaceholderTool
    title="AI Avatar/Character Generator"
    description="Generate personalized avatar images"
    icon={<User className="h-8 w-8 text-primary" />}
  />
);

// Chat with Image
export const ChatImage = () => (
  <PlaceholderTool
    title="Chat with Image"
    description="Upload an image and ask it questions"
    icon={<MessageSquare className="h-8 w-8 text-primary" />}
  />
);

// BrandKit Organizer
export const BrandkitOrganizer = () => (
  <PlaceholderTool
    title="BrandKit Organizer"
    description="Organize your brand assets and guidelines"
    icon={<Layout className="h-8 w-8 text-primary" />}
  />
);

// Image Enhancer
export const ImageEnhancer = () => (
  <PlaceholderTool
    title="Image Enhancer / Background Remover"
    description="Enhance images and remove backgrounds"
    icon={<Image className="h-8 w-8 text-primary" />}
  />
);
