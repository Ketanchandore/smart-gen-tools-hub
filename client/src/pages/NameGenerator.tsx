
import React, { useState } from 'react';
import { Tag, Copy, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface NameResult {
  name: string;
  meaning?: string;
  score: number;
}

const NameGenerator = () => {
  const { toast } = useToast();
  const [industry, setIndustry] = useState('technology');
  const [keywords, setKeywords] = useState('');
  const [nameType, setNameType] = useState('brand');
  const [results, setResults] = useState<NameResult[]>([]);
  const [generating, setGenerating] = useState(false);

  // Helper function to get a random element from an array
  const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Sample name datasets for different industries and types
  const namesByIndustry = {
    technology: {
      brand: ['Nexus', 'Quantum', 'Vertex', 'Zenith', 'Eclipse', 'Prism', 'Fusion', 'Orbit', 'Pulse', 'Cipher'],
      product: ['Echo', 'Nova', 'Spectra', 'Aura', 'Flux', 'Atlas', 'Titan', 'Vortex', 'Helix', 'Proton']
    },
    healthcare: {
      brand: ['Vitality', 'Wellness', 'Remedy', 'Thrive', 'Harmony', 'Clarity', 'Essence', 'Balance', 'Revive', 'Nurture'],
      product: ['Vital', 'Relief', 'Renew', 'Heal', 'Guard', 'Shield', 'Core', 'Care', 'Pure', 'Glow']
    },
    finance: {
      brand: ['Summit', 'Apex', 'Legacy', 'Pinnacle', 'Ascend', 'Prosper', 'Trust', 'Secure', 'Capital', 'Wealth'],
      product: ['Fortify', 'Guard', 'Grow', 'Shield', 'Build', 'Save', 'Invest', 'Secure', 'Yield', 'Profit']
    },
    food: {
      brand: ['Harvest', 'Savor', 'Nourish', 'Feast', 'Organic', 'Fresh', 'Pure', 'Flavor', 'Spice', 'Delight'],
      product: ['Crisp', 'Delicious', 'Tasty', 'Sweet', 'Zesty', 'Fresh', 'Spicy', 'Savory', 'Juicy', 'Rich']
    },
    fashion: {
      brand: ['Luxe', 'Elite', 'Elegant', 'Chic', 'Vogue', 'Glam', 'Refined', 'Couture', 'Sleek', 'Allure'],
      product: ['Velvet', 'Silk', 'Dazzle', 'Shimmer', 'Glow', 'Shine', 'Radiant', 'Lush', 'Plush', 'Smooth']
    }
  };

  // Sample meanings for generated names
  const sampleMeanings = [
    'Represents innovation and forward-thinking',
    'Symbolizes strength and reliability',
    'Evokes feelings of trust and security',
    'Projects an image of quality and excellence',
    'Suggests creativity and uniqueness',
    'Conveys expertise and professionalism',
    'Emphasizes speed and efficiency',
    'Represents growth and positive change',
    'Evokes elegance and sophistication',
    'Conveys a sense of modernity and progress'
  ];

  const generateNames = () => {
    if (!industry) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select an industry.",
      });
      return;
    }

    setGenerating(true);
    setResults([]);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const selectedIndustry = namesByIndustry[industry as keyof typeof namesByIndustry] || namesByIndustry.technology;
        const namePool = selectedIndustry[nameType as keyof typeof selectedIndustry] || selectedIndustry.brand;
        
        const keywordList = keywords.split(',').filter(k => k.trim() !== '');
        
        const generatedResults: NameResult[] = [];
        
        // Generate 5 random name results
        for (let i = 0; i < 5; i++) {
          let name = getRandomElement(namePool);
          
          // If keywords are provided, incorporate one into the name
          if (keywordList.length > 0 && Math.random() > 0.5) {
            const keyword = getRandomElement(keywordList).trim();
            name = Math.random() > 0.5 ? `${name}${keyword}` : `${keyword}${name}`;
          }
          
          generatedResults.push({
            name,
            meaning: getRandomElement(sampleMeanings),
            score: Math.floor(Math.random() * 30) + 70 // Score between 70-99
          });
        }
        
        setResults(generatedResults);
        
        toast({
          title: "Names generated",
          description: "We've created some name suggestions for you.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Generation failed",
          description: "There was a problem generating names. Please try again.",
        });
      } finally {
        setGenerating(false);
      }
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `"${text}" copied to clipboard.`,
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">AI Name Generator</h1>
        <p className="text-muted-foreground mb-8">Generate creative names for brands and products</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 order-2 md:order-1">
            {results.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Names</CardTitle>
                  <CardDescription>Here are some name suggestions for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-card border rounded-lg hover:border-primary transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">{result.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => copyToClipboard(result.name)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {result.meaning && (
                          <p className="text-muted-foreground text-sm mt-1">{result.meaning}</p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-full bg-secondary h-2 rounded-full">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${result.score}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium">{result.score}/100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={generateNames}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Generate More Names
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex flex-col items-center justify-center p-12 h-full">
                <div className="text-center">
                  <div className="bg-primary/10 p-6 rounded-full mb-4 inline-block">
                    <Tag className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Ready to generate names</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill in the form and click "Generate Names" to create name suggestions
                  </p>
                  <Button 
                    onClick={generateNames}
                    disabled={generating}
                    className="flex items-center gap-2"
                  >
                    {generating ? (
                      <>Generating...</>
                    ) : (
                      <>
                        Generate Names
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>
          
          <div className="order-1 md:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Name Settings</CardTitle>
                <CardDescription>Configure your name generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="fashion">Fashion & Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., eco, smart, cloud, quick"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Add relevant keywords to incorporate into the name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Name Type</Label>
                  <RadioGroup 
                    value={nameType} 
                    onValueChange={setNameType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="brand" id="brand" />
                      <Label htmlFor="brand">Brand Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="product" id="product" />
                      <Label htmlFor="product">Product Name</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={generateNames}
                  disabled={generating}
                  className="w-full"
                >
                  {generating ? 'Generating...' : 'Generate Names'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NameGenerator;
