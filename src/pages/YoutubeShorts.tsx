
import React, { useState } from 'react';
import { Video, Wand2, Copy, RefreshCw, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface GeneratedContent {
  script: string;
  visualIdeas: string[];
  hashtags: string[];
  thumbnail: string;
}

const YoutubeShorts = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [niche, setNiche] = useState('general');
  const [includeDescription, setIncludeDescription] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentGenerated, setContentGenerated] = useState<GeneratedContent | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  // Helper function to get a random element from an array
  const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Sample script templates
  const scriptTemplates = [
    "Hey everyone! Today I'm going to share some amazing insights about [TOPIC]. Did you know that [FACT]? That's right! Let me show you how [KEY_POINT_1]. But wait, there's more! [KEY_POINT_2]. This is truly a game-changer for [NICHE]. If you found this helpful, make sure to like and subscribe!",
    
    "You won't believe what I discovered about [TOPIC]! *pause for effect* Many people make this common mistake when it comes to [TOPIC]. Instead, try [KEY_POINT_1]. I've personally seen amazing results with this approach. Another pro tip: [KEY_POINT_2]. Don't forget to share this with someone who needs to hear it!",
    
    "Stop scrolling! This is the [TOPIC] hack you've been waiting for. Most [NICHE] creators don't talk about this, but [FACT]. Here's what you need to do: First, [KEY_POINT_1]. Then, [KEY_POINT_2]. That's it! Super simple but incredibly effective. Hit that subscribe button for more tips like this!",
    
    "Let me share a quick [TOPIC] tip that changed everything for me. Before I learned this, I was struggling with [PROBLEM]. Then I discovered that [FACT]. Now I always [KEY_POINT_1], and it makes such a difference! Also don't forget to [KEY_POINT_2]. Try it and let me know how it works for you in the comments!"
  ];

  // Sample visual ideas by niche
  const visualIdeasByNiche = {
    general: [
      "Close-up shot demonstrating the main concept",
      "Split screen before/after comparison",
      "On-screen text highlighting key points",
      "Quick transition between steps",
      "Point-of-view (POV) perspective"
    ],
    tech: [
      "Screen recording with zoomed highlights",
      "Side-by-side product comparison",
      "Quick unboxing sequence",
      "Tech setup tour with callouts",
      "Feature demonstration with annotations"
    ],
    beauty: [
      "Close-up transformation process",
      "Split-screen before/after reveal",
      "Product swatches with reactions",
      "Quick tutorial with on-screen timer",
      "Zoom transitions between techniques"
    ],
    fitness: [
      "Form demonstration from multiple angles",
      "Quick exercise sequence with rep counter",
      "Side-by-side proper vs. improper form",
      "Progress tracker visualization",
      "Quick workout challenge with timer"
    ],
    cooking: [
      "Overhead ingredient preparation",
      "Satisfying final dish reveal",
      "Close-up of cooking technique",
      "Time-lapse of cooking process",
      "Taste test reaction shot"
    ],
    business: [
      "Animated data visualization",
      "Step-by-step process diagram",
      "Split screen comparing strategies",
      "On-screen highlighting of key metrics",
      "Quick tips with numbered callouts"
    ]
  };

  // Sample hashtags by niche
  const hashtagsByNiche = {
    general: ["#shorts", "#youtubeshorts", "#viral", "#trending", "#fyp", "#foryou"],
    tech: ["#tech", "#technology", "#gadgets", "#techtips", "#smartphone", "#computing", "#techreview"],
    beauty: ["#beauty", "#makeup", "#skincare", "#beautytips", "#glam", "#tutorial", "#beautyhack"],
    fitness: ["#fitness", "#workout", "#exercise", "#fitnesstips", "#gym", "#health", "#strengthtraining"],
    cooking: ["#cooking", "#recipe", "#food", "#easyrecipe", "#homemade", "#foodie", "#quickmeals"],
    business: ["#business", "#entrepreneur", "#success", "#marketing", "#smallbusiness", "#startup", "#sidehustle"]
  };

  // Sample facts by niche
  const factsByNiche = {
    general: [
      "most people only use 20% of available features",
      "this approach can save you hours every week",
      "over 80% of people aren't aware of this simple solution",
      "this method is used by professionals but rarely shared"
    ],
    tech: [
      "this hidden setting can boost performance by up to 20%",
      "most users never discover this powerful feature",
      "this shortcut can save you dozens of clicks every day",
      "this alternative approach uses half the resources"
    ],
    beauty: [
      "this technique is used by professional makeup artists behind the scenes",
      "using products in this order increases effectiveness dramatically",
      "this one ingredient makes all the difference in results",
      "this application method ensures products last twice as long"
    ],
    fitness: [
      "changing this one aspect of form can increase effectiveness by 30%",
      "most people perform this exercise incorrectly, limiting results",
      "this small adjustment can prevent common injuries",
      "professional athletes focus on this technique specifically"
    ],
    cooking: [
      "this small preparation step changes the entire flavor profile",
      "professional chefs always use this method instead",
      "this ingredient substitution makes recipes healthier without sacrificing taste",
      "this cooking temperature adjustment creates perfect results every time"
    ],
    business: [
      "top performers spend 80% of their time on this activity",
      "this approach has been shown to increase conversion rates by 25%",
      "successful businesses prioritize this metric above all others",
      "this strategy requires less effort but produces better results"
    ]
  };

  // Sample key points by niche
  const keyPointsByNiche = {
    general: [
      "break the task into smaller, manageable steps",
      "use the 80/20 rule to focus on what matters most",
      "create templates for recurring situations",
      "set up automatic reminders for important tasks",
      "use visualization techniques to improve recall"
    ],
    tech: [
      "clear your cache and cookies regularly",
      "use keyboard shortcuts instead of mouse clicks",
      "enable dark mode to reduce eye strain",
      "set up custom notification filters",
      "use cloud backup for critical files"
    ],
    beauty: [
      "apply products in order from thinnest to thickest consistency",
      "use primer before foundation for longer-lasting makeup",
      "gently pat products in rather than rubbing",
      "store products properly to extend their shelf life",
      "use multi-purpose products to streamline your routine"
    ],
    fitness: [
      "focus on mind-muscle connection during exercises",
      "incorporate progressive overload in your training",
      "prioritize recovery between intense workouts",
      "maintain proper hydration before, during, and after exercise",
      "track your progress with measurements beyond weight"
    ],
    cooking: [
      "season at multiple stages of cooking",
      "preheat pans before adding ingredients",
      "let meats rest before cutting",
      "taste and adjust seasonings as you cook",
      "prep ingredients before starting to cook"
    ],
    business: [
      "focus on serving existing customers exceptionally well",
      "create systems that can run without your constant attention",
      "invest in learning rather than just doing",
      "track key metrics weekly instead of monthly",
      "build strategic partnerships to leverage growth"
    ]
  };

  // Generate YouTube Shorts content
  const generateContent = () => {
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

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Select template and elements based on niche
        const selectedNiche = niche || 'general';
        const selectedTemplate = getRandomElement(scriptTemplates);
        const selectedFact = getRandomElement(factsByNiche[selectedNiche as keyof typeof factsByNiche] || factsByNiche.general);
        
        // Get key points, ensuring they're different
        const availableKeyPoints = keyPointsByNiche[selectedNiche as keyof typeof keyPointsByNiche] || keyPointsByNiche.general;
        const keyPoint1Index = Math.floor(Math.random() * availableKeyPoints.length);
        let keyPoint2Index = keyPoint1Index;
        while (keyPoint2Index === keyPoint1Index) {
          keyPoint2Index = Math.floor(Math.random() * availableKeyPoints.length);
        }
        
        const keyPoint1 = availableKeyPoints[keyPoint1Index];
        const keyPoint2 = availableKeyPoints[keyPoint2Index];
        
        // Generate script by replacing placeholders
        const generatedScript = selectedTemplate
          .replace('[TOPIC]', topic)
          .replace('[NICHE]', selectedNiche)
          .replace('[FACT]', selectedFact)
          .replace('[KEY_POINT_1]', keyPoint1)
          .replace('[KEY_POINT_2]', keyPoint2)
          .replace('[PROBLEM]', `common ${selectedNiche} issues`);
        
        // Generate visual ideas
        const visualIdeas = visualIdeasByNiche[selectedNiche as keyof typeof visualIdeasByNiche] || visualIdeasByNiche.general;
        
        // Generate hashtags
        const baseHashtags = hashtagsByNiche[selectedNiche as keyof typeof hashtagsByNiche] || hashtagsByNiche.general;
        const topicHashtags = [`#${topic.replace(/\s+/g, '')}`, `#${selectedNiche}`];
        
        let customHashtags: string[] = [];
        if (keywords.trim()) {
          customHashtags = keywords.split(',').map(keyword => `#${keyword.trim().replace(/\s+/g, '')}`);
        }
        
        const allHashtags = [...new Set([...baseHashtags, ...topicHashtags, ...customHashtags])].slice(0, 10);
        
        // Create final content object
        const content: GeneratedContent = {
          script: generatedScript,
          visualIdeas: visualIdeas.slice(0, 5),
          hashtags: allHashtags,
          thumbnail: `Thumbnail showing: "${topic}" with attention-grabbing text overlay`
        };
        
        setContentGenerated(content);
        setActiveTab('output');
        
        toast({
          title: "Content generated!",
          description: "Your YouTube Shorts content has been created successfully."
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Generation failed",
          description: "There was a problem generating your content. Please try again."
        });
      } finally {
        setIsGenerating(false);
      }
    }, 2000);
  };

  // Copy script to clipboard
  const copyScript = () => {
    if (!contentGenerated) return;
    
    navigator.clipboard.writeText(contentGenerated.script);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard."
    });
  };

  // Copy hashtags to clipboard
  const copyHashtags = () => {
    if (!contentGenerated) return;
    
    navigator.clipboard.writeText(contentGenerated.hashtags.join(' '));
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard."
    });
  };

  // Regenerate content
  const regenerateContent = () => {
    generateContent();
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">YouTube Shorts Generator</h1>
        <p className="text-muted-foreground mb-8">Create engaging short-form content for YouTube</p>

        <Card>
          <CardHeader>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">Content Input</TabsTrigger>
                <TabsTrigger value="output" disabled={!contentGenerated}>Generated Content</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="input" className="space-y-4 mt-0">
              <div>
                <Label htmlFor="topic">Main Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., iPhone productivity hacks, quick makeup tutorial, fitness tips"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific about what your YouTube Short will cover
                </p>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., tutorial, howto, tips, beginners"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  These will be used to generate relevant hashtags
                </p>
              </div>

              <div>
                <Label htmlFor="niche">Content Niche</Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                    <SelectItem value="fitness">Fitness & Health</SelectItem>
                    <SelectItem value="cooking">Cooking & Food</SelectItem>
                    <SelectItem value="business">Business & Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Selecting a specific niche helps generate more relevant content
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-desc" className="text-base">Generate Description</Label>
                    <p className="text-xs text-muted-foreground">
                      Include a video description with your content
                    </p>
                  </div>
                  <Switch
                    id="include-desc"
                    checked={includeDescription}
                    onCheckedChange={setIncludeDescription}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-hashtags" className="text-base">Generate Hashtags</Label>
                    <p className="text-xs text-muted-foreground">
                      Include relevant hashtags with your content
                    </p>
                  </div>
                  <Switch
                    id="include-hashtags"
                    checked={includeHashtags}
                    onCheckedChange={setIncludeHashtags}
                  />
                </div>
              </div>

              <Button
                onClick={generateContent}
                disabled={isGenerating || !topic.trim()}
                className="w-full mt-4 bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate YouTube Short Content
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="output" className="mt-0">
              {contentGenerated && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-lg font-medium">Script</Label>
                      <Button variant="outline" size="sm" onClick={copyScript} className="flex items-center gap-1">
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-md overflow-auto max-h-60">
                      <p className="whitespace-pre-wrap">{contentGenerated.script}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-medium mb-2 block">Visual Ideas</Label>
                    <div className="space-y-2">
                      {contentGenerated.visualIdeas.map((idea, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-secondary/20 rounded-md">
                          <div className="bg-primary/20 p-1 rounded text-primary flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p>{idea}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {includeHashtags && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-lg font-medium">Hashtags</Label>
                        <Button variant="outline" size="sm" onClick={copyHashtags} className="flex items-center gap-1">
                          <Copy className="h-3 w-3" />
                          Copy
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {contentGenerated.hashtags.map((hashtag, index) => (
                          <div key={index} className="bg-secondary/30 px-2 py-1 rounded text-sm">
                            {hashtag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {includeDescription && (
                    <div>
                      <Label className="text-lg font-medium mb-2 block">Thumbnail Idea</Label>
                      <div className="bg-secondary/30 p-4 rounded-md">
                        <p>{contentGenerated.thumbnail}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setActiveTab('input')}
                    >
                      Edit Parameters
                    </Button>
                    <Button
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={regenerateContent}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Regenerate Content
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>YouTube Shorts Best Practices</CardTitle>
            <CardDescription>Tips to maximize views and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Grab Attention in First 2-3 Seconds</h3>
                  <p className="text-sm text-muted-foreground">
                    Start with a hook or surprising information to prevent viewers from scrolling past.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Keep Content Focused</h3>
                  <p className="text-sm text-muted-foreground">
                    Cover one main topic or idea per Short. Don't try to cover too much in 60 seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Use On-Screen Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Add captions or key points as text overlays to improve engagement and accessibility.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">End With Clear Call-to-Action</h3>
                  <p className="text-sm text-muted-foreground">
                    Tell viewers exactly what you want them to do next (subscribe, comment, visit link in bio).
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Leverage Trending Sounds</h3>
                  <p className="text-sm text-muted-foreground">
                    Using trending audio can significantly increase your short's visibility in the algorithm.
                  </p>
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
