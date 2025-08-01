
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Clock, MessageCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Contact Us - Pine Tools Hub | Get Support & Feedback"
        description="Contact Pine Tools Hub for support, feedback, or questions. Email us at pineappletech.official@gmail.com for assistance with our AI tools."
        keywords="contact pine tools hub, support, help, customer service, feedback"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you! Whether you have a question, suggestion, or feedback — reach out anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Mail className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Email Support</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-2">For all inquiries, support, and feedback:</p>
                  <a 
                    href="mailto:pineappletech.official@gmail.com"
                    className="text-primary hover:text-primary/80 text-lg font-semibold transition-colors"
                  >
                    pineappletech.official@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold text-foreground">Support Hours</h2>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Monday – Saturday:</strong> 10 AM – 6 PM (IST)</p>
                <p><strong>Sunday:</strong> Limited support</p>
                <p className="text-sm mt-4">
                  We typically respond within 24–48 hours. Your patience is appreciated!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold text-foreground">What Can We Help With?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Technical Support</h3>
                <ul className="space-y-1 ml-4">
                  <li>• Tool not working properly</li>
                  <li>• File upload issues</li>
                  <li>• Browser compatibility</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">General Inquiries</h3>
                <ul className="space-y-1 ml-4">
                  <li>• Feature requests</li>
                  <li>• Partnership opportunities</li>
                  <li>• General feedback</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Your feedback helps us improve Pine Tools Hub and serve you better. 
                We read every message and appreciate your input!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
