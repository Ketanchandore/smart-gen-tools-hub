
import React, { useState } from 'react';
import { MessageCircle, ArrowLeft, RefreshCw, Copy, Download, Star, Users, Target, Briefcase, Heart, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface GeneratedTestimonial {
  text: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  type: string;
  persona: string;
}

const TestimonialGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productName, setProductName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [keyBenefits, setKeyBenefits] = useState('');
  const [targetAudience, setTargetAudience] = useState('professionals');
  const [testimonialType, setTestimonialType] = useState('general');
  const [tone, setTone] = useState('professional');
  const [industryFocus, setIndustryFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<GeneratedTestimonial[]>([]);

  const businessTypes = [
    { value: 'saas', label: 'SaaS/Software' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'food', label: 'Food & Restaurant' },
    { value: 'beauty', label: 'Beauty & Cosmetics' },
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing Agency' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'other', label: 'Other' }
  ];

  const testimonialTypes = [
    { value: 'general', label: 'General Review' },
    { value: 'results', label: 'Results-Focused' },
    { value: 'experience', label: 'Experience-Based' },
    { value: 'comparison', label: 'Comparison to Competitors' },
    { value: 'transformation', label: 'Before/After Transformation' },
    { value: 'support', label: 'Customer Support' },
    { value: 'feature', label: 'Specific Feature' },
    { value: 'roi', label: 'ROI/Value for Money' },
    { value: 'ease-of-use', label: 'Ease of Use' },
    { value: 'recommendation', label: 'Strong Recommendation' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'detailed', label: 'Detailed & Analytical' },
    { value: 'emotional', label: 'Emotional' },
    { value: 'concise', label: 'Short & Concise' },
    { value: 'storytelling', label: 'Story-driven' },
    { value: 'technical', label: 'Technical' }
  ];

  const audiences = [
    { value: 'professionals', label: 'Business Professionals' },
    { value: 'entrepreneurs', label: 'Entrepreneurs' },
    { value: 'small-business', label: 'Small Business Owners' },
    { value: 'enterprise', label: 'Enterprise/Corporate' },
    { value: 'consumers', label: 'General Consumers' },
    { value: 'students', label: 'Students' },
    { value: 'freelancers', label: 'Freelancers' },
    { value: 'agencies', label: 'Agencies' },
    { value: 'nonprofits', label: 'Non-profits' },
    { value: 'healthcare', label: 'Healthcare Professionals' }
  ];

  const personaTemplates = {
    'ceo': ['CEO', 'Founder', 'President', 'Managing Director'],
    'manager': ['Marketing Manager', 'Operations Manager', 'Project Manager', 'Sales Manager'],
    'specialist': ['Digital Marketing Specialist', 'HR Specialist', 'IT Specialist', 'Business Analyst'],
    'consultant': ['Business Consultant', 'Strategy Consultant', 'Management Consultant'],
    'entrepreneur': ['Startup Founder', 'Business Owner', 'Entrepreneur'],
    'freelancer': ['Freelance Designer', 'Independent Consultant', 'Content Creator'],
    'student': ['Graduate Student', 'MBA Student', 'Business Student'],
    'consumer': ['Satisfied Customer', 'Long-time User', 'Regular Customer']
  };

  const companyNames = [
    'TechFlow Solutions', 'InnovateHub', 'GrowthMetrics Inc.', 'StreamlineWorks',
    'NextGen Dynamics', 'ProActive Systems', 'Velocity Partners', 'OptiMax Corp',
    'BrightPath Consulting', 'ElevateBase', 'CoreVantage', 'PulseDrive LLC',
    'AgileCore Solutions', 'QuantumLeap Co.', 'PrimeEdge Ventures'
  ];

  const generateTestimonial = (
    productName: string,
    businessType: string,
    type: string,
    tone: string,
    benefits: string[],
    persona: string
  ): string => {
    const templates = {
      general: {
        professional: [
          `"${productName} has significantly improved our workflow efficiency. The platform is intuitive and delivers exactly what was promised. I highly recommend it to anyone looking for a reliable solution."`,
          `"We've been using ${productName} for several months now, and it has exceeded our expectations. The features are comprehensive and the support team is outstanding."`,
          `"${productName} is exactly what our team needed. It's user-friendly, powerful, and has helped us achieve our goals faster than we anticipated."`
        ],
        enthusiastic: [
          `"Absolutely love ${productName}! It's been a game-changer for our business. Can't imagine working without it now!"`,
          `"${productName} is incredible! The results speak for themselves - we've seen amazing improvements since we started using it."`,
          `"WOW! ${productName} blew us away. This is hands down the best investment we've made for our business this year!"`
        ],
        casual: [
          `"${productName} is pretty awesome. Really easy to use and gets the job done. Definitely worth checking out!"`,
          `"Been using ${productName} for a while now and it's solid. Great features and the team behind it really knows what they're doing."`,
          `"${productName} makes everything so much easier. Simple, effective, and reliable. What more could you ask for?"`
        ]
      },
      results: {
        professional: [
          `"Since implementing ${productName}, we've seen a ${Math.floor(Math.random() * 50 + 25)}% increase in ${benefits[0] || 'efficiency'}. The ROI has been substantial and the impact on our operations is measurable."`,
          `"${productName} delivered quantifiable results within the first month. We've improved our ${benefits[0] || 'productivity'} by ${Math.floor(Math.random() * 40 + 20)}% and reduced operational costs significantly."`,
          `"The metrics don't lie - ${productName} has transformed our performance. We've achieved a ${Math.floor(Math.random() * 60 + 30)}% improvement in ${benefits[0] || 'key metrics'} since adoption."`
        ],
        enthusiastic: [
          `"The results with ${productName} have been AMAZING! We've boosted our ${benefits[0] || 'performance'} by ${Math.floor(Math.random() * 70 + 30)}% - I couldn't be happier!"`,
          `"Mind-blowing results! ${productName} helped us achieve ${Math.floor(Math.random() * 50 + 25)}% growth in ${benefits[0] || 'our key areas'}. This tool is pure gold!"`,
          `"INCREDIBLE! We've seen ${Math.floor(Math.random() * 80 + 40)}% improvement in ${benefits[0] || 'efficiency'} thanks to ${productName}. Best decision ever!"`
        ]
      },
      transformation: {
        professional: [
          `"Before ${productName}, we struggled with ${benefits[0] || 'inefficient processes'}. Now, our operations run smoothly and our team is more productive than ever. The transformation has been remarkable."`,
          `"${productName} completely changed how we approach ${benefits[0] || 'our work'}. What used to take hours now takes minutes. The before and after difference is night and day."`,
          `"The transformation since implementing ${productName} has been extraordinary. We went from struggling with ${benefits[0] || 'daily challenges'} to having a streamlined, efficient system."`
        ],
        storytelling: [
          `"Six months ago, our team was drowning in ${benefits[0] || 'manual processes'}. Then we discovered ${productName}. Today, we're not just surviving - we're thriving. The journey from chaos to clarity has been incredible."`,
          `"I remember the frustration we felt before ${productName}. Everything seemed to take forever, and ${benefits[0] || 'productivity'} was at an all-time low. Fast forward to today - we're operating at peak efficiency. It's like we're a completely different company."`,
          `"Our story with ${productName} started with skepticism. Could one solution really solve our ${benefits[0] || 'complex challenges'}? The answer was a resounding yes. We've been transformed from the inside out."`
        ]
      },
      comparison: {
        professional: [
          `"We evaluated several solutions before choosing ${productName}. The difference in quality, features, and support is significant. ${productName} stands out as the clear leader in the market."`,
          `"After trying multiple alternatives, ${productName} proved to be superior in every aspect. The functionality, ease of use, and customer service are unmatched."`,
          `"We switched to ${productName} from our previous solution and immediately noticed the difference. It's more intuitive, powerful, and reliable than anything else we've used."`
        ]
      },
      support: {
        professional: [
          `"The customer support team at ${productName} is exceptional. They're responsive, knowledgeable, and genuinely care about our success. It's rare to find this level of service."`,
          `"What sets ${productName} apart is their outstanding support. Every interaction with their team has been positive, and they go above and beyond to help us succeed."`,
          `"The support experience with ${productName} has been phenomenal. Quick response times, expert knowledge, and a genuine commitment to customer satisfaction."`
        ],
        enthusiastic: [
          `"The support team at ${productName} is AMAZING! They respond lightning fast and always have the perfect solution. Customer service at its finest!"`,
          `"I'm blown away by the support quality! The ${productName} team treats us like family and always goes the extra mile. Absolutely fantastic!"`,
          `"Best customer support ever! The ${productName} team is always there when we need them. They're knowledgeable, friendly, and incredibly helpful!"`
        ]
      }
    };

    const typeTemplates = templates[type as keyof typeof templates] || templates.general;
    const toneTemplates = typeTemplates[tone as keyof typeof typeTemplates] || typeTemplates.professional;
    
    return toneTemplates[Math.floor(Math.random() * toneTemplates.length)];
  };

  const generatePersona = (audience: string): { name: string; title: string; company: string } => {
    const firstNames = [
      'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'James', 'Ashley', 'Christopher',
      'Amanda', 'Matthew', 'Jennifer', 'Andrew', 'Lisa', 'Joshua', 'Michelle', 'Daniel',
      'Stephanie', 'Robert', 'Laura', 'Ryan', 'Nicole', 'Kevin', 'Rachel', 'Mark'
    ];
    
    const lastNames = [
      'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
      'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
      'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White'
    ];

    const getPersonaCategory = (audience: string): string => {
      const mapping: Record<string, string> = {
        'professionals': 'manager',
        'entrepreneurs': 'entrepreneur',
        'small-business': 'entrepreneur',
        'enterprise': 'ceo',
        'consumers': 'consumer',
        'students': 'student',
        'freelancers': 'freelancer',
        'agencies': 'manager',
        'nonprofits': 'manager',
        'healthcare': 'specialist'
      };
      return mapping[audience] || 'manager';
    };

    const personaCategory = getPersonaCategory(audience);
    const titles = personaTemplates[personaCategory as keyof typeof personaTemplates];
    
    return {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      company: companyNames[Math.floor(Math.random() * companyNames.length)]
    };
  };

  const handleGenerate = async () => {
    if (!productName.trim()) {
      toast({
        title: "Product Name Required",
        description: "Please enter your product or service name to generate testimonials",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const benefits = keyBenefits.split(',').map(b => b.trim()).filter(Boolean);
      const generatedTestimonials: GeneratedTestimonial[] = [];

      // Generate different types of testimonials
      const types = [testimonialType];
      if (testimonialType === 'general') {
        types.push('results', 'experience', 'support');
      }

      for (let i = 0; i < 15; i++) {
        const currentType = types[Math.floor(Math.random() * types.length)];
        const currentTone = i < 5 ? tone : tones[Math.floor(Math.random() * tones.length)].value;
        const persona = generatePersona(targetAudience);
        
        const testimonial = generateTestimonial(
          productName,
          businessType,
          currentType,
          currentTone,
          benefits,
          persona.title
        );

        generatedTestimonials.push({
          text: testimonial,
          author: persona.name,
          title: persona.title,
          company: persona.company,
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
          type: currentType,
          persona: targetAudience
        });
      }

      setTestimonials(generatedTestimonials);

      toast({
        title: "Success!",
        description: "Testimonials generated successfully",
      });
    } catch (error) {
      console.error('Error generating testimonials:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate testimonials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (testimonial: GeneratedTestimonial) => {
    const text = `${testimonial.text}\n\n— ${testimonial.author}\n${testimonial.title}, ${testimonial.company}\n${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Testimonial copied to clipboard",
    });
  };

  const downloadTestimonials = () => {
    const content = testimonials.map((testimonial, index) => 
      `${index + 1}. ${testimonial.text}\n\n— ${testimonial.author}\n${testimonial.title}, ${testimonial.company}\nRating: ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}\nType: ${testimonial.type}\n\n${'='.repeat(50)}\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${productName.replace(/\s+/g, '-').toLowerCase()}-testimonials.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'general': 'bg-blue-100 text-blue-800',
      'results': 'bg-green-100 text-green-800',
      'experience': 'bg-purple-100 text-purple-800',
      'comparison': 'bg-orange-100 text-orange-800',
      'transformation': 'bg-pink-100 text-pink-800',
      'support': 'bg-cyan-100 text-cyan-800',
      'feature': 'bg-indigo-100 text-indigo-800',
      'roi': 'bg-emerald-100 text-emerald-800',
      'ease-of-use': 'bg-yellow-100 text-yellow-800',
      'recommendation': 'bg-red-100 text-red-800'
    };
    return colors[type] || colors.general;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
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
          <MessageCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Testimonial Generator</h1>
        <p className="text-muted-foreground mt-2">Create persuasive testimonials for your products or services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="productName">Product/Service Name *</Label>
                <Input
                  id="productName"
                  placeholder="Enter your product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productDescription">Product Description (Optional)</Label>
                <Textarea
                  id="productDescription"
                  placeholder="Brief description of your product/service..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="keyBenefits">Key Benefits (comma-separated)</Label>
                <Input
                  id="keyBenefits"
                  placeholder="efficiency, cost savings, productivity..."
                  value={keyBenefits}
                  onChange={(e) => setKeyBenefits(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="testimonialType">Testimonial Focus</Label>
                <Select value={testimonialType} onValueChange={setTestimonialType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {testimonialTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tone">Tone & Style</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map(tone => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map(audience => (
                      <SelectItem key={audience.value} value={audience.value}>
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerate} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Generate Testimonials
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          {testimonials.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Generated Testimonials</h2>
                  <p className="text-muted-foreground">Click to copy any testimonial</p>
                </div>
                <Button onClick={downloadTestimonials} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => copyToClipboard(testimonial)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getTypeColor(testimonial.type)}`}
                            >
                              {testimonial.type}
                            </Badge>
                            {renderStars(testimonial.rating)}
                          </div>
                          <p className="text-sm font-medium leading-relaxed mb-4">
                            {testimonial.text}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm">{testimonial.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {testimonial.title}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button onClick={handleGenerate} variant="outline" disabled={loading}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate More
                </Button>
              </div>
            </div>
          ) : (
            <Card className="border-2 border-dashed border-muted-foreground/20">
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Testimonials Generated Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Enter your product details and click "Generate Testimonials" to create persuasive customer testimonials!
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Multiple Personas
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Various Tones
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Star Ratings
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Results-Focused
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialGenerator;
