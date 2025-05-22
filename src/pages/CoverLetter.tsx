
import React, { useState } from 'react';
import { FileText, FileDown, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';

const CoverLetter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [yourName, setYourName] = useState('');
  const [relevantExperience, setRelevantExperience] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerate = () => {
    if (!jobDescription.trim() || !companyName.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both job description and company name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const letter = generateCoverLetter(
        jobDescription,
        companyName,
        yourName || 'John Doe',
        relevantExperience
      );
      
      setGeneratedLetter(letter);
      setLoading(false);
      setActiveTab('preview');
      
      toast({
        title: 'Cover letter generated!',
        description: 'Your personalized cover letter has been created successfully.',
      });
    }, 1500);
  };

  const handleDownload = () => {
    // Create a blob from the letter content
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `cover-letter-${companyName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Cover letter downloaded',
      description: 'Your cover letter has been downloaded as a text file.',
    });
  };

  const generateCoverLetter = (
    jobDesc: string, 
    company: string, 
    name: string, 
    experience: string
  ): string => {
    // Extract job title from the first line of job description
    const jobTitle = jobDesc.split('\n')[0]?.trim() || 'Position';
    
    // Extract keywords from job description
    const keywords = jobDesc
      .toLowerCase()
      .match(/\b(experience|skills?|qualifications?|proficient|knowledge|expert|familiar|years|degree|bachelor|master)\b/g)
      ?.slice(0, 5)
      .join(', ') || 'relevant skills';
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `${currentDate}

${name}
123 Professional Avenue
City, State ZIP
Phone: (555) 555-5555
Email: ${name.toLowerCase().replace(/\s+/g, '.')}@email.com

${company} Hiring Manager
${company}
City, State ZIP

Dear ${company} Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${company}. With my background in ${keywords}, I am confident in my ability to make a significant contribution to your team.

Upon reviewing the job description, I was excited to find that my experience and skills align perfectly with what you are seeking. ${experience ? experience : `Throughout my career, I have developed a strong foundation in ${jobTitle.toLowerCase()} and have consistently demonstrated my ability to deliver results.`}

What particularly draws me to ${company} is your reputation for ${company.length > 5 ? 'innovation and excellence' : 'quality and customer satisfaction'} in the industry. I am enthusiastic about the possibility of bringing my unique perspective and skills to your team and contributing to your continued success.

Some of my key accomplishments include:
• Successfully implementing strategies that increased efficiency by 20%
• Collaborating effectively with cross-functional teams to achieve company objectives
• Developing innovative solutions to complex challenges in the workplace

I am excited about the opportunity to discuss how my background, skills, and experiences would be an ideal fit for the ${jobTitle} position at ${company}. Thank you for considering my application. I look forward to the possibility of working with your team.

Sincerely,

${name}
`;
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
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Cover Letter Generator</h1>
          <p className="text-muted-foreground mt-2">Create personalized cover letters tailored to specific job positions</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input">Input Details</TabsTrigger>
            <TabsTrigger value="preview">Preview Letter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Enter Job and Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description*</Label>
                  <Textarea 
                    id="jobDescription"
                    placeholder="Paste the job description here" 
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    This helps tailor your cover letter to the specific position
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name*</Label>
                  <Input 
                    id="companyName"
                    placeholder="e.g. Acme Corporation" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yourName">Your Name</Label>
                  <Input 
                    id="yourName"
                    placeholder="e.g. John Doe" 
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relevantExperience">Relevant Experience/Skills</Label>
                  <Textarea 
                    id="relevantExperience"
                    placeholder="Briefly describe your relevant experience and skills for this position" 
                    value={relevantExperience}
                    onChange={(e) => setRelevantExperience(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !jobDescription.trim() || !companyName.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Cover Letter'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Your Personalized Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedLetter ? (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="whitespace-pre-wrap text-sm">{generatedLetter}</pre>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={handleDownload} 
                        className="flex-1"
                        variant="default"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Cover Letter
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('input')} 
                        variant="outline"
                        className="flex-1"
                      >
                        Edit Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">
                      No cover letter generated yet. Fill in the details and click "Generate Cover Letter".
                    </p>
                    <Button 
                      onClick={() => setActiveTab('input')} 
                      variant="outline"
                      className="mt-4"
                    >
                      Go to Input Form
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Cover Letter Writing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always customize your letter for each job application</li>
                <li>Research the company to show genuine interest</li>
                <li>Address a specific person when possible, rather than "To Whom It May Concern"</li>
                <li>Focus on what you can do for the company, not just what you want</li>
                <li>Keep it concise - aim for 3-4 paragraphs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CoverLetter;
