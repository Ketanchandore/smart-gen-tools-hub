import React, { useState } from 'react';
import { Scissors, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import FileUploadArea from '@/components/FileUploadArea';
import { splitPDF } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import PopularToolsSidebar from '@/components/PopularToolsSidebar';

const ExtractPdfPages = () => {
  const { toast } = useToast();
  const [pageNumbers, setPageNumbers] = useState('1,3,5');

  const handleExtract = async (files: File[]): Promise<Uint8Array> => {
    try {
      const pages = pageNumbers.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
      
      if (pages.length === 0) {
        throw new Error('Please enter valid page numbers');
      }

      const result = await splitPDF(files[0], {
        mode: 'extract',
        extractPages: pages,
      });

      toast({
        title: 'Pages Extracted Successfully',
        description: `Extracted ${result.files.length} page(s) from the PDF`,
      });

      return result.files[0];
    } catch (error) {
      console.error('Extract error:', error);
      toast({
        title: 'Extraction Failed',
        description: error instanceof Error ? error.message : 'Failed to extract pages',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "How do I extract specific pages from a PDF?",
      answer: "Simply enter the page numbers you want to extract (e.g., 1,3,5) and upload your PDF. The tool will create a new PDF with only those pages."
    },
    {
      question: "Can I extract multiple pages at once?",
      answer: "Yes! You can extract as many pages as you need by separating page numbers with commas (e.g., 1,2,5,10,15)."
    },
    {
      question: "Will the quality of extracted pages be maintained?",
      answer: "Absolutely! Page extraction maintains 100% of the original quality, formatting, and content."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Extract Pages from PDF Online Free - PDF Page Extractor | Pine Tools Hub</title>
        <meta name="description" content="Extract specific pages from PDF files online for free. Select and extract individual pages from your PDF documents quickly and easily." />
        <meta name="keywords" content="extract pdf pages, pdf page extractor, remove pages from pdf, select pdf pages, pdf page selector" />
        <link rel="canonical" href="https://pinetoolshub.com/extract-pdf-pages" />
      </Helmet>

      <ToolSEO 
        title="Extract Pages from PDF Online Free - PDF Page Extractor | Pine Tools Hub"
        description="Extract specific pages from PDF documents online for free. Select and extract individual or multiple pages with ease. No registration required."
        keywords="extract pdf pages online, pdf page extractor, remove pages from pdf, select pdf pages, pdf page selector, extract single page"
        toolName="Extract PDF Pages"
        toolType="Tool"
        category="PDF Tools"
        features={["Extract specific pages", "Multiple page selection", "Quality preservation", "Fast processing", "No file limits"]}
        faqs={faqData}
        url="https://pinetoolshub.com/extract-pdf-pages"
      />

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ToolBreadcrumb 
                category="PDF Tools" 
                categoryPath="/tools" 
                toolName="Extract PDF Pages" 
              />

              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Extract Pages from PDF</h1>
                <p className="text-lg text-muted-foreground">
                  Select and extract specific pages from your PDF documents instantly.
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Page Selection</CardTitle>
                  <CardDescription>Enter the page numbers you want to extract</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="page-numbers">Page Numbers (comma-separated)</Label>
                      <Input
                        id="page-numbers"
                        value={pageNumbers}
                        onChange={(e) => setPageNumbers(e.target.value)}
                        placeholder="e.g., 1,3,5,7"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter page numbers separated by commas (e.g., 1,3,5 to extract pages 1, 3, and 5)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={false}
                processFunction={handleExtract}
                outputFilename="extracted-pages.pdf"
              />

              <div className="mt-12 prose max-w-none">
                <h2>How to Extract Pages from PDF</h2>
                <ol>
                  <li>Enter the page numbers you want to extract</li>
                  <li>Upload your PDF file</li>
                  <li>Wait for the extraction to complete</li>
                  <li>Download your new PDF with only the selected pages</li>
                </ol>
                
                <h3>Common Use Cases</h3>
                <ul>
                  <li>Extract important pages from large documents</li>
                  <li>Create custom PDF compilations</li>
                  <li>Share specific pages without sending the entire document</li>
                  <li>Remove unwanted pages from PDFs</li>
                </ul>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <details key={index} className="bg-card p-4 rounded-lg cursor-pointer border">
                      <summary className="font-bold text-lg">{faq.question}</summary>
                      <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <PopularToolsSidebar currentPath="/extract-pdf-pages" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ExtractPdfPages;
