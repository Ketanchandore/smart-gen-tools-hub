
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PlaceholderTool: React.FC<PlaceholderToolProps> = ({ title, description, icon }) => {
  const navigate = useNavigate();
  
  return (
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
          {icon}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      
      <Card className="border-2 border-dashed border-muted-foreground/20 bg-card/50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Coming Soon</CardTitle>
          <CardDescription>
            This feature is under development and will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center p-8">
          <p className="text-muted-foreground mb-4">
            We're working hard to bring you this tool. Check back later for updates.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Explore Other Tools
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Want Early Access?</h2>
        <p className="text-muted-foreground mb-4">Sign up for our Pro plan to get early access to new tools!</p>
        <Button>Upgrade to Pro</Button>
      </div>
    </div>
  );
};

export default PlaceholderTool;
