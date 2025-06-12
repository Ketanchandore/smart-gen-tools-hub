
import React, { useState } from 'react';
import { ArrowLeft, ImageIcon, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface GeneratedImage {
  url: string;
  prompt: string;
}

const ImageGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [numImages, setNumImages] = useState(1);
  const [imageSize, setImageSize] = useState('512x512');
  const [style, setStyle] = useState('realistic');
  const [loading, setLoading] = useState(false);

  const imageStyles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'digital-art', label: '3D Rendering' },
    { value: 'anime', label: 'Anime' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'oil-painting', label: 'Oil Painting' },
  ];

  const imageSizes = [
    { value: '256x256', label: 'Small (256x256)' },
    { value: '512x512', label: 'Medium (512x512)' },
    { value: '1024x1024', label: 'Large (1024x1024)' },
  ];

  const generatePlaceholderImage = (text: string, style: string, size: string) => {
    // Get dimensions from size string
    const [width, height] = size.split('x').map(Number);
    
    // Generate random hue for background
    const hue = Math.floor(Math.random() * 360);
    
    // Generate random seed for "uniqueness"
    const seed = Math.floor(Math.random() * 1000000);
    
    // Different base URLs based on style
    let baseUrl;
    switch(style) {
      case 'realistic':
        baseUrl = `https://picsum.photos/${width}/${height}?random=`;
        break;
      case 'cartoon':
        baseUrl = `https://picsum.photos/${width}/${height}?grayscale&random=`;
        break;
      case 'digital-art':
        baseUrl = `https://picsum.photos/${width}/${height}?blur=2&random=`;
        break;
      case 'anime':
        baseUrl = `https://picsum.photos/${width}/${height}?blur=1&random=`;
        break;
      case 'watercolor':
        baseUrl = `https://picsum.photos/${width}/${height}?grayscale&blur=1&random=`;
        break;
      case 'oil-painting':
        baseUrl = `https://picsum.photos/${width}/${height}?grayscale&blur=2&random=`;
        break;
      default:
        baseUrl = `https://picsum.photos/${width}/${height}?random=`;
    }
    
    // Return URL with seed for uniqueness
    return baseUrl + seed;
  };

  const handleGenerateImages = () => {
    if (!prompt) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate images",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Clear previous images
    setGeneratedImages([]);

    // Simulate delay for "processing"
    setTimeout(() => {
      const newImages: GeneratedImage[] = [];
      
      for (let i = 0; i < numImages; i++) {
        newImages.push({
          url: generatePlaceholderImage(prompt, style, imageSize),
          prompt: prompt
        });
      }
      
      setGeneratedImages(newImages);
      setLoading(false);
      
      toast({
        title: "Images generated",
        description: `Generated ${numImages} image${numImages > 1 ? 's' : ''}`,
      });
    }, 2000);
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-image-${index + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: "Your image is being downloaded",
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
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI Image Generator</h1>
          <p className="text-muted-foreground mt-2">Generate images from text prompts using AI</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea 
                  id="prompt" 
                  placeholder="Describe the image you want to generate... (e.g., 'A sunset over a mountain lake with reflections of pine trees')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select 
                    value={style}
                    onValueChange={(value) => setStyle(value)}
                  >
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Image Size</Label>
                  <Select 
                    value={imageSize}
                    onValueChange={(value) => setImageSize(value)}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageSizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Number of Images: {numImages}</Label>
                  <Slider 
                    min={1} 
                    max={4} 
                    step={1} 
                    value={[numImages]} 
                    onValueChange={(value) => setNumImages(value[0])}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleGenerateImages}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Images
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {generatedImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Generated Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map((image, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="relative aspect-square overflow-hidden rounded-md">
                        <img 
                          src={image.url} 
                          alt={`Generated from: ${image.prompt}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {image.prompt}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center gap-2"
                        onClick={() => downloadImage(image.url, index)}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a demo implementation. For a real AI image generation service, you would need to integrate with a stable diffusion model or an API like DALL-E or Midjourney.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ImageGenerator;
