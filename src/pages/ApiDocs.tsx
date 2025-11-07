import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FAQStructuredData, HowToStructuredData, ProductStructuredData } from '@/components/StructuredData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Check, Play, Code, Shield, Zap, Globe, Users } from "lucide-react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ApiDocs = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [playgroundEndpoint, setPlaygroundEndpoint] = useState("compress");
  const [playgroundApiKey, setPlaygroundApiKey] = useState("test_key_demo_1234567890");
  const [playgroundFileUrl, setPlaygroundFileUrl] = useState("https://example.com/sample.pdf");
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundResponse, setPlaygroundResponse] = useState<any>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const runPlayground = async () => {
    setPlaygroundLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPlaygroundResponse({
        success: true,
        original_url: playgroundFileUrl,
        compressed_url: "https://api.pinetoolshub.com/temp/abc123.pdf",
        original_size_mb: 5.2,
        compressed_size_mb: 1.8,
        compression_ratio: "65%",
        time_taken_seconds: 2.3
      });
      setPlaygroundLoading(false);
      toast.success("API request successful!");
    }, 2000);
  };

  const quickStartCode = `// 1. Get your free API key
const API_KEY = 'your_api_key_here';

// 2. Compress a PDF
const response = await fetch('https://api.pinetoolshub.com/v1/compress', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    file_url: 'https://example.com/document.pdf',
    quality: 'medium'
  })
});

// 3. Get result
const result = await response.json();
console.log('Compressed URL:', result.compressed_url);
console.log('Size reduction:', result.compression_ratio);`;

  const jsExample = `const axios = require('axios');

// Function to compress PDF
async function compressPDF(pdfUrl, quality = 'medium') {
  try {
    const response = await axios.post(
      'https://api.pinetoolshub.com/v1/compress',
      {
        file_url: pdfUrl,
        quality: quality
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Compression successful!');
    console.log('Original size:', response.data.original_size_mb, 'MB');
    console.log('Compressed size:', response.data.compressed_size_mb, 'MB');
    console.log('Reduction:', response.data.compression_ratio);
    return response.data.compressed_url;
  } catch (error) {
    console.error('Error:', error.response?.data?.error || error.message);
  }
}

// Usage
compressPDF('https://example.com/large.pdf', 'medium');`;

  const pythonExample = `import requests
import json

API_KEY = 'your_api_key_here'
API_BASE = 'https://api.pinetoolshub.com/v1'

def compress_pdf(file_url, quality='medium'):
    """Compress a PDF file using Pine Tools API"""
    
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'file_url': file_url,
        'quality': quality
    }
    
    try:
        response = requests.post(
            f'{API_BASE}/compress',
            json=payload,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        
        result = response.json()
        print(f"Original: {result['original_size_mb']} MB")
        print(f"Compressed: {result['compressed_size_mb']} MB")
        print(f"Saved: {result['compression_ratio']}")
        return result['compressed_url']
        
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return None

# Usage
if __name__ == '__main__':
    url = compress_pdf('https://example.com/document.pdf')
    print(f'Download: {url}')`;

  const phpExample = `<?php
class PineToolsAPI {
    private $api_key = 'your_api_key_here';
    private $api_base = 'https://api.pinetoolshub.com/v1';
    
    public function compressPDF($file_url, $quality = 'medium') {
        $data = [
            'file_url' => $file_url,
            'quality' => $quality
        ];
        
        return $this->makeRequest('/compress', $data);
    }
    
    private function makeRequest($endpoint, $data) {
        $curl = curl_init();
        
        curl_setopt_array($curl, [
            CURLOPT_URL => $this->api_base . $endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->api_key,
                'Content-Type: application/json'
            ]
        ]);
        
        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);
        
        if ($error) {
            throw new Exception('cURL Error: ' . $error);
        }
        
        return json_decode($response, true);
    }
}

// Usage
try {
    $api = new PineToolsAPI();
    $result = $api->compressPDF('https://example.com/document.pdf', 'medium');
    echo "Compressed URL: " . $result['compressed_url'];
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>`;

  const endpoints = [
    {
      id: "compress",
      title: "Compress PDF",
      method: "POST",
      path: "/v1/compress",
      description: "Reduce PDF file size while maintaining quality.",
      request: { file_url: "https://example.com/document.pdf", quality: "medium" },
      response: { success: true, compressed_url: "https://api.pinetoolshub.com/temp/abc123.pdf", compression_ratio: "65%" }
    },
    {
      id: "merge",
      title: "Merge PDFs",
      method: "POST",
      path: "/v1/merge",
      description: "Combine multiple PDF files into one document.",
      request: { file_urls: ["https://example.com/file1.pdf"], output_filename: "merged.pdf" },
      response: { success: true, merged_url: "https://api.pinetoolshub.com/temp/xyz789.pdf" }
    },
    {
      id: "split",
      title: "Split PDF",
      method: "POST",
      path: "/v1/split",
      description: "Separate a PDF into individual pages.",
      request: { file_url: "https://example.com/document.pdf" },
      response: { success: true, split_files: [] }
    },
    {
      id: "pdf-to-word",
      title: "PDF to Word",
      method: "POST",
      path: "/v1/convert/pdf-to-word",
      description: "Convert PDF to Word.",
      request: { file_url: "https://example.com/document.pdf" },
      response: { success: true, word_url: "https://api.pinetoolshub.com/temp/document.docx" }
    },
    {
      id: "word-to-pdf",
      title: "Word to PDF",
      method: "POST",
      path: "/v1/convert/word-to-pdf",
      description: "Convert Word to PDF.",
      request: { file_url: "https://example.com/document.docx" },
      response: { success: true, pdf_url: "https://api.pinetoolshub.com/temp/document.pdf" }
    }
  ];

  const faqs = [
    {
      q: "Is the API free to use?",
      a: "Yes! The Free tier includes 100 requests/day at no cost. No credit card required. Upgrade anytime for higher limits."
    },
    {
      q: "What's the difference between quality levels (low, medium, high)?",
      a: "low = smallest file size, less quality; medium = balanced; high = larger file but best quality. Most users prefer medium."
    },
    {
      q: "How long does file processing take?",
      a: "Most files process in 1-5 seconds. Larger PDFs may take longer. Check response for time_taken_seconds."
    },
    {
      q: "Can I use the API commercially?",
      a: "Yes! Personal, business, commercial projects - all allowed on any plan. Enterprise plan for high volume."
    },
    {
      q: "What file formats are supported?",
      a: "Currently: PDF, DOCX, DOC, JPG. More coming soon. Contact us for specific format requests."
    },
    {
      q: "How secure is my data?",
      a: "All files are encrypted in transit (HTTPS). Files are deleted within 24 hours. GDPR compliant. Never stored permanently."
    },
    {
      q: "Can I integrate with Zapier or Make?",
      a: "Not yet, but coming soon! Let us know if you need it - we'll prioritize."
    },
    {
      q: "Do you have webhooks for async processing?",
      a: "Yes! Pro and Enterprise plans include webhook support for large file processing."
    },
    {
      q: "What's your API uptime guarantee?",
      a: "99.9% uptime guarantee. Real-time status dashboard available."
    },
    {
      q: "How do I report bugs or request features?",
      a: "Email: api@pinetoolshub.com | Discord: join our community | GitHub: create an issue"
    }
  ];

  const faqItems = faqs.map(f => ({ question: f.q, answer: f.a }));
  
  const howToSteps = [
    { name: "Get your free API key", text: "Sign up with your email and get instant access to your API key from the dashboard. No credit card required for the free tier." },
    { name: "Make your first API call", text: "Use your API key in the Authorization header. Send a POST request to the desired endpoint with your file URL and parameters." },
    { name: "Process the response", text: "Receive JSON response with processed file URL, file size, processing time, and other metadata. Download or share the result." }
  ];

  return (
    <>
      <Helmet>
        <title>PDF Tools API Documentation - Free REST API | Pine Tools Hub</title>
        <meta name="description" content="Add powerful PDF processing to your applications with our free REST API. Compress, merge, split, and convert PDFs. 100 requests/day free tier, no credit card needed." />
        <meta name="keywords" content="pdf api, pdf rest api, pdf converter api, compress pdf api, merge pdf api, free pdf api, pdf processing api" />
        <link rel="canonical" href="https://www.pinetoolshub.com/api" />
      </Helmet>
      <FAQStructuredData questions={faqItems} />
      <HowToStructuredData 
        name="How to Use Pine Tools Hub API"
        description="Complete guide to integrating PDF processing API in your applications"
        totalTime="PT5M"
        steps={howToSteps}
      />
      <ProductStructuredData 
        name="Pine Tools Hub PDF API"
        description="RESTful API for PDF processing. Compress, merge, split, and convert PDFs programmatically with simple API calls."
        offers={{
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock"
        }}
        aggregateRating={{
          ratingValue: "4.8",
          reviewCount: "892"
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                PDF Tools API Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Add powerful PDF processing to your applications with our free REST API
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <Badge variant="secondary" className="px-4 py-2">✓ Free tier: 100 requests/day</Badge>
                <Badge variant="secondary" className="px-4 py-2">✓ RESTful API</Badge>
                <Badge variant="secondary" className="px-4 py-2">✓ JSON responses</Badge>
                <Badge variant="secondary" className="px-4 py-2">✓ CORS enabled</Badge>
                <Badge variant="secondary" className="px-4 py-2">✓ No credit card needed</Badge>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button size="lg" className="gap-2">
                  <Zap className="w-5 h-5" />
                  Get Free API Key
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Code className="w-5 h-5" />
                  View Code Examples
                </Button>
              </div>

              {/* Quick Start Code Preview */}
              <Card className="mt-8 text-left max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Quick Start - 2 Minutes Setup
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
                    >
                      {copiedCode === 'quickstart' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                    {quickStartCode}
                  </SyntaxHighlighter>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Getting Started with API Authentication</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</div>
                    Get Your API Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Click "Get Free API Key" button</li>
                    <li>• Sign up with email</li>
                    <li>• Copy API key from dashboard</li>
                    <li>• Add to Authorization header</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</div>
                    Using API Key
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Format: Authorization: Bearer YOUR_API_KEY</li>
                    <li>• Include in every API request header</li>
                    <li>• Keep key private, never share</li>
                    <li>• Free tier: 100 requests/day</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</div>
                    Rate Limits & Quotas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Free:</span>
                      <span className="font-semibold">100/day ($0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Starter:</span>
                      <span className="font-semibold">1,000/day ($19)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pro:</span>
                      <span className="font-semibold">10,000/day ($99)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Enterprise:</span>
                      <span className="font-semibold">Unlimited (Custom)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Endpoints Documentation */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">API Endpoints</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {endpoints.map((endpoint) => (
                <AccordionItem key={endpoint.id} value={endpoint.id} className="border rounded-lg bg-background">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <Badge>{endpoint.method}</Badge>
                      <span className="font-mono text-sm">{endpoint.path}</span>
                      <span className="text-muted-foreground">{endpoint.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">{endpoint.description}</p>
                    
                    <Tabs defaultValue="request">
                      <TabsList>
                        <TabsTrigger value="request">Request</TabsTrigger>
                        <TabsTrigger value="response">Response</TabsTrigger>
                        <TabsTrigger value="example">Example</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="request">
                        <div className="relative">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="absolute right-2 top-2 z-10"
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.request, null, 2), `req-${endpoint.id}`)}
                          >
                            {copiedCode === `req-${endpoint.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                            {JSON.stringify(endpoint.request, null, 2)}
                          </SyntaxHighlighter>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="response">
                        <div className="relative">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="absolute right-2 top-2 z-10"
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `res-${endpoint.id}`)}
                          >
                            {copiedCode === `res-${endpoint.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                            {JSON.stringify(endpoint.response, null, 2)}
                          </SyntaxHighlighter>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="example">
                        <div className="relative">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="absolute right-2 top-2 z-10"
                            onClick={() => copyToClipboard(`fetch('https://api.pinetoolshub.com${endpoint.path}', {\n  method: '${endpoint.method}',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify(${JSON.stringify(endpoint.request, null, 2)})\n});`, `ex-${endpoint.id}`)}
                          >
                            {copiedCode === `ex-${endpoint.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                            {`fetch('https://api.pinetoolshub.com${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${JSON.stringify(endpoint.request, null, 2)})
});`}
                          </SyntaxHighlighter>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Code Examples in Multiple Languages */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Code Examples in Multiple Languages</h2>
            
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
              </TabsList>
              
              <TabsContent value="javascript">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      JavaScript Example - Using axios
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(jsExample, 'js')}
                      >
                        {copiedCode === 'js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                      {jsExample}
                    </SyntaxHighlighter>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="python">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Python Example - Using requests
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(pythonExample, 'py')}
                      >
                        {copiedCode === 'py' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                      {pythonExample}
                    </SyntaxHighlighter>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="php">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      PHP Example - Using cURL
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(phpExample, 'php')}
                      >
                        {copiedCode === 'php' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SyntaxHighlighter language="php" style={vscDarkPlus} customStyle={{ borderRadius: '8px' }}>
                      {phpExample}
                    </SyntaxHighlighter>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* API Playground */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Try It Out - Interactive API Playground</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Test API Endpoints</CardTitle>
                <CardDescription>Try our API with real examples. No authentication required for testing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Endpoint</label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background"
                        value={playgroundEndpoint}
                        onChange={(e) => setPlaygroundEndpoint(e.target.value)}
                      >
                        {endpoints.map(ep => (
                          <option key={ep.id} value={ep.id}>{ep.title}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">API Key</label>
                      <Input 
                        value={playgroundApiKey}
                        onChange={(e) => setPlaygroundApiKey(e.target.value)}
                        placeholder="Enter API key"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">File URL</label>
                      <Input 
                        value={playgroundFileUrl}
                        onChange={(e) => setPlaygroundFileUrl(e.target.value)}
                        placeholder="Enter file URL"
                      />
                    </div>
                    
                    <Button 
                      onClick={runPlayground}
                      disabled={playgroundLoading}
                      className="w-full gap-2"
                    >
                      {playgroundLoading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Send Request
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Response</label>
                    <div className="bg-muted rounded-md p-4 min-h-[300px] font-mono text-sm">
                      {playgroundResponse ? (
                        <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: 0 }}>
                          {JSON.stringify(playgroundResponse, null, 2)}
                        </SyntaxHighlighter>
                      ) : (
                        <p className="text-muted-foreground">Response will appear here...</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Error Handling & Status Codes */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Error Handling & HTTP Status Codes</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>HTTP Status Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">200</Badge>
                      <span className="text-sm">Success - Request processed successfully</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">400</Badge>
                      <span className="text-sm">Bad Request - Invalid parameters</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">401</Badge>
                      <span className="text-sm">Unauthorized - Invalid API key</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">429</Badge>
                      <span className="text-sm">Rate Limited - Too many requests</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">500</Badge>
                      <span className="text-sm">Server Error - Service unavailable</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>✓ Always check response status before processing</li>
                    <li>✓ Implement exponential backoff for retries</li>
                    <li>✓ Store API key securely (environment variables)</li>
                    <li>✓ Set request timeouts (30 seconds recommended)</li>
                    <li>✓ Log errors for debugging</li>
                    <li>✓ Handle rate limits gracefully</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8" />
              Security Best Practices
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Do's ✓</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Store API key in environment variables</li>
                    <li>✓ Use HTTPS for all requests</li>
                    <li>✓ Implement request signing for sensitive apps</li>
                    <li>✓ Rotate keys regularly</li>
                    <li>✓ Monitor API usage</li>
                    <li>✓ Set up alerts for unusual activity</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Don'ts ✗</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✗ Don't expose API key in client-side code</li>
                    <li>✗ Don't commit API keys to GitHub</li>
                    <li>✗ Don't share API keys via email/chat</li>
                    <li>✗ Don't hardcode keys in applications</li>
                    <li>✗ Don't log full API keys</li>
                    <li>✗ Don't use same key across environments</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg bg-background px-6">
                  <AccordionTrigger className="hover:no-underline text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Support & Community */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Users className="w-8 h-8" />
              Get Help & Connect with Developers
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">api@pinetoolshub.com</p>
                  <p className="text-xs text-muted-foreground">24-hour response time</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Discord Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Join our Discord</p>
                  <p className="text-xs text-muted-foreground">1000+ active developers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">GitHub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">github.com/pinetoolshub</p>
                  <p className="text-xs text-muted-foreground">Report issues & discussions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">status.pinetoolshub.com</p>
                  <p className="text-xs text-muted-foreground">99.9% uptime</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <Card className="inline-block">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-8 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-primary">5,000+</div>
                      <div className="text-muted-foreground">Developers</div>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div>
                      <div className="text-2xl font-bold text-primary">500K+</div>
                      <div className="text-muted-foreground">Files Processed</div>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div>
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started in 60 Seconds</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers using our API to build amazing PDF tools
            </p>
            <Button size="lg" className="gap-2">
              <Zap className="w-5 h-5" />
              Get Free API Key
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 100 requests/day free forever
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApiDocs;
