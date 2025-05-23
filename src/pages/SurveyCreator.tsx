
import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit, Eye, Save, Share2, BarChart3, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no' | 'dropdown' | 'checkbox' | 'date' | 'email';
  question: string;
  options?: string[];
  required: boolean;
  description?: string;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  settings: {
    anonymous: boolean;
    multipleSubmissions: boolean;
    deadline?: string;
    thankYouMessage: string;
  };
}

const SurveyCreator = () => {
  const [currentSurvey, setCurrentSurvey] = useState<Survey>({
    id: '1',
    title: '',
    description: '',
    questions: [],
    settings: {
      anonymous: true,
      multipleSubmissions: false,
      thankYouMessage: 'Thank you for your response!'
    }
  });

  const [savedSurveys, setSavedSurveys] = useState<Survey[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: 'text',
    question: '',
    required: false,
    options: []
  });

  const { toast } = useToast();

  const questionTypes = [
    { value: 'text', label: 'Short Text' },
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'rating', label: 'Rating Scale' },
    { value: 'yes-no', label: 'Yes/No' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkboxes' },
    { value: 'date', label: 'Date' },
    { value: 'email', label: 'Email' }
  ];

  const addQuestion = () => {
    if (!newQuestion.question?.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question text",
        variant: "destructive"
      });
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      type: newQuestion.type as Question['type'],
      question: newQuestion.question,
      required: newQuestion.required || false,
      description: newQuestion.description,
      options: newQuestion.options
    };

    setCurrentSurvey(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }));

    setNewQuestion({
      type: 'text',
      question: '',
      required: false,
      options: []
    });

    toast({
      title: "Question Added",
      description: "Question has been added to your survey"
    });
  };

  const deleteQuestion = (questionId: string) => {
    setCurrentSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));

    toast({
      title: "Question Deleted",
      description: "Question has been removed from your survey"
    });
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt)
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index)
    }));
  };

  const saveSurvey = () => {
    if (!currentSurvey.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a survey title",
        variant: "destructive"
      });
      return;
    }

    if (currentSurvey.questions.length === 0) {
      toast({
        title: "Questions Required",
        description: "Please add at least one question",
        variant: "destructive"
      });
      return;
    }

    const surveyToSave = {
      ...currentSurvey,
      id: Date.now().toString()
    };

    setSavedSurveys(prev => [...prev, surveyToSave]);

    toast({
      title: "Survey Saved",
      description: "Your survey has been saved successfully"
    });
  };

  const generateSurveyLink = () => {
    const link = `${window.location.origin}/survey/${currentSurvey.id}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link Copied",
      description: "Survey link has been copied to clipboard"
    });
  };

  const exportSurvey = () => {
    const surveyData = JSON.stringify(currentSurvey, null, 2);
    const blob = new Blob([surveyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-${currentSurvey.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Survey Exported",
      description: "Survey has been downloaded as JSON file"
    });
  };

  const previewQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return <Input placeholder="Your answer..." disabled />;
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" disabled />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" disabled />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'rating':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button key={num} variant="outline" size="sm" disabled>
                {num}
              </Button>
            ))}
          </div>
        );
      case 'yes-no':
        return (
          <div className="flex space-x-4">
            <Button variant="outline" disabled>Yes</Button>
            <Button variant="outline" disabled>No</Button>
          </div>
        );
      case 'dropdown':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
          </Select>
        );
      case 'date':
        return <Input type="date" disabled />;
      case 'email':
        return <Input type="email" placeholder="your.email@example.com" disabled />;
      default:
        return <Input disabled />;
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">AI Survey Creator</h1>
        <p className="text-muted-foreground mt-2">Create professional surveys with intelligent question suggestions</p>
      </div>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="saved">Saved Surveys</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Survey Information</CardTitle>
              <CardDescription>Set up your survey title and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="survey-title">Survey Title</Label>
                <Input
                  id="survey-title"
                  value={currentSurvey.title}
                  onChange={(e) => setCurrentSurvey(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter survey title..."
                />
              </div>
              <div>
                <Label htmlFor="survey-description">Description</Label>
                <Textarea
                  id="survey-description"
                  value={currentSurvey.description}
                  onChange={(e) => setCurrentSurvey(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this survey is about..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Question</CardTitle>
              <CardDescription>Create a new question for your survey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="question-type">Question Type</Label>
                  <Select 
                    value={newQuestion.type} 
                    onValueChange={(value) => setNewQuestion(prev => ({ ...prev, type: value as Question['type'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="required"
                    checked={newQuestion.required}
                    onCheckedChange={(checked) => setNewQuestion(prev => ({ ...prev, required: checked }))}
                  />
                  <Label htmlFor="required">Required</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="question-text">Question</Label>
                <Input
                  id="question-text"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter your question..."
                />
              </div>

              <div>
                <Label htmlFor="question-description">Description (Optional)</Label>
                <Input
                  id="question-description"
                  value={newQuestion.description || ''}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional context or instructions..."
                />
              </div>

              {(newQuestion.type === 'multiple-choice' || newQuestion.type === 'checkbox' || newQuestion.type === 'dropdown') && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {newQuestion.options?.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              <Button onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>

          {currentSurvey.questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Questions ({currentSurvey.questions.length})</CardTitle>
                <CardDescription>Review and manage your survey questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentSurvey.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{questionTypes.find(t => t.value === question.type)?.label}</Badge>
                          {question.required && <Badge variant="destructive">Required</Badge>}
                        </div>
                        <p className="font-medium">{question.question}</p>
                        {question.description && (
                          <p className="text-sm text-muted-foreground">{question.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 opacity-60">
                      {previewQuestion(question)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button onClick={saveSurvey} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Survey
            </Button>
            <Button onClick={generateSurveyLink} variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Survey
            </Button>
            <Button onClick={exportSurvey} variant="outline">
              Export
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Survey Preview</CardTitle>
              <CardDescription>See how your survey will appear to respondents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentSurvey.title && (
                <div>
                  <h2 className="text-2xl font-bold">{currentSurvey.title}</h2>
                  {currentSurvey.description && (
                    <p className="text-muted-foreground mt-2">{currentSurvey.description}</p>
                  )}
                </div>
              )}
              
              {currentSurvey.questions.length > 0 ? (
                <div className="space-y-6">
                  {currentSurvey.questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <div>
                        <Label className="text-base">
                          {index + 1}. {question.question}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        {question.description && (
                          <p className="text-sm text-muted-foreground mt-1">{question.description}</p>
                        )}
                      </div>
                      {previewQuestion(question)}
                    </div>
                  ))}
                  <Button className="w-full" disabled>
                    Submit Survey
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No questions added yet. Go to the Builder tab to add questions.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Survey Settings</CardTitle>
              <CardDescription>Configure how your survey behaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Anonymous Responses</Label>
                  <p className="text-sm text-muted-foreground">Don't collect respondent information</p>
                </div>
                <Switch
                  checked={currentSurvey.settings.anonymous}
                  onCheckedChange={(checked) => 
                    setCurrentSurvey(prev => ({
                      ...prev,
                      settings: { ...prev.settings, anonymous: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Multiple Submissions</Label>
                  <p className="text-sm text-muted-foreground">Allow users to submit multiple responses</p>
                </div>
                <Switch
                  checked={currentSurvey.settings.multipleSubmissions}
                  onCheckedChange={(checked) => 
                    setCurrentSurvey(prev => ({
                      ...prev,
                      settings: { ...prev.settings, multipleSubmissions: checked }
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="deadline">Response Deadline (Optional)</Label>
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={currentSurvey.settings.deadline || ''}
                  onChange={(e) => 
                    setCurrentSurvey(prev => ({
                      ...prev,
                      settings: { ...prev.settings, deadline: e.target.value }
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="thank-you">Thank You Message</Label>
                <Textarea
                  id="thank-you"
                  value={currentSurvey.settings.thankYouMessage}
                  onChange={(e) => 
                    setCurrentSurvey(prev => ({
                      ...prev,
                      settings: { ...prev.settings, thankYouMessage: e.target.value }
                    }))
                  }
                  placeholder="Message shown after submission..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {savedSurveys.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedSurveys.map((survey) => (
                <Card key={survey.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{survey.title}</CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Questions:</span>
                        <Badge variant="secondary">{survey.questions.length}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Saved Surveys</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first survey using the Builder tab
                </p>
                <Button onClick={() => {
                  const builderTab = document.querySelector('[value="builder"]') as HTMLElement;
                  builderTab?.click();
                }}>
                  Create Survey
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurveyCreator;
