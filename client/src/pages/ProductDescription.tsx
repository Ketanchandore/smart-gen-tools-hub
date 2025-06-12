
import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Sparkles, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

type ToneOption = 'professional' | 'friendly' | 'enthusiastic' | 'luxury';
type LengthOption = 'short' | 'medium' | 'long';

interface ProductInfo {
  name: string;
  category: string;
  features: string;
  targetAudience: string;
}

const ProductDescription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [tone, setTone] = useState<ToneOption>('professional');
  const [length, setLength] = useState<LengthOption>('medium');
  
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: '',
    category: '',
    features: '',
    targetAudience: '',
  });

  const handleInputChange = (field: keyof ProductInfo, value: string) => {
    setProductInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDescription = () => {
    // Validate inputs
    if (!productInfo.name || !productInfo.category || !productInfo.features) {
      toast({
        title: "Missing information",
        description: "Please fill in the product name, category and features",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate description generation with a delay
    setTimeout(() => {
      const descriptions = {
        professional: {
          short: `Introducing ${productInfo.name}, the premium solution in ${productInfo.category}. Featuring ${productInfo.features.split(',')[0]}, our product delivers exceptional performance for ${productInfo.targetAudience || 'our customers'}.`,
          
          medium: `Introducing the innovative ${productInfo.name}, a groundbreaking addition to our ${productInfo.category} lineup. This product features ${productInfo.features.split(',').join(' and ')}, designed specifically for ${productInfo.targetAudience || 'discerning customers'} seeking quality and reliability. Elevate your experience with our meticulously engineered solution.`,
          
          long: `We're proud to present ${productInfo.name}, the next evolution in ${productInfo.category} technology. This professionally crafted product offers unparalleled performance through its key features: ${productInfo.features.split(',').join(', ')}. Designed with ${productInfo.targetAudience || 'our valued customers'} in mind, ${productInfo.name} delivers consistent results in every situation. Our team of experts has meticulously engineered each component to ensure maximum efficiency, durability, and user satisfaction. Experience the difference that professional-grade quality makes with ${productInfo.name} - setting a new standard in the industry.`
        },
        
        friendly: {
          short: `Say hello to ${productInfo.name}! This awesome ${productInfo.category} comes with ${productInfo.features.split(',')[0]} that you'll absolutely love. Perfect for ${productInfo.targetAudience || 'you and your friends'}!`,
          
          medium: `Hey there! Meet ${productInfo.name}, your new favorite ${productInfo.category}! We've packed it with amazing features like ${productInfo.features.split(',').join(' and ')} that make life so much easier. Whether you're ${productInfo.targetAudience || 'a busy bee or just looking for something fun'}, our product is here to brighten your day!`,
          
          long: `Hey friends! We're super excited to introduce you to ${productInfo.name}, the coolest new ${productInfo.category} around! We've put our hearts into creating something you'll truly love, with awesome features including ${productInfo.features.split(',').join(', ')}. Perfect for ${productInfo.targetAudience || 'anyone wanting to add some joy to their life'}, this product is all about making your experience better and more fun! We've thought of everything you might need and wrapped it up in one fantastic package. Give ${productInfo.name} a try - we just know you'll be telling all your friends about it!`
        },
        
        enthusiastic: {
          short: `AMAZING! ${productInfo.name} is the REVOLUTIONARY ${productInfo.category} featuring the INCREDIBLE ${productInfo.features.split(',')[0]}! PERFECT for ${productInfo.targetAudience || 'EVERYONE'}!`,
          
          medium: `WOW! Get ready to be BLOWN AWAY by ${productInfo.name} – the GAME-CHANGING ${productInfo.category} that's taking the market by STORM! Packed with INCREDIBLE features like ${productInfo.features.split(',').join(' and ')}, it's EXACTLY what ${productInfo.targetAudience || 'you'} have been WAITING FOR!`,
          
          long: `INCREDIBLE! REVOLUTIONARY! MIND-BLOWING! Introducing ${productInfo.name}, the ABSOLUTE BEST ${productInfo.category} that will TRANSFORM your life! We're THRILLED to bring you this EXCEPTIONAL product loaded with AMAZING features: ${productInfo.features.split(',').join(', ')}! PERFECTLY designed for ${productInfo.targetAudience || 'our WONDERFUL customers'}, this product will EXCEED your wildest expectations! Every detail has been METICULOUSLY crafted to deliver an UNPARALLELED experience that will leave you SPEECHLESS! Don't miss your chance to own the PHENOMENAL ${productInfo.name} – it's not just a purchase, it's a LIFE-CHANGING DECISION!`
        },
        
        luxury: {
          short: `Indulge in the exquisite ${productInfo.name}, the epitome of luxury in ${productInfo.category}. Meticulously crafted with ${productInfo.features.split(',')[0]}, exclusively for ${productInfo.targetAudience || 'the discerning few'}.`,
          
          medium: `Discover ${productInfo.name}, where luxury meets innovation in the world of ${productInfo.category}. This exceptional creation features ${productInfo.features.split(',').join(' and ')}, crafted for ${productInfo.targetAudience || 'those who demand nothing but the finest'}. Elevate your lifestyle with our distinguished offering.`,
          
          long: `Presenting ${productInfo.name}, a masterpiece in the realm of luxury ${productInfo.category}. This exquisite creation embodies perfection through its distinguished features: ${productInfo.features.split(',').join(', ')}. Meticulously crafted for ${productInfo.targetAudience || 'the most discerning connoisseurs'}, ${productInfo.name} transcends ordinary expectations to deliver an experience of unprecedented refinement. Every element has been thoughtfully curated by our master artisans, ensuring unparalleled quality and sophistication. ${productInfo.name} isn't merely a product—it's a statement of distinction, an heirloom of impeccable taste that sets you apart from the ordinary. Indulge in the extraordinary.`
        }
      };

      // Get the generated description based on tone and length
      const description = descriptions[tone][length];
      setGeneratedDescription(description);
      setLoading(false);
      
      toast({
        title: "Description generated",
        description: "Your product description is ready!",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription);
    toast({
      title: "Copied!",
      description: "Description copied to clipboard",
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
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Product Description Generator</h1>
          <p className="text-muted-foreground mt-2">Create compelling product descriptions for e-commerce</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Product Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input 
                  id="product-name" 
                  placeholder="e.g. UltraGlow Face Serum"
                  value={productInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-category">Product Category</Label>
                <Input 
                  id="product-category" 
                  placeholder="e.g. Skincare, Electronics, Home Decor"
                  value={productInfo.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-features">Key Features (comma separated)</Label>
                <Textarea 
                  id="product-features" 
                  placeholder="e.g. vitamin C infusion, hydration boost, anti-aging compounds"
                  value={productInfo.features}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience (optional)</Label>
                <Input 
                  id="target-audience" 
                  placeholder="e.g. women aged 25-40, tech enthusiasts"
                  value={productInfo.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select 
                    value={tone}
                    onValueChange={(value) => setTone(value as ToneOption)}
                  >
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Select 
                    value={length}
                    onValueChange={(value) => setLength(value as LengthOption)}
                  >
                    <SelectTrigger id="length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 flex items-center gap-2"
                onClick={generateDescription}
                disabled={loading}
              >
                {loading ? "Generating..." : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Description
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Description</h2>
                {generatedDescription && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                )}
              </div>
              
              <div className="bg-muted p-4 rounded-md min-h-[300px] whitespace-pre-wrap">
                {generatedDescription || "Your generated product description will appear here..."}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDescription;
