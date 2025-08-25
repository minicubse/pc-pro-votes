import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, MessageCircle, Eye, Flag } from "lucide-react";
import { Link } from "react-router-dom";

interface ProposalCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  views: number;
  category: "configuration" | "offre" | "boitier";
  createdAt: Date;
  tags?: string[];
  isUpvoted?: boolean;
  isDownvoted?: boolean;
}

const ProposalCard = ({ 
  id, 
  title, 
  description, 
  author, 
  upvotes, 
  downvotes, 
  comments, 
  views,
  category,
  createdAt,
  tags = [],
  isUpvoted = false,
  isDownvoted = false 
}: ProposalCardProps) => {
  const categoryPaths = {
    configuration: "configurations",
    offre: "offres", 
    boitier: "boitiers"
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    return `Il y a ${diffDays} jours`;
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:border-gaming-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/${categoryPaths[category]}/${id}`}
              className="block hover:text-gaming-primary transition-colors"
            >
              <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-gaming-primary transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gaming-danger">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-8 w-8 ${isUpvoted ? "text-gaming-success" : "text-muted-foreground"} hover:text-gaming-success`}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[20px] text-center">
                {upvotes - downvotes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-8 w-8 ${isDownvoted ? "text-gaming-danger" : "text-muted-foreground"} hover:text-gaming-danger`}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-1 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </div>

            <div className="flex items-center space-x-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span>par {author}</span>
            <span>•</span>
            <span>{formatTimeAgo(createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;