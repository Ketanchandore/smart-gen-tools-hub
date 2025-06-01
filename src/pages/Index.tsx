import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shell } from '@/components/Shell';
import {
  FileText,
  Scissors,
  Minimize,
  PenTool,
  FileSpreadsheet,
  Presentation,
  FileImage,
  Signature,
  Droplets,
  RotateCcw,
  Globe,
  Unlock,
  Shield,
  Layout,
  FileCheck,
  Hash,
  ScanLine,
  FileSearch,
  Eye,
  Crop,
  Youtube as YoutubeIcon,
  MailPlus,
  Video,
} from 'lucide-react';

const Index = () => {
  const tools = [
    // AI Tools
    {
      title: "YouTube Video Summarizer",
      description: "Get AI-generated summaries of YouTube videos",
      icon: <YoutubeIcon className="h-8 w-8 text-primary" />,
      path: "/youtube-summarizer",
      category: "AI Tools"
    },
    {
      title: "YouTube Channel Description Generator",
      description: "Generate SEO-friendly descriptions for YouTube channels",
      icon: <YoutubeIcon className="h-8 w-8 text-primary" />,
      path: "/youtube-description",
      category: "AI Tools"
    },
    {
      title: "Email Marketing Sequence Generator",
      description: "Create effective email marketing sequences",
      icon: <MailPlus className="h-8 w-8 text-primary" />,
      path: "/email-sequence",
      category: "AI Tools"
    },
    {
      title: "Video/Podcast Summarizer",
      description: "Generate concise summaries of videos and podcasts",
      icon: <Video className="h-8 w-8 text-primary" />,
      path: "/video-summarizer",
      category: "AI Tools"
    },
    {
      title: "Word Counter + Keyword Extractor",
      description: "Count words and extract key phrases from your content",
      icon: <Hash className="h-8 w-8 text-primary" />,
      path: "/word-counter",
      category: "AI Tools"
    },
    // Image Tools
    {
      title: "Image to Text Converter",
      description: "Extract text from images using OCR technology",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/image-to-text",
      category: "Image Tools"
    },
    // Utility Tools
    {
      title: "Credit Card Generator",
      description: "Generate valid credit card numbers for testing purposes",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/credit-card-generator",
      category: "Utility Tools"
    },
    {
      title: "Date Generator",
      description: "Generate random dates and times",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/date-generator",
      category: "Utility Tools"
    },

    // PDF Tools
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/merge-pdf",
      category: "PDF Tools"
    },
    {
      title: "Split PDF",
      description: "Separate pages or extract specific pages from a PDF file",
      icon: <Scissors className="h-8 w-8 text-primary" />,
      path: "/split-pdf",
      category: "PDF Tools"
    },
    {
      title: "Compress PDF",
      description: "Reduce the file size of a PDF document while maintaining quality",
      icon: <Minimize className="h-8 w-8 text-primary" />,
      path: "/compress-pdf",
      category: "PDF Tools"
    },
    {
      title: "PDF to Word",
      description: "Convert PDF files into editable Word documents",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/pdf-to-word",
      category: "PDF Tools"
    },
    {
      title: "PDF to PowerPoint",
      description: "Convert PDF files into editable PowerPoint presentations",
      icon: <Presentation className="h-8 w-8 text-primary" />,
      path: "/pdf-to-powerpoint",
      category: "PDF Tools"
    },
    {
      title: "PDF to Excel",
      description: "Convert PDF files into editable Excel spreadsheets",
      icon: <FileSpreadsheet className="h-8 w-8 text-primary" />,
      path: "/pdf-to-excel",
      category: "PDF Tools"
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents into PDF files",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/word-to-pdf",
      category: "PDF Tools"
    },
    {
      title: "PowerPoint to PDF",
      description: "Convert PowerPoint presentations into PDF files",
      icon: <Presentation className="h-8 w-8 text-primary" />,
      path: "/powerpoint-to-pdf",
      category: "PDF Tools"
    },
    {
      title: "Excel to PDF",
      description: "Convert Excel spreadsheets into PDF files",
      icon: <FileSpreadsheet className="h-8 w-8 text-primary" />,
      path: "/excel-to-pdf",
      category: "PDF Tools"
    },
    {
      title: "Edit PDF",
      description: "Add text, images, shapes, or make annotations to a PDF document",
      icon: <PenTool className="h-8 w-8 text-primary" />,
      path: "/edit-pdf",
      category: "PDF Tools"
    },
    {
      title: "PDF to JPG",
      description: "Convert each page of a PDF file into JPG images",
      icon: <FileImage className="h-8 w-8 text-primary" />,
      path: "/pdf-to-jpg",
      category: "PDF Tools"
    },
    {
      title: "JPG to PDF",
      description: "Convert JPG images into a PDF file",
      icon: <FileImage className="h-8 w-8 text-primary" />,
      path: "/jpg-to-pdf",
      category: "PDF Tools"
    },
    {
      title: "Sign PDF",
      description: "Add electronic signatures to PDF documents",
      icon: <Signature className="h-8 w-8 text-primary" />,
      path: "/sign-pdf",
      category: "PDF Tools"
    },
    {
      title: "Watermark PDF",
      description: "Add text or image watermarks to PDF files",
      icon: <Droplets className="h-8 w-8 text-primary" />,
      path: "/watermark-pdf",
      category: "PDF Tools"
    },
    {
      title: "Rotate PDF",
      description: "Rotate pages within a PDF document",
      icon: <RotateCcw className="h-8 w-8 text-primary" />,
      path: "/rotate-pdf",
      category: "PDF Tools"
    },
    {
      title: "HTML to PDF",
      description: "Convert web pages (HTML) into PDF files",
      icon: <Globe className="h-8 w-8 text-primary" />,
      path: "/html-to-pdf",
      category: "PDF Tools"
    },
    {
      title: "Unlock PDF",
      description: "Remove password protection from PDF files",
      icon: <Unlock className="h-8 w-8 text-primary" />,
      path: "/unlock-pdf",
      category: "PDF Tools"
    },
    {
      title: "Protect PDF",
      description: "Add password protection to PDF files",
      icon: <Shield className="h-8 w-8 text-primary" />,
      path: "/protect-pdf",
      category: "PDF Tools"
    },
    {
      title: "Organize PDF",
      description: "Reorder, delete, or add pages within PDF documents",
      icon: <Layout className="h-8 w-8 text-primary" />,
      path: "/organize-pdf",
      category: "PDF Tools"
    },
    {
      title: "PDF to PDF/A",
      description: "Convert PDFs to archival PDF/A format",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/pdf-to-pdfa",
      category: "PDF Tools"
    },
    {
      title: "Repair PDF",
      description: "Repair corrupted or damaged PDF files",
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      path: "/repair-pdf",
      category: "PDF Tools"
    },
    {
      title: "Add Page Numbers",
      description: "Add page numbers to PDF documents",
      icon: <Hash className="h-8 w-8 text-primary" />,
      path: "/page-numbers-pdf",
      category: "PDF Tools"
    },
    {
      title: "Scan to PDF",
      description: "Scan documents and save them as PDF files",
      icon: <ScanLine className="h-8 w-8 text-primary" />,
      path: "/scan-to-pdf",
      category: "PDF Tools"
    },
    {
      title: "OCR PDF",
      description: "Make scanned PDFs searchable with OCR",
      icon: <FileSearch className="h-8 w-8 text-primary" />,
      path: "/ocr-pdf",
      category: "PDF Tools"
    },
    {
      title: "Compare PDF",
      description: "Highlight differences between two PDF files",
      icon: <Eye className="h-8 w-8 text-primary" />,
      path: "/compare-pdf",
      category: "PDF Tools"
    },
    {
      title: "Crop PDF",
      description: "Crop margins or specific areas of PDF pages",
      icon: <Crop className="h-8 w-8 text-primary" />,
      path: "/crop-pdf",
      category: "PDF Tools"
    }
  ];

  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <Shell>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid gap-6">
              {tools
                .filter(tool => tool.category === category)
                .map((tool, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {tool.icon}
                        {tool.title}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={tool.path} className="inline-block w-full">
                        <div className="bg-secondary/50 rounded-md p-2 text-center hover:bg-secondary transition-colors">
                          Use Tool
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
};

export default Index;
