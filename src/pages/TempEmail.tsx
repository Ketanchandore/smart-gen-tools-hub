
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const generateRandomEmail = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  const length = Math.floor(Math.random() * 8) + 6; // 6-14 characters
  
  for (let i = 0; i < length; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  const domains = ['tempmail.com', 'mailinator.com', 'mailtemp.io', 'tempmailbox.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  return `${username}@${domain}`;
};

const TempEmail = () => {
  const { toast } = useToast();
  const [tempEmail, setTempEmail] = useState(generateRandomEmail());

  const generateNewEmail = () => {
    const newEmail = generateRandomEmail();
    setTempEmail(newEmail);
    toast({
      title: 'New email generated',
      description: 'A new temporary email address has been created.',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tempEmail);
    toast({
      title: 'Email copied!',
      description: 'The email address has been copied to your clipboard.',
    });
  };

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Temporary Email Generator</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Temporary Email</CardTitle>
            <CardDescription>Use this email for one-time signups or testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-primary/30 to-accent/30 p-6 rounded-lg shadow-inner">
              <div className="flex items-center justify-between">
                <div className="font-mono text-lg break-all mr-4">{tempEmail}</div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2" 
                onClick={generateNewEmail}
              >
                <RefreshCw className="h-4 w-4" />
                Generate New Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Information about temporary emails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Temporary email addresses are perfect for situations where you need an email for a one-time signup, 
              but don't want to use your personal email and risk receiving spam.
            </p>
            <p>
              <strong>Note:</strong> This is a demonstration tool. In a full implementation, you would be able to 
              check the inbox for any received emails. For real temporary email services, consider using services like 
              Mailinator or Temp-Mail.
            </p>
            <p>
              For testing purposes, you can use this email when you need to register on websites 
              that require email verification, but you don't want to use your real email address.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TempEmail;
