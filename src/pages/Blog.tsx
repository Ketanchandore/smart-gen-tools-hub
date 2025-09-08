import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { BreadcrumbStructuredData } from '@/components/StructuredData';
import CompleteBlogSystem from '@/components/CompleteBlogSystem';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const breadcrumbItems = [
    { name: "Home", url: "https://pinetoolshub.com" },
    { name: "Blog", url: "https://pinetoolshub.com/blog" }
  ];

  const relatedTools = [
    { name: "AI Blog Writer", link: "/blog-writer" },
    { name: "Resume Builder", link: "/resume-builder" },
    { name: "Content Detector", link: "/content-detector" },
    { name: "Website Analyzer", link: "/website-analyzer" }
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Quick Tool Access */}
        <div className="mb-8 p-6 bg-muted/30 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            🔥 Popular Tools Featured in Our Articles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedTools.map((tool) => (
              <Link key={tool.name} to={tool.link} className="group">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <span className="text-sm">{tool.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Complete Blog System */}
        <CompleteBlogSystem 
          showCategories={true}
          showSearch={true}
          showFeatured={true}
          maxPosts={20}
        />

        {/* Internal Links Section for SEO */}
        <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            🛠️ Explore Our Complete Tool Suite
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium text-foreground mb-2">AI & Content Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/blog-writer" className="text-primary hover:underline">AI Blog Writer</Link></li>
                <li><Link to="/blog-rewriter" className="text-primary hover:underline">Blog Rewriter & SEO</Link></li>
                <li><Link to="/twitter-thread" className="text-primary hover:underline">Twitter Thread Generator</Link></li>
                <li><Link to="/content-detector" className="text-primary hover:underline">AI Content Detector</Link></li>
                <li><Link to="/code-generator" className="text-primary hover:underline">Code Generator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Career & Business</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/resume-builder" className="text-primary hover:underline">AI Resume Builder</Link></li>
                <li><Link to="/cover-letter" className="text-primary hover:underline">Cover Letter Generator</Link></li>
                <li><Link to="/interview-coach" className="text-primary hover:underline">Interview Coach</Link></li>
                <li><Link to="/business-plan" className="text-primary hover:underline">Business Plan Generator</Link></li>
                <li><Link to="/linkedin-bio" className="text-primary hover:underline">LinkedIn Optimizer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">PDF & Document Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/pdf-to-word" className="text-primary hover:underline">PDF to Word</Link></li>
                <li><Link to="/word-to-pdf" className="text-primary hover:underline">Word to PDF</Link></li>
                <li><Link to="/merge-pdf" className="text-primary hover:underline">Merge PDF</Link></li>
                <li><Link to="/compress-pdf" className="text-primary hover:underline">Compress PDF</Link></li>
                <li><Link to="/split-pdf" className="text-primary hover:underline">Split PDF</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Media & Creative</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/image-generator" className="text-primary hover:underline">AI Image Generator</Link></li>
                <li><Link to="/qr-code" className="text-primary hover:underline">QR Code Generator</Link></li>
                <li><Link to="/barcode-generator" className="text-primary hover:underline">Barcode Generator</Link></li>
                <li><Link to="/youtube-summarizer" className="text-primary hover:underline">YouTube Summarizer</Link></li>
                <li><Link to="/avatar-generator" className="text-primary hover:underline">Avatar Generator</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              🚀 <strong>100+ Free Tools Available</strong> - No registration required, instant results, professional quality
            </p>
            <Link to="/">
              <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                Browse All Tools →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;