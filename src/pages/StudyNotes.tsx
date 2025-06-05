
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Wand2, Download, Copy, BookMarked, FileText, ListChecks, Brain, PenTool, Sparkles, BarChart, HeartPulse, Check, RefreshCw, FlaskConical, BookCopy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface StudyNotes {
  summary: string;
  keyPoints: string[];
  vocabulary: Array<{ term: string; definition: string }>;
  questions: string[];
  examples: string[];
  connections: string[];
  mindMap: string;
}

const StudyNotes = () => {
  const navigate = useNavigate();
  
  const [inputText, setInputText] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [studyNotes, setStudyNotes] = useState<StudyNotes | null>(null);
  const [studyLevel, setStudyLevel] = useState('college');
  const [noteStyle, setNoteStyle] = useState('comprehensive');
  
  const [includeExamples, setIncludeExamples] = useState(true);
  const [includeQuestions, setIncludeQuestions] = useState(true);
  const [includeVocabulary, setIncludeVocabulary] = useState(true);
  
  const studyLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'college', label: 'College/University' },
    { value: 'graduate', label: 'Graduate/Professional' },
    { value: 'elementary', label: 'Elementary School' },
    { value: 'middle-school', label: 'Middle School' }
  ];

  const noteStyles = [
    { value: 'comprehensive', label: 'Comprehensive', icon: <BookMarked className="h-4 w-4" /> },
    { value: 'concise', label: 'Concise', icon: <FileText className="h-4 w-4" /> },
    { value: 'exam-prep', label: 'Exam Prep', icon: <ListChecks className="h-4 w-4" /> },
    { value: 'conceptual', label: 'Conceptual', icon: <Brain className="h-4 w-4" /> },
    { value: 'creative', label: 'Creative', icon: <PenTool className="h-4 w-4" /> }
  ];

  const subjects = [
    'Biology', 'Chemistry', 'Physics', 'Mathematics', 'History',
    'Literature', 'Computer Science', 'Psychology', 'Economics', 
    'Business', 'Philosophy', 'Political Science', 'Sociology',
    'Art History', 'Engineering', 'Environmental Science', 'Law',
    'Medicine', 'Music Theory', 'Religious Studies'
  ];

  const getSampleText = () => {
    return `# Introduction to Photosynthesis

Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. These sugars are stored for future use, providing the energy needed for the organism to function.

## Light-Dependent Reactions

The light-dependent reactions take place in the thylakoid membrane of the chloroplast. These reactions convert light energy into chemical energy in the form of ATP and NADPH. Here's how it works:

1. Photons of light strike chlorophyll molecules in photosystems II and I, exciting electrons.
2. These excited electrons leave the chlorophyll and pass through an electron transport chain.
3. As electrons flow through the transport chain, they generate energy used to pump protons across the thylakoid membrane, creating a concentration gradient.
4. The flow of protons back across the membrane through ATP synthase generates ATP.
5. At photosystem I, excited electrons are used to reduce NADP+ to NADPH.
6. To replace the electrons that leave chlorophyll, water molecules are split, releasing oxygen as a byproduct.

## Calvin Cycle (Light-Independent Reactions)

The Calvin cycle takes place in the stroma of the chloroplast and uses the energy products from the light-dependent reactions (ATP and NADPH) to convert carbon dioxide into glucose. This cycle consists of three main stages:

1. Carbon fixation: Carbon dioxide is attached to a 5-carbon sugar called ribulose bisphosphate (RuBP) by the enzyme RuBisCO, forming a 6-carbon compound that immediately splits into two 3-carbon molecules of 3-phosphoglyceric acid (3-PGA).

2. Reduction: 3-PGA is converted to glyceraldehyde 3-phosphate (G3P) using energy from ATP and NADPH. Some G3P molecules exit the cycle to form glucose and other carbohydrates.

3. Regeneration: The remaining G3P molecules are reorganized to regenerate RuBP, enabling the cycle to continue.

## Factors Affecting Photosynthesis

Several environmental and internal factors can affect the rate of photosynthesis:

- Light intensity: Increasing light intensity increases the rate of photosynthesis until another factor becomes limiting.
- Carbon dioxide concentration: Higher CO2 levels generally increase photosynthesis rates until saturation.
- Temperature: Photosynthesis rates increase with temperature up to an optimum, then decrease as enzymes denature.
- Water availability: Drought stress can reduce photosynthesis by causing stomatal closure, limiting CO2 uptake.
- Chlorophyll content: More chlorophyll generally means more light can be absorbed.

## Importance of Photosynthesis

Photosynthesis is crucial for life on Earth for several reasons:

- It produces oxygen needed by most living organisms for respiration.
- It converts inorganic carbon (CO2) into organic compounds, forming the base of food chains.
- It helps regulate atmospheric CO2 levels, playing a role in climate regulation.
- The fossil fuels we use today are derived from ancient photosynthetic organisms.

## Adaptations for Photosynthesis

Different plants have evolved various adaptations to optimize photosynthesis in their specific environments:

- C4 plants (like corn and sugarcane) have special anatomy and biochemistry to concentrate CO2 around RuBisCO, reducing photorespiration in hot, dry environments.
- CAM plants (like cacti and pineapples) open their stomata at night to collect CO2, storing it as organic acids until daylight when photosynthesis can occur with closed stomata, conserving water.
- Shade plants have more chlorophyll per reaction center to capture limited light more efficiently.`;
  };

  const generateNotes = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text content first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate study notes based on input text and preferences
      const notes = processTextToNotes();
      setStudyNotes(notes);
      
      toast({
        title: "Study Notes Generated!",
        description: "Your notes are ready to review and download."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate study notes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const processTextToNotes = (): StudyNotes => {
    // This would ideally use an AI model for real processing
    // For demo purposes, we'll generate mock study notes
    
    // Extract heading/title if present
    const lines = inputText.split('\n');
    let topicTitle = "";
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        topicTitle = line.replace('# ', '');
        break;
      }
    }
    
    if (!topicTitle && subject) {
      topicTitle = subject;
    } else if (!topicTitle) {
      topicTitle = "Study Topic";
    }
    
    // Sample responses based on the study style and level
    const summaryByStyle: {[key: string]: string} = {
      'comprehensive': `${topicTitle} is a fundamental process in plant biology where light energy is converted into chemical energy. The process occurs in two main stages: the light-dependent reactions, which take place in the thylakoid membrane and produce ATP and NADPH, and the Calvin cycle (light-independent reactions), which uses these energy carriers to convert CO2 into glucose. Photosynthesis is vital for producing oxygen, forming the base of food chains, and regulating atmospheric carbon dioxide.`,
      
      'concise': `${topicTitle}: Process where plants convert light energy into chemical energy (glucose). Two stages: (1) Light-dependent reactions produce ATP and NADPH in thylakoid membrane; (2) Calvin cycle uses these to fix CO2 into glucose in the stroma. Produces oxygen as byproduct. Affected by light, CO2, temperature, and water.`,
      
      'exam-prep': `${topicTitle} SUMMARY: Plant process converting light → chemical energy (glucose). KEY COMPONENTS: Chloroplasts (thylakoid membrane + stroma), chlorophyll, ATP, NADPH, RuBisCO. EQUATION: 6CO2 + 6H2O + light → C6H12O6 + 6O2. STAGES: Light-dependent reactions (thylakoid) → ATP + NADPH; Calvin cycle (stroma) → glucose. LIMITING FACTORS: Light intensity, CO2 concentration, temperature, water.`,
      
      'conceptual': `${topicTitle} represents a beautiful energy transformation system where plants harness the sun's energy and convert it into a form that sustains nearly all life. Think of it as a solar power plant: the light reactions are like solar panels capturing energy, while the Calvin cycle is the battery storage system converting and storing that energy as sugar. This system bridges the inorganic and organic worlds, turning sunlight, water, and air into the food that powers the biosphere.`,
      
      'creative': `THE SOLAR-POWERED SUGAR FACTORY: Welcome to ${topicTitle}, nature's ingenious way of turning sunshine into snacks! Imagine tiny green factories (chloroplasts) with two departments: the Light Team (working in thylakoid membranes) captures sunlight and produces energy currencies (ATP and NADPH), while the Calvin Crew uses these currencies to buy carbon from the air and build sugary treats in the stroma lounge. The factory exhales oxygen as a bonus gift to animals! This solar-powered magic happens billions of times daily, fueling our entire planet.`
    };
    
    // Generate mock vocabulary based on the text
    let vocabulary: Array<{ term: string; definition: string }> = [];
    
    if (includeVocabulary) {
      vocabulary = [
        { term: "Photosynthesis", definition: "Process where plants convert light energy into chemical energy in the form of glucose" },
        { term: "Chloroplast", definition: "Plant organelle where photosynthesis takes place, containing thylakoids and stroma" },
        { term: "Thylakoid", definition: "Membrane-bound compartment inside chloroplasts where light-dependent reactions occur" },
        { term: "Stroma", definition: "Fluid-filled space inside chloroplasts where the Calvin cycle takes place" },
        { term: "ATP", definition: "Adenosine triphosphate; energy currency molecule produced during light-dependent reactions" },
        { term: "NADPH", definition: "Nicotinamide adenine dinucleotide phosphate; electron carrier produced during light-dependent reactions" },
        { term: "RuBisCO", definition: "Enzyme that catalyzes carbon fixation in the Calvin cycle" },
        { term: "Carbon fixation", definition: "Process of converting inorganic carbon (CO₂) into organic compounds" },
        { term: "Calvin cycle", definition: "Series of light-independent reactions that use ATP and NADPH to convert CO₂ into glucose" }
      ];
    }
    
    // Generate questions based on style and level
    let questions: string[] = [];
    
    if (includeQuestions) {
      if (noteStyle === 'exam-prep') {
        questions = [
          "Describe the two main stages of photosynthesis and where they occur in the chloroplast.",
          "Compare and contrast C3, C4, and CAM photosynthesis pathways.",
          "What role does water play in the light-dependent reactions?",
          "Explain how the products of the light-dependent reactions are used in the Calvin cycle.",
          "How do environmental factors limit the rate of photosynthesis?",
          "Calculate the number of ATP and NADPH molecules required to produce one molecule of glucose.",
          "Evaluate the ecological significance of photosynthesis in global carbon cycling."
        ];
      } else if (studyLevel === 'graduate') {
        questions = [
          "Analyze the evolutionary adaptations of photosynthetic mechanisms across different plant taxa.",
          "Evaluate current research on improving photosynthetic efficiency for agricultural applications.",
          "How might climate change alter the balance between photosynthesis and respiration in ecosystems?",
          "Discuss the molecular mechanisms of photoprotection during high light stress.",
          "Compare the regulatory mechanisms controlling the expression of photosynthetic genes."
        ];
      } else {
        questions = [
          "What are the main products of the light-dependent reactions?",
          "Describe the role of chlorophyll in photosynthesis.",
          "Why is photosynthesis important for life on Earth?",
          "What happens during the Calvin cycle?",
          "How do environmental factors affect the rate of photosynthesis?"
        ];
      }
    }
    
    // Generate examples based on level
    let examples: string[] = [];
    
    if (includeExamples) {
      if (studyLevel === 'elementary' || studyLevel === 'middle-school') {
        examples = [
          "When you place a plant in sunlight, it uses that light to make its own food.",
          "The oxygen we breathe comes from plants splitting water during photosynthesis.",
          "Plants look green because chlorophyll reflects green light while absorbing other colors."
        ];
      } else {
        examples = [
          "A corn plant (C4) can continue efficient photosynthesis even on hot, dry days because its specialized leaf anatomy concentrates CO2 around RuBisCO.",
          "A cactus in the desert performs photosynthesis at night via CAM metabolism to conserve water.",
          "Underwater seagrasses have adapted to use the blue-green wavelengths that penetrate water most effectively.",
          "The seasonal variation in atmospheric CO2 levels is driven by differences in photosynthetic activity between summer and winter."
        ];
      }
    }
    
    return {
      summary: summaryByStyle[noteStyle] || summaryByStyle.comprehensive,
      keyPoints: [
        "Photosynthesis converts light energy into chemical energy (glucose)",
        "The process occurs in chloroplasts, within thylakoid membranes and stroma",
        "Light-dependent reactions produce ATP, NADPH, and oxygen from water",
        "The Calvin cycle uses ATP and NADPH to fix CO2 into glucose",
        "Environmental factors like light intensity, CO2 concentration, temperature, and water affect rates",
        "Adaptations like C4 and CAM pathways help plants photosynthesize in challenging environments"
      ],
      vocabulary,
      questions,
      examples,
      connections: [
        "Photosynthesis links to cellular respiration, which uses the glucose produced to release energy",
        "The oxygen produced during photosynthesis enables aerobic respiration in most organisms",
        "Photosynthesis plays a key role in the carbon cycle, removing CO2 from the atmosphere",
        "Agricultural productivity and food security depend on optimizing photosynthetic efficiency",
        "Climate change may impact photosynthesis rates through altered temperatures and precipitation patterns"
      ],
      mindMap: `
PHOTOSYNTHESIS
├── LOCATION
│   └── Chloroplasts
│       ├── Thylakoid membrane
│       └── Stroma
│
├── REACTANTS
│   ├── Light energy
│   ├── Water (H₂O)
│   └── Carbon dioxide (CO₂)
│
├── PRODUCTS
│   ├── Glucose (C₆H₁₂O₆)
│   └── Oxygen (O₂)
│
├── STAGES
│   ├── Light-Dependent Reactions
│   │   ├── Photosystems I & II
│   │   ├── Electron Transport Chain
│   │   └── Products: ATP, NADPH, O₂
│   │
│   └── Calvin Cycle
│       ├── Carbon Fixation (RuBisCO)
│       ├── Reduction
│       └── Regeneration of RuBP
│
└── ADAPTATIONS
    ├── C3 Plants (Traditional)
    ├── C4 Plants (Hot environments)
    └── CAM Plants (Desert conditions)
      `
    };
  };

  const copySection = (sectionContent: string | string[] | Array<{ term: string; definition: string }>) => {
    let textToCopy = '';
    
    if (typeof sectionContent === 'string') {
      textToCopy = sectionContent;
    } else if (Array.isArray(sectionContent)) {
      if (typeof sectionContent[0] === 'string') {
        // Array of strings
        textToCopy = (sectionContent as string[]).join('\n\n');
      } else {
        // Array of term-definition objects
        textToCopy = (sectionContent as Array<{ term: string; definition: string }>)
          .map(item => `${item.term}: ${item.definition}`)
          .join('\n\n');
      }
    }
    
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to Clipboard",
      description: "Content copied to clipboard successfully."
    });
  };

  const downloadNotes = () => {
    if (!studyNotes) return;
    
    // Format content for download
    let content = `# Study Notes: ${subject || 'Study Topic'}\n\n`;
    
    // Summary
    content += `## Summary\n\n${studyNotes.summary}\n\n`;
    
    // Key Points
    content += '## Key Points\n\n';
    studyNotes.keyPoints.forEach(point => {
      content += `- ${point}\n`;
    });
    content += '\n';
    
    // Vocabulary
    if (studyNotes.vocabulary.length > 0) {
      content += '## Vocabulary\n\n';
      studyNotes.vocabulary.forEach(item => {
        content += `### ${item.term}\n${item.definition}\n\n`;
      });
    }
    
    // Questions
    if (studyNotes.questions.length > 0) {
      content += '## Study Questions\n\n';
      studyNotes.questions.forEach((question, index) => {
        content += `${index + 1}. ${question}\n`;
      });
      content += '\n';
    }
    
    // Examples
    if (studyNotes.examples.length > 0) {
      content += '## Examples\n\n';
      studyNotes.examples.forEach(example => {
        content += `- ${example}\n`;
      });
      content += '\n';
    }
    
    // Connections
    content += '## Connections\n\n';
    studyNotes.connections.forEach(connection => {
      content += `- ${connection}\n`;
    });
    content += '\n';
    
    // Mind Map
    content += '## Mind Map\n\n';
    content += '```\n' + studyNotes.mindMap + '\n```\n';
    
    // Create and trigger download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-notes-${subject.toLowerCase().replace(/\s+/g, '-') || 'topic'}.md`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Notes Downloaded",
      description: "Study notes saved as Markdown file."
    });
  };

  const refreshNotes = () => {
    setLoading(true);
    setTimeout(() => {
      const notes = processTextToNotes();
      setStudyNotes(notes);
      setLoading(false);
      
      toast({
        title: "Notes Refreshed",
        description: "Generated new study notes with the same content."
      });
    }, 1000);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
      </div>

      <div className="text-center mb-8">
        <div className="mx-auto bg-gradient-to-r from-green-500 to-blue-600 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Smart Study Notes Maker</h1>
        <p className="text-xl text-muted-foreground">
          Turn any text into organized study materials with key points, questions, and more
        </p>
      </div>

      {!studyNotes ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5" />
                  Input Text
                </CardTitle>
                <CardDescription>
                  Paste lecture notes, book chapters, articles, or any educational content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject/Topic</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or type a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj} value={subj}>
                            {subj}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="study-level">Study Level</Label>
                    <Select value={studyLevel} onValueChange={setStudyLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {studyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="study-content">Content</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => setInputText(getSampleText())}
                    >
                      Use Sample Text
                    </Button>
                  </div>
                  <Textarea
                    id="study-content"
                    placeholder="Paste your text content here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>

                <Button 
                  onClick={generateNotes}
                  disabled={loading || !inputText.trim()}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Notes...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Study Notes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Options Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Study Note Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">Note Style</Label>
                  <div className="space-y-2">
                    {noteStyles.map((style) => (
                      <Button
                        key={style.value}
                        variant={noteStyle === style.value ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setNoteStyle(style.value)}
                      >
                        <div className="flex items-center">
                          {style.icon}
                          <span className="ml-2">{style.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Include Examples
                    </Label>
                    <Switch
                      checked={includeExamples}
                      onCheckedChange={setIncludeExamples}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />
                      Include Vocabulary
                    </Label>
                    <Switch
                      checked={includeVocabulary}
                      onCheckedChange={setIncludeVocabulary}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      Include Questions
                    </Label>
                    <Switch
                      checked={includeQuestions}
                      onCheckedChange={setIncludeQuestions}
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Tips for Better Results:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Include clear headings and subheadings</li>
                    <li>• Provide sufficient context about the subject</li>
                    <li>• Use outline format for better organization</li>
                    <li>• Include technical terms for vocabulary extraction</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <FlaskConical className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Smart Processing</h3>
                    <p className="text-sm text-muted-foreground">Our AI identifies key concepts, extracts vocabulary, and creates connections across topics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Study Notes</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setStudyNotes(null)}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <a href="#summary">
                      <FileText className="h-4 w-4 mr-2" />
                      Summary
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <a href="#key-points">
                      <ListChecks className="h-4 w-4 mr-2" />
                      Key Points
                    </a>
                  </Button>
                  {includeVocabulary && studyNotes.vocabulary.length > 0 && (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <a href="#vocabulary">
                        <BookCopy className="h-4 w-4 mr-2" />
                        Vocabulary
                      </a>
                    </Button>
                  )}
                  {includeQuestions && studyNotes.questions.length > 0 && (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <a href="#questions">
                        <Brain className="h-4 w-4 mr-2" />
                        Questions
                      </a>
                    </Button>
                  )}
                  {includeExamples && studyNotes.examples.length > 0 && (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <a href="#examples">
                        <FlaskConical className="h-4 w-4 mr-2" />
                        Examples
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <a href="#connections">
                      <BarChart className="h-4 w-4 mr-2" />
                      Connections
                    </a>
                  </Button>
                </div>
              </CardContent>
              <div className="px-4 pb-4">
                <Button 
                  onClick={downloadNotes} 
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Notes
                </Button>
              </div>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Customize</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Note Style</Label>
                  <Select value={noteStyle} onValueChange={(value) => {
                    setNoteStyle(value);
                    refreshNotes();
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {noteStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div className="flex items-center">
                            {style.icon}
                            <span className="ml-2">{style.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={refreshNotes} 
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notes Content */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <Badge className="mb-2">{studyLevel === 'college' ? 'College' : studyLevel === 'high-school' ? 'High School' : studyLevel === 'graduate' ? 'Graduate' : studyLevel === 'elementary' ? 'Elementary' : 'Middle School'} Level</Badge>
                    <CardTitle className="text-2xl">{subject || 'Study Topic'}</CardTitle>
                    <CardDescription>
                      {noteStyle === 'comprehensive' ? 'Comprehensive study notes with detailed explanations' : 
                       noteStyle === 'concise' ? 'Concise notes focused on essential information' : 
                       noteStyle === 'exam-prep' ? 'Exam preparation notes with practice questions' : 
                       noteStyle === 'conceptual' ? 'Concept-focused notes highlighting connections and principles' : 
                       'Creative notes with analogies and memorable explanations'}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${noteStyle === 'comprehensive' ? 'border-blue-500 text-blue-500' : 
                              noteStyle === 'concise' ? 'border-green-500 text-green-500' : 
                              noteStyle === 'exam-prep' ? 'border-red-500 text-red-500' : 
                              noteStyle === 'conceptual' ? 'border-purple-500 text-purple-500' : 
                              'border-amber-500 text-amber-500'}`}
                  >
                    {noteStyle.charAt(0).toUpperCase() + noteStyle.slice(1)} Style
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Summary */}
                <div id="summary" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Summary
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copySection(studyNotes.summary)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p>{studyNotes.summary}</p>
                  </div>
                </div>

                {/* Key Points */}
                <div id="key-points" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <ListChecks className="h-5 w-5" />
                      Key Points
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copySection(studyNotes.keyPoints)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {studyNotes.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vocabulary */}
                {includeVocabulary && studyNotes.vocabulary.length > 0 && (
                  <div id="vocabulary" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <BookCopy className="h-5 w-5" />
                        Vocabulary
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copySection(studyNotes.vocabulary)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {studyNotes.vocabulary.map((item, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="font-medium">{item.term}</div>
                          <div className="text-sm text-muted-foreground">{item.definition}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Questions */}
                {includeQuestions && studyNotes.questions.length > 0 && (
                  <div id="questions" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Study Questions
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copySection(studyNotes.questions)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {studyNotes.questions.map((question, index) => (
                        <div key={index} className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex">
                            <span className="font-medium text-primary mr-2">{index + 1}.</span>
                            <span>{question}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                {includeExamples && studyNotes.examples.length > 0 && (
                  <div id="examples" className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FlaskConical className="h-5 w-5" />
                        Examples & Applications
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copySection(studyNotes.examples)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {studyNotes.examples.map((example, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="text-primary mt-1">•</div>
                          <p>{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connections */}
                <div id="connections" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Connections & Context
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copySection(studyNotes.connections)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {studyNotes.connections.map((connection, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="text-primary mt-1">•</div>
                        <p>{connection}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mind Map */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <PenTool className="h-5 w-5" />
                      Mind Map
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copySection(studyNotes.mindMap)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm font-mono whitespace-pre">{studyNotes.mindMap}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyNotes;
