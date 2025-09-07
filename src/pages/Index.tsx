import React, { useState } from 'react';
import { 
  Briefcase, FileText, FileUp, CreditCard, Calendar, User, 
  Image, BarChart2, Search, Binary, Mail, Mic, FileVideo, 
  Instagram, Twitter, MessageSquare, Book, Zap, Lightbulb,
  Code, Globe, Youtube, Workflow, FileCheck, BarChart, 
  PenTool, Layout, CheckCircle, Database, Headphones, 
  Filter, BrainCircuit, ArrowUpRight, Palette, AtSign,
  BadgeDollarSign, CircleUser, QrCode, Network, Layers,
  Chrome, BookOpen, Send, Scissors, Minimize, FileSpreadsheet,
  Presentation, Signature, Droplets, RotateCcw, Unlock, Shield,
  Hash, ScanLine, FileSearch, Eye, Crop
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '../contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import AdvancedSEO from '@/components/AdvancedSEO';
import { useAdvancedSEO } from '@/hooks/useAdvancedSEO';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();

  // Initialize advanced SEO tracking
  useAdvancedSEO();

  // Tool categories
  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'career', label: 'Career Tools' },
    { id: 'content', label: 'Content Creation' },
    { id: 'multimedia', label: 'Multimedia' },
    { id: 'document', label: 'Document Tools' },
    { id: 'coding', label: 'Development' },
    { id: 'learning', label: 'Learning Tools' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'design', label: 'Design Tools' },
    { id: 'utilities', label: 'Utilities' },
  ];
  
  // All tools with their categories
  const allTools = [
    // Career Tools
    { 
      id: 'resume-builder', 
      title: 'AI Resume Builder', 
      description: 'Create professional resumes in minutes', 
      icon: <Briefcase />, 
      route: '/resume-builder',
      category: 'career',
      isNew: true
    },
    { 
      id: 'cover-letter', 
      title: 'Cover Letter Generator', 
      description: 'Generate tailored cover letters', 
      icon: <FileText />, 
      route: '/cover-letter',
      category: 'career',
      isNew: true
    },
    { 
      id: 'linkedin-bio', 
      title: 'LinkedIn Profile Optimizer', 
      description: 'Optimize your LinkedIn profile', 
      icon: <User />, 
      route: '/linkedin-bio',
      category: 'career',
      isNew: true
    },
    { 
      id: 'job-matcher', 
      title: 'Job Matcher by Resume', 
      description: 'Find job matches based on your resume', 
      icon: <CheckCircle />, 
      route: '/job-matcher',
      category: 'career',
      isNew: true
    },
    { 
      id: 'interview-coach', 
      title: 'Interview Coach', 
      description: 'Prepare for interviews with AI feedback', 
      icon: <MessageSquare />, 
      route: '/interview-coach',
      category: 'career',
      isNew: true
    },
    { 
      id: 'resume-score', 
      title: 'Resume Score Analyzer', 
      description: 'Get professional analysis of your resume', 
      icon: <BarChart />, 
      route: '/resume-score',
      category: 'career',
      isNew: true
    },
    
    // Content Creation
    { 
      id: 'blog-writer', 
      title: 'AI Blog Writer', 
      description: 'Generate full blog posts on any topic', 
      icon: <FileText />, 
      route: '/blog-writer',
      category: 'content',
      isNew: true
    },
    { 
      id: 'blog-rewriter', 
      title: 'Blog Rewriter + SEO Optimizer', 
      description: 'Rewrite content for SEO optimization', 
      icon: <FileCheck />, 
      route: '/blog-rewriter',
      category: 'content',
      isNew: true
    },
    { 
      id: 'twitter-thread', 
      title: 'AI Twitter Thread Generator', 
      description: 'Create engaging Twitter threads', 
      icon: <Twitter />, 
      route: '/twitter-thread',
      category: 'content',
      isNew: true
    },
    { 
      id: 'content-detector', 
      title: 'Content Detector (AI/Plagiarism)', 
      description: 'Check content for AI or plagiarism', 
      icon: <FileCheck />, 
      route: '/content-detector',
      category: 'content',
      isNew: true
    },
    { 
      id: 'blog-topics', 
      title: 'Blog Topic Generator', 
      description: 'Generate engaging blog topics', 
      icon: <Lightbulb />, 
      route: '/blog-topics',
      category: 'content',
      isNew: true
    }
    // ... rest of tools would continue here
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <AdvancedSEO
        title="Free Online Tools Hub | Pine Tools - 100+ Productivity Tools"
        description="Boost your productivity with 100+ free online tools. AI-powered content creation, PDF tools, career resources, image generators, and more. No registration required."
        keywords="free online tools, productivity tools, AI tools, PDF tools, image generators, content creation, career tools, resume builder"
        image="/og-homepage.jpg"
        url={window.location.origin}
        type="website"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Pine Tools Hub
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Your ultimate productivity companion. Access <span className="text-primary font-semibold">100+ free tools</span> 
              for content creation, career development, and digital workflows.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tools... (e.g., 'resume builder', 'PDF converter', 'AI image')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-primary/20 focus:border-primary/50 rounded-full bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Label htmlFor="dark-mode" className="text-sm font-medium">
                Light Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </Label>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 h-auto p-2 mb-12 bg-muted/50 rounded-xl">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="text-xs md:text-sm px-3 py-2 rounded-lg font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tools Grid */}
              <TabsContent value={selectedCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      route={tool.route}
                      isNew={tool.isNew}
                    />
                  ))}
                </div>

                {filteredTools.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-semibold mb-2">No tools found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or browse different categories
                    </p>
                    <Button onClick={() => setSearchQuery('')} variant="outline">
                      Clear Search
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals using Pine Tools Hub to streamline their workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/blog">
                  Learn More
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link to="/about">
                  About Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;