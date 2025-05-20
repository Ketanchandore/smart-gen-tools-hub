
import React, { useState } from 'react';
import { Mail, ArrowLeft, RefreshCw, Copy, Download, Check, Trash, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

interface KeyPoint {
  id: string;
  text: string;
}

const EmailWriter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [emailType, setEmailType] = useState('professional');
  const [emailPurpose, setEmailPurpose] = useState('introduction');
  const [tone, setTone] = useState('professional');
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([
    { id: '1', text: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  
  // Email type options
  const emailTypes = [
    { value: 'professional', label: 'Professional/Business' },
    { value: 'marketing', label: 'Marketing/Sales' },
    { value: 'personal', label: 'Personal' },
    { value: 'networking', label: 'Networking' },
    { value: 'academic', label: 'Academic' },
    { value: 'support', label: 'Customer Support' },
  ];
  
  // Email purpose options based on type
  const purposeOptions: Record<string, { value: string, label: string }[]> = {
    professional: [
      { value: 'introduction', label: 'Introduction/Outreach' },
      { value: 'followup', label: 'Follow-up' },
      { value: 'meeting', label: 'Meeting Request' },
      { value: 'proposal', label: 'Proposal/Pitch' },
      { value: 'status', label: 'Status Update' },
      { value: 'resignation', label: 'Resignation' },
    ],
    marketing: [
      { value: 'product', label: 'Product Announcement' },
      { value: 'promotion', label: 'Promotion/Offer' },
      { value: 'newsletter', label: 'Newsletter' },
      { value: 'event', label: 'Event Invitation' },
      { value: 'feedback', label: 'Feedback Request' },
    ],
    personal: [
      { value: 'gratitude', label: 'Thank You' },
      { value: 'invitation', label: 'Invitation' },
      { value: 'congratulations', label: 'Congratulations' },
      { value: 'request', label: 'Request/Favor' },
      { value: 'apology', label: 'Apology' },
    ],
    networking: [
      { value: 'connection', label: 'New Connection' },
      { value: 'referral', label: 'Referral Request' },
      { value: 'introduction', label: 'Introduction' },
      { value: 'meetup', label: 'Meetup Suggestion' },
    ],
    academic: [
      { value: 'application', label: 'Application' },
      { value: 'recommendation', label: 'Recommendation Request' },
      { value: 'submission', label: 'Assignment Submission' },
      { value: 'query', label: 'Academic Query' },
    ],
    support: [
      { value: 'inquiry', label: 'General Inquiry' },
      { value: 'complaint', label: 'Complaint' },
      { value: 'refund', label: 'Refund Request' },
      { value: 'technical', label: 'Technical Support' },
    ],
  };
  
  // Tone options
  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'formal', label: 'Formal' },
    { value: 'confident', label: 'Confident' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'empathetic', label: 'Empathetic' },
  ];
  
  // Handle change of email type
  const handleEmailTypeChange = (value: string) => {
    setEmailType(value);
    // Reset purpose when type changes
    setEmailPurpose(purposeOptions[value][0].value);
  };
  
  // Add a new key point
  const addKeyPoint = () => {
    setKeyPoints([...keyPoints, { id: Date.now().toString(), text: '' }]);
  };
  
  // Update a key point
  const updateKeyPoint = (id: string, text: string) => {
    setKeyPoints(keyPoints.map(point => point.id === id ? { ...point, text } : point));
  };
  
  // Remove a key point
  const removeKeyPoint = (id: string) => {
    if (keyPoints.length > 1) {
      setKeyPoints(keyPoints.filter(point => point.id !== id));
    } else {
      // If it's the last key point, just clear it
      updateKeyPoint(id, '');
    }
  };
  
  // Generate the email
  const generateEmail = () => {
    if (!recipient.trim()) {
      toast({
        title: 'Recipient required',
        description: 'Please enter a recipient name or organization',
        variant: 'destructive',
      });
      return;
    }
    
    // Filter out empty key points
    const filteredKeyPoints = keyPoints.filter(point => point.text.trim() !== '');
    if (filteredKeyPoints.length === 0) {
      toast({
        title: 'Key points required',
        description: 'Please add at least one key point for your email',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    setGeneratedEmail('');
    
    // In a real implementation, this would call an AI API
    // For this demo, we'll simulate a delay and generate a mock email
    setTimeout(() => {
      const email = generateEmailContent(
        recipient,
        subject,
        emailType,
        emailPurpose,
        tone,
        filteredKeyPoints
      );
      
      setGeneratedEmail(email);
      setLoading(false);
      
      toast({
        title: 'Email generated',
        description: 'Your email has been created successfully',
      });
    }, 2000);
  };
  
  const generateEmailContent = (
    to: string,
    emailSubject: string,
    type: string,
    purpose: string,
    emailTone: string,
    points: KeyPoint[]
  ): string => {
    // Prepare subject line if not provided
    let finalSubject = emailSubject.trim();
    if (!finalSubject) {
      finalSubject = generateSubjectLine(type, purpose, to);
    }
    
    // Generate greetings based on tone
    let greeting = '';
    if (emailTone === 'formal' || type === 'academic') {
      greeting = `Dear ${to},`;
    } else if (emailTone === 'friendly' || type === 'personal') {
      greeting = `Hi ${to},`;
    } else {
      greeting = `Hello ${to},`;
    }
    
    // Generate introduction
    let introduction = '';
    if (purpose === 'introduction' || purpose === 'connection') {
      introduction = `I hope this email finds you well. My name is [Your Name] and I am reaching out because `;
      if (points.length > 0) {
        introduction += points[0].text;
      } else {
        introduction += 'I wanted to connect with you.';
      }
    } else if (purpose === 'followup' || purpose === 'status') {
      introduction = `I'm writing to follow up regarding `;
      if (points.length > 0) {
        introduction += points[0].text + '.';
      } else {
        introduction += 'our previous conversation.';
      }
    } else if (purpose === 'meeting' || purpose === 'meetup') {
      introduction = `I hope you're doing well. I would like to request a meeting to discuss `;
      if (points.length > 0) {
        introduction += points[0].text + '.';
      } else {
        introduction += 'some important matters.';
      }
    } else if (purpose === 'gratitude' || purpose === 'congratulations') {
      introduction = `I wanted to take a moment to `;
      introduction += purpose === 'gratitude' ? 'express my sincere gratitude for ' : 'congratulate you on ';
      if (points.length > 0) {
        introduction += points[0].text + '.';
      } else {
        introduction += 'your recent achievements.';
      }
    } else if (purpose === 'complaint' || purpose === 'refund') {
      introduction = `I'm writing regarding an issue I experienced with `;
      if (points.length > 0) {
        introduction += points[0].text + '.';
      } else {
        introduction += 'your product/service.';
      }
    } else {
      introduction = `I hope you're doing well. I'm reaching out regarding `;
      if (points.length > 0) {
        introduction += points[0].text + '.';
      } else {
        introduction += 'a matter I wanted to discuss with you.';
      }
    }
    
    // Generate body paragraphs from key points
    let body = '';
    const startPoints = purpose === 'introduction' || purpose === 'connection' ? 1 : 0;
    for (let i = startPoints; i < points.length; i++) {
      body += `\n\n${points[i].text}`;
    }
    
    // If no additional points beyond the first one used in introduction
    if ((startPoints === 1 && points.length === 1) || (startPoints === 0 && points.length === 0)) {
      body += '\n\nI look forward to discussing this matter further with you.';
    }
    
    // Generate appropriate closing based on email type and tone
    let closing = '\n\n';
    
    if (emailTone === 'formal' || type === 'academic') {
      closing += 'Thank you for your consideration.\n\nSincerely,';
    } else if (emailTone === 'friendly' || type === 'personal') {
      closing += 'Looking forward to your response!\n\nBest,';
    } else if (type === 'marketing') {
      closing += 'Don\'t hesitate to reach out if you have any questions.\n\nBest regards,';
    } else if (purpose === 'gratitude' || purpose === 'congratulations') {
      closing += 'Once again, ' + (purpose === 'gratitude' ? 'thank you for everything.' : 'congratulations on your success.') + '\n\nWarmly,';
    } else {
      closing += 'Thank you for your time and consideration.\n\nBest regards,';
    }
    
    // Signature
    closing += '\n\n[Your Name]';
    if (type === 'professional' || type === 'academic' || type === 'support') {
      closing += '\n[Your Position/Title]';
      closing += '\n[Your Organization]';
      closing += '\n[Contact Information]';
    }
    
    // Combine all parts
    const email = `Subject: ${finalSubject}\n\n${greeting}\n\n${introduction}${body}${closing}`;
    return email;
  };
  
  const generateSubjectLine = (type: string, purpose: string, to: string): string => {
    const purposeLabels: Record<string, string> = {
      introduction: 'Introduction',
      followup: 'Follow-up',
      meeting: 'Meeting Request',
      proposal: 'Proposal',
      status: 'Status Update',
      product: 'New Product Announcement',
      promotion: 'Special Offer',
      newsletter: 'Newsletter',
      event: 'Event Invitation',
      gratitude: 'Thank You',
      invitation: 'Invitation',
      congratulations: 'Congratulations',
      request: 'Quick Request',
      connection: 'New Connection',
      referral: 'Referral Request',
      application: 'Application',
      recommendation: 'Letter of Recommendation Request',
      inquiry: 'General Inquiry',
      complaint: 'Regarding My Recent Experience',
      refund: 'Refund Request',
      technical: 'Technical Support Request',
    };
    
    return purposeLabels[purpose] || 'Regarding Our Recent Discussion';
  };
  
  const copyToClipboard = () => {
    if (!generatedEmail) {
      toast({
        title: 'No email to copy',
        description: 'Please generate an email first',
        variant: 'destructive',
      });
      return;
    }
    
    navigator.clipboard.writeText(generatedEmail);
    
    toast({
      title: 'Copied to clipboard',
      description: 'Email has been copied to clipboard',
    });
  };
  
  const downloadEmail = () => {
    if (!generatedEmail) {
      toast({
        title: 'No email to download',
        description: 'Please generate an email first',
        variant: 'destructive',
      });
      return;
    }
    
    const filename = `email_to_${recipient.toLowerCase().replace(/\s+/g, '_')}.txt`;
    const blob = new Blob([generatedEmail], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: 'Email downloaded',
      description: `File saved as ${filename}`,
    });
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
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Smart Email Writer</h1>
          <p className="text-muted-foreground mt-2">Generate professional emails based on your goals</p>
        </div>
        
        <Tabs defaultValue="input">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="input">1. Email Details</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedEmail && !loading}>2. Generated Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Format</CardTitle>
                    <CardDescription>Select the type and purpose of your email</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-type">Email Type</Label>
                      <Select value={emailType} onValueChange={handleEmailTypeChange}>
                        <SelectTrigger id="email-type">
                          <SelectValue placeholder="Select email type" />
                        </SelectTrigger>
                        <SelectContent>
                          {emailTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-purpose">Email Purpose</Label>
                      <Select value={emailPurpose} onValueChange={setEmailPurpose}>
                        <SelectTrigger id="email-purpose">
                          <SelectValue placeholder="Select email purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {purposeOptions[emailType]?.map((purpose) => (
                            <SelectItem key={purpose.value} value={purpose.value}>
                              {purpose.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-tone">Email Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger id="email-tone">
                          <SelectValue placeholder="Select email tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Content</CardTitle>
                    <CardDescription>Provide details for your email</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient Name/Organization *</Label>
                        <Input
                          id="recipient"
                          placeholder="John Smith / Acme Inc."
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Email Subject (Optional)</Label>
                        <Input
                          id="subject"
                          placeholder="Leave blank for auto-generated subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="key-points">Key Points *</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={addKeyPoint}
                          className="h-8 px-2 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Point
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {keyPoints.map((point, index) => (
                          <div key={point.id} className="flex items-center gap-2">
                            <Badge variant="outline" className="flex-shrink-0">
                              {index + 1}
                            </Badge>
                            <Input
                              value={point.text}
                              onChange={(e) => updateKeyPoint(point.id, e.target.value)}
                              placeholder={`Key point ${index + 1}`}
                              className="flex-grow"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeKeyPoint(point.id)}
                              className="h-8 w-8 flex-shrink-0"
                              disabled={keyPoints.length === 1 && !point.text.trim()}
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        Add the main points you want to include in your email. Be concise but specific.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={generateEmail} 
                      disabled={loading || !recipient.trim() || keyPoints.every(p => !p.text.trim())}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating Email...
                        </>
                      ) : (
                        'Generate Email'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <CardTitle>Generated Email</CardTitle>
                    <CardDescription>
                      {generatedEmail 
                        ? `Email to ${recipient} - ${subject || generateSubjectLine(emailType, emailPurpose, recipient)}`
                        : 'Your email will appear here'
                      }
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" onClick={downloadEmail}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-muted-foreground text-sm">Creating your email...</p>
                    </div>
                  </div>
                ) : generatedEmail ? (
                  <div className="bg-muted p-6 rounded-md font-mono text-sm whitespace-pre-wrap">
                    {generatedEmail}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No email generated yet. Fill out the form and click "Generate Email".</p>
                  </div>
                )}
              </CardContent>
              {generatedEmail && (
                <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <p>Replace [Your Name], [Your Position/Title], etc. with your actual information before sending</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <p>Review and personalize the content to match your specific situation</p>
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmailWriter;
