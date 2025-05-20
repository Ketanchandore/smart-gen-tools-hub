
import React, { useState, useRef } from 'react';
import { Globe, ArrowLeft, RefreshCw, Send, ExternalLink, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import Layout from '@/components/Layout';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatWebsite = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isWebsiteLoaded, setIsWebsiteLoaded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const analyzeWebsite = () => {
    // Add http:// if not present
    let urlToAnalyze = websiteUrl;
    if (!urlToAnalyze.startsWith('http://') && !urlToAnalyze.startsWith('https://')) {
      urlToAnalyze = 'https://' + urlToAnalyze;
      setWebsiteUrl(urlToAnalyze);
    }

    if (!validateUrl(urlToAnalyze)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid website URL',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setMessages([]);

    // In a real implementation, this would make an API call to extract website content
    // For this demo, we'll simulate the process with a delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsWebsiteLoaded(true);
      
      // Add initial bot message
      const domain = new URL(urlToAnalyze).hostname;
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'bot',
        content: `I've analyzed the website ${domain}. What would you like to know about it? You can ask about the products/services, pricing, contact information, or any specific content on the website.`,
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
      
      toast({
        title: 'Website analyzed',
        description: `Successfully analyzed ${domain}. You can now ask questions about it.`,
      });
      
      // Focus on the input field
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setUserInput('');
    setIsThinking(true);
    
    // Generate response (in a real app, this would call an AI API with the website content)
    setTimeout(() => {
      generateResponse(userMessage.content);
      setIsThinking(false);
    }, 1000 + Math.random() * 1000);
  };
  
  const generateResponse = (query: string) => {
    const domain = new URL(websiteUrl).hostname;
    const lowercaseQuery = query.toLowerCase();
    
    let responseContent = '';
    
    // Simulate responses for common questions
    if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('reach')) {
      responseContent = `Based on my analysis of ${domain}, you can contact them through their contact form on the website, or via email at contact@${domain}. Some businesses also provide phone support at their listed customer service number.`;
    } else if (lowercaseQuery.includes('price') || lowercaseQuery.includes('cost') || lowercaseQuery.includes('subscription')) {
      responseContent = `${domain} appears to offer different pricing tiers based on feature needs. They likely have a free or basic tier starting around $10-20/month, with premium features in higher tiers that can range from $30-100/month depending on usage and features. For exact pricing, I recommend checking their dedicated pricing page or contacting sales directly.`;
    } else if (lowercaseQuery.includes('product') || lowercaseQuery.includes('service') || lowercaseQuery.includes('offer')) {
      responseContent = `From my analysis, ${domain} offers a range of services including [simulated primary offering]. Their main features include [simulated feature 1], [simulated feature 2], and [simulated feature 3]. They appear to focus on serving [simulated target audience] in the [simulated industry] industry.`;
    } else if (lowercaseQuery.includes('review') || lowercaseQuery.includes('rating')) {
      responseContent = `While I don't have access to all review platforms, based on content from ${domain}, they showcase several customer testimonials with positive feedback about their [simulated service/product]. They appear to highlight customer satisfaction with their [simulated feature] and customer service. For more objective reviews, you might want to check third-party review platforms.`;
    } else if (lowercaseQuery.includes('about') || lowercaseQuery.includes('history') || lowercaseQuery.includes('company')) {
      responseContent = `${domain} appears to be a company founded around [simulated year], focusing on [simulated industry]. Their mission seems to be centered around [simulated mission]. The company has grown to serve customers across [simulated regions] and has potentially [simulated achievement] in recent years.`;
    } else if (lowercaseQuery.includes('blog') || lowercaseQuery.includes('article')) {
      responseContent = `${domain} maintains a blog with articles covering topics like [simulated topic 1], [simulated topic 2], and [simulated topic 3]. Their most recent content appears to focus on [simulated recent topic]. They typically publish new content on a [simulated frequency] basis.`;
    } else if (lowercaseQuery.includes('competitor') || lowercaseQuery.includes('alternative')) {
      responseContent = `While not explicitly stated on ${domain}, similar services in this space typically include [simulated competitor 1], [simulated competitor 2], and [simulated competitor 3]. ${domain} appears to differentiate itself through [simulated unique feature or approach].`;
    } else {
      // Generic response for other queries
      responseContent = `Based on my analysis of ${domain}, I found that ${generateGenericResponse(query, domain)}. Is there anything specific about this topic you'd like me to elaborate on?`;
    }
    
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'bot',
      content: responseContent,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };
  
  const generateGenericResponse = (query: string, domain: string): string => {
    const genericResponses = [
      `the website seems to address aspects related to "${query}" in their services section`,
      `there's information about "${query}" mentioned in what appears to be their FAQ section`,
      `they have some content addressing "${query}", though it's not extensively covered`,
      `they touch on topics related to "${query}" in their resources section`,
      `they discuss "${query}" in relation to their core offerings`,
      `they provide some insights about "${query}" but you might want to contact them directly for more detailed information`,
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };
  
  // Scroll to bottom of messages when new ones are added
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

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
          <h1 className="text-3xl font-bold">Chat with Website</h1>
          <p className="text-muted-foreground mt-2">Ask questions about any website's content using AI</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Website URL</CardTitle>
            <CardDescription>Provide the website you want to chat about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://example.com)"
                disabled={isAnalyzing || isWebsiteLoaded}
                className="flex-1"
              />
              {isWebsiteLoaded ? (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setWebsiteUrl('');
                    setIsWebsiteLoaded(false);
                    setMessages([]);
                  }}
                >
                  Change Website
                </Button>
              ) : (
                <Button 
                  onClick={analyzeWebsite}
                  disabled={isAnalyzing || !websiteUrl.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Website'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Website Chat</CardTitle>
            <CardDescription>
              {isWebsiteLoaded ? (
                <>
                  Chat with the content from{' '}
                  <a 
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center inline-flex"
                  >
                    {new URL(websiteUrl).hostname}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </>
              ) : (
                'Enter a website URL above to start chatting'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-4">
            {isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-center text-muted-foreground">
                  Analyzing website content...<br />
                  <span className="text-sm">This may take a moment</span>
                </p>
              </div>
            ) : messages.length > 0 ? (
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className="mt-1 text-xs opacity-70 text-right">
                          {msg.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                {isWebsiteLoaded ? (
                  <div className="text-center">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p>Ready to answer your questions about this website!</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Enter a website URL above to start chatting with its content
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-shrink-0">
            <div className="flex gap-2 w-full">
              <Input
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question about the website..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!isWebsiteLoaded || isThinking}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!isWebsiteLoaded || isThinking || !userInput.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6">
          <p className="text-sm text-center text-muted-foreground">
            Note: This is a demonstration using simulated responses. A production version would use AI to analyze actual website content.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ChatWebsite;
