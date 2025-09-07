import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, ArrowRight, BookOpen, PenTool, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential AI Tools Every Content Creator Needs in 2024",
      excerpt: "Discover the most powerful AI tools that are revolutionizing content creation, from blog writing to video summarization. Learn how to boost your productivity with Pine Tools Hub's comprehensive suite.",
      category: "AI Tools",
      readTime: "8 min read",
      date: "December 15, 2024",
      author: "Pine Tools Team",
      tags: ["AI Tools", "Content Creation", "Productivity", "Blog Writing"],
      featured: true,
      link: "/blog/ai-tools-content-creators-2024"
    },
    {
      id: 2,
      title: "The Ultimate Guide to PDF Management: From Creation to Optimization",
      excerpt: "Master PDF workflows with our comprehensive guide covering everything from converting Word to PDF to advanced editing techniques. Save hours of work with the right tools and techniques.",
      category: "PDF Tools",
      readTime: "12 min read",
      date: "December 10, 2024",
      author: "Pine Tools Team",
      tags: ["PDF Tools", "Document Management", "Productivity", "Office Tools"],
      featured: true,
      link: "/blog/ultimate-pdf-management-guide"
    },
    {
      id: 3,
      title: "How to Build a Professional Resume That Gets Noticed by Recruiters",
      excerpt: "Learn the secrets of creating resumes that pass ATS systems and catch recruiter attention. Our AI resume builder incorporates these proven strategies to boost your job search success.",
      category: "Career Development",
      readTime: "10 min read",
      date: "December 5, 2024",
      author: "Pine Tools Team",  
      tags: ["Resume Building", "Career Tips", "Job Search", "Professional Development"],
      featured: true,
      link: "/blog/professional-resume-tips-2024"
    },
    {
      id: 4,
      title: "Free Online Tools vs Premium Software: When to Choose What",
      excerpt: "Compare free online tools with premium software alternatives. Discover when free tools like Pine Tools Hub can replace expensive software and deliver professional results.",
      category: "Tool Comparison",
      readTime: "6 min read",
      date: "November 28, 2024",
      author: "Pine Tools Team",
      tags: ["Free Tools", "Software Comparison", "Cost Savings", "Productivity"],
      featured: false,
      link: "/blog/free-vs-premium-tools-comparison"
    },
    {
      id: 5,
      title: "SEO Content Creation: Using AI to Rank Higher in Search Results",
      excerpt: "Learn how to leverage AI-powered content creation tools to improve your search engine rankings. Discover the best practices for SEO-optimized blog posts and web content.",
      category: "Digital Marketing",
      readTime: "9 min read", 
      date: "November 20, 2024",
      author: "Pine Tools Team",
      tags: ["SEO", "Content Marketing", "AI Writing", "Digital Marketing"],
      featured: false,
      link: "/blog/seo-content-creation-ai-tools"
    },
    {
      id: 6,
      title: "Small Business Automation: Free Tools That Save Hours Daily",
      excerpt: "Discover free automation tools that can streamline your small business operations. From document processing to content generation, learn how to work smarter, not harder.",
      category: "Business",
      readTime: "7 min read",
      date: "November 15, 2024",
      author: "Pine Tools Team",
      tags: ["Business Automation", "Small Business", "Efficiency", "Free Tools"],
      featured: false,
      link: "/blog/small-business-automation-free-tools"
    }
  ];

  const categories = ["All", "AI Tools", "PDF Tools", "Career Development", "Digital Marketing", "Business"];

  const relatedTools = [
    { name: "AI Blog Writer", icon: <PenTool className="h-4 w-4" />, link: "/blog-writer" },
    { name: "Resume Builder", icon: <User className="h-4 w-4" />, link: "/resume-builder" },
    { name: "Content Detector", icon: <BookOpen className="h-4 w-4" />, link: "/content-detector" },
    { name: "Website Analyzer", icon: <Target className="h-4 w-4" />, link: "/website-analyzer" }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://pinetoolshub.com" },
    { name: "Blog", url: "https://pinetoolshub.com/blog" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Blog - Pine Tools Hub | AI Tools, PDF Tips & Productivity Guides"
        description="Explore expert guides on AI tools, PDF management, resume building, and productivity tips. Learn how to maximize efficiency with Pine Tools Hub's comprehensive free online tools."
        keywords="AI tools blog, PDF tutorials, resume tips, productivity guides, content creation tools, free online tools, digital marketing tips"
        url="https://pinetoolshub.com/blog"
      />
      
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pine Tools Hub Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights, tutorials, and tips on AI tools, productivity, and digital workflows. 
            Learn how to maximize your efficiency with our comprehensive guides and tool reviews.
          </p>
        </div>

        {/* Quick Tool Access */}
        <div className="mb-12 p-6 bg-muted/30 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Popular Tools Mentioned in Our Articles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedTools.map((tool) => (
              <Link key={tool.name} to={tool.link} className="group">
                <Button variant="outline" className="w-full justify-start gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {tool.icon}
                  <span className="text-sm">{tool.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="border-border hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">All Articles</h2>
          <div className="grid gap-6">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <Card className="border-border bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with Latest Tips & Tools
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get weekly insights on productivity tools, AI advancements, and exclusive tips to boost your workflow. 
              Join thousands of professionals who trust Pine Tools Hub for the latest in digital productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
              />
              <Button className="bg-primary text-primary-foreground">
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </CardContent>
        </Card>

        {/* Internal Links Section */}
        <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Explore Our Tools by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-foreground mb-2">Content & Writing</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/blog-writer" className="text-primary hover:underline">AI Blog Writer</Link></li>
                <li><Link to="/blog-rewriter" className="text-primary hover:underline">Blog Rewriter & SEO</Link></li>
                <li><Link to="/twitter-thread" className="text-primary hover:underline">Twitter Thread Generator</Link></li>
                <li><Link to="/content-detector" className="text-primary hover:underline">AI Content Detector</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Career Development</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/resume-builder" className="text-primary hover:underline">AI Resume Builder</Link></li>
                <li><Link to="/cover-letter" className="text-primary hover:underline">Cover Letter Generator</Link></li>
                <li><Link to="/interview-coach" className="text-primary hover:underline">Interview Coach</Link></li>
                <li><Link to="/linkedin-bio" className="text-primary hover:underline">LinkedIn Optimizer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Document Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/pdf-to-word" className="text-primary hover:underline">PDF to Word Converter</Link></li>
                <li><Link to="/word-to-pdf" className="text-primary hover:underline">Word to PDF Converter</Link></li>
                <li><Link to="/merge-pdf" className="text-primary hover:underline">Merge PDF Files</Link></li>
                <li><Link to="/compress-pdf" className="text-primary hover:underline">Compress PDF</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;