
import React, { useState } from 'react';
import { MessageSquare, ArrowLeft, Send, RefreshCw, PlayCircle, PauseCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

interface Question {
  id: string;
  text: string;
}

const jobCategories = [
  { value: 'software', label: 'Software Development' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'customer', label: 'Customer Service' },
  { value: 'data', label: 'Data Science' },
  { value: 'design', label: 'Design' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'Human Resources' },
];

const experienceLevels = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'manager', label: 'Management' },
  { value: 'executive', label: 'Executive' },
];

const InterviewCoach = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobCategory, setJobCategory] = useState('software');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages update
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = () => {
    setIsLoading(true);
    setMessages([]);
    setQuestionIndex(0);

    // Simulate loading delay
    setTimeout(() => {
      const welcomeMessage = {
        id: Date.now().toString(),
        type: 'ai' as const,
        content: `Welcome to your ${experienceLevels.find(el => el.value === experienceLevel)?.label} ${jobCategories.find(jc => jc.value === jobCategory)?.label} interview practice! I'll be asking you some common interview questions. Please respond as you would in a real interview. Let's start with the first question.`
      };

      setMessages([welcomeMessage]);
      setIsStarted(true);
      setIsLoading(false);
      askNextQuestion(0);
    }, 1500);
  };

  const getQuestionsForJobCategory = (category: string, level: string): Question[] => {
    // Simulated questions based on job category and experience level
    const commonQuestions = [
      { id: 'q1', text: 'Tell me about yourself and your background.' },
      { id: 'q2', text: 'Why are you interested in this position?' },
      { id: 'q3', text: 'What are your greatest strengths and weaknesses?' },
      { id: 'q4', text: 'Can you describe a challenging situation you faced at work and how you handled it?' },
      { id: 'q5', text: 'Where do you see yourself in 5 years?' },
    ];
    
    const specificQuestions: Record<string, Question[]> = {
      software: [
        { id: 's1', text: 'Can you explain your approach to problem-solving when facing a complex coding challenge?' },
        { id: 's2', text: 'Describe a project where you had to learn a new technology quickly. How did you approach it?' },
        { id: 's3', text: 'How do you ensure your code is maintainable and scalable?' },
        { id: 's4', text: 'Have you ever disagreed with a team member about a technical decision? How did you resolve it?' },
      ],
      marketing: [
        { id: 'm1', text: 'Describe a marketing campaign you managed that was particularly successful.' },
        { id: 'm2', text: 'How do you measure the success of your marketing efforts?' },
        { id: 'm3', text: 'How do you stay current with the latest marketing trends and technologies?' },
      ],
      data: [
        { id: 'd1', text: 'Explain a complex data analysis project you worked on and the insights you uncovered.' },
        { id: 'd2', text: 'How do you ensure the accuracy of your data analyses?' },
        { id: 'd3', text: 'Can you explain a machine learning model you've implemented?' },
      ],
      // Add more categories as needed
    };
    
    const seniorQuestions = [
      { id: 'sr1', text: 'How do you approach mentoring junior team members?' },
      { id: 'sr2', text: 'Describe how you've influenced strategic decisions in your previous roles.' },
      { id: 'sr3', text: 'How do you balance quality and deadlines when managing projects?' },
    ];
    
    let questions = [...commonQuestions];
    
    // Add category-specific questions if available
    if (specificQuestions[category]) {
      questions = [...questions, ...specificQuestions[category]];
    }
    
    // Add senior-level questions if applicable
    if (level === 'senior' || level === 'manager' || level === 'executive') {
      questions = [...questions, ...seniorQuestions];
    }
    
    return questions;
  };

  const askNextQuestion = (index: number) => {
    const questions = getQuestionsForJobCategory(jobCategory, experienceLevel);
    
    if (index < questions.length) {
      const question = questions[index];
      setCurrentQuestion(question);
      
      // Add a small delay before showing the next question
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'ai',
          content: question.text
        }]);
      }, 500);
    } else {
      // Interview complete
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'ai',
          content: "That concludes our practice interview. You can now review your answers above or start a new interview. Thank you for practicing with our Interview Coach!"
        }]);
        setCurrentQuestion(null);
      }, 500);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, message]);
    setUserInput('');
    
    // Simulate AI thinking
    setIsLoading(true);
    
    setTimeout(() => {
      const feedbackMessages = [
        "Good response! You provided relevant information and spoke clearly.",
        "That's a solid answer. Consider adding more specific examples to illustrate your points.",
        "Nice job! Your response was well-structured. You might want to be more concise for some parts.",
        "That covers the basics well. To improve, try quantifying your achievements more specifically.",
        "Good answer. In a real interview, you might want to connect your experience more directly to the company's needs."
      ];
      
      // Random feedback
      const feedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: feedback
      }]);
      
      setIsLoading(false);
      setQuestionIndex(prev => prev + 1);
      
      // Ask the next question after feedback
      setTimeout(() => {
        askNextQuestion(questionIndex + 1);
      }, 1000);
    }, 1500);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Voice recording has been stopped",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Voice recording has started. Speak clearly.",
      });
      
      // Simulate speech recognition by automatically filling the input after a delay
      setTimeout(() => {
        setUserInput("Thank you for that question. Based on my experience, I've developed strong skills in problem-solving and communication. I believe these skills would be valuable for this role.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const resetInterview = () => {
    setIsStarted(false);
    setMessages([]);
    setCurrentQuestion(null);
    setQuestionIndex(0);
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
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Interview Coach</h1>
          <p className="text-muted-foreground mt-2">Practice for job interviews with AI-powered mock interviews</p>
        </div>
        
        {!isStarted ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-2">Set Up Your Practice Interview</h2>
              
              <div className="space-y-2">
                <Label htmlFor="job-category">Job Category</Label>
                <Select 
                  value={jobCategory} 
                  onValueChange={setJobCategory}
                >
                  <SelectTrigger id="job-category">
                    <SelectValue placeholder="Select job category" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience-level">Experience Level</Label>
                <Select 
                  value={experienceLevel} 
                  onValueChange={setExperienceLevel}
                >
                  <SelectTrigger id="experience-level">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={startInterview}
                disabled={isLoading}
              >
                {isLoading ? "Setting up..." : "Start Practice Interview"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <Card className="h-[500px] flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Interview Session</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetInterview}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    New Interview
                  </Button>
                </div>
                
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto space-y-4 mb-4"
                >
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-3/4 rounded-lg p-3 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {message.type === 'ai' && currentQuestion && message.content === currentQuestion.text && (
                          <div className="flex gap-2 mt-2 justify-end">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={toggleRecording}
                  >
                    {isRecording ? (
                      <PauseCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <PlayCircle className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle recording</span>
                  </Button>
                  
                  <div className="relative flex-1">
                    <input
                      type="text"
                      className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                      placeholder="Type your response..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isLoading || isRecording}
                    />
                    {isRecording && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isLoading || isRecording}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a simulated interview coach. For a fully featured version, additional AI capabilities would be integrated for more dynamic responses and personalized feedback.</p>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewCoach;
