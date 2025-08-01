
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, BookOpen, ExternalLink, Shield } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Disclaimer - Pine Tools Hub | Important Usage Information"
        description="Read Pine Tools Hub's Disclaimer. Important information about tool limitations, educational use, and professional advice disclaimers."
        keywords="disclaimer, legal disclaimer, tool limitations, educational use, pine tools hub"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Disclaimer</h1>
          <p className="text-xl text-muted-foreground">
            Important information about the use and limitations of Pine Tools Hub services.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-border border-orange-200">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">General Disclaimer</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Pine Tools Hub provides AI-powered tools and utilities for <strong>informational and educational purposes only</strong>. 
                While we strive for accuracy and reliability, we make no guarantees regarding the correctness, 
                completeness, or applicability of tool outputs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Not Professional Advice</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg font-medium text-orange-600">
                  <strong>Important:</strong> None of our tools are intended to offer medical, legal, financial, or professional advice.
                </p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What This Means:</h3>
                  <ul className="space-y-2 ml-4">
                    <li>• Resume builders create templates, not career counseling</li>
                    <li>• Financial tools are for calculations, not investment advice</li>
                    <li>• Health-related outputs are informational, not medical guidance</li>
                    <li>• Legal document templates are not legal advice</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Always consult with a qualified professional</strong> before making important decisions 
                    based on tool results. We strongly recommend seeking expert advice for medical, legal, 
                    financial, or other professional matters.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Testing & Educational Use</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All tools are provided <strong>"as-is"</strong> for testing and educational purposes. 
                  We are not responsible for:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Misuse of tool outputs or generated content</li>
                  <li>• Data loss or corruption during processing</li>
                  <li>• Any damages resulting from the use of our services</li>
                  <li>• Decisions made based on tool results</li>
                  <li>• Compatibility issues with your specific use case</li>
                </ul>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Recommendation:</strong> Always verify outputs, keep backups of important files, 
                    and test tools with non-critical data first.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <ExternalLink className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Third-Party APIs & Services</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Some functionalities rely on external APIs and services. We disclaim responsibility for:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">APIs We Use:</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• Razorpay IFSC API</li>
                      <li>• PostalPIN API</li>
                      <li>• AI and ML models</li>
                      <li>• Payment processors</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">We Don't Control:</h3>
                    <ul className="space-y-1 ml-4">
                      <li>• Third-party data accuracy</li>
                      <li>• External service availability</li>
                      <li>• API response times</li>
                      <li>• Third-party privacy practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Fair Use & Best Practices</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>To get the best results from our tools:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Use tools for their intended purposes</li>
                  <li>• Verify important outputs independently</li>
                  <li>• Don't rely solely on automated results for critical decisions</li>
                  <li>• Respect copyright and intellectual property laws</li>
                  <li>• Report bugs or issues to help us improve</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Questions or concerns?</strong> Contact us at 
                    <a href="mailto:pineappletech.official@gmail.com" className="text-blue-600 hover:text-blue-800 ml-1">
                      pineappletech.official@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
