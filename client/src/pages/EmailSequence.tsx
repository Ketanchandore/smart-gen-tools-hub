
import React, { useState } from 'react';
import { ArrowLeft, MailPlus, Download, Copy, Users, Target, Calendar, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface EmailTemplate {
  subject: string;
  content: string;
  day: number;
  purpose: string;
}

const EmailSequence = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sequenceType, setSequenceType] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [productName, setProductName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [tone, setTone] = useState('');
  const [sequenceLength, setSequenceLength] = useState([5]);
  const [emailInterval, setEmailInterval] = useState([2]);
  const [generatedSequence, setGeneratedSequence] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  const sequenceTypes = [
    { value: 'welcome', label: 'Welcome Series' },
    { value: 'nurturing', label: 'Lead Nurturing' },
    { value: 'sales', label: 'Sales Funnel' },
    { value: 'onboarding', label: 'Customer Onboarding' },
    { value: 'reengagement', label: 'Re-engagement Campaign' },
    { value: 'abandoned-cart', label: 'Abandoned Cart Recovery' },
    { value: 'upsell', label: 'Upsell/Cross-sell' },
    { value: 'retention', label: 'Customer Retention' }
  ];

  const businessTypes = [
    'E-commerce', 'SaaS', 'Consulting', 'Education', 'Health & Fitness',
    'Real Estate', 'Finance', 'Technology', 'Food & Beverage', 'Fashion',
    'Travel', 'B2B Services', 'Non-profit', 'Entertainment', 'Other'
  ];

  const tones = [
    'Professional', 'Friendly', 'Casual', 'Authoritative', 'Conversational',
    'Urgent', 'Inspiring', 'Educational', 'Humorous', 'Empathetic'
  ];

  const generateEmailSequence = () => {
    if (!sequenceType || !businessType || !targetAudience || !productName || !companyName || !mainGoal || !tone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate your email sequence.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const templates = generateTemplates();
      setGeneratedSequence(templates);
      setLoading(false);
      
      toast({
        title: "Email Sequence Generated!",
        description: `Successfully created a ${sequenceLength[0]}-email sequence for your ${sequenceType} campaign.`,
      });
    }, 2000);
  };

  const generateTemplates = (): EmailTemplate[] => {
    const templates: EmailTemplate[] = [];
    const length = sequenceLength[0];
    
    for (let i = 0; i < length; i++) {
      const day = (i * emailInterval[0]) + 1;
      let template: EmailTemplate;
      
      switch (sequenceType) {
        case 'welcome':
          template = generateWelcomeEmail(i, day, length);
          break;
        case 'sales':
          template = generateSalesEmail(i, day, length);
          break;
        case 'nurturing':
          template = generateNurturingEmail(i, day, length);
          break;
        case 'onboarding':
          template = generateOnboardingEmail(i, day, length);
          break;
        case 'abandoned-cart':
          template = generateAbandonedCartEmail(i, day, length);
          break;
        default:
          template = generateGenericEmail(i, day, length);
      }
      
      templates.push(template);
    }
    
    return templates;
  };

  const generateWelcomeEmail = (index: number, day: number, total: number): EmailTemplate => {
    const subjects = [
      `Welcome to ${companyName}! 🎉`,
      `Your journey with ${productName} starts here`,
      `Here's what you can expect from ${companyName}`,
      `Let's get you started with ${productName}`,
      `Welcome aboard! Here are your next steps`
    ];

    const purposes = [
      'Welcome & Introduction',
      'Set Expectations',
      'Provide Value',
      'Guide Next Steps',
      'Build Relationship'
    ];

    const content = `Dear [First Name],

Welcome to the ${companyName} family! We're thrilled to have you join our community of ${targetAudience}.

${index === 0 ? 
  `You've made an excellent choice with ${productName}. Over the next few days, I'll be sharing valuable insights and tips to help you get the most out of your experience.` :
  index === 1 ?
  `Yesterday, I welcomed you to ${companyName}. Today, I want to share what you can expect from us and how we can help you achieve your goals.` :
  `You're now ${Math.round((index / total) * 100)}% through our welcome series! Let's dive into some valuable content that will help you succeed.`
}

Here's what's in store for you:
• Exclusive tips and strategies
• Step-by-step guides
• Community access
• Priority support

${mainGoal ? `Our main goal is to help you: ${mainGoal}` : ''}

Best regards,
The ${companyName} Team

P.S. Feel free to reply to this email with any questions. We're here to help!`;

    return {
      subject: subjects[index % subjects.length],
      content,
      day,
      purpose: purposes[index % purposes.length]
    };
  };

  const generateSalesEmail = (index: number, day: number, total: number): EmailTemplate => {
    const subjects = [
      `Transform your ${businessType.toLowerCase()} with ${productName}`,
      `[Limited Time] Special offer for ${productName}`,
      `Don't miss out: ${productName} can change everything`,
      `Last chance: Your ${productName} opportunity`,
      `Final call: ${productName} waiting for you`
    ];

    const purposes = [
      'Introduce Problem',
      'Present Solution',
      'Social Proof',
      'Create Urgency',
      'Final Call to Action'
    ];

    const content = `Hi [First Name],

${index === 0 ? 
  `I noticed you're interested in improving your ${businessType.toLowerCase()} results. You're not alone - many ${targetAudience} face similar challenges.` :
  index === total - 1 ?
  `This is my final email about ${productName}. I don't want you to miss this opportunity to transform your ${businessType.toLowerCase()}.` :
  `Following up on my previous email about ${productName}...`
}

