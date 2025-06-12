
import React, { useState } from 'react';
import { List, ArrowLeft, Copy, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const BlogTopics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [niche, setNiche] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [contentType, setContentType] = useState('informative');
  const [topicStyle, setTopicStyle] = useState('10');
  const [topicCount, setTopicCount] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [generatedTopics, setGeneratedTopics] = useState<BlogTopic[]>([]);

  type BlogTopic = {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedReadTime: number; // in minutes
    keywords: string[];
    engagement: number; // 1-100 score
  };

  const handleGenerateTopics = () => {
    if (!niche.trim()) {
      toast({
        title: 'Niche required',
        description: 'Please provide a niche for your blog topics',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const topics = generateBlogTopics(
        niche,
        targetAudience,
        keywords.split(',').map(k => k.trim()).filter(Boolean),
        contentType,
        topicStyle,
        topicCount
      );
      
      setGeneratedTopics(topics);
      setLoading(false);
      
      toast({
        title: 'Topics generated!',
        description: `Generated ${topics.length} blog topic ideas`,
      });
    }, 2000);
  };

  const handleCopyTopic = (topic: string) => {
    navigator.clipboard.writeText(topic);
    toast({
      title: 'Copied to clipboard',
      description: 'Blog topic copied to clipboard',
    });
  };

  const handleCopyAll = () => {
    const allTopics = generatedTopics.map(topic => topic.title).join('\n\n');
    navigator.clipboard.writeText(allTopics);
    toast({
      title: 'All topics copied',
      description: 'All blog topics copied to clipboard',
    });
  };

  const generateBlogTopics = (
    niche: string,
    audience: string,
    keywordList: string[],
    type: string,
    style: string,
    count: number
  ): BlogTopic[] => {
    // Content type templates
    const contentTypeTemplates: Record<string, string[]> = {
      informative: [
        "The Complete Guide to {keyword}",
        "{number} Tips for Mastering {keyword}",
        "How to {verb} {keyword} Like a Pro",
        "Understanding {keyword}: A Beginner's Guide",
        "The Science Behind {keyword}",
        "Everything You Need to Know About {keyword}",
        "{number} Things You Didn't Know About {keyword}",
        "Common {keyword} Myths Debunked"
      ],
      storytelling: [
        "My Journey with {keyword}: Lessons Learned",
        "How {keyword} Changed My Perspective on {related}",
        "From Novice to Expert: A {keyword} Story",
        "The Day {keyword} Transformed My {related}",
        "What I Wish I Knew Before Starting with {keyword}",
        "Behind the Scenes: {keyword} in Action",
        "Confessions of a {niche} Enthusiast: {keyword} Edition"
      ],
      persuasive: [
        "Why You Should Start {verb+ing} {keyword} Today",
        "The Ultimate Reason {keyword} Will Improve Your {related}",
        "{number} Compelling Reasons to Try {keyword}",
        "How {keyword} Can Solve Your Biggest {problem}",
        "Why {keyword} is Essential for {audience}",
        "Stop Doing {related} Wrong: Why {keyword} is the Answer",
        "The Surprising Benefits of {keyword} for {audience}"
      ],
      listicle: [
        "{number} Best {keyword} Tools for {audience}",
        "Top {number} {keyword} Strategies That Actually Work",
        "{number} Effective Ways to Improve Your {keyword}",
        "The {number} Most Important {keyword} Trends for {year}",
        "{number} {keyword} Hacks Every {audience} Should Know",
        "{number} Common {keyword} Mistakes to Avoid",
        "The {number} Most Influential {keyword} Examples"
      ],
      howto: [
        "Step-by-Step Guide to {verb} {keyword}",
        "How to {verb} {keyword} in {timeframe}",
        "A Foolproof Method for {verb+ing} {keyword}",
        "How to Create a Successful {keyword} Strategy",
        "Mastering {keyword}: A Practical Guide",
        "The Right Way to Approach {keyword}",
        "How to Measure the Success of Your {keyword} Efforts"
      ],
      comparison: [
        "{keyword} vs. {alternative}: Which is Better?",
        "{number} Alternatives to {keyword} Worth Considering",
        "Comparing the Top {number} {keyword} {items}",
        "Is {keyword} Better Than {alternative}? An Objective Analysis",
        "{keyword} or {alternative}: Making the Right Choice for {audience}",
        "The Pros and Cons of {keyword} vs. {alternative}"
      ]
    };
    
    // Topic style templates
    const topicStyleTemplates: Record<string, any> = {
      '10': {
        prefixes: ["10 ", "Top 10 ", "10 Essential ", "10 Powerful "],
        suffixes: [" You Need to Know", " for Success", " That Will Transform Your Results", " Experts Recommend"]
      },
      'why': {
        prefixes: ["Why ", "Why You Should ", "The Reason Why ", "Why Every Professional Must "],
        suffixes: [" Matters", " Is Essential", " Changes Everything", " Is Worth Your Time"]
      },
      'how': {
        prefixes: ["How to ", "How You Can ", "The Ultimate Guide to ", "Simple Steps to "],
        suffixes: [" Like a Pro", " In Under 30 Days", " Without Breaking the Bank", " For Beginners"]
      },
      'what': {
        prefixes: ["What is ", "What You Should Know About ", "Understanding ", "The Truth About "],
        suffixes: [" Explained", " Demystified", " - The Complete Guide", " That Most People Miss"]
      }
    };
    
    // Random helpers
    const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const getRandomInt = (min: number, max: number): number => 
      Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Build templates based on type and style
    let templates: string[] = [];
    
    // Use content type templates
    if (contentTypeTemplates[type]) {
      templates = templates.concat(contentTypeTemplates[type]);
    } else {
      // Default to informative
      templates = templates.concat(contentTypeTemplates.informative);
    }
    
    // Add variety based on style preference
    if (style !== 'generic') {
      const styleTemplate = topicStyleTemplates[style];
      if (styleTemplate) {
        for (let i = 0; i < 3; i++) {
          const prefix = getRandomElement(styleTemplate.prefixes);
          const suffix = getRandomElement(styleTemplate.suffixes);
          templates.push(`${prefix}{keyword}${suffix}`);
        }
      }
    }
    
    // Common variables for substitution
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const verbs = ["Optimize", "Improve", "Master", "Transform", "Leverage", "Maximize", "Develop"];
    const verbsIng = ["Optimizing", "Improving", "Mastering", "Transforming", "Leveraging", "Maximizing", "Developing"];
    const problems = ["Challenges", "Problems", "Obstacles", "Difficulties", "Struggles", "Bottlenecks"];
    const timeframes = ["30 Days", "One Week", "24 Hours", "10 Minutes a Day", "2023", "This Year"];
    
    // Related terms based on niche
    const niches = niche.split(' ');
    const relatedTerms = [
      niche,
      ...niches,
      `${niche} strategy`,
      `${niche} techniques`,
      `${niche} for beginners`,
      `advanced ${niche}`,
      `${niche} industry`
    ];
    
    // Generate topics
    const topics: BlogTopic[] = [];
    const usedTitles = new Set<string>();
    
    for (let i = 0; i < count * 2 && topics.length < count; i++) {
      // Pick a template
      const template = getRandomElement(templates);
      
      // Choose keyword to focus on
      let keyword = niche;
      if (keywordList.length > 0 && Math.random() > 0.5) {
        keyword = getRandomElement(keywordList);
      }
      
      // Fill in template variables
      let title = template
        .replace('{keyword}', keyword)
        .replace('{niche}', niche)
        .replace('{audience}', audience || 'Professionals')
        .replace('{number}', String(getRandomInt(3, 21)))
        .replace('{verb}', getRandomElement(verbs))
        .replace('{verb+ing}', getRandomElement(verbsIng))
        .replace('{problem}', getRandomElement(problems))
        .replace('{related}', getRandomElement(relatedTerms))
        .replace('{alternative}', `Alternative ${keyword}`)
        .replace('{items}', `${keyword} Options`)
        .replace('{timeframe}', getRandomElement(timeframes))
        .replace('{year}', String(getRandomInt(0, 1) ? currentYear : nextYear));
      
      // Skip duplicates
      if (usedTitles.has(title)) continue;
      usedTitles.add(title);
      
      // Generate description
      const descriptions = [
        `Explore ${keyword} in depth and discover how it can benefit ${audience || 'your audience'}.`,
        `A comprehensive look at ${keyword} and why it matters for ${audience || 'professionals'} today.`,
        `Learn everything you need to know about ${keyword} and how to implement it effectively.`,
        `Discover the latest trends and best practices for ${keyword} in the ${niche} industry.`
      ];
      
      // Generate topic keywords
      const topicKeywords = [keyword];
      if (keywordList.length > 0) {
        for (let j = 0; j < 3; j++) {
          const kw = getRandomElement(keywordList);
          if (!topicKeywords.includes(kw)) {
            topicKeywords.push(kw);
          }
        }
      }
      
      // Determine difficulty level
      const difficulties: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
      const difficulty = getRandomElement(difficulties);
      
      // Estimate read time (3-20 minutes)
      const estimatedReadTime = getRandomInt(3, 20);
      
      // Calculate engagement score (50-95)
      let engagementScore = getRandomInt(50, 95);
      
      // Boost engagement for certain types of content
      if (title.includes("Guide") || title.includes("Step")) engagementScore += 5;
      if (title.includes("You Need")) engagementScore += 3;
      if (difficulty === 'beginner') engagementScore += 5;
      if (template.includes("{number}")) engagementScore += 7;
      
      engagementScore = Math.min(engagementScore, 100);
      
      topics.push({
        title,
        description: getRandomElement(descriptions),
        difficulty,
        estimatedReadTime,
        keywords: topicKeywords,
        engagement: engagementScore
      });
    }
    
    // Sort by engagement score
    return topics.sort((a, b) => b.engagement - a.engagement);
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
            <List className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Blog Topic Generator</h1>
          <p className="text-muted-foreground mt-2">Generate engaging blog topic ideas for your content strategy</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="niche">Blog Niche / Main Topic*</Label>
                  <Input 
                    id="niche"
                    placeholder="e.g. Digital Marketing, Fitness, Sustainable Living" 
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input 
                    id="targetAudience"
                    placeholder="e.g. Small Business Owners, College Students, New Parents" 
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Focus Keywords (comma separated)</Label>
                  <Input 
                    id="keywords"
                    placeholder="e.g. SEO, content marketing, Google analytics" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Topic Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="contentType">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informative">Informative & Educational</SelectItem>
                      <SelectItem value="storytelling">Storytelling</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="listicle">List Articles</SelectItem>
                      <SelectItem value="howto">How-To Guides</SelectItem>
                      <SelectItem value="comparison">Comparisons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Topic Style</Label>
                  <RadioGroup value={topicStyle} onValueChange={setTopicStyle}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10" id="listicle" />
                      <Label htmlFor="listicle">"10 Ways to..." Style</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="why" id="why" />
                      <Label htmlFor="why">"Why..." Style</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="how" id="how" />
                      <Label htmlFor="how">"How to..." Style</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="what" id="what" />
                      <Label htmlFor="what">"What is..." Style</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="generic" id="generic" />
                      <Label htmlFor="generic">Mix of Styles</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Number of Ideas: {topicCount}</Label>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between gap-2">
                      {[5, 10, 15, 20].map(count => (
                        <Button
                          key={count}
                          type="button"
                          variant={topicCount === count ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setTopicCount(count)}
                        >
                          {count}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerateTopics} 
                  disabled={loading || !niche.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    'Generate Blog Topics'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {generatedTopics.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Generated Blog Topics</h2>
              <Button 
                variant="outline"
                onClick={handleCopyAll}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy All Topics
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedTopics.map((topic, index) => (
                <Card key={index}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-semibold">{topic.title}</h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopyTopic(topic.title)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {topic.keywords.map((keyword, kidx) => (
                        <Badge key={kidx} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>Difficulty:</span>
                        <Badge variant="secondary" className="capitalize">{topic.difficulty}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Est. Read:</span>
                        <Badge variant="secondary">{topic.estimatedReadTime} min</Badge>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Engagement Potential</span>
                        <span className="text-xs font-medium">{topic.engagement}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            topic.engagement >= 80 ? 'bg-green-500' :
                            topic.engagement >= 65 ? 'bg-primary' : 'bg-amber-500'
                          }`} 
                          style={{ width: `${topic.engagement}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Blog Topic Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Focus on solving specific problems your audience is facing</li>
                <li>Consider trending topics in your niche for timely content</li>
                <li>Use numbers in your titles to set clear expectations</li>
                <li>Ask questions that spark curiosity and engagement</li>
                <li>Incorporate keywords naturally for better SEO performance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BlogTopics;
