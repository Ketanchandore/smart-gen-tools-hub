
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Image, Upload, Download, Info, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ImageCompressor = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]); // Default quality is 80%
  const [compressing, setCompressing] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);

  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!validImageTypes.includes(selectedFile.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a JPG, PNG, GIF or WebP image',
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
      setOriginalSize(selectedFile.size);
      setCompressed(false);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCompress = () => {
    if (!file || !imagePreview) {
      toast({
        title: 'No image selected',
        description: 'Please select an image file first',
        variant: 'destructive',
      });
      return;
    }

    setCompressing(true);
    
    // Simulate compression process
    setTimeout(() => {
      // In real implementation, this would use canvas to compress the image
      // For demo purposes, we'll just fake a compressed size
      setCompressing(false);
      setCompressed(true);
      
      // Fake a compressed size based on quality setting
      const fakeCompressedSize = Math.round(originalSize * (quality[0] / 100) * 0.8);
      setCompressedSize(fakeCompressedSize);
      
      toast({
        title: 'Compression complete',
        description: `Reduced from ${formatBytes(originalSize)} to ${formatBytes(fakeCompressedSize)} (${Math.round((1 - fakeCompressedSize / originalSize) * 100)}% smaller)`,
      });
    }, 1500);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };

  const clearImage = () => {
    setFile(null);
    setImagePreview(null);
    setCompressed(false);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
          <p className="text-muted-foreground mb-8">Reduce image file size while preserving quality</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select the image you want to compress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png,.gif,.webp" 
                      onChange={handleFileChange} 
                      className="hidden" 
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Image className="h-10 w-10 text-muted-foreground" />
                      <span className="text-lg font-medium">Click to select an image or drop it here</span>
                      <span className="text-sm text-muted-foreground">JPG, PNG, GIF, or WebP (max 10MB)</span>
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-auto rounded-lg object-contain max-h-[300px]" 
                      />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={clearImage}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Original size: {formatBytes(originalSize)}</span>
                      {compressed && <span>Compressed: {formatBytes(compressedSize)}</span>}
                    </div>
                  </div>
                )}
                
                {imagePreview && (
                  <>
                    <div className="space-y-2 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label>Quality: {quality[0]}%</Label>
                      </div>
                      <Slider 
                        value={quality} 
                        onValueChange={setQuality} 
                        min={10} 
                        max={100} 
                        step={5} 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Smaller file</span>
                        <span>Better quality</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button 
                        onClick={handleCompress} 
                        disabled={!file || compressing} 
                        className="bg-primary flex items-center gap-2"
                      >
                        {compressing ? (
                          <>Compressing...</>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Compress Image
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {compressed && (
            <Card>
              <CardHeader>
                <CardTitle>Compression Complete</CardTitle>
                <CardDescription>Your image has been successfully compressed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <img 
                      src={imagePreview} 
                      alt="Compressed Preview" 
                      className="max-h-[200px] mx-auto object-contain mb-4" 
                    />
                    <div className="flex justify-between text-sm mb-4">
                      <span>Original: {formatBytes(originalSize)}</span>
                      <span>Compressed: {formatBytes(compressedSize)}</span>
                      <span>Saved: {Math.round((1 - compressedSize / originalSize) * 100)}%</span>
                    </div>
                  </div>
                  <Button className="bg-primary flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Compressed Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Note:</strong> This is a demo version of the tool. For full functionality, image compression would need to be implemented.</p>
                <p>In a complete implementation, this tool would use the Canvas API or a dedicated image compression library to actually reduce the file size while maintaining visual quality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImageCompressor;
