
import React, { useState } from 'react';
import { ArrowLeft, Youtube, Wand2, Copy, Download, Eye, RefreshCw, TrendingUp, Target, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface ChannelData {
  name: string;
  niche: string;
  targetAudience: string;
  contentType: string;
  uploadSchedule: string;
  uniqueValue: string;
  keywords: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    website?: string;
    discord?: string;
  };
}

interface GeneratedDescription {
  main: string;
  seo: string;
  creative: string;
  professional: string;
}

const YoutubeDescription = () => {
  const navigate = useNavigate();
  
  const [channelData, setChannelData] = useState<ChannelData>({
    name: '',
    niche: '',
    targetAudience: '',
    contentType: '',
    uploadSchedule: '',
    uniqueValue: '',
    keywords: [],
    socialLinks: {}
  });
  
  const [descriptions, setDescriptions] = useState<GeneratedDescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<keyof GeneratedDescription>('main');
  const [keywordInput, setKeywordInput] = useState('');
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);

  const niches = [
    'Gaming', 'Technology', 'Education', 'Entertainment', 'Music', 
    'Fitness', 'Cooking', 'Travel', 'Fashion', 'DIY', 'Business',
    'Comedy', 'Vlogs', 'Reviews', 'Tutorials', 'Animation'
  ];

  const contentTypes = [
    'Tutorials', 'Reviews', 'Entertainment', 'Educational', 'Gaming',
    'Music', 'Comedy', 'Vlogs', 'How-to', 'Unboxing', 'Reactions',
    'Live Streams', 'Shorts', 'Documentary', 'Interviews'
  ];

  const uploadSchedules = [
    'Daily', 'Every other day', 'Twice a week', 'Weekly', 'Bi-weekly',
    'Monthly', 'Irregular', 'Multiple times per day'
  ];

  const descriptionStyles = [
    {
      id: 'main' as keyof GeneratedDescription,
      name: 'Balanced',
      description: 'Perfect mix of engaging and professional',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'seo' as keyof GeneratedDescription,
      name: 'SEO Optimized',
      description: 'Keyword-rich for better discoverability',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'creative' as keyof GeneratedDescription,
      name: 'Creative',
      description: 'Fun and engaging with personality',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 'professional' as keyof GeneratedDescription,
      name: 'Professional',
      description: 'Business-focused and credible',
      icon: <Users className="h-4 w-4" />
    }
  ];

  const addKeyword = () => {
    if (keywordInput.trim() && !channelData.keywords.includes(keywordInput.trim())) {
      setChannelData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setChannelData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const generateDescriptions = async () => {
    if (!channelData.name || !channelData.niche) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least channel name and niche.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const keywordsText = channelData.keywords.join(', ');
      const emojiPrefix = includeEmojis ? getEmojisForNiche(channelData.niche) : '';
      const hashtagsText = includeHashtags ? generateHashtags(channelData.niche, channelData.keywords) : '';
      const ctaText = includeCTA ? generateCTA() : '';
      const socialLinksText = generateSocialLinks();

      const generatedDescriptions: GeneratedDescription = {
        main: `${emojiPrefix} Welcome to ${channelData.name}! ${emojiPrefix}

🎯 Your go-to channel for ${channelData.niche.toLowerCase()} content that ${channelData.uniqueValue || 'delivers value and entertainment'}.

📺 What you'll find here:
• ${channelData.contentType || 'Amazing content'} focused on ${channelData.niche.toLowerCase()}
• ${channelData.uploadSchedule ? `New videos ${channelData.uploadSchedule.toLowerCase()}` : 'Regular uploads'}
• Content designed for ${channelData.targetAudience || 'viewers like you'}

${ctaText}

${socialLinksText}

${hashtagsText}`,

        seo: `${channelData.name} | ${channelData.niche} ${channelData.contentType} | ${keywordsText}

🔍 KEYWORDS: ${keywordsText}
📊 NICHE: ${channelData.niche}
🎥 CONTENT: ${channelData.contentType}
📅 SCHEDULE: ${channelData.uploadSchedule}

Welcome to the ultimate destination for ${channelData.niche.toLowerCase()} enthusiasts! Our channel specializes in ${channelData.contentType?.toLowerCase()} that helps ${channelData.targetAudience || 'viewers'} achieve their goals in ${channelData.niche.toLowerCase()}.

🎯 WHAT WE OFFER:
✅ High-quality ${channelData.contentType?.toLowerCase()} about ${channelData.niche.toLowerCase()}
✅ ${channelData.uploadSchedule ? `Consistent uploads ${channelData.uploadSchedule.toLowerCase()}` : 'Regular content updates'}
✅ Expert insights and practical tips
✅ Community-driven content based on your feedback

${socialLinksText}

TAGS: ${keywordsText}, ${channelData.niche}, YouTube channel, ${channelData.contentType}

${hashtagsText}`,

        creative: `${emojiPrefix} Hey there, awesome humans! ${emojiPrefix}

🌟 Welcome to ${channelData.name} - where ${channelData.niche.toLowerCase()} meets pure awesomeness! 

🎨 We're not just another channel... we're your ${channelData.niche.toLowerCase()} buddies who happen to make killer content! ${channelData.uniqueValue ? `Our secret sauce? ${channelData.uniqueValue}!` : ''}

✨ The magic happens here:
🎬 Epic ${channelData.contentType?.toLowerCase()} that'll blow your mind
🔥 Fresh content ${channelData.uploadSchedule ? channelData.uploadSchedule.toLowerCase() : 'all the time'}
💫 A community that actually cares about ${channelData.targetAudience || 'each other'}

🚀 Ready to join the adventure? Hit that subscribe button and let's create something amazing together!

${socialLinksText}

P.S. - Your comments make our day! Drop us a line and say hi! 👋

${hashtagsText}`,

        professional: `${channelData.name} - Professional ${channelData.niche} Content

ABOUT OUR CHANNEL:
We are dedicated to providing high-quality, educational content in the ${channelData.niche.toLowerCase()} space. Our mission is to empower ${channelData.targetAudience || 'our audience'} through expertly crafted ${channelData.contentType?.toLowerCase()}.

CONTENT STRATEGY:
• Comprehensive coverage of ${channelData.niche.toLowerCase()} topics
• ${channelData.uploadSchedule ? `Regular publishing schedule: ${channelData.uploadSchedule}` : 'Consistent content delivery'}
• Evidence-based information and practical applications
• Industry insights and professional perspectives

VALUE PROPOSITION:
${channelData.uniqueValue || `Expert-level ${channelData.niche.toLowerCase()} content designed to help you achieve your goals.`}

CONNECT WITH US:
${socialLinksText}

For business inquiries: [Your Email]

EXPERTISE AREAS: ${keywordsText}

${hashtagsText}`
      };

      setDescriptions(generatedDescriptions);
      
      toast({
        title: "Descriptions Generated!",
        description: "4 different styles created for your channel."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate descriptions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getEmojisForNiche = (niche: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Gaming': '🎮🕹️',
      'Technology': '💻⚡',
      'Education': '📚🎓',
      'Entertainment': '🎬🍿',
      'Music': '🎵🎶',
      'Fitness': '💪🏋️',
      'Cooking': '👨‍🍳🍳',
      'Travel': '✈️🌍',
      'Fashion': '👗💄',
      'DIY': '🔨🛠️',
      'Business': '💼📈',
      'Comedy': '😂🤣',
      'Vlogs': '📹✨'
    };
    return emojiMap[niche] || '✨🎯';
  };

  const generateHashtags = (niche: string, keywords: string[]): string => {
    const baseHashtags = [
      '#YouTube', '#Subscribe', '#NewVideo', '#Content'
    ];
    
    const nicheHashtags = [
      `#${niche.replace(/\s+/g, '')}`,
      `#${niche.replace(/\s+/g, '')}Channel`,
      `#${niche.replace(/\s+/g, '')}Community`
    ];

    const keywordHashtags = keywords.map(keyword => 
      `#${keyword.replace(/\s+/g, '')}`
    );

    return [...baseHashtags, ...nicheHashtags, ...keywordHashtags.slice(0, 7)]
      .join(' ');
  };

  const generateCTA = (): string => {
    const ctas = [
      "🔔 Don't forget to SUBSCRIBE and hit the bell icon for notifications!",
      "👍 LIKE this video if it helped you and SUBSCRIBE for more!",
      "🎯 Hit SUBSCRIBE and join our amazing community!",
      "✨ SUBSCRIBE for weekly content and join the family!",
      "🚀 Ready to level up? SUBSCRIBE and let's grow together!"
    ];
    return ctas[Math.floor(Math.random() * ctas.length)];
  };

  const generateSocialLinks = (): string => {
    const links = [];
    if (channelData.socialLinks.instagram) links.push(`📸 Instagram: ${channelData.socialLinks.instagram}`);
    if (channelData.socialLinks.twitter) links.push(`🐦 Twitter: ${channelData.socialLinks.twitter}`);
    if (channelData.socialLinks.website) links.push(`🌐 Website: ${channelData.socialLinks.website}`);
    if (channelData.socialLinks.discord) links.push(`💬 Discord: ${channelData.socialLinks.discord}`);
    
    return links.length > 0 ? `\n🔗 CONNECT WITH US:\n${links.join('\n')}\n` : '';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Description copied successfully!"
    });
  };

  const downloadDescriptions = () => {
    if (!descriptions) return;

    const content = Object.entries(descriptions)
      .map(([style, description]) => `=== ${style.toUpperCase()} STYLE ===\n\n${description}\n\n`)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${channelData.name.replace(/\s+/g, '_')}_descriptions.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "All descriptions downloaded successfully!"
    });
  };

  return (
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
        <div className="mx-auto bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
          <Youtube className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">YouTube Channel Description Generator</h1>
        <p className="text-xl text-muted-foreground">
          Create compelling channel descriptions that attract subscribers and improve discoverability
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Channel Information
              </CardTitle>
              <CardDescription>
                Tell us about your channel to generate personalized descriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="channel-name">Channel Name *</Label>
                  <Input
                    id="channel-name"
                    placeholder="My Awesome Channel"
                    value={channelData.name}
                    onChange={(e) => setChannelData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="niche">Niche *</Label>
                  <Select value={channelData.niche} onValueChange={(value) => setChannelData(prev => ({ ...prev, niche: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={channelData.contentType} onValueChange={(value) => setChannelData(prev => ({ ...prev, contentType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="upload-schedule">Upload Schedule</Label>
                  <Select value={channelData.uploadSchedule} onValueChange={(value) => setChannelData(prev => ({ ...prev, uploadSchedule: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="How often do you upload?" />
                    </SelectTrigger>
                    <SelectContent>
                      {uploadSchedules.map((schedule) => (
                        <SelectItem key={schedule} value={schedule}>
                          {schedule}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  placeholder="e.g., Beginner developers, Fitness enthusiasts"
                  value={channelData.targetAudience}
                  onChange={(e) => setChannelData(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="unique-value">What makes your channel unique?</Label>
                <Textarea
                  id="unique-value"
                  placeholder="Describe what sets your channel apart..."
                  value={channelData.uniqueValue}
                  onChange={(e) => setChannelData(prev => ({ ...prev, uniqueValue: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="keywords"
                    placeholder="Add a keyword..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {channelData.keywords.map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => removeKeyword(keyword)}
                    >
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="social" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="social">Social Links</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                </TabsList>
                
                <TabsContent value="social" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        placeholder="@username"
                        value={channelData.socialLinks.instagram || ''}
                        onChange={(e) => setChannelData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        placeholder="@username"
                        value={channelData.socialLinks.twitter || ''}
                        onChange={(e) => setChannelData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        value={channelData.socialLinks.website || ''}
                        onChange={(e) => setChannelData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, website: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord">Discord</Label>
                      <Input
                        id="discord"
                        placeholder="Discord invite link"
                        value={channelData.socialLinks.discord || ''}
                        onChange={(e) => setChannelData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, discord: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="options" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Include Emojis</Label>
                      <Switch
                        checked={includeEmojis}
                        onCheckedChange={setIncludeEmojis}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Include Hashtags</Label>
                      <Switch
                        checked={includeHashtags}
                        onCheckedChange={setIncludeHashtags}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Include Call-to-Action</Label>
                      <Switch
                        checked={includeCTA}
                        onCheckedChange={setIncludeCTA}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button 
                onClick={generateDescriptions}
                disabled={loading || !channelData.name || !channelData.niche}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Descriptions...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Descriptions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div>
          {descriptions ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Generated Descriptions
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => generateDescriptions()}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadDescriptions}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {descriptionStyles.map((style) => (
                    <Button
                      key={style.id}
                      variant={selectedStyle === style.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(style.id)}
                      className="justify-start"
                    >
                      {style.icon}
                      <div className="ml-2 text-left">
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs opacity-70">{style.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="relative">
                  <Textarea
                    value={descriptions[selectedStyle]}
                    readOnly
                    rows={15}
                    className="resize-none font-mono text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(descriptions[selectedStyle])}
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(descriptions[selectedStyle])}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Description
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Youtube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Fill in your channel information and generate descriptions to see them here
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoutubeDescription;
