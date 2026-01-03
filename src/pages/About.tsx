import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Shield, Heart, Zap, Sparkles, Moon, RefreshCw, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About Us - PineToolsHub | Free Online Tools Platform (PineTools Alternative)"
        description="Learn about PineToolsHub - a modern, faster, ad-free alternative to Pinetools. Free PDF tools, AI utilities, and online converters with no registration required."
        keywords="about pinetoolshub, pinetools alternative, free online tools, pdf tools, ai utilities"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About PineToolsHub</h1>
          <p className="text-xl text-muted-foreground">
            Your all-in-one AI-powered toolkit - A modern Pinetools alternative
          </p>
        </div>

        {/* Why We Built Section */}
        <Card className="border-border mb-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Why We Built PineToolsHub</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We built PineToolsHub to provide a cleaner, ad-free experience for developers and designers. 
              While the original PineTools has been around for years, we wanted to modernize the experience with:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Beautiful, Responsive UI</h3>
                  <p className="text-sm text-muted-foreground">Works perfectly on desktop, tablet, and mobile devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                <Zap className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Faster Processing</h3>
                  <p className="text-sm text-muted-foreground">Optimized code and servers for instant results</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Ad-Free Forever</h3>
                  <p className="text-sm text-muted-foreground">No intrusive ads or sponsored content</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                <Moon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Dark Mode Support</h3>
                  <p className="text-sm text-muted-foreground">Easy on the eyes, especially for developers</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                <RefreshCw className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Regular Updates</h3>
                  <p className="text-sm text-muted-foreground">New tools added monthly based on community feedback</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Open to Suggestions</h3>
                  <p className="text-sm text-muted-foreground">Email us to request new tools anytime</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-foreground font-medium mt-6 text-center">
              Our mission: Make developers' lives easier with tools that just work.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 mb-12">
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Welcome to <strong>PineToolsHub</strong> – your comprehensive suite of online tools designed to make content creation, 
                document processing, career development, and everyday tasks faster and smarter. From AI resume builders to PDF editors, 
                YouTube summarizers to code generators — our tools are optimized for ease, speed, and quality. We're the modern 
                Pinetools alternative you've been looking for.
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
                Whether you're a student writing an assignment, a developer testing code, or a marketer creating social media content, 
                PineToolsHub has something for everyone:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-4">
                <li>• Students and educators seeking productivity tools</li>
                <li>• Professionals managing documents and content</li>
                <li>• Small businesses automating routine tasks</li>
                <li>• Developers and creators building projects</li>
                <li>• Anyone looking for a better Pinetools alternative</li>
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
                We are committed to transparency, user privacy, and providing free or affordable access to AI technologies for personal, 
                educational, and small business use. Our mission is simple: empower people to get more done with intelligent tools. 
                No fluff, no complexity — just clean, reliable utilities you can count on.
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

        {/* CTA Section */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">Explore our complete collection of free tools - no registration required.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pdf-tools">
              <Button size="lg">Explore PDF Tools</Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">View All Tools</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
