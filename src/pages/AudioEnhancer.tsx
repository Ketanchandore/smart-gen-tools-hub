
import React, { useState } from 'react';
import { Music, Upload, Play, Pause, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const AudioEnhancer = () => {
  const { toast } = useToast();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [processedAudioURL, setProcessedAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // Enhancement settings
  const [noiseReduction, setNoiseReduction] = useState([70]);
  const [clarity, setClarity] = useState([50]);
  const [bass, setBass] = useState([50]);
  const [treble, setTreble] = useState([50]);
  const [removeBackground, setRemoveBackground] = useState(true);
  const [enhanceVocals, setEnhanceVocals] = useState(true);
  const [optimizeForMusic, setOptimizeForMusic] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setProcessedAudioURL(null);
        toast({
          title: "Audio uploaded",
          description: `File "${file.name}" has been selected.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an audio file.",
        });
      }
    }
  };

  const handleEnhanceAudio = () => {
    if (!audioFile) {
      toast({
        variant: "destructive",
        title: "No audio file",
        description: "Please upload an audio file first.",
      });
      return;
    }

    setIsEnhancing(true);
    toast({
      title: "Enhancing audio",
      description: "This may take a moment...",
    });

    // Simulate processing time
    setTimeout(() => {
      // In a real implementation, we would send the file to a backend API
      // that would process the audio using AI algorithms
      setProcessedAudioURL('data:audio/mp3;base64,DUMMY_BASE64_DATA');
      setIsEnhancing(false);
      toast({
        title: "Enhancement complete",
        description: "Your audio has been successfully enhanced.",
      });
    }, 3000);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real app, we would control audio playback here
    if (!isPlaying) {
      toast({
        title: "Playback started",
        description: "Playing the enhanced audio.",
      });
      // Simulate playback ending after 5 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    } else {
      toast({
        title: "Playback stopped",
      });
    }
  };

  const handleDownload = () => {
    // In a real app, this would download the actual enhanced audio file
    const link = document.createElement('a');
    link.href = processedAudioURL || '';
    link.download = 'enhanced-audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your enhanced audio is being downloaded.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Audio Enhancer</h1>
        <p className="text-muted-foreground mb-8">Enhance audio quality with background noise removal</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upload Audio</CardTitle>
                <CardDescription>Select the audio file you want to enhance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <input 
                    type="file" 
                    accept="audio/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="audio-upload"
                  />
                  <Label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {audioFile ? audioFile.name : 'Click to upload or drop audio file here'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      MP3, WAV or M4A (max. 10MB)
                    </span>
                  </Label>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button 
                    onClick={handleEnhanceAudio} 
                    disabled={!audioFile || isEnhancing} 
                    className="bg-primary"
                  >
                    {isEnhancing ? 'Enhancing...' : 'Enhance Audio'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {processedAudioURL && (
              <Card>
                <CardHeader>
                  <CardTitle>Enhanced Audio</CardTitle>
                  <CardDescription>Listen to your enhanced audio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/30 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlayback}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: isPlaying ? '60%' : '0%', transition: 'width 5s linear' }}
                        ></div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Before vs After Comparison</h3>
                    <div className="bg-muted p-3 rounded-md grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Original</p>
                        <div className="h-24 bg-secondary/50 rounded-md">
                          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                            <path 
                              d="M 0,25 Q 12,35 25,25 T 50,25 T 75,25 T 100,25" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1" 
                              className="text-primary/50"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Enhanced</p>
                        <div className="h-24 bg-secondary/50 rounded-md">
                          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                            <path 
                              d="M 0,25 Q 12,5 25,25 T 50,15 T 75,35 T 100,25" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1" 
                              className="text-primary"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full flex items-center justify-center gap-2" 
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                      Download Enhanced Audio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Enhancement Settings
                </CardTitle>
                <CardDescription>Adjust audio enhancement options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Noise Reduction: {noiseReduction[0]}%</Label>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={noiseReduction}
                    onValueChange={setNoiseReduction}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Clarity: {clarity[0]}%</Label>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={clarity}
                    onValueChange={setClarity}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Bass: {bass[0]}%</Label>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={bass}
                    onValueChange={setBass}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Treble: {treble[0]}%</Label>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={treble}
                    onValueChange={setTreble}
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="remove-background">Remove Background Noise</Label>
                    <Switch
                      id="remove-background"
                      checked={removeBackground}
                      onCheckedChange={setRemoveBackground}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="enhance-vocals">Enhance Vocals</Label>
                    <Switch
                      id="enhance-vocals"
                      checked={enhanceVocals}
                      onCheckedChange={setEnhanceVocals}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="optimize-music">Optimize for Music</Label>
                    <Switch
                      id="optimize-music"
                      checked={optimizeForMusic}
                      onCheckedChange={setOptimizeForMusic}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setNoiseReduction([70]);
                      setClarity([50]);
                      setBass([50]);
                      setTreble([50]);
                      setRemoveBackground(true);
                      setEnhanceVocals(true);
                      setOptimizeForMusic(false);
                    }}
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudioEnhancer;
