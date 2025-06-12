
import React, { useState } from 'react';
import { ArrowLeft, Chrome, Lightbulb, Wand2, Copy, Download, RefreshCw, Star, Zap, Users, TrendingUp, Code, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface ExtensionIdea {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  marketPotential: number;
  features: string[];
  technicalRequirements: string[];
  monetizationIdeas: string[];
  targetAudience: string;
  competitorAnalysis: string;
  developmentTime: string;
  uniqueSellingPoints: string[];
}

const ChromeExtension = () => {
  const navigate = useNavigate();
  
  const [preferences, setPreferences] = useState({
    category: '',
    difficulty: '',
    interests: '',
    targetAudience: '',
    monetization: '',
    problemToSolve: ''
  });
  
  const [generatedIdeas, setGeneratedIdeas] = useState<ExtensionIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<ExtensionIdea | null>(null);
  const [includeCode, setIncludeCode] = useState(false);
  const [includeMarketing, setIncludeMarketing] = useState(true);

  const categories = [
    'Productivity', 'Social Media', 'Shopping', 'Developer Tools', 'Education',
    'Entertainment', 'Security & Privacy', 'News & Information', 'Health & Fitness',
    'Finance', 'Communication', 'Content Creation', 'Research', 'Accessibility'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const monetizationOptions = [
    'Free with Premium Features', 'One-time Payment', 'Subscription', 'Advertisement',
    'Data Insights', 'Affiliate Marketing', 'Completely Free'
  ];

  const generateIdeas = async () => {
    if (!preferences.category) {
      toast({
        title: "Missing Category",
        description: "Please select a category to generate ideas.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      const ideas = generateExtensionIdeas();
      setGeneratedIdeas(ideas);
      setSelectedIdea(ideas[0]);

      toast({
        title: "Ideas Generated!",
        description: `Generated ${ideas.length} extension ideas for you.`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate ideas. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateExtensionIdeas = (): ExtensionIdea[] => {
    const baseIdeas = {
      'Productivity': [
        {
          name: 'FocusFlow',
          description: 'A smart website blocker that adapts to your work patterns and helps maintain focus during work hours.',
          features: ['Smart blocking based on time', 'Work pattern analysis', 'Pomodoro timer integration', 'Distraction analytics'],
          targetAudience: 'Remote workers and students',
          uniqueSellingPoints: ['AI-powered blocking decisions', 'Personalized productivity insights', 'Seamless calendar integration']
        },
        {
          name: 'TaskCapture',
          description: 'Instantly capture tasks from any webpage and organize them across multiple project management tools.',
          features: ['One-click task creation', 'Cross-platform sync', 'Smart categorization', 'Due date suggestions'],
          targetAudience: 'Project managers and freelancers',
          uniqueSellingPoints: ['Universal capture from any site', 'AI-powered task prioritization', 'Multi-tool integration']
        },
        {
          name: 'MeetingMaster',
          description: 'Automatically extract action items and meeting notes from video calls and web meetings.',
          features: ['Real-time transcription', 'Action item detection', 'Calendar integration', 'Team sharing'],
          targetAudience: 'Business professionals and teams',
          uniqueSellingPoints: ['Automated meeting summaries', 'Cross-platform compatibility', 'Smart follow-up reminders']
        }
      ],
      'Social Media': [
        {
          name: 'ContentCurator',
          description: 'AI-powered content discovery and scheduling tool for multiple social media platforms.',
          features: ['Content suggestion engine', 'Optimal posting times', 'Hashtag generation', 'Performance analytics'],
          targetAudience: 'Social media managers and influencers',
          uniqueSellingPoints: ['AI content recommendations', 'Cross-platform posting', 'Viral content prediction']
        },
        {
          name: 'SocialSentry',
          description: 'Privacy-focused social media management with content moderation and security alerts.',
          features: ['Privacy scanning', 'Content moderation', 'Security alerts', 'Digital footprint analysis'],
          targetAudience: 'Privacy-conscious users and parents',
          uniqueSellingPoints: ['Comprehensive privacy protection', 'Real-time alerts', 'Family safety features']
        },
        {
          name: 'EngageBoost',
          description: 'Intelligent engagement assistant that helps you interact with your audience more effectively.',
          features: ['Smart reply suggestions', 'Engagement analytics', 'Follower insights', 'Competitor tracking'],
          targetAudience: 'Content creators and community managers',
          uniqueSellingPoints: ['AI-powered engagement strategies', 'Automated interaction', 'Audience growth tools']
        }
      ],
      'Developer Tools': [
        {
          name: 'CodeSnapshot',
          description: 'Instantly capture, annotate and share code snippets from any website or repository.',
          features: ['Syntax highlighting', 'Annotation tools', 'Screenshot sharing', 'Repository integration'],
          targetAudience: 'Software developers and technical writers',
          uniqueSellingPoints: ['One-click code capture', 'Instant sharing capabilities', 'Multiple export formats']
        },
        {
          name: 'APITester',
          description: 'Test and debug API endpoints directly from your browser with request visualization.',
          features: ['Request builder', 'Response visualization', 'Environment variables', 'Test history'],
          targetAudience: 'Web developers and API engineers',
          uniqueSellingPoints: ['Browser integrated API testing', 'Visual request building', 'Team collaboration features']
        },
        {
          name: 'GitInsight',
          description: 'GitHub enhancement suite with advanced code navigation and team collaboration features.',
          features: ['Advanced code search', 'PR templates', 'Code quality metrics', 'Review tools'],
          targetAudience: 'Software development teams',
          uniqueSellingPoints: ['Enhanced GitHub workflow', 'Team productivity metrics', 'Code quality insights']
        }
      ],
      'Shopping': [
        {
          name: 'PriceGuardian',
          description: 'Automatic price tracking and alerts for products across multiple online retailers.',
          features: ['Price history charts', 'Automatic alerts', 'Coupon finder', 'Price comparison'],
          targetAudience: 'Deal hunters and smart shoppers',
          uniqueSellingPoints: ['Real-time price monitoring', 'Historical price analysis', 'Automatic best deal finder']
        },
        {
          name: 'EthicalShopper',
          description: 'Evaluate brand sustainability and ethical practices while you shop online.',
          features: ['Ethical ratings', 'Sustainability metrics', 'Alternative suggestions', 'Impact reports'],
          targetAudience: 'Environmentally conscious consumers',
          uniqueSellingPoints: ['Comprehensive ethical data', 'Sustainable alternatives', 'Environmental impact tracking']
        },
        {
          name: 'WishTracker',
          description: 'Unified wishlist manager that works across all online stores with price alerts.',
          features: ['Universal wishlists', 'Price alerts', 'Gift registry', 'Budget management'],
          targetAudience: 'Online shoppers and gift planners',
          uniqueSellingPoints: ['Cross-store wishlist', 'Shared family lists', 'Gift coordination tools']
        }
      ],
      'Security & Privacy': [
        {
          name: 'DataShield',
          description: 'Advanced privacy protection that monitors and blocks invasive data collection on websites.',
          features: ['Tracker blocking', 'Privacy reports', 'Data breach alerts', 'Identity protection'],
          targetAudience: 'Privacy-conscious internet users',
          uniqueSellingPoints: ['Real-time protection', 'Comprehensive privacy monitoring', 'Personal data control']
        },
        {
          name: 'PasswordArmor',
          description: 'Secure password generation and management with breach detection and auto-change features.',
          features: ['Password generation', 'Breach monitoring', 'Auto-change', 'Security scoring'],
          targetAudience: 'Security-focused users and businesses',
          uniqueSellingPoints: ['Automatic credential updates', 'Security analytics', 'Cross-platform sync']
        },
        {
          name: 'SecureShare',
          description: 'Create end-to-end encrypted temporary links to share sensitive information safely.',
          features: ['Encrypted sharing', 'Self-destructing links', 'Access logs', 'Verification steps'],
          targetAudience: 'Professionals handling sensitive information',
          uniqueSellingPoints: ['Military-grade encryption', 'Zero knowledge architecture', 'Detailed access controls']
        }
      ],
      'Education': [
        {
          name: 'StudyGenius',
          description: 'AI-powered research assistant that helps students gather, organize, and cite information.',
          features: ['Smart research collection', 'Citation generator', 'Study planner', 'Flashcard creator'],
          targetAudience: 'Students and researchers',
          uniqueSellingPoints: ['Automated research workflow', 'Academic integrity tools', 'Learning optimization']
        },
        {
          name: 'VocabBuilder',
          description: 'Context-aware vocabulary enhancement that teaches new words while you browse the web.',
          features: ['In-context definitions', 'Personalized learning', 'Retention games', 'Progress tracking'],
          targetAudience: 'Language learners and students',
          uniqueSellingPoints: ['Contextual learning system', 'Adaptive difficulty', 'Multi-language support']
        },
        {
          name: 'LectureNotes',
          description: 'Convert educational videos and online lectures into structured, searchable notes.',
          features: ['Speech-to-text', 'Smart summarization', 'Concept extraction', 'Note organization'],
          targetAudience: 'Students and lifelong learners',
          uniqueSellingPoints: ['Automated note-taking', 'Knowledge mapping', 'Revision assistance']
        }
      ]
    };

    const selectedCategory = preferences.category;
    
    if (!baseIdeas[selectedCategory as keyof typeof baseIdeas]) {
      // Fallback to productivity if category not found
      return createCompleteIdeas(baseIdeas['Productivity']);
    }
    
    return createCompleteIdeas(baseIdeas[selectedCategory as keyof typeof baseIdeas]);
  };

  const createCompleteIdeas = (baseIdeaList: any[]): ExtensionIdea[] => {
    return baseIdeaList.map((idea, index) => {
      const difficulty = preferences.difficulty || difficulties[Math.floor(Math.random() * difficulties.length)];
      
      return {
        id: `idea-${index + 1}`,
        name: idea.name,
        description: idea.description,
        category: preferences.category,
        difficulty: difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        marketPotential: Math.floor(Math.random() * 5) + 1, // 1-5 rating
        features: idea.features,
        technicalRequirements: [
          'HTML, CSS, JavaScript',
          difficulty === 'Beginner' ? 'Basic DOM manipulation' : 'Advanced JavaScript concepts',
          difficulty === 'Advanced' ? 'Chrome Storage API' : 'Chrome Extension Manifest V3',
          difficulty === 'Advanced' ? 'Background scripts' : 'Content scripts',
          difficulty !== 'Beginner' ? 'API integration' : 'Basic UI development'
        ],
        monetizationIdeas: [
          preferences.monetization || monetizationOptions[Math.floor(Math.random() * monetizationOptions.length)],
          'Tiered subscription model',
          'Freemium with premium features'
        ],
        targetAudience: idea.targetAudience,
        competitorAnalysis: `Several similar extensions exist, but ${idea.name} differentiates through ${idea.uniqueSellingPoints[0].toLowerCase()} and ${idea.uniqueSellingPoints[1].toLowerCase()}.`,
        developmentTime: difficulty === 'Beginner' ? '2-4 weeks' : difficulty === 'Intermediate' ? '1-2 months' : '3+ months',
        uniqueSellingPoints: idea.uniqueSellingPoints
      };
    });
  };

  const refreshIdeas = () => {
    setLoading(true);
    setTimeout(() => {
      const ideas = generateExtensionIdeas();
      setGeneratedIdeas(ideas);
      setSelectedIdea(ideas[0]);
      setLoading(false);
      
      toast({
        title: "Ideas Refreshed",
        description: "Generated new extension ideas for you."
      });
    }, 1000);
  };

  const copyIdeaToClipboard = () => {
    if (!selectedIdea) return;

    const ideaText = `
CHROME EXTENSION IDEA: ${selectedIdea.name}

Description: ${selectedIdea.description}

Category: ${selectedIdea.category}
Difficulty: ${selectedIdea.difficulty}
Target Audience: ${selectedIdea.targetAudience}
Development Time: ${selectedIdea.developmentTime}

KEY FEATURES:
${selectedIdea.features.map(feature => `• ${feature}`).join('\n')}

UNIQUE SELLING POINTS:
${selectedIdea.uniqueSellingPoints.map(usp => `• ${usp}`).join('\n')}

TECHNICAL REQUIREMENTS:
${selectedIdea.technicalRequirements.map(req => `• ${req}`).join('\n')}

MONETIZATION OPTIONS:
${selectedIdea.monetizationIdeas.map(idea => `• ${idea}`).join('\n')}

MARKET ANALYSIS:
${selectedIdea.competitorAnalysis}
`;

    navigator.clipboard.writeText(ideaText);
    toast({
      title: "Copied to Clipboard",
      description: `"${selectedIdea.name}" has been copied to clipboard.`
    });
  };

  const downloadIdea = () => {
    if (!selectedIdea) return;

    let ideaContent = `
# ${selectedIdea.name} - Chrome Extension Concept

## Overview
${selectedIdea.description}

## Market Details
- **Category:** ${selectedIdea.category}
- **Difficulty:** ${selectedIdea.difficulty}
- **Target Audience:** ${selectedIdea.targetAudience}
- **Estimated Development Time:** ${selectedIdea.developmentTime}
- **Market Potential:** ${selectedIdea.marketPotential}/5

## Core Features
${selectedIdea.features.map(feature => `- ${feature}`).join('\n')}

## Unique Selling Points
${selectedIdea.uniqueSellingPoints.map(usp => `- ${usp}`).join('\n')}

## Technical Requirements
${selectedIdea.technicalRequirements.map(req => `- ${req}`).join('\n')}

## Monetization Strategy
${selectedIdea.monetizationIdeas.map(idea => `- ${idea}`).join('\n')}

## Competitor Analysis
${selectedIdea.competitorAnalysis}
`;

    if (includeCode) {
      ideaContent += `

## Basic Implementation Example

\`\`\`javascript
// manifest.json
{
  "name": "${selectedIdea.name}",
  "version": "1.0",
  "manifest_version": 3,
  "description": "${selectedIdea.description}",
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "permissions": ["storage", "activeTab"],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}

// popup.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize your extension's popup UI
  const actionButton = document.getElementById('actionButton');
  
  actionButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "perform${selectedIdea.name.replace(/\s/g, '')}"
      });
    });
  });
});

// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "perform${selectedIdea.name.replace(/\s/g, '')}") {
    // Implement core functionality here
    console.log("${selectedIdea.name} functionality triggered!");
  }
});
\`\`\`
`;
    }

    if (includeMarketing) {
      ideaContent += `

## Marketing Plan

### Value Proposition
"${selectedIdea.name} helps ${selectedIdea.targetAudience} to ${selectedIdea.description.toLowerCase().replace(/\.$/, '')}."

### Distribution Channels
- Chrome Web Store
- Product Hunt launch
- Reddit communities (r/productivity, r/chrome, r/chromeextensions)
- Tech blogs and review sites

### User Acquisition Strategy
1. Initial free tier to build user base
2. Referral program for premium features
3. Content marketing highlighting use cases
4. Demos and tutorials on YouTube

### Growth Metrics to Track
- Weekly active users
- Feature usage rates
- Conversion rate to premium
- User retention at 7, 30, and 90 days
`;
    }

    const blob = new Blob([ideaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedIdea.name.toLowerCase().replace(/\s+/g, '-')}-extension-concept.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Idea Downloaded",
      description: `"${selectedIdea.name}" concept has been downloaded.`
    });
  };

  const difficultyBadgeColor = {
    'Beginner': 'bg-green-500',
    'Intermediate': 'bg-yellow-500',
    'Advanced': 'bg-red-500'
  };

  return (
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
        <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
          <Chrome className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Chrome Extension Idea Generator</h1>
        <p className="text-xl text-muted-foreground">
          Discover innovative Chrome extension ideas with technical details and market insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Your Preferences
              </CardTitle>
              <CardDescription>
                Tell us your interests to generate tailored extension ideas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={preferences.category} 
                    onValueChange={(value) => setPreferences(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty">Preferred Difficulty</Label>
                  <Select 
                    value={preferences.difficulty} 
                    onValueChange={(value) => setPreferences(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="interests">Your Interests/Skills</Label>
                <Input
                  id="interests"
                  placeholder="e.g., JavaScript, AI, design, education"
                  value={preferences.interests}
                  onChange={(e) => setPreferences(prev => ({ ...prev, interests: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  placeholder="e.g., students, professionals, developers"
                  value={preferences.targetAudience}
                  onChange={(e) => setPreferences(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monetization">Monetization Strategy</Label>
                  <Select 
                    value={preferences.monetization} 
                    onValueChange={(value) => setPreferences(prev => ({ ...prev, monetization: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {monetizationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="problem">Problem to Solve</Label>
                  <Input
                    id="problem"
                    placeholder="e.g., productivity, organization"
                    value={preferences.problemToSolve}
                    onChange={(e) => setPreferences(prev => ({ ...prev, problemToSolve: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={generateIdeas}
                disabled={loading || !preferences.category}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Ideas...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Extension Ideas
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedIdeas.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Ideas</CardTitle>
                  <Button variant="outline" size="sm" onClick={refreshIdeas} disabled={loading}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generatedIdeas.map((idea) => (
                    <Card 
                      key={idea.id}
                      className={`border-l-4 cursor-pointer hover:bg-accent ${selectedIdea?.id === idea.id ? 'border-primary bg-accent' : 'border-muted'}`}
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{idea.name}</h3>
                          <div>
                            <Badge className={`${idea.difficulty === 'Beginner' ? 'bg-green-500' : idea.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'} hover:${idea.difficulty === 'Beginner' ? 'bg-green-600' : idea.difficulty === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'}`}>
                              {idea.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {idea.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Idea Details Panel */}
        <div>
          {selectedIdea ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Chrome className="h-5 w-5" />
                    {selectedIdea.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyIdeaToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadIdea}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{selectedIdea.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedIdea.category}</Badge>
                    <Badge className={`${selectedIdea.difficulty === 'Beginner' ? 'bg-green-500' : selectedIdea.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'} hover:${selectedIdea.difficulty === 'Beginner' ? 'bg-green-600' : selectedIdea.difficulty === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'}`}>
                      {selectedIdea.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-muted-foreground">Market Potential:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < selectedIdea.marketPotential ? "fill-yellow-400 text-yellow-400" : "text-muted stroke-1"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="features">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="features" className="text-xs">
                      <Layers className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Features</span>
                    </TabsTrigger>
                    <TabsTrigger value="technical" className="text-xs">
                      <Code className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Technical</span>
                    </TabsTrigger>
                    <TabsTrigger value="market" className="text-xs">
                      <TrendingUp className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Market</span>
                    </TabsTrigger>
                    <TabsTrigger value="business" className="text-xs">
                      <Users className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Business</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Key Features
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {selectedIdea.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Unique Selling Points
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {selectedIdea.uniqueSellingPoints.map((point, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Technical Requirements</h4>
                      <ul className="space-y-1 text-sm">
                        {selectedIdea.technicalRequirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Development Time</h4>
                      <Badge variant="outline">{selectedIdea.developmentTime}</Badge>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Include Code Example</Label>
                        <Switch
                          checked={includeCode}
                          onCheckedChange={setIncludeCode}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="market" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Target Audience</h4>
                      <p className="text-sm">{selectedIdea.targetAudience}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Competitor Analysis</h4>
                      <p className="text-sm">{selectedIdea.competitorAnalysis}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Market Position</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted rounded-md p-3 text-center">
                          <div className="text-2xl font-bold">{selectedIdea.marketPotential}/5</div>
                          <div className="text-xs text-muted-foreground">Market Potential</div>
                        </div>
                        <div className="bg-muted rounded-md p-3 text-center">
                          <div className="text-2xl font-bold">
                            {selectedIdea.difficulty === 'Beginner' ? 'Low' : 
                             selectedIdea.difficulty === 'Intermediate' ? 'Medium' : 'High'}
                          </div>
                          <div className="text-xs text-muted-foreground">Entry Barrier</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="business" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Monetization Ideas</h4>
                      <ul className="space-y-1 text-sm">
                        {selectedIdea.monetizationIdeas.map((idea, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Include Marketing Plan</Label>
                        <Switch
                          checked={includeMarketing}
                          onCheckedChange={setIncludeMarketing}
                        />
                      </div>
                    </div>

                    <Card className="bg-accent">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-2">Quick Start Guide</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Create manifest.json for your extension</li>
                          <li>Design a simple UI in HTML/CSS</li>
                          <li>Implement core functionality in JavaScript</li>
                          <li>Test locally in Chrome</li>
                          <li>Package and publish to Chrome Web Store</li>
                        </ol>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <Chrome className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Ideas Generated Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Select your preferences and generate ideas to see extension concepts here.
                </p>
                <Button onClick={() => generateIdeas()} disabled={loading || !preferences.category}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Ideas
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChromeExtension;
