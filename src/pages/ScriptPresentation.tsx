
import React, { useState } from 'react';
import { Presentation, Download, Copy, FileText, Play, Users, Lightbulb, Target, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface SlideContent {
  title: string;
  content: string[];
  slideType: 'title' | 'content' | 'bullet' | 'image' | 'conclusion';
}

interface PresentationData {
  title: string;
  slides: SlideContent[];
  script: string[];
  duration: number;
}

const ScriptPresentation = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [duration, setDuration] = useState([15]); // minutes
  const [presentationType, setPresentationType] = useState('business');
  const [tone, setTone] = useState('professional');
  const [keyPoints, setKeyPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPresentation, setGeneratedPresentation] = useState<PresentationData | null>(null);

  const presentationTypes = [
    { value: 'business', label: 'Business Pitch' },
    { value: 'educational', label: 'Educational' },
    { value: 'training', label: 'Training Workshop' },
    { value: 'product', label: 'Product Demo' },
    { value: 'sales', label: 'Sales Presentation' },
    { value: 'conference', label: 'Conference Talk' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'report', label: 'Project Report' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'inspiring', label: 'Inspiring' }
  ];

  const generatePresentation = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your presentation.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate presentation based on type and topic
      const slidesCount = Math.max(5, Math.floor(duration[0] / 2));
      const timePerSlide = duration[0] / slidesCount;

      const slides: SlideContent[] = [
        {
          title: topic,
          content: [
            `Welcome to our presentation on ${topic}`,
            `Target Audience: ${audience || 'General audience'}`,
            `Duration: ${duration[0]} minutes`,
            'Let\'s dive in!'
          ],
          slideType: 'title'
        }
      ];

      // Generate content slides based on key points
      const points = keyPoints.split('\n').filter(p => p.trim());
      if (points.length > 0) {
        points.forEach((point, index) => {
          slides.push({
            title: `Key Point ${index + 1}`,
            content: [
              point.trim(),
              `Detailed explanation of ${point.trim().toLowerCase()}`,
              'Supporting data and examples',
              'Real-world applications'
            ],
            slideType: 'content'
          });
        });
      } else {
        // Generate default content based on presentation type
        for (let i = 2; i <= slidesCount - 1; i++) {
          slides.push({
            title: `Section ${i - 1}`,
            content: [
              `Important aspect of ${topic}`,
              'Key benefits and features',
              'Data-driven insights',
              'Best practices and recommendations'
            ],
            slideType: 'bullet'
          });
        }
      }

      // Add conclusion slide
      slides.push({
        title: 'Conclusion & Next Steps',
        content: [
          `Summary of key insights about ${topic}`,
          'Action items for the audience',
          'Questions and discussion',
          'Thank you for your attention!'
        ],
        slideType: 'conclusion'
      });

      // Generate script
      const script = slides.map((slide, index) => {
        const timing = `[${Math.floor(index * timePerSlide)}:${String(Math.floor((index * timePerSlide) % 1 * 60)).padStart(2, '0')}]`;
        return `${timing} Slide ${index + 1}: ${slide.title}\n\n` +
               `"${slide.content.map(content => 
                 presentationType === 'casual' ? 
                   `Hey everyone, ${content.toLowerCase()}` : 
                   tone === 'enthusiastic' ? 
                     `I'm excited to share that ${content.toLowerCase()}` :
                     content
               ).join('. ')}."\n\n` +
               `Speaker notes: Pause here for ${timePerSlide < 2 ? '30 seconds' : '1 minute'} to allow audience engagement.\n\n`;
      });

      const presentation: PresentationData = {
        title: topic,
        slides,
        script,
        duration: duration[0]
      };

      setGeneratedPresentation(presentation);
      toast({
        title: "Presentation generated!",
        description: `Created ${slides.length} slides with full script for your ${duration[0]}-minute presentation.`,
      });

    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate presentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const downloadPresentation = () => {
    if (!generatedPresentation) return;

    const content = `# ${generatedPresentation.title}
Duration: ${generatedPresentation.duration} minutes
Type: ${presentationType}
Tone: ${tone}
Audience: ${audience || 'General'}

## SLIDES
${generatedPresentation.slides.map((slide, index) => 
  `\n### Slide ${index + 1}: ${slide.title}\n${slide.content.map(c => `- ${c}`).join('\n')}`
).join('\n')}

## FULL SCRIPT
${generatedPresentation.script.join('\n')}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPresentation.title.replace(/[^a-zA-Z0-9]/g, '_')}_presentation.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Presentation and script downloaded as Markdown file.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
              <Presentation className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Script + Presentation Generator</h1>
            <p className="text-muted-foreground">Create professional presentations with detailed scripts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Presentation Details
                </CardTitle>
                <CardDescription>
                  Define your presentation requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="topic">Topic/Title *</Label>
                  <Input
                    id="topic"
                    placeholder="Enter your presentation topic..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Business executives, Students, General public..."
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Presentation Type</Label>
                    <Select value={presentationType} onValueChange={setPresentationType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {presentationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((toneOption) => (
                          <SelectItem key={toneOption.value} value={toneOption.value}>
                            {toneOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration: {duration[0]} minutes
                  </Label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={60}
                    min={5}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="keyPoints">Key Points (optional)</Label>
                  <Textarea
                    id="keyPoints"
                    placeholder="Enter each key point on a new line..."
                    value={keyPoints}
                    onChange={(e) => setKeyPoints(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={generatePresentation}
                  disabled={loading || !topic.trim()}
                  className="w-full flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Presentation className="h-4 w-4" />
                      Generate Presentation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Tips for Great Presentations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>• <strong>Know your audience:</strong> Tailor content to their needs and knowledge level</p>
                  <p>• <strong>Structure clearly:</strong> Opening, main points, conclusion</p>
                  <p>• <strong>Practice timing:</strong> Aim for 1-2 minutes per slide</p>
                  <p>• <strong>Use visuals:</strong> Images and charts enhance understanding</p>
                  <p>• <strong>Engage audience:</strong> Ask questions and encourage interaction</p>
                </div>
              </CardContent>
            </Card>

            {generatedPresentation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Quick Preview</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={downloadPresentation}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{generatedPresentation.slides.length} slides</Badge>
                      <Badge variant="outline">{generatedPresentation.duration} minutes</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">{generatedPresentation.title}</p>
                      <p>Ready to present with full script included</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Generated Content */}
        {generatedPresentation && (
          <div className="mt-8">
            <Tabs defaultValue="slides" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="slides">Slides Overview</TabsTrigger>
                <TabsTrigger value="script">Full Script</TabsTrigger>
              </TabsList>

              <TabsContent value="slides" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generatedPresentation.slides.map((slide, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Slide {index + 1}</CardTitle>
                          <Badge variant={slide.slideType === 'title' ? 'default' : 'secondary'}>
                            {slide.slideType}
                          </Badge>
                        </div>
                        <CardDescription className="font-medium">{slide.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-sm space-y-1">
                          {slide.content.map((content, contentIndex) => (
                            <li key={contentIndex} className="text-muted-foreground">
                              • {content}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="script" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        Presentation Script
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generatedPresentation.script.join('\n'), 'Script')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Complete script with timing and speaker notes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {generatedPresentation.script.join('\n')}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScriptPresentation;
