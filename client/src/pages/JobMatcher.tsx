
import React, { useState } from 'react';
import { Briefcase, FileUp, RefreshCw, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';

const JobMatcher = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult | null>(null);
  
  type MatchResult = {
    overallMatch: number;
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    missingKeywords: string[];
    recommendations: string[];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setContent: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Only accept text files for this demo
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      toast({
        title: 'Invalid file format',
        description: 'Please upload a text (.txt) file',
        variant: 'destructive',
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setContent(content);
    };
    reader.readAsText(file);
    
    toast({
      title: 'File uploaded successfully',
      description: `Uploaded ${file.name}`,
    });
  };

  const analyzeMatch = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both resume content and job description',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Extract keywords from job description (simplified algorithm for demo)
      const jobKeywords = extractKeywords(jobDescription.toLowerCase());
      
      // Calculate matches based on keyword presence in resume
      const resumeLower = resumeText.toLowerCase();
      
      let skillMatches = 0;
      let experienceMatches = 0;
      let educationMatches = 0;
      const missingKeywords: string[] = [];
      
      // Check skills matches
      const skillKeywords = ['proficient', 'skilled', 'expert', 'experienced', 'knowledge'];
      jobKeywords.forEach(keyword => {
        if (skillKeywords.some(sk => keyword.includes(sk)) && !resumeLower.includes(keyword)) {
          missingKeywords.push(keyword);
        } else if (skillKeywords.some(sk => keyword.includes(sk)) && resumeLower.includes(keyword)) {
          skillMatches++;
        }
      });
      
      // Check experience matches
      const experienceKeywords = ['year', 'experience', 'led', 'managed', 'developed', 'created'];
      jobKeywords.forEach(keyword => {
        if (experienceKeywords.some(ek => keyword.includes(ek)) && !resumeLower.includes(keyword)) {
          if (!missingKeywords.includes(keyword)) missingKeywords.push(keyword);
        } else if (experienceKeywords.some(ek => keyword.includes(ek)) && resumeLower.includes(keyword)) {
          experienceMatches++;
        }
      });
      
      // Check education matches
      const educationKeywords = ['degree', 'bachelor', 'master', 'phd', 'certification', 'diploma'];
      jobKeywords.forEach(keyword => {
        if (educationKeywords.some(ek => keyword.includes(ek)) && !resumeLower.includes(keyword)) {
          if (!missingKeywords.includes(keyword)) missingKeywords.push(keyword);
        } else if (educationKeywords.some(ek => keyword.includes(ek)) && resumeLower.includes(keyword)) {
          educationMatches++;
        }
      });
      
      // Calculate match percentages
      const skillsMatchPercentage = Math.min(Math.floor(skillMatches * 20) + 30, 100);
      const experienceMatchPercentage = Math.min(Math.floor(experienceMatches * 15) + 35, 100);
      const educationMatchPercentage = Math.min(Math.floor(educationMatches * 25) + 40, 100);
      
      // Overall match is weighted average
      const overallMatchPercentage = Math.floor(
        (skillsMatchPercentage * 0.5) + 
        (experienceMatchPercentage * 0.35) + 
        (educationMatchPercentage * 0.15)
      );
      
      // Generate recommendations
      const recommendations = generateRecommendations(missingKeywords, overallMatchPercentage);
      
      setMatchResults({
        overallMatch: overallMatchPercentage,
        skillsMatch: skillsMatchPercentage,
        experienceMatch: experienceMatchPercentage,
        educationMatch: educationMatchPercentage,
        missingKeywords: missingKeywords.slice(0, 5), // Limit to top 5
        recommendations
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: 'Analysis complete!',
        description: `Your resume has a ${overallMatchPercentage}% match for this job.`,
      });
    }, 2000);
  };
  
  const extractKeywords = (text: string): string[] => {
    // Simple keyword extraction for demo purposes
    const words = text.split(/\s+/);
    const keywords = new Set<string>();
    
    // Look for phrases (2-3 word combinations)
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].length > 3 && !words[i].match(/^[0-9]+$/)) {
        keywords.add(words[i]);
        
        if (i < words.length - 1) {
          keywords.add(`${words[i]} ${words[i+1]}`);
        }
        
        if (i < words.length - 2) {
          keywords.add(`${words[i]} ${words[i+1]} ${words[i+2]}`);
        }
      }
    }
    
    return Array.from(keywords);
  };
  
  const generateRecommendations = (missingKeywords: string[], overallMatch: number): string[] => {
    const recommendations: string[] = [];
    
    if (missingKeywords.length > 0) {
      recommendations.push(`Add these keywords to your resume: ${missingKeywords.slice(0, 3).join(', ')}`);
    }
    
    if (overallMatch < 50) {
      recommendations.push('This job may not be the best fit for your current resume. Consider applying for positions that better align with your experiences.');
    } else if (overallMatch < 70) {
      recommendations.push('Customize your resume to highlight relevant experiences for this specific position.');
    } else {
      recommendations.push('Your resume matches well with this job! Make sure to emphasize your strongest qualifications during the interview.');
    }
    
    recommendations.push('Quantify your achievements with specific metrics when possible.');
    
    if (overallMatch < 80) {
      recommendations.push('Consider adding industry-specific certifications or training to improve your qualifications.');
    }
    
    return recommendations;
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
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Job Match Analyzer</h1>
          <p className="text-muted-foreground mt-2">Compare your resume to job descriptions to find your perfect match</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Resume</CardTitle>
              <CardDescription>Paste your resume text or upload a text file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste your resume content here..."
                className="min-h-[300px] font-mono text-sm"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <Input
                  id="resume-file"
                  type="file"
                  accept=".txt"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, setResumeText)}
                />
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('resume-file')?.click()}
                  className="w-full"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Resume (Text File)
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Paste the job description you want to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Paste job description here..."
                className="min-h-[300px] font-mono text-sm"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <Input
                  id="job-file"
                  type="file"
                  accept=".txt"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, setJobDescription)}
                />
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('job-file')?.click()}
                  className="w-full"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Job Description (Text File)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button 
            size="lg"
            onClick={analyzeMatch}
            disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              'Analyze Job Match'
            )}
          </Button>
        </div>
        
        {matchResults && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Match Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">Overall Match</span>
                    <span className="text-lg font-bold">{matchResults.overallMatch}%</span>
                  </div>
                  <Progress value={matchResults.overallMatch} className="h-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Skills Match</span>
                      <span className="font-medium">{matchResults.skillsMatch}%</span>
                    </div>
                    <Progress value={matchResults.skillsMatch} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Experience Match</span>
                      <span className="font-medium">{matchResults.experienceMatch}%</span>
                    </div>
                    <Progress value={matchResults.experienceMatch} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Education Match</span>
                      <span className="font-medium">{matchResults.educationMatch}%</span>
                    </div>
                    <Progress value={matchResults.educationMatch} className="h-2" />
                  </div>
                </div>
                
                {matchResults.missingKeywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResults.missingKeywords.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Improvement Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {matchResults.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobMatcher;
