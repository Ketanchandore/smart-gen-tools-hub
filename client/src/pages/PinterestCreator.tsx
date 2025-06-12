
import React, { useState } from 'react';
import { Image, ArrowLeft, Sparkles, RefreshCw, Download, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface PinterestTemplate {
  id: string;
  name: string;
  aspect: string;
  previewUrl: string;
}

const PinterestCreator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern-1');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [accentColor, setAccentColor] = useState('#ff4477');
  const [includeImage, setIncludeImage] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);

  // Template options
  const templates: PinterestTemplate[] = [
    { id: 'modern-1', name: 'Modern Minimal', aspect: '2:3', previewUrl: 'https://picsum.photos/400/600' },
    { id: 'bold-text', name: 'Bold Text', aspect: '2:3', previewUrl: 'https://picsum.photos/400/600?grayscale' },
    { id: 'quote', name: 'Quote Card', aspect: '2:3', previewUrl: 'https://picsum.photos/400/600?blur=2' },
    { id: 'product', name: 'Product Showcase', aspect: '2:3', previewUrl: 'https://picsum.photos/400/600?blur=1' },
    { id: 'infographic', name: 'Simple Infographic', aspect: '1:2', previewUrl: 'https://picsum.photos/300/600' },
  ];

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
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePin = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a title for your Pinterest pin",
        variant: "destructive",
      });
      return;
    }
    
    if (includeImage && !imagePreview && !imageUrl) {
      toast({
        title: "Image required",
        description: "Please upload an image or provide an image URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate pin generation with delay
    setTimeout(() => {
      // Generate a placeholder pin using a random image and the provided options
      const templateId = templates.find(t => t.id === selectedTemplate)?.id || templates[0].id;
      
      // For demo, we'll just use a different placeholder image to represent the "generated" pin
      let pinImageUrl = '';
      switch(templateId) {
        case 'modern-1':
          pinImageUrl = 'https://picsum.photos/600/900?random=1';
          break;
        case 'bold-text':
          pinImageUrl = 'https://picsum.photos/600/900?random=2';
          break;
        case 'quote':
          pinImageUrl = 'https://picsum.photos/600/900?random=3';
          break;
        case 'product':
          pinImageUrl = 'https://picsum.photos/600/900?random=4';
          break;
        case 'infographic':
          pinImageUrl = 'https://picsum.photos/450/900?random=5';
          break;
        default:
          pinImageUrl = 'https://picsum.photos/600/900?random=0';
      }
      
      setGeneratedPin(pinImageUrl);
      setLoading(false);
      
      toast({
        title: "Pin generated",
        description: "Your Pinterest pin has been created",
      });
    }, 2000);
  };

  const downloadPin = () => {
    if (!generatedPin) return;
    
    const a = document.createElement('a');
    a.href = generatedPin;
    a.download = 'pinterest-pin.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: "Your Pinterest pin is being downloaded",
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
            <Image className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Pinterest Pin Creator</h1>
          <p className="text-muted-foreground mt-2">Create eye-catching Pinterest pins with AI</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Create Your Pin</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Pin Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter a catchy title for your pin"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Add a description to your pin"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="template">Choose Template</Label>
                    <Select 
                      value={selectedTemplate}
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name} ({template.aspect})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bg-color">Background</Label>
                      <div className="flex gap-2 items-center">
                        <div 
                          className="w-8 h-8 rounded-md border"
                          style={{ backgroundColor: backgroundColor }}
                        ></div>
                        <Input 
                          id="bg-color" 
                          type="color" 
                          value={backgroundColor} 
                          onChange={(e) => setBackgroundColor(e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex gap-2 items-center">
                        <div 
                          className="w-8 h-8 rounded-md border"
                          style={{ backgroundColor: textColor }}
                        ></div>
                        <Input 
                          id="text-color" 
                          type="color" 
                          value={textColor} 
                          onChange={(e) => setTextColor(e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2 items-center">
                        <div 
                          className="w-8 h-8 rounded-md border"
                          style={{ backgroundColor: accentColor }}
                        ></div>
                        <Input 
                          id="accent-color" 
                          type="color" 
                          value={accentColor} 
                          onChange={(e) => setAccentColor(e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-image">Include Image</Label>
                    <Switch 
                      id="include-image"
                      checked={includeImage}
                      onCheckedChange={setIncludeImage}
                    />
                  </div>
                  
                  {includeImage && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Image</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="upload-image" className="block mb-1 text-sm">Upload Image</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                              <input 
                                id="upload-image" 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="hidden" 
                              />
                              <Label htmlFor="upload-image" className="cursor-pointer flex flex-col items-center gap-2">
                                <Plus className="h-6 w-6 text-muted-foreground" />
                                <span className="text-xs">Click to upload</span>
                              </Label>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="image-url" className="block mb-1 text-sm">OR Image URL</Label>
                            <Input 
                              id="image-url" 
                              placeholder="https://..."
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {imagePreview && (
                        <div className="relative w-full h-40 rounded-md overflow-hidden">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="object-cover w-full h-full" 
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => {
                              setImagePreview(null);
                              setImageFile(null);
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    onClick={generatePin}
                    disabled={loading}
                    className="w-full flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating Pin...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Pinterest Pin
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                
                <div className="flex flex-col items-center justify-center">
                  {generatedPin ? (
                    <div className="space-y-4">
                      <div className="w-full max-w-md mx-auto border rounded-md overflow-hidden shadow-md">
                        <img 
                          src={generatedPin} 
                          alt="Generated Pinterest Pin" 
                          className="w-full h-auto" 
                        />
                      </div>
                      
                      <Button 
                        onClick={downloadPin}
                        className="w-full flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Pin
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-md w-full">
                      <Image className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your Pinterest pin preview will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Tips for Great Pinterest Pins</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Use vertical images with a 2:3 aspect ratio</li>
                <li>Include clear, bold text that's easy to read</li>
                <li>Use contrasting colors for better visibility</li>
                <li>Keep your design clean and focused</li>
                <li>Include a clear call-to-action</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a demo implementation. For a real Pinterest pin creator service, you would need to integrate with image generation and design APIs.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PinterestCreator;
