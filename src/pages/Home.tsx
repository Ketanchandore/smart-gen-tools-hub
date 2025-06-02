
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  Minimize, 
  Upload, 
  Download,
  Hash,
  Droplets,
  Scissors,
  Shield,
  ShieldOff,
  RotateCw,
  FileSpreadsheet,
  Presentation,
  FileSearch,
  Eye,
  PenTool,
  Crop,
  Layout as LayoutIcon,
  FileCheck,
  Search,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Recently used tools from localStorage
  const recentTools = useMemo(() => {
    try {
      const recent = localStorage.getItem('recentTools');
      return recent ? JSON.parse(recent) : [];
    } catch {
      return [];
    }
  }, []);

  const allTools = [
    // Merge & Split Tools
    {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into a single document with advanced ordering options',
      icon: <FileText className="h-6 w-6" />,
      route: '/merge-pdf',
      category: 'merge',
      keywords: ['merge', 'combine', 'join', 'unite']
    },
    {
      title: 'Split PDF',
      description: 'Split PDF into separate files by page ranges, bookmarks, or custom criteria',
      icon: <Scissors className="h-6 w-6" />,
      route: '/split-pdf',
      category: 'split',
      keywords: ['split', 'separate', 'divide', 'extract']
    },
    {
      title: 'PDF Split & Merge',
      description: 'Advanced split and merge operations in one tool',
      icon: <LayoutIcon className="h-6 w-6" />,
      route: '/pdf-split-merge',
      category: 'merge',
      keywords: ['split', 'merge', 'advanced', 'combine']
    },
    {
      title: 'Organize PDF',
      description: 'Reorder, delete, duplicate, and rearrange pages with drag-and-drop interface',
      icon: <LayoutIcon className="h-6 w-6" />,
      route: '/organize-pdf',
      category: 'edit',
      keywords: ['organize', 'reorder', 'arrange', 'pages', 'sort']
    },

    // Convert Tools
    {
      title: 'JPG to PDF',
      description: 'Convert images (JPG, PNG, GIF) to PDF with custom layouts and quality settings',
      icon: <Image className="h-6 w-6" />,
      route: '/jpg-to-pdf',
      category: 'convert',
      keywords: ['image', 'jpg', 'png', 'convert', 'photo']
    },
    {
      title: 'PDF to JPG',
      description: 'Extract all pages from PDF as high-quality JPG images with batch processing',
      icon: <Image className="h-6 w-6" />,
      route: '/pdf-to-jpg',
      category: 'convert',
      keywords: ['extract', 'jpg', 'image', 'convert', 'pages']
    },
    {
      title: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF with formatting preservation and multiple sheets',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      route: '/excel-to-pdf',
      category: 'convert',
      keywords: ['excel', 'spreadsheet', 'xls', 'xlsx', 'convert']
    },
    {
      title: 'PDF to Excel',
      description: 'Extract tables and data from PDF into editable Excel format with smart detection',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      route: '/pdf-to-excel',
      category: 'convert',
      keywords: ['excel', 'extract', 'tables', 'data', 'convert']
    },

    // PowerPoint Tools
    {
      title: 'PowerPoint to PDF',
      description: 'Convert presentations to PDF while preserving animations and slide transitions',
      icon: <Presentation className="h-6 w-6" />,
      route: '/powerpoint-to-pdf',
      category: 'convert',
      keywords: ['powerpoint', 'presentation', 'ppt', 'slides']
    },
    {
      title: 'PDF to PowerPoint',
      description: 'Convert PDF pages to editable PowerPoint slides with layout recognition',
      icon: <Presentation className="h-6 w-6" />,
      route: '/pdf-to-powerpoint',
      category: 'convert',
      keywords: ['powerpoint', 'slides', 'presentation', 'convert']
    },
    {
      title: 'HTML to PDF',
      description: 'Convert HTML content to professional PDF documents with advanced formatting',
      icon: <FileText className="h-6 w-6" />,
      route: '/html-to-pdf',
      category: 'convert',
      keywords: ['html', 'web', 'convert', 'formatting'],
      isNew: true
    },
    {
      title: 'OCR PDF',
      description: 'Extract text from scanned PDFs with advanced OCR technology and multiple languages',
      icon: <FileSearch className="h-6 w-6" />,
      route: '/ocr-pdf',
      category: 'convert',
      keywords: ['ocr', 'scan', 'text', 'recognition', 'searchable']
    },

    // Edit Tools
    {
      title: 'Edit PDF',
      description: 'Add text, images, shapes, and annotations with professional editing tools',
      icon: <PenTool className="h-6 w-6" />,
      route: '/edit-pdf',
      category: 'edit',
      keywords: ['edit', 'text', 'images', 'annotations', 'modify']
    },
    {
      title: 'Watermark PDF',
      description: 'Add text or image watermarks with advanced positioning and transparency controls',
      icon: <Droplets className="h-6 w-6" />,
      route: '/watermark-pdf',
      category: 'edit',
      keywords: ['watermark', 'stamp', 'brand', 'protection'],
      isNew: true
    },
    {
      title: 'Add Page Numbers',
      description: 'Insert customizable page numbers with multiple formatting options and positions',
      icon: <Hash className="h-6 w-6" />,
      route: '/page-numbers-pdf',
      category: 'edit',
      keywords: ['numbers', 'pagination', 'format', 'footer']
    },
    {
      title: 'Crop PDF',
      description: 'Remove margins and crop specific areas with precision controls and batch processing',
      icon: <Crop className="h-6 w-6" />,
      route: '/crop-pdf',
      category: 'edit',
      keywords: ['crop', 'trim', 'margins', 'resize', 'cut']
    },

    // Security Tools
    {
      title: 'Protect PDF',
      description: 'Add password protection and set permissions for viewing, editing, and printing',
      icon: <Shield className="h-6 w-6" />,
      route: '/protect-pdf',
      category: 'security',
      keywords: ['password', 'security', 'encrypt', 'protect']
    },
    {
      title: 'Unlock PDF',
      description: 'Remove password protection from PDF files with proper authorization',
      icon: <ShieldOff className="h-6 w-6" />,
      route: '/unlock-pdf',
      category: 'security',
      keywords: ['unlock', 'remove', 'password', 'decrypt']
    },
    {
      title: 'Rotate PDF',
      description: 'Rotate PDF pages 90°, 180°, 270° with selective page rotation options',
      icon: <RotateCw className="h-6 w-6" />,
      route: '/rotate-pdf',
      category: 'edit',
      keywords: ['rotate', 'turn', 'orientation', 'flip']
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size with intelligent compression while maintaining quality',
      icon: <Minimize className="h-6 w-6" />,
      route: '/compress-pdf',
      category: 'optimize',
      keywords: ['compress', 'reduce', 'optimize', 'size']
    },

    // Analysis Tools
    {
      title: 'Compare PDF',
      description: 'Highlight differences between two PDF documents with detailed comparison reports',
      icon: <Eye className="h-6 w-6" />,
      route: '/compare-pdf',
      category: 'analyze',
      keywords: ['compare', 'diff', 'changes', 'differences', 'analyze']
    },
    {
      title: 'PDF to PDF/A',
      description: 'Convert to archival PDF/A format for long-term preservation and compliance',
      icon: <FileCheck className="h-6 w-6" />,
      route: '/pdf-to-pdfa',
      category: 'convert',
      keywords: ['archive', 'pdfa', 'preservation', 'compliance', 'standard']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', count: allTools.length },
    { id: 'convert', name: 'Convert', count: allTools.filter(t => t.category === 'convert').length },
    { id: 'edit', name: 'Edit', count: allTools.filter(t => t.category === 'edit').length },
    { id: 'merge', name: 'Merge & Split', count: allTools.filter(t => ['merge', 'split'].includes(t.category)).length },
    { id: 'security', name: 'Security', count: allTools.filter(t => t.category === 'security').length },
    { id: 'optimize', name: 'Optimize', count: allTools.filter(t => t.category === 'optimize').length },
    { id: 'analyze', name: 'Analyze', count: allTools.filter(t => t.category === 'analyze').length }
  ];

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = searchTerm === '' || 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
        tool.category === selectedCategory ||
        (selectedCategory === 'merge' && ['merge', 'split'].includes(tool.category));
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const recentToolsData = useMemo(() => {
    return recentTools.map((route: string) => 
      allTools.find(tool => tool.route === route)
    ).filter(Boolean).slice(0, 4);
  }, [recentTools]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Professional PDF Tools Suite
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Every PDF Tool You Need
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Professional-grade PDF processing with lightning-fast performance. 
              Merge, split, convert, compress, and edit PDFs with enterprise-level security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search PDF tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            {/* Features Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{allTools.length}+</div>
                <div className="text-sm text-muted-foreground">PDF Tools</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">2x</div>
                <div className="text-sm text-muted-foreground">Faster Processing</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">20MB</div>
                <div className="text-sm text-muted-foreground">Max File Size</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Tools */}
        {recentToolsData.length > 0 && (
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Recently Used
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentToolsData.map((tool: any, index: number) => (
                  <ToolCard key={index} {...tool} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="relative"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid - 4 columns exactly like iLovePDF */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {selectedCategory === 'all' ? 'All PDF Tools' : categories.find(c => c.id === selectedCategory)?.name + ' Tools'}
            </h2>
            
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                {filteredTools.map((tool, index) => (
                  <ToolCard key={index} {...tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileSearch className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our PDF Tools?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional-grade features that rival industry leaders like iLovePDF, 
                with enhanced performance and user experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Optimized processing engine delivers results 2x faster than competitors
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bank-Level Security</h3>
                <p className="text-muted-foreground">
                  End-to-end encryption ensures your documents remain completely private
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade tools with advanced options for professional workflows
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
