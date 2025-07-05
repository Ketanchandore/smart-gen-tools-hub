
import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, UserCheck, Globe, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy - Smart Gen Tools Hub"
        description="Read Smart Gen Tools Hub's privacy policy to understand how we collect, use, and protect your personal information when using our AI-powered tools."
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
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: January 7, 2025
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  We may collect personal information when you:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Create an account (optional for most tools)</li>
                  <li>• Contact us through our support forms</li>
                  <li>• Subscribe to newsletters or updates</li>
                  <li>• Participate in surveys or feedback forms</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  We automatically collect certain usage information:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• IP address and device information</li>
                  <li>• Browser type and version</li>
                  <li>• Pages visited and time spent</li>
                  <li>• Tool usage patterns and preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                We use collected information for the following purposes:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Service Provision:</strong> To provide and maintain our AI-powered tools</li>
                <li>• <strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
                <li>• <strong>Communication:</strong> To respond to your inquiries and provide support</li>
                <li>• <strong>Security:</strong> To protect against fraud, abuse, and security threats</li>
                <li>• <strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security & Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• End-to-end encryption for sensitive data</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Secure data centers with industry-standard protection</li>
                  <li>• Limited access controls for authorized personnel only</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-sm text-muted-foreground">
                  We retain personal information only for as long as necessary to fulfill the purposes 
                  outlined in this policy, unless a longer retention period is required by law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                We do not sell, trade, or rent your personal information. We may share information in these limited circumstances:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Service Providers:</strong> With trusted third-party service providers who assist in our operations</li>
                <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li>• <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li>• <strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Cookies & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2">Types of Cookies</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Essential Cookies:</strong> Required for basic site functionality</li>
                    <li>• <strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Managing Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    You can control and manage cookies through your browser settings. Note that 
                    disabling certain cookies may affect site functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights & Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Access:</strong> Request access to your personal information</li>
                <li>• <strong>Correction:</strong> Request correction of inaccurate information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal information</li>
                <li>• <strong>Portability:</strong> Request transfer of your data</li>
                <li>• <strong>Objection:</strong> Object to certain processing activities</li>
                <li>• <strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              </ul>
              
              <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm font-medium mb-2">To exercise your rights:</p>
                <p className="text-sm text-muted-foreground">
                  Contact us at privacy@smartgentoolshub.com with your request. 
                  We'll respond within 30 days of receiving your request.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our services are not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If you are a parent 
                or guardian and believe your child has provided us with personal information, 
                please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your personal information in 
                accordance with this privacy policy and applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                We may update this privacy policy from time to time. When we do, we will:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Post the updated policy on this page</li>
                <li>• Update the "Last updated" date</li>
                <li>• Notify users of significant changes via email or site notice</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                If you have questions about this privacy policy or our data practices, contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@smartgentoolshub.com</p>
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

export default PrivacyPolicy;
