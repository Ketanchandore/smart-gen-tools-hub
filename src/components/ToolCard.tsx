
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, route }) => {
  return (
    <div className="tool-card p-6 flex flex-col h-full card-hover">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 text-primary mb-5 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-muted-foreground text-center mb-6 flex-grow">{description}</p>
      <div className="mt-auto">
        <Link to={route} className="w-full">
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            Launch Tool
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
