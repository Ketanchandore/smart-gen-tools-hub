
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileTextIcon, Upload, Download, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ToolStructuredData, FAQStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData';
import PrerenderedContent from '@/components/PrerenderedContent';

const PdfToWord = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const toolName = "PDF to Word Converter";
  const toolDescription = "Convert PDF documents to editable Microsoft Word files with our free online tool. Preserve formatting, images, and text layout while converting to DOCX format.";
  const toolUrl = "https://pinetoolshub.com/pdf-to-word";

  const faqData = [
    {
      question: "How accurate is the PDF to Word conversion?",
      answer: "Our converter maintains high accuracy for text, formatting, and basic layouts. Complex designs may require minor adjustments after conversion."
    },
    {
      question: "What file size can I convert?",
      answer: "You can convert PDF files up to 10MB in size. Larger files may need to be compressed first."
    },
    {
      question: "Is my data secure during conversion?",
      answer: "Yes, all files are processed securely and automatically deleted after conversion. We don't store or access your documents."
    },
    {
      question: "What formats are supported?",
      answer: "We convert PDF files to Microsoft Word DOCX format, which is compatible with Word 2007 and newer versions."
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://pinetoolshub.com" },
    { name: "PDF Tools", url: "https://pinetoolshub.com/#pdf-tools" },
    { name: "PDF to Word", url: toolUrl }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please select a PDF file',
          variant: 'destructive',
        });
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 10MB',
          variant: 'destructive',
        });
        return;
      }
      
      setFile(selectedFile);
      setConverted(false);
    }
  };

  const handleConvert = () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a PDF file first',
        variant: 'destructive',
      });
      return;
    }

    setConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      setConverting(false);
      setConverted(true);
      
      toast({
        title: 'Conversion complete',
        description: 'Your PDF has been converted to Word format',
      });
    }, 2000);
  };

  return (
    <Layout 
      title={`${toolName} - Convert PDF to Word DOCX Online Free`}
      description={toolDescription}
    >
      <ToolStructuredData
        name={toolName}
        description={toolDescription}
        url={toolUrl}
        category="ProductivityApplication"
        features={[
          "Convert PDF to Word DOCX format",
          "Preserve text formatting and layout",
          "Support for images and tables",
          "Free online conversion",
          "No registration required",
          "Secure file processing"
        ]}
      />
      <FAQStructuredData questions={faqData} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <PrerenderedContent
        prerenderedHtml={`
          <div class="container py-12">
            <div class="max-w-3xl mx-auto">
              <h1 class="text-3xl font-bold mb-2">${toolName}</h1>
              <p class="text-muted-foreground mb-8">${toolDescription}</p>
            </div>
          </div>
        `}
      >
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <nav className="mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary">Home</a></li>
                <li>/</li>
                <li><a href="/#pdf-tools" className="hover:text-primary">PDF Tools</a></li>
                <li>/</li>
                <li className="text-foreground">PDF to Word</li>
              </ol>
            </nav>
            
            <h1 className="text-3xl font-bold mb-2">{toolName}</h1>
            <p className="text-muted-foreground mb-8">{toolDescription}</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload PDF File</CardTitle>
              <CardDescription>Select the PDF file you want to convert to Word format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="pdf-upload"
                  />
                  <Label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <FileTextIcon className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {file ? file.name : 'Click to select PDF file or drop it here'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max file size: 10MB'}
                    </span>
                  </Label>
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleConvert} 
                    disabled={!file || converting} 
                    className="bg-primary flex items-center gap-2"
                  >
                    {converting ? (
                      <>Converting...</>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Convert to Word
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {converted && (
            <Card>
              <CardHeader>
                <CardTitle>Conversion Complete</CardTitle>
                <CardDescription>Your file has been successfully converted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <FileTextIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                    <p className="font-medium">{file?.name.replace('.pdf', '.docx')}</p>
                  </div>
                  <Button className="bg-primary flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Word Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

            <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2"><strong>Note:</strong> This is a demo version of the tool. For full functionality, the backend PDF processing would need to be implemented.</p>
                  <p>The actual PDF to Word conversion requires a backend service or a PDF processing library that can read PDF structure and convert it to the DOCX format while preserving formatting, tables, images, and other elements.</p>
                </div>
              </div>
            </div>

            {/* FAQ Section for SEO */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Tools */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related PDF Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="/word-to-pdf" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                  <h3 className="font-semibold">Word to PDF</h3>
                  <p className="text-sm text-muted-foreground">Convert Word documents to PDF format</p>
                </a>
                <a href="/merge-pdf" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                  <h3 className="font-semibold">Merge PDF</h3>
                  <p className="text-sm text-muted-foreground">Combine multiple PDFs into one</p>
                </a>
                <a href="/split-pdf" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                  <h3 className="font-semibold">Split PDF</h3>
                  <p className="text-sm text-muted-foreground">Extract pages from PDF files</p>
                </a>
                <a href="/compress-pdf" className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                  <h3 className="font-semibold">Compress PDF</h3>
                  <p className="text-sm text-muted-foreground">Reduce PDF file size</p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </PrerenderedContent>
    </Layout>
  );
};

export default PdfToWord;
