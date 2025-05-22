
import React, { useState } from 'react';
import { PenTool, FileDown, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';

type BlogTone = 'professional' | 'casual' | 'educational' | 'persuasive';
type BlogLength = 'short' | 'medium' | 'long';

const BlogWriter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [outline, setOutline] = useState('');
  const [tone, setTone] = useState<BlogTone>('professional');
  const [length, setLength] = useState<BlogLength>('medium');
  const [generatedBlog, setGeneratedBlog] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerate = () => {
    if (!title.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide a blog title to generate content',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const blog = generateBlogContent(title, keywords, outline, tone, length);
      setGeneratedBlog(blog);
      setLoading(false);
      setActiveTab('preview');
      
      toast({
        title: 'Blog post generated!',
        description: 'Your AI-written blog post has been created successfully.',
      });
    }, 2000);
  };

  const handleDownload = () => {
    // Create a blob from the blog content
    const blob = new Blob([generatedBlog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Blog post downloaded',
      description: 'Your blog post has been downloaded as a text file.',
    });
  };

  const generateBlogContent = (
    blogTitle: string,
    blogKeywords: string,
    blogOutline: string,
    blogTone: BlogTone,
    blogLength: BlogLength
  ): string => {
    // Calculate target word count based on selected length
    const wordCounts = {
      short: 500,
      medium: 1000,
      long: 1500
    };
    
    const targetWordCount = wordCounts[blogLength];
    const keywordsArray = blogKeywords ? blogKeywords.split(',').map(k => k.trim()) : [];
    
    // Create sections based on outline or generate default sections
    let sections = blogOutline 
      ? blogOutline.split('\n').filter(line => line.trim().length > 0) 
      : ['Introduction', 'Main Point 1', 'Main Point 2', 'Main Point 3', 'Conclusion'];
    
    // Ensure we have at least 3 sections
    if (sections.length < 3) {
      sections = [...sections, ...['Additional Point', 'Conclusion'].slice(0, 3 - sections.length)];
    }
    
    // Generate tone-appropriate language
    const toneAttributes = {
      professional: {
        intro: "This article examines",
        transitions: ["Furthermore", "Additionally", "Moreover", "Consequently"],
        conclusion: "In conclusion",
        style: "detailed and fact-oriented"
      },
      casual: {
        intro: "Let's talk about",
        transitions: ["Also", "Plus", "And then", "So"],
        conclusion: "To wrap things up",
        style: "conversational and relatable"
      },
      educational: {
        intro: "In this comprehensive guide, we will learn about",
        transitions: ["It's important to note that", "Research shows that", "Consider this example", "As we explore further"],
        conclusion: "To summarize what we've learned",
        style: "informative and clear"
      },
      persuasive: {
        intro: "Discover why",
        transitions: ["Imagine", "You might be wondering", "The truth is", "Consider this"],
        conclusion: "It's time to take action on",
        style: "compelling and action-oriented"
      }
    };
    
    const tone_attrs = toneAttributes[blogTone];
    
    // Generate the blog post with title and sections
    let blogPost = `# ${blogTitle}\n\n`;
    
    // Introduction
    blogPost += `## ${sections[0]}\n\n`;
    blogPost += `${tone_attrs.intro} ${blogTitle}. This blog post will provide ${tone_attrs.style} information about this important topic. `;
    
    if (keywordsArray.length > 0) {
      blogPost += `We'll cover key aspects including ${keywordsArray.slice(0, 3).join(', ')} and more. `;
    }
    
    blogPost += `Let's dive in!\n\n`;
    
    // Body sections
    for (let i = 1; i < sections.length - 1; i++) {
      blogPost += `## ${sections[i]}\n\n`;
      
      // Add 2-3 paragraphs per section
      for (let p = 0; p < 2 + (blogLength === 'long' ? 1 : 0); p++) {
        const transition = tone_attrs.transitions[Math.floor(Math.random() * tone_attrs.transitions.length)];
        
        // Try to include keywords naturally
        let paragraph = "";
        if (p === 0) {
          paragraph = `When discussing ${sections[i].toLowerCase()}, it's important to consider various perspectives. `;
        } else {
          paragraph = `${transition}, we should examine how ${sections[i].toLowerCase()} impacts overall outcomes. `;
        }
        
        // Add keyword if available for this paragraph
        if (keywordsArray[i % keywordsArray.length]) {
          paragraph += `The concept of ${keywordsArray[i % keywordsArray.length]} plays a significant role here. `;
        }
        
        // Add filler content based on section and tone
        paragraph += `This aspect deserves careful attention because it directly affects results and performance. `;
        paragraph += `Many experts agree that focusing on this area leads to improved outcomes. `;
        
        if (blogLength === 'long') {
          paragraph += `Studies have shown consistent patterns that support this approach. When implemented correctly, these strategies can yield significant advantages. `;
        }
        
        blogPost += paragraph + "\n\n";
      }
    }
    
    // Conclusion
    blogPost += `## ${sections[sections.length - 1]}\n\n`;
    blogPost += `${tone_attrs.conclusion}, ${blogTitle.toLowerCase()} represents an important area for consideration. `;
    
    if (keywordsArray.length > 0) {
      blogPost += `We've explored key concepts like ${keywordsArray.slice(0, Math.min(3, keywordsArray.length)).join(', ')}. `;
    }
    
    blogPost += `Understanding these elements will help you achieve better results and make more informed decisions. `;
    
    if (blogTone === 'persuasive') {
      blogPost += `Now is the perfect time to apply these insights and take your knowledge to the next level. What will you do with this information?\n\n`;
    } else {
      blogPost += `We hope this guide has provided valuable insights that you can apply in your own context.\n\n`;
    }
    
    return blogPost;
  };
  
  return (
    <Layout>
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
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
            <PenTool className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI Blog Writer</h1>
          <p className="text-muted-foreground mt-2">Generate complete blog posts with AI assistance</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input">Blog Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview Blog</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Blog Post Details</CardTitle>
                <CardDescription>Fill in the information to generate your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blogTitle">Blog Title*</Label>
                  <Input 
                    id="blogTitle"
                    placeholder="e.g. 10 Effective Ways to Improve Your Productivity" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Target Keywords (comma separated)</Label>
                  <Input 
                    id="keywords"
                    placeholder="e.g. productivity, time management, focus" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="outline">Blog Outline (optional)</Label>
                  <Textarea 
                    id="outline"
                    placeholder="Add each section title on a new line or leave empty for auto-generation" 
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Writing Tone</Label>
                    <Select value={tone} onValueChange={(value) => setTone(value as BlogTone)}>
                      <SelectTrigger id="tone" className="w-full">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="length">Blog Length</Label>
                    <Select value={length} onValueChange={(value) => setLength(value as BlogLength)}>
                      <SelectTrigger id="length" className="w-full">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (~500 words)</SelectItem>
                        <SelectItem value="medium">Medium (~1000 words)</SelectItem>
                        <SelectItem value="long">Long (~1500 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !title.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Blog...
                    </>
                  ) : (
                    'Generate Blog Post'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Your Generated Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedBlog ? (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md max-h-[500px] overflow-y-auto">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {generatedBlog.split('\n').map((line, i) => {
                          if (line.startsWith('# ')) {
                            return <h1 key={i} className="text-2xl font-bold my-4">{line.substring(2)}</h1>;
                          } else if (line.startsWith('## ')) {
                            return <h2 key={i} className="text-xl font-semibold my-3">{line.substring(3)}</h2>;
                          } else if (line.trim() === '') {
                            return <br key={i} />;
                          } else {
                            return <p key={i} className="my-2">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={handleDownload} 
                        className="flex-1"
                        variant="default"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Blog Post
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('input')} 
                        variant="outline"
                        className="flex-1"
                      >
                        Edit Settings
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">
                      No blog post generated yet. Fill in the blog details and click "Generate Blog Post".
                    </p>
                    <Button 
                      onClick={() => setActiveTab('input')} 
                      variant="outline"
                      className="mt-4"
                    >
                      Go to Blog Settings
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Blog Writing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use a compelling title that includes your primary keyword</li>
                <li>Break up content with subheadings for better readability</li>
                <li>Include relevant keywords naturally, not forcefully</li>
                <li>Add data, statistics, and examples to support your points</li>
                <li>End with a strong call-to-action that encourages engagement</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BlogWriter;
