
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CardDetails {
  number: string;
  cvv: string;
  expiry: string;
  name: string;
  type: string;
}

const CARD_TYPES = {
  visa: {
    pattern: [4],
    format: /(\d{4})(\d{4})(\d{4})(\d{4})/
  },
  mastercard: {
    pattern: [51, 52, 53, 54, 55],
    format: /(\d{4})(\d{4})(\d{4})(\d{4})/
  },
  amex: {
    pattern: [34, 37],
    format: /(\d{4})(\d{6})(\d{5})/
  },
  discover: {
    pattern: [6011],
    format: /(\d{4})(\d{4})(\d{4})(\d{4})/
  }
};

const generateRandomName = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson'];
  
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${first} ${last}`;
};

const generateExpiry = () => {
  const currentYear = new Date().getFullYear();
  const month = Math.floor(Math.random() * 12) + 1;
  const year = currentYear + Math.floor(Math.random() * 5) + 1;
  
  return `${month.toString().padStart(2, '0')}/${(year % 100).toString().padStart(2, '0')}`;
};

const generateCVV = (cardType: string) => {
  const length = cardType === 'amex' ? 4 : 3;
  let cvv = '';
  for (let i = 0; i < length; i++) {
    cvv += Math.floor(Math.random() * 10).toString();
  }
  return cvv;
};

// Luhn algorithm for valid card number generation
const generateLuhnNumber = (prefix: number, length: number): string => {
  let cardNumber = prefix.toString();
  
  while (cardNumber.length < length - 1) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }
  
  // Calculate Luhn checksum
  let sum = 0;
  let alt = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let n = parseInt(cardNumber[i], 10);
    
    if (alt) {
      n *= 2;
      if (n > 9) {
        n -= 9;
      }
    }
    
    sum += n;
    alt = !alt;
  }
  
  // Calculate the check digit
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return cardNumber + checkDigit.toString();
};

const CreditCardGenerator = () => {
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState('visa');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    cvv: '',
    expiry: '',
    name: '',
    type: 'visa'
  });

  const generateCard = () => {
    const type = selectedCard;
    const cardType = CARD_TYPES[type as keyof typeof CARD_TYPES];
    
    const prefixIndex = Math.floor(Math.random() * cardType.pattern.length);
    const prefix = cardType.pattern[prefixIndex];
    
    let length = 16;
    if (type === 'amex') {
      length = 15;
    }
    
    const cardNumber = generateLuhnNumber(prefix, length);
    const formattedNumber = cardNumber.replace(cardType.format, '$1 $2 $3 $4');
    
    setCardDetails({
      number: formattedNumber,
      cvv: generateCVV(type),
      expiry: generateExpiry(),
      name: generateRandomName(),
      type
    });

    toast({
      title: 'Card Generated',
      description: 'New test credit card details generated successfully.',
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Card number copied to clipboard.',
    });
  };

  // Generate a card on component mount
  React.useEffect(() => {
    generateCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Credit Card Generator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Test Credit Card</CardTitle>
              <CardDescription>Generated card details for testing purposes only</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 p-6 shadow-lg">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-70">Test Card</span>
                    <span className="text-lg font-bold uppercase">{cardDetails.type}</span>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-mono font-semibold">{cardDetails.number}</span>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(cardDetails.number.replace(/\s/g, ''))}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-xs opacity-70">Card Holder</span>
                      <span className="font-medium">{cardDetails.name}</span>
                    </div>
                    <div>
                      <span className="block text-xs opacity-70">Expires</span>
                      <span className="font-medium">{cardDetails.expiry}</span>
                    </div>
                    <div>
                      <span className="block text-xs opacity-70">CVV</span>
                      <span className="font-medium">{cardDetails.cvv}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Options</CardTitle>
              <CardDescription>Select a card type to generate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={selectedCard}
                onValueChange={setSelectedCard}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visa" id="visa" />
                  <Label htmlFor="visa">Visa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mastercard" id="mastercard" />
                  <Label htmlFor="mastercard">Mastercard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amex" id="amex" />
                  <Label htmlFor="amex">American Express</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discover" id="discover" />
                  <Label htmlFor="discover">Discover</Label>
                </div>
              </RadioGroup>

              <Button
                className="w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-2"
                onClick={generateCard}
              >
                <RefreshCw className="h-4 w-4" />
                Generate New Card
              </Button>

              <div className="text-sm text-muted-foreground">
                <p>Note: These cards are generated using the Luhn algorithm and are for testing purposes only. 
                   They are not real credit cards and cannot be used for actual purchases.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreditCardGenerator;
