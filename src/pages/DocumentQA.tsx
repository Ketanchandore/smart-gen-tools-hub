
import React, { useState, useRef } from 'react';
import { FileQuestion, ArrowLeft, RefreshCw, Send, Upload, File, FileText, X, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface DocumentInfo {
  name: string;
  size: string;
  type: string;
  uploadDate: Date;
}

const DocumentQA = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentInfo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/msword', // doc
      'text/plain',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'application/vnd.ms-excel', // xls
    ];
    
    // Check file type and size
    const file = files[0];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF, Word document, text file, or Excel spreadsheet',
        variant: 'destructive',
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }
    
    setIsUploading(true);
    
    // In a real implementation, this would upload the file to a server for processing
    // For this demo, we'll simulate the process with a delay
    setTimeout(() => {
      const newDocument: DocumentInfo = {
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileTypeLabel(file.type),
        uploadDate: new Date(),
      };
      
      setUploadedDocuments(prev => [...prev, newDocument]);
      setIsUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast({
        title: 'File uploaded',
        description: `${file.name} has been uploaded successfully`,
      });
      
      // If this is the first document, start analysis
      if (uploadedDocuments.length === 0) {
        analyzeDocuments([newDocument]);
      }
    }, 1500);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileTypeLabel = (mimeType: string): string => {
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('word')) return 'Word';
    if (mimeType.includes('text')) return 'Text';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Excel';
    return 'Document';
  };
  
  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeDocuments = (docs?: DocumentInfo[]) => {
    const documentsToAnalyze = docs || uploadedDocuments;
    
    if (documentsToAnalyze.length === 0) {
      toast({
        title: 'No documents to analyze',
        description: 'Please upload at least one document',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAnalyzing(true);
    setMessages([]);
    
    // In a real implementation, this would make an API call to extract document content
    // For this demo, we'll simulate the process with a delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Add initial bot message
      const docNames = documentsToAnalyze.map(doc => doc.name).join(', ');
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'bot',
        content: `I've analyzed your ${documentsToAnalyze.length > 1 ? 'documents' : 'document'}: ${docNames}. What would you like to know about the content?`,
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
      
      toast({
        title: 'Analysis complete',
        description: 'Documents have been analyzed. You can now ask questions about the content.',
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
    
    // Generate response (in a real app, this would call an AI API with the document content)
    setTimeout(() => {
      generateResponse(userMessage.content);
      setIsThinking(false);
    }, 1500 + Math.random() * 1500);
  };
  
  const generateResponse = (query: string) => {
    let responseContent = '';
    const lowercaseQuery = query.toLowerCase();
    const documentTypes = uploadedDocuments.map(doc => doc.type.toLowerCase());
    const documentNames = uploadedDocuments.map(doc => doc.name);
    
    // Simulate responses for common questions
    if (lowercaseQuery.includes('summary') || lowercaseQuery.includes('summarize')) {
      responseContent = `Based on my analysis of the ${documentTypes.join(' and ')} documents, they appear to cover the following key points:\n\n1. [Simulated key point 1 based on document context]\n2. [Simulated key point 2 based on document context]\n3. [Simulated key point 3 based on document context]\n\nThe main theme seems to be focusing on [simulated topic] with emphasis on [simulated subtopic].`;
    } else if (lowercaseQuery.includes('key point') || lowercaseQuery.includes('main idea') || lowercaseQuery.includes('highlight')) {
      responseContent = `The key points from the documents are:\n\n- [Simulated key point 1]: This appears on page [x] of ${documentNames[0]}\n- [Simulated key point 2]: This is emphasized throughout section [y] of the document\n- [Simulated key point 3]: This is mentioned as a critical factor in the conclusion\n\nThese points collectively emphasize the importance of [simulated important concept] in relation to [simulated context].`;
    } else if (lowercaseQuery.includes('compare') || lowercaseQuery.includes('difference') || (lowercaseQuery.includes('similar') && uploadedDocuments.length > 1)) {
      responseContent = `Comparing the documents, I can identify these similarities and differences:\n\nSimilarities:\n- Both documents discuss [simulated common topic]\n- Similar methodologies are referenced in sections about [simulated methodology]\n- The same key terms appear frequently: [simulated term 1], [simulated term 2]\n\nDifferences:\n- ${documentNames[0]} focuses more on [simulated focus 1], while ${uploadedDocuments.length > 1 ? documentNames[1] : 'the other sections'} emphasizes [simulated focus 2]\n- The approaches to [simulated subject] differ significantly between documents\n- The conclusions offer contrasting recommendations regarding [simulated recommendation subject]`;
    } else if (lowercaseQuery.includes('find') || lowercaseQuery.includes('where') || lowercaseQuery.includes('locate')) {
      const searchTerm = extractSearchTerm(lowercaseQuery);
      responseContent = `I found references to "${searchTerm}" in the following locations:\n\n- In ${documentNames[0]}, page [x], paragraph [y]: "[Simulated relevant excerpt containing the search term]"\n- Later in the document, section [z]: "[Another simulated excerpt with context around the search term]"\n${uploadedDocuments.length > 1 ? `\n- In ${documentNames[1]}, there's a mention in the [simulated section]: "[Simulated excerpt from second document]"` : ''}`;
    } else if (lowercaseQuery.includes('conclusion') || lowercaseQuery.includes('recommend') || lowercaseQuery.includes('suggest')) {
      responseContent = `The conclusions/recommendations from the documents are:\n\n1. [Simulated main conclusion 1]: The document suggests that [simulated recommendation details]\n\n2. [Simulated main conclusion 2]: Based on the analysis presented, [simulated recommendation outcome]\n\n3. [Simulated main conclusion 3]: The author recommends [simulated specific recommendation]`;
    } else if (lowercaseQuery.includes('data') || lowercaseQuery.includes('statistic') || lowercaseQuery.includes('number') || lowercaseQuery.includes('figure')) {
      responseContent = `Key data points from the documents include:\n\n- [Simulated statistic 1]: [x]% increase in [simulated metric] over [simulated time period]\n- [Simulated statistic 2]: Approximately [y] instances of [simulated measured phenomenon]\n- [Simulated data relationship]: Strong correlation between [simulated variable 1] and [simulated variable 2], with a coefficient of [z]\n\nThese figures appear to support the document's position on [simulated relevant topic].`;
    } else {
      // Generic response for other queries
      responseContent = `Based on my analysis of the documents, I found information relevant to "${query}":\n\n[Simulated content excerpt related to the query]\n\nThis appears in the context of [simulated broader context] and relates to [simulated related concept] discussed elsewhere in the document${uploadedDocuments.length > 1 ? 's' : ''}.`;
    }
    
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'bot',
      content: responseContent,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };
  
  const extractSearchTerm = (query: string): string => {
    // Try to extract what the user is looking for
    const findPatterns = [
      /find\s+(.*?)(?:\s+in|\s+within|$)/i,
      /where\s+(?:is|are)\s+(.*?)(?:\s+in|\s+mentioned|$)/i,
      /locate\s+(.*?)(?:\s+in|\s+within|$)/i,
      /search\s+for\s+(.*?)(?:\s+in|\s+within|$)/i,
    ];
    
    for (const pattern of findPatterns) {
      const match = query.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    // Fallback - just take the nouns after key verbs
    const words = query.split(/\s+/);
    const keyVerbs = ['find', 'where', 'locate', 'search', 'about', 'regarding', 'concerning'];
    
    for (let i = 0; i < words.length; i++) {
      if (keyVerbs.includes(words[i].toLowerCase()) && i < words.length - 1) {
        return words[i + 1].replace(/[.,?!;:]/g, '');
      }
    }
    
    return "the term";
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
            <FileQuestion className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Document Q&A</h1>
          <p className="text-muted-foreground mt-2">Chat with your PDFs and documents using AI</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>Upload PDF, Word, Excel or text files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed rounded-lg text-center py-8 px-4 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                      onChange={handleFileUpload}
                    />
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, Word, Excel, Text (max 10MB)
                    </p>
                  </div>
                  
                  {isUploading && (
                    <div className="text-center py-2">
                      <RefreshCw className="h-5 w-5 animate-spin text-primary mx-auto mb-1" />
                      <p className="text-sm">Uploading document...</p>
                    </div>
                  )}
                  
                  {uploadedDocuments.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Uploaded Documents</h3>
                      <div className="space-y-2">
                        {uploadedDocuments.map((doc, index) => (
                          <div 
                            key={index} 
                            className="bg-muted rounded-lg p-2 text-sm flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                              <div className="overflow-hidden">
                                <p className="truncate font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.type} · {doc.size}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeDocument(index);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => analyzeDocuments()}
                  disabled={uploadedDocuments.length === 0 || isUploading || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    `Analyze Document${uploadedDocuments.length !== 1 ? 's' : ''}`
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>• Ask specific questions about document content</p>
                <p>• Request summaries or key points</p>
                <p>• Ask to locate specific information</p>
                <p>• Compare content between documents</p>
                <p>• Ask for data extraction or analysis</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Chat with Documents</CardTitle>
                    <CardDescription>
                      {uploadedDocuments.length > 0 
                        ? `Ask questions about ${uploadedDocuments.length} uploaded document${uploadedDocuments.length !== 1 ? 's' : ''}`
                        : 'Upload documents to start chatting'
                      }
                    </CardDescription>
                  </div>
                  {uploadedDocuments.length > 0 && (
                    <Badge variant="outline" className="gap-1 flex items-center">
                      <File className="h-3 w-3" />
                      <span>{uploadedDocuments.length}</span>
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden p-4">
                {isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-center text-muted-foreground">
                      Analyzing document content...<br />
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
                            <p className="text-sm whitespace-pre-line">{msg.content}</p>
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
                    {uploadedDocuments.length > 0 ? (
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p>Ready to answer questions about your documents!</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Click the "Analyze Documents" button to start
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Upload documents to start chatting with their content
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
                    placeholder="Ask a question about your documents..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={uploadedDocuments.length === 0 || isAnalyzing || isThinking || messages.length === 0}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={uploadedDocuments.length === 0 || isAnalyzing || isThinking || !userInput.trim() || messages.length === 0}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-center text-muted-foreground">
            Note: This is a demonstration using simulated responses. A production version would use AI to analyze actual document content.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentQA;
