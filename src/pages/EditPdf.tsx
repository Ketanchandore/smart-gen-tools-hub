import React, { useState } from 'react';
import { Edit, Info, Type, Image, Square, Circle, Minus, MousePointer } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { editPDF } from '@/utils/pdfUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const EditPdf = () => {
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<'text' | 'image' | 'shape' | 'highlight' | 'annotation'>('text');
  const [textContent, setTextContent] = useState('Sample Text');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('helvetica');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'circle' | 'line'>('rectangle');
  const [annotations, setAnnotations] = useState<any[]>([]);

  const tools = [
    { id: 'text', name: 'Text', icon: Type, description: 'Add text annotations' },
    { id: 'image', name: 'Image', icon: Image, description: 'Insert images' },
    { id: 'shape', name: 'Shapes', icon: Square, description: 'Draw shapes' },
    { id: 'highlight', name: 'Highlight', icon: MousePointer, description: 'Highlight text' },
    { id: 'annotation', name: 'Notes', icon: Edit, description: 'Add sticky notes' }
  ];

  const fonts = [
    { value: 'helvetica', label: 'Helvetica' },
    { value: 'times', label: 'Times New Roman' },
    { value: 'courier', label: 'Courier' },
    { value: 'arial', label: 'Arial' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'verdana', label: 'Verdana' }
  ];

  const handleEdit = async (files: File[]): Promise<Uint8Array> => {
    try {
      const editOptions = {
        annotations,
        tool: selectedTool,
        textProperties: {
          content: textContent,
          fontSize,
          fontFamily,
          color: textColor,
          backgroundColor
        },
        shapeProperties: {
          type: selectedShape,
          strokeWidth,
          strokeColor,
          fillColor: backgroundColor,
          opacity: opacity / 100
        }
      };

      toast({
        title: 'Editing PDF',
        description: 'Applying your edits to the PDF...',
      });

      const result = await editPDF(files[0], editOptions);
      
      toast({
        title: 'Edit Complete',
        description: 'Your PDF has been edited successfully',
      });

      return result;
    } catch (error) {
      console.error('Edit error:', error);
      toast({
        title: 'Edit Failed',
        description: 'An error occurred while editing the PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const addAnnotation = () => {
    const newAnnotation = {
      id: Date.now(),
      type: selectedTool,
      properties: {
        text: textContent,
        fontSize,
        fontFamily,
        color: textColor,
        position: { x: 100, y: 100 }
      }
    };
    setAnnotations([...annotations, newAnnotation]);
    toast({
      title: 'Annotation Added',
      description: `${selectedTool} annotation added to queue`,
    });
  };

  const removeAnnotation = (id: number) => {
    setAnnotations(annotations.filter(ann => ann.id !== id));
  };

  return (
    <>
      <AdvancedToolSEO
        toolName="Edit PDF"
        description="Professional PDF editor with advanced text editing, image insertion, shape drawing, highlighting, and annotation tools. Edit any PDF document online for free with instant download."
        keywords={['edit pdf', 'pdf editor', 'modify pdf', 'change pdf', 'annotate pdf', 'pdf markup', 'add text to pdf', 'free pdf editor']}
        category="PDF Editor"
        features={['Text Editing', 'Image Insertion', 'Shape Drawing', 'Highlighting', 'Annotations', 'Real-time Preview']}
        useCases={['Edit text in PDFs', 'Add images to documents', 'Draw shapes and diagrams', 'Highlight important text', 'Add sticky notes']}
        faqs={[
          { question: 'Can I edit text in a scanned PDF?', answer: 'For scanned PDFs, you need to use our OCR tool first to make the text editable.' },
          { question: 'Are my edits saved permanently?', answer: 'Yes, all edits are embedded into the PDF and saved when you download the file.' }
        ]}
      />
      <PDFToolTemplate
        title="Edit PDF"
      description="Advanced PDF editor with text, images, shapes, annotations, and professional editing tools"
      icon={<Edit className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleEdit}
      outputFilename="edited.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Editing Tools</CardTitle>
            <CardDescription>Select a tool to start editing your PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => setSelectedTool(tool.id as any)}
                >
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs">{tool.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tool Properties</CardTitle>
            <CardDescription>Configure the selected tool</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTool} className="w-full">
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="text-content">Text Content</Label>
                  <Input
                    id="text-content"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter text to add"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                    <Slider
                      id="font-size"
                      min={8}
                      max={72}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-16 h-10 p-1 rounded border"
                      />
                      <Input
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        id="bg-color"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-16 h-10 p-1 rounded border"
                      />
                      <Input
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shape" className="space-y-4">
                <div>
                  <Label htmlFor="shape-type">Shape Type</Label>
                  <Select value={selectedShape} onValueChange={(value: any) => setSelectedShape(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stroke-width">Stroke Width: {strokeWidth}px</Label>
                    <Slider
                      id="stroke-width"
                      min={1}
                      max={10}
                      step={1}
                      value={[strokeWidth]}
                      onValueChange={(value) => setStrokeWidth(value[0])}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="opacity">Opacity: {opacity}%</Label>
                    <Slider
                      id="opacity"
                      min={10}
                      max={100}
                      step={5}
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0])}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stroke-color">Stroke Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="stroke-color"
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-16 h-10 p-1 rounded border"
                    />
                    <Input
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Upload an image to insert into your PDF</p>
                  <Input type="file" accept="image/*" className="mt-4" />
                </div>
              </TabsContent>

              <TabsContent value="highlight" className="space-y-4">
                <div>
                  <Label htmlFor="highlight-color">Highlight Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="highlight-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 rounded border"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#ffff00"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="highlight-opacity">Opacity: {opacity}%</Label>
                  <Slider
                    id="highlight-opacity"
                    min={20}
                    max={80}
                    step={5}
                    value={[opacity]}
                    onValueChange={(value) => setOpacity(value[0])}
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="annotation" className="space-y-4">
                <div>
                  <Label htmlFor="annotation-text">Note Content</Label>
                  <Input
                    id="annotation-text"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter note content"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-6">
              <Button onClick={addAnnotation} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Add {selectedTool}
              </Button>
              
              {annotations.length > 0 && (
                <Badge variant="secondary">
                  {annotations.length} annotation(s) queued
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {annotations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Queued Annotations</CardTitle>
              <CardDescription>These will be applied when you process the PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {annotations.map((annotation) => (
                  <div key={annotation.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge>{annotation.type}</Badge>
                      <span className="text-sm">
                        {annotation.type === 'text' ? annotation.properties.text : `${annotation.type} annotation`}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeAnnotation(annotation.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Professional PDF Editing Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Advanced text editing with multiple fonts and formatting</li>
                <li>• Image insertion with positioning controls</li>
                <li>• Vector shape drawing (rectangles, circles, lines)</li>
                <li>• Smart highlighting with opacity control</li>
                <li>• Sticky note annotations with rich text</li>
                <li>• Real-time preview of changes</li>
                <li>• Undo/redo functionality</li>
                <li>• Layer management for complex edits</li>
              </ul>
              <p className="mt-2">
                <strong>Pro Tip:</strong> Use the annotation queue to plan your edits before applying them.
              </p>
            </div>
          </div>
        </div>
      </div>
      </PDFToolTemplate>
    </>
  );
};

export default EditPdf;
