
import React, { useState } from 'react';
import { Copy, ArrowLeft, FileDown, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import Layout from '@/components/Layout';

const SmartCopy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState('');
  const [copyType, setCopyType] = useState('product-description');
  const [copyTone, setCopyTone] = useState('professional');
  const [wordCount, setWordCount] = useState([150]);
  const [persuasiveness, setPersuasiveness] = useState([50]);
  
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerateCopy = () => {
    if (!product.trim()) {
      toast({
        title: 'Product name required',
        description: 'Please provide a product or brand name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const copy = generateSmartCopy({
        product: product.trim(),
        audience: targetAudience.trim(),
        features: keyFeatures.split('\n').filter(Boolean),
        usp: uniqueSellingPoint.trim(),
        type: copyType,
        tone: copyTone,
        words: wordCount[0],
        persuasion: persuasiveness[0]
      });
      
      setGeneratedCopy(copy);
      setLoading(false);
      setActiveTab('preview');
      
      toast({
        title: 'Copy generated!',
        description: 'Your smart copy has been created successfully.',
      });
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCopy);
    toast({
      title: 'Copied to clipboard',
      description: 'Smart copy has been copied to your clipboard.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCopy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smart-copy.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Copy downloaded',
      description: 'Your smart copy has been downloaded as a text file.',
    });
  };

  // Helper function to select a random element from an array
  const getRandomElement = <T,>(arr: T[]): T => 
    arr[Math.floor(Math.random() * arr.length)];

  type CopyParams = {
    product: string;
    audience: string;
    features: string[];
    usp: string;
    type: string;
    tone: string;
    words: number;
    persuasion: number;
  };

  const generateSmartCopy = ({
    product,
    audience,
    features,
    usp,
    type,
    tone,
    words,
    persuasion
  }: CopyParams): string => {
    // Helper to generate random number within range
    const getRandomInt = (min: number, max: number): number => 
      Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Define tone adjectives
    const toneAdjectives: Record<string, string[]> = {
      professional: ['efficient', 'reliable', 'sophisticated', 'premium', 'exceptional'],
      casual: ['awesome', 'amazing', 'fantastic', 'great', 'cool'],
      humorous: ['mind-blowing', 'jaw-dropping', 'unbelievable', 'game-changing', 'revolutionary'],
      luxury: ['exquisite', 'prestigious', 'exclusive', 'elite', 'refined'],
      urgent: ['limited-time', 'essential', 'critical', 'must-have', 'vital']
    };
    
    const selectedAdjectives = toneAdjectives[tone] || toneAdjectives.professional;
    
    // Create audience description
    const audienceDesc = audience || 'customers';
    
    // Select random features if none provided
    let productFeatures = features.length > 0 ? features : [
      'High-quality design',
      'User-friendly interface',
      'Innovative technology',
      'Excellent performance'
    ];
    
    // Limit features based on word count
    const featureLimit = words < 100 ? 1 : words < 200 ? 2 : 3;
    productFeatures = productFeatures.slice(0, featureLimit);
    
    // Define USP if not provided
    const productUSP = usp || `The best choice for ${audienceDesc} looking for quality and reliability`;
    
    // Create templates based on copy type
    let copy = '';
    
    switch (type) {
      case 'product-description':
        copy = generateProductDescription(product, audienceDesc, productFeatures, productUSP, selectedAdjectives, persuasion);
        break;
        
      case 'email-subject':
        copy = generateEmailSubject(product, audienceDesc, productUSP, selectedAdjectives, persuasion);
        break;
        
      case 'social-post':
        copy = generateSocialPost(product, audienceDesc, productFeatures, productUSP, selectedAdjectives, persuasion);
        break;
        
      case 'headline':
        copy = generateHeadline(product, audienceDesc, productUSP, selectedAdjectives, persuasion);
        break;
        
      case 'call-to-action':
        copy = generateCTA(product, audienceDesc, productUSP, selectedAdjectives, persuasion);
        break;
        
      default:
        copy = generateProductDescription(product, audienceDesc, productFeatures, productUSP, selectedAdjectives, persuasion);
    }
    
    // Adjust length to target word count
    copy = adjustLength(copy, words);
    
    return copy;
  };
  
  const generateProductDescription = (
    product: string,
    audience: string,
    features: string[],
    usp: string,
    adjectives: string[],
    persuasion: number
  ): string => {
    const intro = [
      `Introducing ${product}: the ${getRandomElement(adjectives)} solution designed specifically for ${audience}.`,
      `Meet ${product} - ${getRandomElement(adjectives)} and designed with ${audience} in mind.`,
      `${product} is the ${getRandomElement(adjectives)} choice for ${audience} who demand the best.`
    ];
    
    const body = features.map(feature => `• ${feature}`).join('\n');
    
    const benefitPhrases = [
      `This means you'll enjoy`,
      `You'll experience`,
      `This translates to`,
      `The result?`
    ];
    
    const benefits = [
      'improved productivity',
      'better results',
      'enhanced performance',
      'greater satisfaction',
      'significant time savings',
      'reduced stress',
      'increased efficiency'
    ];
    
    const ctaPhrases = persuasion > 70 ? [
      `Don't miss out - get your ${product} today!`,
      `Limited availability - secure your ${product} now!`,
      `Join thousands of satisfied customers - try ${product} today!`
    ] : [
      `Experience the difference with ${product}.`,
      `Discover what ${product} can do for you.`,
      `Find out why ${audience} choose ${product}.`
    ];
    
    return `${getRandomElement(intro)}

${body}

${usp}

${getRandomElement(benefitPhrases)} ${getRandomElement(benefits)} and ${getRandomElement(benefits)}.

${getRandomElement(ctaPhrases)}`;
  };
  
  const generateEmailSubject = (
    product: string,
    audience: string,
    usp: string,
    adjectives: string[],
    persuasion: number
  ): string => {
    const subjects = [
      `Introducing ${product}: The ${getRandomElement(adjectives)} Solution for ${audience}`,
      `${getRandomElement(adjectives).charAt(0).toUpperCase() + getRandomElement(adjectives).slice(1)} News: ${product} is Here!`,
      `${product} - ${usp.split(' ').slice(0, 5).join(' ')}...`,
      `[New] ${product} - Designed for ${audience}`,
      `How ${product} is Changing the Game for ${audience}`,
      `The Secret to Better Results? ${product}`
    ];
    
    // Add urgency for high persuasion
    if (persuasion > 70) {
      subjects.push(
        `Last Chance: ${product} Special Offer Inside`,
        `Limited Time: Get ${product} Before It's Gone`,
        `Don't Miss Out on ${product} - 24 Hours Left!`
      );
    }
    
    return getRandomElement(subjects);
  };
  
  const generateSocialPost = (
    product: string,
    audience: string,
    features: string[],
    usp: string,
    adjectives: string[],
    persuasion: number
  ): string => {
    const openings = [
      `🚀 Exciting news! We've just launched ${product} for ${audience}!`,
      `✨ Introducing ${product}: The ${getRandomElement(adjectives)} way to ${usp.split(' ').slice(-5).join(' ')}.`,
      `🔥 Game-changer alert! ${product} is now available for ${audience}.`
    ];
    
    const feature = getRandomElement(features);
    const body = `${feature}. ${usp}`;
    
    const hashtags = [
      `#${product.replace(/\s+/g, '')}`,
      `#${audience.replace(/\s+/g, '')}`,
      `#Innovation`,
      `#MustHave`
    ].join(' ');
    
    const cta = persuasion > 70 ? [
      `👉 Click the link in bio to get yours before they're gone!`,
      `⏰ Limited time offer! Link in bio.`,
      `🔗 Don't miss out! Get yours today (link in bio)`
    ] : [
      `👉 Learn more through the link in our bio.`,
      `🔗 Discover more through our website (link in bio).`,
      `💡 Find out more about ${product} today!`
    ];
    
    return `${getRandomElement(openings)}

${body}

${getRandomElement(cta)}

${hashtags}`;
  };
  
  const generateHeadline = (
    product: string,
    audience: string,
    usp: string,
    adjectives: string[],
    persuasion: number
  ): string => {
    const headlines = [
      `${product}: The ${getRandomElement(adjectives)} Solution for ${audience}`,
      `Introducing ${product} - ${usp.split(' ').slice(0, 7).join(' ')}`,
      `How ${product} is Transforming the Way ${audience} Work`,
      `${product}: Redefining Excellence for ${audience}`
    ];
    
    // Add urgency/scarcity for high persuasion
    if (persuasion > 70) {
      headlines.push(
        `Limited Release: ${product} Now Available for ${audience}`,
        `Exclusive Offer: ${product} - ${getRandomElement(adjectives)} Results Guaranteed`,
        `Act Fast: ${product} - The Solution ${audience} Have Been Waiting For`
      );
    }
    
    return getRandomElement(headlines);
  };
  
  const generateCTA = (
    product: string,
    audience: string,
    usp: string,
    adjectives: string[],
    persuasion: number
  ): string => {
    const lowPersuasion = [
      `Learn more about ${product}`,
      `Discover ${product}`,
      `Explore ${product} features`,
      `See how ${product} works`,
      `Find out more`
    ];
    
    const mediumPersuasion = [
      `Try ${product} today`,
      `Get your ${product} now`,
      `Start with ${product}`,
      `Join the ${product} community`,
      `Experience ${product}`
    ];
    
    const highPersuasion = [
      `Don't miss out - Get ${product} now!`,
      `Limited time offer - Act fast!`,
      `Last chance to get ${product}!`,
      `Claim your ${product} before it's gone!`,
      `Secure your ${product} today!`
    ];
    
    let ctaOptions;
    if (persuasion < 40) {
      ctaOptions = lowPersuasion;
    } else if (persuasion < 70) {
      ctaOptions = mediumPersuasion;
    } else {
      ctaOptions = highPersuasion;
    }
    
    return getRandomElement(ctaOptions);
  };
  
  const adjustLength = (text: string, targetWords: number): string => {
    const words = text.split(/\s+/).filter(Boolean);
    const currentLength = words.length;
    
    if (currentLength <= targetWords + 10 && currentLength >= targetWords - 10) {
      // Already close enough to target length
      return text;
    } else if (currentLength > targetWords) {
      // Need to shorten
      return words.slice(0, targetWords).join(' ');
    } else {
      // Need to lengthen
      const filler = [
        "This innovative solution provides exceptional value.",
        "You will be amazed by the results.",
        "Perfect for those who demand the best.",
        "Designed with your needs in mind.",
        "The smart choice for discerning customers.",
        "Experience excellence like never before."
      ];
      
      let result = text;
      while (result.split(/\s+/).filter(Boolean).length < targetWords) {
        result += '\n\n' + getRandomElement(filler);
      }
      
      return result;
    }
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
            <Copy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Smart Copy Generator</h1>
          <p className="text-muted-foreground mt-2">Generate intelligent copy for various marketing purposes</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input">Content Details</TabsTrigger>
            <TabsTrigger value="preview">Generated Copy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product/Brand Name*</Label>
                      <Input 
                        id="product"
                        placeholder="e.g. UltraBoost Running Shoes" 
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Input 
                        id="targetAudience"
                        placeholder="e.g. Fitness enthusiasts, Business professionals" 
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="keyFeatures">Key Features (one per line)</Label>
                      <Textarea 
                        id="keyFeatures"
                        placeholder="e.g. Ergonomic design&#10;Water resistant&#10;24-hour battery life" 
                        value={keyFeatures}
                        onChange={(e) => setKeyFeatures(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="uniqueSellingPoint">Unique Selling Proposition</Label>
                      <Input 
                        id="uniqueSellingPoint"
                        placeholder="e.g. The only product that combines X, Y, and Z" 
                        value={uniqueSellingPoint}
                        onChange={(e) => setUniqueSellingPoint(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Copy Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="copyType">Copy Type</Label>
                      <Select value={copyType} onValueChange={setCopyType}>
                        <SelectTrigger id="copyType">
                          <SelectValue placeholder="Select copy type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-description">Product Description</SelectItem>
                          <SelectItem value="email-subject">Email Subject Line</SelectItem>
                          <SelectItem value="social-post">Social Media Post</SelectItem>
                          <SelectItem value="headline">Headline/Title</SelectItem>
                          <SelectItem value="call-to-action">Call to Action</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="copyTone">Tone of Voice</Label>
                      <RadioGroup value={copyTone} onValueChange={setCopyTone}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional" id="professional" />
                          <Label htmlFor="professional">Professional</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="casual" id="casual" />
                          <Label htmlFor="casual">Casual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="humorous" id="humorous" />
                          <Label htmlFor="humorous">Humorous</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="luxury" id="luxury" />
                          <Label htmlFor="luxury">Luxury</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" />
                          <Label htmlFor="urgent">Urgent</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="wordCount">Approximate Word Count: {wordCount[0]}</Label>
                      </div>
                      <Slider
                        id="wordCount"
                        min={50}
                        max={300}
                        step={10}
                        value={wordCount}
                        onValueChange={setWordCount}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Short</span>
                        <span>Medium</span>
                        <span>Long</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="persuasiveness">Persuasiveness Level: {persuasiveness[0]}%</Label>
                      </div>
                      <Slider
                        id="persuasiveness"
                        min={10}
                        max={90}
                        step={10}
                        value={persuasiveness}
                        onValueChange={setPersuasiveness}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtle</span>
                        <span>Balanced</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleGenerateCopy} 
                      disabled={loading || !product.trim()} 
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating Copy...
                        </>
                      ) : (
                        'Generate Smart Copy'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Your Generated Copy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {generatedCopy ? (
                  <>
                    <div className="bg-muted p-6 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{generatedCopy}</pre>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={handleCopy} className="flex-1" variant="outline">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      <Button onClick={handleDownload} className="flex-1">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Copy
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-12">
                    <Copy className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <p className="text-muted-foreground">
                      No copy generated yet. Fill in your product details and click "Generate Smart Copy".
                    </p>
                    <Button
                      onClick={() => setActiveTab('input')}
                      variant="outline"
                      className="mt-4"
                    >
                      Go to Content Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {generatedCopy && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Copywriting Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Focus on benefits rather than features</li>
                    <li>Address your audience's pain points directly</li>
                    <li>Include a clear call-to-action</li>
                    <li>Create a sense of urgency when appropriate</li>
                    <li>Maintain brand voice consistency across all channels</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SmartCopy;
