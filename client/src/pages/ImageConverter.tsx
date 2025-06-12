
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ImageIcon, Upload, Download, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type ImageFormat = 'png' | 'jpg' | 'webp' | 'avif';

const ImageConverter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('jpg');
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if the file is an image
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }
      
      if (selectedFile.size > 15 * 1024 * 1024) { // 15MB limit
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 15MB',
          variant: 'destructive',
        });
        return;
      }
      
      setFile(selectedFile);
      setConverted(false);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleConvert = () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select an image file first',
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
        title: 'Image converted',
        description: `Image has been converted to ${targetFormat.toUpperCase()} format`,
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Image Format Converter</h1>
          <p className="text-muted-foreground mb-8">Convert images between different formats (PNG, JPG, WebP, AVIF)</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select the image you want to convert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {file ? file.name : 'Click to select image or drop it here'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max file size: 15MB'}
                    </span>
                  </Label>
                </div>
                
                {imagePreview && (
                  <div className="flex justify-center">
                    <div className="relative max-w-xs max-h-64 overflow-hidden rounded-md">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="object-contain max-h-64 mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {file && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Output Format</CardTitle>
                <CardDescription>Choose the image format you want to convert to</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={targetFormat} 
                  onValueChange={(value) => setTargetFormat(value as ImageFormat)}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  <div>
                    <RadioGroupItem value="jpg" id="jpg" className="peer sr-only" />
                    <Label
                      htmlFor="jpg"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                    >
                      <span className="text-xl font-bold">JPG</span>
                      <span className="text-xs text-muted-foreground">Compressed</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="png" id="png" className="peer sr-only" />
                    <Label
                      htmlFor="png"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                    >
                      <span className="text-xl font-bold">PNG</span>
                      <span className="text-xs text-muted-foreground">Lossless</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="webp" id="webp" className="peer sr-only" />
                    <Label
                      htmlFor="webp"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                    >
                      <span className="text-xl font-bold">WebP</span>
                      <span className="text-xs text-muted-foreground">Modern</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="avif" id="avif" className="peer sr-only" />
                    <Label
                      htmlFor="avif"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                    >
                      <span className="text-xl font-bold">AVIF</span>
                      <span className="text-xs text-muted-foreground">Advanced</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={handleConvert} 
                    disabled={converting} 
                    className="bg-primary flex items-center gap-2"
                  >
                    {converting ? (
                      <>Converting...</>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Convert Image
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {converted && (
            <Card>
              <CardHeader>
                <CardTitle>Conversion Complete</CardTitle>
                <CardDescription>Your image has been successfully converted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <ImageIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                    <p className="font-medium">{file?.name.split('.').slice(0, -1).join('.') + '.' + targetFormat}</p>
                  </div>
                  <Button className="bg-primary flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Converted Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Note:</strong> This is a demo version of the tool. For full functionality, the backend image processing would need to be implemented.</p>
                <p>The actual image conversion requires a backend service that can handle various image formats and maintain quality during the conversion process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImageConverter;
