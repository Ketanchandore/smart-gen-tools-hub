
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, AlertTriangle, Scale } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Terms & Conditions - Pine Tools Hub | Usage Terms & Guidelines"
        description="Read Pine Tools Hub's Terms & Conditions. Understand the usage guidelines, limitations, and legal terms for our AI-powered online tools."
        keywords="terms and conditions, usage terms, legal agreement, pine tools hub terms"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
          <p className="text-xl text-muted-foreground">
            These terms govern your use of Pine Tools Hub services.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
              </div>
              <p className="text-muted-foreground">
                By accessing or using Pine Tools Hub, you agree to be bound by these terms. 
                If you disagree with any part of these terms, you may not access the service.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Use of Services</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Permitted Use</h3>
                  <p>Our tools are intended for personal, educational, and small business use only. You may use our services to:</p>
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• Process documents and content for legitimate purposes</li>
                    <li>• Generate content for educational or professional use</li>
                    <li>• Test and experiment with our tools</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Prohibited Use</h3>
                  <p>You agree not to:</p>
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• Misuse, replicate, or resell our services</li>
                    <li>• Upload illegal, harmful, or copyrighted content</li>
                    <li>• Attempt to reverse engineer or hack our systems</li>
                    <li>• Use tools for commercial resale without permission</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Content Responsibility</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You are solely responsible for all content generated, uploaded, or processed using our tools. 
                  We do not monitor, moderate, or take responsibility for user inputs or outputs.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Important:</strong> Ensure you have the right to use and process any content you upload. 
                    Do not upload copyrighted material without permission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Service Availability</h3>
                  <p>
                    We strive to provide accurate and functional tools, but we do not guarantee 100% uptime, 
                    accuracy, or suitability for every situation. Use is at your own risk.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Damages</h3>
                  <p>
                    In no event shall Pine Tools Hub be liable for any indirect, incidental, special, 
                    consequential, or punitive damages arising from your use of our services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">APIs & Third-Party Services</h3>
                  <p>
                    We may integrate APIs or services from third parties (e.g., Razorpay IFSC, AI models). 
                    We are not liable for their content, functionality, availability, or data practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Additional Terms</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Changes to Terms</h3>
                  <p>
                    We may update these terms periodically. Continued use of the website implies 
                    your acceptance of the revised terms.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Termination</h3>
                  <p>
                    We reserve the right to suspend or terminate access to our services at any time, 
                    with or without cause or notice.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Governing Law</h3>
                  <p>
                    These terms shall be governed by and construed in accordance with applicable laws. 
                    Any disputes shall be resolved through appropriate legal channels.
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

export default TermsConditions;
