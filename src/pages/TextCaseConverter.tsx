
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileText, ArrowUp, ArrowDown, Pencil, PenLine } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ToolSEO from '@/components/ToolSEO';

const TextCaseConverter = () => {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [selectedTab, setSelectedTab] = useState('uppercase');

  const faqData = [
    {
      question: "What is a text case converter?",
      answer: "A text case converter is a tool that changes the capitalization of text. It can convert text to uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and more."
    },
    {
      question: "How do I convert text to uppercase?",
      answer: "Simply paste your text into the input field, select the 'Uppercase' tab, and click Convert. All letters will be converted to capital letters (e.g., 'hello' becomes 'HELLO')."
    },
    {
      question: "What's the difference between camelCase and PascalCase?",
      answer: "camelCase starts with a lowercase letter (e.g., 'userName'), while PascalCase starts with an uppercase letter (e.g., 'UserName'). Both remove spaces and capitalize subsequent words."
    },
    {
      question: "Can I convert programming variable names?",
      answer: "Yes! Use camelCase for JavaScript/Java variables, PascalCase for class names, snake_case for Python/Ruby, and kebab-case for CSS classes and URLs."
    }
  ];

  const handleConvert = () => {
    if (!text.trim()) {
      toast({
        title: 'No text to convert',
        description: 'Please enter some text first',
      });
      return;
    }

    let convertedText = '';

    switch (selectedTab) {
      case 'uppercase':
        convertedText = text.toUpperCase();
        break;
      case 'lowercase':
        convertedText = text.toLowerCase();
        break;
      case 'titlecase':
        convertedText = text.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        break;
      case 'capitalizeFirst':
        convertedText = text.charAt(0).toUpperCase() + text.slice(1);
        break;
      case 'sentencecase':
        convertedText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'camelcase':
        convertedText = text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
          .replace(/^(.)/, c => c.toLowerCase());
        break;
      case 'pascalcase':
        convertedText = text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
          .replace(/^(.)/, c => c.toUpperCase());
        break;
      case 'snakecase':
        convertedText = text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '_');
        break;
      case 'kebabcase':
        convertedText = text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-');
        break;
      case 'togglecase':
        convertedText = text.split('').map(c => {
          return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
        }).join('');
        break;
      default:
        convertedText = text;
    }

    setResult(convertedText);
    
    toast({
      title: 'Text converted',
      description: `Converted to ${selectedTab} successfully`,
    });
  };

  const copyToClipboard = () => {
    if (!result.trim()) {
      toast({
        title: 'Nothing to copy',
        description: 'Convert some text first',
      });
      return;
    }

    navigator.clipboard.writeText(result);
    
    toast({
      title: 'Copied to clipboard',
      description: 'The converted text has been copied to your clipboard',
    });
  };

  const clearText = () => {
    setText('');
    setResult('');
  };

  return (
    <>
      <ToolSEO
        title="Text Case Converter - Change Text Case Online Free"
        description="Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more. Free online text case converter tool for all your text transformation needs."
        keywords="text case converter, uppercase converter, lowercase converter, title case, camelCase, PascalCase, snake_case, kebab-case, text transformer"
        toolName="Text Case Converter"
        toolType="Converter"
        category="Text Tools"
        features={[
          "10+ case conversion types",
          "Uppercase and lowercase",
          "Title case and sentence case",
          "camelCase and PascalCase",
          "snake_case and kebab-case",
          "Instant conversion"
        ]}
        faqSchema={faqData}
      />
      <Layout>
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Text Case Converter</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more formats instantly.
            </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>Enter or paste the text you want to convert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  className="min-h-[120px]" 
                  placeholder="Type or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearText}>
                    Clear
                  </Button>
                  <Button onClick={handleConvert} className="bg-primary">
                    Convert Text
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Case Format</CardTitle>
              <CardDescription>Choose how you want to convert your text</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="uppercase" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
                  <TabsTrigger value="uppercase">UPPER</TabsTrigger>
                  <TabsTrigger value="lowercase">lower</TabsTrigger>
                  <TabsTrigger value="titlecase">Title Case</TabsTrigger>
                  <TabsTrigger value="sentencecase">Sentence case</TabsTrigger>
                  <TabsTrigger value="togglecase">tOGGLE cASE</TabsTrigger>
                </TabsList>
                <TabsList className="grid grid-cols-2 md:grid-cols-5">
                  <TabsTrigger value="camelcase">camelCase</TabsTrigger>
                  <TabsTrigger value="pascalcase">PascalCase</TabsTrigger>
                  <TabsTrigger value="snakecase">snake_case</TabsTrigger>
                  <TabsTrigger value="kebabcase">kebab-case</TabsTrigger>
                  <TabsTrigger value="capitalizeFirst">Capital first</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Your converted text will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/30 p-4 min-h-[120px] rounded-md whitespace-pre-wrap">
                  {result || <span className="text-muted-foreground">Converted text will appear here...</span>}
                </div>
                <div className="flex justify-end">
                  <Button onClick={copyToClipboard} className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default TextCaseConverter;
