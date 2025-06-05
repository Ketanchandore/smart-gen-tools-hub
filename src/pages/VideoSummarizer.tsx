
import React, { useState } from 'react';
import { ArrowLeft, Video, Upload, Download, Clock, FileText, Play, Pause, Volume2 } from 'lucide-react';
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

interface SummaryResult {
  title: string;
  duration: string;
  summary: string;
  keyPoints: string[];
  timestamps: Array<{
    time: string;
    description: string;
  }>;
  tags: string[];
  transcript?: string;
}

const VideoSummarizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summaryType, setSummaryType] = useState('comprehensive');
  const [language, setLanguage] = useState('auto');
  const [length, setLength] = useState('medium');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeTranscript, setIncludeTranscript] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [activeTab, setActiveTab] = useState('url');

  const supportedPlatforms = [
    'YouTube', 'Vimeo', 'TikTok', 'Instagram', 'Twitter', 'Facebook',
    'Spotify Podcasts', 'Apple Podcasts', 'Google Podcasts', 'SoundCloud'
  ];

  const summaryTypes = [
    { value: 'comprehensive', label: 'Comprehensive Summary', description: 'Detailed overview with all key points' },
    { value: 'executive', label: 'Executive Summary', description: 'Brief overview for quick reading' },
    { value: 'bullet', label: 'Bullet Points', description: 'Key points in bullet format' },
    { value: 'chapters', label: 'Chapter Breakdown', description: 'Organized by topics/chapters' },
    { value: 'qa', label: 'Q&A Format', description: 'Questions and answers format' },
    { value: 'narrative', label: 'Narrative Style', description: 'Story-like summary format' }
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
    { value: 'ko', label: 'Korean' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        toast({
          title: "File uploaded",
          description: `${selectedFile.name} is ready for processing`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a valid video or audio file",
          variant: "destructive",
        });
      }
    }
  };

  const generateMockSummary = (): SummaryResult => {
    const summaries = {
      comprehensive: "This video/podcast discusses the importance of artificial intelligence in modern business. The speaker covers various applications of AI, including machine learning, natural language processing, and computer vision. Key topics include implementation strategies, common challenges, and future trends in AI technology.",
      executive: "AI is transforming businesses through automation and data insights. Key benefits include increased efficiency and better decision-making.",
      bullet: "• AI applications in business\n• Machine learning fundamentals\n• Implementation strategies\n• Common challenges\n• Future trends",
      chapters: "Chapter 1: Introduction to AI\nChapter 2: Machine Learning Basics\nChapter 3: Implementation Guide\nChapter 4: Case Studies\nChapter 5: Future Outlook",
      qa: "Q: What is artificial intelligence?\nA: AI is technology that enables machines to simulate human intelligence.\n\nQ: How can businesses benefit from AI?\nA: Through automation, data analysis, and improved decision-making.",
      narrative: "The journey into artificial intelligence begins with understanding its core concepts. As we explore the landscape of modern AI, we discover how businesses are leveraging these technologies to transform their operations and create new opportunities."
    };

    return {
      title: url || file?.name || "Sample Video/Podcast",
      duration: "45:30",
      summary: summaries[summaryType as keyof typeof summaries],
      keyPoints: [
        "Introduction to AI and its applications",
        "Machine learning fundamentals and algorithms",
        "Real-world implementation strategies",
        "Common challenges and solutions",
        "Future trends and predictions"
      ],
      timestamps: [
        { time: "00:00", description: "Introduction and overview" },
        { time: "05:30", description: "AI fundamentals explained" },
        { time: "12:45", description: "Machine learning concepts" },
        { time: "23:10", description: "Implementation strategies" },
        { time: "35:20", description: "Case studies and examples" },
        { time: "42:15", description: "Future trends discussion" }
      ],
      tags: ["AI", "Machine Learning", "Technology", "Business", "Innovation"],
      transcript: includeTranscript ? "Welcome to today's discussion about artificial intelligence. In this session, we'll explore the fundamental concepts of AI and how they're being applied in modern business environments..." : undefined
    };
  };

  const handleSummarize = async () => {
    if (!url && !file) {
      toast({
        title: "Input required",
        description: "Please provide a URL or upload a file to summarize",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      // Simulate API processing
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setProgress(100);
      const summary = generateMockSummary();
      setResult(summary);
      
      toast({
        title: "Summary generated!",
        description: "Your video/podcast has been successfully summarized",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Summarization failed",
        description: "An error occurred while processing your content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const exportSummary = (format: string) => {
    if (!result) return;

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'txt':
        content = `Title: ${result.title}\nDuration: ${result.duration}\n\nSummary:\n${result.summary}\n\nKey Points:\n${result.keyPoints.map(point => `• ${point}`).join('\n')}\n\nTimestamps:\n${result.timestamps.map(ts => `${ts.time} - ${ts.description}`).join('\n')}`;
        filename = 'summary.txt';
        mimeType = 'text/plain';
        break;
      case 'md':
        content = `# ${result.title}\n\n**Duration:** ${result.duration}\n\n## Summary\n${result.summary}\n\n## Key Points\n${result.keyPoints.map(point => `- ${point}`).join('\n')}\n\n## Timestamps\n${result.timestamps.map(ts => `- **${ts.time}** - ${ts.description}`).join('\n')}`;
        filename = 'summary.md';
        mimeType = 'text/markdown';
        break;
      case 'json':
        content = JSON.stringify(result, null, 2);
        filename = 'summary.json';
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
      title: "Export successful",
      description: `Summary exported as ${filename}`,
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
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <Video className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Video/Podcast Summarizer</h1>
        <p className="text-muted-foreground mt-2">Generate AI-powered summaries of videos and podcasts</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {supportedPlatforms.map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Input Source
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="space-y-4">
                  <div>
                    <Label htmlFor="url">Video/Podcast URL</Label>
                    <Input
                      id="url"
                      placeholder="https://youtube.com/watch?v=... or podcast URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports YouTube, Vimeo, TikTok, podcast platforms, and more
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-4">
                  <div>
                    <Label htmlFor="file">Upload File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="video/*,audio/*"
                      onChange={handleFileUpload}
                      className="mt-2"
                    />
                    {file && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports MP4, AVI, MOV, MP3, WAV, M4A (max 500MB)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

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
                  <Label htmlFor="language">Language</Label>
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
                  </div>
                </div>
              </div>

              {loading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Processing...</span>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    {progress < 30 && "Downloading and analyzing content..."}
                    {progress >= 30 && progress < 60 && "Extracting audio and generating transcript..."}
                    {progress >= 60 && progress < 90 && "Creating summary and key points..."}
                    {progress >= 90 && "Finalizing results..."}
                  </p>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={handleSummarize} 
                disabled={loading || (!url && !file)}
              >
                {loading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
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
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Supported Platforms</p>
                    <p className="text-sm text-muted-foreground">YouTube, Vimeo, TikTok, podcasts, and direct file uploads</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Processing Time</p>
                    <p className="text-sm text-muted-foreground">Usually takes 1-3 minutes depending on content length</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Export Options</p>
                    <p className="text-sm text-muted-foreground">Download summaries as TXT, Markdown, or JSON</p>
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
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
                {result.transcript && <TabsTrigger value="transcript">Transcript</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Title</p>
                    <p className="font-medium">{result.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="font-medium">{result.duration}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Summary</p>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="whitespace-pre-wrap">{result.summary}</p>
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
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      <Badge variant="outline" className="flex-shrink-0">
                        {timestamp.time}
                      </Badge>
                      <p>{timestamp.description}</p>
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

export default VideoSummarizer;
