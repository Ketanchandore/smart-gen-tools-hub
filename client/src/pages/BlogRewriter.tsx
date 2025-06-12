import React, { useState } from 'react';
import { RefreshCw, ArrowLeft, FileDown, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Layout from '@/components/Layout';

const BlogRewriter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [originalContent, setOriginalContent] = useState('');
  const [rewriteOption, setRewriteOption] = useState('improve-seo');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [wordCountTarget, setWordCountTarget] = useState('same');
  const [tone, setTone] = useState('professional');
  const [includeHeadings, setIncludeHeadings] = useState(true);
  const [includeMeta, setIncludeMeta] = useState(true);
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [seoScore, setSeoScore] = useState<number | null>(null);
  const [seoAnalysis, setSeoAnalysis] = useState<SeoAnalysisType | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('content');

  type SeoAnalysisType = {
    keywordDensity: number;
    readabilityScore: number;
    headingsOptimized: boolean;
    metaTagsOptimized: boolean;
    contentLength: {
      original: number;
      rewritten: number;
    };
    improvement: string[];
  };

  const handleRewrite = () => {
    if (!originalContent.trim()) {
      toast({
        title: 'Content required',
        description: 'Please provide content to rewrite',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const keywords = targetKeywords.split(',').map(k => k.trim()).filter(Boolean);
      
      const result = rewriteBlogContent(
        originalContent,
        rewriteOption,
        keywords,
        wordCountTarget,
        tone,
        includeHeadings,
        includeMeta
      );
      
      setRewrittenContent(result.content);
      setSeoScore(result.seoScore);
      setSeoAnalysis(result.analysis);
      setLoading(false);
      setActiveTab('preview');
      
      toast({
        title: 'Content rewritten successfully!',
        description: `SEO Score: ${result.seoScore}/100`,
      });
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenContent);
    toast({
      title: 'Copied to clipboard',
      description: 'The rewritten content has been copied to your clipboard.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([rewrittenContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rewritten-blog-content.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Content downloaded',
      description: 'Your rewritten blog content has been downloaded as a text file.',
    });
  };

  const rewriteBlogContent = (
    content: string,
    option: string,
    keywords: string[],
    wordCount: string,
    tone: string,
    includeHeadings: boolean,
    includeMeta: boolean
  ) => {
    // Extract paragraphs from original content
    const paragraphs = content.split(/\n\s*\n/);
    
    // Basic SEO features to inject
    const seoFeatures = {
      metaDescription: 'This is an optimized meta description that includes key focus words and stays under 160 characters to ensure it displays properly in search results.',
      metaTitle: 'Optimized Title with Primary Keyword | Brand Name',
      headings: [
        '# Primary Keyword: Main Title with Engaging Hook',
        "## What You'll Learn About [Secondary Keyword]",
        "## Why [Primary Keyword] Matters in Today's Context",
        '## How to Implement [Primary Keyword] Strategies',
        '## Key Takeaways About [Primary Keyword]'
      ]
    };
    
    // Fixed the headings with proper quotes
    const fixedSeoFeatures = {
      metaDescription: 'This is an optimized meta description that includes key focus words and stays under 160 characters to ensure it displays properly in search results.',
      metaTitle: 'Optimized Title with Primary Keyword | Brand Name',
      headings: [
        '# Primary Keyword: Main Title with Engaging Hook',
        "## What You'll Learn About [Secondary Keyword]",
        "## Why [Primary Keyword] Matters in Today's Context",
        '## How to Implement [Primary Keyword] Strategies',
        '## Key Takeaways About [Primary Keyword]'
      ]
    };
    
    // Determine content length modification
    let targetWordCount = content.split(/\s+/).length;
    if (wordCount === 'longer') {
      targetWordCount = Math.floor(targetWordCount * 1.3);
    } else if (wordCount === 'shorter') {
      targetWordCount = Math.floor(targetWordCount * 0.7);
    }
    
    // Apply tone modifiers
    let toneAdjectives: string[];
    switch(tone) {
      case 'casual':
        toneAdjectives = ['friendly', 'conversational', 'approachable'];
        break;
      case 'professional':
        toneAdjectives = ['comprehensive', 'authoritative', 'informative'];
        break;
      case 'persuasive':
        toneAdjectives = ['compelling', 'convincing', 'powerful'];
        break;
      case 'educational':
        toneAdjectives = ['instructive', 'clear', 'explanatory'];
        break;
      default:
        toneAdjectives = ['effective', 'valuable', 'useful'];
    }
    
    // Create rewritten content based on option
    let rewritten = '';
    let seoScore = 65; // Base score
    
    // Start with meta information if requested
    if (includeMeta) {
      rewritten += `META TITLE:\n${fixedSeoFeatures.metaTitle}\n\nMETA DESCRIPTION:\n${fixedSeoFeatures.metaDescription}\n\n`;
      seoScore += 5;
    }
    
    // Add optimized headings if requested
    if (includeHeadings) {
      rewritten += `${fixedSeoFeatures.headings[0]}\n\n`;
      seoScore += 5;
    }
    
    // Process according to selected option
    if (option === 'improve-seo') {
      // Inject keywords naturally into the content
      let processedContent = paragraphs.map(para => {
        // Skip empty paragraphs
        if (!para.trim()) return '';
        
        // Try to naturally incorporate keywords
        let modifiedPara = para;
        keywords.forEach(keyword => {
          if (!modifiedPara.toLowerCase().includes(keyword.toLowerCase()) && Math.random() > 0.5) {
            const sentences = modifiedPara.split(/\.\s+/);
            if (sentences.length > 1) {
              const randomIndex = Math.floor(Math.random() * sentences.length);
              sentences[randomIndex] = sentences[randomIndex].replace(
                /\b(is|are|has|have|the|this|these|those)\b/i, 
                `$1 ${keyword}`
              );
              modifiedPara = sentences.join('. ');
            }
            seoScore += 2;
          }
        });
        
        // Add more detail and specific information
        if (wordCount === 'longer' && para.length > 100) {
          const additionalInfo = ` This is particularly important because it helps improve your ranking for specific search terms and provides ${toneAdjectives[0]} value to your readers.`;
          modifiedPara += additionalInfo;
        }
        
        return modifiedPara;
      }).join('\n\n');
      
      // Insert headings between paragraphs if requested
      if (includeHeadings) {
        const contentParts = processedContent.split('\n\n');
        if (contentParts.length > 2) {
          contentParts.splice(2, 0, fixedSeoFeatures.headings[1]);
          if (contentParts.length > 5) {
            contentParts.splice(5, 0, fixedSeoFeatures.headings[2]);
          }
          if (contentParts.length > 8) {
            contentParts.splice(8, 0, fixedSeoFeatures.headings[3]);
          }
          processedContent = contentParts.join('\n\n');
        }
      }
      
      rewritten += processedContent;
      
      // Add conclusion with keyword
      if (keywords.length > 0) {
        rewritten += `\n\n## Key Takeaways About ${keywords[0]}\n\n`;
        rewritten += `In conclusion, understanding ${keywords[0]} is crucial for success in today's competitive landscape. By implementing the strategies outlined in this article, you'll be well-positioned to leverage the power of ${keywords[0]} and achieve ${toneAdjectives[2]} results.`;
      } else {
        rewritten += '\n\n## Key Takeaways\n\n';
        rewritten += `In conclusion, implementing these strategies will help you achieve more ${toneAdjectives[2]} results and improve your overall performance in search rankings.`;
      }
      
    } else if (option === 'readability') {
      // Focus on improving readability
      let processedContent = paragraphs.map(para => {
        if (!para.trim()) return '';
        
        // Simplify long sentences
        let modifiedPara = para.replace(/([^.!?]+[.!?])\s+/g, '$1\n');
        let sentences = modifiedPara.split('\n');
        
        sentences = sentences.map(sentence => {
          // Shorten very long sentences
          if (sentence.split(' ').length > 20) {
            return sentence.split(', ').slice(0, 2).join(', ') + '.';
          }
          return sentence;
        });
        
        modifiedPara = sentences.join(' ');
        
        // Add bullet points for readability in longer paragraphs
        if (para.length > 200) {
          const points = ['First', 'Second', 'Additionally', 'Furthermore', 'Finally'];
          modifiedPara += '\n\n' + points.slice(0, 3).map(p => `- ${p}, `).join('\n');
        }
        
        return modifiedPara;
      }).join('\n\n');
      
      // Add more section breaks and subheadings
      if (includeHeadings) {
        const contentParts = processedContent.split('\n\n');
        for (let i = 2; i < contentParts.length; i += 3) {
          if (i < contentParts.length) {
            contentParts.splice(i, 0, `### Quick Summary of This Section`);
          }
        }
        processedContent = contentParts.join('\n\n');
      }
      
      rewritten += processedContent;
      seoScore += 10; // Higher readability improves SEO score
      
    } else {
      // Paraphrase option
      rewritten += paragraphs.map(para => {
        if (!para.trim()) return '';
        
        // Simple "paraphrasing" for demo purposes
        let modifiedPara = para
          .replace(/we /g, 'you ')
          .replace(/We /g, 'You ')
          .replace(/our/g, 'your')
          .replace(/Our/g, 'Your')
          .replace(/need to/g, 'should')
          .replace(/important/g, 'crucial')
          .replace(/very/g, 'extremely')
          .replace(/good/g, 'excellent')
          .replace(/problems/g, 'challenges')
          .replace(/easy/g, 'straightforward');
          
        return modifiedPara;
      }).join('\n\n');
    }
    
    // Calculate new word count
    const originalWords = content.split(/\s+/).length;
    const newWords = rewritten.split(/\s+/).length;
    
    // Analyze SEO effectiveness
    const analysis: SeoAnalysisType = {
      keywordDensity: calculateKeywordDensity(rewritten, keywords),
      readabilityScore: calculateReadabilityScore(rewritten),
      headingsOptimized: includeHeadings,
      metaTagsOptimized: includeMeta,
      contentLength: {
        original: originalWords,
        rewritten: newWords
      },
      improvement: []
    };
    
    // Generate improvement suggestions
    if (analysis.keywordDensity < 1) {
      analysis.improvement.push('Increase keyword density (aim for 1-2%)');
      seoScore -= 5;
    } else if (analysis.keywordDensity > 3) {
      analysis.improvement.push('Decrease keyword density to avoid keyword stuffing');
      seoScore -= 10;
    }
    
    if (analysis.readabilityScore < 60) {
      analysis.improvement.push('Improve readability by using shorter sentences and simpler language');
      seoScore -= 5;
    }
    
    if (!includeHeadings) {
      analysis.improvement.push('Add optimized headings with keywords');
    }
    
    if (!includeMeta) {
      analysis.improvement.push('Include meta title and description with targeted keywords');
    }
    
    // Cap the score
    seoScore = Math.min(Math.max(seoScore, 50), 98);
    
    return {
      content: rewritten,
      seoScore,
      analysis
    };
  };
  
  const calculateKeywordDensity = (content: string, keywords: string[]): number => {
    if (!keywords.length) return 0;
    
    const contentWords = content.toLowerCase().split(/\s+/);
    let keywordCount = 0;
    
    keywords.forEach(keyword => {
      const keywordTerms = keyword.toLowerCase().split(/\s+/);
      
      if (keywordTerms.length === 1) {
        // Single word keyword
        contentWords.forEach(word => {
          if (word === keyword.toLowerCase()) keywordCount++;
        });
      } else {
        // Multi-word keyword
        const contentText = content.toLowerCase();
        let lastIndex = 0;
        let count = 0;
        while (lastIndex !== -1) {
          lastIndex = contentText.indexOf(keyword.toLowerCase(), lastIndex);
          if (lastIndex !== -1) {
            count++;
            lastIndex += keyword.length;
          }
        }
        keywordCount += count;
      }
    });
    
    return (keywordCount * 100) / contentWords.length;
  };
  
  const calculateReadabilityScore = (content: string): number => {
    // Simplified readability calculation for demo
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Lower avg words per sentence = higher readability
    let readabilityScore = 100 - (avgWordsPerSentence * 2);
    
    // Adjust for very short content
    if (words < 100) readabilityScore -= 20;
    
    // Cap the score
    return Math.min(Math.max(readabilityScore, 30), 100);
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
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Blog Rewriter + SEO Optimizer</h1>
          <p className="text-muted-foreground mt-2">Rewrite and optimize your blog content for better search engine visibility</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="content">Content Input</TabsTrigger>
            <TabsTrigger value="preview">Optimized Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Blog Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Paste your blog content here..."
                      className="min-h-[400px] font-mono text-sm"
                      value={originalContent}
                      onChange={(e) => setOriginalContent(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Rewrite Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Rewrite Option</Label>
                      <RadioGroup value={rewriteOption} onValueChange={setRewriteOption}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="improve-seo" id="improve-seo" />
                          <Label htmlFor="improve-seo">Improve SEO</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="readability" id="readability" />
                          <Label htmlFor="readability">Enhance Readability</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paraphrase" id="paraphrase" />
                          <Label htmlFor="paraphrase">Simple Paraphrase</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="target-keywords">Target Keywords (comma separated)</Label>
                      <Input 
                        id="target-keywords"
                        placeholder="e.g. digital marketing, SEO, content strategy"
                        value={targetKeywords}
                        onChange={(e) => setTargetKeywords(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="word-count">Word Count Target</Label>
                      <Select value={wordCountTarget} onValueChange={setWordCountTarget}>
                        <SelectTrigger id="word-count">
                          <SelectValue placeholder="Select word count target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="same">Keep Same Length</SelectItem>
                          <SelectItem value="longer">Make Longer</SelectItem>
                          <SelectItem value="shorter">Make More Concise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="tone">Content Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="Select content tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual & Conversational</SelectItem>
                          <SelectItem value="persuasive">Persuasive</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Additional Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="include-headings" 
                            checked={includeHeadings} 
                            onCheckedChange={(checked) => setIncludeHeadings(checked === true)}
                          />
                          <label
                            htmlFor="include-headings"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Optimize headings with keywords
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="include-meta" 
                            checked={includeMeta} 
                            onCheckedChange={(checked) => setIncludeMeta(checked === true)}
                          />
                          <label
                            htmlFor="include-meta"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Include SEO meta title & description
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleRewrite} 
                      disabled={loading || !originalContent.trim()} 
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Rewriting & Optimizing...
                        </>
                      ) : (
                        'Rewrite & Optimize Content'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <CardTitle>Optimized Content</CardTitle>
                      {seoScore !== null && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">SEO Score:</span>
                          <Badge 
                            className={`text-white ${
                              seoScore >= 80 ? 'bg-green-500' :
                              seoScore >= 60 ? 'bg-amber-500' : 'bg-destructive'
                            }`}
                          >
                            {seoScore}/100
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rewrittenContent ? (
                      <>
                        <div className="bg-muted p-4 rounded-md overflow-auto">
                          <pre className="whitespace-pre-wrap text-sm">{rewrittenContent}</pre>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            onClick={handleCopy}
                            className="flex-1"
                            variant="outline"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy to Clipboard
                          </Button>
                          <Button 
                            onClick={handleDownload}
                            className="flex-1"
                          >
                            <FileDown className="mr-2 h-4 w-4" />
                            Download Content
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-8">
                        <p className="text-muted-foreground">
                          No content has been rewritten yet. Go to the "Content Input" tab to rewrite your blog.
                        </p>
                        <Button
                          onClick={() => setActiveTab('content')}
                          variant="outline"
                          className="mt-4"
                        >
                          Go to Content Input
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                {seoAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Keyword Density</span>
                            <span className="text-sm font-medium">
                              {seoAnalysis.keywordDensity.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                seoAnalysis.keywordDensity >= 1 && seoAnalysis.keywordDensity <= 3
                                ? 'bg-green-500' : 'bg-amber-500'
                              }`} 
                              style={{ width: `${Math.min(seoAnalysis.keywordDensity * 33, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Optimal: 1-3% density
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Readability Score</span>
                            <span className="text-sm font-medium">
                              {seoAnalysis.readabilityScore}/100
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                seoAnalysis.readabilityScore >= 70 ? 'bg-green-500' :
                                seoAnalysis.readabilityScore >= 50 ? 'bg-amber-500' : 'bg-destructive'
                              }`} 
                              style={{ width: `${seoAnalysis.readabilityScore}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                            <span className="text-sm text-muted-foreground">Original</span>
                            <span className="text-xl font-bold">
                              {seoAnalysis.contentLength.original}
                            </span>
                            <span className="text-xs text-muted-foreground">words</span>
                          </div>
                          
                          <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                            <span className="text-sm text-muted-foreground">Rewritten</span>
                            <span className="text-xl font-bold">
                              {seoAnalysis.contentLength.rewritten}
                            </span>
                            <span className="text-xs text-muted-foreground">words</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Optimization Checklist</h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${seoAnalysis.headingsOptimized ? 'bg-green-500' : 'bg-destructive'}`} />
                              <span className="text-sm">Headings Optimized</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${seoAnalysis.metaTagsOptimized ? 'bg-green-500' : 'bg-destructive'}`} />
                              <span className="text-sm">Meta Tags Optimized</span>
                            </div>
                          </div>
                        </div>
                        
                        {seoAnalysis.improvement.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Improvement Suggestions</h4>
                            <ul className="space-y-1">
                              {seoAnalysis.improvement.map((suggestion, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2" />
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {!seoAnalysis && rewrittenContent && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">
                        SEO analysis will appear here after content is rewritten.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BlogRewriter;
