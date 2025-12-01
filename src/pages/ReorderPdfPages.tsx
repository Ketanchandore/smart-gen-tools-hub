import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
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

const ReorderPdfPages = () => {
  const { toast } = useToast();
  const [newOrder, setNewOrder] = useState('1,2,3');

  const handleReorder = async (files: File[]): Promise<Uint8Array> => {
    try {
      const order = newOrder.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
      
      if (order.length === 0) {
        throw new Error('Please enter a valid page order');
      }

      const arrayBuffer = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      for (const pageIndex of order) {
        if (pageIndex >= 0 && pageIndex < pdfDoc.getPageCount()) {
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
          newPdf.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdf.save();
      
      toast({
        title: 'Pages Reordered Successfully',
        description: `PDF pages have been reorganized in your specified order`,
      });

      return pdfBytes;
    } catch (error) {
      console.error('Reorder error:', error);
      toast({
        title: 'Reorder Failed',
        description: error instanceof Error ? error.message : 'Failed to reorder pages',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "How do I reorder PDF pages?",
      answer: "Enter the new page order (e.g., 3,1,2 to move page 3 to the front), then upload your PDF. The tool will reorganize pages in your specified order."
    },
    {
      question: "Can I remove pages while reordering?",
      answer: "Yes! Simply don't include page numbers you want to remove. For example, entering '1,3,5' will keep only those pages in that order."
    },
    {
      question: "What happens if I enter invalid page numbers?",
      answer: "Invalid page numbers are automatically skipped. Make sure to enter page numbers that exist in your PDF."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Reorder PDF Pages Online Free - Rearrange PDF Pages | Pine Tools Hub</title>
        <meta name="description" content="Reorder PDF pages online for free. Rearrange and reorganize PDF pages in any order. Fast and easy PDF page reordering tool." />
        <meta name="keywords" content="reorder pdf pages, rearrange pdf, reorganize pdf pages, change pdf page order, pdf page organizer" />
        <link rel="canonical" href="https://pinetoolshub.com/reorder-pdf-pages" />
      </Helmet>

      <ToolSEO 
        title="Reorder PDF Pages Online Free - Rearrange PDF Pages | Pine Tools Hub"
        description="Reorder and rearrange PDF pages online for free. Reorganize pages in any order. Simple and fast PDF page reordering tool. No registration required."
        keywords="reorder pdf pages online, rearrange pdf free, reorganize pdf pages, change pdf order, pdf page sorter, resequence pdf"
        toolName="Reorder PDF Pages"
        toolType="Tool"
        category="PDF Tools"
        features={["Custom page order", "Remove unwanted pages", "Drag and drop", "Quality preservation", "Fast processing"]}
        faqs={faqData}
        url="https://pinetoolshub.com/reorder-pdf-pages"
      />

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ToolBreadcrumb 
                category="PDF Tools" 
                categoryPath="/tools" 
                toolName="Reorder PDF Pages" 
              />

              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Reorder PDF Pages</h1>
                <p className="text-lg text-muted-foreground">
                  Rearrange and reorganize PDF pages in any order you want.
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5" />
                    Page Order
                  </CardTitle>
                  <CardDescription>Enter the new order for your PDF pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="new-order">New Page Order (comma-separated)</Label>
                      <Input
                        id="new-order"
                        value={newOrder}
                        onChange={(e) => setNewOrder(e.target.value)}
                        placeholder="e.g., 3,1,2,4"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter page numbers in the order you want them (e.g., 3,1,2 to move page 3 to the front)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={false}
                processFunction={handleReorder}
                outputFilename="reordered.pdf"
              />

              <div className="mt-12 prose max-w-none">
                <h2>How to Reorder PDF Pages</h2>
                <ol>
                  <li>Enter the new page order (e.g., 3,1,2,4)</li>
                  <li>Upload your PDF file</li>
                  <li>Wait for the reordering to complete</li>
                  <li>Download your reorganized PDF</li>
                </ol>
                
                <h3>Why Reorder PDF Pages?</h3>
                <ul>
                  <li>Fix accidentally misordered scanned documents</li>
                  <li>Reorganize content for better flow</li>
                  <li>Remove and reorder pages simultaneously</li>
                  <li>Create custom PDF arrangements</li>
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
              <PopularToolsSidebar currentPath="/reorder-pdf-pages" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ReorderPdfPages;
