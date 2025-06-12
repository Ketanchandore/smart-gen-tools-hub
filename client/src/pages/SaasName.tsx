
import React, { useState } from 'react';
import { CloudCog, ArrowLeft, RefreshCw, CheckCircle, XCircle, Globe, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface DomainSuggestion {
  name: string;
  domain: string;
  available: boolean;
  price?: string;
}

interface SaaSName {
  name: string;
  description: string;
  domains: DomainSuggestion[];
}

const SaasName = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [industry, setIndustry] = useState('tech');
  const [keywords, setKeywords] = useState('');
  const [domainExtension, setDomainExtension] = useState('.com');
  const [loading, setLoading] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<SaaSName[]>([]);

  const industries = [
    { value: 'tech', label: 'Technology & Software' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'health', label: 'Healthcare & Wellness' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'education', label: 'Education & Learning' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'productivity', label: 'Productivity & Tools' },
  ];

  const extensions = [
    { value: '.com', label: '.com' },
    { value: '.io', label: '.io' },
    { value: '.ai', label: '.ai' },
    { value: '.app', label: '.app' },
    { value: '.tech', label: '.tech' },
    { value: '.co', label: '.co' },
  ];

  const generateNames = () => {
    if (!industry) {
      toast({
        title: "Industry required",
        description: "Please select an industry for your SaaS",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedNames([]);

    // Simulate API call delay
    setTimeout(() => {
      // Generate mock SaaS name suggestions based on industry and keywords
      const mockNames: SaaSName[] = [];
      
      const techPrefixes = ['Cloud', 'Swift', 'Spark', 'Pixel', 'Flux', 'Hyper', 'Meta', 'Cyber', 'Data', 'Quantum'];
      const techSuffixes = ['Scale', 'Flow', 'Logic', 'Sync', 'Hub', 'Base', 'Soft', 'Ware', 'Stack', 'Tech'];
      
      const financePrefixes = ['Pay', 'Cash', 'Money', 'Fin', 'Coin', 'Wealth', 'Bank', 'Asset', 'Profit', 'Capital'];
      const financeSuffixes = ['Wise', 'Smart', 'Flow', 'Track', 'Vault', 'Worth', 'Grow', 'Ledger', 'Cent', 'Fold'];
      
      const healthPrefixes = ['Care', 'Vital', 'Med', 'Health', 'Life', 'Well', 'Cure', 'Bio', 'Heal', 'Wellness'];
      const healthSuffixes = ['Fit', 'Pulse', 'Doc', 'Aid', 'Track', 'Plus', 'Path', 'Guard', 'Mind', 'Body'];

      let prefixes: string[] = [];
      let suffixes: string[] = [];
      
      // Set prefixes and suffixes based on industry
      switch (industry) {
        case 'tech':
          prefixes = techPrefixes;
          suffixes = techSuffixes;
          break;
        case 'finance':
          prefixes = financePrefixes;
          suffixes = financeSuffixes;
          break;
        case 'health':
          prefixes = healthPrefixes;
          suffixes = healthSuffixes;
          break;
        default:
          prefixes = [...techPrefixes, ...financePrefixes].slice(0, 10);
          suffixes = [...techSuffixes, ...financeSuffixes].slice(0, 10);
      }
      
      // Generate names
      for (let i = 0; i < 5; i++) {
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        
        let name = `${randomPrefix}${randomSuffix}`;
        
        // Incorporate keywords if provided
        if (keywords) {
          const keywordsList = keywords.split(',');
          if (keywordsList.length > 0 && Math.random() > 0.5) {
            const keyword = keywordsList[Math.floor(Math.random() * keywordsList.length)].trim();
            name = Math.random() > 0.5 ? 
              `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}${name}` : 
              `${name}${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`;
          }
        }
        
        // Generate domain suggestions
        const domains: DomainSuggestion[] = [
          {
            name: name.toLowerCase(),
            domain: `${name.toLowerCase()}${domainExtension}`,
            available: Math.random() > 0.4, // 60% chance of being available
            price: Math.random() > 0.7 ? `$${Math.floor(Math.random() * 50) + 10}/yr` : undefined
          }
        ];
        
        // Add alternative domains
        const altExtensions = extensions
          .map(ext => ext.value)
          .filter(ext => ext !== domainExtension)
          .slice(0, 2);
          
        altExtensions.forEach(ext => {
          domains.push({
            name: name.toLowerCase(),
            domain: `${name.toLowerCase()}${ext}`,
            available: Math.random() > 0.3, // 70% chance of being available
            price: Math.random() > 0.7 ? `$${Math.floor(Math.random() * 50) + 10}/yr` : undefined
          });
        });
        
        // Generate descriptions based on industry
        let description = '';
        switch (industry) {
          case 'tech':
            description = `A streamlined ${Math.random() > 0.5 ? 'cloud-based' : 'AI-powered'} solution for ${Math.random() > 0.5 ? 'businesses' : 'developers'} to ${Math.random() > 0.5 ? 'automate workflows' : 'enhance productivity'}.`;
            break;
          case 'finance':
            description = `A secure platform for ${Math.random() > 0.5 ? 'businesses' : 'individuals'} to ${Math.random() > 0.5 ? 'manage finances' : 'process payments'} with ease.`;
            break;
          case 'health':
            description = `An intuitive health${Math.random() > 0.5 ? 'care' : 'tech'} solution that helps ${Math.random() > 0.5 ? 'patients' : 'providers'} ${Math.random() > 0.5 ? 'monitor wellness' : 'improve outcomes'}.`;
            break;
          default:
            description = `A versatile SaaS platform designed to streamline operations and boost efficiency.`;
        }
        
        mockNames.push({
          name,
          description,
          domains
        });
      }
      
      setGeneratedNames(mockNames);
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `"${text}" copied to clipboard`,
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
            <CloudCog className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">SaaS Name & Domain Checker</h1>
          <p className="text-muted-foreground mt-2">Generate and check availability of SaaS names and domains</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={industry}
                    onValueChange={setIndustry}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(ind => (
                        <SelectItem key={ind.value} value={ind.value}>
                          {ind.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (Optional)</Label>
                  <Input 
                    id="keywords" 
                    placeholder="e.g., invoice, automation, team"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="extension">Preferred Domain Extension</Label>
                  <Select 
                    value={domainExtension}
                    onValueChange={setDomainExtension}
                  >
                    <SelectTrigger id="extension">
                      <SelectValue placeholder="Select extension" />
                    </SelectTrigger>
                    <SelectContent>
                      {extensions.map(ext => (
                        <SelectItem key={ext.value} value={ext.value}>
                          {ext.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={generateNames}
                disabled={loading}
                className="w-full flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Names...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Generate SaaS Names
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {generatedNames.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Generated SaaS Names</h2>
            
            {generatedNames.map((saasName, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{saasName.name}</h3>
                      <p className="text-muted-foreground mt-1">{saasName.description}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => copyToClipboard(saasName.name)}
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Domain Availability</h4>
                    <div className="space-y-2">
                      {saasName.domains.map((domain, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between p-2 rounded-md bg-muted"
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{domain.domain}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            {domain.price && (
                              <span className="text-sm text-muted-foreground">
                                {domain.price}
                              </span>
                            )}
                            <span className={`flex items-center gap-1 text-sm ${
                              domain.available ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {domain.available ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  Available
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4" />
                                  Taken
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a demo implementation with simulated domain availability. For a real service, domain availability would need to be checked using a domain registrar API.</p>
        </div>
      </div>
    </Layout>
  );
};

export default SaasName;