${index < 2 ? 
  `The biggest challenge most ${targetAudience} face is: ${mainGoal || 'achieving their goals efficiently'}.

That's exactly why we created ${productName}.` :
  `Hundreds of ${targetAudience} have already transformed their ${businessType.toLowerCase()} with ${productName}.`
}

Here's what makes ${productName} different:
• Proven results for ${targetAudience}
• Easy implementation
• Expert support included
• ${tone.toLowerCase()} approach that works

${index >= total - 2 ? 
  `⏰ Limited time offer ends soon!` : 
  `Want to learn more?`
}

[Call to Action Button]

Questions? Just reply to this email.

Best,
${companyName} Team`;

    return {
      subject: subjects[index % subjects.length],
      content,
      day,
      purpose: purposes[index % purposes.length]
    };
  };

  const generateNurturingEmail = (index: number, day: number, total: number): EmailTemplate => {
    const subjects = [
      `Valuable insights for ${targetAudience}`,
      `Free resource: ${businessType} success guide`,
      `Case study: How [Customer] achieved success`,
      `Common mistakes ${targetAudience} make`,
      `Your ${businessType} success roadmap`
    ];

    const purposes = [
      'Provide Value',
      'Share Resources',
      'Build Trust',
      'Educate',
      'Guide Progress'
    ];

    const content = `Hello [First Name],

I hope this email finds you well! As someone interested in ${businessType.toLowerCase()} success, I wanted to share something valuable with you.

${index === 0 ? 
  `Today, I'm sharing our top 3 strategies that successful ${targetAudience} use to achieve their goals.` :
  index === 1 ?
  `I've attached a free resource that has helped thousands of ${targetAudience} like yourself.` :
  `Here's a real case study from one of our successful clients...`
}

Key insights for ${targetAudience}:
1. Focus on ${mainGoal || 'your primary objectives'}
2. Implement proven systems
3. Measure and optimize results
4. Stay consistent with your efforts

${index < total - 1 ? 
  `I'll be sharing more valuable content in the coming days.` :
  `You've received tremendous value over the past ${total * emailInterval[0]} days. Ready to take the next step?`
}

Resource of the day: [Valuable Link/Download]

Keep growing,
${companyName} Team

