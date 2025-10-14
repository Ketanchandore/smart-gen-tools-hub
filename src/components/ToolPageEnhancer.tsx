import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ExternalLink, Copy, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface HowToUseStep {
  step: number;
  title: string;
  description: string;
}

interface Tip {
  title: string;
  description: string;
}

interface RelatedTool {
  name: string;
  description: string;
  route: string;
  icon?: React.ReactNode;
}

interface UseCase {
  title: string;
  description: string;
  example?: string;
}

interface ToolPageEnhancerProps {
  toolName: string;
  howToUse: HowToUseStep[];
  tips: Tip[];
  relatedTools: RelatedTool[];
  useCases: UseCase[];
  usageCount?: string;
  rating?: number;
  reviewCount?: number;
}

export const HowToUseSection: React.FC<{ steps: HowToUseStep[] }> = ({ steps }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle className="text-2xl">How to Use</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.step} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              {step.step}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const TipsSection: React.FC<{ tips: Tip[] }> = ({ tips }) => (
  <Card className="mt-8 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
    <CardHeader>
      <CardTitle className="text-2xl">Tips for Best Results</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 text-accent">💡</div>
            <div>
              <h4 className="font-semibold mb-1">{tip.title}</h4>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const RelatedToolsSection: React.FC<{ tools: RelatedTool[] }> = ({ tools }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle className="text-2xl">Related Tools</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.route}
            to={tool.route}
            className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-all group"
          >
            {tool.icon && <div className="text-primary">{tool.icon}</div>}
            <div className="flex-1">
              <div className="font-medium group-hover:text-primary transition-colors">{tool.name}</div>
              <div className="text-sm text-muted-foreground">{tool.description}</div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const UseCasesSection: React.FC<{ useCases: UseCase[] }> = ({ useCases }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle className="text-2xl">Use Cases</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {useCases.map((useCase, index) => (
          <div key={index} className="border-l-4 border-primary pl-4 py-2">
            <h4 className="font-semibold mb-2">{useCase.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{useCase.description}</p>
            {useCase.example && (
              <div className="mt-2 p-3 bg-muted/50 rounded-md">
                <span className="text-xs font-medium text-muted-foreground">Example:</span>
                <p className="text-sm mt-1">{useCase.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const RatingSection: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className="flex items-center gap-2 my-4">
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
    <span className="font-semibold">{rating.toFixed(1)}</span>
    <span className="text-sm text-muted-foreground">({reviewCount.toLocaleString()} reviews)</span>
  </div>
);

export const EngagementBar: React.FC<{ toolName: string; usageCount?: string }> = ({ toolName, usageCount }) => {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    setIsBookmarked(bookmarks.includes(window.location.pathname));
  }, []);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: toolName,
          text: `Check out this tool: ${toolName}`,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Link copied!',
        description: 'Tool link has been copied to clipboard',
      });
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    const currentPath = window.location.pathname;
    
    if (isBookmarked) {
      const updated = bookmarks.filter((path: string) => path !== currentPath);
      localStorage.setItem('bookmarkedTools', JSON.stringify(updated));
      setIsBookmarked(false);
      toast({
        title: 'Bookmark removed',
        description: 'Tool removed from your bookmarks',
      });
    } else {
      bookmarks.push(currentPath);
      localStorage.setItem('bookmarkedTools', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast({
        title: 'Bookmarked!',
        description: 'Tool added to your bookmarks',
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied!',
      description: 'Tool link has been copied to clipboard',
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg my-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {usageCount && (
          <>
            <ThumbsUp className="h-4 w-4" />
            <span>This tool has been used <strong className="text-foreground">{usageCount}</strong></span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBookmark}
          className={isBookmarked ? 'bg-primary/10 border-primary' : ''}
        >
          <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-primary' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopyLink}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

const ToolPageEnhancer: React.FC<ToolPageEnhancerProps> = ({
  toolName,
  howToUse,
  tips,
  relatedTools,
  useCases,
  usageCount = '50,000+',
  rating = 4.8,
  reviewCount = 2847,
}) => {
  return (
    <div className="space-y-8">
      <RatingSection rating={rating} reviewCount={reviewCount} />
      <EngagementBar toolName={toolName} usageCount={usageCount} />
      <HowToUseSection steps={howToUse} />
      <TipsSection tips={tips} />
      <UseCasesSection useCases={useCases} />
      <RelatedToolsSection tools={relatedTools} />
    </div>
  );
};

export default ToolPageEnhancer;
