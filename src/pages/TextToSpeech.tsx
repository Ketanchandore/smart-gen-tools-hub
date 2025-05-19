
import React, { useState, useRef } from 'react';
import { Headphones, Volume2, Play, Pause, RotateCcw, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState('en-US-Standard-A');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [availableVoices, setAvailableVoices] = useState([
    { name: 'US English Female', value: 'en-US-Standard-A' },
    { name: 'US English Male', value: 'en-US-Standard-B' },
    { name: 'UK English Female', value: 'en-GB-Standard-A' },
    { name: 'UK English Male', value: 'en-GB-Standard-B' },
    { name: 'Indian English Female', value: 'en-IN-Standard-A' },
    { name: 'Indian English Male', value: 'en-IN-Standard-B' },
    { name: 'Australian Female', value: 'en-AU-Standard-A' }
  ]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePlay = () => {
    if (!text) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to convert to speech",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would call a text-to-speech API
    // For this demo, we'll use the browser's built-in speech synthesis API
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      utterance.volume = volume[0];
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to match the selected voice or use the first one
        const selectedVoice = voices.find(v => v.name.includes(voice.split('-')[0]));
        if (selectedVoice) utterance.voice = selectedVoice;
      }
      
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support speech synthesis",
        variant: "destructive",
      });
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setText('');
    setRate([1]);
    setPitch([1]);
    setVolume([1]);
    setVoice('en-US-Standard-A');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleDownload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The download feature will be available in the next update",
    });
  };

  // For demo purposes - in a real app this would save the audio to a file
  const handleSaveAudio = () => {
    if (text) {
      toast({
        title: "Audio Saved",
        description: "Your speech has been saved to your library",
      });
    } else {
      toast({
        title: "Error",
        description: "Please generate speech first",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Text to Speech Converter</h1>
        <p className="text-muted-foreground">Convert your text to natural sounding speech with advanced AI voices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Text Input
              </CardTitle>
              <CardDescription>
                Enter the text you want to convert to speech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type or paste your text here..."
                className="min-h-[200px] mb-4"
                value={text}
                onChange={handleTextChange}
              />
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="default" 
                  className="flex-1" 
                  onClick={isPlaying ? handleStop : handlePlay}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Play
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Voice Settings
              </CardTitle>
              <CardDescription>
                Customize how your text sounds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="voice">Voice</Label>
                <Select onValueChange={setVoice} defaultValue={voice}>
                  <SelectTrigger id="voice">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableVoices.map((v) => (
                        <SelectItem key={v.value} value={v.value}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Speed: {rate[0]}x</Label>
                  </div>
                  <Slider
                    value={rate}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={setRate}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Pitch: {pitch[0]}</Label>
                  </div>
                  <Slider
                    value={pitch}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={setPitch}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Volume: {Math.round(volume[0] * 100)}%</Label>
                  </div>
                  <Slider
                    value={volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={setVolume}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audio element for playing the generated speech */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default TextToSpeech;