P.S. What's your biggest challenge right now? Hit reply and let me know!`;

    return {
      subject: subjects[index % subjects.length],
      content,
      day,
      purpose: purposes[index % purposes.length]
    };
  };

  const generateOnboardingEmail = (index: number, day: number, total: number): EmailTemplate => {
    const subjects = [
      `Day ${day}: Getting started with ${productName}`,
      `Your ${productName} quick setup guide`,
      `Unlock these ${productName} features`,
      `Pro tips for ${productName} success`,
      `Mastering ${productName}: Advanced strategies`
    ];

    const purposes = [
      'Initial Setup',
      'Feature Introduction',
      'Best Practices',
      'Advanced Tips',
      'Optimization'
    ];

    const content = `Hi [First Name],

Welcome to Day ${day} of your ${productName} onboarding journey!

${index === 0 ? 
  `Let's get you set up for success. Here's your step-by-step guide to getting started:` :
  index === 1 ?
  `Now that you're set up, let's explore the key features that will help you achieve ${mainGoal || 'your goals'}:` :
  `You're making great progress! Today we're covering advanced strategies to maximize your results.`
}

Today's focus: ${purposes[index % purposes.length]}

Step-by-step instructions:
1. [Specific Action Step 1]
2. [Specific Action Step 2]  
3. [Specific Action Step 3]
4. [Specific Action Step 4]

💡 Pro Tip: ${index === 0 ? 
  'Take your time with the setup - it pays off later!' :
  index === 1 ?
  'Focus on one feature at a time for best results.' :
  'Consistency is key to long-term success.'
}

Need help? Our support team is standing by:
• Help Center: [Link]
• Live Chat: [Available 24/7]
• Email Support: support@${companyName.toLowerCase()}.com

Tomorrow: ${index < total - 1 ? `Day ${day + emailInterval[0]} - Next steps in your journey` : 'You\'ll be fully onboarded!'}

Cheering you on,
The ${companyName} Success Team`;

    return {
      subject: subjects[index % subjects.length],
      content,
      day,
      purpose: purposes[index % purposes.length]
    };
  };

  const generateAbandonedCartEmail = (index: number, day: number, total: number): EmailTemplate => {
    const subjects = [
      `Did you forget something?`,
      `Your cart is waiting for you`,
      `Complete your purchase + get 10% off`,
      `Last chance: Items in your cart`,
      `We saved your cart - limited stock alert!`
    ];

    const purposes = [
      'Gentle Reminder',
      'Value Reinforcement',
      'Incentive Offer',
      'Urgency Creation',
      'Final Attempt'
    ];

    const content = `Hi [First Name],

${index === 0 ? 
  `I noticed you were interested in ${productName} but didn't complete your purchase. No worries - it happens to the best of us!` :
  index === 1 ?
  `Your items are still waiting in your cart. Here's a quick reminder of why ${productName} is perfect for you:` :
  index === total - 1 ?
  `This is my final reminder about the items in your cart. I'd hate for you to miss out!` :
  `I wanted to follow up about your cart one more time...`
}

Your saved items:
• ${productName}
• [Additional items if applicable]

${index === 0 ? 
  `${productName} is specifically designed for ${targetAudience} like yourself who want to achieve ${mainGoal || 'their goals'}.` :
  index >= 2 ?
  `🎁 Special offer: Complete your purchase in the next 24 hours and get 10% off with code SAVE10` :
  `Here's what you'll get with ${productName}:`
}

${index < 2 ? 
  `Benefits you'll love:
• Perfect for ${targetAudience}
• Helps achieve ${mainGoal || 'your objectives'}
• ${tone.toLowerCase()} and easy to use
• Backed by our guarantee` :
  index === total - 1 ?
  `⚠️ Stock alert: Only a few items left in inventory!` :
  `Don't let this opportunity slip away.`
}

[Complete Purchase Button]

Questions? Reply to this email or contact our support team.

Best regards,
${companyName} Team

P.S. ${index === total - 1 ? 
  'After this email, we\'ll remove the items from your cart to make room for other customers.' :
  'Your cart will be saved for 7 more days.'
}`;

    return {
      subject: subjects[index % subjects.length],
      content,
      day,
      purpose: purposes[index % purposes.length]
    };
  };

  const generateGenericEmail = (index: number, day: number, total: number): EmailTemplate => {
    return {
      subject: `Email ${index + 1}: ${productName} update`,
      content: `Hi [First Name],

