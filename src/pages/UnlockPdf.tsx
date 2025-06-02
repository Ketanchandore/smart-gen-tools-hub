
import React, { useState } from 'react';
import { ShieldOff, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { unlockPDF } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const UnlockPdf = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');

  const handleUnlock = async (files: File[]): Promise<Uint8Array> => {
    try {
      const result = await unlockPDF(files[0], password);
      
      toast({
        title: 'PDF Unlocked Successfully',
        description: 'Password protection has been removed from your PDF',
      });

      return result;
    } catch (error) {
      console.error('Unlock error:', error);
      toast({
        title: 'Unlock Failed',
        description: 'Could not unlock PDF. Please check your password.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <PDFToolTemplate
      title="Unlock PDF"
      description="Remove password protection from PDF files with proper authorization"
      icon={<ShieldOff className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleUnlock}
      outputFilename="unlocked.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Password Authentication</CardTitle>
            <CardDescription>Enter the password to unlock your PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">PDF Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter PDF password"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the user or owner password to unlock the PDF
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>PDF Unlock Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Support for user and owner passwords</li>
                <li>• Complete removal of all restrictions</li>
                <li>• Preserve original document quality</li>
                <li>• Secure processing without data storage</li>
                <li>• Multiple encryption standard support</li>
              </ul>
              <p className="mt-2">
                <strong>Note:</strong> You must have the correct password to unlock a protected PDF.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default UnlockPdf;
