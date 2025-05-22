
import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';

const ContentDetector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  type DetectionResult = {
    aiScore: number;
    plagiarismScore: number;
    humanWrittenScore: number;
    sentences: SentenceAnalysis[];
    overview: {
      verdict: string;
      explanation: string;
      indicators: string[];
    };
  };
  
  type SentenceAnalysis = {
    text: string;
    aiProbability: number;
    suspicious: boolean;
    reason?: string;
  };

  const handleDetect = () => {
    if (!content.trim()) {
      toast({
        title: 'Text required',
        description: 'Please provide content to analyze',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const analysis = analyzeContent(content);
      setResult(analysis);
      setLoading(false);
      
      toast({
        title: 'Analysis complete',
        description: `Content analyzed with ${analysis.aiScore.toFixed(0)}% AI probability`,
      });
    }, 2000);
  };

  const analyzeContent = (text: string): DetectionResult => {
    // Split into sentences for analysis
    const sentenceRegex = /[.!?]+\s+/;
    const sentences = text.split(sentenceRegex).filter(Boolean);
    
    // Simple detection algorithm for demo purposes
    const patternScores = {
      // Indicators of AI-generated text
      aiPatterns: [
        { regex: /\b(furthermore|moreover|additionally|consequently)\b/gi, score: 0.3 },
        { regex: /\b(in conclusion|to summarize|in summary)\b/gi, score: 0.2 },
        { regex: /\b(it is important to note that|it should be noted that)\b/gi, score: 0.4 },
        { regex: /\b(there are several|there are various|there are many)\b/gi, score: 0.2 },
        { regex: /\b(on the other hand|conversely|in contrast)\b/gi, score: 0.2 },
        { regex: /\,\s(however|therefore|thus|hence)\b/gi, score: 0.3 },
        { regex: /\b(first|second|third|finally)ly\b/gi, score: 0.2 }
      ],
      // Indicators of human-written text
      humanPatterns: [
        { regex: /\b(like|literally|basically|actually|stuff|things|kinda|sorta)\b/gi, score: 0.3 },
        { regex: /(I think|I feel|I believe|in my opinion|as far as I'm concerned)/gi, score: 0.3 },
        { regex: /\b(amazing|awesome|cool|great|nice|wow|wtf|lol)\b/gi, score: 0.2 },
        { regex: /\b(so|very|really|pretty|quite)\s(so|very|really)\b/gi, score: 0.3 },
        { regex: /[!?]{2,}/g, score: 0.2 },
        { regex: /\b(um|uh|er|ah|hmm)\b/gi, score: 0.4 }
      ],
      // Indicators of plagiarism
      plagiarismPatterns: [
        { regex: /\b(according to|cited|referenced|quoted)\b/gi, score: 0.2 },
        { regex: /[""][^""]{20,}[""]/g, score: 0.4 }
      ]
    };
    
    // Analyze each sentence
    const analyzedSentences: SentenceAnalysis[] = sentences.map(sentence => {
      if (!sentence.trim()) return {
        text: '',
        aiProbability: 0,
        suspicious: false
      };
      
      let aiScore = 0;
      let humanScore = 0;
      let suspiciousReasons = [];
      
      // Check for AI patterns
      for (const pattern of patternScores.aiPatterns) {
        const matches = (sentence.match(pattern.regex) || []).length;
        if (matches > 0) {
          aiScore += pattern.score * matches;
          if (matches > 1) {
            suspiciousReasons.push(`Contains formal transition phrases (${matches} instances)`);
          }
        }
      }
      
      // Check for human patterns
      for (const pattern of patternScores.humanPatterns) {
        const matches = (sentence.match(pattern.regex) || []).length;
        humanScore += pattern.score * matches;
      }
      
      // Length-based heuristics
      const words = sentence.split(/\s+/).length;
      if (words > 30) {
        aiScore += 0.2;
        suspiciousReasons.push('Unusually long sentence structure');
      }
      if (words < 5) humanScore += 0.1;
      
      // Complexity heuristics
      const complexity = calculateComplexity(sentence);
      if (complexity > 0.6) {
        aiScore += 0.2;
        suspiciousReasons.push('High linguistic complexity');
      }
      
      // Calculate probability
      let aiProbability = (aiScore / (aiScore + humanScore + 0.3)) * 100;
      aiProbability = Math.min(Math.max(aiProbability, 0), 100);
      
      return {
        text: sentence.trim(),
        aiProbability,
        suspicious: aiProbability > 70,
        reason: suspiciousReasons.length > 0 ? suspiciousReasons[0] : undefined
      };
    }).filter(s => s.text.length > 0);
    
    // Overall scores
    let overallAiScore = analyzedSentences.reduce((sum, s) => sum + s.aiProbability, 0) / 
      Math.max(analyzedSentences.length, 1);
      
    // Adjust for text length - longer texts with consistent patterns are more suspicious
    if (analyzedSentences.length > 5) {
      const consistencyFactor = calculateConsistency(analyzedSentences.map(s => s.aiProbability));
      overallAiScore = overallAiScore * (1 + consistencyFactor * 0.2);
    }
    
    // Plagiarism detection (simplified for demo)
    let plagiarismScore = 0;
    for (const pattern of patternScores.plagiarismPatterns) {
      const matches = (text.match(pattern.regex) || []).length;
      plagiarismScore += pattern.score * matches;
    }
    plagiarismScore = Math.min(plagiarismScore * 20, 100);
    
    // Calculate final scores
    overallAiScore = Math.min(Math.round(overallAiScore), 100);
    const humanWrittenScore = Math.max(100 - overallAiScore - plagiarismScore, 0);
    
    // Generate verdict
    let verdict, explanation;
    let indicators = [];
    
    if (overallAiScore > 75) {
      verdict = "Highly Likely AI-Generated";
      explanation = "This content displays strong characteristics of AI-generated text.";
      indicators = [
        "Formal and systematic structure",
        "Consistent tone throughout",
        "Limited stylistic variation",
        "Presence of common AI transitional phrases"
      ];
    } else if (overallAiScore > 50) {
      verdict = "Possibly AI-Generated";
      explanation = "This content has several indicators suggesting AI assistance.";
      indicators = [
        "Some sections appear formulaic",
        "Mixed writing styles detected",
        "Occasional unnatural phrasing"
      ];
    } else if (plagiarismScore > 30) {
      verdict = "Possible Plagiarism Detected";
      explanation = "This content contains elements that may be copied from other sources.";
      indicators = [
        "Quotes without clear attribution",
        "Sections with distinctly different writing styles",
        "Formal citations detected"
      ];
    } else {
      verdict = "Likely Human-Written";
      explanation = "This content appears to be primarily human-written.";
      indicators = [
        "Natural language patterns",
        "Inconsistent style typical of human writing",
        "Personal voice and opinions present"
      ];
    }
    
    return {
      aiScore: overallAiScore,
      plagiarismScore,
      humanWrittenScore,
      sentences: analyzedSentences,
      overview: {
        verdict,
        explanation,
        indicators
      }
    };
  };
  
  const calculateComplexity = (text: string): number => {
    const words = text.split(/\s+/).length;
    if (words === 0) return 0;
    
    // Count complex words (more than 3 syllables as approximation)
    const complexWords = text.split(/\s+/).filter(word => {
      const syllables = countSyllables(word);
      return syllables > 3;
    }).length;
    
    // Simplified readability score
    return complexWords / words;
  };
  
  const countSyllables = (word: string): number => {
    // Very simplified syllable counter for demo
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    
    // Count vowel groups as syllables
    const vowelGroups = word.match(/[aeiouy]+/g);
    if (!vowelGroups) return 1;
    
    // Adjust for common patterns
    let count = vowelGroups.length;
    if (word.endsWith('e')) count--;
    if (word.endsWith('le') && word.length > 2) count++;
    
    return Math.max(count, 1);
  };
  
  const calculateConsistency = (values: number[]): number => {
    if (values.length <= 1) return 0;
    
    // Calculate standard deviation
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    // Normalize to 0-1 range (lower deviation = higher consistency)
    return 1 - Math.min(stdDev / 50, 1);
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
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI Content Detector</h1>
          <p className="text-muted-foreground mt-2">Detect AI-generated content and potential plagiarism</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Content Analysis</CardTitle>
                <CardDescription>
                  Paste your text to analyze whether it's human-written or AI-generated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Paste content to analyze here..." 
                  className="min-h-[300px] font-mono text-sm"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                
                <div className="flex justify-between">
                  <div className="text-xs text-muted-foreground">
                    {content.trim().length > 0 ? (
                      <>
                        {content.split(/\s+/).filter(Boolean).length} words
                        <span className="mx-1">•</span>
                        {content.length} characters
                      </>
                    ) : 'No content yet'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Recommended: At least 100 words for better accuracy
                  </div>
                </div>
                
                <Button 
                  onClick={handleDetect} 
                  disabled={loading || !content.trim()}
                  className="w-full"
                >
                  {loading ? 'Analyzing...' : 'Detect AI/Plagiarized Content'}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {result ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border bg-card">
                          <div className="text-center mb-1">
                            <span className={`text-lg font-bold ${
                              result.aiScore > 75 ? 'text-destructive' :
                              result.aiScore > 50 ? 'text-amber-500' :
                              'text-green-500'
                            }`}>
                              {result.overview.verdict}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground text-center">
                            {result.overview.explanation}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">AI-Generated Probability</span>
                              <span className="text-sm font-medium">{result.aiScore.toFixed(0)}%</span>
                            </div>
                            <Progress 
                              value={result.aiScore} 
                              className="h-2"
                              indicatorClassName={
                                result.aiScore > 75 ? 'bg-destructive' :
                                result.aiScore > 50 ? 'bg-amber-500' :
                                'bg-green-500'
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Plagiarism Probability</span>
                              <span className="text-sm font-medium">{result.plagiarismScore.toFixed(0)}%</span>
                            </div>
                            <Progress 
                              value={result.plagiarismScore} 
                              className="h-2"
                              indicatorClassName={
                                result.plagiarismScore > 30 ? 'bg-destructive' :
                                result.plagiarismScore > 15 ? 'bg-amber-500' :
                                'bg-green-500'
                              }
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Human-Written Probability</span>
                              <span className="text-sm font-medium">{result.humanWrittenScore.toFixed(0)}%</span>
                            </div>
                            <Progress 
                              value={result.humanWrittenScore} 
                              className="h-2"
                              indicatorClassName="bg-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Key Indicators</h4>
                          <ul className="space-y-1">
                            {result.overview.indicators.map((indicator, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2" />
                                <span>{indicator}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="detailed">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Sentence-by-Sentence Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {result.sentences.map((sentence, i) => (
                          <div 
                            key={i} 
                            className={`p-3 rounded-lg border text-sm ${
                              sentence.suspicious ? 'bg-destructive/10 border-destructive/30' : 'bg-card'
                            }`}
                          >
                            <p className="mb-2">{sentence.text}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  sentence.aiProbability > 75 ? 'bg-destructive' :
                                  sentence.aiProbability > 50 ? 'bg-amber-500' :
                                  'bg-green-500'
                                }`} />
                                <span className="text-xs text-muted-foreground">
                                  {sentence.aiProbability > 75 ? 'Likely AI' :
                                   sentence.aiProbability > 50 ? 'Possibly AI' :
                                   'Likely Human'}
                                </span>
                              </div>
                              <span className="text-xs font-medium">
                                {sentence.aiProbability.toFixed(0)}% AI
                              </span>
                            </div>
                            {sentence.reason && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {sentence.reason}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="h-full flex flex-col justify-center">
                <CardContent className="text-center py-16">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground text-sm">
                    Paste content and click "Detect" to analyze whether it's human-written or AI-generated.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">About AI Content Detection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This tool provides an assessment of whether content appears to be AI-generated, human-written, or potentially plagiarized.
                It uses pattern recognition and stylistic analysis to identify common characteristics of AI-written text.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-1">AI-Generated Content</h4>
                  <p className="text-sm text-muted-foreground">Typically shows consistent tone, formal structure, and predictable transitions between ideas.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Human-Written Content</h4>
                  <p className="text-sm text-muted-foreground">Often features more varied sentence structures, irregular patterns, and personal voice.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Important Note</h4>
                  <p className="text-sm text-muted-foreground">This analysis is probabilistic and should be used as a guide rather than a definitive assessment.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContentDetector;
