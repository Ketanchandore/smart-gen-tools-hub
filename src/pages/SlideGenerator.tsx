
import React, { useState, useRef } from 'react';
import { ArrowLeft, Presentation, Wand2, Download, Copy, Eye, Zap, Layout, Type, Image, RefreshCw, ThumbsUp, ThumbsDown, PanelLeft, PanelRight, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface Slide {
  id: string;
  type: 'title' | 'content' | 'section' | 'image' | 'quote' | 'end';
  title: string;
  content: string[];
  theme: string;
  layout: 'left' | 'center' | 'right' | 'two-column';
}

interface Presentation {
  title: string;
  theme: string;
  fontFamily: string;
  slides: Slide[];
}

interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  font: string;
}

const SlideGenerator = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingPreview, setGeneratingPreview] = useState(false);
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('professional');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [includeTableOfContents, setIncludeTableOfContents] = useState(true);
  
  const themes: ThemeOption[] = [
    {
      id: 'professional',
      name: 'Professional Blue',
      primary: '#1a73e8',
      secondary: '#4285f4',
      background: '#ffffff',
      font: '#202124'
    },
    {
      id: 'creative',
      name: 'Creative Purple',
      primary: '#9c27b0',
      secondary: '#ce93d8',
      background: '#f5f5f5',
      font: '#3c4043'
    },
    {
      id: 'minimal',
      name: 'Minimal Black',
      primary: '#202124',
      secondary: '#5f6368',
      background: '#ffffff',
      font: '#202124'
    },
    {
      id: 'vibrant',
      name: 'Vibrant Gradient',
      primary: '#f44336',
      secondary: '#ff9800',
      background: '#fafafa',
      font: '#3c4043'
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      primary: '#bb86fc',
      secondary: '#03dac6',
      background: '#121212',
      font: '#e1e1e1'
    }
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Montserrat', 'Open Sans', 'Playfair Display'
  ];

  const getSampleText = () => {
    return `# Introduction to Machine Learning

## What is Machine Learning?
Machine learning is a subset of artificial intelligence that focuses on building systems that can learn from and make decisions based on data.

Key characteristics of machine learning:
- Data-driven decision making
- Ability to improve over time
- Automation of complex tasks

## Types of Machine Learning
There are three main types of machine learning:

1. Supervised Learning
- Uses labeled training data
- Examples: Classification, Regression
- Applications: Spam detection, image recognition

2. Unsupervised Learning
- Works with unlabeled data
- Examples: Clustering, Association
- Applications: Customer segmentation, anomaly detection

3. Reinforcement Learning
- Learning through trial and error
- Reward-based system
- Applications: Game AI, robotics, self-driving cars

## Machine Learning Process
The typical machine learning workflow:
1. Data collection and preparation
2. Feature selection and engineering
3. Model selection and training
4. Evaluation and tuning
5. Deployment and monitoring

## Popular Machine Learning Algorithms
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines
- Neural Networks

## Challenges in Machine Learning
Common challenges faced in machine learning projects:
- Data quality and quantity issues
- Overfitting and underfitting
- Interpretability vs. accuracy
- Ethical considerations and bias

## Future Trends
Emerging trends in the field:
- Automated machine learning (AutoML)
- Explainable AI
- Edge ML (on-device learning)
- Few-shot and zero-shot learning

# Conclusion
Machine learning continues to transform industries and create new opportunities for innovation.`;
  };

  const generateSlides = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text content first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Process the text into slides
      const slides = processTextToSlides();
      
      // Create presentation object
      const newPresentation: Presentation = {
        title: title || 'Generated Presentation',
        theme: selectedTheme,
        fontFamily: selectedFont,
        slides
      };
      
      setPresentation(newPresentation);
      setCurrentSlide(0);
      
      toast({
        title: "Slides Generated!",
        description: `Created ${slides.length} slides from your content.`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate slides. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const processTextToSlides = (): Slide[] => {
    const slides: Slide[] = [];
    const lines = inputText.split('\n').filter(line => line.trim());
    
    // Add title slide
    slides.push({
      id: '1',
      type: 'title',
      title: title || 'Generated Presentation',
      content: [],
      theme: selectedTheme,
      layout: 'center'
    });

    // Process headings and content
    let currentHeading = '';
    let currentContent: string[] = [];
    let slideCounter = 2;
    let sectionCounter = 0;

    const addContentSlide = (heading: string, content: string[]) => {
      if (heading && content.length > 0) {
        slides.push({
          id: slideCounter.toString(),
          type: 'content',
          title: heading,
          content,
          theme: selectedTheme,
          layout: content.length > 3 ? 'two-column' : 'left'
        });
        slideCounter++;
      }
    };

    // Add table of contents if requested
    if (includeTableOfContents) {
      const tocContent = [];
      let mainHeadings = lines.filter(line => line.startsWith('# ') || line.startsWith('## '))
        .map(line => line.replace(/^#+ /, '').trim());
      
      // Limit to main headings only
      mainHeadings = mainHeadings.filter((_, i) => i < 10);
      
      for (const heading of mainHeadings) {
        tocContent.push(heading);
      }
      
      slides.push({
        id: slideCounter.toString(),
        type: 'section',
        title: 'Outline',
        content: tocContent,
        theme: selectedTheme,
        layout: 'center'
      });
      slideCounter++;
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Main heading (new section)
      if (line.startsWith('# ')) {
        // Save previous content if exists
        if (currentHeading && currentContent.length > 0) {
          addContentSlide(currentHeading, currentContent);
        }
        
        // Create section slide
        const heading = line.replace(/^# /, '').trim();
        slides.push({
          id: slideCounter.toString(),
          type: 'section',
          title: heading,
          content: [],
          theme: selectedTheme,
          layout: 'center'
        });
        slideCounter++;
        sectionCounter++;
        
        // Reset for new content under this heading
        currentHeading = '';
        currentContent = [];
      }
      // Subheading (new content slide)
      else if (line.startsWith('## ')) {
        // Save previous content if exists
        if (currentHeading && currentContent.length > 0) {
          addContentSlide(currentHeading, currentContent);
        }
        
        // Start new content slide
        currentHeading = line.replace(/^## /, '').trim();
        currentContent = [];
      }
      // List items or regular content
      else {
        // Format list items
        if (line.startsWith('- ') || line.startsWith('* ')) {
          currentContent.push(line);
        }
        // Numbered list
        else if (/^\d+\./.test(line)) {
          currentContent.push(line);
        }
        // Empty line could be a separator
        else if (line === '' && currentContent.length > 0) {
          // Skip empty lines
        }
        // Regular content
        else if (line) {
          // Check if it looks like a quote
          if (line.startsWith('>')) {
            // If we have existing content, add it first
            if (currentHeading && currentContent.length > 0) {
              addContentSlide(currentHeading, currentContent);
              currentContent = [];
            }
            
            // Create quote slide
            slides.push({
              id: slideCounter.toString(),
              type: 'quote',
              title: '',
              content: [line.replace(/^>/, '').trim()],
              theme: selectedTheme,
              layout: 'center'
            });
            slideCounter++;
          } else {
            currentContent.push(line);
          }
        }
      }
      
      // If we've accumulated enough content for a slide, create one
      if (currentContent.length >= 8) {
        addContentSlide(currentHeading, currentContent);
        currentHeading = ''; // Keep the same heading
        currentContent = [];
      }
    }
    
    // Add any remaining content
    if (currentHeading || currentContent.length > 0) {
      addContentSlide(currentHeading || 'Additional Information', currentContent);
    }
    
    // Add closing slide
    slides.push({
      id: slideCounter.toString(),
      type: 'end',
      title: 'Thank You',
      content: ['Questions?'],
      theme: selectedTheme,
      layout: 'center'
    });
    
    return slides;
  };

  const updateSlide = (slideIndex: number, field: 'title' | 'content', value: string | string[]) => {
    if (!presentation) return;
    
    const updatedSlides = [...presentation.slides];
    if (field === 'title') {
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        title: value as string
      };
    } else if (field === 'content') {
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        content: value as string[]
      };
    }
    
    setPresentation({
      ...presentation,
      slides: updatedSlides
    });
  };

  const updateSlideLayout = (slideIndex: number, layout: 'left' | 'center' | 'right' | 'two-column') => {
    if (!presentation) return;
    
    const updatedSlides = [...presentation.slides];
    updatedSlides[slideIndex] = {
      ...updatedSlides[slideIndex],
      layout
    };
    
    setPresentation({
      ...presentation,
      slides: updatedSlides
    });
  };

  const getThemeStyles = (themeId: string) => {
    return themes.find(theme => theme.id === themeId) || themes[0];
  };

  const downloadSlides = async () => {
    if (!presentation) return;
    
    setGeneratingPreview(true);
    try {
      // Generate and download all slides
      for (let i = 0; i < presentation.slides.length; i++) {
        await generateSlideImage(i);
      }
      
      toast({
        title: "Download Complete",
        description: `All ${presentation.slides.length} slides have been downloaded.`
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download slides. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingPreview(false);
    }
  };

  const generateSlideImage = async (slideIndex: number): Promise<void> => {
    if (!presentation || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size for 16:9 aspect ratio
    canvas.width = 1920;
    canvas.height = 1080;
    
    const slide = presentation.slides[slideIndex];
    const theme = getThemeStyles(presentation.theme);
    
    // Draw background
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw accent bar based on slide type
    ctx.fillStyle = theme.primary;
    if (slide.type === 'title' || slide.type === 'section' || slide.type === 'end') {
      // Full accent background for title/section slides
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      // Accent bar for content slides
      ctx.fillRect(0, 0, canvas.width, 10);
    }
    
    // Set text styles based on theme and slide type
    const isLightBackground = theme.background === '#ffffff' || theme.background === '#f5f5f5' || theme.background === '#fafafa';
    const isDarkSlide = slide.type === 'title' || slide.type === 'section' || slide.type === 'end' || !isLightBackground;
    
    const titleColor = isDarkSlide ? '#ffffff' : theme.font;
    const contentColor = isDarkSlide ? '#ffffff' : theme.font;
    
    // Draw slide content based on type and layout
    ctx.textAlign = slide.layout === 'center' ? 'center' : slide.layout === 'right' ? 'right' : 'left';
    const xPosition = slide.layout === 'center' ? canvas.width / 2 : 
                      slide.layout === 'right' ? canvas.width - 100 : 100;
    
    // Draw title
    ctx.font = `bold 72px ${presentation.fontFamily}`;
    ctx.fillStyle = titleColor;
    
    if (slide.type === 'title' || slide.type === 'section' || slide.type === 'end') {
      // Center title vertically for these slide types
      ctx.fillText(slide.title, xPosition, canvas.height / 2 - 50);
      
      // Add presentation title as subtitle on title slide
      if (slide.type === 'title') {
        ctx.font = `36px ${presentation.fontFamily}`;
        ctx.fillText('Presentation', xPosition, canvas.height / 2 + 50);
      }
    } else {
      // Regular title position
      ctx.fillText(slide.title, xPosition, 100);
      
      // Draw content
      ctx.font = `32px ${presentation.fontFamily}`;
      ctx.fillStyle = contentColor;
      
      let yPosition = 200;
      
      if (slide.layout === 'two-column' && slide.content.length > 2) {
        // Two-column layout
        const midPoint = Math.ceil(slide.content.length / 2);
        const column1 = slide.content.slice(0, midPoint);
        const column2 = slide.content.slice(midPoint);
        
        // Left column
        ctx.textAlign = 'left';
        let yPos1 = 200;
        column1.forEach(line => {
          ctx.fillText(line, 100, yPos1);
          yPos1 += 60;
        });
        
        // Right column
        let yPos2 = 200;
        column2.forEach(line => {
          ctx.fillText(line, canvas.width / 2 + 100, yPos2);
          yPos2 += 60;
        });
      } else {
        // Single column
        slide.content.forEach(line => {
          ctx.fillText(line, xPosition, yPosition);
          yPosition += 60;
        });
      }
    }
    
    // Add slide number except on title slide
    if (slide.type !== 'title') {
      ctx.font = `24px ${presentation.fontFamily}`;
      ctx.fillStyle = isDarkSlide ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
      ctx.textAlign = 'right';
      ctx.fillText(`${slideIndex + 1} / ${presentation.slides.length}`, canvas.width - 50, canvas.height - 50);
    }
    
    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `slide-${slideIndex + 1}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const copySlideContent = (slideIndex: number) => {
    if (!presentation) return;
    
    const slide = presentation.slides[slideIndex];
    const slideText = `${slide.title}\n\n${slide.content.join('\n')}`;
    
    navigator.clipboard.writeText(slideText);
    toast({
      title: "Copied to Clipboard",
      description: "Slide content copied to clipboard."
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
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
          <Presentation className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Slide Generator from Text</h1>
        <p className="text-xl text-muted-foreground">
          Convert text content into professional presentation slides
        </p>
      </div>

      {!presentation ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Input Text
                </CardTitle>
                <CardDescription>
                  Paste your content with headings (# and ##) and lists
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="presentation-title">Presentation Title</Label>
                  <Input
                    id="presentation-title"
                    placeholder="Enter presentation title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="presentation-content">Content</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => setInputText(getSampleText())}
                    >
                      Use Sample Text
                    </Button>
                  </div>
                  <Textarea
                    id="presentation-content"
                    placeholder="Paste your text content here. Use markdown-style formatting:
# Main Heading (Section)
## Subheading (Slide)
- Bullet point
1. Numbered point"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>

                <Button 
                  onClick={generateSlides}
                  disabled={loading || !inputText.trim()}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Slides...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Slides
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Options Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Presentation Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Theme</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {themes.map((theme) => (
                      <Button
                        key={theme.id}
                        variant={selectedTheme === theme.id ? "default" : "outline"}
                        className="justify-start h-auto p-3"
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded" 
                            style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}
                          />
                          <div className="text-left">
                            <div className="font-medium">{theme.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {theme.id === 'dark' ? 'Dark mode' : 'Light mode'}
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="font-family">Font</Label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Include Table of Contents</Label>
                  <Switch
                    checked={includeTableOfContents}
                    onCheckedChange={setIncludeTableOfContents}
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Formatting Tips:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use <code className="text-xs bg-muted p-1 rounded"># Heading</code> for section slides</li>
                    <li>• Use <code className="text-xs bg-muted p-1 rounded">## Subheading</code> for content slides</li>
                    <li>• Create lists with <code className="text-xs bg-muted p-1 rounded">- </code> or <code className="text-xs bg-muted p-1 rounded">1. </code></li>
                    <li>• Add quotes with <code className="text-xs bg-muted p-1 rounded">&gt; </code></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slide Navigation */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Presentation className="h-5 w-5" />
                    Slides
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setPresentation(null)}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[600px] overflow-y-auto">
                <div className="space-y-3">
                  {presentation.slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      className={`w-full text-left p-3 border rounded-lg transition-colors ${
                        currentSlide === index 
                          ? 'border-primary bg-accent'
                          : 'border-muted hover:bg-muted/50'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant={
                          slide.type === 'title' ? 'default' :
                          slide.type === 'section' ? 'secondary' :
                          slide.type === 'quote' ? 'outline' :
                          slide.type === 'end' ? 'destructive' : 'outline'
                        }>
                          {slide.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {index + 1}/{presentation.slides.length}
                        </span>
                      </div>
                      <div className="font-medium truncate">{slide.title || '[No Title]'}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {slide.content.length > 0 
                          ? slide.content[0]
                          : 'No content'}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
              <div className="px-4 pb-4">
                <Button 
                  onClick={downloadSlides} 
                  disabled={generatingPreview}
                  className="w-full"
                >
                  {generatingPreview ? (
                    <>
                      <Download className="h-4 w-4 mr-2 animate-spin" />
                      Preparing Slides...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download All Slides
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Slide Preview & Edit */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Slide Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copySlideContent(currentSlide)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => generateSlideImage(currentSlide)}
                      disabled={generatingPreview}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border rounded-lg aspect-video overflow-hidden"
                  style={{ 
                    backgroundColor: getThemeStyles(presentation.theme).background,
                    fontFamily: presentation.fontFamily
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Slide header bar */}
                    <div 
                      className="h-2"
                      style={{ backgroundColor: getThemeStyles(presentation.theme).primary }}
                    ></div>
                    
                    {/* Slide content */}
                    <div className="flex-1 flex flex-col p-10">
                      {presentation.slides[currentSlide]?.type === 'title' || 
                       presentation.slides[currentSlide]?.type === 'section' || 
                       presentation.slides[currentSlide]?.type === 'end' ? (
                        <div 
                          className="flex-1 flex flex-col items-center justify-center space-y-4 text-white"
                          style={{ backgroundColor: getThemeStyles(presentation.theme).primary }}
                        >
                          <h2 className="text-3xl font-bold text-center">
                            {presentation.slides[currentSlide]?.title}
                          </h2>
                          {presentation.slides[currentSlide]?.type === 'title' && (
                            <p>Presentation</p>
                          )}
                          {presentation.slides[currentSlide]?.content.map((item, i) => (
                            <div key={i} className="text-center">{item}</div>
                          ))}
                        </div>
                      ) : (
                        <div className={`flex-1 ${
                          presentation.slides[currentSlide]?.layout === 'center' ? 'text-center' : 
                          presentation.slides[currentSlide]?.layout === 'right' ? 'text-right' : ''
                        }`}>
                          <h2 
                            className="text-2xl font-bold mb-6"
                            style={{ color: getThemeStyles(presentation.theme).primary }}
                          >
                            {presentation.slides[currentSlide]?.title}
                          </h2>
                          
                          {presentation.slides[currentSlide]?.layout === 'two-column' ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                {presentation.slides[currentSlide]?.content
                                  .slice(0, Math.ceil(presentation.slides[currentSlide]?.content.length / 2))
                                  .map((item, i) => (
                                    <div key={i} className="mb-2">
                                      {item}
                                    </div>
                                  ))
                                }
                              </div>
                              <div>
                                {presentation.slides[currentSlide]?.content
                                  .slice(Math.ceil(presentation.slides[currentSlide]?.content.length / 2))
                                  .map((item, i) => (
                                    <div key={i} className="mb-2">
                                      {item}
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          ) : (
                            <div>
                              {presentation.slides[currentSlide]?.content.map((item, i) => (
                                <div key={i} className="mb-2">
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Slide number */}
                    {presentation.slides[currentSlide]?.type !== 'title' && (
                      <div className="p-2 text-right text-sm text-muted-foreground">
                        {currentSlide + 1} / {presentation.slides.length}
                      </div>
                    )}
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <Label htmlFor="slide-title">Slide Title</Label>
                      <Input
                        id="slide-title"
                        value={presentation.slides[currentSlide]?.title || ''}
                        onChange={(e) => updateSlide(currentSlide, 'title', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Layout</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={presentation.slides[currentSlide]?.layout === 'left' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSlideLayout(currentSlide, 'left')}
                        >
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={presentation.slides[currentSlide]?.layout === 'center' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSlideLayout(currentSlide, 'center')}
                        >
                          <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={presentation.slides[currentSlide]?.layout === 'right' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSlideLayout(currentSlide, 'right')}
                        >
                          <AlignRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={presentation.slides[currentSlide]?.layout === 'two-column' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSlideLayout(currentSlide, 'two-column')}
                        >
                          <PanelLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Theme</Label>
                        <Select 
                          value={presentation.theme}
                          onValueChange={(value) => setPresentation({...presentation, theme: value})}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {themes.map(theme => (
                              <SelectItem key={theme.id} value={theme.id}>
                                {theme.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
              
              <div className="px-4 pb-4 flex justify-between">
                <Button 
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => setCurrentSlide(Math.min(presentation.slides.length - 1, currentSlide + 1))}
                  disabled={currentSlide === presentation.slides.length - 1}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default SlideGenerator;
