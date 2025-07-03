
import React, { useState } from 'react';
import { Camera, ArrowLeft, Sparkles, Copy, Download, RefreshCw, Instagram, Twitter, Linkedin, Facebook, Youtube, TikTok } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface CaptionResult {
  platform: string;
  caption: string;
  hashtags: string[];
  characterCount: number;
  engagement: string;
}

interface PlatformConfig {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  maxLength: number;
  color: string;
}

const SocialCaptions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('casual');
  const [industry, setIndustry] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [keywords, setKeywords] = useState('');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'twitter', 'linkedin']);
  const [postType, setPostType] = useState('promotional');
  
  // Results state
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<CaptionResult[]>([]);
  const [activeTab, setActiveTab] = useState('input');

  const platforms: PlatformConfig[] = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, maxLength: 2200, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, maxLength: 280, color: 'bg-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, maxLength: 3000, color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, maxLength: 63206, color: 'bg-blue-700' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, maxLength: 5000, color: 'bg-red-500' },
    { id: 'tiktok', name: 'TikTok', icon: TikTok, maxLength: 300, color: 'bg-black' }
  ];

  const tones = [
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'enthusiastic', label: 'Enthusiastic & Energetic' },
    { value: 'humorous', label: 'Humorous & Fun' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'educational', label: 'Educational' },
    { value: 'luxury', label: 'Luxury & Premium' },
    { value: 'urgent', label: 'Urgent & Action-Oriented' }
  ];

  const postTypes = [
    { value: 'promotional', label: 'Promotional Post' },
    { value: 'educational', label: 'Educational Content' },
    { value: 'behind-scenes', label: 'Behind the Scenes' },
    { value: 'user-generated', label: 'User Generated Content' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'question', label: 'Question/Poll' },
    { value: 'testimonial', label: 'Testimonial/Review' },
    { value: 'tips', label: 'Tips & Advice' }
  ];

  const generateCaptions = async () => {
    if (!productName || !description) {
      toast({
        title: "Missing Information",
        description: "Please provide at least product name and description",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No Platforms Selected",
        description: "Please select at least one social media platform",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setCaptions([]);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const results: CaptionResult[] = selectedPlatforms.map(platformId => {
        const platform = platforms.find(p => p.id === platformId)!;
        const caption = generateCaptionForPlatform(platformId, {
          productName,
          description,
          targetAudience,
          tone,
          industry,
          callToAction,
          keywords,
          includeEmojis,
          includeHashtags,
          postType
        });

        const hashtags = includeHashtags ? generateHashtags(platformId, keywords, industry) : [];
        const fullCaption = includeHashtags ? `${caption}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}` : caption;

        return {
          platform: platform.name,
          caption: fullCaption,
          hashtags,
          characterCount: fullCaption.length,
          engagement: calculateEngagementScore(platformId, fullCaption, hashtags)
        };
      });

      setCaptions(results);
      setActiveTab('results');
      
      toast({
        title: "Captions Generated!",
        description: `Created ${results.length} optimized captions for your selected platforms`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate captions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateCaptionForPlatform = (platformId: string, data: any): string => {
    const { productName, description, targetAudience, tone, callToAction, includeEmojis, postType } = data;
    
    const emojis = includeEmojis ? getEmojisByTone(tone) : { hook: '', body: '', cta: '' };
    const platform = platforms.find(p => p.id === platformId)!;

    let caption = '';
    
    // Generate hook based on post type and tone
    const hook = generateHook(postType, tone, productName, emojis.hook);
    
    // Generate body content
    let body = '';
    if (platformId === 'twitter') {
      body = `${description.substring(0, 150)}...`;
    } else if (platformId === 'linkedin') {
      body = `${description}\n\n${targetAudience ? `Perfect for ${targetAudience} who want to` : 'This helps you'} achieve better results.`;
    } else {
      body = description;
    }

    // Generate call to action
    const cta = callToAction || generateCTA(postType, tone, emojis.cta);

    // Combine elements based on platform
    if (platformId === 'instagram') {
      caption = `${hook}\n\n${body}\n\n${cta}`;
    } else if (platformId === 'twitter') {
      caption = `${hook} ${body} ${cta}`;
    } else if (platformId === 'linkedin') {
      caption = `${hook}\n\n${body}\n\n${cta}\n\nWhat's your experience with this? Share below! 👇`;
    } else {
      caption = `${hook}\n\n${body}\n\n${cta}`;
    }

    // Ensure caption fits platform limits
    if (caption.length > platform.maxLength - 200) { // Leave room for hashtags
      const maxBodyLength = platform.maxLength - hook.length - cta.length - 100;
      body = body.substring(0, maxBodyLength) + '...';
      caption = `${hook}\n\n${body}\n\n${cta}`;
    }

    return caption;
  };

  const generateHook = (postType: string, tone: string, productName: string, emoji: string): string => {
    const hooks: Record<string, Record<string, string[]>> = {
      promotional: {
        casual: [`Hey there! ${emoji} Check out ${productName}!`, `${emoji} Just discovered something amazing!`],
        professional: [`Introducing ${productName} ${emoji}`, `${emoji} Professional solution: ${productName}`],
        enthusiastic: [`${emoji} AMAZING NEWS! ${productName} is here!`, `WOW! ${emoji} ${productName} will blow your mind!`],
        humorous: [`${emoji} Plot twist: ${productName} actually works!`, `${emoji} Warning: ${productName} may cause happiness!`]
      },
      educational: {
        casual: [`${emoji} Quick tip about ${productName}:`, `${emoji} Here's what I learned about ${productName}:`],
        professional: [`${emoji} Industry insight: ${productName}`, `${emoji} Professional tip regarding ${productName}:`]
      }
    };

    const categoryHooks = hooks[postType] || hooks.promotional;
    const toneHooks = categoryHooks[tone] || categoryHooks.casual;
    return toneHooks[Math.floor(Math.random() * toneHooks.length)];
  };

  const generateCTA = (postType: string, tone: string, emoji: string): string => {
    const ctas: Record<string, string[]> = {
      casual: [
        `What do you think? ${emoji}`,
        `Let me know in the comments! ${emoji}`,
        `Share your thoughts below ${emoji}`
      ],
      professional: [
        `Learn more in the comments ${emoji}`,
        `Connect with us for details ${emoji}`,
        `Reach out for more information ${emoji}`
      ],
      enthusiastic: [
        `Don't miss out! ${emoji}`,
        `Get yours now! ${emoji}`,
        `Join the excitement! ${emoji}`
      ]
    };

    const toneCtas = ctas[tone] || ctas.casual;
    return toneCtas[Math.floor(Math.random() * toneCtas.length)];
  };

  const getEmojisByTone = (tone: string) => {
    const emojiMap: Record<string, { hook: string; body: string; cta: string }> = {
      casual: { hook: '😊', body: '✨', cta: '💭' },
      professional: { hook: '🚀', body: '💼', cta: '📈' },
      enthusiastic: { hook: '🎉', body: '⚡', cta: '🔥' },
      humorous: { hook: '😄', body: '🎭', cta: '😂' },
      inspirational: { hook: '🌟', body: '💪', cta: '🙌' },
      luxury: { hook: '✨', body: '👑', cta: '💎' }
    };
    return emojiMap[tone] || emojiMap.casual;
  };

  const generateHashtags = (platformId: string, keywords: string, industry: string): string[] => {
    const keywordTags = keywords.split(',').map(k => k.trim().replace(/\s+/g, '')).filter(Boolean);
    const industryTags = industry ? [industry.replace(/\s+/g, '')] : [];
    
    const commonTags = ['socialmedia', 'marketing', 'business', 'entrepreneur'];
    const platformTags: Record<string, string[]> = {
      instagram: ['insta', 'ig', 'instadaily', 'instagood'],
      twitter: ['twitter', 'tweet', 'trending'],
      linkedin: ['linkedin', 'professional', 'networking', 'career'],
      facebook: ['facebook', 'community', 'social'],
      youtube: ['youtube', 'video', 'content'],
      tiktok: ['tiktok', 'viral', 'trending', 'fyp']
    };

    const allTags = [
      ...keywordTags,
      ...industryTags,
      ...commonTags,
      ...(platformTags[platformId] || [])
    ];

    // Limit hashtags based on platform
    const maxTags = platformId === 'twitter' ? 3 : platformId === 'instagram' ? 30 : 10;
    return allTags.slice(0, maxTags);
  };

  const calculateEngagementScore = (platformId: string, caption: string, hashtags: string[]): string => {
    let score = 70; // Base score
    
    // Adjust based on caption length
    if (platformId === 'twitter' && caption.length > 240) score -= 10;
    if (platformId === 'instagram' && caption.length < 100) score -= 5;
    
    // Adjust based on hashtags
    if (hashtags.length > 0) score += 5;
    if (hashtags.length > 15 && platformId === 'instagram') score += 5;
    
    // Adjust based on emojis
    const emojiCount = (caption.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || []).length;
    if (emojiCount > 0) score += 3;
    if (emojiCount > 5) score -= 2; // Too many emojis
    
    // Randomize slightly for realism
    score += Math.floor(Math.random() * 10) - 5;
    score = Math.max(60, Math.min(95, score));
    
    if (score >= 85) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 65) return 'Average';
    return 'Needs Improvement';
  };

  const copyCaption = (caption: string, platform: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied!",
      description: `${platform} caption copied to clipboard`,
    });
  };

  const downloadAllCaptions = () => {
    const content = captions.map(caption => 
      `=== ${caption.platform} ===\n${caption.caption}\n\nCharacter Count: ${caption.characterCount}\nEngagement Score: ${caption.engagement}\nHashtags: ${caption.hashtags.join(', ')}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social-media-captions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "All captions saved to your device",
    });
  };

  const getPlatformIcon = (platformName: string) => {
    const platform = platforms.find(p => p.name === platformName);
    return platform ? platform.icon : Camera;
  };

  return (
    <Layout>
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
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI Social Media Caption Generator</h1>
          <p className="text-muted-foreground mt-2">Create engaging, platform-optimized captions with hashtags and emojis</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input">Caption Setup</TabsTrigger>
            <TabsTrigger value="results">Generated Captions</TabsTrigger>
          </TabsList>

          <TabsContent value="input">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Product/Service Name *</Label>
                        <Input
                          id="product-name"
                          placeholder="e.g., Eco-Friendly Water Bottle"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          placeholder="e.g., Health & Fitness"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your product, service, or what you want to share..."
                        className="min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target-audience">Target Audience</Label>
                      <Input
                        id="target-audience"
                        placeholder="e.g., Health-conscious millennials"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input
                        id="keywords"
                        placeholder="e.g., sustainable, eco-friendly, health"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cta">Custom Call-to-Action (optional)</Label>
                      <Input
                        id="cta"
                        placeholder="e.g., Shop now and save 20%!"
                        value={callToAction}
                        onChange={(e) => setCallToAction(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Style Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Content Tone</Label>
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

                    <div className="space-y-2">
                      <Label>Post Type</Label>
                      <Select value={postType} onValueChange={setPostType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {postTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emojis">Include Emojis</Label>
                        <Switch
                          id="emojis"
                          checked={includeEmojis}
                          onCheckedChange={setIncludeEmojis}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="hashtags">Include Hashtags</Label>
                        <Switch
                          id="hashtags"
                          checked={includeHashtags}
                          onCheckedChange={setIncludeHashtags}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Select Platforms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {platforms.map(platform => {
                        const Icon = platform.icon;
                        return (
                          <div key={platform.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={platform.id}
                              checked={selectedPlatforms.includes(platform.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPlatforms([...selectedPlatforms, platform.id]);
                                } else {
                                  setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                                }
                              }}
                            />
                            <div className="flex items-center space-x-2">
                              <Icon className="h-4 w-4" />
                              <Label htmlFor={platform.id} className="cursor-pointer">
                                {platform.name}
                              </Label>
                              <Badge variant="outline" className="text-xs">
                                {platform.maxLength} chars
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={generateCaptions} 
                  disabled={loading} 
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Captions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Captions
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            {captions.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Generated Captions</h2>
                  <Button onClick={downloadAllCaptions} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {captions.map((caption, index) => {
                    const Icon = getPlatformIcon(caption.platform);
                    const platform = platforms.find(p => p.name === caption.platform);
                    
                    return (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              <CardTitle className="text-lg">{caption.platform}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={caption.characterCount > (platform?.maxLength || 1000) ? "destructive" : "secondary"}
                              >
                                {caption.characterCount}/{platform?.maxLength}
                              </Badge>
                              <Badge variant="outline">
                                {caption.engagement}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-muted p-4 rounded-md max-h-48 overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm font-sans">
                              {caption.caption}
                            </pre>
                          </div>
                          
                          {caption.hashtags.length > 0 && (
                            <div>
                              <Label className="text-sm font-medium">Hashtags:</Label>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {caption.hashtags.map((hashtag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    #{hashtag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <Button
                            onClick={() => copyCaption(caption.caption, caption.platform)}
                            className="w-full"
                            variant="outline"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Caption
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Card className="border-2 border-dashed border-muted-foreground/20">
                <CardContent className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Captions Generated Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Fill out the form and generate captions to see them here.
                    </p>
                    <Button onClick={() => setActiveTab('input')} variant="outline">
                      Go to Caption Setup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SocialCaptions;
