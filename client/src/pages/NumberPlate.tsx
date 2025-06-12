
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RefreshCw, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Define types for country formats and regions
interface CountryFormat {
  code: string;
  name: string;
  formats: {
    type: string;
    format: string;
    example: string;
    generate: () => string;
  }[];
}

const NumberPlate = () => {
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedFormat, setSelectedFormat] = useState('0');
  const [generatedPlate, setGeneratedPlate] = useState('');

  // Define country formats
  const countryFormats: CountryFormat[] = [
    {
      code: 'IN',
      name: 'India',
      formats: [
        {
          type: 'Standard',
          format: 'AA-00-AA-0000',
          example: 'DL-01-AB-1234',
          generate: () => {
            const regions = ['DL', 'MH', 'KA', 'TN', 'AP', 'GJ', 'HR', 'UP', 'RJ', 'MP'];
            const region = regions[Math.floor(Math.random() * regions.length)];
            const district = Math.floor(Math.random() * 99).toString().padStart(2, '0');
            const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'; // Omitting I, O, Q
            const letter1 = letters[Math.floor(Math.random() * letters.length)];
            const letter2 = letters[Math.floor(Math.random() * letters.length)];
            const number = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
            
            return `${region}-${district}-${letter1}${letter2}-${number}`;
          }
        },
        {
          type: 'Commercial',
          format: 'AA-00-A-0000',
          example: 'HR-55-C-7890',
          generate: () => {
            const regions = ['DL', 'MH', 'KA', 'TN', 'AP', 'GJ', 'HR', 'UP', 'RJ', 'MP'];
            const region = regions[Math.floor(Math.random() * regions.length)];
            const district = Math.floor(Math.random() * 99).toString().padStart(2, '0');
            const letter = ['C', 'T', 'P'][Math.floor(Math.random() * 3)]; // Commercial, Transport, Passenger
            const number = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
            
            return `${region}-${district}-${letter}-${number}`;
          }
        }
      ]
    },
    {
      code: 'US',
      name: 'United States',
      formats: [
        {
          type: 'California',
          format: '0AAA000',
          example: '7ABC123',
          generate: () => {
            const number1 = Math.floor(Math.random() * 9) + 1; // 1-9
            const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'; // Omitting I, O, Q
            let plateLetters = '';
            for (let i = 0; i < 3; i++) {
              plateLetters += letters[Math.floor(Math.random() * letters.length)];
            }
            const number2 = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            
            return `${number1}${plateLetters}${number2}`;
          }
        },
        {
          type: 'New York',
          format: 'AAA-0000',
          example: 'ABC-1234',
          generate: () => {
            const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'; // Omitting I, O, Q
            let plateLetters = '';
            for (let i = 0; i < 3; i++) {
              plateLetters += letters[Math.floor(Math.random() * letters.length)];
            }
            const number = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            
            return `${plateLetters}-${number}`;
          }
        }
      ]
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      formats: [
        {
          type: 'Modern',
          format: 'AA00 AAA',
          example: 'AB12 CDE',
          generate: () => {
            const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'; // Omitting I, O, Q
            const letter1 = letters[Math.floor(Math.random() * letters.length)];
            const letter2 = letters[Math.floor(Math.random() * letters.length)];
            
            // Year code (01-99)
            const year = Math.floor(Math.random() * 99).toString().padStart(2, '0');
            
            let suffix = '';
            for (let i = 0; i < 3; i++) {
              suffix += letters[Math.floor(Math.random() * letters.length)];
            }
            
            return `${letter1}${letter2}${year} ${suffix}`;
          }
        },
        {
          type: 'Northern Ireland',
          format: 'AAA 000',
          example: 'AXI 123',
          generate: () => {
            const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'; // Omitting I, O, Q
            let prefix = '';
            for (let i = 0; i < 3; i++) {
              prefix += letters[Math.floor(Math.random() * letters.length)];
            }
            
            const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            
            return `${prefix} ${number}`;
          }
        }
      ]
    }
  ];

  // Find the current country object
  const getCurrentCountry = (): CountryFormat => {
    return countryFormats.find(country => country.code === selectedCountry) || countryFormats[0];
  };

  // Generate a plate based on the selected country and format
  const generatePlate = () => {
    const country = getCurrentCountry();
    const format = parseInt(selectedFormat, 10);
    
    if (country && country.formats[format]) {
      const newPlate = country.formats[format].generate();
      setGeneratedPlate(newPlate);
      
      toast({
        title: 'Plate Generated',
        description: `Generated a ${country.name} ${country.formats[format].type} plate.`,
      });
    }
  };

  // Copy the generated plate to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPlate);
    toast({
      title: 'Plate Copied!',
      description: 'The license plate has been copied to your clipboard.',
    });
  };

  // Handle country change - reset format selection
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedFormat('0'); // Reset to first format
  };

  // Generate a plate on component mount or when country/format changes
  useEffect(() => {
    generatePlate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedFormat]);

  // Get current country
  const currentCountry = getCurrentCountry();

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Vehicle Number Plate Generator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generated Number Plate</CardTitle>
              <CardDescription>Random vehicle license plate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <div className="relative bg-white p-6 rounded-md border-2 border-gray-800 min-w-[200px]">
                  <div className="text-center text-black font-bold text-2xl">{generatedPlate}</div>
                  {currentCountry.code === 'IN' && (
                    <div className="absolute top-1 left-1 text-[8px] font-bold text-black">IND</div>
                  )}
                  {currentCountry.code === 'GB' && (
                    <div className="absolute top-1 left-1 w-6 h-3 bg-blue-600 flex items-center justify-center">
                      <div className="text-[6px] font-bold text-white">GB</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                  Copy Plate Number
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plate Options</CardTitle>
              <CardDescription>Customize your license plate generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryFormats.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Plate Format</Label>
                <RadioGroup 
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                  className="flex flex-col space-y-2"
                >
                  {currentCountry.formats.map((format, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`format-${index}`} />
                      <Label htmlFor={`format-${index}`}>
                        {format.type} ({format.example})
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-2"
                onClick={generatePlate}
              >
                <RefreshCw className="h-4 w-4" />
                Generate New Plate
              </Button>

              <div className="text-sm text-muted-foreground">
                <p>Note: These generated license plates are for testing and educational purposes only. 
                   They follow the general format used in each country but may not represent valid plates.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NumberPlate;
