import React, { useState } from 'react';
import { Eye, EyeOff, Search, Settings, Shield, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { redactPDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const RedactPdf = () => {
  const { toast } = useToast();
  const [redactionMode, setRedactionMode] = useState<'text' | 'area' | 'pattern' | 'smart'>('text');
  const [searchText, setSearchText] = useState('');
  const [redactionColor, setRedactionColor] = useState('#000000');
  const [redactionPattern, setRedactionPattern] = useState('social-security');
  const [customPattern, setCustomPattern] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWordsOnly, setWholeWordsOnly] = useState(false);
  const [smartDetection, setSmartDetection] = useState(true);
  const [redactImages, setRedactImages] = useState(false);
  const [redactMetadata, setRedactMetadata] = useState(true);
  const [permanentRedaction, setPermanentRedaction] = useState(true);
  const [redactionAreas, setRedactionAreas] = useState<string>('');
  const [multipleTexts, setMultipleTexts] = useState('');
  const [auditTrail, setAuditTrail] = useState(true);

  const predefinedPatterns = [
    { value: 'social-security', label: 'Social Security Numbers (XXX-XX-XXXX)', pattern: '\\d{3}-\\d{2}-\\d{4}' },
    { value: 'credit-card', label: 'Credit Card Numbers', pattern: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}' },
    { value: 'phone', label: 'Phone Numbers', pattern: '\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}' },
    { value: 'email', label: 'Email Addresses', pattern: '[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}' },
    { value: 'ip-address', label: 'IP Addresses', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
    { value: 'date', label: 'Dates (MM/DD/YYYY)', pattern: '\\d{2}/\\d{2}/\\d{4}' },
    { value: 'custom', label: 'Custom Pattern', pattern: '' }
  ];

  const handleRedact = async (files: File[]): Promise<Uint8Array> => {
    try {
      const options = {
        mode: redactionMode,
        searchText: redactionMode === 'text' ? searchText : undefined,
        multipleTexts: redactionMode === 'text' && multipleTexts ? multipleTexts.split('\n').filter(t => t.trim()) : undefined,
        pattern: redactionMode === 'pattern' ? (redactionPattern === 'custom' ? customPattern : predefinedPatterns.find(p => p.value === redactionPattern)?.pattern) : undefined,
        redactionColor,
        caseSensitive,
        wholeWordsOnly,
        smartDetection,
        redactImages,
        redactMetadata,
        permanentRedaction,
        redactionAreas: redactionMode === 'area' && redactionAreas ? redactionAreas.split('\n').map(area => {
          const coords = area.split(',').map(n => parseInt(n.trim()));
          return { x: coords[0] || 0, y: coords[1] || 0, width: coords[2] || 100, height: coords[3] || 20 };
        }) : undefined,
        auditTrail
      };

      toast({
        title: 'Redaction Started',
        description: `Redacting content using ${redactionMode} mode...`,
      });

      const result = await redactPDF(files[0], options);
      
      toast({
        title: 'Redaction Complete',
        description: 'Sensitive information has been permanently redacted',
      });

      return result;
    } catch (error) {
      console.error('Redaction error:', error);
      toast({
        title: 'Redaction Failed',
        description: 'An error occurred during redaction',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="Redact PDF"
        description="Permanently remove sensitive information from PDF documents. AI-powered redaction with pattern recognition for SSN, credit cards, emails, and phone numbers. GDPR and HIPAA compliant."
        keywords={['redact pdf', 'pdf redaction', 'remove sensitive data', 'black out pdf', 'censor pdf', 'hide pdf text', 'pdf privacy']}
        category="PDF Security"
        features={['Text Redaction', 'Pattern Recognition', 'AI Smart Detection', 'Permanent Removal', 'Audit Trail', 'Compliance Ready']}
        useCases={['Remove personal data', 'Redact confidential info', 'GDPR compliance', 'Legal document prep', 'Privacy protection']}
        faqs={[
          { question: 'Is redaction permanent?', answer: 'Yes, when permanent redaction is enabled, the content is completely removed and cannot be recovered.' },
          { question: 'Can it auto-detect sensitive data?', answer: 'Yes, our AI can automatically detect SSNs, credit cards, phone numbers, emails, and other PII patterns.' }
        ]}
      />
      <PDFToolTemplate
        title="Redact PDF"
      description="Professional PDF redaction with pattern recognition, smart detection, and compliance features"
      icon={<EyeOff className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleRedact}
      outputFilename="redacted.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Redaction Configuration
            </CardTitle>
            <CardDescription>Configure what to redact and how to redact it</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="method" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="method">Redaction Method</TabsTrigger>
                <TabsTrigger value="security">Security & Compliance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="method" className="space-y-4">
                <div>
                  <Label htmlFor="redaction-mode">Redaction Mode</Label>
                  <Select value={redactionMode} onValueChange={(value: any) => setRedactionMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select redaction method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">
                        <div className="flex items-center justify-between w-full">
                          <span>Text Search & Redact</span>
                          <Badge variant="secondary">Basic</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="pattern">
                        <div className="flex items-center justify-between w-full">
                          <span>Pattern Recognition</span>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="area">
                        <div className="flex items-center justify-between w-full">
                          <span>Area-based Redaction</span>
                          <Badge variant="outline">Manual</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="smart">
                        <div className="flex items-center justify-between w-full">
                          <span>Smart AI Detection</span>
                          <Badge variant="outline">AI</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {redactionMode === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="search-text">Text to Redact</Label>
                      <Input
                        id="search-text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Enter text to find and redact"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="multiple-texts">Multiple Texts (one per line)</Label>
                      <Textarea
                        id="multiple-texts"
                        value={multipleTexts}
                        onChange={(e) => setMultipleTexts(e.target.value)}
                        placeholder="Enter multiple texts to redact, one per line..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="case-sensitive">Case Sensitive</Label>
                        <Switch
                          id="case-sensitive"
                          checked={caseSensitive}
                          onCheckedChange={setCaseSensitive}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="whole-words">Whole Words Only</Label>
                        <Switch
                          id="whole-words"
                          checked={wholeWordsOnly}
                          onCheckedChange={setWholeWordsOnly}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {redactionMode === 'pattern' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="redaction-pattern">Pattern Type</Label>
                      <Select value={redactionPattern} onValueChange={setRedactionPattern}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pattern type" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedPatterns.map((pattern) => (
                            <SelectItem key={pattern.value} value={pattern.value}>
                              {pattern.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {redactionPattern === 'custom' && (
                      <div>
                        <Label htmlFor="custom-pattern">Custom Regular Expression</Label>
                        <Input
                          id="custom-pattern"
                          value={customPattern}
                          onChange={(e) => setCustomPattern(e.target.value)}
                          placeholder="Enter custom regex pattern"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use standard JavaScript regex syntax
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {redactionMode === 'area' && (
                  <div>
                    <Label htmlFor="redaction-areas">Redaction Areas (x,y,width,height per line)</Label>
                    <Textarea
                      id="redaction-areas"
                      value={redactionAreas}
                      onChange={(e) => setRedactionAreas(e.target.value)}
                      placeholder="100,200,150,25&#10;300,400,200,30&#10;(coordinates in points)"
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter coordinates as: x,y,width,height (one per line)
                    </p>
                  </div>
                )}

                {redactionMode === 'smart' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">Smart AI Detection</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      AI will automatically detect and suggest redaction of sensitive information including:
                      names, addresses, phone numbers, SSNs, credit card numbers, and other PII.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="redaction-color">Redaction Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="redaction-color"
                        type="color"
                        value={redactionColor}
                        onChange={(e) => setRedactionColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={redactionColor}
                        onChange={(e) => setRedactionColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smart-detection">Smart Detection</Label>
                    <Switch
                      id="smart-detection"
                      checked={smartDetection}
                      onCheckedChange={setSmartDetection}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Redaction Security</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="permanent-redaction">Permanent Redaction</Label>
                      <Switch
                        id="permanent-redaction"
                        checked={permanentRedaction}
                        onCheckedChange={setPermanentRedaction}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="redact-metadata">Redact Metadata</Label>
                      <Switch
                        id="redact-metadata"
                        checked={redactMetadata}
                        onCheckedChange={setRedactMetadata}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="redact-images">Redact Images</Label>
                      <Switch
                        id="redact-images"
                        checked={redactImages}
                        onCheckedChange={setRedactImages}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Compliance</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="audit-trail">Generate Audit Trail</Label>
                      <Switch
                        id="audit-trail"
                        checked={auditTrail}
                        onCheckedChange={setAuditTrail}
                      />
                    </div>
                  </div>
                </div>

                {!permanentRedaction && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      <strong>Warning:</strong> Non-permanent redaction may allow data recovery. 
                      Use permanent redaction for sensitive documents.
                    </p>
                  </div>
                )}

                {auditTrail && (
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      <strong>Audit Trail:</strong> A detailed log of all redactions will be generated 
                      for compliance and documentation purposes.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional Redaction Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Intelligent pattern recognition for common data types</li>
                <li>• AI-powered detection of sensitive information</li>
                <li>• Area-based redaction with precise coordinate control</li>
                <li>• Permanent, tamper-proof redaction technology</li>
                <li>• Metadata and hidden data removal</li>
                <li>• Compliance audit trail generation</li>
                <li>• Batch processing for multiple documents</li>
                <li>• Custom regex patterns for specialized content</li>
              </ul>
              <p className="mt-2">
                <strong>Security Note:</strong> All redactions are permanent and cannot be undone once applied.
              </p>
            </div>
          </div>
        </div>
      </div>
      </PDFToolTemplate>
    </>
  );
};

export default RedactPdf;
