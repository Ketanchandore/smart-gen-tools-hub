
import React, { useState } from 'react';
import { Magnet, ArrowLeft, RefreshCw, Copy, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';

interface LeadMagnetIdea {
  title: string;
  description: string;
  type: string;
  complexity: string;
  potentialValue: string;
}

const LeadMagnet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [businessGoal, setBusinessGoal] = useState('leads');
  const [industryVertical, setIndustryVertical] = useState('');
  const [expertise, setExpertise] = useState('');
  const [complexity, setComplexity] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [leadMagnetIdeas, setLeadMagnetIdeas] = useState<LeadMagnetIdea[]>([]);
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<LeadMagnetIdea | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [contentLoading, setContentLoading] = useState(false);
  const [includeDesignTips, setIncludeDesignTips] = useState(true);
  const [includeDistributionTips, setIncludeDistributionTips] = useState(true);
  
  // Business industry verticals
  const industries = [
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'education', label: 'Education & Training' },
    { value: 'healthcare', label: 'Healthcare & Wellness' },
    { value: 'technology', label: 'Technology & SaaS' },
    { value: 'realEstate', label: 'Real Estate & Property' },
    { value: 'consulting', label: 'Coaching & Consulting' },
    { value: 'travel', label: 'Travel & Hospitality' },
    { value: 'legal', label: 'Legal Services' },
  ];
  
  const businessGoals = [
    { value: 'leads', label: 'Generate Leads' },
    { value: 'authority', label: 'Build Authority' },
    { value: 'subscribers', label: 'Grow Email List' },
    { value: 'sales', label: 'Increase Sales' },
    { value: 'community', label: 'Build Community' },
  ];
  
  const generateLeadMagnetIdeas = () => {
    if (!businessType.trim()) {
      toast({
        title: 'Business type required',
        description: 'Please enter your business type',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    setLeadMagnetIdeas([]);
    setSelectedLeadMagnet(null);
    setGeneratedContent('');
    
    // In a real implementation, this would call an AI API
    // For this demo, we'll simulate a delay and generate mock ideas
    setTimeout(() => {
      const ideas = generateMockLeadMagnetIdeas(
        businessType,
        targetAudience,
        businessGoal,
        industryVertical,
        complexity
      );
      
      setLeadMagnetIdeas(ideas);
      setLoading(false);
      setActiveTab('ideas');
      
      toast({
        title: 'Lead Magnet Ideas Generated',
        description: `Generated ${ideas.length} ideas for your business`,
      });
    }, 2000);
  };
  
  const generateMockLeadMagnetIdeas = (
    business: string,
    audience: string,
    goal: string,
    industry: string,
    complexityLevel: string
  ): LeadMagnetIdea[] => {
    const ideas: LeadMagnetIdea[] = [];
    
    // Lead magnet types by goal
    const leadMagnetTypes: Record<string, string[]> = {
      leads: ['Checklist', 'Cheat Sheet', 'Resource List', 'Quiz', 'Calculator'],
      authority: ['Whitepaper', 'Industry Report', 'Case Study', 'Expert Guide', 'Webinar'],
      subscribers: ['Email Course', 'Newsletter', 'Template Library', 'Discount Code', 'Free Trial'],
      sales: ['Product Demo', 'Consultation', 'Comparison Guide', 'ROI Calculator', 'Free Sample'],
      community: ['Challenge', 'Membership', 'Community Access', 'Event Invitation', 'Group Coaching'],
    };
    
    // Select lead magnet types based on the goal
    const selectedTypes = leadMagnetTypes[goal] || leadMagnetTypes.leads;
    
    // Generate ideas based on the selected types
    selectedTypes.forEach((type, index) => {
      let title = '';
      let description = '';
      
      // Customize based on business type and audience
      if (type === 'Checklist' || type === 'Cheat Sheet') {
        title = `${complexity === 'advanced' ? 'Advanced ' : ''}${business} ${type}: ${getRandomNumber(5, 15)} ${complexity === 'simple' ? 'Simple ' : ''}Steps to Success`;
        description = `A comprehensive ${type.toLowerCase()} that helps ${audience || 'your audience'} implement key strategies for ${business}.`;
      } else if (type === 'Resource List') {
        title = `Essential ${business} Resources for ${audience || 'Professionals'}`;
        description = `A curated list of the top tools, websites, and resources for ${business} that ${audience || 'your audience'} will find invaluable.`;
      } else if (type === 'Quiz' || type === 'Calculator') {
        title = `${business} ${type}: Discover Your ${getRandomAdjective()} Score`;
        description = `An interactive ${type.toLowerCase()} that helps ${audience || 'users'} evaluate their current ${business} strategy and get personalized recommendations.`;
      } else if (type === 'Whitepaper' || type === 'Industry Report') {
        title = `${getYear()} ${business} ${type}: Trends and Insights`;
        description = `An in-depth analysis of current trends, challenges, and opportunities in the ${business} industry, backed by research and expert opinions.`;
      } else if (type === 'Email Course') {
        title = `${getRandomNumber(5, 10)}-Day ${business} Mastery Course`;
        description = `A step-by-step email course teaching ${audience || 'subscribers'} how to master essential ${business} skills in just minutes a day.`;
      } else if (type === 'Template Library') {
        title = `${business} Template Bundle: ${getRandomNumber(10, 30)}+ Ready-to-Use Templates`;
        description = `A comprehensive collection of templates that ${audience || 'your audience'} can customize and use immediately to improve their ${business} results.`;
      } else {
        title = `${getRandomAdjective()} ${business} ${type} for ${audience || 'Success'}`;
        description = `A valuable resource designed to help ${audience || 'your audience'} achieve better results with their ${business} efforts.`;
      }
      
      // Add industry-specific context if provided
      if (industry) {
        const industryLabel = industries.find(i => i.value === industry)?.label || industry;
        title = title.replace(business, `${business} for ${industryLabel}`);
        description += ` Specifically tailored for the ${industryLabel} industry.`;
      }
      
      ideas.push({
        title,
        description,
        type,
        complexity: getComplexityLevel(type, complexityLevel),
        potentialValue: getPotentialValue(type, goal),
      });
    });
    
    return ideas;
  };
  
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const getYear = (): number => {
    return new Date().getFullYear();
  };
  
  const getRandomAdjective = (): string => {
    const adjectives = ['Ultimate', 'Essential', 'Comprehensive', 'Definitive', 'Complete'];
    return adjectives[Math.floor(Math.random() * adjectives.length)];
  };
  
  const getComplexityLevel = (type: string, userComplexity: string): string => {
    // Different lead magnet types have different inherent complexity levels
    const complexityMap: Record<string, number> = {
      'Checklist': 1,
      'Cheat Sheet': 1,
      'Resource List': 2,
      'Template Library': 2,
      'Quiz': 3,
      'Calculator': 4,
      'Whitepaper': 5,
      'Industry Report': 5,
      'Email Course': 4,
      'Webinar': 3,
      'Case Study': 3,
    };
    
    // User's complexity preference (1-3)
    const userComplexityValue = userComplexity === 'simple' ? 1 : userComplexity === 'medium' ? 2 : 3;
    
    // Get base complexity for the type (default to 2 if not in map)
    const baseComplexity = complexityMap[type] || 2;
    
    // Adjust based on user preference
    const adjustedComplexity = Math.min(5, baseComplexity + userComplexityValue - 2);
    
    // Convert to text
    if (adjustedComplexity <= 1) return 'Very Simple';
    if (adjustedComplexity === 2) return 'Simple';
    if (adjustedComplexity === 3) return 'Medium';
    if (adjustedComplexity === 4) return 'Complex';
    return 'Very Complex';
  };
  
  const getPotentialValue = (type: string, goal: string): string => {
    // Different lead magnet types have different value for different goals
    const valueMatrix: Record<string, Record<string, number>> = {
      'Checklist': { leads: 3, authority: 2, subscribers: 4, sales: 2, community: 1 },
      'Cheat Sheet': { leads: 4, authority: 2, subscribers: 4, sales: 2, community: 1 },
      'Resource List': { leads: 3, authority: 3, subscribers: 3, sales: 2, community: 2 },
      'Quiz': { leads: 5, authority: 3, subscribers: 4, sales: 3, community: 3 },
      'Calculator': { leads: 5, authority: 4, subscribers: 3, sales: 5, community: 2 },
      'Whitepaper': { leads: 3, authority: 5, subscribers: 3, sales: 3, community: 2 },
      'Industry Report': { leads: 4, authority: 5, subscribers: 3, sales: 4, community: 2 },
      'Email Course': { leads: 3, authority: 4, subscribers: 5, sales: 3, community: 3 },
      'Template Library': { leads: 4, authority: 3, subscribers: 5, sales: 3, community: 2 },
      'Webinar': { leads: 3, authority: 4, subscribers: 3, sales: 4, community: 5 },
      'Case Study': { leads: 3, authority: 5, subscribers: 2, sales: 5, community: 2 },
      'Challenge': { leads: 3, authority: 3, subscribers: 4, sales: 3, community: 5 },
      'Membership': { leads: 2, authority: 3, subscribers: 3, sales: 4, community: 5 },
    };
    
    // Get value rating for this type and goal (default to 3 if not in matrix)
    const valueRating = (valueMatrix[type] && valueMatrix[type][goal]) || 3;
    
    // Convert to text
    if (valueRating === 1) return 'Low';
    if (valueRating === 2) return 'Moderate';
    if (valueRating === 3) return 'Good';
    if (valueRating === 4) return 'High';
    return 'Very High';
  };
  
  const generateLeadMagnetContent = (leadMagnet: LeadMagnetIdea) => {
    setSelectedLeadMagnet(leadMagnet);
    setContentLoading(true);
    setGeneratedContent('');
    
    // In a real implementation, this would call an AI API
    // For this demo, we'll simulate a delay and generate mock content
    setTimeout(() => {
      const content = generateMockLeadMagnetContent(
        leadMagnet,
        businessType,
        targetAudience,
        businessGoal,
        industryVertical,
        expertise,
        includeDesignTips,
        includeDistributionTips
      );
      
      setGeneratedContent(content);
      setContentLoading(false);
      setActiveTab('content');
      
      toast({
        title: 'Lead Magnet Content Generated',
        description: `Content outline for "${leadMagnet.title}" has been created`,
      });
    }, 2500);
  };
  
  const generateMockLeadMagnetContent = (
    leadMagnet: LeadMagnetIdea,
    business: string,
    audience: string,
    goal: string,
    industry: string,
    expertiseArea: string,
    designTips: boolean,
    distributionTips: boolean
  ): string => {
    const industryLabel = industries.find(i => i.value === industry)?.label || industry || business;
    const audienceText = audience || 'your target audience';
    const type = leadMagnet.type;
    
    let content = `# ${leadMagnet.title}\n\n`;
    content += `## Overview\n${leadMagnet.description}\n\n`;
    
    // Content structure based on lead magnet type
    if (type === 'Checklist' || type === 'Cheat Sheet') {
      content += `## Content Structure\n\n`;
      content += `### Introduction\n`;
      content += `- Brief explanation of why this ${type.toLowerCase()} is valuable for ${audienceText}\n`;
      content += `- How to use this ${type.toLowerCase()} effectively\n`;
      content += `- What results to expect\n\n`;
      
      content += `### Main Content\n`;
      content += `1. **Getting Started with ${business}**\n`;
      content += `   - Initial assessment step\n`;
      content += `   - Basic setup requirements\n`;
      content += `   - Common pitfalls to avoid\n\n`;
      
      content += `2. **Essential ${business} Strategies**\n`;
      content += `   - Strategy 1: [Key strategy related to ${business}]\n`;
      content += `   - Strategy 2: [Another important approach]\n`;
      content += `   - Strategy 3: [Advanced technique for better results]\n\n`;
      
      content += `3. **Implementation Guide**\n`;
      content += `   - Step-by-step process\n`;
      content += `   - Timeline recommendations\n`;
      content += `   - Resource allocation suggestions\n\n`;
      
      content += `4. **Measuring Success**\n`;
      content += `   - Key metrics to track\n`;
      content += `   - Evaluation timeline\n`;
      content += `   - Benchmarks for success\n\n`;
      
      content += `### Conclusion\n`;
      content += `- Recap of key points\n`;
      content += `- Next steps for ${audienceText}\n`;
      content += `- Call-to-action for further engagement\n\n`;
    } else if (type === 'Resource List') {
      content += `## Content Structure\n\n`;
      content += `### Introduction\n`;
      content += `- Purpose of this resource list for ${audienceText}\n`;
      content += `- How these resources were selected\n`;
      content += `- How to use this guide effectively\n\n`;
      
      content += `### Categories of Resources\n\n`;
      content += `#### Essential Tools for ${business}\n`;
      content += `1. **[Tool Name 1]** - Description and specific use case\n`;
      content += `2. **[Tool Name 2]** - Description and specific use case\n`;
      content += `3. **[Tool Name 3]** - Description and specific use case\n\n`;
      
      content += `#### Must-Read Books & Articles\n`;
      content += `1. **[Resource Title 1]** - Key insights and why it's valuable\n`;
      content += `2. **[Resource Title 2]** - Key insights and why it's valuable\n`;
      content += `3. **[Resource Title 3]** - Key insights and why it's valuable\n\n`;
      
      content += `#### Online Learning Resources\n`;
      content += `1. **[Course/Platform 1]** - What you'll learn and approximate cost\n`;
      content += `2. **[Course/Platform 2]** - What you'll learn and approximate cost\n`;
      content += `3. **[Course/Platform 3]** - What you'll learn and approximate cost\n\n`;
      
      content += `#### Industry Experts to Follow\n`;
      content += `1. **[Expert Name 1]** - Area of expertise and where to find them\n`;
      content += `2. **[Expert Name 2]** - Area of expertise and where to find them\n`;
      content += `3. **[Expert Name 3]** - Area of expertise and where to find them\n\n`;
      
      content += `### Bonus: Exclusive Tips from Industry Experts\n`;
      content += `- Expert tip 1 related to ${business}\n`;
      content += `- Expert tip 2 related to ${industry || business}\n`;
      content += `- Expert tip 3 for ${audienceText}\n\n`;
    } else if (type === 'Quiz' || type === 'Calculator') {
      content += `## Content Structure\n\n`;
      content += `### Introduction Page\n`;
      content += `- Purpose of this ${type.toLowerCase()}\n`;
      content += `- What ${audienceText} will learn\n`;
      content += `- How the results will help them\n\n`;
      
      content += `### Quiz/Calculator Questions\n`;
      content += `1. **Question 1:** [Question related to ${business} fundamentals]\n`;
      content += `   - Option A: [Answer]\n`;
      content += `   - Option B: [Answer]\n`;
      content += `   - Option C: [Answer]\n`;
      content += `   - Option D: [Answer]\n\n`;
      
      content += `2. **Question 2:** [Question about ${business} strategy]\n`;
      content += `   - Option A: [Answer]\n`;
      content += `   - Option B: [Answer]\n`;
      content += `   - Option C: [Answer]\n`;
      content += `   - Option D: [Answer]\n\n`;
      
      content += `3. **Question 3:** [Question about ${business} challenges]\n`;
      content += `   - Option A: [Answer]\n`;
      content += `   - Option B: [Answer]\n`;
      content += `   - Option C: [Answer]\n`;
      content += `   - Option D: [Answer]\n\n`;
      
      content += `4. **Question 4:** [Question about ${business} goals]\n`;
      content += `   - Option A: [Answer]\n`;
      content += `   - Option B: [Answer]\n`;
      content += `   - Option C: [Answer]\n`;
      content += `   - Option D: [Answer]\n\n`;
      
      content += `### Results Categories\n`;
      content += `#### Category 1: [Beginner Level]\n`;
      content += `- Description of this result category\n`;
      content += `- Key recommendations for improvement\n`;
      content += `- Next steps tailored for this level\n\n`;
      
      content += `#### Category 2: [Intermediate Level]\n`;
      content += `- Description of this result category\n`;
      content += `- Key recommendations for improvement\n`;
      content += `- Next steps tailored for this level\n\n`;
      
      content += `#### Category 3: [Advanced Level]\n`;
      content += `- Description of this result category\n`;
      content += `- Key recommendations for improvement\n`;
      content += `- Next steps tailored for this level\n\n`;
    } else if (type === 'Whitepaper' || type === 'Industry Report' || type === 'Case Study') {
      content += `## Content Structure\n\n`;
      content += `### Executive Summary\n`;
      content += `- Purpose of this ${type.toLowerCase()}\n`;
      content += `- Key findings overview\n`;
      content += `- Value proposition for ${audienceText}\n\n`;
      
      content += `### Introduction\n`;
      content += `- Background on ${business} in ${industryLabel}\n`;
      content += `- Current challenges and opportunities\n`;
      content += `- Research methodology (if applicable)\n\n`;
      
      content += `### Key Findings/Analysis\n`;
      content += `#### Section 1: [Major Finding or Case Study Component 1]\n`;
      content += `- Analysis of data/situation\n`;
      content += `- Supporting evidence/examples\n`;
      content += `- Implications for the industry\n\n`;
      
      content += `#### Section 2: [Major Finding or Case Study Component 2]\n`;
      content += `- Analysis of data/situation\n`;
      content += `- Supporting evidence/examples\n`;
      content += `- Implications for the industry\n\n`;
      
      content += `#### Section 3: [Major Finding or Case Study Component 3]\n`;
      content += `- Analysis of data/situation\n`;
      content += `- Supporting evidence/examples\n`;
      content += `- Implications for the industry\n\n`;
      
      content += `### Recommendations\n`;
      content += `- Strategic recommendations based on findings\n`;
      content += `- Implementation considerations\n`;
      content += `- Expected outcomes\n\n`;
      
      content += `### Conclusion\n`;
      content += `- Summary of key points\n`;
      content += `- Future outlook for ${business} in ${industryLabel}\n`;
      content += `- Call to action\n\n`;
      
      content += `### References/Appendices\n`;
      content += `- Data sources\n`;
      content += `- Additional resources\n`;
      content += `- Contact information\n\n`;
    } else if (type === 'Email Course') {
      content += `## Content Structure\n\n`;
      content += `### Welcome Email\n`;
      content += `- Introduction to the course\n`;
      content += `- What ${audienceText} will learn\n`;
      content += `- How to get the most from the course\n`;
      content += `- What to expect (frequency, length, format)\n\n`;
      
      content += `### Email 1: [Foundations of ${business}]\n`;
      content += `- Key concept introduction\n`;
      content += `- Why it matters for ${audienceText}\n`;
      content += `- Quick implementation tip\n`;
      content += `- Preview of next email\n\n`;
      
      content += `### Email 2: [Essential Strategies for ${business}]\n`;
      content += `- Building on Email 1 concepts\n`;
      content += `- Step-by-step approach\n`;
      content += `- Common mistakes to avoid\n`;
      content += `- Preview of next email\n\n`;
      
      content += `### Email 3: [Advanced Techniques for ${business}]\n`;
      content += `- More sophisticated strategies\n`;
      content += `- Case study or example\n`;
      content += `- Implementation guidelines\n`;
      content += `- Preview of next email\n\n`;
      
      content += `### Email 4: [Overcoming Common ${business} Challenges]\n`;
      content += `- Addressing typical obstacles\n`;
      content += `- Troubleshooting approaches\n`;
      content += `- Expert tips for success\n`;
      content += `- Preview of final email\n\n`;
      
      content += `### Email 5: [Putting It All Together + Next Steps]\n`;
      content += `- Recap of key learnings\n`;
      content += `- Implementation plan template\n`;
      content += `- Additional resources\n`;
      content += `- Call to action for further engagement\n\n`;
    } else if (type === 'Template Library') {
      content += `## Content Structure\n\n`;
      content += `### Introduction Guide\n`;
      content += `- How to use these templates\n`;
      content += `- Customization guidelines\n`;
      content += `- Best practices\n\n`;
      
      content += `### Category 1: [Planning Templates]\n`;
      content += `1. **[Template Name 1]**\n`;
      content += `   - Purpose and benefits\n`;
      content += `   - When to use this template\n`;
      content += `   - Customization tips\n\n`;
      
      content += `2. **[Template Name 2]**\n`;
      content += `   - Purpose and benefits\n`;
      content += `   - When to use this template\n`;
      content += `   - Customization tips\n\n`;
      
      content += `### Category 2: [Strategy Templates]\n`;
      content += `1. **[Template Name 3]**\n`;
      content += `   - Purpose and benefits\n`;
      content += `   - When to use this template\n`;
      content += `   - Customization tips\n\n`;
      
      content += `2. **[Template Name 4]**\n`;
      content += `   - Purpose and benefits\n`;
      content += `   - When to use this template\n`;
      content += `   - Customization tips\n\n`;
      
      content += `### Category 3: [Tracking & Analysis Templates]\n`;
      content += `1. **[Template Name 5]**\n`;
      content += `   - Purpose and benefits\n`;
      content += `   - When to use this template\n`;
      content += `   - Customization tips\n\n`;
      
      content += `2. **[Template Name 6]**\n`;
      content += `   - Purpose and benefits\n`;
      content += `   - When to use this template\n`;
      content += `   - Customization tips\n\n`;
    }
    
    // Add design tips if requested
    if (designTips) {
      content += `## Design Guidelines\n\n`;
      content += `### Visual Identity\n`;
      content += `- Maintain brand consistency with your logo, colors, and fonts\n`;
      content += `- Use high-quality images and graphics relevant to ${business} and ${industryLabel}\n`;
      content += `- Create a clean, professional layout with adequate white space\n\n`;
      
      content += `### Format Recommendations\n`;
      content += `- Recommended file format: ${getRecommendedFormat(type)}\n`;
      content += `- Optimize file size for easy downloading/viewing\n`;
      content += `- Include page numbers, headers/footers for multi-page documents\n`;
      content += `- Consider mobile-friendly design for digital formats\n\n`;
    }
    
    // Add distribution tips if requested
    if (distributionTips) {
      content += `## Distribution Strategy\n\n`;
      content += `### Promotion Channels\n`;
      content += `- Website: Create a dedicated landing page with benefit-focused copy\n`;
      content += `- Email: Announce to your existing subscribers with a compelling subject line\n`;
      content += `- Social Media: Share teasers of valuable insights included in the lead magnet\n`;
      content += `- Paid Advertising: Consider targeted ads to reach new ${audienceText}\n\n`;
      
      content += `### Lead Capture Process\n`;
      content += `- Create a simple opt-in form with minimal fields (name, email)\n`;
      content += `- Set up an automated email delivery system\n`;
      content += `- Implement a thank you page with next steps\n`;
      content += `- Consider a follow-up email sequence to nurture leads\n\n`;
    }
    
    // Add CTA based on business goal
    content += `## Call to Action Strategy\n\n`;
    
    if (goal === 'leads') {
      content += `Focus on encouraging prospects to schedule a call or consultation after consuming this lead magnet. Include a clear, compelling CTA at strategic points in the content, especially at the end.\n\n`;
      content += `**Example CTA:** "Ready to transform your ${business} strategy? Schedule a free 30-minute consultation with our experts to discuss how we can help you implement these strategies."\n\n`;
    } else if (goal === 'authority') {
      content += `Focus on establishing credibility by encouraging readers to explore your other content and resources. Position yourself as the go-to expert in ${business}.\n\n`;
      content += `**Example CTA:** "Want more expert insights on ${business}? Visit our resource center for in-depth guides, case studies, and expert interviews."\n\n`;
    } else if (goal === 'subscribers') {
      content += `Focus on highlighting the value of your regular content and encouraging ongoing subscription to your email list or content channels.\n\n`;
      content += `**Example CTA:** "This is just the beginning! Subscribe to our weekly ${business} newsletter for exclusive tips, tools, and industry updates delivered straight to your inbox."\n\n`;
    } else if (goal === 'sales') {
      content += `Focus on a direct but non-pushy product or service promotion that naturally follows the value provided in the lead magnet.\n\n`;
      content += `**Example CTA:** "Ready to take your ${business} to the next level? Our [Product/Service Name] helps you implement everything you've learned in this guide, with additional support from our expert team."\n\n`;
    } else if (goal === 'community') {
      content += `Focus on encouraging readers to join your community, group, or forum where they can connect with like-minded individuals.\n\n`;
      content += `**Example CTA:** "Join our thriving community of ${business} professionals! Share ideas, ask questions, and network with peers in our exclusive online group."\n\n`;
    }
    
    return content;
  };
  
  const getRecommendedFormat = (type: string): string => {
    switch (type) {
      case 'Checklist':
      case 'Cheat Sheet':
      case 'Resource List':
        return 'PDF or Interactive PDF';
      case 'Quiz':
      case 'Calculator':
        return 'Interactive Web Page or Tool';
      case 'Whitepaper':
      case 'Industry Report':
      case 'Case Study':
        return 'PDF with Professional Formatting';
      case 'Email Course':
        return 'Plain Text or HTML Emails with Visual Elements';
      case 'Template Library':
        return 'ZIP file containing various formats (DOCX, XLSX, PPTX, etc.)';
      default:
        return 'PDF or Digital Format';
    }
  };
  
  const copyToClipboard = () => {
    if (!generatedContent) {
      toast({
        title: 'No content to copy',
        description: 'Please generate lead magnet content first',
        variant: 'destructive',
      });
      return;
    }
    
    navigator.clipboard.writeText(generatedContent);
    
    toast({
      title: 'Content copied',
      description: 'The lead magnet outline has been copied to clipboard',
    });
  };
  
  const downloadContent = () => {
    if (!generatedContent || !selectedLeadMagnet) {
      toast({
        title: 'No content to download',
        description: 'Please generate lead magnet content first',
        variant: 'destructive',
      });
      return;
    }
    
    const filename = `${selectedLeadMagnet.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_outline.md`;
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: 'Content downloaded',
      description: `File saved as ${filename}`,
    });
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
            <Magnet className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Lead Magnet Creator</h1>
          <p className="text-muted-foreground mt-2">Create valuable lead magnets for your marketing</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full mb-6">
            <TabsTrigger value="input">1. Business Info</TabsTrigger>
            <TabsTrigger value="ideas" disabled={leadMagnetIdeas.length === 0 && !loading}>2. Lead Magnet Ideas</TabsTrigger>
            <TabsTrigger value="content" disabled={!generatedContent && !contentLoading}>3. Content Outline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Provide details about your business to generate tailored lead magnet ideas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type or Niche *</Label>
                    <Input
                      id="business-type"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      placeholder="e.g., Marketing Agency, Fitness Coach"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry-vertical">Industry Vertical</Label>
                    <Select value={industryVertical} onValueChange={setIndustryVertical}>
                      <SelectTrigger id="industry-vertical">
                        <SelectValue placeholder="Select industry vertical" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Input
                      id="target-audience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g., Small Business Owners, Fitness Enthusiasts"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-goal">Primary Business Goal</Label>
                    <Select value={businessGoal} onValueChange={setBusinessGoal}>
                      <SelectTrigger id="business-goal">
                        <SelectValue placeholder="Select primary goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessGoals.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expertise">Your Expertise/Specialization (Optional)</Label>
                  <Textarea
                    id="expertise"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    placeholder="Describe your unique expertise or what you're known for"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Lead Magnet Complexity</Label>
                  <RadioGroup value={complexity} onValueChange={setComplexity} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="simple" id="r-simple" />
                      <Label htmlFor="r-simple">Simple (Quick to create and consume)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="r-medium" />
                      <Label htmlFor="r-medium">Medium (Balanced complexity and value)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="r-advanced" />
                      <Label htmlFor="r-advanced">Advanced (In-depth, high-value content)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateLeadMagnetIdeas} 
                  disabled={loading || !businessType.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    'Generate Lead Magnet Ideas'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ideas">
            <Card>
              <CardHeader>
                <CardTitle>Lead Magnet Ideas</CardTitle>
                <CardDescription>Select an idea to generate detailed content outline</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : leadMagnetIdeas.length > 0 ? (
                  <div className="space-y-4">
                    {leadMagnetIdeas.map((idea, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-5 cursor-pointer transition-colors ${
                          selectedLeadMagnet?.title === idea.title ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedLeadMagnet(idea)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{idea.title}</h3>
                            <p className="text-muted-foreground mt-1">{idea.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4 items-center">
                          <div className="bg-muted px-2 py-1 rounded text-xs">
                            {idea.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Complexity:</span>
                            <span className="text-xs font-medium">{idea.complexity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Value:</span>
                            <span className="text-xs font-medium">{idea.potentialValue}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No ideas generated yet. Go back to step 1.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {selectedLeadMagnet && (
                  <>
                    <div className="w-full space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="include-design" 
                          checked={includeDesignTips} 
                          onCheckedChange={(checked) => setIncludeDesignTips(checked as boolean)}
                        />
                        <Label htmlFor="include-design">Include design guidelines</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="include-distribution" 
                          checked={includeDistributionTips} 
                          onCheckedChange={(checked) => setIncludeDistributionTips(checked as boolean)}
                        />
                        <Label htmlFor="include-distribution">Include distribution strategy</Label>
                      </div>
                    </div>
                    <Button 
                      onClick={() => generateLeadMagnetContent(selectedLeadMagnet)}
                      disabled={contentLoading}
                      className="w-full"
                    >
                      {contentLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating Content...
                        </>
                      ) : (
                        'Generate Content Outline'
                      )}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle>{selectedLeadMagnet?.title}</CardTitle>
                    <CardDescription>{selectedLeadMagnet?.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="default" onClick={downloadContent}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contentLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : generatedContent ? (
                  <div className="bg-muted p-6 rounded-md whitespace-pre-wrap prose prose-sm max-w-none">
                    {generatedContent.split('\n').map((line, i) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={i} className="text-2xl font-bold mt-0">{line.substring(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-xl font-bold">{line.substring(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={i} className="text-lg font-bold">{line.substring(4)}</h3>;
                      } else if (line.startsWith('#### ')) {
                        return <h4 key={i} className="text-base font-bold">{line.substring(5)}</h4>;
                      } else if (line.startsWith('- ')) {
                        return <li key={i}>{line.substring(2)}</li>;
                      } else if (line.match(/^\d+\. /)) {
                        const contentStart = line.indexOf(' ') + 1;
                        return <li key={i} className="list-decimal ml-5">{line.substring(contentStart)}</li>;
                      } else if (line === '') {
                        return <br key={i} />;
                      } else {
                        return <p key={i}>{line}</p>;
                      }
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">Select a lead magnet idea and generate content.</p>
                  </div>
                )}
              </CardContent>
              {generatedContent && (
                <CardFooter className="flex flex-col text-sm text-muted-foreground">
                  <p>Now you have a detailed outline for your lead magnet. Use this as a framework to create the final content that will attract and convert your target audience.</p>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LeadMagnet;
