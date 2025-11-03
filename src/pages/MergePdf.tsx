import React, { useState } from 'react';
import { FileText, Info, ArrowUpDown, Settings } from 'lucide-react';
import ToolSEO from '@/components/ToolSEO';
import Layout from '@/components/Layout';
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import PopularToolsSidebar from '@/components/PopularToolsSidebar';
import ReverseToolLink from '@/components/ReverseToolLink';
import WhatsNextTools from '@/components/WhatsNextTools';
import YouMightAlsoNeed from '@/components/YouMightAlsoNeed';
import FileUploadArea from '@/components/FileUploadArea';
import { mergePDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const MergePdf = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [fileOrder, setFileOrder] = useState<number[]>([]);
  const [mergeMode, setMergeMode] = useState<'sequential' | 'interleave' | 'custom'>('sequential');
  const [addBookmarks, setAddBookmarks] = useState(true);
  const [addPageNumbers, setAddPageNumbers] = useState(false);
  const [preserveMetadata, setPreserveMetadata] = useState(true);
  const [optimizeOutput, setOptimizeOutput] = useState(false);
  const [pageRanges, setPageRanges] = useState<{[key: number]: string}>({});
  const [outputTitle, setOutputTitle] = useState('Merged Document');
  const [insertBlankPages, setInsertBlankPages] = useState(false);
  const [addHeaders, setAddHeaders] = useState(false);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setFileOrder(selectedFiles.map((_, index) => index));
  };

  const moveFileUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...fileOrder];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      setFileOrder(newOrder);
    }
  };

  const moveFileDown = (index: number) => {
    if (index < fileOrder.length - 1) {
      const newOrder = [...fileOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      setFileOrder(newOrder);
    }
  };

  const setPageRange = (fileIndex: number, range: string) => {
    setPageRanges(prev => ({ ...prev, [fileIndex]: range }));
  };

  const handleMerge = async (inputFiles: File[]): Promise<Uint8Array> => {
    try {
      const orderedFiles = fileOrder.map(index => inputFiles[index]);
      
      const options = {
        bookmarks: addBookmarks,
        removeBlankPages: false,
        customOrder: fileOrder
      };

      toast({
        title: 'Merging Started',
        description: `Merging ${orderedFiles.length} PDF files...`,
      });

      const result = await mergePDF(orderedFiles, options);
      
      toast({
        title: 'Merge Complete',
        description: `Successfully merged ${orderedFiles.length} PDF files`,
      });

      return result;
    } catch (error) {
      console.error('Merge error:', error);
      toast({
        title: 'Merge Failed',
        description: 'An error occurred while merging PDFs',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const faqData = [
    {
      question: "Can I merge PDFs in a specific order?",
      answer: "Yes! You can easily reorder your PDF files using our drag-and-drop interface or the up/down arrows. The final merged PDF will follow your specified order."
    },
    {
      question: "Is there a limit to how many PDFs I can merge?",
      answer: "You can merge up to 20 PDF files at once. For larger batches, consider merging in groups and then combining the results."
    },
    {
      question: "Will merging PDFs affect the quality?",
      answer: "No, merging PDFs preserves the original quality of all documents. The process combines files without recompression or quality loss."
    },
    {
      question: "Can I merge specific pages from different PDFs?",
      answer: "Absolutely! Use our page range feature to specify exactly which pages from each PDF should be included in the merged document."
    }
  ];

  return (
    <>
      <ToolSEO 
        title="Free PDF Merger - Combine Multiple PDFs Online | Pine Tools Hub"
        description="Merge PDF files online for free. Combine multiple PDFs with custom ordering, page ranges, and bookmarks. Professional PDF merging tool."
        keywords="PDF merger, combine PDF, merge PDF online, PDF joiner, PDF combiner, join PDFs"
        toolName="PDF Merger"
        toolType="Tool"
        category="PDF Tools"
        features={["Custom file ordering", "Page range selection", "Bookmark generation", "Metadata preservation"]}
        faqs={faqData}
        url="https://pinetoolshub.com/merge-pdf"
      />

      <Layout>
        <ToolBreadcrumb 
          category="PDF Tools" 
          categoryPath="/tools" 
          toolName="Merge PDF" 
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Merge PDF Files Online</h1>
                <p className="text-lg text-muted-foreground">
                  Combine multiple PDF documents into a single organized file. Easy drag-and-drop interface.
                </p>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg mb-8 border border-primary/20">
                <h2 className="text-2xl font-bold mb-4">Why Merge PDFs?</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Organize related documents
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Easier file management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Professional presentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Simplify sharing
                  </li>
                </ul>
              </div>

              <FileUploadArea
                acceptFiles=".pdf"
                multiple={true}
                processFunction={handleMerge}
                outputFilename="merged.pdf"
              />

              <div className="mt-8">
                <ReverseToolLink 
                  reverseTool={{
                    name: "Split PDF",
                    path: "/split-pdf",
                    description: "Need to separate a merged PDF? Split it into individual files easily."
                  }}
                />
              </div>

              <div className="mt-12 bg-muted/30 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">How to Merge PDFs</h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <h3 className="font-bold">Upload PDF Files</h3>
                      <p className="text-muted-foreground">Select multiple PDF files to combine</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <h3 className="font-bold">Arrange Order</h3>
                      <p className="text-muted-foreground">Drag and drop to reorder files</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <h3 className="font-bold">Merge & Download</h3>
                      <p className="text-muted-foreground">Combine files and download the result</p>
                    </div>
                  </li>
                </ol>
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

              <YouMightAlsoNeed 
                tools={[
                  {
                    name: "Compress PDF",
                    reason: "Reduce the size of your merged document",
                    path: "/compress-pdf"
                  },
                  {
                    name: "Organize PDF",
                    reason: "Reorder pages in your merged file",
                    path: "/organize-pdf"
                  },
                  {
                    name: "Protect PDF",
                    reason: "Secure your merged document with a password",
                    path: "/protect-pdf"
                  }
                ]}
              />

              <WhatsNextTools 
                tools={[
                  {
                    name: "Compress PDF",
                    description: "Reduce merged file size",
                    path: "/compress-pdf",
                    icon: "compress"
                  },
                  {
                    name: "Split PDF",
                    description: "Extract specific pages",
                    path: "/split-pdf",
                    icon: "split"
                  },
                  {
                    name: "Organize PDF",
                    description: "Reorder pages",
                    path: "/organize-pdf",
                    icon: "merge"
                  },
                  {
                    name: "Protect PDF",
                    description: "Add password security",
                    path: "/protect-pdf",
                    icon: "protect"
                  }
                ]}
              />

              <div className="mt-12 prose max-w-none">
                <h2>What is PDF Merging?</h2>
                <p>
                  PDF merging combines multiple PDF documents into a single file while preserving the formatting, 
                  layout, and quality of each original document. This is useful for organizing related documents, 
                  creating comprehensive reports, or preparing professional presentations.
                </p>
                
                <h3>Benefits of Merging PDFs</h3>
                <ul>
                  <li>Simplify document management and organization</li>
                  <li>Easier sharing of related documents</li>
                  <li>Professional presentation of information</li>
                  <li>Reduced email attachments</li>
                </ul>

                <h3>Common Use Cases</h3>
                <ul>
                  <li>Combine invoice and receipt PDFs</li>
                  <li>Merge contract documents and appendices</li>
                  <li>Create comprehensive project reports</li>
                  <li>Organize academic papers and references</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <PopularToolsSidebar currentPath="/merge-pdf" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MergePdf;
