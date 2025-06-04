
import React, { useState } from 'react';
import { Quote, ArrowLeft, RefreshCw, Copy, Download, Lightbulb, Target, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface GeneratedTagline {
  text: string;
  type: 'tagline' | 'slogan';
  category: string;
}

const TaglineGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [targetAudience, setTargetAudience] = useState('general');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [taglines, setTaglines] = useState<GeneratedTagline[]>([]);

  const businessTypes = [
    { value: 'technology', label: 'Technology' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'food', label: 'Food & Restaurant' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'creative', label: 'Creative & Design' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'other', label: 'Other' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'creative', label: 'Creative' },
    { value: 'bold', label: 'Bold' },
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'modern', label: 'Modern' },
    { value: 'trustworthy', label: 'Trustworthy' },
    { value: 'innovative', label: 'Innovative' }
  ];

  const audiences = [
    { value: 'general', label: 'General Public' },
    { value: 'professionals', label: 'Business Professionals' },
    { value: 'millennials', label: 'Millennials' },
    { value: 'gen-z', label: 'Gen Z' },
    { value: 'families', label: 'Families' },
    { value: 'entrepreneurs', label: 'Entrepreneurs' },
    { value: 'students', label: 'Students' },
    { value: 'seniors', label: 'Seniors' },
    { value: 'luxury', label: 'Luxury Market' },
    { value: 'budget', label: 'Budget-Conscious' }
  ];

  const generateTaglines = (type: 'tagline' | 'slogan', businessName: string, businessType: string, tone: string, audience: string, keywords: string[]): string[] => {
    const templates = {
      tagline: {
        professional: [
          `${businessName}: Excellence in Every {keyword}`,
          `Where {keyword} Meets Innovation`,
          `Your Trusted Partner in {keyword}`,
          `Leading the Way in {keyword}`,
          `${businessName}: Setting New Standards`,
          `Quality {keyword}, Exceptional Service`,
          `Experience the Difference with ${businessName}`,
          `${businessName}: Your Success, Our Mission`
        ],
        friendly: [
          `${businessName}: Making {keyword} Simple`,
          `Your Friendly Neighborhood {keyword} Experts`,
          `${businessName}: We're Here to Help`,
          `Making {keyword} Easy for Everyone`,
          `${businessName}: Where Friends Meet Quality`,
          `Your {keyword} Journey Starts Here`,
          `${businessName}: Bringing People Together`,
          `Simple Solutions, Friendly Service`
        ],
        creative: [
          `${businessName}: Where Ideas Come to Life`,
          `Unleash Your {keyword} Potential`,
          `${businessName}: Creativity Without Limits`,
          `Think Different, Think ${businessName}`,
          `Where {keyword} Meets Imagination`,
          `${businessName}: Inspiring Innovation`,
          `Create, Connect, Conquer`,
          `Your Vision, Our Creativity`
        ],
        bold: [
          `${businessName}: Dare to Be Different`,
          `Break the Rules with ${businessName}`,
          `${businessName}: Fearless {keyword}`,
          `Bold Moves, Better Results`,
          `${businessName}: Disrupting the {keyword} Game`,
          `Take Charge with ${businessName}`,
          `${businessName}: No Limits, No Excuses`,
          `Power Your {keyword} Revolution`
        ],
        inspiring: [
          `${businessName}: Believe in Possibilities`,
          `Transform Your {keyword} Dreams`,
          `${businessName}: Where Dreams Take Flight`,
          `Inspire. Achieve. Repeat.`,
          `${businessName}: Empowering Your Journey`,
          `Rise Above with ${businessName}`,
          `${businessName}: Your Success Story Begins`,
          `Unlock Your {keyword} Potential`
        ]
      },
      slogan: {
        professional: [
          `${businessName} - Quality You Can Trust`,
          `Excellence in Action`,
          `Your Success, Our Commitment`,
          `Leading Through Innovation`,
          `Where Expertise Meets Excellence`,
          `${businessName} - Professionals Choice`,
          `Setting Industry Standards`,
          `Your Partner in Progress`
        ],
        friendly: [
          `${businessName} - Always Here for You`,
          `Making Life Easier, One Step at a Time`,
          `Your Friendly Solution`,
          `We Care, We Deliver`,
          `${businessName} - Like Family`,
          `Simple. Easy. Friendly.`,
          `Welcome to the Family`,
          `We're in This Together`
        ],
        creative: [
          `${businessName} - Think Outside the Box`,
          `Where Creativity Lives`,
          `Imagine. Create. Inspire.`,
          `Art Meets Innovation`,
          `${businessName} - Unleash Your Inner Artist`,
          `Color Outside the Lines`,
          `Where Ideas Become Reality`,
          `Creative Minds, Amazing Results`
        ],
        bold: [
          `${businessName} - Bold by Design`,
          `Fearless. Fierce. Phenomenal.`,
          `Break Boundaries`,
          `Dare to Lead`,
          `${businessName} - Unstoppable Force`,
          `Challenge Everything`,
          `Bold Moves, Big Results`,
          `Power Through Possibility`
        ],
        inspiring: [
          `${businessName} - Inspire Greatness`,
          `Dream Big, Achieve Bigger`,
          `Your Potential Unleashed`,
          `Rise Above the Rest`,
          `${businessName} - Believe in You`,
          `Where Dreams Take Flight`,
          `Inspire. Empower. Excel.`,
          `Your Journey to Greatness Starts Here`
        ]
      }
    };

    const selectedTemplates = templates[type][tone as keyof typeof templates.tagline] || templates[type].professional;
    const keywordList = keywords.length > 0 ? keywords : ['business', 'service', 'solution', 'experience'];
    
    return selectedTemplates.map(template => {
      const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
      return template.replace(/{keyword}/g, randomKeyword);
    });
  };

  const generateIndustrySpecificTaglines = (businessType: string, businessName: string, tone: string): string[] => {
    const industryTemplates: Record<string, string[]> = {
      technology: [
        `${businessName}: Innovation at Your Fingertips`,
        `Code the Future with ${businessName}`,
        `Where Technology Meets Humanity`,
        `${businessName}: Powering Digital Dreams`,
        `Next-Gen Solutions, Today`
      ],
      healthcare: [
        `${businessName}: Caring Beyond Medicine`,
        `Your Health, Our Priority`,
        `Healing with Heart and Science`,
        `${businessName}: Where Wellness Begins`,
        `Compassionate Care, Advanced Solutions`
      ],
      education: [
        `${businessName}: Learning Without Limits`,
        `Educate. Inspire. Transform.`,
        `Where Knowledge Comes Alive`,
        `${businessName}: Shaping Tomorrow's Leaders`,
        `Education That Empowers`
      ],
      finance: [
        `${businessName}: Your Financial Future Secured`,
        `Where Money Meets Wisdom`,
        `Building Wealth, Building Trust`,
        `${businessName}: Financial Freedom Starts Here`,
        `Smart Money, Smarter Choices`
      ],
      food: [
        `${businessName}: Taste the Difference`,
        `Where Flavor Meets Passion`,
        `Fresh Ingredients, Fresh Ideas`,
        `${businessName}: Feeding Your Soul`,
        `Every Bite Tells a Story`
      ]
    };

    return industryTemplates[businessType] || [];
  };

  const handleGenerate = async () => {
    if (!businessName.trim()) {
      toast({
        title: "Business Name Required",
        description: "Please enter your business name to generate taglines",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
      const generatedTaglines: GeneratedTagline[] = [];

      // Generate regular taglines
      const regularTaglines = generateTaglines('tagline', businessName, businessType, tone, targetAudience, keywordList);
      regularTaglines.forEach(tagline => {
        generatedTaglines.push({
          text: tagline,
          type: 'tagline',
          category: 'general'
        });
      });

      // Generate slogans
      const regularSlogans = generateTaglines('slogan', businessName, businessType, tone, targetAudience, keywordList);
      regularSlogans.forEach(slogan => {
        generatedTaglines.push({
          text: slogan,
          type: 'slogan',
          category: 'general'
        });
      });

      // Generate industry-specific taglines if business type is selected
      if (businessType) {
        const industryTaglines = generateIndustrySpecificTaglines(businessType, businessName, tone);
        industryTaglines.forEach(tagline => {
          generatedTaglines.push({
            text: tagline,
            type: 'tagline',
            category: 'industry-specific'
          });
        });
      }

      // Shuffle and limit results
      const shuffled = generatedTaglines.sort(() => Math.random() - 0.5);
      setTaglines(shuffled.slice(0, 20));

      toast({
        title: "Success!",
        description: "Taglines and slogans generated successfully",
      });
    } catch (error) {
      console.error('Error generating taglines:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate taglines. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Tagline copied to clipboard",
    });
  };

  const downloadTaglines = () => {
    const content = taglines.map((item, index) => 
      `${index + 1}. ${item.text} (${item.type})`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessName.replace(/\s+/g, '-').toLowerCase()}-taglines.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'industry-specific':
        return <Briefcase className="h-3 w-3" />;
      default:
        return <Lightbulb className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'industry-specific':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
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
          <Quote className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Tagline + Slogan Generator</h1>
        <p className="text-muted-foreground mt-2">Create catchy taglines and memorable slogans for your brand</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
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
                <Label htmlFor="description">Business Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what your business does..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
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
                <Label htmlFor="audience">Target Audience</Label>
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

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="quality, innovation, trust..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
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
                    <Quote className="mr-2 h-4 w-4" />
                    Generate Taglines
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          {taglines.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Generated Taglines & Slogans</h2>
                  <p className="text-muted-foreground">Click to copy any tagline or slogan</p>
                </div>
                <Button onClick={downloadTaglines} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {taglines.map((item, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => copyToClipboard(item.text)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={item.type === 'tagline' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {item.type}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getCategoryColor(item.category)}`}
                          >
                            {getCategoryIcon(item.category)}
                            {item.category === 'industry-specific' ? 'Industry' : 'General'}
                          </Badge>
                        </div>
                        <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                      <p className="text-sm font-medium leading-relaxed">
                        "{item.text}"
                      </p>
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
                  <Quote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Taglines Generated Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Enter your business details and click "Generate Taglines" to create catchy taglines and slogans!
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Multiple Audiences
                    </div>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Creative Options
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Industry Specific
                    </div>
                    <div className="flex items-center gap-2">
                      <Quote className="h-4 w-4" />
                      Multiple Styles
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

export default TaglineGenerator;
