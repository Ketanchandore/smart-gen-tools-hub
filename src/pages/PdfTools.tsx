import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Scissors, Minimize, FileSpreadsheet, Presentation, 
  Image, Signature, Droplets, RotateCcw, Code, Unlock, Shield,
  Layers, FileSearch, Eye, Crop, Trash2, FileOutput, Hash, ScanLine, FileCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import AdvancedSEO from '@/components/AdvancedSEO';

const PdfTools = () => {
  const pdfTools = [
    // Conversion Tools
    {
      category: 'PDF Conversion',
      tools: [
        { title: 'PDF to Word', description: 'Convert PDF to editable Word documents online free', icon: <FileText className="h-6 w-6" />, route: '/pdf-to-word', keywords: 'pdf to word, pdf to docx, convert pdf to word online free' },
        { title: 'Word to PDF', description: 'Convert Word documents to PDF format instantly', icon: <FileText className="h-6 w-6" />, route: '/word-to-pdf', keywords: 'word to pdf, docx to pdf, convert word to pdf online' },
        { title: 'PDF to Excel', description: 'Extract tables from PDF to Excel spreadsheets', icon: <FileSpreadsheet className="h-6 w-6" />, route: '/pdf-to-excel', keywords: 'pdf to excel, pdf to xlsx, convert pdf to spreadsheet' },
        { title: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF documents', icon: <FileSpreadsheet className="h-6 w-6" />, route: '/excel-to-pdf', keywords: 'excel to pdf, xlsx to pdf, spreadsheet to pdf' },
        { title: 'PDF to PowerPoint', description: 'Convert PDF presentations to editable PPT files', icon: <Presentation className="h-6 w-6" />, route: '/pdf-to-powerpoint', keywords: 'pdf to ppt, pdf to powerpoint, convert pdf to presentation' },
        { title: 'PowerPoint to PDF', description: 'Convert PPT presentations to PDF format', icon: <Presentation className="h-6 w-6" />, route: '/powerpoint-to-pdf', keywords: 'ppt to pdf, powerpoint to pdf, presentation to pdf' },
        { title: 'PDF to JPG', description: 'Convert PDF pages to high-quality JPG images', icon: <Image className="h-6 w-6" />, route: '/pdf-to-jpg', keywords: 'pdf to jpg, pdf to image, convert pdf to picture' },
        { title: 'JPG to PDF', description: 'Convert images to PDF documents easily', icon: <Image className="h-6 w-6" />, route: '/jpg-to-pdf', keywords: 'jpg to pdf, image to pdf, picture to pdf converter' },
        { title: 'HTML to PDF', description: 'Convert web pages and HTML to PDF format', icon: <Code className="h-6 w-6" />, route: '/html-to-pdf', keywords: 'html to pdf, webpage to pdf, website to pdf' },
      ]
    },
    // Organize Tools
    {
      category: 'Organize PDF',
      tools: [
        { title: 'Merge PDF', description: 'Combine multiple PDF files into one document', icon: <Layers className="h-6 w-6" />, route: '/merge-pdf', keywords: 'merge pdf, combine pdf, join pdf files online free' },
        { title: 'Split PDF', description: 'Split PDF into multiple separate documents', icon: <Scissors className="h-6 w-6" />, route: '/split-pdf', keywords: 'split pdf, separate pdf pages, divide pdf online' },
        { title: 'Compress PDF', description: 'Reduce PDF file size without quality loss', icon: <Minimize className="h-6 w-6" />, route: '/compress-pdf', keywords: 'compress pdf, reduce pdf size, pdf compressor online' },
        { title: 'Rotate PDF', description: 'Rotate PDF pages to correct orientation', icon: <RotateCcw className="h-6 w-6" />, route: '/rotate-pdf', keywords: 'rotate pdf, turn pdf pages, fix pdf orientation' },
        { title: 'Remove Pages', description: 'Delete unwanted pages from PDF documents', icon: <Trash2 className="h-6 w-6" />, route: '/remove-pages', keywords: 'remove pdf pages, delete pages from pdf' },
        { title: 'Extract Pages', description: 'Extract specific pages from PDF to new file', icon: <FileOutput className="h-6 w-6" />, route: '/extract-pages', keywords: 'extract pdf pages, save specific pages' },
        { title: 'Crop PDF', description: 'Crop PDF margins and resize pages', icon: <Crop className="h-6 w-6" />, route: '/crop-pdf', keywords: 'crop pdf, trim pdf margins, resize pdf pages' },
        { title: 'Page Numbers', description: 'Add page numbers to PDF documents', icon: <Hash className="h-6 w-6" />, route: '/page-numbers-pdf', keywords: 'add page numbers pdf, number pdf pages' },
      ]
    },
    // Edit & Security Tools
    {
      category: 'Edit & Security',
      tools: [
        { title: 'Sign PDF', description: 'Add electronic signature to PDF documents', icon: <Signature className="h-6 w-6" />, route: '/sign-pdf', keywords: 'sign pdf, electronic signature, e-sign pdf online' },
        { title: 'Watermark PDF', description: 'Add text or image watermarks to PDF', icon: <Droplets className="h-6 w-6" />, route: '/watermark-pdf', keywords: 'watermark pdf, add logo to pdf, stamp pdf' },
        { title: 'Protect PDF', description: 'Password protect and encrypt PDF files', icon: <Shield className="h-6 w-6" />, route: '/protect-pdf', keywords: 'protect pdf, password pdf, encrypt pdf online' },
        { title: 'Unlock PDF', description: 'Remove password protection from PDF', icon: <Unlock className="h-6 w-6" />, route: '/unlock-pdf', keywords: 'unlock pdf, remove pdf password, decrypt pdf' },
        { title: 'Redact PDF', description: 'Permanently remove sensitive information', icon: <Eye className="h-6 w-6" />, route: '/redact-pdf', keywords: 'redact pdf, hide text in pdf, remove sensitive data' },
        { title: 'OCR PDF', description: 'Extract text from scanned PDFs using OCR', icon: <FileSearch className="h-6 w-6" />, route: '/ocr-pdf', keywords: 'ocr pdf, pdf text recognition, scanned pdf to text' },
        { title: 'Compare PDF', description: 'Compare two PDFs and highlight differences', icon: <FileCheck className="h-6 w-6" />, route: '/compare-pdf', keywords: 'compare pdf, pdf difference, pdf comparison tool' },
        { title: 'Scan to PDF', description: 'Convert scanned documents to PDF', icon: <ScanLine className="h-6 w-6" />, route: '/scan-to-pdf', keywords: 'scan to pdf, scanner to pdf, document scanner' },
      ]
    },
  ];

  return (
    <>
      <SEOHead
        title="Free PDF Tools Online - Convert, Merge, Compress, Edit PDF | PineToolsHub"
        description="100% free online PDF tools. Convert PDF to Word, Excel, PowerPoint. Merge, split, compress, rotate PDFs. Add signatures, watermarks, passwords. No registration required. Best Pinetools alternative."
        keywords="pdf tools online, free pdf converter, merge pdf, split pdf, compress pdf, pdf to word, word to pdf, pdf editor, pdf compressor, combine pdf, pinetools alternative"
        url="https://pinetoolshub.com/pdf-tools"
      />
      <AdvancedSEO
        title="Free PDF Tools Online - Convert, Merge, Compress, Edit PDF"
        description="Complete suite of free online PDF tools for conversion, editing, and security"
        type="tool"
        category="PDF Tools"
        toolSchema={{
          name: "PineToolsHub PDF Tools",
          description: "25+ free online PDF tools for conversion, editing, merging, and security",
          category: "PDF Tools",
          features: ["PDF Conversion", "Merge PDF", "Split PDF", "Compress PDF", "Sign PDF", "Protect PDF"],
          price: "Free"
        }}
        faqSchema={[
          { question: "How do I convert PDF to Word online for free?", answer: "Upload your PDF to our free converter, click convert, and download the editable Word document. No registration required." },
          { question: "How can I merge multiple PDF files into one?", answer: "Use our Merge PDF tool to upload multiple PDFs, arrange them, and combine into a single document for free." },
          { question: "Is it safe to use online PDF tools?", answer: "Yes! We use SSL encryption and automatically delete files after processing. Your documents are never stored." }
        ]}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Free PDF Tools Online - Convert, Edit, Compress
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Access 25+ professional PDF tools completely free. Convert PDF to Word, merge PDFs, compress files, 
              add signatures - all without registration. The best free Pinetools alternative for PDF processing.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/10 rounded-full">✓ 100% Free</span>
              <span className="px-3 py-1 bg-primary/10 rounded-full">✓ No Registration</span>
              <span className="px-3 py-1 bg-primary/10 rounded-full">✓ No Watermarks</span>
              <span className="px-3 py-1 bg-primary/10 rounded-full">✓ Secure & Private</span>
            </div>
          </div>

          {/* Tools Grid by Category */}
          {pdfTools.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">{category.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool) => (
                  <Link key={tool.route} to={tool.route}>
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {tool.icon}
                          </div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* SEO Content Section */}
          <div className="mt-16 p-8 bg-muted/30 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Why Use PineToolsHub PDF Tools?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">🚀 Fast & Free</h3>
                <p className="text-muted-foreground">
                  All PDF tools are completely free with no hidden costs. Process files instantly with our 
                  optimized servers. No file limits, no waiting, no subscriptions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">🔒 Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your files are processed securely and deleted after conversion. We never store or share 
                  your documents. SSL encryption protects all transfers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">💻 Works Everywhere</h3>
                <p className="text-muted-foreground">
                  Use our PDF tools on any device - desktop, tablet, or mobile. No software installation 
                  needed. Works in Chrome, Firefox, Safari, and Edge browsers.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section for SEO */}
          <div className="mt-12 p-8 bg-secondary/20 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions - PDF Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">How do I convert PDF to Word online for free?</h3>
                <p className="text-muted-foreground text-sm">
                  Use our free PDF to Word converter. Upload your PDF, click convert, and download the editable 
                  Word document. No registration or payment required. Preserves formatting and images.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">How can I merge multiple PDF files into one?</h3>
                <p className="text-muted-foreground text-sm">
                  Use our Merge PDF tool. Upload multiple PDFs, arrange them in order, and combine into a single 
                  document. Free, unlimited, and works with files up to 100MB each.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Is it safe to use online PDF tools?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes! Our PDF tools use SSL encryption for file transfers. Files are processed server-side and 
                  automatically deleted. We never access or store your document contents.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Can I compress PDF without losing quality?</h3>
                <p className="text-muted-foreground text-sm">
                  Our PDF compressor offers multiple compression levels. Choose "Low compression" to maintain 
                  highest quality while still reducing file size significantly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">How do I add electronic signature to PDF?</h3>
                <p className="text-muted-foreground text-sm">
                  Use our Sign PDF tool. Draw your signature with mouse/touchscreen, type it, or upload an image. 
                  Position anywhere on the document. Legally binding e-signatures.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">What's the best alternative to Adobe Acrobat?</h3>
                <p className="text-muted-foreground text-sm">
                  PineToolsHub offers all essential PDF features for free - convert, edit, merge, compress, sign. 
                  No expensive subscription needed. Works directly in your browser.
                </p>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Explore More Free Tools</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="text-primary hover:underline">All Tools</Link>
              <Link to="/image-compressor" className="text-primary hover:underline">Image Tools</Link>
              <Link to="/resume-builder" className="text-primary hover:underline">Career Tools</Link>
              <Link to="/blog-writer" className="text-primary hover:underline">AI Writing Tools</Link>
              <Link to="/qr-code" className="text-primary hover:underline">Utility Tools</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfTools;
