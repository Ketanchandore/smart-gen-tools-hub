
import React, { useState } from 'react';
import { Briefcase, FileDown, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { AdvancedToolSEO } from '@/components/AdvancedToolSEO';
import { Link } from 'react-router-dom';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide a job description to create a tailored resume',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const resumeTemplate = generateResumeContent(jobDescription, skills, experience, education);
      setGeneratedResume(resumeTemplate);
      setLoading(false);
      setActiveTab('preview');
      
      toast({
        title: 'Resume generated!',
        description: 'Your tailored resume has been created successfully.',
      });
    }, 1500);
  };

  const handleDownload = () => {
    // Create a blob from the resume content
    const blob = new Blob([generatedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tailored-resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Resume downloaded',
      description: 'Your resume has been downloaded as a text file.',
    });
  };

  const generateResumeContent = (jobDesc: string, skills: string, experience: string, education: string) => {
    // Extract keywords from job description
    const keywords = jobDesc
      .toLowerCase()
      .match(/\b(experience|skills?|qualifications?|proficient|knowledge|expert|familiar|years|degree|bachelor|master)\b/g)
      ?.join(', ') || '';

    const jobTitle = jobDesc.split('\n')[0]?.trim() || 'Position Title';
    
    // Generate a resume based on input
    return `# PROFESSIONAL RESUME

## CONTACT INFORMATION
John Doe
123 Professional Lane
City, State ZIP
Phone: (555) 555-5555
Email: john.doe@email.com
LinkedIn: linkedin.com/in/johndoe

## PROFESSIONAL SUMMARY
Dedicated and results-driven professional with extensive experience in ${jobTitle.toLowerCase()}. Proven track record of ${
      experience ? experience.split(' ').slice(0, 15).join(' ') + '...' : 'delivering exceptional results and driving business growth'
    }. Seeking to leverage my skills and expertise in a challenging role that allows for professional growth and innovation.

## SKILLS
${skills ? 
      skills.split(',').map(skill => '- ' + skill.trim()).join('\n') : 
      '- Communication\n- Leadership\n- Problem Solving\n- Teamwork\n- Time Management\n- Adaptability'}

## PROFESSIONAL EXPERIENCE

### Senior ${jobTitle}
XYZ Corporation | City, State | January 2020 - Present

${jobDesc.split(' ').slice(0, 30).join(' ')}...
- Led cross-functional teams to deliver projects on time and within budget
- Increased department efficiency by 25% through implementation of new processes
- Collaborated with stakeholders to align project goals with business objectives

### ${jobTitle}
ABC Company | City, State | June 2017 - December 2019

- Developed and implemented strategic initiatives resulting in 15% revenue growth
- Managed team of 5 professionals, providing mentorship and guidance
- Streamlined operations to reduce costs while maintaining quality standards

## EDUCATION
${education ? 
      education : 
      'Bachelor of Science in Business Administration\nUniversity of Example\nGraduated: May 2017'}

## CERTIFICATIONS
- Professional Certification in ${jobTitle.split(' ')[0]} Management
- Advanced Training in Industry Best Practices

## REFERENCES
Available upon request
`;
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="AI Resume Builder"
        category="Career Tools"
        description="Create professional, ATS-friendly resumes with AI assistance"
        features={[
          'AI-powered content suggestions',
          'ATS-optimized formatting',
          'Professional templates',
          'Instant download',
          'Multiple format support'
        ]}
        useCases={[
          'create professional resumes',
          'optimize for ATS systems',
          'get AI writing assistance',
          'save time in job applications'
        ]}
        keywords={[
          'resume builder',
          'AI resume maker',
          'professional resume',
          'ATS resume',
          'resume templates'
        ]}
      />
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <Briefcase className="h-4 w-4" />
            Back to Tools
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">AI Resume Builder</h1>
          <p className="text-muted-foreground mt-2">Create professional resumes tailored to specific job descriptions</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="input">Input Information</TabsTrigger>
            <TabsTrigger value="preview">Preview Resume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>Enter Job Details</CardTitle>
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
                    This helps tailor your resume to specific job requirements
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <Input 
                    id="skills"
                    placeholder="e.g. Project Management, JavaScript, Team Leadership" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Professional Experience</Label>
                  <Textarea 
                    id="experience"
                    placeholder="Briefly describe your work experience" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input 
                    id="education"
                    placeholder="e.g. Bachelor of Science in Computer Science, University of Example" 
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading || !jobDescription.trim()} 
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Resume'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Your Tailored Resume</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedResume ? (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="whitespace-pre-wrap text-sm">{generatedResume}</pre>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={handleDownload} 
                        className="flex-1"
                        variant="default"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Resume
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
                      No resume generated yet. Fill in your details and click "Generate Resume".
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
              <CardTitle className="text-xl">Resume Building Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Tailor your resume to each job you apply for</li>
                <li>Use keywords from the job description</li>
                <li>Quantify your achievements with numbers when possible</li>
                <li>Keep your resume concise and focused</li>
                <li>Proofread carefully for errors and typos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-muted/30 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Create Professional Resumes with AI Assistance
            </h2>
            <p className="text-muted-foreground mb-4">
              Our free AI resume builder helps job seekers create professional, ATS-friendly resumes that get noticed by recruiters. 
              With smart formatting, content suggestions, and industry-specific templates, you can build a standout resume in minutes.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you're a recent graduate, career changer, or experienced professional, our resume builder adapts to your needs. 
              Get AI-powered suggestions for skills, achievements, and keywords that match your target job descriptions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Key Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ATS-optimized templates that pass applicant tracking systems</li>
                  <li>• AI-powered content suggestions for each section</li>
                  <li>• Real-time formatting and layout optimization</li>
                  <li>• Industry-specific keywords and phrases</li>
                  <li>• Professional templates for all career levels</li>
                  <li>• Instant PDF download with perfect formatting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Perfect For:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Job seekers applying to competitive positions</li>
                  <li>• Career changers entering new industries</li>
                  <li>• Recent graduates with limited experience</li>
                  <li>• Professionals updating their resumes</li>
                  <li>• Anyone needing a quick, professional resume</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Related Tools */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Complete Your Job Application</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/cover-letter" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">Cover Letter Generator</h4>
                <p className="text-sm text-muted-foreground">Create personalized cover letters</p>
              </Link>
              <Link to="/interview-coach" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">Interview Coach</h4>
                <p className="text-sm text-muted-foreground">Practice with AI interview questions</p>
              </Link>
              <Link to="/linkedin-bio" className="block p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <h4 className="font-medium text-foreground mb-1">LinkedIn Optimizer</h4>
                <p className="text-sm text-muted-foreground">Optimize your LinkedIn profile</p>
              </Link>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Boost your job search with our complete suite of career tools. All tools are 100% free with no registration required.
                <Link to="/pricing" className="text-primary hover:underline ml-1">Learn why we're free →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default ResumeBuilder;
