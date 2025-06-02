
import React, { useState } from 'react';
import { RotateCw, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { rotatePDF } from '@/utils/pdfUtils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const RotatePdf = () => {
  const { toast } = useToast();
  const [rotation, setRotation] = useState(90);
  const [rotateMode, setRotateMode] = useState<'all' | 'odd' | 'even' | 'specific'>('all');
  const [specificPages, setSpecificPages] = useState('1,3,5');

  const handleRotate = async (files: File[]): Promise<Uint8Array> => {
    try {
      let pageIndices: number[] | undefined;
      
      if (rotateMode === 'specific') {
        pageIndices = specificPages.split(',')
          .map(p => parseInt(p.trim()) - 1)
          .filter(p => !isNaN(p) && p >= 0);
      }

      const result = await rotatePDF(files[0], rotation, {
        rotateMode,
        pageIndices
      });
      
      toast({
        title: 'PDF Rotated Successfully',
        description: `Pages rotated by ${rotation}° using ${rotateMode} mode`,
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
      description="Rotate PDF pages with precise angle control and selective page rotation"
      icon={<RotateCw className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleRotate}
      outputFilename="rotated.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Rotation Settings</CardTitle>
            <CardDescription>Configure rotation angle and page selection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rotation">Rotation Angle</Label>
              <Select value={rotation.toString()} onValueChange={(value) => setRotation(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rotation angle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90° Clockwise</SelectItem>
                  <SelectItem value="180">180° (Upside Down)</SelectItem>
                  <SelectItem value="270">270° Clockwise (90° Counter-clockwise)</SelectItem>
                  <SelectItem value="-90">90° Counter-clockwise</SelectItem>
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
                  <SelectItem value="odd">Odd Pages Only</SelectItem>
                  <SelectItem value="even">Even Pages Only</SelectItem>
                  <SelectItem value="specific">Specific Pages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {rotateMode === 'specific' && (
              <div>
                <Label htmlFor="specific-pages">Specific Pages</Label>
                <Input
                  id="specific-pages"
                  value={specificPages}
                  onChange={(e) => setSpecificPages(e.target.value)}
                  placeholder="e.g., 1,3,5,7-10"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate page numbers with commas. Use hyphens for ranges.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <h4 className="font-medium mb-2">Rotation Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Rotation: {rotation}°</p>
            <p>Apply to: {rotateMode === 'specific' ? `Pages ${specificPages}` : rotateMode + ' pages'}</p>
            <p>Direction: {rotation > 0 ? 'Clockwise' : 'Counter-clockwise'}</p>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>PDF Rotation Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Precise angle control (90°, 180°, 270°)</li>
                <li>• Selective page rotation (all, odd, even, specific)</li>
                <li>• Clockwise and counter-clockwise rotation</li>
                <li>• Batch processing for multiple files</li>
                <li>• Preserve original quality and formatting</li>
                <li>• Support for landscape and portrait orientations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default RotatePdf;
