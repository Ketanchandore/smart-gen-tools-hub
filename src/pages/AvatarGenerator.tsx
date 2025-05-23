
import React, { useState } from 'react';
import { ArrowLeft, User, Sparkles, Download, RefreshCw, Settings, Palette, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface AvatarSettings {
  gender: string;
  age: number;
  ethnicity: string;
  hairColor: string;
  eyeColor: string;
  style: string;
  expression: string;
  background: string;
  clothing: string;
}

const AvatarGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { toast } = useToast();

  const [avatarSettings, setAvatarSettings] = useState<AvatarSettings>({
    gender: 'any',
    age: 25,
    ethnicity: 'any',
    hairColor: 'any',
    eyeColor: 'any',
    style: 'realistic',
    expression: 'friendly',
    background: 'solid',
    clothing: 'casual'
  });

  const presetPrompts = [
    "Professional business avatar for LinkedIn profile",
    "Cartoon-style character for gaming profile",
    "Anime-inspired character with blue hair",
    "Realistic portrait with warm smile",
    "Fantasy character with mystical features",
    "Minimalist geometric avatar",
    "Retro pixel art character",
    "Sci-fi cyberpunk character"
  ];

  const generateAvatar = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      // Generate placeholder avatars (in real app, these would be AI-generated)
      const mockAvatars = [
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
        `https://api.dicebear.com/7.x/personas/svg?seed=${Math.random()}`,
        `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()}`,
        `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`
      ];
      
      setGeneratedAvatars(mockAvatars);
      setIsGenerating(false);
      
      toast({
        title: "Avatars Generated!",
        description: "Your AI avatars are ready for download"
      });
    }, 3000);
  };

  const generateFromSettings = () => {
    const settingsPrompt = `Generate a ${avatarSettings.style} avatar of a ${avatarSettings.age} year old ${avatarSettings.gender} person with ${avatarSettings.hairColor} hair, ${avatarSettings.eyeColor} eyes, wearing ${avatarSettings.clothing} clothes, with a ${avatarSettings.expression} expression, on a ${avatarSettings.background} background`;
    setPrompt(settingsPrompt);
    generateAvatar();
  };

  const downloadAvatar = (avatarUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = avatarUrl;
    link.download = `avatar-${index + 1}.svg`;
    link.click();
    
    toast({
      title: "Avatar Downloaded",
      description: `Avatar ${index + 1} has been saved to your device`
    });
  };

  const enhanceAvatar = (avatarUrl: string) => {
    toast({
      title: "Enhancement Started",
      description: "Your avatar is being enhanced with AI"
    });
    // In real app, this would enhance the avatar using AI
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
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">AI Avatar/Character Generator</h1>
        <p className="text-muted-foreground mt-2">Create unique avatars and characters using advanced AI</p>
      </div>

      <Tabs defaultValue="prompt" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prompt">Text Prompt</TabsTrigger>
          <TabsTrigger value="settings">Detailed Settings</TabsTrigger>
          <TabsTrigger value="gallery">Generated Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Avatar from Description</CardTitle>
              <CardDescription>Describe your ideal avatar and let AI create it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt">Avatar Description</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your avatar in detail... e.g., 'A friendly cartoon character with blue hair and a warm smile'"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label>Quick Prompts</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {presetPrompts.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(preset)}
                      className="text-left justify-start h-auto p-3"
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={generateAvatar} 
                disabled={!prompt.trim() || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Avatars...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Avatars
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Avatar Settings</CardTitle>
              <CardDescription>Customize every aspect of your avatar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Gender</Label>
                  <Select value={avatarSettings.gender} onValueChange={(value) => 
                    setAvatarSettings(prev => ({ ...prev, gender: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Style</Label>
                  <Select value={avatarSettings.style} onValueChange={(value) => 
                    setAvatarSettings(prev => ({ ...prev, style: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="pixel">Pixel Art</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Expression</Label>
                  <Select value={avatarSettings.expression} onValueChange={(value) => 
                    setAvatarSettings(prev => ({ ...prev, expression: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="mysterious">Mysterious</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Hair Color</Label>
                  <Select value={avatarSettings.hairColor} onValueChange={(value) => 
                    setAvatarSettings(prev => ({ ...prev, hairColor: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="blonde">Blonde</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Eye Color</Label>
                  <Select value={avatarSettings.eyeColor} onValueChange={(value) => 
                    setAvatarSettings(prev => ({ ...prev, eyeColor: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="hazel">Hazel</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Clothing Style</Label>
                  <Select value={avatarSettings.clothing} onValueChange={(value) => 
                    setAvatarSettings(prev => ({ ...prev, clothing: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="sporty">Sporty</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="futuristic">Futuristic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Age: {avatarSettings.age} years</Label>
                <Slider
                  value={[avatarSettings.age]}
                  onValueChange={(value) => setAvatarSettings(prev => ({ ...prev, age: value[0] }))}
                  max={80}
                  min={18}
                  step={1}
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={generateFromSettings} 
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Generate from Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          {generatedAvatars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {generatedAvatars.map((avatar, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                    <img 
                      src={avatar} 
                      alt={`Generated Avatar ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">Avatar {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadAvatar(avatar, index)}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => enhanceAvatar(avatar)}
                        className="flex-1"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Enhance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Avatars Generated Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Use the Text Prompt or Detailed Settings tabs to generate your first avatar
                </p>
                <Button onClick={() => document.querySelector('[value="prompt"]')?.click()}>
                  Start Creating
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {isGenerating && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <RefreshCw className="h-6 w-6 animate-spin text-primary" />
              <div>
                <p className="font-medium">Generating your avatars...</p>
                <p className="text-sm text-muted-foreground">This may take a few moments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AvatarGenerator;
