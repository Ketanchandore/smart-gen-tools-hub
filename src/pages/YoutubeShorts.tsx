
import React, { useState } from 'react';
import { Video, Wand2, Copy, RefreshCw, ListChecks, Download, Share2, Eye, Clock, Hash, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface GeneratedContent {
  script: string;
  hook: string;
  callToAction: string;
  visualIdeas: string[];
  hashtags: string[];
  thumbnail: string;
  description: string;
  duration: number;
  engagement: {
    score: number;
    tips: string[];
  };
}

const YoutubeShorts = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [niche, setNiche] = useState('general');
  const [tone, setTone] = useState('casual');
  const [duration, setDuration] = useState([30]);
  const [targetAudience, setTargetAudience] = useState('general');
  const [includeDescription, setIncludeDescription] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeHook, setIncludeHook] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentGenerated, setContentGenerated] = useState<GeneratedContent | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  // Advanced script templates by niche and tone
  const advancedTemplates = {
    general: {
      casual: [
        "Hey everyone! So I just discovered something amazing about [TOPIC] and I HAD to share it with you! [HOOK] This literally changed my entire perspective. Here's what you need to know: [MAIN_POINT_1]. But here's the crazy part - [MAIN_POINT_2]. I wish someone had told me this sooner! [CTA]",
        "Okay, this is going to sound wild, but [TOPIC] just became 10x easier for me. [HOOK] Most people don't realize that [MAIN_POINT_1]. And get this - [MAIN_POINT_2]. Mind blown, right? [CTA]",
        "Stop what you're doing! This [TOPIC] hack is going to save you so much time. [HOOK] I used to struggle with this until I learned [MAIN_POINT_1]. Then I discovered [MAIN_POINT_2] and everything clicked! [CTA]"
      ],
      professional: [
        "Today I want to share a professional insight about [TOPIC] that can transform your approach. [HOOK] Industry experts recommend [MAIN_POINT_1]. Additionally, research shows that [MAIN_POINT_2]. This strategic approach yields significant results. [CTA]",
        "Let's discuss an advanced technique in [TOPIC] that professionals use. [HOOK] The key principle is [MAIN_POINT_1]. Furthermore, implementing [MAIN_POINT_2] ensures optimal outcomes. [CTA]"
      ],
      energetic: [
        "WHOA! This [TOPIC] discovery is INSANE! [HOOK] Are you ready for this? [MAIN_POINT_1] - BOOM! But wait, there's MORE! [MAIN_POINT_2] - absolutely GAME-CHANGING! [CTA]",
        "LET'S GO! Time to talk about [TOPIC] and this is HUGE! [HOOK] Check this out: [MAIN_POINT_1] - incredible, right? And THIS will blow your mind: [MAIN_POINT_2]! [CTA]"
      ]
    },
    tech: {
      casual: [
        "Tech tip alert! Just found this amazing [TOPIC] feature that's hidden in plain sight. [HOOK] So basically, [MAIN_POINT_1], which is pretty cool. But the real magic happens when you [MAIN_POINT_2]. Your tech game is about to level up! [CTA]",
        "Okay tech fam, this [TOPIC] discovery is actually insane. [HOOK] Here's what changed everything: [MAIN_POINT_1]. Plus, pro tip: [MAIN_POINT_2]. You'll thank me later! [CTA]"
      ],
      professional: [
        "Today's technical deep-dive focuses on [TOPIC] optimization strategies. [HOOK] Implementation of [MAIN_POINT_1] significantly improves system performance. Advanced users should also consider [MAIN_POINT_2] for maximum efficiency. [CTA]"
      ]
    },
    business: {
      professional: [
        "Strategic insight: [TOPIC] can transform your business operations. [HOOK] Successful entrepreneurs leverage [MAIN_POINT_1] to achieve scalable growth. Moreover, [MAIN_POINT_2] provides competitive advantage in today's market. [CTA]",
        "Business breakthrough: Understanding [TOPIC] is crucial for modern success. [HOOK] Data-driven analysis reveals that [MAIN_POINT_1]. Strategic implementation of [MAIN_POINT_2] drives measurable results. [CTA]"
      ],
      motivational: [
        "Entrepreneurs, this [TOPIC] strategy will change your business! [HOOK] Winners understand that [MAIN_POINT_1]. Champions go further by implementing [MAIN_POINT_2]. Success is waiting! [CTA]"
      ]
    }
  };

  // Hook generators
  const generateHook = (topic: string, niche: string) => {
    const hooks = {
      general: [
        `Did you know that 90% of people don't know this about ${topic}?`,
        `This ${topic} secret will change everything you thought you knew!`,
        `I wish someone told me this ${topic} fact 5 years ago...`,
        `The ${topic} industry doesn't want you to know this!`,
        `This ${topic} discovery made me $10,000 last month!`
      ],
      tech: [
        `This hidden ${topic} feature will blow your mind!`,
        `Tech companies don't want you to discover this ${topic} hack!`,
        `I found a ${topic} bug that actually helps users!`,
        `This ${topic} shortcut saves me 2 hours daily!`,
        `Delete this app if you use ${topic} wrong!`
      ],
      business: [
        `This ${topic} strategy made me my first $100K!`,
        `Billionaires use this ${topic} method daily!`,
        `This ${topic} mistake cost me $50,000!`,
        `The ${topic} secret that built Apple!`,
        `Why 99% fail at ${topic} (and how to be the 1%)!`
      ],
      fitness: [
        `This ${topic} exercise burns 3x more calories!`,
        `Trainers hate this ${topic} shortcut!`,
        `I lost 20 pounds with this ${topic} method!`,
        `This ${topic} mistake is ruining your gains!`,
        `The ${topic} secret Olympic athletes use!`
      ],
      cooking: [
        `This ${topic} technique changed my cooking forever!`,
        `Chefs don't want you to know this ${topic} secret!`,
        `This ${topic} mistake ruins every dish!`,
        `The ${topic} hack that saves me 30 minutes!`,
        `Restaurant ${topic} secrets revealed!`
      ]
    };
    
    const nicheHooks = hooks[niche as keyof typeof hooks] || hooks.general;
    return nicheHooks[Math.floor(Math.random() * nicheHooks.length)];
  };

  // CTA generators
  const generateCTA = (niche: string) => {
    const ctas = {
      general: [
        "Drop a 🔥 if this helped you! Follow for more tips like this!",
        "Save this for later and share with someone who needs to see it!",
        "Comment 'YES' if you're going to try this! Hit follow for daily tips!",
        "Which tip surprised you the most? Let me know below!",
        "Follow me for more life-changing content like this!"
      ],
      tech: [
        "Follow for daily tech tips that actually work!",
        "Save this tutorial and tag a friend who needs this!",
        "Comment 'TECH' if this blew your mind! More coming soon!",
        "Which feature will you try first? Follow for more!",
        "Share this with your tech friends! They'll thank you later!"
      ],
      business: [
        "Follow for daily business strategies that create results!",
        "Save this and implement it in your business today!",
        "Comment 'GROWTH' if you're ready to scale! Follow for more!",
        "Which strategy will you implement first? Let me know!",
        "Share this with an entrepreneur who needs to see it!"
      ]
    };
    
    const nicheCTAs = ctas[niche as keyof typeof ctas] || ctas.general;
    return nicheCTAs[Math.floor(Math.random() * nicheCTAs.length)];
  };

  // Visual ideas generator
  const generateVisualIdeas = (niche: string, topic: string) => {
    const baseIdeas = {
      general: [
        "Close-up reaction shots while explaining key points",
        "Split-screen before/after comparison",
        "On-screen text highlighting important statistics",
        "Quick montage showing the process in action",
        "Point-of-view shots to create engagement"
      ],
      tech: [
        "Screen recording with zoom effects on important features",
        "Side-by-side comparison of different methods",
        "Close-up shots of devices with highlighted areas",
        "Time-lapse of the setup/installation process",
        "Animated graphics explaining technical concepts"
      ],
      business: [
        "Professional talking head with branded background",
        "Charts and graphs showing growth/results",
        "Behind-the-scenes of business operations",
        "Quick tips with numbered overlays",
        "Success story testimonials or examples"
      ]
    };
    
    const nicheIdeas = baseIdeas[niche as keyof typeof baseIdeas] || baseIdeas.general;
    return [
      `Opening hook with surprising ${topic} statistic`,
      ...nicheIdeas,
      `Strong closing with clear next step for viewers`
    ];
  };

  // Hashtag generator
  const generateHashtags = (topic: string, niche: string, keywords: string[]) => {
    const baseHashtags = ["#shorts", "#youtubeshorts", "#viral", "#trending", "#fyp"];
    
    const nicheHashtags = {
      general: ["#tips", "#hacks", "#lifehacks", "#productivity", "#motivation"],
      tech: ["#tech", "#technology", "#techtips", "#gadgets", "#innovation", "#digital"],
      business: ["#business", "#entrepreneur", "#success", "#marketing", "#growth", "#startup"],
      fitness: ["#fitness", "#workout", "#health", "#gym", "#exercise", "#wellness"],
      cooking: ["#cooking", "#recipe", "#food", "#chef", "#kitchen", "#foodhacks"]
    };
    
    const selectedNicheHashtags = nicheHashtags[niche as keyof typeof nicheHashtags] || nicheHashtags.general;
    const topicHashtag = `#${topic.replace(/\s+/g, '').toLowerCase()}`;
    const keywordHashtags = keywords.map(k => `#${k.replace(/\s+/g, '').toLowerCase()}`);
    
    return [...baseHashtags, ...selectedNicheHashtags.slice(0, 3), topicHashtag, ...keywordHashtags].slice(0, 15);
  };

  // Engagement score calculator
  const calculateEngagementScore = (content: any) => {
    let score = 50; // Base score
    
    // Hook quality
    if (content.hook.includes('?')) score += 10;
    if (content.hook.toLowerCase().includes('secret') || content.hook.toLowerCase().includes('hack')) score += 15;
    
    // Script length (optimal for shorts)
    const wordCount = content.script.split(' ').length;
    if (wordCount >= 80 && wordCount <= 120) score += 10;
    
    // CTA presence
    if (content.callToAction.includes('follow') || content.callToAction.includes('subscribe')) score += 10;
    
    // Hashtag optimization
    if (content.hashtags.length >= 8) score += 5;
    
    return Math.min(score, 100);
  };

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        variant: "destructive",
        title: "Topic required",
        description: "Please enter a topic for your YouTube Short."
      });
      return;
    }

    setIsGenerating(true);
    setContentGenerated(null);

    // Simulate realistic generation time
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      // Parse keywords
      const keywordList = keywords ? keywords.split(',').map(k => k.trim()).filter(k => k) : [];
      
      // Get template based on niche and tone
      const templates = advancedTemplates[niche as keyof typeof advancedTemplates]?.[tone as keyof any] || 
                       advancedTemplates.general[tone as keyof typeof advancedTemplates.general];
      
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
      
      // Generate hook and CTA
      const hook = generateHook(topic, niche);
      const callToAction = generateCTA(niche);
      
      // Generate main points based on niche
      const mainPoints = {
        general: [
          `implementing a simple daily routine focused on ${topic}`,
          `leveraging the 80/20 principle for maximum ${topic} results`
        ],
        tech: [
          `optimizing your ${topic} settings for peak performance`,
          `using advanced ${topic} features most people ignore`
        ],
        business: [
          `applying proven ${topic} strategies from successful companies`,
          `scaling ${topic} operations using data-driven insights`
        ]
      };
      
      const nichePoints = mainPoints[niche as keyof typeof mainPoints] || mainPoints.general;
      
      // Create final script
      const script = selectedTemplate
        .replace('[TOPIC]', topic)
        .replace('[HOOK]', hook)
        .replace('[MAIN_POINT_1]', nichePoints[0])
        .replace('[MAIN_POINT_2]', nichePoints[1])
        .replace('[CTA]', callToAction);
      
      // Generate visual ideas
      const visualIdeas = generateVisualIdeas(niche, topic);
      
      // Generate hashtags
      const hashtags = generateHashtags(topic, niche, keywordList);
      
      // Generate description
      const description = `${hook}\n\nIn this short video, I'll show you exactly how to master ${topic}. This comprehensive guide covers everything you need to know to get started immediately.\n\n${callToAction}\n\n${hashtags.join(' ')}`;
      
      // Create content object
      const content: GeneratedContent = {
        script,
        hook,
        callToAction,
        visualIdeas: visualIdeas.slice(0, 6),
        hashtags,
        thumbnail: `Create an eye-catching thumbnail featuring: "${topic}" with bold text overlay, bright colors, and an emotional expression that matches the ${tone} tone`,
        description,
        duration: duration[0],
        engagement: {
          score: 0,
          tips: []
        }
      };
      
      // Calculate engagement score
      content.engagement.score = calculateEngagementScore(content);
      content.engagement.tips = [
        content.engagement.score >= 80 ? "Excellent hook! Very engaging." : "Consider making your hook more intriguing",
        "Add captions for better accessibility",
        "Use trending sounds to boost reach",
        "Post at peak hours for your audience",
        content.hashtags.length >= 10 ? "Great hashtag coverage!" : "Consider adding more relevant hashtags"
      ];
      
      setContentGenerated(content);
      setActiveTab('output');
      
      toast({
        title: "Content generated successfully!",
        description: `Your YouTube Short is ready with ${content.engagement.score}% engagement score.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "Please try again. If the issue persists, refresh the page."
      });
      console.error('Content generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`
    });
  };

  const exportContent = () => {
    if (!contentGenerated) return;
    
    const exportData = {
      topic,
      niche,
      tone,
      targetDuration: duration[0],
      ...contentGenerated,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youtube-short-${topic.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported!",
      description: "Content exported successfully."
    });
  };

  return (
    <Layout title="YouTube Shorts Generator - Pine Tools Hub" description="Create viral YouTube Shorts content with AI-powered scripts, hooks, and optimization">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">YouTube Shorts Generator</h1>
          <p className="text-xl text-muted-foreground">
            Create viral short-form content with AI-powered scripts and optimization
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              Content Input
            </TabsTrigger>
            <TabsTrigger value="output" disabled={!contentGenerated} className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generated Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Tell us about your YouTube Short</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="topic">Main Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., iPhone productivity hacks, quick makeup routine, 5-minute abs workout"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., tutorial, beginner, hack, tips, 2024"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Content Niche</Label>
                    <Select value={niche} onValueChange={setNiche}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="fitness">Fitness & Health</SelectItem>
                        <SelectItem value="cooking">Cooking & Food</SelectItem>
                        <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tone of Voice</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual & Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="energetic">Energetic & Fun</SelectItem>
                        <SelectItem value="motivational">Motivational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Target Duration: {duration[0]} seconds</Label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={60}
                    min={15}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>15s</span>
                    <span>30s</span>
                    <span>45s</span>
                    <span>60s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Options</CardTitle>
                <CardDescription>Customize what to include in your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label className="font-medium">Engaging Hook</Label>
                      <p className="text-xs text-muted-foreground">Attention-grabbing opening</p>
                    </div>
                    <Switch checked={includeHook} onCheckedChange={setIncludeHook} />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label className="font-medium">Call to Action</Label>
                      <p className="text-xs text-muted-foreground">Engagement-driving ending</p>
                    </div>
                    <Switch checked={includeCTA} onCheckedChange={setIncludeCTA} />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label className="font-medium">Description</Label>
                      <p className="text-xs text-muted-foreground">SEO-optimized description</p>
                    </div>
                    <Switch checked={includeDescription} onCheckedChange={setIncludeDescription} />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label className="font-medium">Hashtags</Label>
                      <p className="text-xs text-muted-foreground">Trending and relevant tags</p>
                    </div>
                    <Switch checked={includeHashtags} onCheckedChange={setIncludeHashtags} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={generateContent}
              disabled={isGenerating || !topic.trim()}
              className="w-full h-12 text-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating Amazing Content...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate YouTube Short
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="output" className="space-y-6">
            {contentGenerated && (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Engagement Score
                      </CardTitle>
                      <CardDescription>AI-powered content optimization analysis</CardDescription>
                    </div>
                    <Badge variant={contentGenerated.engagement.score >= 80 ? "default" : 
                                   contentGenerated.engagement.score >= 60 ? "secondary" : "destructive"}>
                      {contentGenerated.engagement.score}%
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <Progress value={contentGenerated.engagement.score} className="mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Optimization Tips:</h4>
                        <ul className="text-sm space-y-1">
                          {contentGenerated.engagement.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Duration:</span>
                          <Badge variant="outline">{contentGenerated.duration}s</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Hashtags:</span>
                          <Badge variant="outline">{contentGenerated.hashtags.length}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Visual Ideas:</span>
                          <Badge variant="outline">{contentGenerated.visualIdeas.length}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Script</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(contentGenerated.script, 'Script')}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-secondary/30 p-4 rounded-lg max-h-64 overflow-auto">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{contentGenerated.script}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Hook & CTA</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(`${contentGenerated.hook}\n\n${contentGenerated.callToAction}`, 'Hook & CTA')}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">HOOK</Label>
                        <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded border-l-4 border-blue-500">
                          {contentGenerated.hook}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">CALL TO ACTION</Label>
                        <p className="text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                          {contentGenerated.callToAction}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Visual Ideas & Shots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {contentGenerated.visualIdeas.map((idea, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                          <div className="bg-primary/20 text-primary font-medium px-2 py-1 rounded text-sm">
                            {index + 1}
                          </div>
                          <p className="text-sm">{idea}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {includeHashtags && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Hash className="h-5 w-5" />
                        Hashtags
                      </CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(contentGenerated.hashtags.join(' '), 'Hashtags')}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {contentGenerated.hashtags.map((hashtag, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary/80"
                                 onClick={() => copyToClipboard(hashtag, 'Hashtag')}>
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {includeDescription && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Video Description</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(contentGenerated.description, 'Description')}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-secondary/30 p-4 rounded-lg">
                        <p className="whitespace-pre-wrap text-sm">{contentGenerated.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Thumbnail Concept</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                      <p className="text-sm">{contentGenerated.thumbnail}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setActiveTab('input')}>
                    Edit Parameters
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={exportContent}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Content
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-600" onClick={generateContent}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              YouTube Shorts Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Hook in First 3 Seconds</h3>
                    <p className="text-sm text-muted-foreground">
                      Capture attention immediately with surprising facts or bold statements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Optimize for Mobile</h3>
                    <p className="text-sm text-muted-foreground">
                      Use large text, clear visuals, and vertical format for mobile viewing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <Hash className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Strategic Hashtags</h3>
                    <p className="text-sm text-muted-foreground">
                      Mix trending hashtags with niche-specific ones for better reach.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                    <Share2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Strong Call-to-Action</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell viewers exactly what to do next - follow, comment, or share.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Trending Audio</h3>
                    <p className="text-sm text-muted-foreground">
                      Use popular sounds and music to boost algorithm visibility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                    <Video className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Consistent Posting</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload regularly and engage with comments to build audience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default YoutubeShorts;
