import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, User, Clock, ArrowRight, BookOpen, Search, 
  TrendingUp, Star, Eye, ThumbsUp, Share2, Filter,
  Tag, ChevronRight, ExternalLink, Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  slug: string;
  image?: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

interface CompleteBlogSystemProps {
  posts?: BlogPost[];
  showCategories?: boolean;
  showSearch?: boolean;
  showFeatured?: boolean;
  maxPosts?: number;
  category?: string;
}

const CompleteBlogSystem: React.FC<CompleteBlogSystemProps> = ({
  posts,
  showCategories = true,
  showSearch = true,
  showFeatured = true,
  maxPosts = 20,
  category
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');

  // Generate comprehensive SEO-optimized blog posts
  const generateSEOOptimizedPosts = (): BlogPost[] => {
    return [
      {
        id: 1,
        title: "Complete Guide to AI-Powered Content Creation Tools in 2024",
        seoTitle: "Best AI Content Creation Tools 2024 | Free Guide & Reviews",
        excerpt: "Master content creation with the latest AI tools. From blog writing to video scripts, discover 50+ free tools that boost productivity by 400%. Complete with tutorials, comparisons, and expert tips.",
        metaDescription: "Discover 50+ free AI content creation tools for 2024. Complete guide with tutorials, comparisons, and productivity tips. Boost your content creation by 400%.",
        keywords: ["AI content tools", "content creation", "AI writing", "blog tools", "content marketing", "AI generators"],
        category: "AI Tools",
        readTime: "15 min read",
        date: "January 15, 2024",
        author: "Pine Tools Team",
        tags: ["AI Tools", "Content Creation", "Productivity", "Marketing", "Writing Tools", "SEO"],
        featured: true,
        views: 15420,
        likes: 342,
        slug: "ai-content-creation-tools-guide-2024",
        image: "/blog/ai-content-tools.jpg"
      },
      {
        id: 2,
        title: "PDF Management Mastery: 25 Expert Tips to Save 10 Hours Weekly",
        seoTitle: "PDF Management Tips 2024 | Save 10 Hours Weekly with Expert Tricks",
        excerpt: "Transform your document workflow with advanced PDF techniques. Learn batch processing, automation tricks, and professional formatting that saves businesses $2000+ annually per employee.",
        metaDescription: "Learn 25 expert PDF management tips to save 10 hours weekly. Professional techniques for batch processing, automation, and document optimization.",
        keywords: ["PDF management", "document workflow", "PDF tools", "productivity", "office automation", "document processing"],
        category: "PDF Tools",
        readTime: "18 min read",
        date: "January 12, 2024",
        author: "Pine Tools Team",
        tags: ["PDF Tools", "Document Management", "Productivity", "Office Tools", "Automation", "Workflow"],
        featured: true,
        views: 12800,
        likes: 298,
        slug: "pdf-management-expert-tips-2024",
        image: "/blog/pdf-management.jpg"
      },
      {
        id: 3,
        title: "Resume Writing Secrets: Get 5x More Interviews in 30 Days",
        seoTitle: "Resume Writing Secrets 2024 | Get 5x More Job Interviews",
        excerpt: "Insider secrets from 500+ successful job placements. Learn ATS optimization, keyword strategies, and formatting tricks that helped professionals land $100K+ positions at top companies.",
        metaDescription: "Proven resume writing secrets that get 5x more interviews. ATS optimization, keywords, and formatting tricks from 500+ successful job placements.",
        keywords: ["resume writing", "job search", "ATS optimization", "career development", "interview tips", "job applications"],
        category: "Career Development",
        readTime: "12 min read",
        date: "January 10, 2024",
        author: "Pine Tools Team",
        tags: ["Resume Building", "Career Tips", "Job Search", "Professional Development", "Interview Prep"],
        featured: true,
        views: 18600,
        likes: 445,
        slug: "resume-writing-secrets-5x-interviews",
        image: "/blog/resume-secrets.jpg"
      },
      {
        id: 4,
        title: "Free vs Premium Tools: $5000 Savings Strategy for Small Businesses",
        seoTitle: "Free vs Premium Software 2024 | Save $5000 with Smart Tool Choices",
        excerpt: "Strategic analysis of 100+ tools shows how smart businesses save $5000+ annually. Complete comparison matrix, ROI calculations, and migration guides for every business function.",
        metaDescription: "Save $5000+ annually with smart tool choices. Complete comparison of 100+ free vs premium tools with ROI calculations and migration guides.",
        keywords: ["free tools", "business tools", "software comparison", "cost savings", "business productivity", "tool selection"],
        category: "Business Strategy",
        readTime: "14 min read",
        date: "January 8, 2024",
        author: "Pine Tools Team",
        tags: ["Free Tools", "Business Strategy", "Cost Savings", "Productivity", "Software Selection"],
        featured: false,
        views: 9340,
        likes: 187,
        slug: "free-premium-tools-savings-strategy",
        image: "/blog/tool-comparison.jpg"
      },
      {
        id: 5,
        title: "SEO Content Strategy: Rank #1 with AI-Generated Content",
        seoTitle: "AI SEO Content Strategy 2024 | Rank #1 with Smart Content",
        excerpt: "Revolutionary approach that helped 200+ websites achieve #1 rankings. Learn AI content optimization, semantic SEO, and EEAT strategies that bypass Google's AI detection while ranking higher.",
        metaDescription: "Revolutionary AI SEO strategy that helped 200+ websites rank #1. Learn content optimization, semantic SEO, and EEAT techniques for 2024.",
        keywords: ["SEO strategy", "AI content", "content marketing", "search rankings", "semantic SEO", "content optimization"],
        category: "Digital Marketing",
        readTime: "16 min read",
        date: "January 5, 2024",
        author: "Pine Tools Team",
        tags: ["SEO", "Content Marketing", "AI Writing", "Digital Marketing", "Search Rankings"],
        featured: false,
        views: 14200,
        likes: 356,
        slug: "ai-seo-content-strategy-rank-first",
        image: "/blog/seo-strategy.jpg"
      },
      {
        id: 6,
        title: "Small Business Automation: 50 Tasks You Can Automate Today",
        seoTitle: "Small Business Automation 2024 | 50 Tasks to Automate Now",
        excerpt: "Complete automation playbook for small businesses. Step-by-step guides for automating marketing, customer service, accounting, and operations. Includes free tools and implementation timelines.",
        metaDescription: "Automate 50 small business tasks today. Complete playbook with free tools, step-by-step guides, and implementation timelines for maximum efficiency.",
        keywords: ["business automation", "small business", "workflow automation", "productivity tools", "business efficiency", "process automation"],
        category: "Business Automation",
        readTime: "20 min read",
        date: "January 3, 2024",
        author: "Pine Tools Team",
        tags: ["Business Automation", "Small Business", "Efficiency", "Productivity", "Workflow"],
        featured: false,
        views: 11500,
        likes: 267,
        slug: "small-business-automation-50-tasks",
        image: "/blog/business-automation.jpg"
      }
    ];
  };

  const blogPosts = posts || generateSEOOptimizedPosts();

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered.slice(0, maxPosts);
  }, [blogPosts, selectedCategory, searchTerm, sortBy, maxPosts]);

  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
    return cats;
  }, [blogPosts]);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const trendingPosts = blogPosts.sort((a, b) => b.views - a.views).slice(0, 5);

  // Generate structured data for blog
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Pine Tools Hub Blog",
    "description": "Expert insights on AI tools, productivity, and digital workflows",
    "url": "https://pinetoolshub.com/blog",
    "author": {
      "@type": "Organization",
      "name": "Pine Tools Hub"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pine Tools Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pinetoolshub.com/logo.png"
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogStructuredData)}
        </script>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Expert Insights & Tutorials
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master productivity tools, AI technologies, and digital workflows with our comprehensive guides and expert insights.
        </p>
      </div>

      {/* Search and Filter Section */}
      {showSearch && (
        <div className="mb-8 bg-muted/20 p-6 rounded-lg border border-border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, or tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
                className="px-3 py-2 bg-background border border-border rounded-md"
              >
                <option value="date">Latest</option>
                <option value="views">Most Viewed</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>
          </div>
          
          {showCategories && (
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Featured Posts Section */}
          {showFeatured && featuredPosts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-yellow-500" />
                <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.slice(0, 3).map((post) => (
                  <BlogPostCard key={post.id} post={post} featured />
                ))}
              </div>
            </div>
          )}

          {/* All Posts Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Latest Articles</h2>
            <div className="grid gap-6">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} featured />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="grid gap-6">
            {trendingPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} showStats />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Newsletter CTA */}
      <Card className="border-border bg-gradient-to-r from-primary/10 to-secondary/10 mt-12">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Get Weekly Productivity Tips & Tool Updates
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join 25,000+ professionals who get our exclusive insights on AI tools, productivity hacks, and industry trends. 
            Plus get early access to new tools and features.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button className="bg-primary text-primary-foreground">
              Subscribe Free
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            100% free • No spam • Unsubscribe anytime • 25,000+ subscribers
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Blog Post Card Component
const BlogPostCard: React.FC<{
  post: BlogPost;
  featured?: boolean;
  showStats?: boolean;
}> = ({ post, featured = false, showStats = false }) => {
  return (
    <Card className={`border-border hover:shadow-lg transition-all duration-300 group ${featured ? 'bg-gradient-to-br from-muted/20 to-muted/10' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {post.category}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            {showStats && (
              <>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {post.likes}
                </span>
              </>
            )}
          </div>
        </div>
        <CardTitle className={`${featured ? 'text-xl' : 'text-lg'} group-hover:text-primary transition-colors line-clamp-2`}>
          {post.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-2 w-2 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant={featured ? "default" : "outline"}
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Read Article
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompleteBlogSystem;