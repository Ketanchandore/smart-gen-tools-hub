import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Tool {
  name: string;
  description: string;
  path: string;
  icon: React.ComponentType<any>;
  category: string;
  popular?: boolean;
  new?: boolean;
}

interface ToolGridProps {
  tools: Tool[];
  category?: string;
  showAll?: boolean;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, category, showAll = false }) => {
  const navigate = useNavigate();

  const filteredTools = useMemo(() => {
    let filtered = category ? tools.filter(tool => tool.category === category) : tools;
    return showAll ? filtered : filtered.slice(0, 12);
  }, [tools, category, showAll]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredTools.map((tool, index) => {
        const IconComponent = tool.icon;
        return (
          <motion.div
            key={tool.path}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-card via-card to-muted/20 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => navigate(tool.path)}
              />
              
              <CardHeader className="relative pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex gap-1">
                    {tool.popular && (
                      <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800 border-amber-200">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {tool.new && (
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200">
                        <Zap className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative pt-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  onClick={() => navigate(tool.path)}
                >
                  <span>Try Now</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ToolGrid;