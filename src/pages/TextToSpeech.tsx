
import React, { useState } from 'react';
import { ArrowLeft, Play, Square, Save, Copy, Volume2, VolumeX, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea as UITextarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Voice {
  id: string;
  name: string;
  preview?: string;
}

const TextToSpeech = () => {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [voice, setVoice] = useState("Rachel");
  const [voiceId, setVoiceId] = useState("21m00Tcm4TlvDq8ikWAM");
  const [isPlaying, setIsPlaying] = useState(false);
  const [stability, setStability] = useState([80]);
  const [clarity, setClarity] = useState([75]);
  const [apiKey, setApiKey] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  
  // Voice options (some popular ElevenLabs voices)
  const voices: Voice[] = [
    { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
    { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi" },
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
    { id: "ErXwobaYiN019PkySvjV", name: "Antoni" },
    { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli" },
    { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh" },
    { id: "VR6AewLTigWG4xSOukaG", name: "Arnold" },
    { id: "pNInz6obpgDQGcFmaJgB", name: "Adam" },
    { id: "yoZ06aMxZJJ28mfd3POQ", name: "Sam" }
  ];

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Function to generate speech
  const generateSpeech = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key to generate speech.",
        variant: "destructive"
      });
      return;
    }
    
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text to convert to speech.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // This would be a real API call in a production environment
      // For this example, we'll use a public API that returns mock audio
      // In real implementation, we would use the ElevenLabs API:

      /*
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: stability[0] / 100,
              similarity_boost: clarity[0] / 100,
            },
          }),
        }
      );
      */

      // For demo purposes, we'll use a publicly available audio file
      const response = await fetch('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setAudioUrl(url);
      setAudioBlob(blob);
      
      if (audioRef.current) {
        audioRef.current.src = url;
      }
      
      toast({
        title: "Speech Generated",
        description: "Your text has been converted to speech successfully.",
      });
      
    } catch (error) {
      console.error("Error generating speech:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your speech.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Play/pause audio
  const togglePlayback = () => {
    if (!audioUrl) {
      generateSpeech();
      return;
    }
    
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Stop audio playback
  const stopPlayback = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  // Download audio
  const downloadAudio = () => {
    if (!audioBlob) {
      toast({
        title: "No Audio Available",
        description: "Please generate audio first.",
        variant: "destructive"
      });
      return;
    }
    
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tts_${voice.replace(" ", "_").toLowerCase()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your audio file is being downloaded.",
    });
  };

  // Copy audio to clipboard (not all browsers support this)
  const copyAudio = async () => {
    if (!audioBlob) {
      toast({
        title: "No Audio Available",
        description: "Please generate audio first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const clipboardItem = new ClipboardItem({
        [audioBlob.type]: audioBlob,
      });
      await navigator.clipboard.write([clipboardItem]);
      
      toast({
        title: "Copied to Clipboard",
        description: "Audio has been copied to clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy audio:", err);
      toast({
        title: "Copy Failed",
        description: "This browser doesn't support copying audio to clipboard.",
        variant: "destructive"
      });
    }
  };

  // Handle audio ended event
  const handleAudioEnded = () => {
    setIsPlaying(false);
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
          <Volume2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Text to Speech</h1>
        <p className="text-muted-foreground mt-2">Convert any text to natural-sounding speech using AI voices</p>
      </div>

      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        className="hidden"
      />

      <Card className="p-6 bg-card">
        <div className="mb-6">
          <Label htmlFor="api-key">ElevenLabs API Key</Label>
          <div className="flex gap-2 mt-1">
            <Input 
              id="api-key"
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              placeholder="Enter your ElevenLabs API key"
              className="font-mono"
            />
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Settings className="h-4 w-4 mr-2" />
              API Settings
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Don't have an API key? <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-primary">Create a free account</a>
          </p>
        </div>
      
        <Tabs defaultValue="text">
          <TabsList className="mb-4">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="ssml">SSML (Pro)</TabsTrigger>
            <TabsTrigger value="document">Document (Pro)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text">
            <UITextarea
              placeholder="Enter text to convert to speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-40 resize-none"
            />
          </TabsContent>
          
          <TabsContent value="ssml">
            <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-muted/30">
              <Lock className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">SSML support is available in the Pro plan</p>
              <Button variant="outline" size="sm" className="mt-2">
                Upgrade to Pro
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="document">
            <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-muted/30">
              <Lock className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Document upload is available in the Pro plan</p>
              <Button variant="outline" size="sm" className="mt-2">
                Upgrade to Pro
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label htmlFor="voice-select">Voice</Label>
            <Select value={voiceId} onValueChange={(value) => {
              setVoiceId(value);
              const selectedVoice = voices.find(v => v.id === value);
              if (selectedVoice) setVoice(selectedVoice.name);
            }}>
              <SelectTrigger id="voice-select" className="mt-1">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Voice Settings</Label>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stability">Stability: {stability[0]}%</Label>
                </div>
                <Slider 
                  id="stability"
                  value={stability} 
                  onValueChange={setStability} 
                  min={0} 
                  max={100} 
                  step={1}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="clarity">Clarity & Similarity: {clarity[0]}%</Label>
                </div>
                <Slider 
                  id="clarity"
                  value={clarity} 
                  onValueChange={setClarity} 
                  min={0} 
                  max={100} 
                  step={1}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={togglePlayback}
              className="flex items-center gap-2 min-w-[120px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : isPlaying ? (
                <>
                  <Square className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  {audioUrl ? 'Play' : 'Generate'}
                </>
              )}
            </Button>
            
            {audioUrl && (
              <>
                <Button
                  variant="outline"
                  onClick={stopPlayback}
                  className="flex items-center gap-2"
                  disabled={!isPlaying}
                >
                  <Square className="h-4 w-4" />
                  Stop
                </Button>
                
                <Button
                  variant="outline"
                  onClick={downloadAudio}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Download
                </Button>
                
                <Button
                  variant="outline"
                  onClick={copyAudio}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Need More Voice Options?</h2>
        <p className="text-muted-foreground mb-4">Upgrade to Pro for access to all 100+ premium voices, longer text limits, and more!</p>
        <Button>Upgrade to Pro</Button>
      </div>
    </div>
  );
};

// Missing Lucide components
const Lock = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default TextToSpeech;
