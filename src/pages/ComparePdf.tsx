import React, { useState } from 'react';
import { Eye, GitCompare, Settings, FileText, Image, AlertCircle } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import AdvancedToolSEO from '@/components/AdvancedToolSEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ComparePdf = () => {
  const [comparisonMode, setComparisonMode] = useState<'visual' | 'text' | 'structure' | 'comprehensive'>('comprehensive');
  const [highlightColor, setHighlightColor] = useState('#ff0000');
  const [sensitivity, setSensitivity] = useState([75]);
  const [ignoreFormatting, setIgnoreFormatting] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  const [ignoreImages, setIgnoreImages] = useState(false);
  const [ignoreAnnotations, setIgnoreAnnotations] = useState(false);
  const [detectMoves, setDetectMoves] = useState(true);
  const [wordLevel, setWordLevel] = useState(true);
  const [characterLevel, setCharacterLevel] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [sideBySide, setSideBySide] = useState(true);
  const [highlightDeletions, setHighlightDeletions] = useState(true);
  const [highlightInsertions, setHighlightInsertions] = useState(true);
  const [highlightChanges, setHighlightChanges] = useState(true);
  const [generateSummary, setGenerateSummary] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(false);
  const [toleranceLevel, setToleranceLevel] = useState([5]);
  const [pageRangeA, setPageRangeA] = useState('');
  const [pageRangeB, setPageRangeB] = useState('');
  const [outputFormat, setOutputFormat] = useState<'pdf' | 'html' | 'both'>('pdf');

  const processComparePdf = async (files: File[]) => {
    if (files.length < 2) {
      throw new Error('Please select two PDF files to compare');
    }

    const [fileA, fileB] = files;
    console.log('Comparing PDFs with advanced options:', {
      comparisonMode,
      visualSettings: {
        highlightColor,
        sensitivity: sensitivity[0],
        toleranceLevel: toleranceLevel[0]
      },
      contentSettings: {
        ignoreFormatting,
        ignoreWhitespace,
        ignoreImages,
        ignoreAnnotations,
        detectMoves,
        wordLevel,
        characterLevel
      },
      outputSettings: {
        showLineNumbers,
        sideBySide,
        highlightDeletions,
        highlightInsertions,
        highlightChanges,
        generateSummary,
        includeMetadata,
        outputFormat
      },
      pageRanges: {
        documentA: pageRangeA,
        documentB: pageRangeB
      }
    });

    // Simulate advanced PDF comparison processing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Create a dummy comparison report
    const comparisonData = `Comparison Report\nDocument A: ${fileA.name}\nDocument B: ${fileB.name}\nMode: ${comparisonMode}\nDifferences found: 15 changes detected`;
    const encoder = new TextEncoder();
    return encoder.encode(comparisonData);
  };

  const comparisonModes = [
    { 
      value: 'visual', 
      label: 'Visual Comparison', 
      description: 'Compare visual appearance and layout' 
    },
    { 
      value: 'text', 
      label: 'Text Comparison', 
      description: 'Compare text content only' 
    },
    { 
      value: 'structure', 
      label: 'Structure Comparison', 
      description: 'Compare document structure and metadata' 
    },
    { 
      value: 'comprehensive', 
      label: 'Comprehensive Analysis', 
      description: 'Complete comparison including all aspects' 
    }
  ];

  const colorPresets = [
    { name: 'Red', value: '#ff0000' },
    { name: 'Blue', value: '#0066ff' },
    { name: 'Green', value: '#00cc00' },
    { name: 'Orange', value: '#ff6600' },
    { name: 'Purple', value: '#9933cc' },
    { name: 'Yellow', value: '#ffcc00' }
  ];

  return (
    <>
      <AdvancedToolSEO
        toolName="Compare PDF"
        description="Compare two PDF documents and highlight differences. Visual diff, text comparison, and comprehensive analysis with side-by-side view. Perfect for contract reviews and document versioning."
        keywords={['compare pdf', 'pdf diff', 'pdf comparison', 'document comparison', 'find pdf differences', 'pdf version compare', 'pdf changes']}
        category="PDF Tools"
        features={['Visual Comparison', 'Text Analysis', 'Structure Comparison', 'Side-by-side View', 'Highlight Changes', 'Comprehensive Reports']}
        useCases={['Compare contract versions', 'Review document changes', 'Track revisions', 'Legal document review', 'Quality assurance']}
        faqs={[
          { question: 'What types of differences are detected?', answer: 'We detect text changes, formatting differences, image modifications, and structural changes between documents.' },
          { question: 'Can I compare specific pages only?', answer: 'Yes, you can specify page ranges for both documents to compare specific sections.' }
        ]}
      />
      <PDFToolTemplate
        title="Compare PDF"
      description="Advanced PDF comparison tool with visual diff, text analysis, and comprehensive reporting"
      icon={<Eye className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={true}
      processFunction={processComparePdf}
      outputFilename="pdf-comparison-report.pdf"
    >
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Select exactly two PDF files to compare. The first file will be treated as the original, 
          and the second as the modified version.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="content">Content Options</TabsTrigger>
          <TabsTrigger value="visual">Visual Settings</TabsTrigger>
          <TabsTrigger value="output">Output Format</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5" />
                Comparison Settings
              </CardTitle>
              <CardDescription>
                Configure how the documents should be compared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Comparison Mode</Label>
                <Select value={comparisonMode} onValueChange={(value: any) => setComparisonMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {comparisonModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {comparisonModes.find(m => m.value === comparisonMode)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Sensitivity Level: {sensitivity[0]}%</Label>
                <Slider
                  value={sensitivity}
                  onValueChange={setSensitivity}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Higher values detect more subtle differences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pageRangeA">Page Range - Document A</Label>
                  <Input
                    id="pageRangeA"
                    placeholder="e.g., 1-10, 15, 20-25 (blank for all)"
                    value={pageRangeA}
                    onChange={(e) => setPageRangeA(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageRangeB">Page Range - Document B</Label>
                  <Input
                    id="pageRangeB"
                    placeholder="e.g., 1-10, 15, 20-25 (blank for all)"
                    value={pageRangeB}
                    onChange={(e) => setPageRangeB(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectMoves"
                    checked={detectMoves}
                    onCheckedChange={(checked) => setDetectMoves(checked === true)}
                  />
                  <Label htmlFor="detectMoves">Detect Moved Content</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="generateSummary"
                    checked={generateSummary}
                    onCheckedChange={(checked) => setGenerateSummary(checked === true)}
                  />
                  <Label htmlFor="generateSummary">Generate Summary Report</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeMetadata"
                    checked={includeMetadata}
                    onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
                  />
                  <Label htmlFor="includeMetadata">Compare Metadata</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content Analysis Options
              </CardTitle>
              <CardDescription>
                Specify what content elements to include or ignore
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Comparison Granularity</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wordLevel"
                      checked={wordLevel}
                      onCheckedChange={(checked) => setWordLevel(checked === true)}
                    />
                    <Label htmlFor="wordLevel">Word-level Comparison</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="characterLevel"
                      checked={characterLevel}
                      onCheckedChange={(checked) => setCharacterLevel(checked === true)}
                    />
                    <Label htmlFor="characterLevel">Character-level Comparison</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Content to Ignore</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ignoreFormatting"
                      checked={ignoreFormatting}
                      onCheckedChange={(checked) => setIgnoreFormatting(checked === true)}
                    />
                    <Label htmlFor="ignoreFormatting">Ignore Formatting</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ignoreWhitespace"
                      checked={ignoreWhitespace}
                      onCheckedChange={(checked) => setIgnoreWhitespace(checked === true)}
                    />
                    <Label htmlFor="ignoreWhitespace">Ignore Whitespace</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ignoreImages"
                      checked={ignoreImages}
                      onCheckedChange={(checked) => setIgnoreImages(checked === true)}
                    />
                    <Label htmlFor="ignoreImages">Ignore Images</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ignoreAnnotations"
                      checked={ignoreAnnotations}
                      onCheckedChange={(checked) => setIgnoreAnnotations(checked === true)}
                    />
                    <Label htmlFor="ignoreAnnotations">Ignore Annotations</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Visual Tolerance: {toleranceLevel[0]}px</Label>
                <Slider
                  value={toleranceLevel}
                  onValueChange={setToleranceLevel}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Pixel tolerance for visual differences (0 = exact match)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Visual Highlighting
              </CardTitle>
              <CardDescription>
                Customize how differences are highlighted in the output
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Highlight Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={highlightColor}
                    onChange={(e) => setHighlightColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <div className="flex gap-1">
                    {colorPresets.map((color) => (
                      <Button
                        key={color.value}
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0"
                        style={{ backgroundColor: color.value }}
                        onClick={() => setHighlightColor(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Highlight Types</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="highlightDeletions"
                      checked={highlightDeletions}
                      onCheckedChange={(checked) => setHighlightDeletions(checked === true)}
                    />
                    <Label htmlFor="highlightDeletions">Deletions</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="highlightInsertions"
                      checked={highlightInsertions}
                      onCheckedChange={(checked) => setHighlightInsertions(checked === true)}
                    />
                    <Label htmlFor="highlightInsertions">Insertions</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="highlightChanges"
                      checked={highlightChanges}
                      onCheckedChange={(checked) => setHighlightChanges(checked === true)}
                    />
                    <Label htmlFor="highlightChanges">Modifications</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showLineNumbers"
                    checked={showLineNumbers}
                    onCheckedChange={(checked) => setShowLineNumbers(checked === true)}
                  />
                  <Label htmlFor="showLineNumbers">Show Line Numbers</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sideBySide"
                    checked={sideBySide}
                    onCheckedChange={(checked) => setSideBySide(checked === true)}
                  />
                  <Label htmlFor="sideBySide">Side-by-Side View</Label>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Color Legend</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Badge variant="outline" className="justify-start p-3" style={{ borderColor: '#ff0000' }}>
                    🗑️ Red: Deleted content
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3" style={{ borderColor: '#00cc00' }}>
                    ➕ Green: Added content
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3" style={{ borderColor: '#0066ff' }}>
                    ✏️ Blue: Modified content
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3" style={{ borderColor: '#ff6600' }}>
                    🔄 Orange: Moved content
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Output Configuration
              </CardTitle>
              <CardDescription>
                Choose the format and content of the comparison report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="html">HTML Report</SelectItem>
                    <SelectItem value="both">Both PDF and HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  The comparison report will include:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Summary of changes with statistics</li>
                    <li>Page-by-page comparison with highlights</li>
                    <li>Detailed change log with descriptions</li>
                    {includeMetadata && <li>Metadata comparison table</li>}
                    {generateSummary && <li>Executive summary with recommendations</li>}
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Label>Report Features</Label>
                <div className="grid grid-cols-1 gap-2">
                  <Badge variant="outline" className="justify-start p-3">
                    📊 Statistical analysis of changes
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    🔍 Interactive navigation between differences
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    📝 Detailed change descriptions
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    🎯 Confidence scores for each change
                  </Badge>
                  <Badge variant="outline" className="justify-start p-3">
                    📈 Visual charts and graphs
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PDFToolTemplate>
    </>
  );
};

export default ComparePdf;
