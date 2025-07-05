
import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SEOHead from '@/components/SEOHead';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Are the tools really free to use?",
      answer: "Yes! Most of our tools are completely free to use with no registration required. Some advanced features may require creating a free account, but basic functionality is always available to everyone."
    },
    {
      question: "Do I need to create an account to use the tools?",
      answer: "No account is required for most tools. You can use PDF converters, generators, and other utilities without signing up. Accounts are only needed for features like saving your work, accessing premium templates, or using cloud storage."
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely! We prioritize your privacy and security. Most tools process files locally in your browser, and we don't store your personal documents on our servers. For tools that require server processing, files are automatically deleted after processing."
    },
    {
      question: "What file formats do you support?",
      answer: "We support a wide range of formats including PDF, DOCX, XLSX, PPTX, JPG, PNG, GIF, and many others. Each tool specifies its supported formats, and we're constantly adding support for new formats based on user requests."
    },
    {
      question: "Are there any file size limits?",
      answer: "File size limits vary by tool but are generally quite generous. Most tools support files up to 50-100MB. For larger files or bulk processing, consider breaking them into smaller chunks or contact us for enterprise solutions."
    },
    {
      question: "How accurate are the AI-generated results?",
      answer: "Our AI tools use state-of-the-art models and provide high-quality results. However, AI-generated content should always be reviewed and edited as needed. We recommend treating AI output as a starting point and refining it for your specific needs."
    },
    {
      question: "Can I use these tools for commercial purposes?",
      answer: "Yes! Our tools can be used for both personal and commercial purposes. However, you're responsible for ensuring that any content you create complies with relevant laws and doesn't infringe on others' intellectual property rights."
    },
    {
      question: "Do you offer API access or bulk processing?",
      answer: "Currently, our tools are designed for individual use through our web interface. We're working on API access and bulk processing solutions. Contact us at business@smartgentoolshub.com if you have specific enterprise needs."
    },
    {
      question: "How do I report a bug or request a new feature?",
      answer: "We love feedback! You can report bugs or request features by contacting us through our contact form, emailing support@smartgentoolshub.com, or joining our community discussions. We actively review all suggestions."
    },
    {
      question: "Are the tools mobile-friendly?",
      answer: "Yes! All our tools are designed to work seamlessly on mobile devices, tablets, and desktops. The interface automatically adapts to your screen size for the best user experience."
    },
    {
      question: "What browsers do you support?",
      answer: "Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser."
    },
    {
      question: "How often do you add new tools?",
      answer: "We regularly add new tools based on user feedback and emerging needs. Typically, we release 2-3 new tools per month, plus updates and improvements to existing tools. Follow us to stay updated on new releases!"
    },
    {
      question: "Can I suggest new tools or features?",
      answer: "Absolutely! User suggestions are one of our primary sources for new tool ideas. Contact us with your suggestions, and if we implement your idea, we'll give you credit and early access to the new tool."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We provide support through email, our contact form, and comprehensive help documentation. Most support requests are answered within 24 hours during business days."
    },
    {
      question: "Are there any usage limits?",
      answer: "For free users, there are fair usage limits to ensure quality service for everyone. These limits are quite generous for normal use. If you need higher limits, consider our premium plans or contact us for custom solutions."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Frequently Asked Questions - Smart Gen Tools Hub"
        description="Find answers to common questions about Smart Gen Tools Hub's AI-powered tools, features, pricing, and more. Get the help you need quickly."
      />
      
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
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
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to the most common questions about our AI-powered tools and services.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Card key={index}>
              <Collapsible
                open={openItems.includes(index)}
                onOpenChange={() => toggleItem(index)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No matching questions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse all questions above.
            </p>
            <Button 
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Card>
            <CardHeader>
              <CardTitle>Still have questions?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? We're here to help!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  Contact Support
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('mailto:support@smartgentoolshub.com')}
                >
                  Email Us Directly
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
