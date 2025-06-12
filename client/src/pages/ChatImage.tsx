
import React, { useState, useRef } from 'react';
import { Image, Upload, SendHorizontal, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const ChatImage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string, image?: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages update
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPEG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        toast({
          title: 'Image uploaded',
          description: 'You can now ask questions about this image'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = () => {
    if (!image) {
      toast({
        title: 'No image uploaded',
        description: 'Please upload an image first',
        variant: 'destructive',
      });
      return;
    }

    if (!question.trim()) {
      toast({
        title: 'Empty question',
        description: 'Please enter a question about the image',
        variant: 'destructive',
      });
      return;
    }

    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: question,
      image: image
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setQuestion('');
    setLoading(true);

    // In a real implementation, we would send the image and question to an API here
    // Simulating API call with timeout
    setTimeout(() => {
      // Generate a mock response based on the question
      const response = generateMockResponse(question, image);
      
      setMessages(prevMessages => [
        ...prevMessages, 
        { type: 'ai', content: response }
      ]);
      
      setLoading(false);
    }, 2000);
  };

  const generateMockResponse = (question: string, imageUrl: string): string => {
    // Mock responses based on common question types
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes("what") && questionLower.includes("this")) {
      return "This appears to be an image that you've uploaded. I can see the visual content but without more specific details about what you're asking about, I can only provide a general description. The image contains visual elements that you can see in your upload. If you have a more specific question about particular aspects of the image, please feel free to ask!";
    } 
    else if (questionLower.includes("describe")) {
      return "Based on the image you've shared, I can see several visual elements. The image appears to have various colors, shapes, and potentially objects or scenes. Without knowing the specific context, I'm providing a general description. For more detailed analysis, you might want to ask about specific elements within the image.";
    } 
    else if (questionLower.includes("color") || questionLower.includes("colour")) {
      return "The image contains multiple colors. I can see variations in tone and hue throughout the visual. The predominant colors appear to create the overall mood and composition of the image.";
    } 
    else if (questionLower.includes("person") || questionLower.includes("people") || questionLower.includes("who")) {
      return "I can see what appears to be human figures or elements in the image. Without more context, I can't identify specific individuals, but the composition suggests human presence or representation within the frame.";
    } 
    else if (questionLower.includes("where") || questionLower.includes("location")) {
      return "The image appears to depict a location or setting, though I cannot determine the exact place without more information. The visual elements suggest a space with particular environmental characteristics. For a more accurate assessment, additional context about the image would be helpful.";
    } 
    else if (questionLower.includes("when") || questionLower.includes("time")) {
      return "Based on the visual elements in the image, it's difficult to determine the exact time or date when this was taken. The lighting and composition provide some cues about the general time of day, but for more specific temporal information, additional context would be needed.";
    }
    else {
      return "Thank you for your question about the image. I can see the visual content you've shared, and based on what's visible, I can offer some observations. The image contains various elements that make up its composition. If you have more specific questions about particular aspects of the image, please let me know and I'll try to provide more detailed insights.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
            <Image className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Chat with Image</h1>
          <p className="text-muted-foreground mt-2">Ask questions about images and get AI-powered answers</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className="h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
                <CardDescription>Upload an image and start asking questions</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-hidden flex flex-col">
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto pr-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground text-center">
                        Upload an image and ask a question to start the conversation
                      </p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          {message.image && message.type === 'user' && (
                            <div className="mb-2">
                              <img 
                                src={message.image} 
                                alt="User uploaded" 
                                className="max-h-40 rounded-md" 
                              />
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-shrink-0"
                    disabled={loading}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload image</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </Button>
                  
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about your image..."
                    className="flex-1 min-h-[3rem] max-h-24 resize-none"
                    disabled={loading}
                  />
                  
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!image || !question.trim() || loading}
                    className="flex-shrink-0"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <SendHorizontal className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Image Preview</CardTitle>
                <CardDescription>
                  Upload an image to analyze
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {image ? (
                  <div className="w-full">
                    <img 
                      src={image} 
                      alt="Preview" 
                      className="w-full h-auto object-contain rounded-md max-h-64" 
                    />
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 w-full flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Click to upload an image
                      <br />
                      <span className="text-sm">PNG, JPG, GIF up to 5MB</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>Upload an image using the button</li>
                  <li>Ask a question about what you see in the image</li>
                  <li>Our AI will analyze the image and provide an answer</li>
                  <li>Continue the conversation with follow-up questions</li>
                </ol>
                
                <div className="mt-6 text-sm">
                  <p className="text-muted-foreground">
                    <strong>Note:</strong> This is a demo version. For full functionality, this would integrate with the OpenAI GPT-4 Vision API, which requires an API key.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatImage;
