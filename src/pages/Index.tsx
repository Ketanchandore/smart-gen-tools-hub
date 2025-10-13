
import React, { useState } from 'react';
import { 
  FileText, Scissors, Minimize, FileSpreadsheet, Presentation, 
  Image, PenTool, Signature, Droplets, RotateCcw, Globe, Unlock, 
  Shield, Layout, FileCheck, Hash, ScanLine, FileSearch, Eye, Crop,
  Search, BookOpen, Zap
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // PDF-focused categories like iLovePDF
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'organize', label: 'Organize PDF' },
    { id: 'optimize', label: 'Optimize PDF' },
    { id: 'convert-to', label: 'Convert to PDF' },
    { id: 'convert-from', label: 'Convert from PDF' },
    { id: 'edit', label: 'Edit PDF' },
    { id: 'security', label: 'PDF Security' },
  ];
  
  // PDF Tools - Organized like iLovePDF
  const allTools = [
    // Organize PDF
    { 
      id: 'merge-pdf', 
      title: 'Merge PDF', 
      description: 'Combine PDFs in the order you want with the easiest PDF merger available.', 
      icon: <FileText />, 
      route: '/merge-pdf',
      category: 'organize',
      isNew: false
    },
    { 
      id: 'split-pdf', 
      title: 'Split PDF', 
      description: 'Separate one page or a whole set for easy conversion into independent PDF files.', 
      icon: <Scissors />, 
      route: '/split-pdf',
      category: 'organize',
      isNew: false
    },
    { 
      id: 'organize-pdf', 
      title: 'Organize PDF', 
      description: 'Sort pages of your PDF file however you like. Delete pages or add PDF pages to your convenience.', 
      icon: <Layout />, 
      route: '/organize-pdf',
      category: 'organize',
      isNew: false
    },
    { 
      id: 'scan-to-pdf', 
      title: 'Scan to PDF', 
      description: 'Capture document scans from your mobile device and send them instantly to your browser.', 
      icon: <ScanLine />, 
      route: '/scan-to-pdf',
      category: 'organize',
      isNew: false
    },
    
    // Optimize PDF
    { 
      id: 'compress-pdf', 
      title: 'Compress PDF', 
      description: 'Reduce file size while optimizing for maximal PDF quality.', 
      icon: <Minimize />, 
      route: '/compress-pdf',
      category: 'optimize',
      isNew: false
    },
    { 
      id: 'repair-pdf', 
      title: 'Repair PDF', 
      description: 'Repair a damaged PDF and recover data from corrupted PDF. Fix PDF files with our Repair tool.', 
      icon: <FileCheck />, 
      route: '/repair-pdf',
      category: 'optimize',
      isNew: false
    },
    { 
      id: 'ocr-pdf', 
      title: 'OCR PDF', 
      description: 'Easily convert scanned PDF into searchable and selectable documents.', 
      icon: <FileSearch />, 
      route: '/ocr-pdf',
      category: 'optimize',
      isNew: false
    },
    
    // Convert to PDF
    { 
      id: 'jpg-to-pdf', 
      title: 'JPG to PDF', 
      description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', 
      icon: <Image />, 
      route: '/jpg-to-pdf',
      category: 'convert-to',
      isNew: false
    },
    { 
      id: 'word-to-pdf', 
      title: 'Word to PDF', 
      description: 'Make DOC and DOCX files easy to read by converting them to PDF.', 
      icon: <FileText />, 
      route: '/word-to-pdf',
      category: 'convert-to',
      isNew: false
    },
    { 
      id: 'powerpoint-to-pdf', 
      title: 'PowerPoint to PDF', 
      description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', 
      icon: <Presentation />, 
      route: '/powerpoint-to-pdf',
      category: 'convert-to',
      isNew: false
    },
    { 
      id: 'excel-to-pdf', 
      title: 'Excel to PDF', 
      description: 'Make Excel spreadsheets easy to read by converting them to PDF.', 
      icon: <FileSpreadsheet />, 
      route: '/excel-to-pdf',
      category: 'convert-to',
      isNew: false
    },
    { 
      id: 'html-to-pdf', 
      title: 'HTML to PDF', 
      description: 'Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.', 
      icon: <Globe />, 
      route: '/html-to-pdf',
      category: 'convert-to',
      isNew: false
    },
    
    // Convert from PDF
    { 
      id: 'pdf-to-jpg', 
      title: 'PDF to JPG', 
      description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.', 
      icon: <Image />, 
      route: '/pdf-to-jpg',
      category: 'convert-from',
      isNew: false
    },
    { 
      id: 'pdf-to-word', 
      title: 'PDF to Word', 
      description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.', 
      icon: <FileText />, 
      route: '/pdf-to-word',
      category: 'convert-from',
      isNew: false
    },
    { 
      id: 'pdf-to-powerpoint', 
      title: 'PDF to PowerPoint', 
      description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', 
      icon: <Presentation />, 
      route: '/pdf-to-powerpoint',
      category: 'convert-from',
      isNew: false
    },
    { 
      id: 'pdf-to-excel', 
      title: 'PDF to Excel', 
      description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', 
      icon: <FileSpreadsheet />, 
      route: '/pdf-to-excel',
      category: 'convert-from',
      isNew: false
    },
    { 
      id: 'pdf-to-pdfa', 
      title: 'PDF to PDF/A', 
      description: 'Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving. Your file will preserve formatting when accessed in the future.', 
      icon: <FileCheck />, 
      route: '/pdf-to-pdfa',
      category: 'convert-from',
      isNew: false
    },
    
    // Edit PDF
    { 
      id: 'edit-pdf', 
      title: 'Edit PDF', 
      description: 'Add text, images, shapes or freehand annotations to a PDF document. Edit the size, font, and color of the added content.', 
      icon: <PenTool />, 
      route: '/edit-pdf',
      category: 'edit',
      isNew: false
    },
    { 
      id: 'rotate-pdf', 
      title: 'Rotate PDF', 
      description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!', 
      icon: <RotateCcw />, 
      route: '/rotate-pdf',
      category: 'edit',
      isNew: false
    },
    { 
      id: 'page-numbers-pdf', 
      title: 'Add Page Numbers', 
      description: 'Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.', 
      icon: <Hash />, 
      route: '/page-numbers-pdf',
      category: 'edit',
      isNew: false
    },
    { 
      id: 'watermark-pdf', 
      title: 'Add Watermark', 
      description: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.', 
      icon: <Droplets />, 
      route: '/watermark-pdf',
      category: 'edit',
      isNew: false
    },
    { 
      id: 'crop-pdf', 
      title: 'Crop PDF', 
      description: 'Crop margins or select specific areas, then apply the changes to one page or the whole document.', 
      icon: <Crop />, 
      route: '/crop-pdf',
      category: 'edit',
      isNew: false
    },
    
    // PDF Security
    { 
      id: 'sign-pdf', 
      title: 'Sign PDF', 
      description: 'Sign yourself or request electronic signatures from others.', 
      icon: <Signature />, 
      route: '/sign-pdf',
      category: 'security',
      isNew: false
    },
    { 
      id: 'unlock-pdf', 
      title: 'Unlock PDF', 
      description: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.', 
      icon: <Unlock />, 
      route: '/unlock-pdf',
      category: 'security',
      isNew: false
    },
    { 
      id: 'protect-pdf', 
      title: 'Protect PDF', 
      description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.', 
      icon: <Shield />, 
      route: '/protect-pdf',
      category: 'security',
      isNew: false
    },
    { 
      id: 'redact-pdf', 
      title: 'Redact PDF', 
      description: 'Redact text and graphics to permanently remove sensitive information from PDF.', 
      icon: <Eye />, 
      route: '/redact-pdf',
      category: 'security',
      isNew: false
    },
    { 
      id: 'compare-pdf', 
      title: 'Compare PDF', 
      description: 'Show a side-by-side document comparison and easily spot changes between different file versions.', 
      icon: <Eye />, 
      route: '/compare-pdf',
      category: 'security',
      isNew: false
    },
  ];

  // Filter tools based on search query and selected category
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="iLovePDF | Free PDF Tools - Merge, Split, Compress & Convert"
        description="Every tool you need to work with PDFs in one place. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
        keywords="pdf tools, merge pdf, split pdf, compress pdf, pdf converter, pdf to word, word to pdf, pdf editor"
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
              placeholder="Search PDF tools..."
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
                  className="min-w-[120px] whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredTools.filter(tool => 
                  category.id === 'all' || tool.category === category.id
                ).map(tool => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    route={tool.route}
                    isNew={tool.isNew}
                  />
                ))}
              </div>
              
              {filteredTools.filter(tool => 
                category.id === 'all' || tool.category === category.id
              ).length === 0 && (
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
            <h2 className="text-2xl font-bold mb-4">The easiest way to edit and sign PDF documents</h2>
            <p className="text-muted-foreground mb-4">
              Pine Tools Hub provides a complete suite of PDF tools for all your document needs. Whether you need to merge, split, compress, or convert PDFs, our free online tools make it simple and fast.
            </p>
            <p className="text-muted-foreground mb-4">
              All our PDF tools are 100% free to use with no registration required. Process your files securely in your browser with professional-quality results.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Popular PDF Tools:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link to="/merge-pdf" className="text-primary hover:underline">Merge PDF</Link>
                <Link to="/split-pdf" className="text-primary hover:underline">Split PDF</Link>
                <Link to="/compress-pdf" className="text-primary hover:underline">Compress PDF</Link>
                <Link to="/pdf-to-word" className="text-primary hover:underline">PDF to Word</Link>
                <Link to="/word-to-pdf" className="text-primary hover:underline">Word to PDF</Link>
                <Link to="/pdf-to-jpg" className="text-primary hover:underline">PDF to JPG</Link>
                <Link to="/jpg-to-pdf" className="text-primary hover:underline">JPG to PDF</Link>
                <Link to="/sign-pdf" className="text-primary hover:underline">Sign PDF</Link>
                <Link to="/protect-pdf" className="text-primary hover:underline">Protect PDF</Link>
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
