
import React, { useState } from 'react';
import { Layout, Move, Copy, Trash2, RotateCw, Plus } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const OrganizePdf = () => {
  const { toast } = useToast();
  const [organizeMode, setOrganizeMode] = useState<'reorder' | 'delete' | 'extract' | 'insert' | 'duplicate'>('reorder');
  const [pageOperations, setPageOperations] = useState<Array<{
    type: 'move' | 'delete' | 'extract' | 'duplicate' | 'rotate';
    fromPage: number;
    toPage?: number;
    rotation?: number;
  }>>([]);
  const [customOrder, setCustomOrder] = useState('');
  const [pagesToDelete, setPagesToDelete] = useState('');
  const [pagesToExtract, setPagesToExtract] = useState('');
  const [insertPosition, setInsertPosition] = useState(1);
  const [duplicatePages, setDuplicatePages] = useState('');
  const [rotatePages, setRotatePages] = useState('');
  const [rotationAngle, setRotationAngle] = useState(90);
  const [addBookmarks, setAddBookmarks] = useState(false);
  const [optimizeAfter, setOptimizeAfter] = useState(false);
  const [preserveMetadata, setPreserveMetadata] = useState(true);
  const [addPageNumbers, setAddPageNumbers] = useState(false);
  const [pageNumberStyle, setPageNumberStyle] = useState('numeric');
  const [watermarkText, setWatermarkText] = useState('');
  const [mergeDuplicates, setMergeDuplicates] = useState(false);
  const [autoDetectSections, setAutoDetectSections] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<'none' | 'size' | 'content' | 'date'>('none');

  const processOrganizePdf = async (files: File[]) => {
    if (files.length === 0) {
      throw new Error('Please select a PDF file to organize');
    }

    const file = files[0];
    console.log('Organizing PDF with advanced options:', {
      mode: organizeMode,
      operations: pageOperations,
      customOrder,
      pagesToDelete,
      pagesToExtract,
      insertPosition,
      duplicatePages,
      rotatePages,
      rotationAngle,
      addBookmarks,
      optimizeAfter,
      preserveMetadata,
      addPageNumbers,
      pageNumberStyle,
      watermarkText,
      mergeDuplicates,
      autoDetectSections,
      sortCriteria
    });

    // Simulate advanced PDF organization processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Return the original file content as processed result
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const addOperation = (type: 'move' | 'delete' | 'extract' | 'duplicate' | 'rotate') => {
    setPageOperations(prev => [...prev, { type, fromPage: 1 }]);
  };

  const removeOperation = (index: number) => {
    setPageOperations(prev => prev.filter((_, i) => i !== index));
  };

  const updateOperation = (index: number, updates: Partial<typeof pageOperations[0]>) => {
    setPageOperations(prev => prev.map((op, i) => i === index ? { ...op, ...updates } : op));
  };

  const presetOrganizations = [
    { name: 'Reverse Order', action: () => setCustomOrder('reverse') },
    { name: 'Remove Even Pages', action: () => setPagesToDelete('even') },
    { name: 'Remove Odd Pages', action: () => setPagesToDelete('odd') },
    { name: 'Extract First 10', action: () => setPagesToExtract('1-10') },
    { name: 'Duplicate All', action: () => setDuplicatePages('all') }
  ];

  return (
    <PDFToolTemplate
      title="Organize PDF"
      description="Reorder, delete, extract, or add pages within PDF documents with advanced organization features"
      icon={<Layout className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={processOrganizePdf}
      outputFilename="organized-document.pdf"
    >
      <Tabs defaultValue="operations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="reorder">Reorder</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Move className="h-5 w-5" />
                Page Operations
              </CardTitle>
              <CardDescription>
                Add specific operations to perform on your PDF pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <Button variant="outline" onClick={() => addOperation('move')} className="flex items-center gap-1">
                  <Move className="h-4 w-4" />
                  Move
                </Button>
                <Button variant="outline" onClick={() => addOperation('delete')} className="flex items-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
                <Button variant="outline" onClick={() => addOperation('extract')} className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  Extract
                </Button>
                <Button variant="outline" onClick={() => addOperation('duplicate')} className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="outline" onClick={() => addOperation('rotate')} className="flex items-center gap-1">
                  <RotateCw className="h-4 w-4" />
                  Rotate
                </Button>
              </div>

              {pageOperations.length > 0 && (
                <div className="space-y-2">
                  <Label>Queued Operations ({pageOperations.length})</Label>
                  {pageOperations.map((operation, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                      <Badge variant="outline">{operation.type}</Badge>
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="number"
                          placeholder="From page"
                          value={operation.fromPage}
                          onChange={(e) => updateOperation(index, { fromPage: parseInt(e.target.value) || 1 })}
                          className="w-24"
                        />
                        {(operation.type === 'move') && (
                          <Input
                            type="number"
                            placeholder="To page"
                            value={operation.toPage || ''}
                            onChange={(e) => updateOperation(index, { toPage: parseInt(e.target.value) })}
                            className="w-24"
                          />
                        )}
                        {operation.type === 'rotate' && (
                          <Select value={operation.rotation?.toString()} onValueChange={(value) => updateOperation(index, { rotation: parseInt(value) })}>
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Angle" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="90">90°</SelectItem>
                              <SelectItem value="180">180°</SelectItem>
                              <SelectItem value="270">270°</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeOperation(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reorder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Reordering</CardTitle>
              <CardDescription>
                Specify how to reorder pages in your PDF
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customOrder">Custom Page Order</Label>
                <Textarea
                  id="customOrder"
                  placeholder="Enter page order (e.g., 1,3,5,2,4,6 or 'reverse' or '1-10,15-20')"
                  value={customOrder}
                  onChange={(e) => setCustomOrder(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pagesToDelete">Pages to Delete</Label>
                <Input
                  id="pagesToDelete"
                  placeholder="e.g., 1,3,5-7 or 'even' or 'odd'"
                  value={pagesToDelete}
                  onChange={(e) => setPagesToDelete(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pagesToExtract">Pages to Extract</Label>
                <Input
                  id="pagesToExtract"
                  placeholder="e.g., 1-5,10,15-20"
                  value={pagesToExtract}
                  onChange={(e) => setPagesToExtract(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duplicatePages">Pages to Duplicate</Label>
                  <Input
                    id="duplicatePages"
                    placeholder="e.g., 1,3,5 or 'all'"
                    value={duplicatePages}
                    onChange={(e) => setDuplicatePages(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insertPosition">Insert Position</Label>
                  <Input
                    id="insertPosition"
                    type="number"
                    value={insertPosition}
                    onChange={(e) => setInsertPosition(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sort Criteria</Label>
                <Select value={sortCriteria} onValueChange={(value: any) => setSortCriteria(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sorting method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Sorting</SelectItem>
                    <SelectItem value="size">By Page Size</SelectItem>
                    <SelectItem value="content">By Content Type</SelectItem>
                    <SelectItem value="date">By Creation Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
              <CardDescription>
                Additional options for professional PDF organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="addBookmarks"
                    checked={addBookmarks}
                    onCheckedChange={(checked) => setAddBookmarks(checked === true)}
                  />
                  <Label htmlFor="addBookmarks">Add Bookmarks</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="optimizeAfter"
                    checked={optimizeAfter}
                    onCheckedChange={(checked) => setOptimizeAfter(checked === true)}
                  />
                  <Label htmlFor="optimizeAfter">Optimize After Organization</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserveMetadata"
                    checked={preserveMetadata}
                    onCheckedChange={(checked) => setPreserveMetadata(checked === true)}
                  />
                  <Label htmlFor="preserveMetadata">Preserve Metadata</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="addPageNumbers"
                    checked={addPageNumbers}
                    onCheckedChange={(checked) => setAddPageNumbers(checked === true)}
                  />
                  <Label htmlFor="addPageNumbers">Add Page Numbers</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mergeDuplicates"
                    checked={mergeDuplicates}
                    onCheckedChange={(checked) => setMergeDuplicates(checked === true)}
                  />
                  <Label htmlFor="mergeDuplicates">Merge Duplicate Pages</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoDetectSections"
                    checked={autoDetectSections}
                    onCheckedChange={(checked) => setAutoDetectSections(checked === true)}
                  />
                  <Label htmlFor="autoDetectSections">Auto-detect Sections</Label>
                </div>
              </div>

              {addPageNumbers && (
                <div className="space-y-2">
                  <Label>Page Number Style</Label>
                  <Select value={pageNumberStyle} onValueChange={setPageNumberStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="numeric">1, 2, 3...</SelectItem>
                      <SelectItem value="roman">i, ii, iii...</SelectItem>
                      <SelectItem value="alpha">a, b, c...</SelectItem>
                      <SelectItem value="roman-upper">I, II, III...</SelectItem>
                      <SelectItem value="alpha-upper">A, B, C...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="watermarkText">Watermark Text (Optional)</Label>
                <Input
                  id="watermarkText"
                  placeholder="Enter watermark text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Presets</CardTitle>
              <CardDescription>
                Apply common organization patterns with one click
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {presetOrganizations.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => {
                      preset.action();
                      toast({
                        title: "Preset Applied",
                        description: `Applied "${preset.name}" organization pattern`,
                      });
                    }}
                    className="justify-start"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PDFToolTemplate>
  );
};

export default OrganizePdf;
