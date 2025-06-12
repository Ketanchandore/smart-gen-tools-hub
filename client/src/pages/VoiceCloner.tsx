
import React, { useState } from 'react';
import { Mic, Upload, Play, Pause, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

const VoiceCloner = () => {
  const { toast } = useToast();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<'inactive' | 'recording'>('inactive');
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState([1]);
  const [speed, setSpeed] = useState([1]);
  const [text, setText] = useState('');
  const [clonedAudioURL, setClonedAudioURL] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        toast({
          title: "Audio uploaded",
          description: `File "${file.name}" has been selected`,
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

  const startRecording = () => {
    setRecordingStatus('recording');
    toast({
      title: "Recording started",
      description: "Speak now to record your voice sample.",
    });
    
    // In a real app, we would use the MediaRecorder API here
    // Simulating recording for demo purposes
    setTimeout(() => {
      setRecordingStatus('inactive');
      setAudioFile(new File([], "recorded-sample.mp3"));
      toast({
        title: "Recording complete",
        description: "Your voice sample has been recorded.",
      });
    }, 3000);
  };

  const stopRecording = () => {
    setRecordingStatus('inactive');
    toast({
      title: "Recording stopped",
      description: "Your voice sample has been saved.",
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real app, we would control audio playback here
    if (!isPlaying) {
      toast({
        title: "Playback started",
        description: "Playing the cloned voice sample.",
      });
      // Simulate playback ending after 5 seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    } else {
      toast({
        title: "Playback stopped",
        description: "Stopped playing the cloned voice sample.",
      });
    }
  };

  const handleClone = () => {
    if (!audioFile && text.trim() === '') {
      toast({
        variant: "destructive",
        title: "Missing inputs",
        description: "Please provide an audio sample and text to synthesize.",
      });
      return;
    }

    toast({
      title: "Processing",
      description: "Cloning your voice...",
    });

    // Simulate processing delay
    setTimeout(() => {
      // In a real implementation, we would send the data to an API
      // and get back a URL to the cloned audio
      setClonedAudioURL('data:audio/mp3;base64,DUMMY_BASE64_DATA');
      toast({
        title: "Success!",
        description: "Your voice has been cloned successfully.",
      });
    }, 3000);
  };

  const handleDownload = () => {
    // In a real app, this would download the actual audio file
    const link = document.createElement('a');
    link.href = clonedAudioURL || '';
    link.download = 'cloned-voice.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your cloned voice is being downloaded.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Voice Cloner</h1>
        <p className="text-muted-foreground mb-8">Clone voices using advanced AI technology</p>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Voice Sample</CardTitle>
            <CardDescription>Provide a voice sample to clone</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="record">Record</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
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
                      MP3, WAV or M4A (max. 2MB)
                    </span>
                  </Label>
                </div>
              </TabsContent>
              <TabsContent value="record">
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Record a clear voice sample by pressing the button below
                    </p>
                    <Button
                      variant={recordingStatus === 'recording' ? "destructive" : "default"}
                      size="lg"
                      className="h-20 w-20 rounded-full"
                      onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
                    >
                      <Mic className={`h-8 w-8 ${recordingStatus === 'recording' ? 'animate-pulse' : ''}`} />
                    </Button>
                    <p className="mt-4 font-medium">
                      {recordingStatus === 'recording' ? 'Recording... (Click to stop)' : 'Click to start recording'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Text to Speak</CardTitle>
            <CardDescription>Enter the text you want the cloned voice to speak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="text">Text</Label>
                <Textarea
                  id="text"
                  placeholder="Type or paste the text you want to be spoken..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>Adjust voice properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Pitch: {pitch[0]}x</Label>
              </div>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={pitch}
                onValueChange={setPitch}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Speed: {speed[0]}x</Label>
              </div>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={speed}
                onValueChange={setSpeed}
              />
            </div>

            <Button 
              onClick={handleClone} 
              className="w-full"
              disabled={!audioFile && activeTab === 'upload' && text.trim() === ''}
            >
              Generate Cloned Voice
            </Button>
          </CardContent>
        </Card>

        {clonedAudioURL && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Your cloned voice is ready</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
              
              <div className="mt-4 flex justify-end">
                <Button onClick={handleDownload} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default VoiceCloner;
