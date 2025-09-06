import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Users, Trophy, Star, CheckCircle, ArrowRight, Play, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentAuthorityProps {
  toolName: string;
  category: string;
  description: string;
  features: string[];
  useCases: string[];
  comparisons?: Array<{
    competitor: string;
    ourAdvantage: string;
    theirLimitation: string;
  }>;
  tutorials?: Array<{
    title: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    steps: string[];
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedTools?: Array<{
    name: string;
    route: string;
    description: string;
  }>;
}

const ContentAuthority: React.FC<ContentAuthorityProps> = ({
  toolName,
  category,
  description,
  features,
  useCases,
  comparisons = [],
  tutorials = [],
  faqs = [],
  relatedTools = []
}) => {

  const defaultFAQs = [
    {
      question: `Is ${toolName} completely free?`,
      answer: `Yes! ${toolName} is 100% free with no hidden costs, no signup required, and unlimited usage. We believe professional tools should be accessible to everyone.`
    },
    {
      question: `How does ${toolName} compare to paid alternatives?`,
      answer: `Our ${toolName} offers the same professional features as expensive alternatives like Adobe, SmallPDF, or premium tools, but completely free. No watermarks, no file size limits.`
    },
    {
      question: `Is my data secure when using ${toolName}?`,
      answer: `Absolutely! All processing happens in your browser when possible, and we never store or share your files. Your privacy and data security are our top priorities.`
    },
    {
      question: `Can I use ${toolName} for commercial purposes?`,
      answer: `Yes! ${toolName} can be used for both personal and commercial projects without any restrictions or licensing fees.`
    },
    {
      question: `What file formats does ${toolName} support?`,
      answer: `${toolName} supports all major file formats and is optimized for professional use with high-quality output and fast processing.`
    }
  ];

  const defaultComparisons = [
    {
      competitor: "SmallPDF",
      ourAdvantage: "100% Free Forever",
      theirLimitation: "Limited free uses, then $9/month"
    },
    {
      competitor: "iLovePDF", 
      ourAdvantage: "No File Size Limits",
      theirLimitation: "Premium required for large files"
    },
    {
      competitor: "Adobe Acrobat",
      ourAdvantage: "No Installation Required",
      theirLimitation: "$15.99/month subscription"
    },
    {
      competitor: "PDFCandy",
      ourAdvantage: "No Watermarks Ever",
      theirLimitation: "Adds watermarks on free plan"
    }
  ];

  const allFAQs = [...faqs, ...defaultFAQs].slice(0, 8);
  const allComparisons = [...comparisons, ...defaultComparisons].slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="border-accent/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {category}
            </Badge>
            <Badge variant="outline" className="border-primary text-primary">
              Professional Tool
            </Badge>
          </div>
          <CardTitle className="text-2xl md:text-3xl text-primary">
            {toolName}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-accent" />
              <span>50,000+ users monthly</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>4.9/5 user rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% Free Forever</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="guide">How-to Guide</TabsTrigger>
          <TabsTrigger value="comparison">vs Competition</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="related">Related Tools</TabsTrigger>
        </TabsList>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Key Features & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Perfect For:</h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((useCase, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5 border-primary/20">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* How-to Guide Tab */}
        <TabsContent value="guide" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Step-by-Step Tutorial
              </CardTitle>
              <CardDescription>
                Learn how to use {toolName} effectively with our comprehensive guide
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tutorials.length > 0 ? (
                <div className="space-y-4">
                  {tutorials.map((tutorial, index) => (
                    <Card key={index} className="border-muted">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant={tutorial.difficulty === 'Beginner' ? 'secondary' : 
                                         tutorial.difficulty === 'Intermediate' ? 'outline' : 'destructive'}>
                              {tutorial.difficulty}
                            </Badge>
                            <Badge variant="outline">{tutorial.duration}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-2">
                          {tutorial.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm flex items-center justify-center">
                                {stepIndex + 1}
                              </span>
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="text-center p-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">1. Upload</h4>
                      <p className="text-sm text-muted-foreground">
                        Select or drag & drop your file
                      </p>
                    </Card>
                    <Card className="text-center p-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-accent" />
                      </div>
                      <h4 className="font-semibold mb-2">2. Process</h4>
                      <p className="text-sm text-muted-foreground">
                        Our tool processes your file instantly
                      </p>
                    </Card>
                    <Card className="text-center p-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Download className="h-6 w-6 text-green-500" />
                      </div>
                      <h4 className="font-semibold mb-2">3. Download</h4>
                      <p className="text-sm text-muted-foreground">
                        Get your processed file immediately
                      </p>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Why Choose {toolName}?
              </CardTitle>
              <CardDescription>
                See how we compare to popular alternatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allComparisons.map((comp, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">Pine Tools Hub vs {comp.competitor}</h4>
                      <Badge className="bg-green-500 text-white">Winner</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-700 dark:text-green-300">Our Advantage</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">{comp.ourAdvantage}</p>
                      </div>
                      <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-4 h-4 text-red-600">✗</span>
                          <span className="font-medium text-red-700 dark:text-red-300">{comp.competitor} Limitation</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">{comp.theirLimitation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Everything you need to know about {toolName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {allFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Related Tools Tab */}
        <TabsContent value="related" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Related Tools & Resources</CardTitle>
              <CardDescription>
                Explore other tools that work great with {toolName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {relatedTools.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedTools.map((tool, index) => (
                    <Card key={index} className="border-muted hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link to={tool.route}>
                          <Button variant="outline" className="w-full group">
                            Try {tool.name}
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Share2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Complete Toolkit</h4>
                  <p className="text-muted-foreground mb-4">
                    {toolName} works perfectly with our entire suite of 150+ professional tools
                  </p>
                  <Link to="/">
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      Explore All Tools
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAuthority;