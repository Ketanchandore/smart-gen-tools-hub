
import React, { useState, useEffect, useMemo } from 'react';
import { Hash, FileText, Download, Copy, Eye, Clock, BarChart3, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface KeywordData {
  word: string;
  count: number;
  density: number;
}

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

const WordCounter = () => {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [minWordLength, setMinWordLength] = useState(3);
  const [excludeCommonWords, setExcludeCommonWords] = useState(true);

  // Common words to exclude
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
    'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we',
    'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its',
    'our', 'their', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all',
    'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
    'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just'
  ]);

  // Calculate text statistics
  const textStats: TextStats = useMemo(() => {
    if (!text.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
    
    // Average reading speed: 200-250 words per minute
    const readingTime = Math.ceil(words / 225);
    // Average speaking speed: 130-150 words per minute
    const speakingTime = Math.ceil(words / 140);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    };
  }, [text]);

  // Extract keywords with frequency analysis
  const keywords: KeywordData[] = useMemo(() => {
    if (!text.trim()) return [];

    // Clean and split text into words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => {
        if (word.length < minWordLength) return false;
        if (excludeCommonWords && commonWords.has(word)) return false;
        return true;
      });

    // Count word frequencies
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Calculate density and sort by frequency
    const totalWords = textStats.words;
    return Object.entries(wordCount)
      .map(([word, count]) => ({
        word,
        count,
        density: totalWords > 0 ? Math.round((count / totalWords) * 10000) / 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50); // Top 50 keywords
  }, [text, minWordLength, excludeCommonWords, textStats.words]);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const downloadReport = () => {
    const report = `Word Counter & Keyword Analysis Report
=====================================

TEXT STATISTICS
---------------
Characters: ${textStats.characters}
Characters (no spaces): ${textStats.charactersNoSpaces}
Words: ${textStats.words}
Sentences: ${textStats.sentences}
Paragraphs: ${textStats.paragraphs}
Reading Time: ${textStats.readingTime} minute(s)
Speaking Time: ${textStats.speakingTime} minute(s)

TOP KEYWORDS
------------
${keywords.slice(0, 20).map((keyword, index) => 
  `${index + 1}. ${keyword.word} - ${keyword.count} times (${keyword.density}%)`
).join('\n')}

ORIGINAL TEXT
-------------
${text}
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'word-analysis-report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Analysis report has been downloaded.",
    });
  };

  const formatTime = (minutes: number) => {
    if (minutes < 1) return "< 1 min";
    if (minutes === 1) return "1 min";
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return `${hours}h ${remainingMins}m`;
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Word Counter + Keyword Extractor</h1>
          <p className="text-muted-foreground">Analyze your text with comprehensive word counting and keyword extraction</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Text Input
                </CardTitle>
                <CardDescription>
                  Paste or type your text below for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your text here for analysis..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] text-sm"
                />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="min-length">Minimum Word Length</Label>
                    <Input
                      id="min-length"
                      type="number"
                      min="1"
                      max="10"
                      value={minWordLength}
                      onChange={(e) => setMinWordLength(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="exclude-common"
                      checked={excludeCommonWords}
                      onChange={(e) => setExcludeCommonWords(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="exclude-common" className="text-sm">
                      Exclude common words
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Text Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{textStats.characters.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Characters</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{textStats.words.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{textStats.sentences}</div>
                    <div className="text-xs text-muted-foreground">Sentences</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{textStats.paragraphs}</div>
                    <div className="text-xs text-muted-foreground">Paragraphs</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Reading Time
                    </span>
                    <span className="font-medium">{formatTime(textStats.readingTime)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Speaking Time
                    </span>
                    <span className="font-medium">{formatTime(textStats.speakingTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => copyToClipboard(text)}
                  disabled={!text}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={downloadReport}
                  disabled={!text}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Keywords Section */}
        {text && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Keyword Analysis
              </CardTitle>
              <CardDescription>
                Top keywords found in your text with frequency and density
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="grid" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {keywords.slice(0, 24).map((keyword, index) => (
                      <div key={keyword.word} className="p-3 border rounded-lg text-center">
                        <div className="font-medium text-sm mb-1">{keyword.word}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {keyword.count} times
                        </div>
                        <Progress value={keyword.density * 10} className="h-1" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {keyword.density}%
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="mt-4">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {keywords.map((keyword, index) => (
                      <div key={keyword.word} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{index + 1}</Badge>
                          <span className="font-medium">{keyword.word}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{keyword.count} times</span>
                          <span>{keyword.density}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Content Analysis Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">SEO Writing</h3>
                <p className="text-sm text-muted-foreground">
                  Aim for 1-3% keyword density for your target keywords. Higher densities might be seen as keyword stuffing.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Readability</h3>
                <p className="text-sm text-muted-foreground">
                  Keep sentences under 20 words and paragraphs under 150 words for better readability.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Content Length</h3>
                <p className="text-sm text-muted-foreground">
                  Blog posts: 1,500-2,500 words. Product descriptions: 150-300 words. Social posts: 40-80 words.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Reading Time</h3>
                <p className="text-sm text-muted-foreground">
                  Online readers prefer content that takes 3-7 minutes to read. Adjust your content length accordingly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WordCounter;
