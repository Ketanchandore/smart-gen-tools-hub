
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy, ArrowLeft, ExternalLink, Shield, Key, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { ToolStructuredData } from '@/components/StructuredData';
import { useToast } from '@/components/ui/use-toast';

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let newPassword = '';
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: 'Password copied!',
      description: 'The password has been copied to your clipboard.',
    });
  };

  // Generate a password on component mount
  React.useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faqData = [
    {
      question: "How secure are the passwords generated?",
      answer: "Our password generator uses cryptographically secure random number generation to create passwords with high entropy. Each password is unique and unpredictable."
    },
    {
      question: "What makes a strong password?",
      answer: "A strong password should be at least 12 characters long, include a mix of uppercase and lowercase letters, numbers, and symbols. Avoid common words or personal information."
    },
    {
      question: "Should I use symbols in my passwords?",
      answer: "Yes, including symbols significantly increases password strength by expanding the character set. However, ensure the symbols are accepted by the system you're using."
    },
    {
      question: "How often should I change my passwords?",
      answer: "Change passwords immediately if compromised, and regularly for critical accounts. Use a password manager to maintain unique, strong passwords for each account."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Free Password Generator - Create Strong Secure Passwords Online"
        description="Generate strong, secure passwords with our free online tool. Customizable length, character sets, and security options. Create unbreakable passwords instantly."
        keywords="password generator, secure password, strong password, random password, password creator, security tool"
        url="https://pinetoolshub.com/password-generator"
      />
      <ToolStructuredData 
        name="Password Generator"
        description="Advanced password generator with customizable security options for creating strong, unique passwords"
        url="https://pinetoolshub.com/password-generator"
        category="Security Tools"
        features={["Customizable password length", "Multiple character sets", "Secure random generation", "Copy to clipboard", "Instant generation", "No data storage"]}
      />
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold mb-6">Password Generator - Create Strong Passwords</h1>
          <p className="text-muted-foreground mb-8">
            Generate cryptographically secure passwords with customizable options for maximum security.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Link to="/fake-identity" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Fake Identity
            </Link>
            <Link to="/credit-card-generator" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Credit Card Generator
            </Link>
            <Link to="/lorem-ipsum" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Lorem Ipsum
            </Link>
            <Link to="/barcode-generator" className="text-sm bg-secondary/50 px-3 py-1 rounded-full hover:bg-secondary transition-colors">
              Barcode Generator
            </Link>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generated Password</CardTitle>
              <CardDescription>Your secure random password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="bg-secondary p-3 rounded-md flex-grow overflow-x-auto">
                  <code className="text-lg font-mono">{password}</code>
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Options</CardTitle>
              <CardDescription>Customize your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Length: {length[0]} characters</Label>
                </div>
                <Slider
                  min={8}
                  max={32}
                  step={1}
                  value={length}
                  onValueChange={setLength}
                  className="my-4"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="uppercase">Include Uppercase Letters</Label>
                  <Switch
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={setIncludeUppercase}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="numbers">Include Numbers</Label>
                  <Switch
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="symbols">Include Symbols</Label>
                  <Switch
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                  />
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-accent"
                onClick={generatePassword}
              >
                Generate New Password
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Password Security Guidelines</h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12 bg-secondary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Related Security Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/fake-identity" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Fake Identity Generator</div>
                  <div className="text-sm text-muted-foreground">Generate test identities</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
              <Link to="/credit-card-generator" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                <Key className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Credit Card Generator</div>
                  <div className="text-sm text-muted-foreground">Generate test card numbers</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
              <Link to="/barcode-generator" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                <RefreshCw className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Barcode Generator</div>
                  <div className="text-sm text-muted-foreground">Create barcodes</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
              <Link to="/lorem-ipsum" className="flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                <Copy className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Lorem Ipsum</div>
                  <div className="text-sm text-muted-foreground">Generate placeholder text</div>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 prose prose-invert max-w-none">
            <h2>Why Use a Password Generator?</h2>
            <p>
              Creating strong, unique passwords is crucial for online security. Our password generator uses advanced 
              cryptographic algorithms to create truly random passwords that are impossible to guess or crack through 
              brute force attacks.
            </p>
            
            <h3>Password Security Best Practices</h3>
            <ul>
              <li><strong>Length:</strong> Use passwords with at least 12-16 characters</li>
              <li><strong>Complexity:</strong> Include uppercase, lowercase, numbers, and symbols</li>
              <li><strong>Uniqueness:</strong> Use different passwords for each account</li>
              <li><strong>Updates:</strong> Change passwords regularly, especially after breaches</li>
              <li><strong>Storage:</strong> Use a reputable password manager</li>
              <li><strong>Two-Factor:</strong> Enable 2FA whenever possible</li>
            </ul>

            <h3>Common Password Mistakes to Avoid</h3>
            <p>
              Avoid using personal information, common words, sequential numbers, or patterns. Don't reuse passwords 
              across multiple accounts, and never share passwords via unsecured channels. Our generator eliminates 
              these risks by creating completely random, secure passwords.
            </p>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default PasswordGenerator;
