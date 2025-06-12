
import React, { useState } from 'react';
import { StickyNote, Plus, X, Download, Copy, Save } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const FlashcardGenerator = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string; }[]>([]);
  const [selectedTab, setSelectedTab] = useState('create');
  const [currentCard, setCurrentCard] = useState(0);
  const [customFlashcards, setCustomFlashcards] = useState<{ question: string; answer: string; }[]>([
    { question: '', answer: '' }
  ]);

  const generateFlashcards = async () => {
    if (!topic && !content) {
      toast({
        title: "Missing information",
        description: "Please provide either a topic or content to generate flashcards.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call with a timeout - in a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example generated flashcards
      const generatedCards = [
        {
          question: "What is the process of photosynthesis?",
          answer: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water, generating oxygen as a byproduct."
        },
        {
          question: "What are the main components needed for photosynthesis?",
          answer: "The main components needed for photosynthesis are: sunlight, chlorophyll, water, and carbon dioxide."
        },
        {
          question: "Where does photosynthesis occur in plant cells?",
          answer: "Photosynthesis primarily occurs in the chloroplasts, specifically in the thylakoid membranes."
        },
        {
          question: "What is the chemical equation for photosynthesis?",
          answer: "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂"
        },
        {
          question: "What are the two main stages of photosynthesis?",
          answer: "The two main stages are the light-dependent reactions (light reactions) and the light-independent reactions (Calvin cycle)."
        }
      ];
      
      setFlashcards(generatedCards);
      setSelectedTab('view');
      
      toast({
        title: "Flashcards generated!",
        description: `Created ${generatedCards.length} flashcards for your study session.`,
      });
    } catch (error) {
      toast({
        title: "Error generating flashcards",
        description: "There was a problem generating your flashcards. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomCardChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedCards = [...customFlashcards];
    updatedCards[index][field] = value;
    setCustomFlashcards(updatedCards);
  };

  const addCustomCard = () => {
    setCustomFlashcards([...customFlashcards, { question: '', answer: '' }]);
  };

  const removeCustomCard = (index: number) => {
    if (customFlashcards.length > 1) {
      const updatedCards = customFlashcards.filter((_, i) => i !== index);
      setCustomFlashcards(updatedCards);
    }
  };

  const saveCustomCards = () => {
    const validCards = customFlashcards.filter(card => card.question.trim() && card.answer.trim());
    
    if (validCards.length === 0) {
      toast({
        title: "No valid flashcards",
        description: "Please add at least one flashcard with both question and answer.",
        variant: "destructive"
      });
      return;
    }
    
    setFlashcards(validCards);
    setSelectedTab('view');
    toast({
      title: "Flashcards saved!",
      description: `Created ${validCards.length} flashcards for your study session.`,
    });
  };

  const handleNextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleCopyFlashcards = () => {
    const text = flashcards.map((card, i) => 
      `Card ${i + 1}:\nQuestion: ${card.question}\nAnswer: ${card.answer}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "All flashcards have been copied to your clipboard.",
    });
  };

  const handleDownloadFlashcards = () => {
    const text = flashcards.map((card, i) => 
      `Card ${i + 1}:\nQuestion: ${card.question}\nAnswer: ${card.answer}\n\n`
    ).join('');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your flashcards are being downloaded as a text file.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <StickyNote className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">AI Flashcard Generator</h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Create study flashcards from your content or generate them automatically based on topics. 
          Use them to boost your learning efficiency.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs 
          defaultValue="create" 
          value={selectedTab} 
          onValueChange={setSelectedTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="create">AI Generator</TabsTrigger>
            <TabsTrigger value="custom">Create Custom</TabsTrigger>
            <TabsTrigger value="view" disabled={flashcards.length === 0}>View Cards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Topic</label>
                    <Input 
                      placeholder="Enter a topic (e.g., Photosynthesis, World War II, Machine Learning)" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Content (optional - paste text to generate flashcards from)
                    </label>
                    <Textarea 
                      placeholder="Paste content here to generate flashcards..." 
                      className="min-h-[200px]"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={generateFlashcards} 
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate Flashcards"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {customFlashcards.map((card, index) => (
                    <div key={index} className="p-4 border rounded-lg relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2" 
                        onClick={() => removeCustomCard(index)}
                        disabled={customFlashcards.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Question</label>
                          <Input 
                            placeholder="Enter question..." 
                            value={card.question}
                            onChange={(e) => handleCustomCardChange(index, 'question', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Answer</label>
                          <Textarea 
                            placeholder="Enter answer..." 
                            value={card.answer}
                            onChange={(e) => handleCustomCardChange(index, 'answer', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={addCustomCard}>
                      <Plus className="h-4 w-4 mr-2" /> Add Card
                    </Button>
                    
                    <Button onClick={saveCustomCards}>
                      <Save className="h-4 w-4 mr-2" /> Save Flashcards
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="view" className="space-y-6">
            {flashcards.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">
                    Card {currentCard + 1} of {flashcards.length}
                  </p>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={handleCopyFlashcards}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownloadFlashcards}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Card className="relative min-h-[300px]">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Question:</h3>
                        <p>{flashcards[currentCard].question}</p>
                      </div>
                      
                      <div className="bg-accent/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Answer:</h3>
                        <p>{flashcards[currentCard].answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevCard} 
                    disabled={currentCard === 0}
                  >
                    Previous Card
                  </Button>
                  
                  <Button 
                    onClick={handleNextCard} 
                    disabled={currentCard === flashcards.length - 1}
                  >
                    Next Card
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FlashcardGenerator;
