import React, { useState } from 'react';
import { FileText, Copy, Wand2, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface ScriptResult {
  title: string;
  content: string;
}

const TiktokScript = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('general');
  const [toneValue, setToneValue] = useState('casual');
  const [scriptDuration, setScriptDuration] = useState([30]);
  const [includeHook, setIncludeHook] = useState(true);
  const [includeCallToAction, setIncludeCallToAction] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [activeTab, setActiveTab] = useState('editor');

  // Helper function to get a random element from an array
  const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Sample script templates
  const hooks = [
    "Wait until the end to see how this changed everything!",
    "You won't believe what happens next...",
    "This hack will save you so much time!",
    "I discovered this trick and I had to share it!",
    "This is the one thing nobody tells you about [topic]"
  ];

  const callToActions = [
    "Follow for more tips like this!",
    "Comment if you want a part 2!",
    "Let me know if this helped you!",
    "Save this for later!",
    "Tag a friend who needs to see this!"
  ];

  // Sample script templates by tone
  const scriptTemplates: Record<string, string[]> = {
    casual: [
      "Hey guys! Today I'm going to show you [topic]. It's super simple and anyone can do it! [hook] First, you'll want to [step1]. Then, [step2]. Finally, [step3]. And that's it! [callToAction]",
      "Okay so check this out. I found this amazing thing about [topic] and I had to share! [hook] So here's what you do: [step1], [step2], and then [step3]. Trust me, it works every time! [callToAction]",
      "So I was just [relevant activity] when I realized something about [topic]. [hook] Let me break it down: [step1], [step2], and [step3]. Game-changer, right? [callToAction]"
    ],
    professional: [
      "Today I'd like to share some valuable insights about [topic]. [hook] Let's cover three key points: First, [step1]. Second, [step2]. And finally, [step3]. These strategies can significantly improve your results. [callToAction]",
      "I've been researching [topic] for some time now, and I've discovered some important findings. [hook] Here's what you need to know: [step1], [step2], and [step3]. Implementing these can lead to substantial improvements. [callToAction]",
      "Let's discuss [topic] and why it matters for your success. [hook] Consider these three factors: [step1], [step2], and [step3]. Understanding these elements is crucial for achieving optimal results. [callToAction]"
    ],
    humorous: [
      "Alright, who else is tired of struggling with [topic]? *dramatic sigh* [hook] Here's my totally not embarrassing solution: [step1], then somehow [step2], and if all else fails, just [step3]. Works 60% of the time, every time! [callToAction]",
      "Tell me if this sounds familiar: you're trying to [related problem] and suddenly [comedic disaster]. Well, fear no more! [hook] Just follow these steps if you dare: [step1], the slightly weird [step2], and the absolutely ridiculous but effective [step3]. You're welcome! [callToAction]",
      "So my mom/friend/cat told me I shouldn't share this about [topic], but here we are! [hook] The secret sauce is: [step1], followed by [step2], and topped with [step3]. I can't believe this actually works but it does! [callToAction]"
    ],
    educational: [
      "Today we're exploring [topic], a fascinating subject that many people misunderstand. [hook] Let's examine three key aspects: [step1], [step2], and [step3]. Understanding these concepts will give you a solid foundation. [callToAction]",
      "I'd like to address a common question about [topic]. [hook] To properly understand this, we need to consider: [step1], the relationship with [step2], and how [step3] impacts the overall outcome. This knowledge is essential for mastery. [callToAction]",
      "Let's break down [topic] into its core components. [hook] We'll focus on three main elements: [step1], followed by [step2], and concluding with [step3]. This structured approach makes the concept much more accessible. [callToAction]"
    ],
    dramatic: [
      "I never thought [topic] would change my life until THIS happened. [hook] My journey began with [step1]. Then, against all odds, I discovered [step2]. Finally, the moment that changed everything: [step3]. Nothing was the same after that. [callToAction]",
      "What I'm about to share about [topic] shocked me to my core. [hook] It all started when I realized [step1]. The turning point? When I discovered [step2]. And the final revelation: [step3]. This discovery transformed everything I thought I knew. [callToAction]",
      "I was at my lowest point with [related problem] when I uncovered this truth about [topic]. [hook] First came the realization: [step1]. Then the breakthrough: [step2]. Finally, the transformation: [step3]. This changed everything for me. [callToAction]"
    ]
  };

  const generateScript = () => {
    if (!topic.trim()) {
      toast({
        variant: "destructive",
        title: "Topic required",
        description: "Please enter a topic for your TikTok script.",
      });
      return;
    }

    setGenerating(true);
    setResult(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Select a template based on tone
        const templates = scriptTemplates[toneValue] || scriptTemplates.casual;
        const template = getRandomElement(templates);
        
        // Generate script components
        const hook = includeHook ? getRandomElement(hooks) : "";
        const callToAction = includeCallToAction ? getRandomElement(callToActions) : "";
        
        // Generate fake steps based on topic
        const step1 = `understand the basics of ${topic}`;
        const step2 = `apply the key principles in a practical way`;
        const step3 = `refine your approach and see amazing results`;
        
        // Build script from template
        let scriptContent = template
          .replace("[topic]", topic)
          .replace("[hook]", hook ? hook : "")
          .replace("[step1]", step1)
          .replace("[step2]", step2)
          .replace("[step3]", step3)
          .replace("[callToAction]", callToAction);
        
        // Ensure script is appropriate length based on duration
        const wordsPerSecond = 2.5; // Average speaking rate
        const targetWordCount = scriptDuration[0] * wordsPerSecond;
        const currentWordCount = scriptContent.split(/\s+/).length;
        
        // Adjust script length if needed
        if (currentWordCount > targetWordCount * 1.2) {
          scriptContent = scriptContent.split(/\s+/).slice(0, Math.floor(targetWordCount)).join(" ") + "... [callToAction]";
          scriptContent = scriptContent.replace("[callToAction]", callToAction);
        }
        
        setResult({
          title: `TikTok Script: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
          content: scriptContent
        });
        
        setActiveTab('result');
        
        toast({
          title: "Script generated!",
          description: "Your TikTok script has been created successfully.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Generation failed",
          description: "There was a problem generating your script. Please try again.",
        });
      } finally {
        setGenerating(false);
      }
    }, 2000);
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(result.content);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard.",
    });
  };

  const regenerateScript = () => {
    generateScript();
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">TikTok Script Writer</h1>
        <p className="text-muted-foreground mb-8">Create engaging scripts for your TikTok videos</p>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <Card>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="result" disabled={!result}>Result</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="editor" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic or Main Idea</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., productivity tips, cooking hacks, makeup tutorial"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      What is your TikTok video about? Be specific for better results.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select value={audience} onValueChange={setAudience}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Audience</SelectItem>
                          <SelectItem value="teens">Teenagers</SelectItem>
                          <SelectItem value="youngAdults">Young Adults</SelectItem>
                          <SelectItem value="professionals">Professionals</SelectItem>
                          <SelectItem value="parents">Parents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tone">Tone</Label>
                      <Select value={toneValue} onValueChange={setToneValue}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual & Conversational</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <Label>Script Duration: {scriptDuration[0]} seconds</Label>
                    </div>
                    <Slider
                      min={15}
                      max={60}
                      step={5}
                      value={scriptDuration}
                      onValueChange={setScriptDuration}
                      className="my-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>15 sec</span>
                      <span>30 sec</span>
                      <span>60 sec</span>
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="include-hook" className="text-base">Include Hook</Label>
                        <p className="text-xs text-muted-foreground">
                          Add an attention-grabbing hook to your script
                        </p>
                      </div>
                      <Switch
                        id="include-hook"
                        checked={includeHook}
                        onCheckedChange={setIncludeHook}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="include-cta" className="text-base">Include Call to Action</Label>
                        <p className="text-xs text-muted-foreground">
                          Add a call to action at the end of your script
                        </p>
                      </div>
                      <Switch
                        id="include-cta"
                        checked={includeCallToAction}
                        onCheckedChange={setIncludeCallToAction}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={generateScript}
                    disabled={generating || !topic.trim()}
                    className="w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-2"
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        Generate TikTok Script
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="result" className="space-y-4 mt-0">
                {result && (
                  <>
                    <div>
                      <Label className="text-muted-foreground text-sm">Title</Label>
                      <h3 className="text-lg font-semibold">{result.title}</h3>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Script</Label>
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4 mr-1" /> Copy
                        </Button>
                      </div>
                      <div className="bg-secondary/20 p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                        {result.content}
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setActiveTab('editor')}
                      >
                        Edit Parameters
                      </Button>
                      <Button
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={regenerateScript}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Regenerate Script
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for Great TikTok Scripts</CardTitle>
            <CardDescription>How to maximize engagement with your videos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Start Strong</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  You have 3 seconds to capture attention. Start with a strong hook or surprising statement.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Keep It Concise</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Speak clearly and get to the point. Avoid unnecessary words or filler content.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Create Curiosity</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tease interesting information or a payoff that will keep viewers watching until the end.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Be Authentic</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Speak naturally and let your personality shine through. Authenticity builds connection.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Call to Action</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  End with a clear call to action: follow, like, comment, or save for later.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Trend Awareness</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Incorporate current TikTok trends, sounds, or challenges when relevant.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TiktokScript;
