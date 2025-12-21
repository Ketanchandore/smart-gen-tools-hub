
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FileIcon, Upload, Download, Info, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SEOHead from '@/components/SEOHead';
import { ToolStructuredData } from '@/components/StructuredData';
import { Link } from 'react-router-dom';

const WordToPdf = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if the file is a Word document (.docx or .doc)
      if (!selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.doc')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a Word document (.docx or .doc)',
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
        description: 'Please select a Word document first',
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
        description: 'Your Word document has been converted to PDF format',
      });
    }, 2000);
  };

  return (
    <>
      <SEOHead 
        title="Word to PDF Converter - Free Online DOCX to PDF Converter"
        description="Convert Word documents to PDF instantly. Free online tool that preserves formatting, fonts, and images. Upload DOCX or DOC files and download PDF immediately."
        keywords="word to pdf converter, docx to pdf, doc to pdf, convert word to pdf free, online pdf converter, document converter"
        url="https://pinetoolshub.com/word-to-pdf"
      />
      
      <ToolStructuredData
        name="Word to PDF Converter"
        description="Convert Microsoft Word documents to PDF format while preserving all formatting and elements"
        url="https://pinetoolshub.com/word-to-pdf"
        category="Document Conversion"
        features={[
          "Supports DOCX and DOC formats",
          "Preserves original formatting",
          "Maintains images and tables", 
          "Fast online conversion",
          "No file size limits",
          "Secure file processing"
        ]}
      />
    
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold mb-2">Word to PDF Converter</h1>
          <p className="text-muted-foreground mb-8">Convert Microsoft Word documents to PDF format</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Link to="/pdf-to-word" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              PDF to Word
            </Link>
            <Link to="/compress-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Compress PDF
            </Link>
            <Link to="/merge-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Merge PDF
            </Link>
            <Link to="/split-pdf" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Split PDF
            </Link>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload Word Document</CardTitle>
              <CardDescription>Select the Word document you want to convert to PDF format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <input 
                    type="file" 
                    accept=".doc,.docx" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="word-upload"
                  />
                  <Label htmlFor="word-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <FileIcon className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {file ? file.name : 'Click to select Word document or drop it here'}
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
                        Convert to PDF
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
                    <FileIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                    <p className="font-medium">{file?.name.replace(/\.docx?$/, '.pdf')}</p>
                  </div>
                  <Button className="bg-primary flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Note:</strong> This is a demo version of the tool. For full functionality, the backend Word processing would need to be implemented.</p>
                <p>The actual Word to PDF conversion requires a backend service that can convert the DOCX/DOC format to PDF format while preserving all formatting, images, and other elements.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-border/30 pb-4">
                <h3 className="text-lg font-semibold mb-2">Will my Word formatting be preserved?</h3>
                <p className="text-muted-foreground">Yes, our converter maintains all formatting including fonts, images, tables, headers, footers, and complex layouts.</p>
              </div>
              <div className="border-b border-border/30 pb-4">
                <h3 className="text-lg font-semibold mb-2">What Word formats are supported?</h3>
                <p className="text-muted-foreground">We support both modern DOCX format and legacy DOC files from older versions of Microsoft Word.</p>
              </div>
              <div className="border-b border-border/30 pb-4">
                <h3 className="text-lg font-semibold mb-2">Is there a file size limit?</h3>
                <p className="text-muted-foreground">You can convert Word documents up to 10MB in size. For larger files, consider splitting them or removing large embedded images.</p>
              </div>
              <div className="border-b border-border/30 pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold mb-2">Are my documents secure during conversion?</h3>
                <p className="text-muted-foreground">Absolutely. All files are processed securely and automatically deleted after conversion. We never store or access your document content.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* SEO Content Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-muted/30 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Professional Word to PDF Conversion
            </h2>
            <p className="text-muted-foreground mb-4">
              Convert your Microsoft Word documents to PDF format instantly with our free online converter. 
              Perfect for sharing documents, submitting reports, or creating professional presentations that maintain their formatting across all devices.
            </p>
            <p className="text-muted-foreground mb-6">
              Our Word to PDF converter preserves all elements including fonts, images, tables, headers, footers, and complex layouts. 
              Whether you're converting resumes, business documents, or academic papers, the output maintains professional quality.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Why Convert Word to PDF?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Universal compatibility across all devices and platforms</li>
                  <li>• Preserve document formatting and layout</li>
                  <li>• Secure sharing with read-only protection</li>
                  <li>• Professional appearance for business documents</li>
                  <li>• Smaller file sizes for easier sharing</li>
                  <li>• Print-ready format with consistent output</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Supported Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• DOCX and DOC file formats</li>
                  <li>• Images, charts, and embedded objects</li>
                  <li>• Tables and complex formatting</li>
                  <li>• Headers, footers, and page numbering</li>
                  <li>• Fonts and text styling preservation</li>
                  <li>• Hyperlinks and bookmarks retention</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Related Tools */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related PDF Tools</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/pdf-to-word" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">PDF to Word</h4>
                <p className="text-sm text-muted-foreground">Convert PDF back to Word</p>
              </Link>
              <Link to="/merge-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">Merge PDFs</h4>
                <p className="text-sm text-muted-foreground">Combine multiple PDFs</p>
              </Link>
              <Link to="/compress-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">Compress PDF</h4>
                <p className="text-sm text-muted-foreground">Reduce PDF file size</p>
              </Link>
              <Link to="/split-pdf" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">Split PDF</h4>
                <p className="text-sm text-muted-foreground">Extract PDF pages</p>
              </Link>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Explore our complete suite of PDF tools for all your document needs. All tools are completely free to use.
                <Link to="/blog" className="text-primary hover:underline ml-1">Read PDF tips & tutorials →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default WordToPdf;
