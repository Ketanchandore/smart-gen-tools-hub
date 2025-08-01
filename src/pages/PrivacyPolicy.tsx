
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Database, Settings } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy - Pine Tools Hub | Data Protection & Privacy"
        description="Read Pine Tools Hub's Privacy Policy. We respect your privacy and protect your data. Learn how we collect, use, and safeguard your information."
        keywords="privacy policy, data protection, privacy rights, pine tools hub privacy"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            At Pine Tools Hub, we respect your privacy and are committed to protecting it.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Automatically Collected Data</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Basic analytics (page views, browser type, device information)</li>
                    <li>• Usage patterns and performance metrics</li>
                    <li>• IP addresses for security and analytics purposes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Voluntarily Provided Data</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Contact information when you email us</li>
                    <li>• Feedback and suggestions you submit</li>
                    <li>• Account information if you create an account</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Important:</strong> We do not store personal files or content processed through our tools. 
                    All processing is done temporarily and files are automatically deleted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">How We Use Your Data</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground ml-4">
                <li>• To improve website performance and user experience</li>
                <li>• To monitor usage patterns through anonymized analytics</li>
                <li>• To respond to your inquiries and provide customer support</li>
                <li>• To detect and prevent technical issues</li>
                <li>• To comply with legal obligations when necessary</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Settings className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Third-Party Services & APIs</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Some tools may use external APIs and services (e.g., Razorpay IFSC, PostalPIN API, AI models). 
                  We do not control their data handling practices and recommend reviewing their respective privacy policies.
                </p>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Third-party services may include:</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Payment processing APIs</li>
                    <li>• Location and postal code services</li>
                    <li>• AI and machine learning services</li>
                    <li>• Analytics and performance monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Data Protection & Your Rights</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cookies & Tracking</h3>
                  <p>We may use essential cookies for functionality. No unnecessary tracking cookies or advertising trackers are used.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Data Sharing</h3>
                  <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
                  <ul className="space-y-1 ml-4">
                    <li>• Request to delete any data you've submitted</li>
                    <li>• Request a copy of your data</li>
                    <li>• Opt-out of non-essential data collection</li>
                    <li>• Correct any inaccurate information</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    To exercise your rights, contact us at: 
                    <a href="mailto:pineappletech.official@gmail.com" className="text-primary hover:text-primary/80 ml-1">
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

export default PrivacyPolicy;
