
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
    
    Object.values(checks).forEach(check => {
      if (check) score += 20;
    });
    
    return { score, checks };
  };

  const { score: passwordScore, checks: passwordChecks } = getPasswordStrength(formData.password);

  const getStrengthColor = (score: number) => {
    if (score < 40) return 'bg-red-500';
    if (score < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score < 40) return 'Weak';
    if (score < 80) return 'Medium';
    return 'Strong';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }

    if (passwordScore < 80) {
      toast({
        title: "Weak password",
        description: "Please choose a stronger password for better security",
        variant: "destructive"
      });
      return false;
    }

    if (!acceptedTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the Terms of Service and Privacy Policy",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await signup(formData.email, formData.password, formData.name);
      toast({
        title: "Account created successfully!",
        description: "Welcome to AI Pro Toolkit Hub! Please verify your email to access all features.",
      });
      navigate('/');
    } catch (error) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[90vh] py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <CardTitle className="text-2xl">Create your account</CardTitle>
          </div>
          <CardDescription>
            Join thousands of professionals using AI Pro Toolkit Hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address *</Label>
              <Input 
                id="email"
                type="email"
                placeholder="your.email@example.com" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                required
                className="transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full name (recommended)</Label>
              <Input 
                id="name"
                type="text"
                placeholder="Your full name" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isSubmitting}
                className="transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password" 
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="pr-10 transition-all"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Password strength:</span>
                    <span className={`font-medium ${passwordScore < 40 ? 'text-red-500' : passwordScore < 80 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {getStrengthText(passwordScore)}
                    </span>
                  </div>
                  <Progress value={passwordScore} className="h-2" />
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.length ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.lowercase ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      One lowercase letter
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.uppercase ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.number ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      One number
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.special ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.special ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      One special character
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password *</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password" 
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="pr-10 transition-all"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.password && (
                <div className={`text-xs flex items-center gap-1 ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                  {formData.password === formData.confirmPassword ? 
                    <CheckCircle className="h-3 w-3" /> : 
                    <XCircle className="h-3 w-3" />
                  }
                  {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
                disabled={isSubmitting}
              />
              <Label htmlFor="terms" className="text-sm leading-5">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || passwordScore < 80 || !acceptedTerms}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            By creating an account, you agree to our secure data handling practices.
            Your information is encrypted and protected.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
