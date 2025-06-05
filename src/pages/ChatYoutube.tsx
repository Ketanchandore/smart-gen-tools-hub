
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Youtube, MessageSquare, Send, Download, Clock, User, Bot, Search, FileText, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  relatedTimestamp?: string;
}

interface VideoData {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  transcript: string;
  keyTopics: string[];
  url: string;
}

const ChatYoutube = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingVideo, setProcessingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const suggestedQuestions = [
    "What are the main points of this video?",
    "Can you summarize the key insights?",
    "What does the speaker say about [specific topic]?",
    "Are there any action items mentioned?",
    "What are the important timestamps?",
    "Can you explain the concepts discussed?",
    "What examples are given in the video?",
    "What is the conclusion of this video?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const processVideo = async () => {
    if (!videoUrl.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive"
      });
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube video URL.",
        variant: "destructive"
      });
      return;
    }

    setProcessingVideo(true);
    try {
      // Simulate video processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockVideoData: VideoData = {
        title: "Advanced React Hooks Tutorial - Complete Guide",
        description: "Learn advanced React hooks including useEffect, useContext, useReducer, and custom hooks. This comprehensive tutorial covers best practices and real-world examples.",
        duration: "24:35",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        transcript: "Welcome to this advanced React hooks tutorial. Today we'll be covering useEffect, useContext, useReducer, and how to create custom hooks. React hooks have revolutionized how we write React components by allowing us to use state and other React features in functional components. Let's start with useEffect, which is used for side effects in functional components. The useEffect hook accepts two parameters: a function that contains the side effect code, and an optional dependency array. When the dependency array is empty, the effect runs only once after the initial render. This is similar to componentDidMount in class components. If you omit the dependency array entirely, the effect runs after every render, which can lead to performance issues. Next, let's talk about useContext, which allows us to consume context values without nesting Consumer components. This hook makes our code cleaner and easier to read. useReducer is another powerful hook that's great for managing complex state logic. It's similar to Redux but built into React. Finally, custom hooks allow us to extract component logic into reusable functions.",
        keyTopics: [
          "useEffect Hook",
          "useContext Hook", 
          "useReducer Hook",
          "Custom Hooks",
          "Dependency Arrays",
          "Performance Optimization",
          "State Management",
          "React Best Practices"
        ],
        url: videoUrl
      };

      setVideoData(mockVideoData);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        content: `I've analyzed the video "${mockVideoData.title}". You can now ask me questions about the content, key concepts, or specific parts of the video. What would you like to know?`,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      toast({
        title: "Video Processed Successfully",
        description: "You can now chat about the video content."
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Failed to process the video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingVideo(false);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !videoData) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setLoading(true);

    try {
      // Simulate AI response based on the message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let response = '';
      let relatedTimestamp = '';

      if (currentMessage.toLowerCase().includes('main points') || currentMessage.toLowerCase().includes('summary')) {
        response = "The main points of this video are:\n\n1. **useEffect Hook**: Used for side effects in functional components, with dependency arrays controlling when effects run.\n\n2. **useContext Hook**: Simplifies context consumption without nesting Consumer components.\n\n3. **useReducer Hook**: Manages complex state logic, similar to Redux but built into React.\n\n4. **Custom Hooks**: Extract component logic into reusable functions for better code organization.\n\n5. **Performance Best Practices**: Proper use of dependency arrays and optimization techniques.";
        relatedTimestamp = "2:15 - 18:30";
      } else if (currentMessage.toLowerCase().includes('useeffect')) {
        response = "useEffect is covered extensively in this video. Key points:\n\n• **Basic Usage**: useEffect accepts a function and optional dependency array\n• **Dependency Array**: Empty array = runs once, no array = runs every render, with dependencies = runs when dependencies change\n• **Cleanup**: Return a function from useEffect to clean up side effects\n• **Common Use Cases**: API calls, subscriptions, DOM manipulation\n\nThe speaker emphasizes that understanding dependency arrays is crucial for avoiding infinite loops and performance issues.";
        relatedTimestamp = "2:15 - 8:45";
      } else if (currentMessage.toLowerCase().includes('custom hooks')) {
        response = "Custom hooks are discussed as a powerful pattern for:\n\n• **Code Reusability**: Extract stateful logic into reusable functions\n• **Separation of Concerns**: Keep components focused on rendering\n• **Testing**: Easier to test isolated logic\n• **Naming Convention**: Must start with 'use'\n\nThe video shows examples of custom hooks for API calls, localStorage, and form handling. Custom hooks can use other hooks internally and return any values needed by components.";
        relatedTimestamp = "16:20 - 22:10";
      } else if (currentMessage.toLowerCase().includes('performance') || currentMessage.toLowerCase().includes('optimization')) {
        response = "Performance optimization strategies mentioned:\n\n• **Dependency Arrays**: Properly specify dependencies to avoid unnecessary re-renders\n• **useCallback**: Memoize functions passed to child components\n• **useMemo**: Memoize expensive calculations\n• **Custom Hooks**: Centralize and optimize reusable logic\n• **Avoiding Common Pitfalls**: Don't omit dependency arrays unless intentional\n\nThe speaker emphasizes that React's built-in optimizations work best when you follow the rules of hooks.";
        relatedTimestamp = "8:45 - 12:30, 19:15 - 21:00";
      } else {
        response = `Based on the video content, I can help you understand React hooks better. The video covers useEffect, useContext, useReducer, and custom hooks in detail. 

Could you be more specific about what you'd like to know? For example:
- How a specific hook works
- Best practices mentioned
- Code examples shown
- Performance considerations

Feel free to ask about any particular concept or timestamp!`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        relatedTimestamp
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Response Failed",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const askSuggestedQuestion = (question: string) => {
    setCurrentMessage(question);
  };

  const searchTranscript = () => {
    if (!searchQuery.trim() || !videoData) return;
    
    const foundIndex = videoData.transcript.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (foundIndex !== -1) {
      toast({
        title: "Found in transcript",
        description: `"${searchQuery}" found in the video transcript.`
      });
    } else {
      toast({
        title: "Not found",
        description: `"${searchQuery}" not found in the transcript.`,
        variant: "destructive"
      });
    }
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? 'You' : 'AI'} (${msg.timestamp.toLocaleTimeString()}): ${msg.content}\n${msg.relatedTimestamp ? `Related timestamp: ${msg.relatedTimestamp}\n` : ''}\n`
    ).join('');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube-chat-export.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Chat Exported",
      description: "Chat history exported successfully."
    });
  };

  if (!videoData) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
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
          <div className="mx-auto bg-gradient-to-r from-red-500 to-purple-600 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
            <Youtube className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Chat with YouTube Video</h1>
          <p className="text-xl text-muted-foreground">
            Ask questions about any YouTube video and get AI-powered answers
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5" />
              Enter YouTube Video URL
            </CardTitle>
            <CardDescription>
              Paste a YouTube video URL to start chatting about its content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="video-url">YouTube Video URL</Label>
              <Input
                id="video-url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && processVideo()}
              />
            </div>

            <Button 
              onClick={processVideo}
              disabled={processingVideo || !videoUrl.trim()}
              className="w-full"
              size="lg"
            >
              {processingVideo ? (
                <>
                  <MessageSquare className="h-4 w-4 mr-2 animate-spin" />
                  Processing Video...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Chatting
                </>
              )}
            </Button>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">What you can do:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ask questions about video content</li>
                <li>• Get summaries of key points</li>
                <li>• Find specific information mentioned</li>
                <li>• Request explanations of concepts</li>
                <li>• Search through transcript</li>
                <li>• Export chat history</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => {
            setVideoData(null);
            setMessages([]);
            setVideoUrl('');
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          New Video
        </Button>
        <Button 
          variant="outline"
          onClick={exportChat}
          disabled={messages.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Info Panel */}
        <div className="lg:col-span-1">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Video Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <img 
                  src={videoData.thumbnail} 
                  alt={videoData.title}
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium mb-2">{videoData.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  {videoData.duration}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {videoData.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Key Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {videoData.keyTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Search in transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchTranscript()}
                />
                <Button size="sm" onClick={searchTranscript}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with Video
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      {message.relatedTimestamp && (
                        <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                          <Clock className="h-3 w-3" />
                          Related: {message.relatedTimestamp}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <span className="text-sm">AI is thinking...</span>
                        <div className="animate-pulse">💭</div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">Suggested Questions:</Label>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 4).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => askSuggestedQuestion(question)}
                        className="text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a question about the video..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={2}
                  className="resize-none"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={loading || !currentMessage.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatYoutube;
