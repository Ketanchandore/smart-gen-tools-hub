
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
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

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
          
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
        </div>
      </div>
    </Layout>
  );
};

export default PasswordGenerator;
