import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileDown, Scissors, FileText, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WhatsNextTool {
  name: string;
  description: string;
  path: string;
  icon: string;
}

interface WhatsNextToolsProps {
  tools?: WhatsNextTool[];
}

const WhatsNextTools: React.FC<WhatsNextToolsProps> = ({ tools }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    compress: <FileDown className="h-6 w-6 text-primary" />,
    split: <Scissors className="h-6 w-6 text-primary" />,
    merge: <FileText className="h-6 w-6 text-primary" />,
    protect: <Lock className="h-6 w-6 text-primary" />,
  };

  const defaultTools: WhatsNextTool[] = [
    {
      name: 'Compress PDF',
      description: 'Reduce file size for easier sharing',
      path: '/compress-pdf',
      icon: 'compress',
    },
    {
      name: 'Split PDF',
      description: 'Extract pages into separate files',
      path: '/split-pdf',
      icon: 'split',
    },
    {
      name: 'Merge PDF',
      description: 'Combine multiple PDFs into one',
      path: '/merge-pdf',
      icon: 'merge',
    },
    {
      name: 'Protect PDF',
      description: 'Add password security',
      path: '/protect-pdf',
      icon: 'protect',
    },
  ];

  const displayTools = tools || defaultTools;

  return (
    <div className="mt-12 p-6 bg-muted/30 rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">What's Next?</h2>
          <p className="text-muted-foreground">
            Continue your PDF workflow with these helpful tools
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayTools.map((tool, index) => (
          <Link key={index} to={tool.path}>
            <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 hover:-translate-y-1">
              <CardContent className="p-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    {tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : <FileText className="h-6 w-6 text-primary" />}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/tools">
            View All PDF Tools
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default WhatsNextTools;
