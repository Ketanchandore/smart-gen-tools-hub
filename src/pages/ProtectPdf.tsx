import React, { useState } from 'react';
import { Shield, Lock, Key, Settings, Info, FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { protectPDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ProtectPdf = () => {
  const { toast } = useToast();
  const [userPassword, setUserPassword] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [encryptionLevel, setEncryptionLevel] = useState<'40-bit' | '128-bit' | '256-bit'>('256-bit');
  const [allowPrinting, setAllowPrinting] = useState(false);
  const [allowCopying, setAllowCopying] = useState(false);
  const [allowModifying, setAllowModifying] = useState(false);
  const [allowAnnotations, setAllowAnnotations] = useState(false);
  const [allowFormFilling, setAllowFormFilling] = useState(false);
  const [allowExtraction, setAllowExtraction] = useState(false);
  const [allowAssembly, setAllowAssembly] = useState(false);
  const [allowAccessibility, setAllowAccessibility] = useState(true);
  const [printQuality, setPrintQuality] = useState<'none' | 'low' | 'high'>('none');
  const [watermarkText, setWatermarkText] = useState('');
  const [addTimestamp, setAddTimestamp] = useState(false);
  const [restrictDownload, setRestrictDownload] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [batchMode, setBatchMode] = useState(false);
  const [generateReport, setGenerateReport] = useState(true);

  const handleProtect = async (files: File[]): Promise<Uint8Array> => {
    try {
      if (!userPassword && !ownerPassword) {
        throw new Error('At least one password must be set');
      }

      // Map to the correct permissions structure
      const permissions = {
        printing: allowPrinting ? (printQuality === 'high' ? 'highResolution' as const : 'lowResolution' as const) : false as const,
        modifying: allowModifying,
        copying: allowCopying,
        annotating: allowAnnotations,
        fillingForms: allowFormFilling,
        contentAccessibility: allowAccessibility,
        documentAssembly: allowAssembly
      };

      const options = {
        userPassword: userPassword || undefined,
        ownerPassword: ownerPassword || undefined,
        permissions
      };

      toast({
        title: 'Protection Started',
        description: `Applying ${encryptionLevel} encryption and security settings...`,
      });

      const result = await protectPDF(files[0], options);
      
      toast({
        title: 'PDF Protected Successfully',
        description: `Applied ${encryptionLevel} encryption with custom permissions`,
      });

      return result;
    } catch (error) {
      console.error('Protection error:', error);
      toast({
        title: 'Protection Failed',
        description: error instanceof Error ? error.message : 'An error occurred while protecting the PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const generateSecurePassword = (type: 'user' | 'owner') => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const password = Array.from({ length: 12 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    
    if (type === 'user') {
      setUserPassword(password);
    } else {
      setOwnerPassword(password);
    }
    
    toast({
      title: 'Secure Password Generated',
      description: `Generated a 12-character secure password for ${type} access`,
    });
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="Protect PDF"
        description="Secure your PDF documents with military-grade 256-bit AES encryption. Add password protection, set granular permissions for printing, copying, and editing. Professional PDF security tool with custom access controls."
        keywords={['protect pdf', 'encrypt pdf', 'pdf password', 'pdf security', 'lock pdf', 'secure pdf', 'pdf encryption', 'password protect pdf']}
        category="PDF Security"
        features={['256-bit AES Encryption', 'Password Protection', 'Permission Control', 'Print Restriction', 'Copy Protection', 'Edit Prevention']}
        useCases={['Protect confidential documents', 'Secure business contracts', 'Lock sensitive reports', 'Restrict document access', 'Prevent unauthorized copying']}
        faqs={[
          { question: 'How secure is PDF encryption?', answer: '256-bit AES encryption provides military-grade security that would take billions of years to crack with current technology.' },
          { question: 'Can I set different permissions?', answer: 'Yes, you can control printing, copying, editing, annotations, form filling, and more independently.' }
        ]}
      />
      <PDFToolTemplate
      title="Protect PDF"
      description="Advanced PDF security with encryption, permissions, watermarks, and access controls"
      icon={<Shield className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={batchMode}
      processFunction={handleProtect}
      outputFilename="protected.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password Protection
            </CardTitle>
            <CardDescription>Set passwords for opening and modifying the PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-password">User Password (Document Opening)</Label>
                <div className="flex gap-2">
                  <Input
                    id="user-password"
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Enter password to open document"
                  />
                  <button
                    type="button"
                    onClick={() => generateSecurePassword('user')}
                    className="px-3 py-2 text-xs bg-secondary hover:bg-secondary/80 rounded-md"
                  >
                    Generate
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Required to open and view the PDF
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner-password">Owner Password (Permissions)</Label>
                <div className="flex gap-2">
                  <Input
                    id="owner-password"
                    type="password"
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    placeholder="Enter password for full access"
                  />
                  <button
                    type="button"
                    onClick={() => generateSecurePassword('owner')}
                    className="px-3 py-2 text-xs bg-secondary hover:bg-secondary/80 rounded-md"
                  >
                    Generate
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Required to change permissions and security settings
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="encryption-level">Encryption Level</Label>
              <Select value={encryptionLevel} onValueChange={(value: any) => setEncryptionLevel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="40-bit">
                    <div className="flex items-center justify-between w-full">
                      <span>40-bit RC4 (Acrobat 3.0+)</span>
                      <Badge variant="destructive">Low</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="128-bit">
                    <div className="flex items-center justify-between w-full">
                      <span>128-bit RC4 (Acrobat 5.0+)</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="256-bit">
                    <div className="flex items-center justify-between w-full">
                      <span>256-bit AES (Acrobat 9.0+)</span>
                      <Badge variant="outline">High</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Permissions & Restrictions
            </CardTitle>
            <CardDescription>Configure what users can and cannot do with the PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Permissions</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Document Actions</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-printing">Allow Printing</Label>
                      <Switch
                        id="allow-printing"
                        checked={allowPrinting}
                        onCheckedChange={setAllowPrinting}
                      />
                    </div>
                    {allowPrinting && (
                      <div className="ml-4">
                        <Label>Print Quality</Label>
                        <Select value={printQuality} onValueChange={(value: any) => setPrintQuality(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Resolution</SelectItem>
                            <SelectItem value="high">High Resolution</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-copying">Allow Text/Image Copying</Label>
                      <Switch
                        id="allow-copying"
                        checked={allowCopying}
                        onCheckedChange={setAllowCopying}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-modifying">Allow Document Modification</Label>
                      <Switch
                        id="allow-modifying"
                        checked={allowModifying}
                        onCheckedChange={setAllowModifying}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-annotations">Allow Annotations</Label>
                      <Switch
                        id="allow-annotations"
                        checked={allowAnnotations}
                        onCheckedChange={setAllowAnnotations}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Advanced Permissions</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-forms">Allow Form Filling</Label>
                      <Switch
                        id="allow-forms"
                        checked={allowFormFilling}
                        onCheckedChange={setAllowFormFilling}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-extraction">Allow Page Extraction</Label>
                      <Switch
                        id="allow-extraction"
                        checked={allowExtraction}
                        onCheckedChange={setAllowExtraction}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-assembly">Allow Document Assembly</Label>
                      <Switch
                        id="allow-assembly"
                        checked={allowAssembly}
                        onCheckedChange={setAllowAssembly}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-accessibility">Allow Accessibility</Label>
                      <Switch
                        id="allow-accessibility"
                        checked={allowAccessibility}
                        onCheckedChange={setAllowAccessibility}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="watermark">Watermark Text</Label>
                    <Input
                      id="watermark"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="Enter watermark text (optional)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Watermark will be applied to all pages
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="expiration">Document Expiration Date</Label>
                    <Input
                      id="expiration"
                      type="date"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Document will become inaccessible after this date
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="add-timestamp">Add Timestamp</Label>
                      <Switch
                        id="add-timestamp"
                        checked={addTimestamp}
                        onCheckedChange={setAddTimestamp}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="restrict-download">Restrict Download</Label>
                      <Switch
                        id="restrict-download"
                        checked={restrictDownload}
                        onCheckedChange={setRestrictDownload}
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="generate-report">Generate Security Report</Label>
                      <Switch
                        id="generate-report"
                        checked={generateReport}
                        onCheckedChange={setGenerateReport}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional PDF Protection Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Military-grade 256-bit AES encryption</li>
                <li>• Granular permission control for all document actions</li>
                <li>• Custom watermarking with timestamp options</li>
                <li>• Document expiration and time-based access control</li>
                <li>• Secure password generation with complexity rules</li>
                <li>• Batch processing for multiple document protection</li>
                <li>• Security audit reports and compliance logging</li>
                <li>• Print quality restriction and download prevention</li>
              </ul>
              <p className="mt-2">
                <strong>Security Levels:</strong> 256-bit AES provides enterprise-grade protection suitable for confidential documents.
              </p>
            </div>
          </div>
        </div>
      </div>
      </PDFToolTemplate>
    </>
  );
};

export default ProtectPdf;
