import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Gift, Shield, Users, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

const Pricing = () => {
  const toolCategories = [
    {
      category: "AI-Powered Content Tools",
      description: "Professional content creation made simple",
      tools: [
        "AI Blog Writer & Rewriter",
        "Twitter Thread Generator", 
        "Smart Copy Generator",
        "Email Writer & Sequences",
        "Product Description Generator",
        "Social Media Captions",
        "YouTube Script Writer",
        "Content Detector (AI/Plagiarism)"
      ]
    },
    {
      category: "Career Development Suite",
      description: "Land your dream job with professional tools",
      tools: [
        "AI Resume Builder",
        "Cover Letter Generator",
        "LinkedIn Profile Optimizer",
        "Interview Coach & Practice",
        "Resume Score Analyzer",
        "Job Matcher by Resume"
      ]
    },
    {
      category: "PDF & Document Tools",
      description: "Complete document management solution",
      tools: [
        "PDF to Word/Excel/PowerPoint",
        "Word/Excel/PowerPoint to PDF",
        "Merge, Split & Compress PDFs",
        "PDF Editor & Annotations",
        "Digital Signature Tool",
        "PDF Watermark & Protection",
        "OCR Text Recognition",
        "Document Q&A Chat"
      ]
    },
    {
      category: "Multimedia & Design",
      description: "Create stunning visual and audio content",
      tools: [
        "AI Image Generator",
        "Avatar & Logo Creator",
        "Image Compressor & Converter",
        "Text-to-Speech (Premium Voices)",
        "Voice Cloner & Audio Enhancer",
        "YouTube/Video Summarizer",
        "Blog to Instagram Carousel",
        "Pinterest Pin Creator"
      ]
    },
    {
      category: "Developer & Analysis Tools", 
      description: "Powerful tools for developers and analysts",
      tools: [
        "Code Generator (Python, JS, HTML)",
        "Code Explainer & Debugger",
        "Website SEO Analyzer",
        "Chrome Extension Ideas",
        "SaaS Name & Domain Finder",
        "QR Code & Barcode Generator"
      ]
    },
    {
      category: "Learning & Productivity",
      description: "Study smarter and work more efficiently",
      tools: [
        "Smart Study Notes Maker",
        "AI Flashcard Generator",
        "Mind Map Creator",
        "Presentation Slide Generator",
        "Language Translator (90+ Languages)",
        "Chat with Website/YouTube",
        "Survey & Form Builder"
      ]
    }
  ];

  const features = [
    {
      icon: <Gift className="h-6 w-6 text-green-500" />,
      title: "100% Free Forever",
      description: "All tools are completely free with no hidden charges, subscriptions, or premium tiers."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Privacy Protected", 
      description: "Your data is never stored permanently. We process files locally when possible and delete uploads immediately."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "No Registration Required",
      description: "Start using any tool instantly without creating accounts or providing personal information."
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      title: "24/7 Availability",
      description: "Access all tools anytime, anywhere. No downtime, no maintenance windows, no restrictions."
    },
    {
      icon: <Users className="h-6 w-6 text-orange-500" />,
      title: "Unlimited Usage",
      description: "No daily, monthly, or yearly limits. Use our tools as much as you need for personal and commercial projects."
    },
    {
      icon: <Star className="h-6 w-6 text-red-500" />,
      title: "Professional Quality",
      description: "Enterprise-grade tools that deliver results comparable to paid software solutions."
    }
  ];

  const comparisonTools = [
    { tool: "Grammarly Premium", price: "$12/month", pineCost: "Free" },
    { tool: "Canva Pro", price: "$15/month", pineCost: "Free" },
    { tool: "Adobe Acrobat Pro", price: "$23/month", pineCost: "Free" },
    { tool: "Jasper AI", price: "$39/month", pineCost: "Free" },
    { tool: "Resume.io Premium", price: "$24/month", pineCost: "Free" }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://pinetoolshub.com" },
    { name: "Pricing", url: "https://pinetoolshub.com/pricing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Pricing - Pine Tools Hub | All Tools 100% Free Forever"
        description="Discover why Pine Tools Hub offers all premium AI tools, PDF converters, resume builders, and productivity utilities completely free. No subscriptions, no hidden costs, unlimited usage."
        keywords="free online tools, no subscription tools, free AI tools, free PDF converter, free resume builder, pine tools pricing, completely free tools"
        url="https://pinetoolshub.com/pricing"
      />
      
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <Gift className="h-3 w-3 mr-1" />
            100% Free Forever
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            All Tools Are <span className="text-green-600">Completely Free</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Pine Tools Hub believes in democratizing access to powerful productivity tools. 
            Every single tool on our platform is <strong>100% free</strong> with no restrictions, 
            no subscriptions, and no hidden costs. Ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Star className="h-4 w-4 mr-2" />
                Explore All Free Tools
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn About Our Mission
              </Button>
            </Link>
          </div>
        </div>

        {/* Why Free Section */}
        <div className="mb-16">
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Why Everything is Free?
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We believe that everyone deserves access to powerful tools that can improve their productivity, 
                  creativity, and professional success. Our mission is to eliminate barriers and provide 
                  world-class utilities at no cost.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools by Category */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete Toolkit - All Categories Included
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From AI-powered content creation to professional PDF management, career development to multimedia editing - 
              access everything without spending a penny.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {toolCategories.map((category, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {category.category}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{tool}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        100% Free
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        No Limits
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cost Comparison */}
        <div className="mb-16">
          <Card className="border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-foreground mb-4">
                Compare the Savings
              </CardTitle>
              <CardDescription className="text-lg">
                See how much money you save by using Pine Tools Hub instead of premium alternatives
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-2 font-semibold text-foreground">Similar Premium Tool</th>
                      <th className="text-center py-4 px-2 font-semibold text-foreground">Their Price</th>
                      <th className="text-center py-4 px-2 font-semibold text-green-600">Pine Tools Hub</th>
                      <th className="text-center py-4 px-2 font-semibold text-foreground">Annual Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTools.map((item, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-4 px-2 text-muted-foreground">{item.tool}</td>
                        <td className="py-4 px-2 text-center text-red-600 font-medium">{item.price}</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">FREE</td>
                        <td className="py-4 px-2 text-center text-green-600 font-bold">
                          ${parseInt(item.price.replace(/[^0-9]/g, '')) * 12}+/year
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                <p className="text-lg font-semibold text-green-800">
                  Total Annual Savings: <span className="text-2xl">$1,500+</span>
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Based on comparable premium tool subscriptions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Are the tools really 100% free?
                </h3>
                <p className="text-muted-foreground">
                  Yes! Every single tool on Pine Tools Hub is completely free to use. No hidden fees, 
                  no premium versions, no subscription requirements. We're committed to keeping all tools free forever.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How do you maintain quality without charging?
                </h3>
                <p className="text-muted-foreground">
                  We focus on efficiency and smart resource management. Our tools are optimized for performance 
                  and we use cutting-edge technologies to deliver professional results at scale.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Are there any usage limits?
                </h3>
                <p className="text-muted-foreground">
                  No usage limits! Use any tool as many times as you need for personal, educational, 
                  or commercial projects. We believe in unlimited access to productivity tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Do I need to create an account?
                </h3>
                <p className="text-muted-foreground">
                  Most tools work without any registration. For some advanced features like saving work 
                  or accessing history, you can optionally create a free account, but it's never required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-primary bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Using Free Professional Tools?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals, students, and businesses who trust Pine Tools Hub 
              for their daily productivity needs. No registration required - start now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  <Zap className="h-4 w-4 mr-2" />
                  Browse All Tools
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline">
                  Read Success Stories
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Popular Tools Links */}
        <div className="mt-16 p-8 bg-muted/20 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Start with Our Most Popular Free Tools
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium text-foreground mb-3">Content Creation</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog-writer" className="text-primary hover:underline">AI Blog Writer</Link></li>
                <li><Link to="/blog-rewriter" className="text-primary hover:underline">Blog SEO Optimizer</Link></li>
                <li><Link to="/twitter-thread" className="text-primary hover:underline">Twitter Thread Maker</Link></li>
                <li><Link to="/content-detector" className="text-primary hover:underline">AI Content Detector</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Career Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/resume-builder" className="text-primary hover:underline">Resume Builder</Link></li>
                <li><Link to="/cover-letter" className="text-primary hover:underline">Cover Letter Generator</Link></li>
                <li><Link to="/interview-coach" className="text-primary hover:underline">Interview Practice</Link></li>
                <li><Link to="/linkedin-bio" className="text-primary hover:underline">LinkedIn Optimizer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">PDF Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/pdf-to-word" className="text-primary hover:underline">PDF to Word</Link></li>
                <li><Link to="/word-to-pdf" className="text-primary hover:underline">Word to PDF</Link></li>
                <li><Link to="/merge-pdf" className="text-primary hover:underline">Merge PDFs</Link></li>
                <li><Link to="/compress-pdf" className="text-primary hover:underline">Compress PDF</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">AI Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/image-generator" className="text-primary hover:underline">AI Image Generator</Link></li>
                <li><Link to="/code-generator" className="text-primary hover:underline">Code Generator</Link></li>
                <li><Link to="/text-to-speech" className="text-primary hover:underline">Text to Speech</Link></li>
                <li><Link to="/website-analyzer" className="text-primary hover:underline">Website Analyzer</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;