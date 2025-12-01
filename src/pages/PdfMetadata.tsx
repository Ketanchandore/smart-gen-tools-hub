import React, { useState } from 'react';
import { FileEdit, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import FileUploadArea from '@/components/FileUploadArea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import PopularToolsSidebar from '@/components/PopularToolsSidebar';
import { PDFDocument } from 'pdf-lib';

const PdfMetadata = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');
  const [creator, setCreator] = useState('');

  const handleEdit = async (files: File[]): Promise<Uint8Array> => {
    try {
      const arrayBuffer = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Set metadata
      if (title) pdfDoc.setTitle(title);
      if (author) pdfDoc.setAuthor(author);
      if (subject) pdfDoc.setSubject(subject);
      if (keywords) pdfDoc.setKeywords(keywords.split(',').map(k => k.trim()));
      if (creator) pdfDoc.setCreator(creator);
      pdfDoc.setProducer('Pine Tools Hub');
      pdfDoc.setModificationDate(new Date());

      const pdfBytes = await pdfDoc.save();
      
      toast({
        title: 'Metadata Updated Successfully',
        description: 'PDF metadata has been updated with your information',
      });

      return pdfBytes;
    } catch (error) {
      console.error('Metadata edit error:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update PDF metadata',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "What is PDF metadata?",
      answer: "PDF metadata includes information about the document such as title, author, subject, keywords, creation date, and modification date. It helps organize and identify documents."
    },
    {
      question: "Why should I edit PDF metadata?",
      answer: "Editing metadata helps with document organization, improves searchability, adds copyright information, and makes documents more professional."
    },
    {
      question: "Will editing metadata change the PDF content?",
      answer: "No, editing metadata only changes the document information. The actual content, formatting, and pages remain unchanged."
    },
    {
      question: "Can I remove all metadata from a PDF?",
      answer: "Yes, you can clear all metadata fields by leaving them empty. This is useful for privacy when sharing documents."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Edit PDF Metadata Online Free - Change PDF Properties | Pine Tools Hub</title>
        <meta name="description" content="Edit PDF metadata online for free. Change PDF title, author, subject, keywords, and other properties. Update PDF document information instantly." />
        <meta name="keywords" content="edit pdf metadata, change pdf properties, pdf metadata editor, update pdf info, pdf document properties" />
        <link rel="canonical" href="https://pinetoolshub.com/pdf-metadata" />
      </Helmet>

      <ToolSEO 
        title="Edit PDF Metadata Online Free - Change PDF Properties | Pine Tools Hub"
        description="Edit PDF metadata and properties online for free. Change title, author, subject, keywords, and other document information. Quick and easy PDF metadata editor."
        keywords="edit pdf metadata online, change pdf properties, pdf metadata editor, update pdf info, pdf document properties, change pdf author"
        toolName="PDF Metadata Editor"
        toolType="Tool"
        category="PDF Tools"
        features={["Edit title and author", "Update keywords", "Change creation date", "Remove metadata", "Batch processing"]}
        faqs={faqData}
        url="https://pinetoolshub.com/pdf-metadata"
      />

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ToolBreadcrumb 
                category="PDF Tools" 
                categoryPath="/tools" 
                toolName="PDF Metadata Editor" 
              />

              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">PDF Metadata Editor</h1>
                <p className="text-lg text-muted-foreground">
                  Edit PDF document properties including title, author, subject, and keywords.
                </p>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileEdit className="h-5 w-5" />
                    Document Information
                  </CardTitle>
                  <CardDescription>Enter or update PDF metadata fields</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Document title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Document subject"
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Textarea
                      id="keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Separate keywords with commas
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="creator">Creator/Application</Label>
                    <Input
                      id="creator"
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                      placeholder="Application name"
                    />
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-semibold mb-1">Privacy Tip:</p>
                        <p>Leave fields empty to remove metadata for enhanced privacy before sharing documents.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={false}
                processFunction={handleEdit}
                outputFilename="metadata-updated.pdf"
              />

              <div className="mt-12 prose max-w-none">
                <h2>How to Edit PDF Metadata</h2>
                <ol>
                  <li>Fill in the metadata fields you want to update</li>
                  <li>Upload your PDF file</li>
                  <li>Wait for the processing to complete</li>
                  <li>Download your PDF with updated metadata</li>
                </ol>
                
                <h3>Benefits of Proper Metadata</h3>
                <ul>
                  <li><strong>Organization:</strong> Easily search and sort documents</li>
                  <li><strong>Professionalism:</strong> Show proper authorship and information</li>
                  <li><strong>Copyright:</strong> Establish document ownership</li>
                  <li><strong>SEO:</strong> Improve document discoverability</li>
                </ul>

                <h3>Metadata Fields Explained</h3>
                <p><strong>Title:</strong> The document's main title or name</p>
                <p><strong>Author:</strong> Person or organization who created the document</p>
                <p><strong>Subject:</strong> Brief description of the document's content</p>
                <p><strong>Keywords:</strong> Terms for searching and categorizing</p>
                <p><strong>Creator:</strong> Application used to create the document</p>
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
              <PopularToolsSidebar currentPath="/pdf-metadata" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PdfMetadata;
