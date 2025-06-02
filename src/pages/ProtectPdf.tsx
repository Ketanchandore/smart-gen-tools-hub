
import React, { useState } from 'react';
import { Shield, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { protectPDF } from '@/utils/pdfUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const ProtectPdf = () => {
  const { toast } = useToast();
  const [userPassword, setUserPassword] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [printing, setPrinting] = useState<'lowResolution' | 'highResolution' | false>('highResolution');
  const [modifying, setModifying] = useState(false);
  const [copying, setCopying] = useState(false);
  const [annotating, setAnnotating] = useState(true);
  const [fillingForms, setFillingForms] = useState(true);
  const [contentAccessibility, setContentAccessibility] = useState(true);
  const [documentAssembly, setDocumentAssembly] = useState(false);

  const handleProtect = async (files: File[]): Promise<Uint8Array> => {
    try {
      if (!userPassword && !ownerPassword) {
        toast({
          title: 'Password Required',
          description: 'Please set at least one password to protect the PDF',
          variant: 'destructive',
        });
        throw new Error('Password required');
      }

      const result = await protectPDF(files[0], {
        userPassword: userPassword || undefined,
        ownerPassword: ownerPassword || undefined,
        permissions: {
          printing,
          modifying,
          copying,
          annotating,
          fillingForms,
          contentAccessibility,
          documentAssembly
        }
      });
      
      toast({
        title: 'PDF Protected Successfully',
        description: 'Your PDF has been secured with password protection',
      });

      return result;
    } catch (error) {
      console.error('Protection error:', error);
      toast({
        title: 'Protection Failed',
        description: 'An error occurred while protecting the PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <PDFToolTemplate
      title="Protect PDF"
      description="Add password protection and set permissions to secure your PDF documents"
      icon={<Shield className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleProtect}
      outputFilename="protected.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Password Protection</CardTitle>
            <CardDescription>Set passwords to control access to your PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="user-password">User Password (Required to open PDF)</Label>
              <Input
                id="user-password"
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Enter password to open PDF"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Users will need this password to open and view the PDF
              </p>
            </div>

            <div>
              <Label htmlFor="owner-password">Owner Password (Master password)</Label>
              <Input
                id="owner-password"
                type="password"
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
                placeholder="Enter master password"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Master password for changing permissions and security settings
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Permissions</CardTitle>
            <CardDescription>Control what users can do with the protected PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="printing">Printing Permission</Label>
              <Select value={printing || 'none'} onValueChange={(value: any) => setPrinting(value === 'none' ? false : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select printing permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Printing</SelectItem>
                  <SelectItem value="lowResolution">Low Resolution Printing</SelectItem>
                  <SelectItem value="highResolution">High Resolution Printing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Content Permissions</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="modifying"
                  checked={modifying}
                  onCheckedChange={(checked) => setModifying(checked as boolean)}
                />
                <Label htmlFor="modifying" className="text-sm">
                  Allow document modification
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="copying"
                  checked={copying}
                  onCheckedChange={(checked) => setCopying(checked as boolean)}
                />
                <Label htmlFor="copying" className="text-sm">
                  Allow text and image copying
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="annotating"
                  checked={annotating}
                  onCheckedChange={(checked) => setAnnotating(checked as boolean)}
                />
                <Label htmlFor="annotating" className="text-sm">
                  Allow commenting and annotations
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filling-forms"
                  checked={fillingForms}
                  onCheckedChange={(checked) => setFillingForms(checked as boolean)}
                />
                <Label htmlFor="filling-forms" className="text-sm">
                  Allow form filling
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="accessibility"
                  checked={contentAccessibility}
                  onCheckedChange={(checked) => setContentAccessibility(checked as boolean)}
                />
                <Label htmlFor="accessibility" className="text-sm">
                  Allow content accessibility (screen readers)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="assembly"
                  checked={documentAssembly}
                  onCheckedChange={(checked) => setDocumentAssembly(checked as boolean)}
                />
                <Label htmlFor="assembly" className="text-sm">
                  Allow document assembly (insert, rotate, delete pages)
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Security Settings Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>User Password: {userPassword ? '••••••••' : 'Not set'}</p>
            <p>Owner Password: {ownerPassword ? '••••••••' : 'Not set'}</p>
            <p>Printing: {printing || 'Disabled'}</p>
            <p>Permissions: {[
              modifying && 'Modify',
              copying && 'Copy', 
              annotating && 'Annotate',
              fillingForms && 'Fill Forms',
              contentAccessibility && 'Accessibility',
              documentAssembly && 'Assembly'
            ].filter(Boolean).join(', ') || 'None'}</p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>PDF Security Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• AES-256 encryption for maximum security</li>
                <li>• Granular permission controls</li>
                <li>• Separate user and owner password protection</li>
                <li>• Print quality restrictions</li>
                <li>• Content accessibility compliance</li>
                <li>• Form interaction controls</li>
              </ul>
              <p className="mt-2">
                <strong>Security Note:</strong> Owner password provides full control, while user password only allows viewing with set permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default ProtectPdf;
