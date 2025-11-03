import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ReverseToolLinkProps {
  reverseTool: {
    name: string;
    path: string;
    description: string;
  };
}

const ReverseToolLink: React.FC<ReverseToolLinkProps> = ({ reverseTool }) => {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Need the Reverse Operation?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {reverseTool.description}
            </p>
          </div>
          <Button asChild size="lg" className="whitespace-nowrap">
            <Link to={reverseTool.path}>
              Try {reverseTool.name}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReverseToolLink;
