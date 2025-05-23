
import React, { useState } from 'react';
import { ArrowLeft, FileText, Sparkles, Download, Save, RefreshCw, Lightbulb, Target, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface BusinessPlanData {
  businessName: string;
  industry: string;
  businessType: string;
  targetMarket: string;
  location: string;
  fundingNeeded: string;
  timeline: string;
  experience: string;
  businessDescription: string;
  marketAnalysis: string;
  competitiveAdvantage: string;
  revenue: string;
  marketing: string;
  operations: string;
  financial: string;
  risks: string;
}

interface GeneratedSection {
  title: string;
  content: string;
  isGenerated: boolean;
}

const BusinessPlan = () => {
  const [businessData, setBusinessData] = useState<BusinessPlanData>({
    businessName: '',
    industry: '',
    businessType: '',
    targetMarket: '',
    location: '',
    fundingNeeded: '',
    timeline: '',
    experience: '',
    businessDescription: '',
    marketAnalysis: '',
    competitiveAdvantage: '',
    revenue: '',
    marketing: '',
    operations: '',
    financial: '',
    risks: ''
  });

  const [generatedSections, setGeneratedSections] = useState<GeneratedSection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
    'Food & Beverage', 'Education', 'Real Estate', 'Transportation',
    'Entertainment', 'Consulting', 'E-commerce', 'Other'
  ];

  const businessTypes = [
    'Startup', 'Small Business', 'Franchise', 'Non-Profit',
    'Online Business', 'Service Business', 'Product Business'
  ];

  const fundingOptions = [
    'Under $10,000', '$10,000 - $50,000', '$50,000 - $100,000',
    '$100,000 - $500,000', '$500,000 - $1M', 'Over $1M'
  ];

  const businessPlanSections = [
    {
      key: 'executive',
      title: 'Executive Summary',
      description: 'High-level overview of your business'
    },
    {
      key: 'description',
      title: 'Business Description',
      description: 'Detailed description of your business'
    },
    {
      key: 'market',
      title: 'Market Analysis',
      description: 'Target market and industry analysis'
    },
    {
      key: 'competition',
      title: 'Competitive Analysis',
      description: 'Competitor research and positioning'
    },
    {
      key: 'marketing',
      title: 'Marketing Strategy',
      description: 'Customer acquisition and retention'
    },
    {
      key: 'operations',
      title: 'Operations Plan',
      description: 'Day-to-day business operations'
    },
    {
      key: 'financial',
      title: 'Financial Projections',
      description: 'Revenue, costs, and profitability'
    },
    {
      key: 'funding',
      title: 'Funding Request',
      description: 'Investment needs and use of funds'
    }
  ];

  const generateBusinessPlan = async () => {
    if (!businessData.businessName || !businessData.industry) {
      toast({
        title: "Missing Information",
        description: "Please provide at least business name and industry",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedSections([]);

    // Simulate AI generation with realistic delays
    for (let i = 0; i < businessPlanSections.length; i++) {
      const section = businessPlanSections[i];
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = generateSectionContent(section.key);
      
      setGeneratedSections(prev => [...prev, {
        title: section.title,
        content: generatedContent,
        isGenerated: true
      }]);
    }

    setIsGenerating(false);
    toast({
      title: "Business Plan Generated!",
      description: "Your comprehensive business plan is ready"
    });
  };

  const generateSectionContent = (sectionKey: string): string => {
    const { businessName, industry, targetMarket, fundingNeeded } = businessData;

    const templates = {
      executive: `${businessName} is a ${industry.toLowerCase()} company focused on ${targetMarket || 'serving customers with innovative solutions'}. Our mission is to deliver exceptional value through cutting-edge products and services.

Key Success Factors:
• Strong market demand in the ${industry.toLowerCase()} sector
• Experienced leadership team with proven track record
• Competitive advantage through innovation and customer focus
• Scalable business model with clear path to profitability

Financial Highlights:
• Seeking ${fundingNeeded || 'initial funding'} for business launch and growth
• Projected break-even within 18-24 months
• Expected ROI of 25-35% for investors

We are well-positioned to capture significant market share and deliver strong returns for all stakeholders.`,

      description: `${businessName} operates in the ${industry.toLowerCase()} industry, providing innovative solutions that address key market needs. Our business model focuses on delivering high-quality products and services while maintaining operational efficiency.

Company Overview:
${businessName} was founded to bridge the gap in the ${industry.toLowerCase()} market by offering superior solutions that combine quality, innovation, and value. Our approach is customer-centric, ensuring that every decision is made with our clients' success in mind.

Products and Services:
We offer a comprehensive range of products and services designed to meet the diverse needs of our target market. Our offerings include:
• Core products tailored to market demands
• Value-added services that enhance customer experience
• Ongoing support and maintenance
• Custom solutions for specific client needs

Legal Structure:
The company is structured as a [Limited Liability Company/Corporation] to provide operational flexibility while protecting stakeholder interests.`,

      market: `Market Analysis for ${industry} Industry

Industry Overview:
The ${industry.toLowerCase()} industry has shown consistent growth and presents significant opportunities for new entrants. Market trends indicate increasing demand for innovative solutions and improved customer experiences.

Target Market:
Our primary target market consists of ${targetMarket || 'customers seeking quality solutions in the ' + industry.toLowerCase() + ' sector'}. This demographic represents a substantial market opportunity with the following characteristics:
• Growing demand for quality products and services
• Willingness to pay premium for superior solutions
• Increasing adoption of new technologies and approaches
• Strong preference for companies that deliver consistent value

Market Size:
• Total Addressable Market (TAM): Estimated at $X billion
• Serviceable Addressable Market (SAM): $Y million
• Serviceable Obtainable Market (SOM): $Z million

Market Trends:
• Digital transformation driving industry evolution
• Increased focus on sustainability and efficiency
• Growing importance of customer experience
• Rising demand for personalized solutions`,

      competition: `Competitive Landscape Analysis

Direct Competitors:
Our competitive analysis reveals several key players in the ${industry.toLowerCase()} market. While competition exists, we have identified clear opportunities to differentiate ourselves through superior value proposition.

Competitive Advantages:
• Innovative approach to solving customer problems
• Superior technology and operational efficiency
• Strong customer service and support capabilities
• Flexible business model that adapts to market needs
• Experienced team with deep industry knowledge

Market Positioning:
${businessName} will position itself as the premium provider of ${industry.toLowerCase()} solutions, focusing on quality, innovation, and customer satisfaction. Our unique value proposition includes:
• Best-in-class products and services
• Competitive pricing with superior value
• Exceptional customer experience
• Continuous innovation and improvement

Competitive Strategy:
We will compete through differentiation rather than price competition, focusing on delivering superior value that justifies premium positioning. Our strategy includes:
• Continuous product and service innovation
• Building strong customer relationships
• Developing strategic partnerships
• Investing in brand building and market presence`,

      marketing: `Marketing and Sales Strategy

Marketing Objectives:
• Build brand awareness in target market segments
• Generate qualified leads and convert to customers
• Establish ${businessName} as industry leader
• Achieve customer acquisition and retention goals

Target Customer Segments:
Primary: ${targetMarket || 'Professional customers in the ' + industry.toLowerCase() + ' sector'}
Secondary: Adjacent market segments with similar needs
Tertiary: International markets for future expansion

Marketing Mix:
Product: High-quality solutions tailored to customer needs
Price: Competitive pricing with value-based positioning
Place: Multi-channel distribution strategy
Promotion: Integrated marketing communications approach

Marketing Channels:
• Digital marketing (website, SEO, social media, content marketing)
• Direct sales and business development
• Industry events and trade shows
• Strategic partnerships and referrals
• Public relations and thought leadership

Customer Acquisition Strategy:
• Targeted marketing campaigns to key segments
• Content marketing to establish expertise
• Relationship building and networking
• Referral programs and customer advocacy
• Strategic partnerships for market access`,

      operations: `Operations Plan

Business Location:
${businessData.location || 'Strategic location selected to optimize operations and customer access'}

Operational Structure:
Our operations are designed for efficiency, scalability, and quality delivery. Key operational components include:

Facilities and Equipment:
• Modern facilities optimized for our business needs
• State-of-the-art equipment and technology
• Flexible space allocation for growth
• Safety and compliance systems

Staffing Plan:
• Experienced leadership team
• Skilled operational staff
• Customer service representatives
• Technical and support personnel

Operational Processes:
• Streamlined workflows for efficiency
• Quality control and assurance systems
• Customer service protocols
• Inventory and supply chain management
• Performance monitoring and optimization

Technology Systems:
• Integrated business management software
• Customer relationship management (CRM)
• Financial and accounting systems
• Communication and collaboration tools

Quality Assurance:
• Comprehensive quality control processes
• Regular performance monitoring
• Customer feedback integration
• Continuous improvement initiatives`,

      financial: `Financial Projections and Analysis

Revenue Model:
${businessName} will generate revenue through multiple streams:
• Primary product/service sales
• Recurring revenue from ongoing services
• Additional revenue from complementary offerings

Financial Projections (3-Year):

Year 1:
• Revenue: $XXX,XXX
• Gross Margin: XX%
• Operating Expenses: $XXX,XXX
• Net Income: $XX,XXX

Year 2:
• Revenue: $XXX,XXX (XX% growth)
• Gross Margin: XX%
• Operating Expenses: $XXX,XXX
• Net Income: $XXX,XXX

Year 3:
• Revenue: $X,XXX,XXX (XX% growth)
• Gross Margin: XX%
• Operating Expenses: $XXX,XXX
• Net Income: $XXX,XXX

Key Financial Metrics:
• Break-even point: Month XX
• Customer acquisition cost: $XXX
• Customer lifetime value: $X,XXX
• Monthly recurring revenue: $XX,XXX

Assumptions:
• Market growth rate: X% annually
• Customer retention rate: XX%
• Average selling price: $XXX
• Cost of goods sold: XX% of revenue`,

      funding: `Funding Request and Use of Funds

Funding Requirements:
${businessName} is seeking ${fundingNeeded || 'initial investment'} to launch operations and achieve sustainable growth. This funding will enable us to:
• Establish operations and build initial infrastructure
• Develop and launch products/services
• Build customer base and market presence
• Achieve profitability and sustainable growth

Use of Funds:
• Product Development: 30%
• Marketing and Sales: 25%
• Operations and Infrastructure: 20%
• Working Capital: 15%
• Legal and Professional Services: 5%
• Contingency: 5%

Investment Opportunity:
This represents an exceptional investment opportunity in the growing ${industry.toLowerCase()} market. Key investment highlights include:
• Large and growing market opportunity
• Experienced management team
• Clear competitive advantages
• Scalable business model
• Strong financial projections

Return on Investment:
Investors can expect attractive returns through:
• Capital appreciation as business grows
• Potential dividend distributions
• Exit opportunities through acquisition or IPO

Timeline:
• Funding completion: Within 60 days
• Product/service launch: Within 6 months
• Break-even achievement: 18-24 months
• Exit opportunity: 3-5 years`
    };

    return templates[sectionKey as keyof typeof templates] || `Content for ${sectionKey} section will be generated based on your business information.`;
  };

  const exportBusinessPlan = () => {
    const planContent = generatedSections.map(section => 
      `## ${section.title}\n\n${section.content}\n\n`
    ).join('');

    const fullPlan = `# ${businessData.businessName} Business Plan\n\n${planContent}`;
    
    const blob = new Blob([fullPlan], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessData.businessName.replace(/\s+/g, '-').toLowerCase()}-business-plan.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Business Plan Exported",
      description: "Your business plan has been downloaded as a Markdown file"
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">AI-based Business Plan Generator</h1>
        <p className="text-muted-foreground mt-2">Create comprehensive business plans with AI assistance</p>
      </div>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Business Setup</TabsTrigger>
          <TabsTrigger value="generate">Generate Plan</TabsTrigger>
          <TabsTrigger value="result">Business Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Provide details about your business to generate a comprehensive plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input
                    id="business-name"
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select 
                    value={businessData.industry} 
                    onValueChange={(value) => setBusinessData(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select 
                    value={businessData.businessType} 
                    onValueChange={(value) => setBusinessData(prev => ({ ...prev, businessType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="funding">Funding Needed</Label>
                  <Select 
                    value={businessData.fundingNeeded} 
                    onValueChange={(value) => setBusinessData(prev => ({ ...prev, fundingNeeded: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding range" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Business Location</Label>
                  <Input
                    id="location"
                    value={businessData.location}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State/Country"
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Launch Timeline</Label>
                  <Input
                    id="timeline"
                    value={businessData.timeline}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g., 6 months"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="target-market">Target Market</Label>
                <Textarea
                  id="target-market"
                  value={businessData.targetMarket}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, targetMarket: e.target.value }))}
                  placeholder="Describe your target customers and market"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="business-description">Business Description</Label>
                <Textarea
                  id="business-description"
                  value={businessData.businessDescription}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, businessDescription: e.target.value }))}
                  placeholder="Describe what your business does and how it creates value"
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="experience">Your Experience</Label>
                <Textarea
                  id="experience"
                  value={businessData.experience}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Describe your relevant experience and qualifications"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Your Business Plan</CardTitle>
              <CardDescription>
                AI will create a comprehensive business plan based on your information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {businessPlanSections.map((section, index) => (
                  <Card key={section.key} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          generatedSections.length > index ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{section.title}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{section.description}</p>
                      {generatedSections.length > index && (
                        <Badge variant="secondary" className="mt-2">
                          Generated
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  onClick={generateBusinessPlan} 
                  disabled={isGenerating || !businessData.businessName || !businessData.industry}
                  size="lg"
                  className="px-8"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Generating Business Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Business Plan
                    </>
                  )}
                </Button>
              </div>

              {isGenerating && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-6 w-6 animate-spin text-primary mr-3" />
                        <span className="font-medium">Generating your business plan...</span>
                      </div>
                      <p className="text-center text-muted-foreground">
                        AI is analyzing your business information and creating comprehensive sections
                      </p>
                      <div className="text-center">
                        <Badge variant="outline">
                          {generatedSections.length} of {businessPlanSections.length} sections completed
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="space-y-6">
          {generatedSections.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{businessData.businessName} Business Plan</h2>
                  <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={exportBusinessPlan} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Plan
                  </Button>
                  <Button onClick={generateBusinessPlan}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {generatedSections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {index === 0 && <Target className="h-5 w-5" />}
                        {index === 1 && <Lightbulb className="h-5 w-5" />}
                        {index === 6 && <DollarSign className="h-5 w-5" />}
                        {![0, 1, 6].includes(index) && <FileText className="h-5 w-5" />}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Business Plan Generated</h3>
                <p className="text-muted-foreground mb-4">
                  Complete the business setup and generate your plan to see it here
                </p>
                <Button onClick={() => document.querySelector('[value="setup"]')?.click()}>
                  Start Business Setup
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessPlan;
