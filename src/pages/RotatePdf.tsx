
import React, { useState } from 'react';
import { RotateCcw, RotateCw, Info, Settings, FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { rotatePDF } from '@/utils/pdfUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RotatePdf = () => {
  const { toast } = useToast();
  const [rotation, setRotation] = useState(90);
  const [rotateMode, setRotateMode] = useState<'all' | 'range' | 'even' | 'odd' | 'specific'>('all');
  const [pageRange, setPageRange] = useState('1-10');
  const [specificPages, setSpecificPages] = useState('1,3,5');
  const [preserveOrientation, setPreserveOrientation] = useState(false);
  const [autoDetectOrientation, setAutoDetectOrientation] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const rotationOptions = [
    { value: 90, label: '90° Clockwise', icon: <RotateCw className="h-4 w-4" /> },
    { value: 180, label: '180° (Upside Down)', icon: <RotateCw className="h-4 w-4" /> },
    { value: 270, label: '270° Clockwise (90° CCW)', icon: <RotateCcw className="h-4 w-4" /> },
    { value: -90, label: '90° Counter-Clockwise', icon: <RotateCcw className="h-4 w-4" /> },
  ];

  const handleRotate = async (files: File[]): Promise<Uint8Array> => {
    try {
      const options = {
        rotation,
        mode: rotateMode,
        pageRange: rotateMode === 'range' ? pageRange : undefined,
        specificPages: rotateMode === 'specific' ? specificPages.split(',').map(p => parseInt(p.trim())) : undefined,
        preserveOrientation,
        autoDetect: autoDetectOrientation,
        maintainAspectRatio
      };

      toast({
        title: 'Rotation Started',
        description: `Rotating pages ${rotation}° with ${rotateMode} mode...`,
      });

      const result = await rotatePDF(files[0], rotation, options);
      
      toast({
        title: 'Rotation Complete',
        description: `PDF pages rotated successfully by ${rotation}°`,
      });

      return result;
    } catch (error) {
      console.error('Rotation error:', error);
      toast({
        title: 'Rotation Failed',
        description: 'An error occurred while rotating the PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <PDFToolTemplate
      title="Rotate PDF"
      description="Advanced PDF rotation with selective page control, batch processing, and orientation detection"
      icon={<RotateCw className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={batchMode}
      processFunction={handleRotate}
      outputFilename="rotated.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Rotation Settings
            </CardTitle>
            <CardDescription>Configure rotation angle and page selection</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Rotation</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div>
                  <Label htmlFor="rotation">Rotation Angle</Label>
                  <Select value={rotation.toString()} onValueChange={(value) => setRotation(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rotation angle" />
                    </SelectTrigger>
                    <SelectContent>
                      {rotationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          <div className="flex items-center gap-2">
                            {option.icon}
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rotate-mode">Page Selection</Label>
                  <Select value={rotateMode} onValueChange={(value: any) => setRotateMode(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pages to rotate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      <SelectItem value="range">Page Range</SelectItem>
                      <SelectItem value="even">Even Pages Only</SelectItem>
                      <SelectItem value="odd">Odd Pages Only</SelectItem>
                      <SelectItem value="specific">Specific Pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {rotateMode === 'range' && (
                  <div>
                    <Label htmlFor="page-range">Page Range</Label>
                    <Input
                      id="page-range"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder="e.g., 1-5, 8-10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use format: 1-5, 8-10 or single pages: 1,3,5
                    </p>
                  </div>
                )}

                {rotateMode === 'specific' && (
                  <div>
                    <Label htmlFor="specific-pages">Specific Pages</Label>
                    <Input
                      id="specific-pages"
                      value={specificPages}
                      onChange={(e) => setSpecificPages(e.target.value)}
                      placeholder="e.g., 1,3,5,7"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Comma-separated page numbers
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Orientation Control</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preserve-orientation">Preserve Original Orientation</Label>
                      <Switch
                        id="preserve-orientation"
                        checked={preserveOrientation}
                        onCheckedChange={setPreserveOrientation}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-detect">Auto-Detect Orientation</Label>
                      <Switch
                        id="auto-detect"
                        checked={autoDetectOrientation}
                        onCheckedChange={setAutoDetectOrientation}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="aspect-ratio">Maintain Aspect Ratio</Label>
                      <Switch
                        id="aspect-ratio"
                        checked={maintainAspectRatio}
                        onCheckedChange={setMaintainAspectRatio}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Processing Options</h4>
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

                {autoDetectOrientation && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Auto-Detection:</strong> The system will analyze page content and automatically 
                      determine the correct orientation before applying rotation.
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
              <p><strong>Advanced Rotation Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Selective page rotation with precise control</li>
                <li>• Automatic orientation detection for scanned documents</li>
                <li>• Batch processing for multiple PDF files</li>
                <li>• Even/odd page filtering for duplex document handling</li>
                <li>• Aspect ratio preservation for consistent layout</li>
                <li>• Smart rotation with content analysis</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Tip:</strong> Use auto-detect for scanned documents to automatically correct orientation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default RotatePdf;
