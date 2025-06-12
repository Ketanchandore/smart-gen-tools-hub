
import React, { useState } from 'react';
import { Wand2, ArrowLeft, Upload, Download, RefreshCw, Trash2, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

type EnhanceMode = 'enhance' | 'remove-bg';

const ImageEnhancer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [mode, setMode] = useState<EnhanceMode>('enhance');
  const [enhanceLevel, setEnhanceLevel] = useState(50);
  const [processing, setProcessing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      setResultImage(null);
    }
  };

  const processImage = () => {
    if (!imagePreview) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      // For demo purposes, we'll use a placeholder image for the result
      const mockProcessedImage = mode === 'enhance'
        ? `https://picsum.photos/800/600?random=${Date.now()}`
        : `https://picsum.photos/800/600?grayscale&random=${Date.now()}`; // simulated bg removal
      
      setResultImage(mockProcessedImage);
      setProcessing(false);
      
      toast({
        title: `Image ${mode === 'enhance' ? 'enhanced' : 'background removed'}`,
        description: `Your image has been processed successfully`,
      });
    }, 2000);
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setResultImage(null);
  };

  const downloadImage = () => {
    if (!resultImage) return;
    
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = `processed-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: "Your processed image is being downloaded",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
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
            <Wand2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Image Enhancer / Background Remover</h1>
          <p className="text-muted-foreground mt-2">Enhance images and remove backgrounds with AI</p>
        </div>
        
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="process" disabled={!imagePreview}>Process</TabsTrigger>
            <TabsTrigger value="result" disabled={!resultImage}>Result</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardContent className="pt-6">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="hidden" 
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Image className="h-10 w-10 text-muted-foreground" />
                      <span className="text-lg font-medium">Click to select image or drop it here</span>
                      <span className="text-sm text-muted-foreground">
                        PNG, JPG, WebP or JPEG (max 10MB)
                      </span>
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative max-h-[400px] overflow-hidden rounded-md">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-[400px] object-contain"
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
                    <div className="flex justify-center">
                      <Button onClick={() => document.getElementById('tab-trigger-process')?.click()}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="process">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Original Image</h3>
                    {imagePreview && (
                      <div className="relative rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Original" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Processing Options</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Mode</Label>
                        <RadioGroup 
                          defaultValue={mode} 
                          onValueChange={(value) => setMode(value as EnhanceMode)}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="enhance" id="enhance" />
                            <Label htmlFor="enhance">Enhance Image Quality</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="remove-bg" id="remove-bg" />
                            <Label htmlFor="remove-bg">Remove Background</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {mode === 'enhance' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Enhancement Level: {enhanceLevel}%</Label>
                          </div>
                          <Slider 
                            value={[enhanceLevel]} 
                            onValueChange={(values) => setEnhanceLevel(values[0])} 
                            min={0} 
                            max={100} 
                            step={1}
                          />
                        </div>
                      )}
                      
                      <Button 
                        onClick={processImage}
                        disabled={processing || !imagePreview}
                        className="w-full flex items-center gap-2"
                      >
                        {processing ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4" />
                            {mode === 'enhance' ? 'Enhance Image' : 'Remove Background'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Original Image</h3>
                    {imagePreview && (
                      <div className="relative rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Original" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Processed Result</h3>
                    {resultImage && (
                      <div className="relative rounded-md overflow-hidden">
                        <img 
                          src={resultImage} 
                          alt="Result" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('tab-trigger-process')?.click()}
                  >
                    Try Different Options
                  </Button>
                  <Button 
                    onClick={downloadImage}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a demo implementation. For a real image enhancement service, you would need to integrate with an AI image processing API or use a library like TensorFlow.js.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ImageEnhancer;
