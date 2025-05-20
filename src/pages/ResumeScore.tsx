
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, ArrowLeft, Upload, BarChart3, Download, File } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface ScoreCategory {
  name: string;
  score: number;
  feedback: string;
}

const ResumeScore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    overallScore: number;
    categories: ScoreCategory[];
    improvement: string[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if the file is a PDF or DOCX
      if (!selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.docx')) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF or DOCX file",
          variant: "destructive",
        });
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      setScoreResult(null);
    }
  };

  const analyzeResume = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume file first",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate analysis with a delay
    setTimeout(() => {
      // Generate mock resume analysis data
      const mockScoreResult = {
        overallScore: Math.floor(Math.random() * 31) + 70, // Random score between 70-100
        categories: [
          {
            name: "Content Quality",
            score: Math.floor(Math.random() * 31) + 70,
            feedback: "Your resume has good content but could use more specific achievements and metrics."
          },
          {
            name: "Formatting",
            score: Math.floor(Math.random() * 31) + 70,
            feedback: "The formatting is clean but consider improving section hierarchy and visual balance."
          },
          {
            name: "ATS Compatibility",
            score: Math.floor(Math.random() * 31) + 70,
            feedback: "Your resume is moderately compatible with ATS systems. Consider using more industry-standard section headings."
          },
          {
            name: "Skills Relevance",
            score: Math.floor(Math.random() * 31) + 70,
            feedback: "Your skills section is good but could be better tailored to specific job descriptions."
          },
          {
            name: "Impact & Achievements",
            score: Math.floor(Math.random() * 31) + 70,
            feedback: "Your achievements need more quantifiable results and metrics to demonstrate impact."
          }
        ],
        improvement: [
          "Add more quantifiable achievements with specific metrics",
          "Tailor your skills section to match job descriptions more closely",
          "Improve the formatting consistency throughout your resume",
          "Use more action verbs at the beginning of your bullet points",
          "Include relevant keywords from the job description to improve ATS score"
        ]
      };
      
      setScoreResult(mockScoreResult);
      setAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your resume has been analyzed successfully",
      });
    }, 2500);
  };

  // Helper function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-emerald-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  // Helper function to determine progress color
  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-emerald-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
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
            <BarChart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Resume Score Analyzer</h1>
          <p className="text-muted-foreground mt-2">Get detailed feedback and scoring for your resume</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
              <input 
                type="file" 
                accept=".pdf,.docx" 
                onChange={handleFileChange} 
                className="hidden" 
                id="resume-upload"
              />
              <Label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <File className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">
                  {file ? file.name : 'Click to select resume file or drop it here'}
                </span>
                <span className="text-sm text-muted-foreground">
                  PDF or DOCX format (max 5MB)
                </span>
              </Label>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={analyzeResume}
                disabled={!file || analyzing}
                className="px-8 flex items-center gap-2"
              >
                {analyzing ? "Analyzing..." : (
                  <>
                    <BarChart3 className="h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {scoreResult && (
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
                  <div className="flex items-center justify-center">
                    <div className={`text-5xl font-bold ${getScoreColor(scoreResult.overallScore)}`}>
                      {scoreResult.overallScore}
                    </div>
                    <div className="text-2xl font-bold text-muted-foreground ml-1">/100</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Category Breakdown</h3>
                  {scoreResult.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className={`font-bold ${getScoreColor(category.score)}`}>{category.score}/100</span>
                      </div>
                      <Progress 
                        value={category.score} 
                        className={`h-2 ${getProgressColor(category.score)}`} 
                      />
                      <p className="text-sm text-muted-foreground">{category.feedback}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Improvement Suggestions</h2>
                <ul className="space-y-2 ml-6 list-disc">
                  {scoreResult.improvement.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Button className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a demo implementation. For a real resume scoring service, a sophisticated AI algorithm would analyze your resume against industry standards and job requirements.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeScore;
