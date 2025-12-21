
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoremIpsum = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number[]>([3]);
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [generatedText, setGeneratedText] = useState('');

  // Lorem ipsum dictionary
  const lorem = {
    words: [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
      'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
      'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate', 'velit',
      'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
      'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui',
      'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ],
  };

  // Generate a random word from the lorem ipsum dictionary
  const getRandomWord = () => {
    return lorem.words[Math.floor(Math.random() * lorem.words.length)];
  };

  // Generate a random sentence with a random number of words
  const generateSentence = () => {
    const sentenceLength = Math.floor(Math.random() * 10) + 5; // 5-15 words
    let sentence = getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1);
    
    for (let i = 1; i < sentenceLength; i++) {
      sentence += ' ' + getRandomWord();
    }
    
    return sentence + '.';
  };

  // Generate a paragraph with a random number of sentences
  const generateParagraph = () => {
    const paragraphLength = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
    let paragraph = '';
    
    for (let i = 0; i < paragraphLength; i++) {
      paragraph += generateSentence() + ' ';
    }
    
    return paragraph.trim();
  };

  // Generate lorem ipsum text based on unit and amount
  const generate = () => {
    let text = '';
    
    switch (unit) {
      case 'words':
        const words = [];
        for (let i = 0; i < amount[0]; i++) {
          words.push(getRandomWord());
        }
        text = words.join(' ');
        // Capitalize first letter
        text = text.charAt(0).toUpperCase() + text.slice(1);
        break;
      
      case 'sentences':
        const sentences = [];
        for (let i = 0; i < amount[0]; i++) {
          sentences.push(generateSentence());
        }
        text = sentences.join(' ');
        break;
      
      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < amount[0]; i++) {
          paragraphs.push(generateParagraph());
        }
        text = paragraphs.join('\n\n');
        break;
    }
    
    setGeneratedText(text);
    
    toast({
      title: 'Text Generated',
      description: `Generated ${amount[0]} ${unit}.`,
    });
  };

  // Copy the generated text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: 'Text Copied!',
      description: 'Lorem ipsum text copied to clipboard.',
    });
  };

  // Generate text on component mount
  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate text when unit or amount changes
  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, amount]);

  const maxRange = {
    words: 100,
    sentences: 20,
    paragraphs: 10
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Lorem Ipsum Generator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generate Lorem Ipsum</CardTitle>
              <CardDescription>Create placeholder text for your designs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup 
                defaultValue="paragraphs" 
                value={unit}
                onValueChange={(value) => setUnit(value as 'paragraphs' | 'sentences' | 'words')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paragraphs" id="paragraphs" />
                  <Label htmlFor="paragraphs">Paragraphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sentences" id="sentences" />
                  <Label htmlFor="sentences">Sentences</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="words" id="words" />
                  <Label htmlFor="words">Words</Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Amount: {amount[0]} {unit}</Label>
                </div>
                <Slider
                  min={1}
                  max={maxRange[unit]}
                  step={1}
                  value={amount}
                  onValueChange={setAmount}
                />
              </div>
              
              <div className="relative">
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-secondary/30 p-4 rounded-md max-h-[300px] overflow-y-auto">
                  <div className="whitespace-pre-line">
                    {generatedText}
                  </div>
                </div>
              </div>

              <Button onClick={generate} className="w-full bg-gradient-to-r from-primary to-accent">
                Generate New Text
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Lorem Ipsum</CardTitle>
              <CardDescription>Why use placeholder text?</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <p>
                Lorem ipsum text is commonly used as placeholder text in design, typography, and publishing. 
                It mimics the appearance of real text without distracting with actual content.
              </p>
              <p>
                The Lorem Ipsum text has roots in a piece of classical Latin literature from 45 BC, making it 
                over 2000 years old. It has been the standard dummy text in the printing industry since the 1500s.
              </p>
              <p>
                Use this text for mockups, design prototypes, or anywhere you need placeholder content 
                that looks realistic but doesn't distract with actual meaning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoremIpsum;
