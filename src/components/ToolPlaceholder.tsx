
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolPlaceholderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ title, description, icon }) => {
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
      
      <Card className="border-2 border-dashed border-muted-foreground/20 bg-card/50">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
            {icon}
          </div>
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center p-8">
          <p className="text-lg">This tool is currently being developed. Check back soon for the full functionality!</p>
          <div className="flex justify-center mt-6">
            <Button variant="outline">Coming Soon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolPlaceholder;
