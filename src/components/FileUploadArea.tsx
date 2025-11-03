import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadAreaProps {
  acceptFiles: string;
  multiple: boolean;
  processFunction: (files: File[]) => Promise<Uint8Array>;
  outputFilename: string;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  acceptFiles, 
  multiple, 
  processFunction,
  outputFilename 
}) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [outputData, setOutputData] = useState<Uint8Array | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      setProcessed(false);
      setOutputData(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
      setProcessed(false);
      setOutputData(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const result = await processFunction(files);
      setOutputData(result);
      setProcessed(true);
      toast({
        title: "Success",
        description: "Your files have been processed",
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing your files",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputData) return;

    const blob = new Blob([new Uint8Array(outputData)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outputFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setProcessed(false);
    setOutputData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              {files.length > 0 ? `${files.length} file(s) selected` : 'Drop your files here'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              {multiple ? 'Multiple files supported' : 'Single file only'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptFiles}
              multiple={multiple}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {!processed && (
              <Button
                onClick={handleProcess}
                disabled={files.length === 0 || processing}
                className="flex-1"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Process Files'
                )}
              </Button>
            )}

            {processed && (
              <>
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Result
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                >
                  Process Another
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadArea;
