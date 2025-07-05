
import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Terms of Service - Smart Gen Tools Hub"
        description="Read Smart Gen Tools Hub's terms of service to understand the rules and guidelines for using our AI-powered tools and services."
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

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: January 7, 2025
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                By accessing and using Smart Gen Tools Hub ("the Service"), you agree to be bound by these 
                Terms of Service ("Terms"). If you disagree with any part of these terms, you may not 
                access the Service.
              </p>
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  These terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                Smart Gen Tools Hub provides a collection of AI-powered tools and utilities including but not limited to:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• PDF processing and conversion tools</li>
                <li>• AI content generation tools</li>
                <li>• Resume and document builders</li>
                <li>• Image processing and generation tools</li>
                <li>• Utility tools and generators</li>
                <li>• Other productivity and creative tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Acceptable Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to use the Service:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>• To submit false or misleading information</li>
                <li>• To upload or transmit viruses or any other type of malicious code</li>
                <li>• To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>• For any obscene or immoral purpose</li>
                <li>• To interfere with or circumvent the security features of the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Content & Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Your Content</h3>
                <p className="text-sm text-muted-foreground">
                  You retain ownership of any content you submit, upload, or create using our tools. 
                  By using our Service, you grant us a limited, non-exclusive license to process 
                  your content solely for the purpose of providing the requested services.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Most of our tools process data locally in your browser or temporarily on our servers 
                  for processing purposes only. We do not store your personal content unless explicitly 
                  stated for specific features.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Content Responsibility</h3>
                <p className="text-sm text-muted-foreground">
                  You are solely responsible for the content you create, upload, or process using our tools. 
                  You warrant that you have all necessary rights to use such content.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                The following uses are strictly prohibited:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Creating, distributing, or facilitating the distribution of illegal content</li>
                <li>• Generating content that violates intellectual property rights</li>
                <li>• Creating fraudulent documents or materials</li>
                <li>• Attempting to reverse engineer or compromise our systems</li>
                <li>• Using automated tools to access our services at scale without permission</li>
                <li>• Creating content that promotes violence, hatred, or discrimination</li>
                <li>• Generating misleading or false information intended to deceive</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold mb-2">Uptime & Maintenance</h3>
                <p className="text-sm text-muted-foreground">
                  While we strive to provide continuous service, we do not guarantee 100% uptime. 
                  We may perform maintenance, updates, or experience technical difficulties that 
                  temporarily affect service availability.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Service Changes</h3>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue any part of our Service 
                  at any time with or without notice.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Disclaimers & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service "As Is"</h3>
                <p className="text-sm text-muted-foreground">
                  The Service is provided on an "as is" and "as available" basis. We make no warranties, 
                  expressed or implied, and hereby disclaim all other warranties including implied 
                  warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">AI-Generated Content</h3>
                <p className="text-sm text-muted-foreground">
                  AI-generated content may not always be accurate, complete, or suitable for your purposes. 
                  You should review and verify all AI-generated content before use. We are not responsible 
                  for the accuracy or quality of AI-generated content.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-sm text-muted-foreground">
                  In no event shall Pineapple Technologies, its directors, employees, partners, agents, 
                  suppliers, or affiliates be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising out of your use of the Service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold mb-2">Our Rights</h3>
                <p className="text-sm text-muted-foreground">
                  The Service and its original content, features, and functionality are owned by 
                  Pineapple Technologies and are protected by international copyright, trademark, 
                  patent, trade secret, and other intellectual property laws.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">License to Use</h3>
                <p className="text-sm text-muted-foreground">
                  We grant you a limited, non-exclusive, non-transferable license to use our Service 
                  for personal or business purposes in accordance with these Terms.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the Service, to understand our practices regarding the collection and use 
                of your personal information.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/privacy-policy')}
                className="mt-3"
              >
                View Privacy Policy
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                We may terminate or suspend your access to the Service immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-sm text-muted-foreground">
                Upon termination, your right to use the Service will cease immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                Pineapple Technologies operates, without regard to conflict of law provisions. 
                Any disputes arising from these Terms shall be resolved through binding arbitration.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p className="text-sm text-muted-foreground">
                What constitutes a material change will be determined at our sole discretion. 
                By continuing to access or use our Service after those revisions become effective, 
                you agree to be bound by the revised terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@smartgentoolshub.com</p>
                <p><strong>General Contact:</strong> hello@smartgentoolshub.com</p>
                <p><strong>Company:</strong> Pineapple Technologies</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
