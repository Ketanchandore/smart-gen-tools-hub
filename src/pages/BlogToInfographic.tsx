
import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, FileText, Download, Eye, Palette, Type, Image, Layers, Wand2, Copy, BarChart2, PieChart, LineChart, TrendingUp, Zap, Grid } from 'lucide-react';
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

interface InfographicSection {
  id: string;
  type: 'header' | 'stats' | 'process' | 'comparison' | 'timeline' | 'conclusion';
  title: string;
  content: string[];
  data?: number[];
  labels?: string[];
}

interface BlogData {
  title: string;
  content: string;
  keyPoints: string[];
  statistics: { label: string; value: string }[];
  processes: string[];
}

const BlogToInfographic = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [step, setStep] = useState<'input' | 'customize' | 'preview'>('input');
  const [loading, setLoading] = useState(false);
  const [blogInput, setBlogInput] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [sections, setSections] = useState<InfographicSection[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [currentSection, setCurrentSection] = useState(0);
  const [customization, setCustomization] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    fontFamily: 'Inter',
    fontSize: 16,
    logoUrl: '',
    brandName: '',
    layout: 'vertical',
    includeCharts: true,
    includeIcons: true,
    backgroundStyle: 'gradient'
  });

  const templates = [
    {
      id: 'modern',
      name: 'Modern Business',
      description: 'Clean and professional design',
      preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'creative',
      name: 'Creative Flow',
      description: 'Artistic and vibrant design',
      preview: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'corporate',
      name: 'Corporate Blue',
      description: 'Professional business style',
      preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant',
      preview: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Sophisticated dark design',
      preview: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    }
  ];

  const layoutOptions = [
    { value: 'vertical', label: 'Vertical Flow' },
    { value: 'horizontal', label: 'Horizontal Layout' },
    { value: 'grid', label: 'Grid Layout' },
    { value: 'timeline', label: 'Timeline Style' }
  ];

  const backgroundStyles = [
    { value: 'gradient', label: 'Gradient Background' },
    { value: 'solid', label: 'Solid Color' },
    { value: 'pattern', label: 'Pattern Background' },
    { value: 'minimal', label: 'Minimal White' }
  ];

  const processBlogContent = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let content = blogInput;
      if (blogUrl) {
        content = `Sample comprehensive blog content from ${blogUrl}. This covers digital marketing strategies, social media optimization, content creation techniques, and performance analytics.`;
      }

      const mockBlogData: BlogData = {
        title: "The Complete Guide to Digital Marketing Success",
        content: content,
        keyPoints: [
          "Understand your target audience demographics",
          "Create compelling and valuable content",
          "Leverage multiple social media platforms",
          "Implement SEO best practices",
          "Track and analyze performance metrics",
          "Build lasting customer relationships"
        ],
        statistics: [
          { label: "Increase in Engagement", value: "250%" },
          { label: "Lead Generation Growth", value: "180%" },
          { label: "ROI Improvement", value: "320%" },
          { label: "Customer Retention", value: "95%" }
        ],
        processes: [
          "Research Target Audience",
          "Develop Content Strategy",
          "Create Engaging Content",
          "Distribute Across Channels",
          "Monitor Performance",
          "Optimize & Improve"
        ]
      };

      setBlogData(mockBlogData);
      generateInfographicSections(mockBlogData);
      setStep('customize');
      
      toast({
        title: "Blog Processed Successfully",
        description: "Generated infographic sections from your content."
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

  const generateInfographicSections = (data: BlogData) => {
    const newSections: InfographicSection[] = [];

    // Header section
    newSections.push({
      id: '1',
      type: 'header',
      title: data.title,
      content: [customization.brandName || "Your Brand"]
    });

    // Statistics section
    if (data.statistics.length > 0) {
      newSections.push({
        id: '2',
        type: 'stats',
        title: "Key Statistics",
        content: data.statistics.map(stat => `${stat.label}: ${stat.value}`),
        data: data.statistics.map(() => Math.floor(Math.random() * 100)),
        labels: data.statistics.map(stat => stat.label)
      });
    }

    // Process section
    if (data.processes.length > 0) {
      newSections.push({
        id: '3',
        type: 'process',
        title: "Step-by-Step Process",
        content: data.processes
      });
    }

    // Key points section
    newSections.push({
      id: '4',
      type: 'comparison',
      title: "Key Insights",
      content: data.keyPoints
    });

    // Timeline section
    newSections.push({
      id: '5',
      type: 'timeline',
      title: "Implementation Timeline",
      content: [
        "Week 1-2: Research & Planning",
        "Week 3-4: Content Creation",
        "Week 5-6: Campaign Launch",
        "Week 7-8: Optimization"
      ]
    });

    // Conclusion section
    newSections.push({
      id: '6',
      type: 'conclusion',
      title: "Key Takeaways",
      content: [
        "Consistent strategy drives results",
        "Data-driven decisions improve ROI",
        "Continuous optimization is essential"
      ]
    });

    setSections(newSections);
  };

  const updateSectionContent = (sectionIndex: number, field: 'title' | 'content', value: string | string[]) => {
    const updatedSections = [...sections];
    if (field === 'content' && Array.isArray(value)) {
      updatedSections[sectionIndex][field] = value;
    } else if (field === 'title' && typeof value === 'string') {
      updatedSections[sectionIndex][field] = value;
    }
    setSections(updatedSections);
  };

  const downloadInfographic = async () => {
    setLoading(true);
    try {
      await generateInfographicImage();
      toast({
        title: "Download Complete",
        description: "Successfully downloaded your infographic."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download infographic. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateInfographicImage = async (): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for high-quality infographic
    canvas.width = 1200;
    canvas.height = 1600;

    // Background
    if (customization.backgroundStyle === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, customization.primaryColor);
      gradient.addColorStop(1, customization.secondaryColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = customization.primaryColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render sections
    let yPosition = 50;
    const sectionHeight = (canvas.height - 100) / sections.length;

    sections.forEach((section, index) => {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${customization.fontSize + 8}px ${customization.fontFamily}`;
      ctx.textAlign = 'center';
      
      // Section title
      ctx.fillText(section.title, canvas.width / 2, yPosition + 40);
      
      // Section content
      ctx.font = `${customization.fontSize}px ${customization.fontFamily}`;
      let contentY = yPosition + 80;
      
      section.content.forEach((item, itemIndex) => {
        if (contentY < yPosition + sectionHeight - 20) {
          const lines = wrapText(ctx, item, canvas.width - 100);
          lines.forEach(line => {
            ctx.fillText(line, canvas.width / 2, contentY);
            contentY += customization.fontSize + 10;
          });
          contentY += 10;
        }
      });

      yPosition += sectionHeight;
    });

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'infographic.png';
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
          <div className="mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
            <BarChart2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Blog to Infographic Converter</h1>
          <p className="text-xl text-muted-foreground">
            Transform your blog posts into stunning visual infographics
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
                <Label htmlFor="layout">Layout Style</Label>
                <Select 
                  value={customization.layout} 
                  onValueChange={(value) => setCustomization(prev => ({ ...prev, layout: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {layoutOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
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
                  Generate Infographic
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
              onClick={downloadInfographic}
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
                  Download
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
                          if (blogData) generateInfographicSections(blogData);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded" 
                            style={{ background: template.preview }}
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
                  <div className="grid grid-cols-3 gap-2 mt-2">
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
                    <div>
                      <Label className="text-xs">Accent</Label>
                      <Input
                        type="color"
                        value={customization.accentColor}
                        onChange={(e) => setCustomization(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Background Style</Label>
                  <Select 
                    value={customization.backgroundStyle} 
                    onValueChange={(value) => setCustomization(prev => ({ ...prev, backgroundStyle: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
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
                    <Label>Include Charts</Label>
                    <Switch
                      checked={customization.includeCharts}
                      onCheckedChange={(checked) => setCustomization(prev => ({ ...prev, includeCharts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Include Icons</Label>
                    <Switch
                      checked={customization.includeIcons}
                      onCheckedChange={(checked) => setCustomization(prev => ({ ...prev, includeIcons: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sections Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Infographic Sections
                </CardTitle>
                <CardDescription>
                  Edit your infographic sections content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {sections.map((section, index) => (
                    <Button
                      key={section.id}
                      variant={currentSection === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentSection(index)}
                      className="flex-shrink-0"
                    >
                      {section.type === 'header' && <Type className="h-3 w-3 mr-1" />}
                      {section.type === 'stats' && <BarChart2 className="h-3 w-3 mr-1" />}
                      {section.type === 'process' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {section.type === 'comparison' && <PieChart className="h-3 w-3 mr-1" />}
                      {section.type === 'timeline' && <LineChart className="h-3 w-3 mr-1" />}
                      {section.type === 'conclusion' && <Zap className="h-3 w-3 mr-1" />}
                      Section {index + 1}
                    </Button>
                  ))}
                </div>

                {sections[currentSection] && (
                  <div className="space-y-4">
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={sections[currentSection].title}
                        onChange={(e) => updateSectionContent(currentSection, 'title', e.target.value)}
                        placeholder="Section title"
                      />
                    </div>
                    <div>
                      <Label>Content Items</Label>
                      <div className="space-y-2">
                        {sections[currentSection].content.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => {
                                const newContent = [...sections[currentSection].content];
                                newContent[index] = e.target.value;
                                updateSectionContent(currentSection, 'content', newContent);
                              }}
                              placeholder={`Content item ${index + 1}`}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(item)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newContent = [...sections[currentSection].content, "New item"];
                          updateSectionContent(currentSection, 'content', newContent);
                        }}
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Infographic Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{sections.length}</div>
                    <div className="text-sm text-muted-foreground">Total Sections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {blogData?.keyPoints.length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Key Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {blogData?.statistics.length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Statistics</div>
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

  return <div>Preview functionality coming soon...</div>;
};

export default BlogToInfographic;
