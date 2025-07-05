
import React from 'react';
import { ArrowLeft, Heart, Users, Zap, Globe, Award, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Smart Gen Tools Hub - AI-Powered Productivity Tools by Pineapple Technologies"
        description="Learn about Smart Gen Tools Hub and Pineapple Technologies. Discover our mission to provide free, AI-powered tools for enhanced productivity and creativity."
      />
      
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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Smart Gen Tools Hub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering creativity and productivity through intelligent, AI-powered tools that are free, fast, and accessible to everyone.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize access to powerful AI tools by providing a comprehensive suite of free, 
                user-friendly applications that enhance productivity, creativity, and efficiency for 
                individuals and businesses worldwide.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Accessibility:</strong> Free tools for everyone</li>
                <li>• <strong>Quality:</strong> Professional-grade results</li>
                <li>• <strong>Privacy:</strong> No login required for most tools</li>
                <li>• <strong>Innovation:</strong> Cutting-edge AI technology</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Makes Us Different</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Optimized for speed with instant results. No waiting, no delays - just efficient tools that work.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                  User-Centric
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Designed with real users in mind. Intuitive interfaces and comprehensive features for all skill levels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-green-500" />
                  Always Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cloud-based tools accessible 24/7 from any device. Work from anywhere, anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                About Pineapple Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pineapple Technologies is a forward-thinking technology company dedicated to creating 
                innovative solutions that simplify complex tasks. Founded with the vision of making 
                advanced technology accessible to everyone, we specialize in developing AI-powered 
                tools that enhance productivity and creativity.
              </p>
              <p className="text-muted-foreground">
                Our team consists of experienced developers, designers, and AI specialists who are 
                passionate about creating tools that make a real difference in people's daily work. 
                We believe in the power of artificial intelligence to augment human capabilities 
                rather than replace them.
              </p>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Why "Pineapple"?</h3>
                <p className="text-sm text-muted-foreground">
                  The pineapple symbolizes hospitality, warmth, and welcome - values that reflect 
                  our commitment to creating a welcoming environment where everyone can access 
                  powerful tools regardless of their technical background or budget.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who trust Smart Gen Tools Hub for their daily productivity needs.
          </p>
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Explore Our Tools
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
