import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContextualTool {
  name: string;
  reason: string;
  path: string;
}

interface YouMightAlsoNeedProps {
  tools: ContextualTool[];
}

const YouMightAlsoNeed: React.FC<YouMightAlsoNeedProps> = ({ tools }) => {
  return (
    <div className="mt-8 p-5 bg-primary/5 rounded-lg border border-primary/20">
      <div className="flex items-start gap-3 mb-4">
        <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-lg mb-1">You Might Also Need</h3>
          <p className="text-sm text-muted-foreground">
            Based on your current task, these tools might be helpful
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tools.map((tool, index) => (
          <Link key={index} to={tool.path}>
            <Card className="h-full hover:shadow-md transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-1 text-primary">{tool.name}</h4>
                <p className="text-xs text-muted-foreground">{tool.reason}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YouMightAlsoNeed;
