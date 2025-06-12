
import React, { useState } from 'react';
import { Network, ArrowLeft, RefreshCw, Download, Copy, Plus, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';

interface MindMapNode {
  id: string;
  label: string;
  children: MindMapNode[];
}

const MindMap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [mindMap, setMindMap] = useState<MindMapNode | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  const generateMindMap = () => {
    if (!topic.trim()) {
      toast({
        title: 'Topic required',
        description: 'Please enter a main topic for your mind map',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setMindMap(null);
    setSvgContent('');

    // In a real implementation, you would call an AI API here
    // For this demo, we'll simulate a delay and generate a simple mind map
    setTimeout(() => {
      let rootNode: MindMapNode;

      if (content.trim()) {
        // Parse content if provided
        rootNode = parseContentToMindMap(topic, content);
      } else {
        // Generate a sample mind map if no content
        rootNode = generateSampleMindMap(topic);
      }

      setMindMap(rootNode);
      
      // Generate SVG representation
      const svg = generateMindMapSVG(rootNode);
      setSvgContent(svg);
      
      setLoading(false);
      toast({
        title: 'Mind Map Generated',
        description: 'Your mind map has been created successfully',
      });
    }, 2000);
  };

  const parseContentToMindMap = (mainTopic: string, text: string): MindMapNode => {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    const rootNode: MindMapNode = {
      id: 'root',
      label: mainTopic,
      children: []
    };

    let currentParent = rootNode;
    let currentLevel = 0;
    const parentStack: [MindMapNode, number][] = [[rootNode, 0]];

    for (const line of lines) {
      // Calculate indentation level (each 2 spaces = 1 level)
      const trimmedLine = line.trimStart();
      const indentCount = line.length - trimmedLine.length;
      const level = Math.floor(indentCount / 2);

      // Create new node
      const newNode: MindMapNode = {
        id: `node_${Math.random().toString(36).substr(2, 9)}`,
        label: trimmedLine,
        children: []
      };

      // Find correct parent based on indentation
      if (level > currentLevel) {
        // This is a child of the previous node
        parentStack.push([currentParent, currentLevel]);
        currentParent = parentStack[parentStack.length - 1][0].children[parentStack[parentStack.length - 1][0].children.length - 1];
      } else if (level < currentLevel) {
        // Go back up the hierarchy
        while (parentStack.length > 0 && level <= parentStack[parentStack.length - 1][1]) {
          const popped = parentStack.pop();
          if (popped) {
            currentParent = popped[0];
          }
        }
      }

      currentLevel = level;
      currentParent.children.push(newNode);
    }

    return rootNode;
  };

  const generateSampleMindMap = (mainTopic: string): MindMapNode => {
    // Create a sample mind map structure based on the topic
    const topics = {
      "marketing": {
        main: "Marketing Strategy",
        subtopics: [
          { name: "Digital Marketing", items: ["SEO", "Content Marketing", "Social Media", "Email Marketing"] },
          { name: "Traditional Marketing", items: ["Print Ads", "TV & Radio", "Direct Mail", "Events"] },
          { name: "Market Research", items: ["Customer Surveys", "Competitor Analysis", "Market Trends"] },
          { name: "Brand Development", items: ["Brand Identity", "Brand Messaging", "Visual Elements"] }
        ]
      },
      "business": {
        main: "Business Plan",
        subtopics: [
          { name: "Executive Summary", items: ["Vision", "Mission", "Objectives"] },
          { name: "Market Analysis", items: ["Target Market", "Industry Overview", "Competition"] },
          { name: "Financial Plan", items: ["Budget", "Projections", "Funding Requirements"] },
          { name: "Operations Plan", items: ["Processes", "Supply Chain", "Resources"] }
        ]
      },
      "education": {
        main: "Learning Strategy",
        subtopics: [
          { name: "Study Methods", items: ["Active Recall", "Spaced Repetition", "Mind Mapping", "Pomodoro Technique"] },
          { name: "Resources", items: ["Textbooks", "Online Courses", "Tutoring", "Practice Tests"] },
          { name: "Subject Areas", items: ["Math", "Science", "Languages", "Arts", "History"] },
          { name: "Assessment", items: ["Quizzes", "Projects", "Exams", "Self-Evaluation"] }
        ]
      },
      "technology": {
        main: "Technology Roadmap",
        subtopics: [
          { name: "Software Development", items: ["Frontend", "Backend", "Mobile Apps", "Testing"] },
          { name: "Infrastructure", items: ["Cloud Services", "Databases", "Security", "Networking"] },
          { name: "Emerging Tech", items: ["AI & ML", "IoT", "Blockchain", "VR/AR"] },
          { name: "Skills Development", items: ["Training", "Certification", "Mentoring"] }
        ]
      },
      "project": {
        main: "Project Management",
        subtopics: [
          { name: "Planning", items: ["Goals", "Timeline", "Resources", "Budget"] },
          { name: "Execution", items: ["Tasks", "Team Coordination", "Progress Tracking"] },
          { name: "Monitoring", items: ["KPIs", "Quality Control", "Risk Management"] },
          { name: "Closure", items: ["Evaluation", "Documentation", "Lessons Learned"] }
        ]
      },
    };

    // Determine which template to use based on the topic
    let template = topics.project; // Default template
    
    const lowerTopic = mainTopic.toLowerCase();
    if (lowerTopic.includes("market")) {
      template = topics.marketing;
    } else if (lowerTopic.includes("business") || lowerTopic.includes("startup")) {
      template = topics.business;
    } else if (lowerTopic.includes("education") || lowerTopic.includes("learn") || lowerTopic.includes("study")) {
      template = topics.education;
    } else if (lowerTopic.includes("tech") || lowerTopic.includes("software") || lowerTopic.includes("development")) {
      template = topics.technology;
    } else if (lowerTopic.includes("project") || lowerTopic.includes("management")) {
      template = topics.project;
    }

    // Create mind map structure
    const rootNode: MindMapNode = {
      id: 'root',
      label: mainTopic,
      children: []
    };

    // Add subtopics
    template.subtopics.forEach((subtopic, index) => {
      const subtopicNode: MindMapNode = {
        id: `subtopic_${index}`,
        label: subtopic.name,
        children: []
      };

      // Add items under each subtopic
      subtopic.items.forEach((item, itemIndex) => {
        subtopicNode.children.push({
          id: `item_${index}_${itemIndex}`,
          label: item,
          children: []
        });
      });

      rootNode.children.push(subtopicNode);
    });

    return rootNode;
  };

  const generateMindMapSVG = (node: MindMapNode): string => {
    // This is a simplified SVG generation for mind maps
    // A real implementation would use a proper visualization library
    const width = 1000;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="100%" height="100%" fill="#f8f9fa" />`;
    
    // Draw the root node
    svg += `<g>`;
    svg += `<ellipse cx="${centerX}" cy="${centerY}" rx="100" ry="40" fill="#4f46e5" />`;
    svg += `<text x="${centerX}" y="${centerY}" font-family="Arial" font-size="14px" fill="white" text-anchor="middle" dominant-baseline="middle">${node.label}</text>`;
    svg += `</g>`;
    
    // Draw the first-level nodes
    const angleStep = (2 * Math.PI) / node.children.length;
    const radius = 180;
    
    node.children.forEach((child, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Draw line to child
      svg += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#6366f1" stroke-width="2" />`;
      
      // Draw child node
      svg += `<g>`;
      svg += `<ellipse cx="${x}" cy="${y}" rx="80" ry="30" fill="#818cf8" />`;
      svg += `<text x="${x}" y="${y}" font-family="Arial" font-size="12px" fill="white" text-anchor="middle" dominant-baseline="middle">${child.label}</text>`;
      svg += `</g>`;
      
      // Draw second-level nodes (grandchildren)
      if (child.children.length > 0) {
        const grandchildRadius = 70;
        const grandchildAngleStep = (Math.PI / 2) / (child.children.length + 1);
        const baseAngle = angle - Math.PI / 4;
        
        child.children.forEach((grandchild, grandchildIndex) => {
          const grandchildAngle = baseAngle + (grandchildIndex + 1) * grandchildAngleStep;
          const gx = x + grandchildRadius * Math.cos(grandchildAngle);
          const gy = y + grandchildRadius * Math.sin(grandchildAngle);
          
          // Draw line to grandchild
          svg += `<line x1="${x}" y1="${y}" x2="${gx}" y2="${gy}" stroke="#a5b4fc" stroke-width="1.5" />`;
          
          // Draw grandchild node
          svg += `<g>`;
          svg += `<ellipse cx="${gx}" cy="${gy}" rx="60" ry="20" fill="#c7d2fe" />`;
          svg += `<text x="${gx}" y="${gy}" font-family="Arial" font-size="10px" fill="#1e1b4b" text-anchor="middle" dominant-baseline="middle">${grandchild.label}</text>`;
          svg += `</g>`;
        });
      }
    });
    
    svg += `</svg>`;
    return svg;
  };

  const downloadMindMap = () => {
    if (!svgContent) {
      toast({
        title: 'No mind map to download',
        description: 'Please generate a mind map first',
        variant: 'destructive',
      });
      return;
    }

    // Create a downloadable svg file
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_mind_map.svg`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: 'Mind Map downloaded',
      description: 'Your mind map has been downloaded as an SVG file',
    });
  };
  
  const copyToClipboard = () => {
    if (!svgContent) {
      toast({
        title: 'No mind map to copy',
        description: 'Please generate a mind map first',
        variant: 'destructive',
      });
      return;
    }
    
    navigator.clipboard.writeText(svgContent);
    
    toast({
      title: 'Mind Map SVG copied',
      description: 'The SVG code has been copied to your clipboard',
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
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
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
            <Network className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Mind Map Generator</h1>
          <p className="text-muted-foreground mt-2">Create visual mind maps from your content</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Create Mind Map</CardTitle>
                <CardDescription>Enter a topic and optional content to generate a mind map</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Main Topic</Label>
                  <Input
                    id="topic"
                    placeholder="E.g., Marketing Strategy, Business Plan, Project Management"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content" className="flex justify-between">
                    <span>Content (Optional)</span>
                    <span className="text-xs text-muted-foreground">Use indentation for hierarchy</span>
                  </Label>
                  <Textarea
                    id="content"
                    placeholder={`Digital Marketing\n  SEO\n  Content Marketing\n  Social Media\nTraditional Marketing\n  TV & Radio\n  Print Ads`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Pro tip: Use 2 spaces for indentation to create hierarchy levels in your mind map
                  </p>
                </div>
                
                <Button
                  onClick={generateMindMap}
                  disabled={loading || !topic.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating Mind Map...
                    </>
                  ) : (
                    'Generate Mind Map'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Mind Map Visualization</CardTitle>
                  {svgContent && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadMindMap}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
                <CardDescription>
                  {mindMap ? `Mind map for "${topic}"` : "Your generated mind map will appear here"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {loading ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : svgContent ? (
                  <div 
                    className="bg-white border rounded-md h-[400px] overflow-auto flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed rounded-md">
                    <Network className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Enter a topic and generate your mind map</p>
                  </div>
                )}
              </CardContent>
              {svgContent && (
                <CardFooter className="bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    The mind map visualizes hierarchical relationships between concepts and ideas.
                    You can download it as an SVG file or copy the SVG code to use in other applications.
                  </p>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MindMap;
