import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, FileText, Search, TrendingUp, Clock, Target, Copy, Download, RefreshCw, BarChart3, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

interface KeywordData {
  word: string;
  count: number;
  density: number;
  prominence: number;
}

interface ReadabilityScore {
  score: number;
  grade: string;
  description: string;
}

const WordCounter = () => {
  const navigate = useNavigate();
  
  const [text, setText] = useState('');
  const [minWordLength, setMinWordLength] = useState(4);
  const [maxKeywords, setMaxKeywords] = useState(20);
  const [excludeCommon, setExcludeCommon] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const commonWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 
    'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 
    'by', 'from', 'they', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 
    'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 
    'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 
    'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 
    'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 
    'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 
    'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 
    'because', 'any', 'these', 'give', 'day', 'most', 'us'
  ]);

  const textStats = useMemo((): TextStats => {
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
    
    // Average speaking speed: 150-160 words per minute
    const speakingTime = Math.ceil(words / 155);

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

  const keywords = useMemo((): KeywordData[] => {
    if (!text.trim()) return [];

    // Clean and split text into words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= minWordLength);

    // Count word frequencies
    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
      if (!excludeCommon || !commonWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    // Convert to array and calculate metrics
    const keywordArray = Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / words.length) * 100,
        prominence: count * word.length // Simple prominence calculation
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, maxKeywords);

    return keywordArray;
  }, [text, minWordLength, maxKeywords, excludeCommon]);

  const filteredKeywords = useMemo(() => {
    if (!searchTerm) return keywords;
    return keywords.filter(keyword => 
      keyword.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [keywords, searchTerm]);

  const readabilityScore = useMemo((): ReadabilityScore => {
    if (textStats.words === 0 || textStats.sentences === 0) {
      return { score: 0, grade: 'N/A', description: 'No text to analyze' };
    }

    // Simplified Flesch Reading Ease calculation
    const avgWordsPerSentence = textStats.words / textStats.sentences;
    const avgSyllablesPerWord = estimateAverageSyllables(text);
    
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    let grade = '';
    let description = '';
    
    if (score >= 90) {
      grade = '5th grade';
      description = 'Very easy to read';
    } else if (score >= 80) {
      grade = '6th grade';
      description = 'Easy to read';
    } else if (score >= 70) {
      grade = '7th grade';
      description = 'Fairly easy to read';
    } else if (score >= 60) {
      grade = '8th-9th grade';
      description = 'Standard';
    } else if (score >= 50) {
      grade = '10th-12th grade';
      description = 'Fairly difficult to read';
    } else if (score >= 30) {
      grade = 'College level';
      description = 'Difficult to read';
    } else {
      grade = 'Graduate level';
      description = 'Very difficult to read';
    }

    return { score: Math.max(0, Math.min(100, score)), grade, description };
  }, [text, textStats]);

  const estimateAverageSyllables = (text: string): number => {
    if (!text) return 0;
    
    const words: string[] = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    if (words.length === 0) return 0;
    
    const totalSyllables: number = words.reduce((total: number, word: string) => {
      return total + estimateSyllables(word);
    }, 0);
    
    return totalSyllables / words.length;
  };

  const estimateSyllables = (word: string): number => {
    if (word.length <= 3) return 1;
    
    let syllables = 0;
    const vowels = 'aeiouy';
    let previousWasVowel = false;
    
    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !previousWasVowel) {
        syllables++;
      }
      previousWasVowel = isVowel;
    }
    
    // Handle silent e
    if (word.endsWith('e')) {
      syllables--;
    }
    
    return Math.max(1, syllables);
  };

  const copyStats = () => {
    const statsText = `Text Statistics:
Characters: ${textStats.characters.toLocaleString()}
Characters (no spaces): ${textStats.charactersNoSpaces.toLocaleString()}
Words: ${textStats.words.toLocaleString()}
Sentences: ${textStats.sentences.toLocaleString()}
Paragraphs: ${textStats.paragraphs.toLocaleString()}
Reading Time: ${textStats.readingTime} minutes
Speaking Time: ${textStats.speakingTime} minutes
Readability: ${readabilityScore.score.toFixed(1)} (${readabilityScore.grade})`;

    navigator.clipboard.writeText(statsText);
    toast({
      title: "Stats Copied",
      description: "Text statistics copied to clipboard."
    });
  };

  const copyKeywords = () => {
    const keywordsText = keywords
      .map(k => `${k.word} (${k.count}x, ${k.density.toFixed(2)}%)`)
      .join('\n');

    navigator.clipboard.writeText(keywordsText);
    toast({
      title: "Keywords Copied",
      description: "Keywords list copied to clipboard."
    });
  };

  const downloadReport = () => {
    const report = `TEXT ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

=== TEXT STATISTICS ===
Characters: ${textStats.characters.toLocaleString()}
Characters (no spaces): ${textStats.charactersNoSpaces.toLocaleString()}
Words: ${textStats.words.toLocaleString()}
Sentences: ${textStats.sentences.toLocaleString()}
Paragraphs: ${textStats.paragraphs.toLocaleString()}
Reading Time: ${textStats.readingTime} minutes
Speaking Time: ${textStats.speakingTime} minutes

=== READABILITY ===
Flesch Reading Ease: ${readabilityScore.score.toFixed(1)}
Grade Level: ${readabilityScore.grade}
Description: ${readabilityScore.description}

=== TOP KEYWORDS ===
${keywords.map((k, i) => `${i + 1}. ${k.word} - Count: ${k.count}, Density: ${k.density.toFixed(2)}%`).join('\n')}

=== ORIGINAL TEXT ===
${text}`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-analysis-report.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Complete analysis report downloaded."
    });
  };

  const clearText = () => {
    setText('');
    toast({
      title: "Text Cleared",
      description: "All text has been cleared."
    });
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
        <div className="mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Word Counter & Keyword Extractor</h1>
        <p className="text-xl text-muted-foreground">
          Analyze your text with detailed statistics and extract important keywords
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Text Input
              </CardTitle>
              <CardDescription>
                Paste or type your text here for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste your text here to analyze..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={20}
                  className="resize-none font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearText} disabled={!text}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button variant="outline" onClick={downloadReport} disabled={!text}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Analysis */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Keyword Analysis
                  </CardTitle>
                  <CardDescription>
                    Top keywords found in your text
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={copyKeywords} disabled={keywords.length === 0}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Keywords
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="min-length">Min Word Length</Label>
                    <Select value={minWordLength.toString()} onValueChange={(value) => setMinWordLength(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 characters</SelectItem>
                        <SelectItem value="3">3 characters</SelectItem>
                        <SelectItem value="4">4 characters</SelectItem>
                        <SelectItem value="5">5 characters</SelectItem>
                        <SelectItem value="6">6 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="max-keywords">Max Keywords</Label>
                    <Select value={maxKeywords.toString()} onValueChange={(value) => setMaxKeywords(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 keywords</SelectItem>
                        <SelectItem value="20">20 keywords</SelectItem>
                        <SelectItem value="30">30 keywords</SelectItem>
                        <SelectItem value="50">50 keywords</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="search-keywords">Search Keywords</Label>
                    <Input
                      id="search-keywords"
                      placeholder="Search keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {filteredKeywords.length > 0 ? (
                  <div className="space-y-3">
                    {filteredKeywords.map((keyword, index) => (
                      <div key={keyword.word} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{index + 1}</Badge>
                          <div>
                            <div className="font-medium">{keyword.word}</div>
                            <div className="text-sm text-muted-foreground">
                              {keyword.count} occurrences • {keyword.density.toFixed(2)}% density
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{keyword.count}</div>
                          <Progress value={keyword.density * 10} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {text ? 'No keywords found with current filters' : 'Enter text to see keyword analysis'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Panel */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Text Statistics
                </CardTitle>
                <Button variant="outline" size="sm" onClick={copyStats} disabled={!text}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{textStats.characters.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{textStats.charactersNoSpaces.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">No Spaces</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{textStats.words.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{textStats.sentences.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Sentences</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{textStats.paragraphs.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{keywords.length}</div>
                  <div className="text-sm text-muted-foreground">Keywords</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Reading Time</span>
                  </div>
                  <Badge variant="secondary">{textStats.readingTime} min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">Speaking Time</span>
                  </div>
                  <Badge variant="secondary">{textStats.speakingTime} min</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Readability Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {readabilityScore.score.toFixed(1)}
                </div>
                <div className="text-lg font-medium">{readabilityScore.grade}</div>
                <div className="text-sm text-muted-foreground">{readabilityScore.description}</div>
              </div>
              
              <Progress value={readabilityScore.score} className="w-full" />
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• 90-100: Very Easy (5th grade)</div>
                <div>• 80-89: Easy (6th grade)</div>
                <div>• 70-79: Fairly Easy (7th grade)</div>
                <div>• 60-69: Standard (8th-9th grade)</div>
                <div>• 50-59: Fairly Difficult (10th-12th grade)</div>
                <div>• 30-49: Difficult (College level)</div>
                <div>• 0-29: Very Difficult (Graduate level)</div>
              </div>
            </CardContent>
          </Card>

          {text && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Text Composition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Words/Sentence</span>
                    <span>{(textStats.words / Math.max(textStats.sentences, 1)).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Characters/Word</span>
                    <span>{(textStats.charactersNoSpaces / Math.max(textStats.words, 1)).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Sentences/Paragraph</span>
                    <span>{(textStats.sentences / Math.max(textStats.paragraphs, 1)).toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
