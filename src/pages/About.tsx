
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Shield, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Us - Pine Tools Hub | AI-Powered Online Tools Platform"
        description="Learn about Pine Tools Hub - your comprehensive AI-powered toolkit for content creation, PDF tools, career development, and productivity utilities."
        keywords="about pine tools hub, AI tools platform, online utilities, PDF tools, content creation tools"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Pine Tools Hub</h1>
          <p className="text-xl text-muted-foreground">
            Your all-in-one AI-powered toolkit for creators, professionals, and learners
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Welcome to <strong>Pine Tools Hub</strong> – your comprehensive suite of online tools designed to make content creation, document processing, career development, and everyday tasks faster and smarter. From AI resume builders to PDF editors, YouTube summarizers to code generators — our tools are optimized for ease, speed, and quality.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Who We Serve</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Whether you're a student writing an assignment, a developer testing code, or a marketer creating social media content, Pine Tools Hub has something for everyone:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-4">
                <li>• Students and educators seeking productivity tools</li>
                <li>• Professionals managing documents and content</li>
                <li>• Small businesses automating routine tasks</li>
                <li>• Developers and creators building projects</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Our Commitment</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We are committed to transparency, user privacy, and providing free or affordable access to AI technologies for personal, educational, and small business use. Our mission is simple: empower people to get more done with intelligent tools. No fluff, no complexity — just clean, reliable utilities you can count on.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Our Values</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Simplicity</h3>
                  <p>Clean, intuitive interfaces that anyone can use</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Privacy</h3>
                  <p>Your data stays yours - we don't store or sell personal information</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Quality</h3>
                  <p>Reliable tools that deliver consistent, accurate results</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Accessibility</h3>
                  <p>Free and affordable tools for everyone, everywhere</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
