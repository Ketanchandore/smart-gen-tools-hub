
import React, { useState } from 'react';
import { ArrowLeft, Palette, Upload, Download, Eye, Edit, Trash2, Plus, Save, Image, Type, Zap, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  description?: string;
}

interface Typography {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  usage: string;
}

interface Asset {
  id: string;
  name: string;
  type: 'logo' | 'icon' | 'image' | 'pattern';
  url: string;
  description?: string;
}

interface BrandGuideline {
  id: string;
  title: string;
  content: string;
  category: 'voice' | 'tone' | 'usage' | 'standards';
}

const BrandkitOrganizer = () => {
  const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>([
    {
      id: '1',
      name: 'Primary Palette',
      colors: ['#3B82F6', '#1E40AF', '#DBEAFE', '#93C5FD'],
      description: 'Main brand colors for primary elements'
    }
  ]);
  
  const [typography, setTypography] = useState<Typography[]>([
    {
      id: '1',
      name: 'Heading Font',
      fontFamily: 'Inter',
      fontSize: '24px',
      fontWeight: '600',
      usage: 'Headlines and titles'
    }
  ]);
  
  const [assets, setAssets] = useState<Asset[]>([]);
  const [guidelines, setGuidelines] = useState<BrandGuideline[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  // Color Palette Management
  const [newPalette, setNewPalette] = useState({
    name: '',
    colors: ['#000000'],
    description: ''
  });

  const addColorToPalette = () => {
    setNewPalette(prev => ({
      ...prev,
      colors: [...prev.colors, '#000000']
    }));
  };

  const updatePaletteColor = (index: number, color: string) => {
    setNewPalette(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) => i === index ? color : c)
    }));
  };

  const savePalette = () => {
    if (newPalette.name) {
      const palette: ColorPalette = {
        id: Date.now().toString(),
        ...newPalette
      };
      setColorPalettes(prev => [...prev, palette]);
      setNewPalette({ name: '', colors: ['#000000'], description: '' });
      toast({
        title: "Palette Saved",
        description: "Your color palette has been added to the brand kit"
      });
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
    toast({
      title: "Color Copied",
      description: `${color} copied to clipboard`
    });
  };

  // Typography Management
  const [newTypography, setNewTypography] = useState({
    name: '',
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    usage: ''
  });

  const saveTypography = () => {
    if (newTypography.name && newTypography.fontFamily) {
      const typo: Typography = {
        id: Date.now().toString(),
        ...newTypography
      };
      setTypography(prev => [...prev, typo]);
      setNewTypography({ name: '', fontFamily: '', fontSize: '', fontWeight: '', usage: '' });
      toast({
        title: "Typography Saved",
        description: "Typography style has been added to the brand kit"
      });
    }
  };

  // Guidelines Management
  const [newGuideline, setNewGuideline] = useState({
    title: '',
    content: '',
    category: 'standards' as const
  });

  const saveGuideline = () => {
    if (newGuideline.title && newGuideline.content) {
      const guideline: BrandGuideline = {
        id: Date.now().toString(),
        ...newGuideline
      };
      setGuidelines(prev => [...prev, guideline]);
      setNewGuideline({ title: '', content: '', category: 'standards' });
      toast({
        title: "Guideline Saved",
        description: "Brand guideline has been added"
      });
    }
  };

  const exportBrandKit = () => {
    const brandKit = {
      colorPalettes,
      typography,
      assets,
      guidelines,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(brandKit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brand-kit.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Brand Kit Exported",
      description: "Your brand kit has been exported as JSON"
    });
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <Palette className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">BrandKit Organizer</h1>
        <p className="text-muted-foreground mt-2">Organize and maintain your brand assets in one place</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={exportBrandKit} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Brand Kit
        </Button>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Color Palette</CardTitle>
                <CardDescription>Create a new color palette for your brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="palette-name">Palette Name</Label>
                  <Input
                    id="palette-name"
                    value={newPalette.name}
                    onChange={(e) => setNewPalette(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Primary Colors"
                  />
                </div>
                
                <div>
                  <Label>Colors</Label>
                  <div className="space-y-2">
                    {newPalette.colors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => updatePaletteColor(index, e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <Input
                          value={color}
                          onChange={(e) => updatePaletteColor(index, e.target.value)}
                          className="font-mono"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addColorToPalette}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Color
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="palette-description">Description</Label>
                  <Textarea
                    id="palette-description"
                    value={newPalette.description}
                    onChange={(e) => setNewPalette(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe when to use this palette"
                  />
                </div>
                
                <Button onClick={savePalette} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Palette
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Palettes</h3>
              {colorPalettes.map((palette) => (
                <Card key={palette.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{palette.name}</CardTitle>
                    {palette.description && (
                      <CardDescription>{palette.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {palette.colors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                          />
                          <p className="text-xs mt-1 font-mono">
                            {color}
                            {copiedColor === color && (
                              <Check className="h-3 w-3 inline ml-1 text-green-600" />
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Typography Style</CardTitle>
                <CardDescription>Define typography for your brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="typo-name">Style Name</Label>
                  <Input
                    id="typo-name"
                    value={newTypography.name}
                    onChange={(e) => setNewTypography(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Heading H1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Input
                    id="font-family"
                    value={newTypography.fontFamily}
                    onChange={(e) => setNewTypography(prev => ({ ...prev, fontFamily: e.target.value }))}
                    placeholder="e.g., Inter, Arial, sans-serif"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="font-size">Font Size</Label>
                    <Input
                      id="font-size"
                      value={newTypography.fontSize}
                      onChange={(e) => setNewTypography(prev => ({ ...prev, fontSize: e.target.value }))}
                      placeholder="e.g., 24px"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="font-weight">Font Weight</Label>
                    <Input
                      id="font-weight"
                      value={newTypography.fontWeight}
                      onChange={(e) => setNewTypography(prev => ({ ...prev, fontWeight: e.target.value }))}
                      placeholder="e.g., 600"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="usage">Usage</Label>
                  <Textarea
                    id="usage"
                    value={newTypography.usage}
                    onChange={(e) => setNewTypography(prev => ({ ...prev, usage: e.target.value }))}
                    placeholder="Describe when to use this typography"
                  />
                </div>
                
                <Button onClick={saveTypography} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Typography
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Typography Styles</h3>
              {typography.map((typo) => (
                <Card key={typo.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{typo.name}</h4>
                      <div
                        className="text-lg border p-3 rounded"
                        style={{
                          fontFamily: typo.fontFamily,
                          fontSize: typo.fontSize,
                          fontWeight: typo.fontWeight
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Font:</strong> {typo.fontFamily}</p>
                        <p><strong>Size:</strong> {typo.fontSize}</p>
                        <p><strong>Weight:</strong> {typo.fontWeight}</p>
                        <p><strong>Usage:</strong> {typo.usage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
              <CardDescription>Upload and manage your brand assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium">Upload Brand Assets</p>
                <p className="text-muted-foreground">Drag and drop files or click to browse</p>
                <Button className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              
              {assets.length === 0 ? (
                <div className="text-center py-8">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">No assets uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {assets.map((asset) => (
                    <Card key={asset.id} className="overflow-hidden">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                      <CardContent className="p-3">
                        <p className="font-medium text-sm">{asset.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {asset.type}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Brand Guideline</CardTitle>
                <CardDescription>Document your brand standards and guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="guideline-title">Title</Label>
                  <Input
                    id="guideline-title"
                    value={newGuideline.title}
                    onChange={(e) => setNewGuideline(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Logo Usage Guidelines"
                  />
                </div>
                
                <div>
                  <Label htmlFor="guideline-category">Category</Label>
                  <select
                    id="guideline-category"
                    value={newGuideline.category}
                    onChange={(e) => setNewGuideline(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="standards">Standards</option>
                    <option value="voice">Voice & Tone</option>
                    <option value="usage">Usage Guidelines</option>
                    <option value="tone">Brand Tone</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="guideline-content">Content</Label>
                  <Textarea
                    id="guideline-content"
                    value={newGuideline.content}
                    onChange={(e) => setNewGuideline(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Describe the guideline in detail..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button onClick={saveGuideline} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Guideline
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Brand Guidelines</h3>
              {guidelines.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">No guidelines added yet</p>
                  </CardContent>
                </Card>
              ) : (
                guidelines.map((guideline) => (
                  <Card key={guideline.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{guideline.title}</CardTitle>
                          <Badge variant="outline">{guideline.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {guideline.content}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandkitOrganizer;
