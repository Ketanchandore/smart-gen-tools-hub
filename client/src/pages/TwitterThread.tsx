
import React, { useState } from 'react';
import { Twitter, FileDown, Copy, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';

const TwitterThread = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [threadLength, setThreadLength] = useState([5]); // Default 5 tweets
  const [tone, setTone] = useState('conversational');
  const [includeTips, setIncludeTips] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeQuestions, setIncludeQuestions] = useState(true);
  const [generatedThread, setGeneratedThread] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: 'Topic required',
        description: 'Please provide a topic for your Twitter thread',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const thread = generateTwitterThread({
        topic,
        keyPoints: keyPoints.split('\n').filter(Boolean),
        length: threadLength[0],
        tone,
        includeTips,
        includeHashtags,
        includeQuestions
      });
      
      setGeneratedThread(thread);
      setLoading(false);
      
      toast({
        title: 'Thread generated!',
        description: `Your ${threadLength[0]}-tweet thread is ready.`,
      });
    }, 2000);
  };

  const handleCopy = () => {
    const formattedThread = generatedThread.map((tweet, i) => 
      `Tweet ${i+1}/${generatedThread.length}:\n${tweet}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(formattedThread);
    
    toast({
      title: 'Copied to clipboard',
      description: 'Twitter thread has been copied to your clipboard.',
    });
  };

  const handleDownload = () => {
    const formattedThread = generatedThread.map((tweet, i) => 
      `Tweet ${i+1}/${generatedThread.length}:\n${tweet}`
    ).join('\n\n');
    
    const blob = new Blob([formattedThread], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'twitter-thread.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Thread downloaded',
      description: 'Your Twitter thread has been downloaded as a text file.',
    });
  };

  type ThreadParams = {
    topic: string;
    keyPoints: string[];
    length: number;
    tone: string;
    includeTips: boolean;
    includeHashtags: boolean;
    includeQuestions: boolean;
  };

  const generateTwitterThread = ({
    topic,
    keyPoints,
    length,
    tone,
    includeTips,
    includeHashtags,
    includeQuestions
  }: ThreadParams): string[] => {
    // Helper to count characters
    const countChars = (text: string) => text.length;
    
    // Helper to truncate text to Twitter limit (280 chars)
    const truncateToTwitterLimit = (text: string) => {
      if (countChars(text) <= 280) return text;
      return text.substring(0, 277) + '...';
    };
    
    // Generate hashtags based on topic
    const generateHashtags = (topic: string) => {
      const words = topic.split(/\s+/);
      const hashtags = [];
      
      // Use topic words for hashtags
      for (const word of words) {
        if (word.length > 3 && !hashtags.includes(word)) {
          hashtags.push(word.replace(/[^\w]/g, ''));
        }
        if (hashtags.length >= 3) break;
      }
      
      // Add some general hashtags based on the content type
      if (topic.match(/how to|guide|tips/i)) hashtags.push('HowTo');
      if (topic.match(/learn|understand/i)) hashtags.push('Learning');
      if (topic.match(/business|entrepreneur|startup/i)) hashtags.push('Business');
      if (topic.match(/tech|technology|software|code/i)) hashtags.push('Tech');
      if (topic.match(/market|marketing/i)) hashtags.push('Marketing');
      
      return hashtags.slice(0, 4).map(tag => `#${tag}`);
    };
    
    // Generate engaging questions based on topic
    const generateQuestions = (topic: string) => {
      const questions = [
        `Have you ever wondered about ${topic}?`,
        `What's your experience with ${topic}?`,
        `Why is ${topic} important for your growth?`,
        `How has ${topic} changed your perspective?`,
        `What would you add to this thread about ${topic}?`
      ];
      return questions;
    };
    
    // Template intros based on tone
    const intros: Record<string, string[]> = {
      conversational: [
        `Hey everyone! Let's talk about ${topic} 🧵👇`,
        `I've been thinking a lot about ${topic} lately. Here are my thoughts 👇`,
        `${topic} is fascinating. Let me share what I've learned 🧵`
      ],
      professional: [
        `A comprehensive analysis of ${topic} and why it matters 🧵`,
        `${topic}: A detailed breakdown of key concepts and strategies 👇`,
        `Essential insights on ${topic} that every professional should know:`
      ],
      educational: [
        `${topic} explained: A thread breaking down the fundamentals 📚👇`,
        `Learning about ${topic}? Here's everything you need to know 🧵`,
        `The complete guide to understanding ${topic} 👇`
      ],
      humorous: [
        `${topic}... or as I like to call it "that thing everyone pretends to understand" 😂 Let me explain 👇`,
        `My somewhat questionable but entertaining take on ${topic} 🤣🧵`,
        `Buckle up for a slightly amusing journey through ${topic} 😎👇`
      ]
    };
    
    // Template closing tweets
    const closings = [
      `Thanks for reading this thread on ${topic}! Hope you found it valuable.`,
      `That's it for this thread on ${topic}. Let me know your thoughts!`,
      `This concludes my thread on ${topic}. Follow me for more content like this!`
    ];
    
    // Tips templates
    const tipTemplates = [
      `Tip: When dealing with ${topic}, remember to focus on the fundamentals first.`,
      `Pro tip: The best approach to ${topic} is to start small and iterate quickly.`,
      `Quick tip: Don't overcomplicate ${topic}. Simplicity often yields better results.`,
      `Insider tip: Most people get ${topic} wrong by overthinking it. Focus on action.`
    ];
    
    // Start generating the thread
    const thread: string[] = [];
    
    // First tweet (introduction)
    const introOptions = intros[tone] || intros.conversational;
    const intro = introOptions[Math.floor(Math.random() * introOptions.length)];
    thread.push(truncateToTwitterLimit(intro));
    
    // Determine how to distribute content
    const availableTweets = length - 2; // Subtract intro and conclusion
    const pointsToInclude = keyPoints.length > 0 ? keyPoints : generateDefaultPoints(topic, availableTweets);
    
    // Middle tweets (content)
    let tweetIndex = 0;
    while (tweetIndex < availableTweets) {
      // Add content points
      if (tweetIndex < pointsToInclude.length) {
        let tweetContent = pointsToInclude[tweetIndex];
        
        // Add a question if enabled and it's roughly in the middle of the thread
        if (includeQuestions && tweetIndex === Math.floor(availableTweets / 2)) {
          const questions = generateQuestions(topic);
          const question = questions[Math.floor(Math.random() * questions.length)];
          tweetContent += `\n\n${question}`;
        }
        
        thread.push(truncateToTwitterLimit(tweetContent));
      } 
      // Add tips if we've covered all points but still have tweets to fill
      else if (includeTips) {
        const tipIndex = tweetIndex % tipTemplates.length;
        thread.push(truncateToTwitterLimit(tipTemplates[tipIndex]));
      }
      // If no more content and tips not enabled, break
      else {
        break;
      }
      
      tweetIndex++;
    }
    
    // Last tweet (conclusion + hashtags)
    const conclusionIndex = Math.floor(Math.random() * closings.length);
    let conclusion = closings[conclusionIndex];
    
    if (includeHashtags) {
      const hashtags = generateHashtags(topic);
      conclusion += `\n\n${hashtags.join(' ')}`;
    }
    
    thread.push(truncateToTwitterLimit(conclusion));
    
    // If thread length is less than requested, add more content to reach the target
    while (thread.length < length) {
      if (includeTips) {
        const tipIndex = thread.length % tipTemplates.length;
        thread.push(truncateToTwitterLimit(tipTemplates[tipIndex]));
      } else {
        break;
      }
    }
    
    return thread;
  };
  
  const generateDefaultPoints = (topic: string, count: number): string[] => {
    const defaultPoints = [
      `One of the most important aspects of ${topic} is understanding the fundamentals. Many people overlook this step.`,
      `When working with ${topic}, always remember to focus on value first. What problem are you solving?`,
      `A common misconception about ${topic} is that it's too complex. In reality, the basics are straightforward.`,
      `Success with ${topic} comes from consistent application, not just knowledge. Practice is essential.`,
      `The future of ${topic} looks promising. Industry trends suggest continued growth and evolution.`,
      `Many experts in ${topic} recommend starting with small projects before tackling larger challenges.`,
      `Resources for learning ${topic} are abundant. Books, courses, and communities can accelerate your progress.`,
      `The history of ${topic} is fascinating and provides context for modern approaches and methodologies.`,
      `Measuring results is crucial when working with ${topic}. Define your metrics for success early on.`,
      `Collaboration often yields better results with ${topic}. Don't hesitate to seek input from others.`
    ];
    
    // Return the requested number of points, or all if count > default points available
    return defaultPoints.slice(0, Math.min(count, defaultPoints.length));
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
            <Twitter className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI Twitter Thread Generator</h1>
          <p className="text-muted-foreground mt-2">Create engaging Twitter threads that captivate your audience</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Thread Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Thread Topic*</Label>
                  <Input 
                    id="topic"
                    placeholder="e.g. 10 Productivity Tips for Remote Workers" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keyPoints">
                    Key Points (one per line, leave empty for AI suggestions)
                  </Label>
                  <Textarea 
                    id="keyPoints"
                    placeholder="Point 1&#10;Point 2&#10;Point 3" 
                    value={keyPoints}
                    onChange={(e) => setKeyPoints(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Thread Style & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Thread Length: {threadLength[0]} tweets</Label>
                    <span className="text-sm text-muted-foreground">
                      {threadLength[0] < 5 ? 'Short' : threadLength[0] < 10 ? 'Medium' : 'Long'}
                    </span>
                  </div>
                  <Slider
                    value={threadLength}
                    min={3}
                    max={15}
                    step={1}
                    onValueChange={setThreadLength}
                    className="py-4"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone">Thread Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select thread tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Thread Options</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={includeTips ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setIncludeTips(!includeTips)}
                    >
                      {includeTips ? "✓ " : ""}Include Tips
                    </Button>
                    <Button
                      type="button"
                      variant={includeHashtags ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setIncludeHashtags(!includeHashtags)}
                    >
                      {includeHashtags ? "✓ " : ""}Add Hashtags
                    </Button>
                    <Button
                      type="button"
                      variant={includeQuestions ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setIncludeQuestions(!includeQuestions)}
                    >
                      {includeQuestions ? "✓ " : ""}Add Questions
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !topic.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Thread...
                    </>
                  ) : (
                    'Generate Twitter Thread'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Thread</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedThread.length > 0 ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {generatedThread.map((tweet, index) => (
                        <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                              Tweet {index + 1}/{generatedThread.length}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {tweet.length}/280
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-sm">{tweet}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleCopy} variant="outline">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Thread
                      </Button>
                      <Button onClick={handleDownload}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Thread
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Twitter className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <p className="text-muted-foreground">
                      Your generated thread will appear here. Fill out the form and click "Generate Twitter Thread".
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Twitter Thread Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Start with a strong hook to grab your audience's attention</li>
                <li>Break complex ideas into digestible tweets</li>
                <li>Use relevant hashtags to increase visibility</li>
                <li>Include a call to action at the end of your thread</li>
                <li>Use numbers, emoji, and formatting to improve readability</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TwitterThread;
