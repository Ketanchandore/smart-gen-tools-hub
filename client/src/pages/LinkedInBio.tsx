
import React, { useState } from 'react';
import { User, FileDown, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';

const LinkedInBio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentRole, setCurrentRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [goals, setGoals] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedBio, setGeneratedBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerate = () => {
    if (!currentRole.trim() || !industry.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide your current role and industry',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const bio = generateLinkedInBio(currentRole, industry, skills, experience, goals, tone);
      setGeneratedBio(bio);
      setLoading(false);
      setActiveTab('preview');
      
      toast({
        title: 'Profile generated!',
        description: 'Your LinkedIn profile has been optimized successfully.',
      });
    }, 1500);
  };

  const handleDownload = () => {
    // Create a blob from the bio content
    const blob = new Blob([generatedBio], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'linkedin-profile.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Profile downloaded',
      description: 'Your optimized LinkedIn profile has been downloaded as a text file.',
    });
  };

  const generateLinkedInBio = (
    role: string, 
    industry: string, 
    skills: string, 
    experience: string, 
    goals: string,
    tone: string
  ): string => {
    // Extract relevant keywords
    const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);
    const relevantSkills = skillsList.length > 0 ? 
      skillsList.join(', ') : 
      'leadership, problem-solving, communication, teamwork';
    
    // Adjust tone based on selection
    let toneAdjectives, openingSentence;
    
    switch(tone) {
      case 'casual':
        toneAdjectives = ['passionate', 'enthusiastic', 'dedicated'];
        openingSentence = `Hi there! I'm a ${role} with a passion for driving results in the ${industry} space.`;
        break;
      case 'confident':
        toneAdjectives = ['results-driven', 'accomplished', 'top-performing'];
        openingSentence = `Award-winning ${role} with a proven track record of excellence in the ${industry} industry.`;
        break;
      case 'creative':
        toneAdjectives = ['innovative', 'creative', 'forward-thinking'];
        openingSentence = `Reimagining what's possible as a ${role} in the evolving landscape of ${industry}.`;
        break;
      case 'professional':
      default:
        toneAdjectives = ['experienced', 'strategic', 'skilled'];
        openingSentence = `${toneAdjectives[0]} ${role} with expertise in driving strategic initiatives in the ${industry} sector.`;
    }
    
    // Generate summary section
    const summary = `# LinkedIn Profile Summary

${openingSentence}

${toneAdjectives[1]} professional focused on delivering exceptional results through ${relevantSkills}. ${experience ? experience : `With years of experience in ${industry}, I've developed deep expertise in key areas that drive business success.`}

${goals ? `Looking to ${goals}` : `Seeking opportunities to leverage my expertise in ${industry} to drive innovation and organizational growth.`}

## Experience Highlights

• Led cross-functional teams to achieve ${Math.floor(Math.random() * 30) + 10}% growth in key metrics
• Implemented strategic initiatives resulting in improved efficiency and reduced costs
• Collaborated with stakeholders to align business objectives with technological solutions
• ${role.includes('Manager') ? 'Managed teams of professionals, providing mentorship and guidance' : 'Contributed to team success through specialized expertise and collaborative problem-solving'}

## Technical Proficiencies

${skillsList.length > 0 ? skillsList.map(skill => `• ${skill}`).join('\n') : 
`• Strategic Planning
• Team Leadership
• Project Management
• Data Analysis
• Performance Optimization`}

## Contact Information

I'm always open to discussing new opportunities and challenges in the ${industry} space. Feel free to connect!

📧 Email: yourname@email.com
🔗 Portfolio: yourportfolio.com
📱 LinkedIn: linkedin.com/in/yourprofile
`;

    return summary;
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
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">LinkedIn Profile Optimizer</h1>
          <p className="text-muted-foreground mt-2">Create an optimized LinkedIn profile that stands out to recruiters and connections</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input">Input Information</TabsTrigger>
            <TabsTrigger value="preview">Preview Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Current Role/Title*</Label>
                  <Input 
                    id="currentRole"
                    placeholder="e.g. Senior Product Manager" 
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry*</Label>
                  <Input 
                    id="industry"
                    placeholder="e.g. Technology, Healthcare, Finance" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills (comma separated)</Label>
                  <Input 
                    id="skills"
                    placeholder="e.g. Project Management, Data Analysis, Leadership" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Brief Work Experience</Label>
                  <Textarea 
                    id="experience"
                    placeholder="Briefly describe your relevant work experience" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goals">Career Goals</Label>
                  <Input 
                    id="goals"
                    placeholder="e.g. Transition to leadership, Find remote opportunities" 
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tone">Profile Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a tone for your profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="confident">Confident & Assertive</SelectItem>
                      <SelectItem value="creative">Creative & Innovative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !currentRole.trim() || !industry.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing Profile...
                    </>
                  ) : (
                    'Generate Optimized Profile'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Your Optimized LinkedIn Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedBio ? (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="whitespace-pre-wrap text-sm">{generatedBio}</pre>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={handleDownload} 
                        className="flex-1"
                        variant="default"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Profile
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('input')} 
                        variant="outline"
                        className="flex-1"
                      >
                        Edit Information
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">
                      No profile generated yet. Fill in your details and click "Generate Optimized Profile".
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
              <CardTitle className="text-xl">LinkedIn Profile Optimization Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use industry-specific keywords to improve visibility in searches</li>
                <li>Quantify achievements with specific metrics when possible</li>
                <li>Keep your summary concise and focused on your unique value</li>
                <li>Include a professional profile photo to increase engagement</li>
                <li>Request recommendations from colleagues to build credibility</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LinkedInBio;
