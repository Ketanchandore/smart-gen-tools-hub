import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import FileUploadArea from '@/components/FileUploadArea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import PopularToolsSidebar from '@/components/PopularToolsSidebar';
import { PDFDocument } from 'pdf-lib';

const RemovePdfPages = () => {
  const { toast } = useToast();
  const [pagesToRemove, setPagesToRemove] = useState('2,4');

  const handleRemove = async (files: File[]): Promise<Uint8Array> => {
    try {
      const pagesToDelete = pagesToRemove.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
      
      if (pagesToDelete.length === 0) {
        throw new Error('Please enter valid page numbers to remove');
      }

      const arrayBuffer = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      const newPdf = await PDFDocument.create();

      // Copy all pages except the ones to delete
      for (let i = 0; i < totalPages; i++) {
        if (!pagesToDelete.includes(i)) {
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdf.save();
      
      toast({
        title: 'Pages Removed Successfully',
        description: `Removed ${pagesToDelete.length} page(s) from the PDF`,
      });

      return pdfBytes;
    } catch (error) {
      console.error('Remove error:', error);
      toast({
        title: 'Remove Failed',
        description: error instanceof Error ? error.message : 'Failed to remove pages',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "How do I remove specific pages from a PDF?",
      answer: "Enter the page numbers you want to remove (e.g., 2,4,6) separated by commas, then upload your PDF. The tool will create a new PDF without those pages."
    },
    {
      question: "Can I remove multiple pages at once?",
      answer: "Yes! You can remove as many pages as needed by listing all page numbers separated by commas (e.g., 1,3,5,7,9)."
    },
    {
      question: "Will removing pages affect the quality of remaining pages?",
      answer: "No, the remaining pages maintain 100% of their original quality. Only the specified pages are removed."
    },
    {
      question: "Can I undo page removal?",
      answer: "Page removal is permanent in the output file. Always keep a backup of your original PDF if you might need those pages later."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Remove Pages from PDF Online Free - Delete PDF Pages | Pine Tools Hub</title>
        <meta name="description" content="Remove pages from PDF online for free. Delete unwanted pages from your PDF documents quickly and easily. No registration required." />
        <meta name="keywords" content="remove pdf pages, delete pdf pages, remove pages from pdf online, pdf page remover, delete pdf pages online free" />
        <link rel="canonical" href="https://pinetoolshub.com/remove-pdf-pages" />
      </Helmet>

      <ToolSEO 
        title="Remove Pages from PDF Online Free - Delete PDF Pages | Pine Tools Hub"
        description="Remove and delete pages from PDF documents online for free. Select specific pages to remove and download your cleaned PDF instantly."
        keywords="remove pdf pages online, delete pdf pages free, remove pages from pdf, pdf page remover, delete unwanted pdf pages"
        toolName="Remove PDF Pages"
        toolType="Tool"
        category="PDF Tools"
        features={["Remove multiple pages", "Fast processing", "Quality preservation", "No file limits", "Batch removal"]}
        faqs={faqData}
        url="https://pinetoolshub.com/remove-pdf-pages"
      />

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ToolBreadcrumb 
                category="PDF Tools" 
                categoryPath="/tools" 
                toolName="Remove PDF Pages" 
              />

              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Remove Pages from PDF</h1>
                <p className="text-lg text-muted-foreground">
                  Delete unwanted pages from your PDF documents instantly and easily.
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Pages to Remove
                  </CardTitle>
                  <CardDescription>Enter the page numbers you want to delete</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pages-to-remove">Page Numbers (comma-separated)</Label>
                      <Input
                        id="pages-to-remove"
                        value={pagesToRemove}
                        onChange={(e) => setPagesToRemove(e.target.value)}
                        placeholder="e.g., 2,4,6"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter page numbers to remove separated by commas (e.g., 2,4,6 to remove pages 2, 4, and 6)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={false}
                processFunction={handleRemove}
                outputFilename="pages-removed.pdf"
              />

              <div className="mt-12 prose max-w-none">
                <h2>How to Remove Pages from PDF</h2>
                <ol>
                  <li>Enter the page numbers you want to remove</li>
                  <li>Upload your PDF file</li>
                  <li>Wait for the processing to complete</li>
                  <li>Download your PDF without the removed pages</li>
                </ol>
                
                <h3>Common Use Cases</h3>
                <ul>
                  <li>Remove blank pages from scanned documents</li>
                  <li>Delete confidential or sensitive pages</li>
                  <li>Clean up unnecessary pages before sharing</li>
                  <li>Reduce file size by removing redundant pages</li>
                </ul>

                <h3>Tips for Page Removal</h3>
                <ul>
                  <li>Always keep a backup of your original PDF</li>
                  <li>Double-check page numbers before removing</li>
                  <li>Preview the PDF first to identify correct page numbers</li>
                  <li>You can remove multiple non-consecutive pages at once</li>
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
              <PopularToolsSidebar currentPath="/remove-pdf-pages" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RemovePdfPages;
