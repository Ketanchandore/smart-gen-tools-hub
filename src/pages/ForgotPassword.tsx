
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="container flex items-center justify-center min-h-[90vh] py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-primary mr-2" />
              <CardTitle className="text-2xl">Check your email</CardTitle>
            </div>
            <CardDescription>
              We've sent password reset instructions to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              If an account with that email exists, you'll receive an email with instructions to reset your password.
            </p>
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Try different email
            </Button>
            <Link 
              to="/login" 
              className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[90vh] py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="your.email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                autoComplete="email"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Sending instructions...
                </>
              ) : (
                "Send reset instructions"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link 
            to="/login" 
            className="text-sm text-primary hover:underline flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
