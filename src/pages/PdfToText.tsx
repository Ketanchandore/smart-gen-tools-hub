import React, { useState } from 'react';
import { FileText, Download, Copy } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import FileUploadArea from '@/components/FileUploadArea';
import { pdfToText } from '@/utils/pdfUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import PopularToolsSidebar from '@/components/PopularToolsSidebar';

const PdfToText = () => {
  const { toast } = useToast();
  const [extractedText, setExtractedText] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleConvert = async (files: File[]): Promise<Uint8Array> => {
    try {
      setProcessing(true);
      const text = await pdfToText(files[0]);
      setExtractedText(text);
      
      toast({
        title: 'Text Extracted Successfully',
        description: 'PDF content has been converted to text',
      });

      // Return dummy data for compatibility
      return new Uint8Array();
    } catch (error) {
      console.error('Extraction error:', error);
      toast({
        title: 'Extraction Failed',
        description: 'Failed to extract text from PDF',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    toast({
      title: 'Copied!',
      description: 'Text copied to clipboard',
    });
  };

  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted-text.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const faqData = [
    {
      question: "Can PDF to Text converter extract text from scanned PDFs?",
      answer: "Yes, our tool can extract text from both digital and scanned PDFs. For scanned documents, we use OCR technology to recognize and extract text."
    },
    {
      question: "Will the formatting be preserved when converting PDF to text?",
      answer: "Basic formatting like line breaks and paragraphs are preserved. However, complex formatting like tables, columns, and special layouts may be simplified."
    },
    {
      question: "Is there a limit on PDF file size for text extraction?",
      answer: "You can extract text from PDF files up to 50MB. For larger files, consider splitting them first."
    },
    {
      question: "Can I extract text from password-protected PDFs?",
      answer: "Yes, you can extract text from password-protected PDFs by entering the password when uploading the file."
    }
  ];

  return (
    <>
      <Helmet>
        <title>PDF to Text Converter Online Free - Extract Text from PDF | Pine Tools Hub</title>
        <meta name="description" content="Convert PDF to text online for free. Extract text from PDF documents quickly and easily. No registration required. Works with scanned PDFs too." />
        <meta name="keywords" content="pdf to text, extract text from pdf, pdf text extractor, convert pdf to txt, pdf text converter, copy text from pdf, pdf ocr text" />
        <link rel="canonical" href="https://pinetoolshub.com/pdf-to-text" />
      </Helmet>

      <ToolSEO 
        title="PDF to Text Converter Online Free - Extract Text from PDF | Pine Tools Hub"
        description="Convert PDF to text online for free. Extract text from PDF documents instantly. Support for scanned PDFs with OCR. No registration required."
        keywords="pdf to text converter, extract text from pdf online, pdf text extractor, convert pdf to txt, pdf ocr, copy text from pdf"
        toolName="PDF to Text Converter"
        toolType="Tool"
        category="PDF Tools"
        features={["Text extraction", "OCR support", "Batch processing", "Format preservation", "Copy to clipboard"]}
        faqs={faqData}
        url="https://pinetoolshub.com/pdf-to-text"
      />

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ToolBreadcrumb 
                category="PDF Tools" 
                categoryPath="/tools" 
                toolName="PDF to Text" 
              />

              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">PDF to Text Converter</h1>
                <p className="text-lg text-muted-foreground">
                  Extract text from PDF documents instantly. Works with both digital and scanned PDFs.
                </p>
              </div>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={false}
                processFunction={handleConvert}
                outputFilename="extracted-text.txt"
              />

              {extractedText && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Extracted Text
                    </CardTitle>
                    <CardDescription>
                      Your PDF has been successfully converted to text
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={extractedText}
                      onChange={(e) => setExtractedText(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                    />
                    <div className="flex gap-4">
                      <Button onClick={handleCopyText}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Text
                      </Button>
                      <Button onClick={handleDownloadText} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download as TXT
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-12 prose max-w-none">
                <h2>How to Convert PDF to Text</h2>
                <ol>
                  <li>Upload your PDF file using the upload area above</li>
                  <li>Wait for the text extraction to complete</li>
                  <li>Copy the text or download it as a TXT file</li>
                  <li>Edit the text if needed before saving</li>
                </ol>
                
                <h3>Why Use PDF to Text Converter?</h3>
                <ul>
                  <li>Extract text from documents for editing</li>
                  <li>Convert scanned documents to editable text</li>
                  <li>Copy content from PDFs without formatting issues</li>
                  <li>Archive text content from PDF documents</li>
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
              <PopularToolsSidebar currentPath="/pdf-to-text" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PdfToText;
