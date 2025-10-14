import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  // In a real app, this would fetch from an API or CMS
  const blogData: Record<string, any> = {
    'best-free-online-calculator-tools-2025': {
      title: '10 Best Free Online Calculator Tools in 2025',
      category: 'Tool Tutorials',
      date: '2025-01-15',
      author: 'Alex Johnson',
      readTime: '8 min read',
      content: `
        <h2>Introduction</h2>
        <p>In today's digital age, having quick access to reliable calculation tools is essential for both personal and professional tasks. Whether you're managing finances, planning projects, or solving complex mathematical problems, the right calculator tool can save you time and reduce errors.</p>
        
        <h2>1. Password Generator</h2>
        <p>Creating strong, secure passwords is crucial in 2025. Our password generator tool uses advanced cryptographic algorithms to create unique, unbreakable passwords with customizable options for length and character types.</p>
        <p><strong>Key Features:</strong></p>
        <ul>
          <li>Adjustable password length (8-32 characters)</li>
          <li>Multiple character set options</li>
          <li>Instant generation</li>
          <li>Copy to clipboard functionality</li>
        </ul>
        
        <h2>2. Advanced PDF Calculators</h2>
        <p>PDF manipulation tools have evolved significantly. From merging multiple documents to compressing large files, these calculators help you manage digital documents efficiently.</p>
        
        <h2>3. Image Optimization Calculator</h2>
        <p>Optimize your images for web use with our compression calculator. Find the perfect balance between quality and file size to improve your website's loading speed.</p>
        
        <h2>Conclusion</h2>
        <p>These calculator tools represent the best of what's available in 2025. Each tool is designed with user experience in mind, offering powerful features while maintaining simplicity and ease of use.</p>
      `,
    },
    'create-professional-qr-codes-guide': {
      title: 'How to Create Professional QR Codes: Complete Guide',
      category: 'How-to Guides',
      date: '2025-01-12',
      author: 'Sarah Miller',
      readTime: '10 min read',
      content: `
        <h2>What is a QR Code?</h2>
        <p>QR (Quick Response) codes are two-dimensional barcodes that can store various types of information, from URLs to contact details. They've become increasingly popular for marketing, payments, and contactless interactions.</p>
        
        <h2>Step 1: Choose Your Content Type</h2>
        <p>Before creating a QR code, determine what information you want to encode:</p>
        <ul>
          <li>Website URLs</li>
          <li>Contact information (vCard)</li>
          <li>Plain text messages</li>
          <li>WiFi credentials</li>
          <li>Social media profiles</li>
        </ul>
        
        <h2>Step 2: Use a Reliable QR Code Generator</h2>
        <p>Select a professional QR code generator tool that offers customization options. Our QR Code Generator provides multiple formats and styling options to match your brand.</p>
        
        <h2>Step 3: Customize Your Design</h2>
        <p>Make your QR code stand out with custom colors, logos, and styling. However, ensure the code remains scannable by maintaining sufficient contrast.</p>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Test your QR code on multiple devices before deployment</li>
          <li>Ensure adequate size (minimum 2cm x 2cm for print)</li>
          <li>Use high-quality printing for physical materials</li>
          <li>Include a clear call-to-action near the QR code</li>
          <li>Monitor scan analytics to measure engagement</li>
        </ul>
        
        <h2>Common Use Cases</h2>
        <p>QR codes excel in various scenarios including product packaging, business cards, event tickets, restaurant menus, and marketing materials.</p>
      `,
    },
    'password-security-best-practices-2025': {
      title: 'Password Security Best Practices for 2025',
      category: 'Productivity Tips',
      date: '2025-01-10',
      author: 'Mike Chen',
      readTime: '6 min read',
      content: `
        <h2>Why Password Security Matters</h2>
        <p>With cyber threats evolving constantly, maintaining strong password security is more critical than ever. A single weak password can compromise your entire digital identity.</p>
        
        <h2>Creating Strong Passwords</h2>
        <p>A strong password should be:</p>
        <ul>
          <li>At least 12-16 characters long</li>
          <li>A mix of uppercase and lowercase letters</li>
          <li>Include numbers and special symbols</li>
          <li>Avoid common words or personal information</li>
          <li>Unique for each account</li>
        </ul>
        
        <h2>Password Manager Benefits</h2>
        <p>Using a password manager offers numerous advantages including secure storage, automatic password generation, and easy access across devices.</p>
        
        <h2>Two-Factor Authentication</h2>
        <p>Enable 2FA wherever possible. This adds an extra layer of security by requiring a second form of verification beyond your password.</p>
        
        <h2>Password Rotation Strategy</h2>
        <p>While frequent password changes aren't always necessary, you should update passwords immediately if:</p>
        <ul>
          <li>There's been a data breach</li>
          <li>You suspect unauthorized access</li>
          <li>You've shared the password with someone</li>
          <li>The password is older than 12 months</li>
        </ul>
        
        <h2>Common Mistakes to Avoid</h2>
        <p>Never reuse passwords across multiple accounts, avoid writing passwords down in plain text, and don't share passwords via unsecured channels like email or text messages.</p>
      `,
    },
  };

  const post = slug ? blogData[slug] : null;

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied!',
      description: 'Article link copied to clipboard',
    });
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Pine Tools Hub Blog`}
        description={post.content.substring(0, 155)}
        keywords={`${post.category}, online tools, tutorial, guide`}
        url={`https://pinetoolshub.com/blog/${slug}`}
      />
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

                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </header>

              <div 
                className="prose prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Try These Related Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" asChild>
                      <Link to="/password-generator">Password Generator</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/qr-code">QR Code Generator</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/image-compressor">Image Compressor</Link>
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
