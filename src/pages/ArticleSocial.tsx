
import React, { useState } from 'react';
import { Share2, Download, Copy, RefreshCw, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
  characterCount: number;
  limit: number;
}

const ArticleSocial = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState('');
  const [tone, setTone] = useState('professional');
  const [targetAudience, setTargetAudience] = useState('general');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [customHashtags, setCustomHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, limit: 280 },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, limit: 3000 },
    { id: 'instagram', name: 'Instagram', icon: Instagram, limit: 2200 },
    { id: 'facebook', name: 'Facebook', icon: Facebook, limit: 63206 }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'educational', label: 'Educational' },
    { value: 'promotional', label: 'Promotional' }
  ];

  const audiences = [
    { value: 'general', label: 'General Audience' },
    { value: 'business', label: 'Business Professionals' },
    { value: 'tech', label: 'Tech Enthusiasts' },
    { value: 'students', label: 'Students' },
    { value: 'entrepreneurs', label: 'Entrepreneurs' },
    { value: 'marketers', label: 'Marketers' }
  ];

  const generateSocialContent = (platform: string, article: string, tone: string, audience: string): string => {
    const keyPoints = extractKeyPoints(article);
    const platformConfig = platforms.find(p => p.id === platform);
    
    let content = '';
    
    switch (platform) {
      case 'twitter':
        content = generateTwitterContent(keyPoints, tone, audience);
        break;
      case 'linkedin':
        content = generateLinkedInContent(keyPoints, tone, audience);
        break;
      case 'instagram':
        content = generateInstagramContent(keyPoints, tone, audience);
        break;
      case 'facebook':
        content = generateFacebookContent(keyPoints, tone, audience);
        break;
    }
    
    return content;
  };

  const extractKeyPoints = (text: string): string[] => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    return sentences.slice(0, 5).map(s => s.trim());
  };

  const generateTwitterContent = (points: string[], tone: string, audience: string): string => {
    const mainPoint = points[0] || 'Key insight from the article';
    let content = '';
    
    if (tone === 'professional') {
      content = `💡 ${mainPoint.substring(0, 200)}...\n\nWhat are your thoughts?`;
    } else if (tone === 'casual') {
      content = `Just read something interesting: ${mainPoint.substring(0, 180)}...\n\nThoughts? 🤔`;
    } else if (tone === 'inspiring') {
      content = `🌟 ${mainPoint.substring(0, 180)}...\n\nYou've got this! 💪`;
    }
    
    return content.substring(0, 240);
  };

  const generateLinkedInContent = (points: string[], tone: string, audience: string): string => {
    const hook = points[0] || 'Interesting insights ahead';
    let content = '';
    
    if (tone === 'professional') {
      content = `${hook}\n\nKey takeaways:\n`;
      points.slice(1, 4).forEach((point, index) => {
        content += `${index + 1}. ${point}\n`;
      });
      content += '\nWhat\'s your experience with this? Share your thoughts below. 👇';
    } else if (tone === 'educational') {
      content = `📚 Learning Moment:\n\n${hook}\n\nHere's what I found valuable:\n`;
      points.slice(1, 3).forEach((point, index) => {
        content += `• ${point}\n`;
      });
      content += '\n💭 How do you apply these concepts in your work?';
    }
    
    return content;
  };

  const generateInstagramContent = (points: string[], tone: string, audience: string): string => {
    const mainPoint = points[0] || 'Amazing insights to share';
    let content = '';
    
    if (tone === 'casual') {
      content = `✨ ${mainPoint}\n\nSwipe to see more insights! ➡️\n\nDouble tap if you agree! 💙`;
    } else if (tone === 'inspiring') {
      content = `🌟 ${mainPoint}\n\n💫 Remember: Every expert was once a beginner\n💪 Keep pushing forward\n🚀 Your journey matters`;
    }
    
    return content;
  };

  const generateFacebookContent = (points: string[], tone: string, audience: string): string => {
    const hook = points[0] || 'Thought-provoking content ahead';
    let content = `${hook}\n\n`;
    
    points.slice(1, 3).forEach((point, index) => {
      content += `${index + 1}. ${point}\n\n`;
    });
    
    content += 'What do you think about this? I\'d love to hear your perspective in the comments! 👇';
    
    return content;
  };

  const generateHashtags = (platform: string, content: string, customTags: string): string[] => {
    const defaultTags = ['content', 'insights', 'learning', 'growth', 'tips'];
    const custom = customTags.split(',').map(tag => tag.trim().replace('#', '')).filter(Boolean);
    
    let platformTags: string[] = [];
    
    switch (platform) {
      case 'twitter':
        platformTags = ['twitter', 'thread', 'tips'];
        break;
      case 'linkedin':
        platformTags = ['linkedin', 'professional', 'career', 'business'];
        break;
      case 'instagram':
        platformTags = ['instagram', 'motivation', 'inspiration', 'daily'];
        break;
      case 'facebook':
        platformTags = ['facebook', 'community', 'discussion'];
        break;
    }
    
    const allTags = [...custom, ...defaultTags, ...platformTags];
    return allTags.slice(0, platform === 'instagram' ? 30 : 10);
  };

  const handleGenerate = async () => {
    if (!article.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter an article to convert",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const posts: SocialPost[] = platforms.map(platform => {
        const content = generateSocialContent(platform.id, article, tone, targetAudience);
        const hashtags = includeHashtags ? generateHashtags(platform.id, content, customHashtags) : [];
        const fullContent = includeHashtags ? `${content}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}` : content;
        
        return {
          platform: platform.name,
          content: fullContent,
          hashtags,
          characterCount: fullContent.length,
          limit: platform.limit
        };
      });

      setSocialPosts(posts);
      
      toast({
        title: "Success!",
        description: "Social media content generated successfully",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate social content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string, platform: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: `${platform} content copied to clipboard`,
    });
  };

  const downloadContent = () => {
    const content = socialPosts.map(post => 
      `=== ${post.platform} ===\n${post.content}\n\nCharacter Count: ${post.characterCount}/${post.limit}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social-media-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPlatformIcon = (platformName: string) => {
    const platform = platforms.find(p => p.name === platformName);
    if (!platform) return Share2;
    return platform.icon;
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
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <Share2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Article-to-Social Package</h1>
        <p className="text-muted-foreground mt-2">Convert articles to social media content in one click</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Article Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="article">Article Content</Label>
                <Textarea
                  id="article"
                  placeholder="Paste your article content here..."
                  className="min-h-[200px]"
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tone">Content Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map(tone => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map(audience => (
                      <SelectItem key={audience.value} value={audience.value}>
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hashtags">Custom Hashtags (comma-separated)</Label>
                <Input
                  id="hashtags"
                  placeholder="marketing, business, growth"
                  value={customHashtags}
                  onChange={(e) => setCustomHashtags(e.target.value)}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerate} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 h-4 w-4" />
                    Generate Social Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          {socialPosts.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Generated Content</h2>
                <Button onClick={downloadContent} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>

              <Tabs defaultValue={socialPosts[0]?.platform.toLowerCase().replace('/', '')} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {socialPosts.map((post) => {
                    const Icon = getPlatformIcon(post.platform);
                    return (
                      <TabsTrigger 
                        key={post.platform} 
                        value={post.platform.toLowerCase().replace('/', '')}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{post.platform}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {socialPosts.map((post) => {
                  const Icon = getPlatformIcon(post.platform);
                  return (
                    <TabsContent 
                      key={post.platform} 
                      value={post.platform.toLowerCase().replace('/', '')}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              {post.platform}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={post.characterCount > post.limit ? "destructive" : "secondary"}
                              >
                                {post.characterCount}/{post.limit}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(post.content, post.platform)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-4 rounded-md">
                            <pre className="whitespace-pre-wrap font-sans text-sm">
                              {post.content}
                            </pre>
                          </div>
                          {post.hashtags.length > 0 && (
                            <div className="mt-4">
                              <Label className="text-sm font-medium">Hashtags Used:</Label>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {post.hashtags.map((hashtag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    #{hashtag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          ) : (
            <Card className="border-2 border-dashed border-muted-foreground/20">
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center">
                  <Share2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Content Generated Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your article content and click "Generate Social Content" to see the magic!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleSocial;
