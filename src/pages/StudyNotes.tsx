
import React, { useState } from 'react';
import { BookOpen, FileText, Copy, Download, RefreshCcw, ListChecks, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface StudyNote {
  title: string;
  summary: string;
  keyPoints: string[];
  definitions: { term: string; definition: string }[];
  questions: string[];
}

const StudyNotes = () => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [noteType, setNoteType] = useState('comprehensive');
  const [includeQuestions, setIncludeQuestions] = useState(true);
  const [includeDefinitions, setIncludeDefinitions] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<StudyNote | null>(null);
  const [activeTab, setActiveTab] = useState('input');

  // Helper function to extract a title from content
  const extractTitle = (text: string): string => {
    const lines = text.split('\n');
    let title = lines[0].trim();
    
    // If the first line is too long, it's probably not a title
    if (title.length > 100) {
      // Use the first few words as the title
      return title.substring(0, 50) + '...';
    }
    
    // Remove common title patterns like "Chapter 1:" or "1."
    title = title.replace(/^(chapter|section|part)\s+\d+[:.]\s*/i, '');
    title = title.replace(/^\d+[:.]\s*/, '');
    
    return title;
  };

  // Helper function to generate a summary from text
  const generateSummary = (text: string): string => {
    // In a real application, this would use an AI model
    // For this demo, we'll create a simple summary
    
    // Get the first paragraph that's longer than 100 characters
    const paragraphs = text.split('\n\n');
    let summary = '';
    
    for (const paragraph of paragraphs) {
      if (paragraph.length > 100) {
        summary = paragraph.slice(0, 300);
        if (summary.length < paragraph.length) {
          summary += '...';
        }
        break;
      }
    }
    
    // If no suitable paragraph was found, take the first 300 characters
    if (!summary && text.length > 0) {
      summary = text.slice(0, 300) + '...';
    }
    
    return summary;
  };

  // Helper function to extract key points from text
  const extractKeyPoints = (text: string): string[] => {
    // In a real application, this would use an AI model
    // For this demo, we'll create simple key points
    
    // Look for bullet points or numbered lists
    const lines = text.split('\n');
    const keyPointLines = lines.filter(line => 
      line.trim().match(/^[\-\*•]|\d+\./) || 
      line.includes('important') || 
      line.includes('key') ||
      line.includes('critical') ||
      line.includes('essential')
    );
    
    // Clean up the key points
    let keyPoints = keyPointLines.map(line => 
      line.trim().replace(/^[\-\*•]|\d+\./, '').trim()
    );
    
    // If we didn't find enough key points, generate some based on sentences
    if (keyPoints.length < 3) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      keyPoints = sentences
        .filter(s => 
          s.includes('important') || 
          s.includes('significant') || 
          s.includes('must') ||
          s.includes('should') ||
          s.includes('key')
        )
        .map(s => s.trim())
        .slice(0, 5);
    }
    
    // If we still don't have enough, just take some sentences
    if (keyPoints.length < 3) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      const additionalPoints = sentences
        .filter(s => s.length > 40 && s.length < 200)
        .map(s => s.trim())
        .slice(0, 5 - keyPoints.length);
      
      keyPoints = [...keyPoints, ...additionalPoints];
    }
    
    // Return up to 5 key points
    return keyPoints.slice(0, 5).filter(kp => kp.length > 0);
  };

  // Helper function to extract definitions from text
  const extractDefinitions = (text: string): { term: string; definition: string }[] => {
    // In a real application, this would use an AI model
    // For this demo, we'll create simple definitions
    
    const definitions: { term: string; definition: string }[] = [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    // Look for definition patterns like "X is Y" or "X refers to Y"
    for (const sentence of sentences) {
      const isDefinition = sentence.match(/\s(is|are|refers to|defined as|means)\s/i);
      if (isDefinition) {
        const parts = sentence.split(isDefinition[0], 2);
        if (parts.length === 2 && parts[0].length < 50) {
          definitions.push({
            term: parts[0].trim().replace(/^(the|a|an)\s+/i, ''),
            definition: parts[1].trim()
          });
        }
      }
    }
    
    // Deduplicate terms
    const uniqueDefinitions = definitions.filter((def, index, self) =>
      index === self.findIndex(d => d.term === def.term)
    );
    
    // Return up to 5 definitions
    return uniqueDefinitions.slice(0, 5);
  };

  // Helper function to generate study questions
  const generateQuestions = (text: string): string[] => {
    // In a real application, this would use an AI model
    // For this demo, we'll create simple questions
    
    const keyPoints = extractKeyPoints(text);
    const questions: string[] = [];
    
    // Generate questions based on key points
    for (const point of keyPoints) {
      if (point.includes('because') || point.includes('due to')) {
        const parts = point.split(/(because|due to)/i, 2);
        if (parts.length > 1) {
          questions.push(`Why ${parts[0].toLowerCase().trim()}?`);
        }
      } else if (point.match(/\b(what|how|why|when|where|who|which)\b/i)) {
        // If the point already has a question word, convert it to a question
        questions.push(point.trim().replace(/[.!?]+$/, '?'));
      } else {
        // Generate a generic "what" question
        questions.push(`What is meant by "${point.trim().replace(/[.!?]+$/, '')}"?`);
      }
    }
    
    // If we don't have enough questions, generate some based on the title and summary
    if (questions.length < 3 && generatedNote) {
      questions.push(`What are the main components of ${generatedNote.title}?`);
      questions.push(`How would you summarize the key concepts of ${generatedNote.title}?`);
      questions.push(`Why is studying ${generatedNote.title} important?`);
    }
    
    // Return up to 5 questions
    return questions.slice(0, 5);
  };

  const handleGenerateNotes = () => {
    if (content.trim().length < 50) {
      toast({
        variant: "destructive",
        title: "Not enough content",
        description: "Please provide more content to generate meaningful study notes.",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedNote(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const title = extractTitle(content);
        const summary = generateSummary(content);
        const keyPoints = extractKeyPoints(content);
        
        let definitions: { term: string; definition: string }[] = [];
        if (includeDefinitions) {
          definitions = extractDefinitions(content);
        }
        
        let questions: string[] = [];
        if (includeQuestions) {
          questions = generateQuestions(content);
        }
        
        const note: StudyNote = {
          title,
          summary,
          keyPoints,
          definitions,
          questions
        };
        
        setGeneratedNote(note);
        setActiveTab('output');
        
        toast({
          title: "Notes generated!",
          description: "Your study notes have been created successfully.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Generation failed",
          description: "There was a problem generating your study notes. Please try again.",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const downloadNotes = () => {
    if (!generatedNote) return;
    
    let notesText = `# ${generatedNote.title}\n\n`;
    notesText += `## Summary\n${generatedNote.summary}\n\n`;
    
    notesText += `## Key Points\n`;
    generatedNote.keyPoints.forEach((point, index) => {
      notesText += `${index + 1}. ${point}\n`;
    });
    notesText += '\n';
    
    if (generatedNote.definitions.length > 0) {
      notesText += `## Definitions\n`;
      generatedNote.definitions.forEach(({ term, definition }) => {
        notesText += `- **${term}**: ${definition}\n`;
      });
      notesText += '\n';
    }
    
    if (generatedNote.questions.length > 0) {
      notesText += `## Study Questions\n`;
      generatedNote.questions.forEach((question, index) => {
        notesText += `${index + 1}. ${question}\n`;
      });
    }
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-notes-${generatedNote.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Study notes have been downloaded as a Markdown file.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Smart Study Notes Maker</h1>
        <p className="text-muted-foreground mb-8">Generate comprehensive study notes from your content</p>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">Input Content</TabsTrigger>
                <TabsTrigger value="output" disabled={!generatedNote}>Study Notes</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="input" className="mt-0 space-y-4">
              <div>
                <Label htmlFor="content">Paste Your Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your lecture notes, textbook excerpt, or article here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="note-type">Note Format</Label>
                  <Select value={noteType} onValueChange={setNoteType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Notes</SelectItem>
                      <SelectItem value="outline">Outline Format</SelectItem>
                      <SelectItem value="cornell">Cornell Method</SelectItem>
                      <SelectItem value="flashcard">Flashcard Style</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Include</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-definitions" className="text-sm">Key Definitions</Label>
                      <Switch
                        id="include-definitions"
                        checked={includeDefinitions}
                        onCheckedChange={setIncludeDefinitions}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-questions" className="text-sm">Study Questions</Label>
                      <Switch
                        id="include-questions"
                        checked={includeQuestions}
                        onCheckedChange={setIncludeQuestions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleGenerateNotes}
                disabled={isGenerating || content.trim().length < 50}
                className="w-full"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    Generating Notes...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Generate Study Notes
                  </span>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="output" className="mt-0">
              {generatedNote && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-lg font-semibold">Title</Label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(generatedNote.title)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-md">
                      <h3 className="text-xl">{generatedNote.title}</h3>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-lg font-semibold">Summary</Label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(generatedNote.summary)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-md">
                      <p>{generatedNote.summary}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-lg font-semibold">Key Points</Label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(generatedNote.keyPoints.map(p => `• ${p}`).join('\n'))}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-md">
                      <ul className="ml-4 space-y-2">
                        {generatedNote.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-baseline gap-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {includeDefinitions && generatedNote.definitions.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-lg font-semibold">Key Definitions</Label>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(generatedNote.definitions.map(d => `${d.term}: ${d.definition}`).join('\n'))}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <dl className="space-y-2">
                          {generatedNote.definitions.map((def, index) => (
                            <div key={index} className="mb-2">
                              <dt className="font-medium">{def.term}</dt>
                              <dd className="pl-4 text-muted-foreground">{def.definition}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  )}

                  {includeQuestions && generatedNote.questions.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-lg font-semibold">Study Questions</Label>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(generatedNote.questions.join('\n'))}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-secondary/20 p-3 rounded-md">
                        <ol className="ml-4 list-decimal space-y-2">
                          {generatedNote.questions.map((question, index) => (
                            <li key={index} className="ml-2">{question}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setActiveTab('input')}
                    >
                      Edit Content
                    </Button>
                    <Button
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={downloadNotes}
                    >
                      <Download className="h-4 w-4" />
                      Download Notes
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Study Note Taking Tips</CardTitle>
            <CardDescription>Maximize your learning with these techniques</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Cornell Method</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Divide your notes into cues, notes, and summary sections. Use the cue column for questions
                  and key points, the notes section for details, and the summary to consolidate your learning.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Mind Mapping</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create a visual representation of concepts with the main idea in the center and related
                  ideas branching out. This helps visualize connections between different topics.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Feynman Technique</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Explain the concept in simple terms as if teaching someone else. Identify gaps in your
                  understanding, review your notes, then simplify further.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Active Recall</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Instead of just reviewing notes, test yourself on the material. Create questions from your notes
                  and practice answering them without looking at the content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudyNotes;