This is email ${index + 1} of ${total} in your ${sequenceType} sequence.

[Customized content based on your inputs will appear here]

Best regards,
${companyName} Team`,
      day,
      purpose: `Email ${index + 1} Purpose`
    };
  };

  const exportSequence = (format: 'csv' | 'txt') => {
    if (generatedSequence.length === 0) return;

    let content = '';
    
    if (format === 'csv') {
      content = 'Day,Subject,Purpose,Content\n';
      generatedSequence.forEach(email => {
        content += `${email.day},"${email.subject}","${email.purpose}","${email.content.replace(/"/g, '""')}"\n`;
      });
    } else {
      content = `EMAIL MARKETING SEQUENCE - ${sequenceType.toUpperCase()}\n`;
      content += `Generated for: ${companyName}\n`;
      content += `Product: ${productName}\n`;
      content += `Target Audience: ${targetAudience}\n`;
      content += `Business Type: ${businessType}\n\n`;
      content += '=' + '='.repeat(50) + '\n\n';
      
      generatedSequence.forEach((email, index) => {
        content += `EMAIL ${index + 1} - DAY ${email.day}\n`;
        content += `Purpose: ${email.purpose}\n`;
        content += `Subject: ${email.subject}\n\n`;
        content += email.content + '\n\n';
        content += '-'.repeat(50) + '\n\n';
      });
    }

    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-sequence-${sequenceType}.${format}`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Your email sequence has been exported as ${format.toUpperCase()}.`,
    });
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Email content copied to clipboard.",
    });
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
          <MailPlus className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Email Marketing Sequence Generator</h1>
        <p className="text-muted-foreground mt-2">Create powerful email sequences that convert and engage your audience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Sequence Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sequenceType">Sequence Type *</Label>
                <Select value={sequenceType} onValueChange={setSequenceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your sequence type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sequenceTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">Product/Service Name *</Label>
                  <Input
                    id="productName"
                    placeholder="Your product or service"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., small business owners, fitness enthusiasts"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainGoal">Main Goal *</Label>
                <Textarea
                  id="mainGoal"
                  placeholder="What do you want to achieve with this sequence?"
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Email Tone *</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your email tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map(t => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Number of Emails: {sequenceLength[0]}</Label>
                  <Slider
                    value={sequenceLength}
                    onValueChange={setSequenceLength}
                    max={15}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Days Between Emails: {emailInterval[0]}</Label>
                  <Slider
                    value={emailInterval}
                    onValueChange={setEmailInterval}
                    max={7}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={generateEmailSequence}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Generating Sequence...
                  </>
                ) : (
                  <>
                    <MailPlus className="h-4 w-4 mr-2" />
                    Generate Email Sequence
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Generated Sequence
                </span>
                {generatedSequence.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportSequence('txt')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      TXT
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportSequence('csv')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      CSV
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedSequence.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Your generated email sequence will appear here. Fill out the form and click "Generate Email Sequence" to get started.
                  </p>
                </div>
              ) : (
                <Tabs defaultValue="0" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
                    {generatedSequence.slice(0, 5).map((_, index) => (
                      <TabsTrigger key={index} value={index.toString()}>
                        Day {generatedSequence[index].day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {generatedSequence.map((email, index) => (
                    <TabsContent key={index} value={index.toString()}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">Email {index + 1}</h3>
                            <p className="text-sm text-muted-foreground">
                              Day {email.day} • {email.purpose}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.content}`)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Subject Line</Label>
                            <div className="mt-1 p-3 bg-muted rounded-md">
                              <p className="font-medium">{email.subject}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Email Content</Label>
                            <div className="mt-1 p-4 bg-muted rounded-md max-h-96 overflow-y-auto">
                              <pre className="whitespace-pre-wrap text-sm">{email.content}</pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailSequence;
