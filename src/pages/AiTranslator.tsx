import React, { useState } from 'react';
import { Globe, ArrowLeft, RefreshCw, Copy, ArrowRight, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

// Define language options
interface Language {
  code: string;
  name: string;
}

const AiTranslator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translating, setTranslating] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  // Language options
  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'tr', name: 'Turkish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'sv', name: 'Swedish' },
    { code: 'pl', name: 'Polish' },
    { code: 'vi', name: 'Vietnamese' },
  ];

  const translateText = () => {
    if (!sourceText.trim()) {
      toast({
        title: 'No text to translate',
        description: 'Please enter some text to translate',
        variant: 'destructive',
      });
      return;
    }

    setTranslating(true);
    setTranslatedText('');

    // In a real implementation, this would call a translation API
    // For this demo, we'll simulate the translation with a delay and mock data
    setTimeout(() => {
      const translated = mockTranslateText(sourceText, sourceLanguage, targetLanguage);
      setTranslatedText(translated);
      
      // Simulate language detection if source language is set to "auto"
      if (sourceLanguage === 'auto') {
        const detected = mockDetectLanguage(sourceText);
        setDetectedLanguage(detected);
      } else {
        setDetectedLanguage(null);
      }
      
      setTranslating(false);
      
      toast({
        title: 'Translation complete',
        description: `Translated from ${getLanguageName(sourceLanguage === 'auto' ? mockDetectLanguage(sourceText) : sourceLanguage)} to ${getLanguageName(targetLanguage)}`,
      });
    }, 1500);
  };

  // Mock translation function
  const mockTranslateText = (text: string, source: string, target: string): string => {
    // Simple mock translations for demo purposes
    const mockTranslations: Record<string, Record<string, string>> = {
      'en': {
        'es': 'Este es un texto traducido al español.',
        'fr': 'Voici du texte traduit en français.',
        'de': 'Dies ist Text, der ins Deutsche übersetzt wurde.',
        'it': 'Questo è un testo tradotto in italiano.',
        'zh': '这是翻译成中文的文本。',
        'ja': 'これは日本語に翻訳されたテキストです。',
        'ru': 'Это текст, переведенный на русский язык.',
        'ar': 'هذا نص مترجم إلى اللغة العربية.',
        'hi': 'यह हिंदी में अनुवादित पाठ है।',
      },
      'es': {
        'en': 'This is text translated into English.',
        'fr': 'Voici du texte traduit en français.',
        'de': 'Dies ist Text, der ins Deutsche übersetzt wurde.',
      },
      'fr': {
        'en': 'This is text translated into English.',
        'es': 'Este es un texto traducido al español.',
        'de': 'Dies ist Text, der ins Deutsche übersetzt wurde.',
      },
    };

    // If we have a mock translation for this language pair, use that
    if (mockTranslations[source]?.[target]) {
      // Add some of the original text to make it seem more custom
      const firstWord = text.split(' ')[0];
      return `${mockTranslations[source][target]} (${firstWord}...)`;
    }
    
    // Otherwise, create a fake translation by manipulating the original text
    return text
      .split('')
      .map(char => {
        if (char === ' ' || /[.,?!;:]/.test(char)) return char;
        // Shift characters based on target language to simulate different scripts
        const code = char.charCodeAt(0);
        const shift = target.charCodeAt(0) % 5;
        return String.fromCharCode(code + shift);
      })
      .join('');
  };

  // Mock language detection
  const mockDetectLanguage = (text: string): string => {
    // Simple language detection simulation based on text characteristics
    if (/[\u0400-\u04FF]/.test(text)) return 'ru'; // Cyrillic
    if (/[\u0600-\u06FF]/.test(text)) return 'ar'; // Arabic
    if (/[\u3040-\u30FF]/.test(text)) return 'ja'; // Japanese
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'; // Chinese
    if (/[àáâäæãåāèéêëēėęîïíīįìôöòóœøōõ]/.test(text)) {
      // Various European languages
      if (/[ñ]/.test(text)) return 'es'; // Spanish
      if (/[ç]/.test(text)) return 'fr'; // French
      if (/[ß]/.test(text)) return 'de'; // German
    }
    return 'en'; // Default to English
  };

  const getLanguageName = (code: string): string => {
    if (code === 'auto') return 'Auto-detect';
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: 'Copied to clipboard',
      description: 'Text has been copied to clipboard',
    });
  };

  const swapLanguages = () => {
    if (sourceLanguage === 'auto') {
      toast({
        title: 'Cannot swap with auto-detect',
        description: 'Please select a specific source language to swap',
        variant: 'destructive',
      });
      return;
    }
    
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    
    // Also swap the text if translation exists
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText(sourceText);
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
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI-powered Translator</h1>
          <p className="text-muted-foreground mt-2">Translate text between multiple languages with AI</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Translate Text</CardTitle>
            <CardDescription>Enter text and select languages for translation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="source-language">Translate from</Label>
                  {detectedLanguage && sourceLanguage === 'auto' && (
                    <span className="text-xs text-muted-foreground">
                      Detected: {getLanguageName(detectedLanguage)}
                    </span>
                  )}
                </div>
                <Select 
                  value={sourceLanguage} 
                  onValueChange={setSourceLanguage}
                >
                  <SelectTrigger id="source-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={`source-${lang.code}`} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Enter text to translate"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[200px]"
                />
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSourceText('')}
                    disabled={!sourceText || translating}
                  >
                    Clear
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(sourceText)}
                    disabled={!sourceText || translating}
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 relative">
                <div className="flex justify-between items-center">
                  <Label htmlFor="target-language">Translate to</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={swapLanguages}
                    className="h-6 w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-20 md:-translate-y-6 md:-translate-x-6 bg-background border shadow-sm"
                    disabled={translating}
                  >
                    <RotateCw className="h-3 w-3" />
                  </Button>
                </div>
                <Select 
                  value={targetLanguage} 
                  onValueChange={setTargetLanguage}
                >
                  <SelectTrigger id="target-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={`target-${lang.code}`} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="bg-muted rounded-md min-h-[200px] p-4 relative">
                  {translating ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : translatedText ? (
                    <p className="whitespace-pre-wrap">{translatedText}</p>
                  ) : (
                    <p className="text-muted-foreground text-center pt-[6rem]">Translation will appear here</p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(translatedText)}
                    disabled={!translatedText || translating}
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
            
            <Button
              onClick={translateText}
              disabled={!sourceText.trim() || translating}
              className="w-full"
            >
              {translating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Translate
                </>
              )}
            </Button>
            
            <div className="text-center text-xs text-muted-foreground">
              <p>For full functionality, this would integrate with APIs like Google Translate or DeepL, which require an API key.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AiTranslator;
