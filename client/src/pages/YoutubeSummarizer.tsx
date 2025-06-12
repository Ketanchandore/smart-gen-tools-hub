import React, { useState } from 'react';
import { ArrowLeft, Youtube, Clock, FileText, Download, Play, Pause, Volume2, ExternalLink, Hash, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface VideoInfo {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  likes: string;
  publishDate: string;
  channel: string;
  thumbnail: string;
  tags: string[];
}

interface SummaryResult {
  videoInfo: VideoInfo;
  summary: string;
  keyPoints: string[];
  timestamps: Array<{
    time: string;
    description: string;
    importance: 'high' | 'medium' | 'low';
  }>;
  transcript?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  actionItems: string[];
  quotes: Array<{
    text: string;
    timestamp: string;
  }>;
  relatedVideos: Array<{
    title: string;
    url: string;
    duration: string;
  }>;
}

const YoutubeSummarizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [url, setUrl] = useState('');
  const [summaryType, setSummaryType] = useState('comprehensive');
  const [language, setLanguage] = useState('auto');
  const [length, setLength] = useState('medium');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeTranscript, setIncludeTranscript] = useState(false);
  const [includeQuotes, setIncludeQuotes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [currentStep, setCurrentStep] = useState('');

  const summaryTypes = [
    { value: 'comprehensive', label: 'Comprehensive Summary', description: 'Detailed analysis with all key points' },
    { value: 'executive', label: 'Executive Summary', description: 'Brief overview for decision makers' },
    { value: 'bullet', label: 'Bullet Points', description: 'Key takeaways in bullet format' },
    { value: 'chapters', label: 'Chapter Breakdown', description: 'Organized by video sections' },
    { value: 'educational', label: 'Educational Notes', description: 'Study-friendly format with Q&A' },
    { value: 'business', label: 'Business Insights', description: 'Focus on actionable business points' },
    { value: 'technical', label: 'Technical Analysis', description: 'Deep dive into technical concepts' },
    { value: 'creative', label: 'Creative Brief', description: 'Highlights creative and design elements' }
  ];

  const languages = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ar', label: 'Arabic' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'ru', label: 'Russian' },
    { value: 'nl', label: 'Dutch' },
    { value: 'sv', label: 'Swedish' }
  ];

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
      /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const generateMockVideoInfo = (videoId: string): VideoInfo => {
    const mockTitles = [
      "The Complete Guide to React Hooks in 2024",
      "AI Revolution: How Machine Learning is Changing Everything",
      "Building Scalable Web Applications with Modern JavaScript",
      "The Future of Web Development: Trends and Predictions",
      "Mastering TypeScript: Advanced Patterns and Techniques"
    ];

    const mockChannels = [
      "Tech Academy", "CodeMaster Pro", "Dev Insights", "Future Tech", "Web Dev Central"
    ];

    const mockTags = [
      ["react", "javascript", "web development", "frontend", "hooks"],
      ["AI", "machine learning", "technology", "automation", "future"],
      ["javascript", "scalability", "architecture", "backend", "performance"],
      ["web development", "trends", "technology", "innovation", "future"],
      ["typescript", "programming", "patterns", "advanced", "development"]
    ];

    const randomIndex = Math.floor(Math.random() * mockTitles.length);

    return {
      id: videoId,
      title: mockTitles[randomIndex],
      description: "This comprehensive video covers essential concepts and practical implementations...",
      duration: "25:43",
      views: "1.2M",
      likes: "45K",
      publishDate: "2024-01-15",
      channel: mockChannels[randomIndex],
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      tags: mockTags[randomIndex]
    };
  };

  const generateMockSummary = (videoInfo: VideoInfo): SummaryResult => {
    const summaries = {
      comprehensive: `This ${videoInfo.duration} video provides an in-depth exploration of ${videoInfo.title.toLowerCase()}. The presenter covers fundamental concepts, practical applications, and real-world examples. Key topics include implementation strategies, best practices, common pitfalls to avoid, and future trends in the field. The content is well-structured with clear explanations and actionable insights that viewers can immediately apply.`,
      
      executive: `${videoInfo.title} presents essential insights in ${videoInfo.duration}. Key takeaways include strategic approaches, implementation guidelines, and measurable outcomes. Recommended for decision-makers seeking practical solutions.`,
      
      bullet: `• Overview of core concepts and principles\n• Step-by-step implementation guide\n• Best practices and optimization techniques\n• Common challenges and solutions\n• Future trends and opportunities\n• Practical examples and case studies`,
      
      chapters: `Chapter 1: Introduction and Overview (0:00-5:30)\nChapter 2: Core Concepts Explained (5:30-12:15)\nChapter 3: Practical Implementation (12:15-18:45)\nChapter 4: Advanced Techniques (18:45-23:20)\nChapter 5: Conclusion and Next Steps (23:20-25:43)`,
      
      educational: `Learning Objectives:\n1. Understand fundamental principles\n2. Apply concepts in real scenarios\n3. Analyze implementation strategies\n\nKey Questions:\nQ: What are the main benefits?\nA: Improved efficiency, better performance, and scalability.\n\nQ: How to implement best practices?\nA: Follow systematic approach with proper testing.`,
      
      business: `Business Impact:\n• ROI: Estimated 25-40% improvement\n• Implementation Time: 2-4 weeks\n• Resource Requirements: 2-3 team members\n• Risk Assessment: Low to medium\n• Success Metrics: Performance, user satisfaction, cost reduction`,
      
      technical: `Technical Deep Dive:\n• Architecture patterns and design principles\n• Performance optimization techniques\n• Security considerations and implementations\n• Scalability solutions and load handling\n• Integration patterns with existing systems\n• Testing strategies and automation`,
      
      creative: `Creative Elements:\n• Visual design principles and aesthetics\n• User experience considerations\n• Brand alignment and messaging\n• Innovation opportunities\n• Creative problem-solving approaches\n• Design thinking methodologies`
    };

    return {
      videoInfo,
      summary: summaries[summaryType as keyof typeof summaries],
      keyPoints: [
        "Understanding fundamental concepts and their applications",
        "Practical implementation strategies and best practices",
        "Real-world examples and case studies analysis",
        "Common challenges identification and solution approaches",
        "Future trends and technological developments",
        "Performance optimization and scalability considerations"
      ],
      timestamps: [
        { time: "00:00", description: "Introduction and agenda overview", importance: 'medium' as const },
        { time: "02:30", description: "Core concept explanation begins", importance: 'high' as const },
        { time: "07:15", description: "First practical example demonstration", importance: 'high' as const },
        { time: "12:45", description: "Advanced techniques discussion", importance: 'high' as const },
        { time: "18:20", description: "Common pitfalls and how to avoid them", importance: 'medium' as const },
        { time: "22:10", description: "Q&A session and audience interaction", importance: 'low' as const },
        { time: "24:30", description: "Summary and key takeaways", importance: 'medium' as const }
      ],
      transcript: includeTranscript ? `Welcome to today's comprehensive guide. In this video, we'll explore the essential concepts that every professional should understand. Let's start with the fundamentals...\n\n[00:02:30] The first key principle we need to understand is the importance of systematic approach. This means breaking down complex problems into manageable components...\n\n[00:07:15] Now let's look at a practical example. Imagine you're working on a project where you need to implement these concepts...` : undefined,
      sentiment: 'positive',
      topics: videoInfo.tags,
      actionItems: [
        "Review the implementation checklist provided",
        "Set up development environment with recommended tools",
        "Practice with the sample code examples",
        "Join the community discussion for Q&A",
        "Schedule follow-up review in 2 weeks"
      ],
      quotes: includeQuotes ? [
        { text: "The key to success is understanding the fundamentals before moving to advanced concepts", timestamp: "03:45" },
        { text: "Best practices are not just guidelines, they're the foundation of sustainable solutions", timestamp: "14:20" },
        { text: "Remember, optimization without measurement is just guesswork", timestamp: "19:30" }
      ] : [],
      relatedVideos: [
        { title: "Advanced Concepts Deep Dive", url: "#", duration: "18:32" },
        { title: "Practical Implementation Tutorial", url: "#", duration: "22:15" },
        { title: "Common Mistakes and Solutions", url: "#", duration: "15:45" }
      ]
    };
  };

  const handleSummarize = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProgress(0);

    const steps = [
      "Extracting video information...",
      "Downloading video metadata...",
      "Processing audio track...",
      "Generating transcript...",
      "Analyzing content structure...",
      "Creating summary...",
      "Extracting key points...",
      "Generating timestamps...",
      "Finalizing results..."
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setProgress((i / steps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const videoInfo = generateMockVideoInfo(videoId);
      const summary = generateMockSummary(videoInfo);
      
      setProgress(100);
      setResult(summary);
      
      toast({
        title: "Summary Generated!",
        description: `Successfully processed "${videoInfo.title}"`,
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Processing Failed",
        description: "An error occurred while processing the video",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setCurrentStep('');
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const exportSummary = (format: string) => {
    if (!result) return;

    let content = '';
    let filename = '';
    let mimeType = '';

    const baseContent = `${result.videoInfo.title}\nChannel: ${result.videoInfo.channel}\nDuration: ${result.videoInfo.duration}\nViews: ${result.videoInfo.views}\nPublished: ${result.videoInfo.publishDate}\n\n`;

    switch (format) {
      case 'txt':
        content = `${baseContent}SUMMARY:\n${result.summary}\n\nKEY POINTS:\n${result.keyPoints.map(point => `• ${point}`).join('\n')}\n\nTIMESTAMPS:\n${result.timestamps.map(ts => `${ts.time} - ${ts.description}`).join('\n')}\n\nACTION ITEMS:\n${result.actionItems.map(item => `• ${item}`).join('\n')}`;
        filename = 'youtube-summary.txt';
        mimeType = 'text/plain';
        break;
      case 'md':
        content = `# ${result.videoInfo.title}\n\n**Channel:** ${result.videoInfo.channel}  \n**Duration:** ${result.videoInfo.duration}  \n**Views:** ${result.videoInfo.views}  \n**Published:** ${result.videoInfo.publishDate}\n\n## Summary\n${result.summary}\n\n## Key Points\n${result.keyPoints.map(point => `- ${point}`).join('\n')}\n\n## Timestamps\n${result.timestamps.map(ts => `- **${ts.time}** - ${ts.description}`).join('\n')}\n\n## Action Items\n${result.actionItems.map(item => `- ${item}`).join('\n')}`;
        filename = 'youtube-summary.md';
        mimeType = 'text/markdown';
        break;
      case 'json':
        content = JSON.stringify(result, null, 2);
        filename = 'youtube-summary.json';
        mimeType = 'application/json';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Summary exported as ${filename}`,
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
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
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-red-100">
          <Youtube className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold">YouTube Video Summarizer</h1>
        <p className="text-muted-foreground mt-2">AI-powered YouTube video analysis and summarization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Video Input & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="url">YouTube URL</Label>
                <Input
                  id="url"
                  placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Supports all YouTube URL formats including shorts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="summary-type">Summary Type</Label>
                  <Select value={summaryType} onValueChange={setSummaryType}>
                    <SelectTrigger id="summary-type" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {summaryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Output Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="length">Summary Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger id="length" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                      <SelectItem value="medium">Medium (3-4 paragraphs)</SelectItem>
                      <SelectItem value="long">Long (5+ paragraphs)</SelectItem>
                      <SelectItem value="detailed">Very Detailed (comprehensive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Additional Options</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={includeTimestamps}
                        onChange={(e) => setIncludeTimestamps(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Include timestamps</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={includeTranscript}
                        onChange={(e) => setIncludeTranscript(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Include full transcript</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={includeQuotes}
                        onChange={(e) => setIncludeQuotes(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Extract key quotes</span>
                    </label>
                  </div>
                </div>
              </div>

              {loading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{currentStep}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={handleSummarize} 
                disabled={loading || !url.trim()}
              >
                {loading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing Video...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Summary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Youtube className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">YouTube Integration</p>
                    <p className="text-sm text-muted-foreground">Direct processing from YouTube URLs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Multiple Formats</p>
                    <p className="text-sm text-muted-foreground">8 different summary types available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Smart Timestamps</p>
                    <p className="text-sm text-muted-foreground">Automatic chapter detection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Sentiment Analysis</p>
                    <p className="text-sm text-muted-foreground">Understand video tone and mood</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Export Options</p>
                    <p className="text-sm text-muted-foreground">TXT, Markdown, and JSON formats</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Summary Results
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => exportSummary('txt')}>
                  <Download className="h-4 w-4 mr-2" />
                  TXT
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportSummary('md')}>
                  <Download className="h-4 w-4 mr-2" />
                  Markdown
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportSummary('json')}>
                  <Download className="h-4 w-4 mr-2" />
                  JSON
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Video Info Section */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src={result.videoInfo.thumbnail} 
                    alt={result.videoInfo.title}
                    className="w-full md:w-48 h-auto rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{result.videoInfo.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Channel:</span>
                      <p className="font-medium">{result.videoInfo.channel}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{result.videoInfo.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Views:</span>
                      <p className="font-medium">{result.videoInfo.views}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Likes:</span>
                      <p className="font-medium">{result.videoInfo.likes}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${getSentimentColor(result.sentiment)} border-0`}>
                        {result.sentiment} sentiment
                      </Badge>
                      {result.videoInfo.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Hash className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
                <TabsTrigger value="action">Actions</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
                {result.transcript && <TabsTrigger value="transcript">Transcript</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="whitespace-pre-wrap">{result.summary}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.topics.map((topic, index) => (
                      <Badge key={index} variant="outline">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="keypoints">
                <div className="space-y-3">
                  {result.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="timestamps">
                <div className="space-y-3">
                  {result.timestamps.map((timestamp, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded-md border-l-4 ${getImportanceColor(timestamp.importance)}`}>
                      <Badge variant="outline" className="flex-shrink-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {timestamp.time}
                      </Badge>
                      <div className="flex-1">
                        <p>{timestamp.description}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {timestamp.importance} priority
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="action">
                <div className="space-y-3">
                  <h4 className="font-medium">Action Items</h4>
                  {result.actionItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      <input type="checkbox" className="mt-1 rounded" />
                      <p>{item}</p>
                    </div>
                  ))}
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Related Videos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {result.relatedVideos.map((video, index) => (
                        <div key={index} className="p-3 border rounded-md hover:bg-muted transition-colors">
                          <h5 className="font-medium text-sm">{video.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">Duration: {video.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="quotes">
                <div className="space-y-4">
                  {result.quotes.map((quote, index) => (
                    <div key={index} className="p-4 border-l-4 border-primary bg-muted rounded-md">
                      <blockquote className="text-lg italic mb-2">"{quote.text}"</blockquote>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{quote.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {result.transcript && (
                <TabsContent value="transcript">
                  <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
                    <p className="whitespace-pre-wrap text-sm">{result.transcript}</p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default YoutubeSummarizer;
