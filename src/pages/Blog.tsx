
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "How to Write a Resume Using AI: A Complete Guide",
      excerpt: "Learn how to leverage AI tools to create a professional resume that stands out. We cover everything from content generation to formatting tips.",
      content: "Creating a resume can be challenging, but AI tools make it easier than ever. Our AI Resume Builder helps you create professional resumes in minutes...",
      author: "Sarah Johnson",
      date: "2025-01-05",
      readTime: "8 min read",
      category: "Career Tools",
      tags: ["resume", "AI", "career", "job search"],
      featured: true,
      slug: "how-to-write-resume-using-ai"
    },
    {
      id: 2,
      title: "PDF to Excel: Best Practices for Data Extraction",
      excerpt: "Discover the most effective techniques for converting PDF files to Excel spreadsheets without losing data integrity.",
      content: "Converting PDF files to Excel can be tricky, especially when dealing with complex tables and formatting...",
      author: "Mike Chen",
      date: "2025-01-03",
      readTime: "6 min read",
      category: "PDF Tools",
      tags: ["PDF", "Excel", "data extraction", "conversion"],
      featured: false,
      slug: "pdf-to-excel-best-practices"
    },
    {
      id: 3,
      title: "10 AI Content Writing Tips for Better Social Media",
      excerpt: "Master the art of AI-assisted content creation for social media. Learn how to generate engaging posts that connect with your audience.",
      content: "Social media content creation doesn't have to be time-consuming. With the right AI tools and techniques...",
      author: "Emily Rodriguez",
      date: "2025-01-01",
      readTime: "5 min read",
      category: "Content Creation",
      tags: ["social media", "content writing", "AI", "marketing"],
      featured: true,
      slug: "ai-content-writing-social-media-tips"
    },
    {
      id: 4,
      title: "Password Security in 2025: Best Practices and Tools",
      excerpt: "Stay secure online with these essential password practices. Learn how to generate and manage strong passwords effectively.",
      content: "Password security is more important than ever. With cyber threats evolving, it's crucial to use strong, unique passwords...",
      author: "David Kim",
      date: "2024-12-28",
      readTime: "7 min read",
      category: "Security",
      tags: ["password", "security", "cybersecurity", "tools"],
      featured: false,
      slug: "password-security-best-practices-2025"
    },
    {
      id: 5,
      title: "QR Codes in Business: Creative Uses and Benefits",
      excerpt: "Explore innovative ways businesses are using QR codes in 2025. From contactless payments to marketing campaigns.",
      content: "QR codes have evolved far beyond simple URL sharing. Modern businesses are finding creative ways to integrate QR codes...",
      author: "Lisa Thompson",
      date: "2024-12-25",
      readTime: "4 min read",
      category: "Business Tools",
      tags: ["QR codes", "business", "marketing", "technology"],
      featured: false,
      slug: "qr-codes-business-creative-uses"
    },
    {
      id: 6,
      title: "Image Compression: Quality vs Size Optimization",
      excerpt: "Learn the balance between image quality and file size. Discover the best compression techniques for different use cases.",
      content: "Image compression is a delicate balance between maintaining visual quality and reducing file size...",
      author: "Alex Martinez",
      date: "2024-12-22",
      readTime: "6 min read",
      category: "Image Tools",
      tags: ["image compression", "optimization", "web design", "performance"],
      featured: false,
      slug: "image-compression-quality-vs-size"
    }
  ];

  const categories = ['all', 'Career Tools', 'PDF Tools', 'Content Creation', 'Security', 'Business Tools', 'Image Tools'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Blog - Smart Gen Tools Hub | AI Tools Tips & Tutorials"
        description="Learn how to get the most out of our AI-powered tools with expert tips, tutorials, and best practices. Stay updated with the latest in productivity tools."
      />
      
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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Smart Gen Tools Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, tutorials, and insights to help you master our AI-powered tools and boost your productivity.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === 'all' ? 'All Articles' : selectedCategory}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Article <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse different categories.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get the latest tips, tutorials, and tool updates delivered to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" type="email" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam, unsubscribe anytime. Read our Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
