
import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, FileText, Download, Eye, Palette, Type, Image, Layers, Wand2, Copy, ExternalLink, Instagram, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface CarouselSlide {
  id: string;
  type: 'cover' | 'content' | 'cta';
  title: string;
  content: string;
  backgroundGradient: string;
  textColor: string;
  template: string;
}

interface BlogData {
  title: string;
  content: string;
  author: string;
  keyPoints: string[];
  hashtags: string[];
}

const BlogToCarousel = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [step, setStep] = useState<'input' | 'customize' | 'preview'>('input');
  const [loading, setLoading] = useState(false);
  const [blogInput, setBlogInput] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [customization, setCustomization] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    fontFamily: 'Inter',
    fontSize: 16,
    logoUrl: '',
    brandName: '',
    includeAuthor: true,
    includeHashtags: true,
    slideCount: 5
  });

  const templates = [
    {
      id: 'modern',
      name: 'Modern Minimal',
      description: 'Clean and professional design',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'vibrant',
      name: 'Vibrant Pop',
      description: 'Bold colors and dynamic layouts',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Professional business style',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'elegant',
      name: 'Elegant Dark',
      description: 'Sophisticated dark theme',
      gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    },
    {
      id: 'creative',
      name: 'Creative Burst',
      description: 'Artistic and colorful design',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Open Sans', label: 'Open Sans' }
  ];

  const processBlogContent = async () => {
    setLoading(true);
    try {
      // Simulate AI processing of blog content
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let content = blogInput;
      if (blogUrl) {
        // In a real implementation, this would fetch and parse the URL
        content = `Sample blog content from ${blogUrl}. This is a comprehensive guide about the topic with multiple key points and actionable insights.`;
      }

      const mockBlogData: BlogData = {
        title: "Complete Guide to Digital Marketing",
        content: content,
        author: customization.brandName || "Your Brand",
        keyPoints: [
          "Understanding your target audience",
          "Creating compelling content",
          "Leveraging social media platforms",
          "Measuring and optimizing performance",
          "Building long-term relationships"
        ],
        hashtags: ["#DigitalMarketing", "#ContentStrategy", "#SocialMedia", "#BusinessGrowth", "#MarketingTips"]
      };

      setBlogData(mockBlogData);
      generateSlides(mockBlogData);
      setStep('customize');
      
      toast({
        title: "Blog Processed Successfully",
        description: `Generated ${customization.slideCount} carousel slides from your content.`
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to process blog content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlides = (data: BlogData) => {
    const newSlides: CarouselSlide[] = [];
    const selectedTemp = templates.find(t => t.id === selectedTemplate) || templates[0];

    // Cover slide
    newSlides.push({
      id: '1',
      type: 'cover',
      title: data.title,
      content: `By ${data.author}`,
      backgroundGradient: selectedTemp.gradient,
      textColor: '#ffffff',
      template: selectedTemplate
    });

    // Content slides
    const pointsPerSlide = Math.ceil(data.keyPoints.length / (customization.slideCount - 2));
    for (let i = 0; i < Math.min(customization.slideCount - 2, Math.ceil(data.keyPoints.length / pointsPerSlide)); i++) {
      const startIndex = i * pointsPerSlide;
      const endIndex = Math.min(startIndex + pointsPerSlide, data.keyPoints.length);
      const slidePoints = data.keyPoints.slice(startIndex, endIndex);
      
      newSlides.push({
        id: `${i + 2}`,
        type: 'content',
        title: `Key Point ${i + 1}`,
        content: slidePoints.join('\n\n'),
        backgroundGradient: selectedTemp.gradient,
        textColor: '#ffffff',
        template: selectedTemplate
      });
    }

    // CTA slide
    newSlides.push({
      id: `${newSlides.length + 1}`,
      type: 'cta',
      title: "Follow for More Tips!",
      content: customization.includeHashtags ? data.hashtags.join(' ') : "Stay tuned for more valuable content!",
      backgroundGradient: selectedTemp.gradient,
      textColor: '#ffffff',
      template: selectedTemplate
    });

    setSlides(newSlides);
  };

  const updateSlideContent = (slideIndex: number, field: 'title' | 'content', value: string) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex][field] = value;
    setSlides(updatedSlides);
  };

  const downloadSlides = async () => {
    setLoading(true);
    try {
      // Generate and download slides as images
      for (let i = 0; i < slides.length; i++) {
        await generateSlideImage(slides[i], i);
      }
      
      toast({
        title: "Download Complete",
        description: `Successfully downloaded ${slides.length} carousel slides.`
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download slides. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlideImage = async (slide: CarouselSlide, index: number): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for Instagram (1080x1080)
    canvas.width = 1080;
    canvas.height = 1080;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, customization.primaryColor);
    gradient.addColorStop(1, customization.secondaryColor);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add content based on slide type
    ctx.fillStyle = slide.textColor;
    ctx.textAlign = 'center';
    
    if (slide.type === 'cover') {
      // Title
      ctx.font = `bold ${customization.fontSize + 20}px ${customization.fontFamily}`;
      const titleLines = wrapText(ctx, slide.title, canvas.width - 100);
      let y = canvas.height / 2 - (titleLines.length * (customization.fontSize + 30)) / 2;
      
      titleLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, y);
        y += customization.fontSize + 30;
      });

      // Author
      ctx.font = `${customization.fontSize}px ${customization.fontFamily}`;
      ctx.fillText(slide.content, canvas.width / 2, y + 50);
    } else {
      // Content slides
      ctx.font = `bold ${customization.fontSize + 10}px ${customization.fontFamily}`;
      ctx.fillText(slide.title, canvas.width / 2, 150);
      
      ctx.font = `${customization.fontSize}px ${customization.fontFamily}`;
      const contentLines = wrapText(ctx, slide.content, canvas.width - 100);
      let y = 250;
      
      contentLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, y);
        y += customization.fontSize + 20;
      });
    }

    // Add slide number
    ctx.font = `${customization.fontSize - 4}px ${customization.fontFamily}`;
    ctx.fillText(`${index + 1}/${slides.length}`, canvas.width - 50, canvas.height - 30);

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carousel-slide-${index + 1}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Content copied successfully!"
    });
  };

  if (step === 'input') {
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
          <div className="mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
            <Instagram className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Blog to Instagram Carousel</h1>
          <p className="text-xl text-muted-foreground">
            Transform your blog posts into engaging Instagram carousel content
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Input Your Blog Content
            </CardTitle>
            <CardDescription>
              Paste your blog content or provide a URL to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Text Input</TabsTrigger>
                <TabsTrigger value="url">Blog URL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="blog-content">Blog Content</Label>
                  <Textarea
                    id="blog-content"
                    placeholder="Paste your blog post content here..."
                    value={blogInput}
                    onChange={(e) => setBlogInput(e.target.value)}
                    rows={10}
                    className="resize-none"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="blog-url">Blog URL</Label>
                  <Input
                    id="blog-url"
                    type="url"
                    placeholder="https://yourblog.com/post"
                    value={blogUrl}
                    onChange={(e) => setBlogUrl(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  id="brand-name"
                  placeholder="Your Brand"
                  value={customization.brandName}
                  onChange={(e) => setCustomization(prev => ({ ...prev, brandName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="slide-count">Number of Slides</Label>
                <Select 
                  value={customization.slideCount.toString()} 
                  onValueChange={(value) => setCustomization(prev => ({ ...prev, slideCount: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Slides</SelectItem>
                    <SelectItem value="5">5 Slides</SelectItem>
                    <SelectItem value="7">7 Slides</SelectItem>
                    <SelectItem value="10">10 Slides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={processBlogContent}
              disabled={loading || (!blogInput.trim() && !blogUrl.trim())}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing Blog Content...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Carousel
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'customize') {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setStep('input')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Input
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              onClick={() => setStep('preview')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={downloadSlides}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Download className="h-4 w-4 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Template</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {templates.map((template) => (
                      <Button
                        key={template.id}
                        variant={selectedTemplate === template.id ? "default" : "outline"}
                        className="justify-start h-auto p-3"
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          if (blogData) generateSlides(blogData);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded" 
                            style={{ background: template.gradient }}
                          />
                          <div className="text-left">
                            <div className="font-medium">{template.name}</div>
                            <div className="text-xs text-muted-foreground">{template.description}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Colors</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label className="text-xs">Primary</Label>
                      <Input
                        type="color"
                        value={customization.primaryColor}
                        onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Secondary</Label>
                      <Input
                        type="color"
                        value={customization.secondaryColor}
                        onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Font Family</Label>
                  <Select 
                    value={customization.fontFamily} 
                    onValueChange={(value) => setCustomization(prev => ({ ...prev, fontFamily: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Font Size: {customization.fontSize}px</Label>
                  <Slider
                    value={[customization.fontSize]}
                    onValueChange={([value]) => setCustomization(prev => ({ ...prev, fontSize: value }))}
                    min={12}
                    max={24}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Include Author</Label>
                    <Switch
                      checked={customization.includeAuthor}
                      onCheckedChange={(checked) => setCustomization(prev => ({ ...prev, includeAuthor: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Include Hashtags</Label>
                    <Switch
                      checked={customization.includeHashtags}
                      onCheckedChange={(checked) => setCustomization(prev => ({ ...prev, includeHashtags: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Slides Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Slides Editor
                </CardTitle>
                <CardDescription>
                  Edit your carousel slides content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {slides.map((slide, index) => (
                    <Button
                      key={slide.id}
                      variant={currentSlide === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentSlide(index)}
                      className="flex-shrink-0"
                    >
                      Slide {index + 1}
                    </Button>
                  ))}
                </div>

                {slides[currentSlide] && (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={slides[currentSlide].title}
                        onChange={(e) => updateSlideContent(currentSlide, 'title', e.target.value)}
                        placeholder="Slide title"
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={slides[currentSlide].content}
                        onChange={(e) => updateSlideContent(currentSlide, 'content', e.target.value)}
                        placeholder="Slide content"
                        rows={6}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(slides[currentSlide].title)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Title
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(slides[currentSlide].content)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Content
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Carousel Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{slides.length}</div>
                    <div className="text-sm text-muted-foreground">Total Slides</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {blogData?.keyPoints.length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Key Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {blogData?.hashtags.length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Hashtags</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    );
  }

  // Preview step would go here
  return <div>Preview functionality coming soon...</div>;
};

export default BlogToCarousel;
