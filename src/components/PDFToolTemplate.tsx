
import React, { useState } from 'react';
import { ArrowLeft, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface PDFToolTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptFiles?: string;
  multiple?: boolean;
  processFunction: (files: File[], options?: any) => Promise<Uint8Array>;
  children?: React.ReactNode;
  outputFilename?: string;
}

const PDFToolTemplate: React.FC<PDFToolTemplateProps> = ({
  title,
  description,
  icon,
  acceptFiles = ".pdf",
  multiple = false,
  processFunction,
  children,
  outputFilename = "processed.pdf"
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
      setProcessed(false);
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select files to process',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);
    try {
      const result = await processFunction(files);
      setResult(result);
      setProcessed(true);
      toast({
        title: 'Processing complete',
        description: 'Your file has been processed successfully',
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: 'Processing failed',
        description: 'An error occurred while processing your file',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = outputFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          {icon}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Select the files you want to process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
              <input 
                type="file" 
                accept={acceptFiles}
                multiple={multiple}
                onChange={handleFileChange} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">
                  {files.length > 0 
                    ? `${files.length} file(s) selected` 
                    : `Click to select ${multiple ? 'files' : 'file'} or drop here`
                  }
                </span>
                {files.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {files.map(file => file.name).join(', ')}
                  </div>
                )}
              </Label>
            </div>

            {children}

            <div className="flex justify-center">
              <Button 
                onClick={handleProcess} 
                disabled={files.length === 0 || processing} 
                className="bg-primary flex items-center gap-2"
              >
                {processing ? 'Processing...' : 'Process Files'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {processed && result && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Complete</CardTitle>
            <CardDescription>Your file has been successfully processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button 
                onClick={handleDownload}
                className="bg-primary flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Processed File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PDFToolTemplate;
