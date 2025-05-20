
import React, { useState, useRef } from 'react';
import { Headphones, Play, Pause, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

type Voice = {
  name: string;
  gender: 'male' | 'female';
  accent?: string;
};

const voices: Voice[] = [
  { name: 'Matthew', gender: 'male', accent: 'American' },
  { name: 'Joanna', gender: 'female', accent: 'American' },
  { name: 'Emma', gender: 'female', accent: 'British' },
  { name: 'Brian', gender: 'male', accent: 'British' },
  { name: 'Aria', gender: 'female', accent: 'Australian' },
  { name: 'Takumi', gender: 'male', accent: 'Japanese' },
  { name: 'Lucia', gender: 'female', accent: 'Spanish' },
];

const TextToSpeech = () => {
  const [text, setText] = useState<string>('Hello! This is a demonstration of the text-to-speech capability. You can type any text here and listen to it being spoken by the selected voice.');
  const [selectedVoice, setSelectedVoice] = useState<string>('Matthew');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number[]>([80]);
  const [rate, setRate] = useState<number[]>([1]);
  const [pitch, setPitch] = useState<number[]>([1]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const handlePlay = () => {
    if ('speechSynthesis' in window) {
      // If already speaking, cancel it first
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesisRef.current = utterance;
      
      // Get available voices
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Try to find the requested voice, or use the default
      utterance.voice = availableVoices.find(voice => 
        voice.name.includes(selectedVoice)) || null;
      
      // Set speech parameters
      utterance.volume = volume[0] / 100;
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      
      // Handle speech events
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        toast({
          title: "Error",
          description: "There was a problem with speech synthesis",
          variant: "destructive"
        });
      };
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      toast({
        title: "Not Supported",
        description: "Speech synthesis is not supported in this browser",
        variant: "destructive"
      });
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.volume = newVolume[0] / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.volume = !isMuted ? 0 : volume[0] / 100;
    }
  };

  const handleVoiceChange = (value: string) => {
    setSelectedVoice(value);
    // If currently playing, restart with new voice
    if (isPlaying) {
      handleStop();
      setTimeout(() => handlePlay(), 100);
    }
  };

  // Make sure voices are loaded
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };

      loadVoices();
      
      // Chrome requires this event listener
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        if (isPlaying) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [isPlaying]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <Headphones className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Text to Speech</h1>
        <p className="text-muted-foreground max-w-2xl">
          Convert your text into natural-sounding speech with our AI voice generator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Enter Text</CardTitle>
              <CardDescription>Type or paste the text you want to convert to speech</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px] md:min-h-[300px]"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={isPlaying ? handleStop : handlePlay}
                    variant="default" 
                    className="bg-primary hover:bg-primary/90"
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
                    onClick={toggleMute}
                    variant="outline"
                    size="icon"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                <Button
                  onClick={() => setText('')}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Voice Settings</CardTitle>
              <CardDescription>Customize your speech output</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="voice">Voice</Label>
                <Select 
                  value={selectedVoice} 
                  onValueChange={handleVoiceChange}
                >
                  <SelectTrigger id="voice">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.gender}, {voice.accent})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Volume: {volume[0]}%</Label>
                </div>
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Speed: {rate[0].toFixed(1)}x</Label>
                </div>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Pitch: {pitch[0].toFixed(1)}</Label>
                </div>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>About Text to Speech</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-4">
            <p>
              Our Text to Speech tool converts written text into natural-sounding spoken audio. 
              This technology is useful for creating voiceovers, accessibility features, learning pronunciation, 
              and many other applications.
            </p>
            <p>
              You can adjust the voice, speed, pitch, and volume to customize the output to your preferences. 
              This tool uses the Web Speech API which is supported in most modern browsers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextToSpeech;
