
import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, Download, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { downloadPdf } from '@/utils/pdfUtils';

interface PDFToolTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptFiles: string;
  multiple: boolean;
  processFunction: (files: File[]) => Promise<Uint8Array>;
  outputFilename: string;
  children?: React.ReactNode;
}

const PDFToolTemplate: React.FC<PDFToolTemplateProps> = ({
  title,
  description,
  icon,
  acceptFiles,
  multiple,
  processFunction,
  outputFilename,
  children
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => {
      if (acceptFiles.includes('.pdf') && file.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a PDF file`,
          variant: 'destructive',
        });
        return false;
      }
      
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 20MB`,
          variant: 'destructive',
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setFiles(multiple ? [...files, ...validFiles] : validFiles);
      setCompleted(false);
    }
  }, [acceptFiles, files, multiple, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setCompleted(false);
  }, [files]);

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
      downloadPdf(result, outputFilename);
      setCompleted(true);
      
      toast({
        title: 'Processing complete',
        description: 'Your file has been processed and downloaded',
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: 'Processing failed',
        description: 'An error occurred while processing your files',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
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
          <CardDescription>
            {multiple ? 'Select multiple files to process' : 'Select a file to process'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input 
                type="file" 
                accept={acceptFiles}
                multiple={multiple}
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">
                  Drop files here or click to select
                </span>
                <span className="text-sm text-muted-foreground">
                  {acceptFiles} files up to 20MB
                </span>
              </Label>
            </div>

            {children && (
              <div className="space-y-4">
                {children}
              </div>
            )}

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files ({files.length})</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <Button 
                onClick={handleProcess} 
                disabled={files.length === 0 || processing} 
                className="bg-primary flex items-center gap-2 min-w-[150px]"
              >
                {processing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Process Files
                  </>
                )}
              </Button>
            </div>

            {completed && (
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-700 dark:text-green-300">
                  Processing completed successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your file has been downloaded.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFToolTemplate;
