
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FileIcon, Upload, Download, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Word to PDF Converter</h1>
          <p className="text-muted-foreground mb-8">Convert Microsoft Word documents to PDF format</p>

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
        </div>
      </div>
    </Layout>
  );
};

export default WordToPdf;
