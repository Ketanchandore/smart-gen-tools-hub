import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Clock, ArrowRight, Search, Filter, TrendingUp, Eye, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedSEO from './AdvancedSEO';
import ContentAuthority from './ContentAuthority';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  link: string;
  views: number;
  shareCount: number;
  image?: string;
}

const completeBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Complete Guide to AI-Powered Content Creation in 2024",
    excerpt: "Master the art of AI content creation with our comprehensive guide. Learn about GPT models, prompt engineering, and automation strategies that top content creators use.",
    category: "AI & Technology",
    readTime: "15 min read",
    date: "January 15, 2024",
    author: "Pine Tools Team",
    tags: ["AI Tools", "Content Creation", "ChatGPT", "Automation", "Productivity"],
    featured: true,
    link: "/blog/ai-content-creation-guide-2024",
    views: 45000,
    shareCount: 1200,
    image: "/blog-images/ai-content-creation.jpg"
  },
  {
    id: 2,
    title: "PDF Mastery: 50+ Hidden Features You Never Knew Existed",
    excerpt: "Unlock the full potential of PDF tools with advanced techniques for editing, converting, and optimizing documents. Professional tips from document workflow experts.",
    category: "Document Management",
    readTime: "12 min read", 
    date: "January 12, 2024",
    author: "Document Expert",
    tags: ["PDF Tools", "Document Editing", "Workflow", "Business Tools", "Productivity"],
    featured: true,
    link: "/blog/pdf-mastery-hidden-features",
    views: 38000,
    shareCount: 890,
    image: "/blog-images/pdf-mastery.jpg"
  },
  {
    id: 3,
    title: "Resume That Gets Hired: ATS Optimization Secrets Revealed",
    excerpt: "Former HR director reveals the exact strategies to beat Applicant Tracking Systems and land interviews. Includes free ATS-friendly templates and keywords database.",
    category: "Career Development",
    readTime: "18 min read",
    date: "January 10, 2024", 
    author: "Career Coach Pro",
    tags: ["Resume Building", "ATS Optimization", "Job Search", "Career Tips", "Interview Prep"],
    featured: true,
    link: "/blog/resume-ats-optimization-secrets",
    views: 52000,
    shareCount: 2100,
    image: "/blog-images/resume-optimization.jpg"
  },
  {
    id: 4,
    title: "From Zero to Viral: Content Marketing Strategy That Actually Works",
    excerpt: "Step-by-step blueprint used by successful content creators to generate millions of views. Includes templates, tools, and distribution strategies.",
    category: "Marketing Strategy",
    readTime: "22 min read",
    date: "January 8, 2024",
    author: "Marketing Strategist",
    tags: ["Content Marketing", "Viral Content", "Social Media", "Growth Hacking", "Brand Building"],
    featured: true,
    link: "/blog/viral-content-marketing-strategy",
    views: 67000,
    shareCount: 3400,
    image: "/blog-images/viral-marketing.jpg"
  },
  {
    id: 5,
    title: "The Ultimate SEO Checklist: 127 Points for Google Domination",
    excerpt: "Complete SEO audit checklist used by agencies charging $10k+ per month. Technical SEO, content optimization, and link building strategies included.",
    category: "SEO & Growth",
    readTime: "25 min read",
    date: "January 5, 2024",
    author: "SEO Specialist",
    tags: ["SEO", "Google Rankings", "Organic Traffic", "Website Optimization", "Search Engine Marketing"],
    featured: false,
    link: "/blog/ultimate-seo-checklist-127-points",
    views: 41000,
    shareCount: 1500,
    image: "/blog-images/seo-checklist.jpg"
  },
  {
    id: 6,
    title: "AI Image Generation: From Prompt to Professional Results",
    excerpt: "Master AI image generation with advanced prompting techniques, style guides, and commercial usage rights. Create stunning visuals in minutes, not hours.",
    category: "AI & Design",
    readTime: "16 min read",
    date: "January 3, 2024",
    author: "AI Artist",
    tags: ["AI Images", "Midjourney", "DALL-E", "Stable Diffusion", "Digital Art", "Prompting"],
    featured: false,
    link: "/blog/ai-image-generation-professional-guide",
    views: 33000,
    shareCount: 780,
    image: "/blog-images/ai-image-generation.jpg"
  },
  {
    id: 7,
    title: "Productivity Hacks: 10x Your Output with These Free Tools",
    excerpt: "Discover the exact productivity stack used by top performers. Time management, automation, and focus techniques that actually work in the real world.",
    category: "Productivity",
    readTime: "14 min read",
    date: "December 30, 2023",
    author: "Productivity Expert",
    tags: ["Productivity", "Time Management", "Automation", "Workflow", "Free Tools", "Efficiency"],
    featured: false,
    link: "/blog/productivity-hacks-10x-output",
    views: 28000,
    shareCount: 650,
    image: "/blog-images/productivity-hacks.jpg"
  },
  {
    id: 8,
    title: "YouTube Growth: Algorithm Secrets That YouTube Doesn't Want You to Know",
    excerpt: "Former YouTube algorithm engineer reveals insider secrets for explosive channel growth. Optimization techniques that actually work in 2024.",
    category: "YouTube Growth",
    readTime: "20 min read",
    date: "December 28, 2023",
    author: "YouTube Expert",
    tags: ["YouTube", "Video Marketing", "Algorithm", "Content Creation", "Channel Growth", "Social Media"],
    featured: false,
    link: "/blog/youtube-algorithm-secrets-2024",
    views: 75000,
    shareCount: 4200,
    image: "/blog-images/youtube-growth.jpg"
  }
];

export const CompleteBlogSystem: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(completeBlogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    'all',
    ...Array.from(new Set(completeBlogPosts.map(post => post.category)))
  ];

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'shares':
          return b.shareCount - a.shareCount;
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Pine Tools Hub Blog",
    "description": "Expert guides, tutorials, and insights on productivity tools, AI, content creation, and digital workflows.",
    "url": `${window.location.origin}/blog`,
    "author": {
      "@type": "Organization",
      "name": "Pine Tools Hub"
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": post.author,
      "url": `${window.location.origin}${post.link}`
    }))
  };

  return (
    <>
      <AdvancedSEO
        title="Expert Guides & Tutorials | Pine Tools Hub Blog"
        description="Master productivity tools, AI technologies, and digital workflows with our comprehensive guides. Expert insights on content creation, SEO, career development, and more."
        keywords="productivity tools blog, AI tutorials, content creation guides, SEO tips, career development, digital workflow optimization"
        image="/blog-og-image.jpg"
        url={`${window.location.origin}/blog`}
        type="website"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Expert Guides & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master the tools and strategies that drive success. From AI-powered workflows to career acceleration, 
            get actionable insights from industry experts.
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles, guides, tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="shares">Most Shared</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline" className="bg-primary/10">Featured</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {post.shareCount.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild className="w-full group-hover:bg-primary/90">
                      <Link to={post.link}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.views > 50000 && (
                        <Badge variant="outline" className="bg-accent/10">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to={post.link}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Stay Ahead of the Curve</CardTitle>
              <CardDescription>
                Get weekly insights on the latest tools, strategies, and industry trends delivered to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Join 50,000+ professionals. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
};