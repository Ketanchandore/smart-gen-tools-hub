import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RefreshCw, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Identity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  birthdate: string;
  occupation: string;
  company: string;
}

const FakeIdentity = () => {
  const { toast } = useToast();
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('US');
  
  // List of countries
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IN', name: 'India' },
  ];

  const generateIdentity = () => {
    // Instead of using setLocale, we'll adapt our code to work with faker's API
    // Note: For simplicity, we'll just use the default locale but adjust the data as needed
    
    // Set up specific locales for different countries
    let localeFaker = faker;
    if (selectedCountry === 'DE') {
      localeFaker = faker.helpers.objectValue({ de: faker });
    } else if (selectedCountry === 'FR') {
      localeFaker = faker.helpers.objectValue({ fr: faker });
    }
    
    const firstName = localeFaker.person.firstName();
    const lastName = localeFaker.person.lastName();
    
    const newIdentity: Identity = {
      firstName,
      lastName,
      email: localeFaker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: localeFaker.phone.number(),
      streetAddress: localeFaker.location.streetAddress(),
      city: localeFaker.location.city(),
      zipCode: localeFaker.location.zipCode(),
      country: countries.find(c => c.code === selectedCountry)?.name || selectedCountry,
      birthdate: localeFaker.date.birthdate({ min: 18, max: 65, mode: 'year' }).toLocaleDateString(),
      occupation: localeFaker.person.jobTitle(),
      company: localeFaker.company.name()
    };
    
    setIdentity(newIdentity);
    
    toast({
      title: 'New identity generated',
      description: `Created a fake identity for ${newIdentity.firstName} ${newIdentity.lastName}.`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Text copied to clipboard.',
    });
  };

  const copyFullIdentity = () => {
    if (!identity) return;
    
    const text = Object.entries(identity)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`)
      .join('\n');
    
    navigator.clipboard.writeText(text);
    
    toast({
      title: 'Full identity copied!',
      description: 'All identity details have been copied to clipboard.',
    });
  };

  // Generate an identity when the component mounts or country changes
  useEffect(() => {
    generateIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  if (!identity) return null;

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Fake Identity Generator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generated Identity</CardTitle>
              <CardDescription>Random identity details for testing purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/30 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={copyFullIdentity}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Name</Label>
                        <p className="font-medium">{identity.firstName} {identity.lastName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm break-all">{identity.email}</p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(identity.email)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Phone</Label>
                        <p>{identity.phone}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                        <p>{identity.birthdate}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Occupation</Label>
                        <p>{identity.occupation}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Company</Label>
                        <p>{identity.company}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Street Address</Label>
                        <p>{identity.streetAddress}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">City</Label>
                        <p>{identity.city}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Postal/ZIP Code</Label>
                        <p>{identity.zipCode}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Country</Label>
                        <p>{identity.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={generateIdentity}
                >
                  <RefreshCw className="h-4 w-4" />
                  Generate New Identity
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About This Tool</CardTitle>
              <CardDescription>Information about fake identity generation</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <p>
                This tool generates random identity information for testing purposes only. 
                The data is completely fictional and not associated with real people.
              </p>
              <p>
                <strong>Important:</strong> Do not use this tool for any fraudulent or deceptive purposes. 
                Using fake identities for misrepresentation, fraud, or to bypass verification systems 
                is illegal in most jurisdictions.
              </p>
              <p>
                Use cases for this tool include testing user registration systems, populating 
                databases with test data, and UI/UX prototyping.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FakeIdentity;
