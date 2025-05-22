
import React, { useState } from 'react';
import { ClipboardList, Plus, Trash2, Copy, Download, ArrowDown, ArrowUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Question {
  id: string;
  type: string;
  text: string;
  required: boolean;
  options: string[];
}

const SurveyCreator = () => {
  const { toast } = useToast();
  const [surveyTitle, setSurveyTitle] = useState('Customer Satisfaction Survey');
  const [surveyDescription, setSurveyDescription] = useState('Help us improve our service by providing your feedback');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'multiple_choice',
      text: 'How satisfied are you with our service?',
      required: true,
      options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied']
    },
    {
      id: '2',
      type: 'text',
      text: 'What aspects of our service could be improved?',
      required: false,
      options: []
    }
  ]);
  const [activeTab, setActiveTab] = useState('edit');

  // Generate a unique ID for questions
  const generateQuestionId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 5);
  };

  // Add a new question
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: generateQuestionId(),
      type: 'multiple_choice',
      text: 'New Question',
      required: false,
      options: ['Option 1', 'Option 2', 'Option 3']
    };
    
    setQuestions([...questions, newQuestion]);
    
    toast({
      title: "Question added",
      description: "A new question has been added to your survey.",
    });
  };

  // Remove a question
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    
    toast({
      title: "Question removed",
      description: "The question has been removed from your survey.",
    });
  };

  // Update question properties
  const handleUpdateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  // Add option to a question
  const handleAddOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...q.options, `Option ${q.options.length + 1}`]
        };
      }
      return q;
    }));
  };

  // Update option text
  const handleUpdateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = [...q.options];
        updatedOptions[optionIndex] = value;
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };

  // Remove option
  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.filter((_, index) => index !== optionIndex);
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };

  // Move question up
  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return;
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[index - 1]] = [updatedQuestions[index - 1], updatedQuestions[index]];
    setQuestions(updatedQuestions);
  };

  // Move question down
  const handleMoveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const updatedQuestions = [...questions];
    [updatedQuestions[index], updatedQuestions[index + 1]] = [updatedQuestions[index + 1], updatedQuestions[index]];
    setQuestions(updatedQuestions);
  };

  // Generate a shareable survey link
  const getSurveyLink = () => {
    // In a real app, this would generate a unique link to the survey
    return `https://yoursurveyapp.com/s/${btoa(surveyTitle.replace(/\s+/g, '-').toLowerCase())}`;
  };

  // Copy survey link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getSurveyLink());
    
    toast({
      title: "Link copied",
      description: "Survey link has been copied to clipboard.",
    });
  };

  // Export survey as JSON
  const handleExportSurvey = () => {
    const surveyData = {
      title: surveyTitle,
      description: surveyDescription,
      questions
    };
    
    const blob = new Blob([JSON.stringify(surveyData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${surveyTitle.replace(/\s+/g, '-').toLowerCase()}-survey.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Survey exported",
      description: "Your survey has been exported as a JSON file.",
    });
  };

  // Suggest AI improvements for the survey
  const handleAIImprove = () => {
    toast({
      title: "AI improving survey...",
      description: "Analyzing your survey to suggest improvements.",
    });
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real implementation, this would use an AI service
      // For now, we'll just make some predefined improvements
      
      // Add a rating question if none exists
      const hasRatingQuestion = questions.some(q => q.text.toLowerCase().includes('rate') || q.text.toLowerCase().includes('rating'));
      
      if (!hasRatingQuestion) {
        setQuestions([
          ...questions,
          {
            id: generateQuestionId(),
            type: 'rating',
            text: 'On a scale of 1-10, how likely are you to recommend us to others?',
            required: true,
            options: []
          }
        ]);
      }
      
      // Improve the title if it's the default
      if (surveyTitle === 'Customer Satisfaction Survey') {
        setSurveyTitle('Help Us Serve You Better: Customer Experience Survey');
      }
      
      // Enhance the description
      setSurveyDescription('Your feedback is invaluable! Please take a moment to share your thoughts so we can continue to improve our products and services to meet your needs.');
      
      toast({
        title: "Survey improved!",
        description: "AI has enhanced your survey with improvements.",
      });
    }, 1500);
  };

  // Render the survey preview
  const renderSurveyPreview = () => {
    return (
      <div className="space-y-6 bg-card p-6 rounded-lg border">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{surveyTitle}</h3>
          <p className="text-muted-foreground">{surveyDescription}</p>
        </div>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
              <p className="flex items-baseline">
                <span className="font-medium">{index + 1}. {question.text} </span>
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </p>
              
              {question.type === 'text' && (
                <div className="pl-6">
                  <Textarea placeholder="Enter your answer" disabled className="resize-none" />
                </div>
              )}
              
              {question.type === 'multiple_choice' && (
                <div className="pl-6 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full border border-input" />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'checkbox' && (
                <div className="pl-6 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded border border-input" />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'rating' && (
                <div className="pl-6">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <div 
                        key={num} 
                        className="h-8 w-8 flex items-center justify-center border rounded cursor-pointer hover:bg-primary/10"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <Button className="w-full" disabled>Submit</Button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">AI Survey Creator</h1>
        <p className="text-muted-foreground mb-8">Create effective surveys with AI assistance</p>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Survey</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Survey Details</CardTitle>
                    <CardDescription>Set your survey title and description</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="survey-title">Title</Label>
                      <Input
                        id="survey-title"
                        value={surveyTitle}
                        onChange={(e) => setSurveyTitle(e.target.value)}
                        placeholder="Enter survey title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="survey-description">Description</Label>
                      <Textarea
                        id="survey-description"
                        value={surveyDescription}
                        onChange={(e) => setSurveyDescription(e.target.value)}
                        placeholder="Enter survey description"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <Card key={question.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveQuestionUp(index)}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveQuestionDown(index)}
                              disabled={index === questions.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveQuestion(question.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                            <Input
                              id={`question-${question.id}`}
                              value={question.text}
                              onChange={(e) => handleUpdateQuestion(question.id, 'text', e.target.value)}
                              placeholder="Enter question text"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
                            <Select
                              value={question.type}
                              onValueChange={(value) => handleUpdateQuestion(question.id, 'type', value)}
                            >
                              <SelectTrigger id={`question-type-${question.id}`}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text Answer</SelectItem>
                                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                <SelectItem value="rating">Rating Scale</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`required-${question.id}`} className="flex items-center cursor-pointer">
                            <input
                              id={`required-${question.id}`}
                              type="checkbox"
                              className="mr-2"
                              checked={question.required}
                              onChange={(e) => handleUpdateQuestion(question.id, 'required', e.target.checked)}
                            />
                            Required
                          </Label>
                        </div>
                        
                        {(question.type === 'multiple_choice' || question.type === 'checkbox') && (
                          <div className="space-y-2">
                            <Label>Options</Label>
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <Input
                                  value={option}
                                  onChange={(e) => handleUpdateOption(question.id, optIndex, e.target.value)}
                                  placeholder={`Option ${optIndex + 1}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveOption(question.id, optIndex)}
                                  disabled={question.options.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddOption(question.id)}
                              className="mt-2"
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add Option
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={handleAddQuestion}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Question
                  </Button>
                </div>
              </div>
              
              <div>
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Survey Actions</CardTitle>
                    <CardDescription>Share and manage your survey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Survey Link</Label>
                      <div className="flex items-center space-x-2">
                        <Input value={getSurveyLink()} readOnly />
                        <Button variant="outline" size="icon" onClick={handleCopyLink}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                      <Button
                        className="w-full"
                        onClick={() => setActiveTab('preview')}
                      >
                        Preview Survey
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleExportSurvey}
                      >
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full flex items-center gap-2"
                        onClick={handleAIImprove}
                      >
                        <Sparkles className="h-4 w-4" /> AI Improve
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-secondary/20 flex flex-col items-start px-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Pro tip:</strong> Keep surveys short and focused to increase completion rates. Use clear, concise questions.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="pt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Survey Preview</CardTitle>
                  <Button variant="outline" onClick={() => setActiveTab('edit')}>
                    Back to Editor
                  </Button>
                </div>
                <CardDescription>Preview how your survey will appear to respondents</CardDescription>
              </CardHeader>
              <CardContent>
                {renderSurveyPreview()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SurveyCreator;
