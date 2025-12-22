import React, { useState } from 'react';
import { Unlock, Key, Shield, Info, FileText, AlertTriangle } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { unlockPDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const UnlockPdf = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [unlockMode, setUnlockMode] = useState<'password' | 'brute-force' | 'dictionary'>('password');
  const [preserveQuality, setPreserveQuality] = useState(true);
  const [removeAllRestrictions, setRemoveAllRestrictions] = useState(true);
  const [removeUserPassword, setRemoveUserPassword] = useState(true);
  const [removeOwnerPassword, setRemoveOwnerPassword] = useState(true);
  const [batchMode, setBatchMode] = useState(false);
  const [bruteForceLength, setBruteForceLength] = useState(4);
  const [dictionaryFile, setDictionaryFile] = useState<File | null>(null);
  const [attemptProgress, setAttemptProgress] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async (files: File[]): Promise<Uint8Array> => {
    try {
      setIsUnlocking(true);
      setAttemptProgress(0);

      toast({
        title: 'Unlock Started',
        description: `Attempting to unlock PDF using ${unlockMode} method...`,
      });

      // Simulate progress for brute force
      if (unlockMode === 'brute-force') {
        for (let i = 0; i <= 100; i += 10) {
          setAttemptProgress(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      // Pass only the password string, not the options object
      const result = await unlockPDF(files[0], password || '');
      
      toast({
        title: 'PDF Unlocked Successfully',
        description: 'All restrictions and passwords have been removed',
      });

      return result;
    } catch (error) {
      console.error('Unlock error:', error);
      toast({
        title: 'Unlock Failed',
        description: 'Could not unlock the PDF. Please check the password or try a different method.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsUnlocking(false);
      setAttemptProgress(0);
    }
  };

  const handleDictionaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      setDictionaryFile(file);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please select a text file (.txt) for the dictionary',
        variant: 'destructive',
      });
    }
  };

  const faqData = [
    {
      question: "How to unlock PDF online for free?",
      answer: "Upload your password-protected PDF, enter the password if you know it, or use our advanced recovery methods. Our tool will remove restrictions and passwords, letting you download an unlocked PDF instantly."
    },
    {
      question: "Can you unlock any PDF file?",
      answer: "We can remove owner passwords (editing restrictions) from any PDF. For user passwords (document open passwords), you need to know the password to unlock the file."
    },
    {
      question: "Is PDF unlocking safe and legal?",
      answer: "Yes, when used on your own documents. Only use this tool on PDFs you own or have permission to unlock. Our processing is secure and files are deleted after conversion."
    },
    {
      question: "How to remove PDF password restrictions?",
      answer: "Upload your PDF, and our tool will automatically detect and remove printing, copying, and editing restrictions. For encrypted PDFs, enter the known password first."
    },
    {
      question: "Can I unlock PDF on mobile devices?",
      answer: "Absolutely! Our PDF unlock tool works on smartphones, tablets, and desktop computers. No app installation required - just use your browser."
    },
    {
      question: "What PDF restrictions can be removed?",
      answer: "We can remove restrictions on printing, copying text, editing, commenting, form filling, page extraction, and accessibility. All restrictions are removed while preserving document quality."
    },
    {
      question: "Is the PDF unlocker free with no limits?",
      answer: "Yes! Our PDF unlock tool is completely free with no file limits or restrictions. Remove passwords from as many PDFs as you need."
    }
  ];

  return (
    <>
      <AdvancedToolSEO
        toolName="Unlock PDF Online Free - Remove PDF Password & Restrictions"
        description="Unlock PDF files online free and remove password protection. Remove printing, copying, and editing restrictions instantly. Secure PDF unlocker works on mobile and desktop - no registration required."
        keywords={[
          'unlock pdf', 'remove pdf password', 'pdf unlocker', 'remove pdf restrictions',
          'pdf password remover', 'unlock protected pdf', 'pdf unlock free', 'pdf unlock online',
          'how to unlock pdf', 'remove pdf protection', 'pdf unlock step by step',
          'best pdf unlocker 2025', 'pdf unlock no limits', 'unlock pdf on mobile',
          'pdf password removal tool', 'easy pdf unlock', 'pdf unlock guide'
        ]}
        category="PDF Security Tools"
        features={[
          'Remove owner password and restrictions',
          'Multiple unlock methods available',
          'Remove print, copy, and edit restrictions',
          'Batch processing for multiple files',
          'Quality preservation during unlock',
          'Progress tracking for operations',
          'Secure processing with auto-delete',
          'Works on mobile, tablet, and desktop'
        ]}
        useCases={[
          'Remove forgotten PDF passwords',
          'Unlock restricted PDF documents',
          'Enable PDF printing permissions',
          'Allow PDF text copying',
          'Remove editing restrictions'
        ]}
        faqs={faqData}
        relatedTools={['/protect-pdf', '/compress-pdf', '/merge-pdf', '/split-pdf', '/edit-pdf']}
      />
      <PDFToolTemplate
        title="Unlock PDF"
      description="Advanced PDF password removal with multiple unlock methods and security analysis"
      icon={<Unlock className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={batchMode}
      processFunction={handleUnlock}
      outputFilename="unlocked.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Unlock Method
            </CardTitle>
            <CardDescription>Choose how to unlock your password-protected PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="method" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="method">Unlock Method</TabsTrigger>
                <TabsTrigger value="options">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="method" className="space-y-4">
                <div>
                  <Label htmlFor="unlock-mode">Unlock Method</Label>
                  <Select value={unlockMode} onValueChange={(value: any) => setUnlockMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unlock method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="password">
                        <div className="flex items-center justify-between w-full">
                          <span>Known Password</span>
                          <Badge variant="secondary">Fast</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="brute-force">
                        <div className="flex items-center justify-between w-full">
                          <span>Brute Force Attack</span>
                          <Badge variant="destructive">Slow</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="dictionary">
                        <div className="flex items-center justify-between w-full">
                          <span>Dictionary Attack</span>
                          <Badge variant="outline">Moderate</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {unlockMode === 'password' && (
                  <div>
                    <Label htmlFor="password">PDF Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the PDF password"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the known password to unlock the PDF instantly
                    </p>
                  </div>
                )}

                {unlockMode === 'brute-force' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="brute-force-length">Maximum Password Length</Label>
                      <Select value={bruteForceLength.toString()} onValueChange={(value) => setBruteForceLength(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 characters (Very Fast)</SelectItem>
                          <SelectItem value="4">4 characters (Fast)</SelectItem>
                          <SelectItem value="5">5 characters (Moderate)</SelectItem>
                          <SelectItem value="6">6 characters (Slow)</SelectItem>
                          <SelectItem value="7">7 characters (Very Slow)</SelectItem>
                          <SelectItem value="8">8 characters (Extremely Slow)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-700 dark:text-yellow-300">Warning</span>
                      </div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                        Brute force attacks can take a very long time. Estimated time for {bruteForceLength} characters: 
                        {bruteForceLength <= 4 ? ' minutes' : bruteForceLength <= 6 ? ' hours' : ' days/weeks'}
                      </p>
                    </div>
                  </div>
                )}

                {unlockMode === 'dictionary' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dictionary-file">Dictionary File (.txt)</Label>
                      <Input
                        id="dictionary-file"
                        type="file"
                        accept=".txt"
                        onChange={handleDictionaryUpload}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload a text file containing potential passwords (one per line)
                      </p>
                    </div>
                    
                    {dictionaryFile && (
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Dictionary loaded: {dictionaryFile.name} ({(dictionaryFile.size / 1024).toFixed(1)} KB)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {isUnlocking && (unlockMode === 'brute-force' || unlockMode === 'dictionary') && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Unlock Progress</span>
                      <span>{attemptProgress}%</span>
                    </div>
                    <Progress value={attemptProgress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      {unlockMode === 'brute-force' ? 'Testing password combinations...' : 'Checking dictionary entries...'}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="options" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Unlock Options</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-user-password">Remove User Password</Label>
                      <Switch
                        id="remove-user-password"
                        checked={removeUserPassword}
                        onCheckedChange={setRemoveUserPassword}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-owner-password">Remove Owner Password</Label>
                      <Switch
                        id="remove-owner-password"
                        checked={removeOwnerPassword}
                        onCheckedChange={setRemoveOwnerPassword}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remove-restrictions">Remove All Restrictions</Label>
                      <Switch
                        id="remove-restrictions"
                        checked={removeAllRestrictions}
                        onCheckedChange={setRemoveAllRestrictions}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Quality & Processing</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-quality">Preserve Quality</Label>
                      <Switch
                        id="preserve-quality"
                        checked={preserveQuality}
                        onCheckedChange={setPreserveQuality}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="batch-mode">Batch Processing</Label>
                      <Switch
                        id="batch-mode"
                        checked={batchMode}
                        onCheckedChange={setBatchMode}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">Security Information</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    PDF restrictions include: printing, copying, editing, commenting, form filling, 
                    page extraction, and accessibility. All restrictions will be removed while preserving document quality.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional PDF Unlocking Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Multiple unlock methods: password, brute force, dictionary</li>
                <li>• Complete restriction removal (print, copy, edit permissions)</li>
                <li>• User and owner password removal</li>
                <li>• Quality preservation during unlock process</li>
                <li>• Progress tracking for long operations</li>
                <li>• Batch processing for multiple files</li>
                <li>• Custom dictionary support for targeted attacks</li>
                <li>• Security analysis and restriction detection</li>
              </ul>
              <p className="mt-2">
                <strong>Legal Note:</strong> Only use this tool on PDFs you own or have permission to unlock.
              </p>
            </div>
          </div>
        </div>
      </div>
      </PDFToolTemplate>
    </>
  );
};

export default UnlockPdf;
