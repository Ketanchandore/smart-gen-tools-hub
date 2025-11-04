import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import { additionalBlogPosts } from '@/data/additionalBlogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  // Get post from blog data
  let post = slug ? getBlogPostBySlug(slug) : null;
  
  // Also check additional posts
  if (!post) {
    post = additionalBlogPosts.find(p => p.slug === slug);
  }
  
  const relatedPosts = post ? getRelatedPosts(post.slug, 3) : [];


  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'Article link copied to clipboard',
      });
    }
  };
  
  if (!post) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Article schema for rich snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Pine Tools Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pinetoolshub.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pinetoolshub.com/blog/${slug}`
    },
    "keywords": post.keywords.join(', ')
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Pine Tools Hub Blog`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        url={`https://pinetoolshub.com/blog/${slug}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <Layout>
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>

            <article>
              <header className="mb-8">
                <Badge className="mb-4">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" onClick={() => handleShare('twitter')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Tweet
                  </Button>
                  <Button variant="outline" onClick={() => handleShare('facebook')}>
                    <Facebook className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={() => handleShare('linkedin')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                  <Button variant="outline" onClick={() => handleShare()}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </header>

              {/* Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <Card className="mb-8 bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold">Table of Contents</h3>
                    </div>
                    <nav>
                      <ol className="space-y-2">
                        {post.tableOfContents.map((item, index) => (
                          <li key={item.id}>
                            <a 
                              href={`#${item.id}`}
                              className="text-primary hover:underline flex items-start gap-2"
                            >
                              <span className="text-muted-foreground">{index + 1}.</span>
                              <span>{item.title}</span>
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </CardContent>
                </Card>
              )}

              <div 
                className="prose prose-lg max-w-none mb-12 
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-foreground prose-li:text-foreground
                  prose-strong:text-foreground prose-a:text-primary
                  prose-code:text-primary prose-pre:bg-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Related Tools CTA */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">🛠️ Try These Related Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.relatedTools.map((tool) => (
                      <Link key={tool.path} to={tool.path} className="group">
                        <div className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors">
                          <h4 className="font-bold mb-1 group-hover:text-primary">{tool.name}</h4>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">📚 Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <Badge className="mb-3">{relatedPost.category}</Badge>
                            <h4 className="font-bold mb-2 group-hover:text-primary line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {relatedPost.metaDescription}
                            </p>
                            <p className="text-xs text-muted-foreground">{relatedPost.readTime}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Again Footer */}
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2">Found this helpful?</h3>
                  <p className="text-muted-foreground mb-4">Share it with others who might benefit</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" onClick={() => handleShare('twitter')}>
                      <Twitter className="h-4 w-4 mr-2" />
                      Tweet
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleShare('facebook')}>
                      <Facebook className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleShare('linkedin')}>
                      <Linkedin className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogPost;
