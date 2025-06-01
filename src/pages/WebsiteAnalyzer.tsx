import React, { useState } from 'react';
import { Globe, ArrowRight, SearchCheck, BarChart2, Shield, Gauge, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface ScoreData {
  score: number;
  status: 'good' | 'warning' | 'critical';
  label: string;
  recommendation?: string;
}

interface AnalysisResult {
  url: string;
  seo: {
    score: number;
    issues: ScoreData[];
  };
  performance: {
    score: number;
    metrics: ScoreData[];
  };
  security: {
    score: number;
    issues: ScoreData[];
  };
  accessibility: {
    score: number;
    issues: ScoreData[];
  };
}

const WebsiteAnalyzer = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState('seo');
  const [showDetails, setShowDetails] = useState(false);

  // Function to validate URL format
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Helper function to get a random integer in a range
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate mock analysis data
  const generateMockAnalysis = (websiteUrl: string): AnalysisResult => {
    const seoScore = getRandomInt(60, 95);
    const performanceScore = getRandomInt(50, 90);
    const securityScore = getRandomInt(70, 95);
    const accessibilityScore = getRandomInt(60, 90);

    return {
      url: websiteUrl,
      seo: {
        score: seoScore,
        issues: [
          {
            label: 'Meta Descriptions',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Add unique meta descriptions to all pages.'
          },
          {
            label: 'Title Tags',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Optimize title tags with target keywords.'
          },
          {
            label: 'Keyword Density',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Use target keywords more consistently throughout your content.'
          },
          {
            label: 'Image Alt Tags',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Add descriptive alt text to all images.'
          },
          {
            label: 'URL Structure',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Use SEO-friendly URLs with keywords.'
          }
        ]
      },
      performance: {
        score: performanceScore,
        metrics: [
          {
            label: 'Page Load Time',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Optimize images and minify CSS/JS files.'
          },
          {
            label: 'First Contentful Paint',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Reduce server response time and render-blocking resources.'
          },
          {
            label: 'Largest Contentful Paint',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Optimize your largest page element loading time.'
          },
          {
            label: 'Cumulative Layout Shift',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Fix layout shifts by pre-allocating space for dynamic elements.'
          },
          {
            label: 'Total Blocking Time',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Reduce JavaScript execution time and split long tasks.'
          }
        ]
      },
      security: {
        score: securityScore,
        issues: [
          {
            label: 'HTTPS Implementation',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Ensure all pages are served over HTTPS.'
          },
          {
            label: 'Content Security Policy',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Implement a proper Content Security Policy.'
          },
          {
            label: 'Cross-Site Scripting',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Secure forms and user input against XSS attacks.'
          },
          {
            label: 'Outdated Dependencies',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Update all packages and libraries to latest versions.'
          }
        ]
      },
      accessibility: {
        score: accessibilityScore,
        issues: [
          {
            label: 'Keyboard Navigation',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Ensure all interactive elements are keyboard accessible.'
          },
          {
            label: 'Color Contrast',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Improve contrast ratios between text and background.'
          },
          {
            label: 'ARIA Attributes',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Add proper ARIA attributes to interactive elements.'
          },
          {
            label: 'Alternative Text',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Add descriptive alt text to all images.'
          },
          {
            label: 'Heading Structure',
            score: getRandomInt(0, 100),
            status: getRandomInt(0, 100) > 70 ? 'good' : getRandomInt(0, 100) > 40 ? 'warning' : 'critical',
            recommendation: 'Use proper heading hierarchy (h1-h6).'
          }
        ]
      }
    };
  };

  const handleAnalyze = () => {
    if (!url) {
      toast({
        variant: "destructive",
        title: "URL required",
        description: "Please enter a website URL to analyze.",
      });
      return;
    }

    // Add http:// if the URL doesn't have a protocol
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = 'https://' + url;
    }

    if (!isValidUrl(normalizedUrl)) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid website URL.",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const mockData = generateMockAnalysis(normalizedUrl);
        setResult(mockData);
        setActiveTab('seo');
        toast({
          title: "Analysis complete",
          description: "Website analysis has been completed successfully.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Analysis failed",
          description: "There was an error analyzing the website.",
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 3000);
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-green-500 bg-green-500/10';
    if (status === 'warning') return 'text-yellow-500 bg-yellow-500/10';
    if (status === 'critical') return 'text-red-500 bg-red-500/10';
    return 'text-gray-500 bg-gray-500/10';
  };

  // Function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Function to get progress color
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Website Analyzer</h1>
        <p className="text-muted-foreground mb-8">Analyze websites for SEO and UX improvements</p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Website URL</CardTitle>
            <CardDescription>Enter a website URL to analyze its SEO, performance, security, and accessibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="e.g., example.com or https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !url} 
                className="min-w-[120px]"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result ? (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Analysis Results</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => window.open(result.url, '_blank')}
                  >
                    Visit Site <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                <CardDescription>{result.url}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div 
                    className="p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setActiveTab('seo')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <SearchCheck className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">SEO Score</h3>
                      </div>
                      <span className={`font-bold ${getScoreColor(result.seo.score)}`}>
                        {result.seo.score}/100
                      </span>
                    </div>
                    <Progress
                      value={result.seo.score}
                      className="h-2"
                      indicatorClassName={getProgressColor(result.seo.score)}
                    />
                  </div>

                  <div 
                    className="p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setActiveTab('performance')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Performance</h3>
                      </div>
                      <span className={`font-bold ${getScoreColor(result.performance.score)}`}>
                        {result.performance.score}/100
                      </span>
                    </div>
                    <Progress
                      value={result.performance.score}
                      className="h-2"
                      indicatorClassName={getProgressColor(result.performance.score)}
                    />
                  </div>

                  <div 
                    className="p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setActiveTab('security')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Security</h3>
                      </div>
                      <span className={`font-bold ${getScoreColor(result.security.score)}`}>
                        {result.security.score}/100
                      </span>
                    </div>
                    <Progress
                      value={result.security.score}
                      className="h-2"
                      indicatorClassName={getProgressColor(result.security.score)}
                    />
                  </div>

                  <div 
                    className="p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setActiveTab('accessibility')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Accessibility</h3>
                      </div>
                      <span className={`font-bold ${getScoreColor(result.accessibility.score)}`}>
                        {result.accessibility.score}/100
                      </span>
                    </div>
                    <Progress
                      value={result.accessibility.score}
                      className="h-2"
                      indicatorClassName={getProgressColor(result.accessibility.score)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <Card>
                <CardHeader className="border-b pb-3">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-6">
                  <TabsContent value="seo" className="mt-0">
                    <div className="space-y-4">
                      {result.seo.issues.map((issue, index) => (
                        <div key={index} className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${issue.status === 'good' ? 'bg-green-500' : issue.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                              <h4 className="font-medium">{issue.label}</h4>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(issue.status)}`}>
                              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                            </span>
                          </div>
                          {issue.recommendation && showDetails && (
                            <p className="mt-2 text-sm text-muted-foreground">{issue.recommendation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="performance" className="mt-0">
                    <div className="space-y-4">
                      {result.performance.metrics.map((metric, index) => (
                        <div key={index} className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${metric.status === 'good' ? 'bg-green-500' : metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                              <h4 className="font-medium">{metric.label}</h4>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                              {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                            </span>
                          </div>
                          {metric.recommendation && showDetails && (
                            <p className="mt-2 text-sm text-muted-foreground">{metric.recommendation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="security" className="mt-0">
                    <div className="space-y-4">
                      {result.security.issues.map((issue, index) => (
                        <div key={index} className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${issue.status === 'good' ? 'bg-green-500' : issue.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                              <h4 className="font-medium">{issue.label}</h4>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(issue.status)}`}>
                              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                            </span>
                          </div>
                          {issue.recommendation && showDetails && (
                            <p className="mt-2 text-sm text-muted-foreground">{issue.recommendation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="accessibility" className="mt-0">
                    <div className="space-y-4">
                      {result.accessibility.issues.map((issue, index) => (
                        <div key={index} className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${issue.status === 'good' ? 'bg-green-500' : issue.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                              <h4 className="font-medium">{issue.label}</h4>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(issue.status)}`}>
                              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                            </span>
                          </div>
                          {issue.recommendation && showDetails && (
                            <p className="mt-2 text-sm text-muted-foreground">{issue.recommendation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                  </Button>
                  <Button>
                    Download Full Report
                  </Button>
                </CardFooter>
              </Card>
            </Tabs>
          </div>
        ) : (
          <Card className="text-center p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Enter a URL to start analyzing</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our tool will analyze your website's SEO, performance, security, and accessibility to provide actionable insights.
              </p>
              <Button 
                className="flex items-center gap-2"
                onClick={() => document.querySelector('input')?.focus()}
              >
                Start Analysis <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default WebsiteAnalyzer;
