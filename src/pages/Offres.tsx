import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, ExternalLink, Clock } from "lucide-react";
import ProposalCard from "@/components/ProposalCard";

const Offres = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - à remplacer par des appels API vers votre serveur
  const offres = [
    {
      id: "1",
      title: "RTX 4070 Ti à 749€ (-150€) - Materiel.net",
      description: "Promotion flash sur la RTX 4070 Ti Founders Edition. Parfait pour le gaming 1440p en ultra. Livraison gratuite et garantie constructeur 3 ans.",
      author: "DealHunter",
      upvotes: 89,
      downvotes: 4,
      comments: 23,
      views: 456,
      category: "offre" as const,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1h ago
      tags: ["RTX 4070 Ti", "Nvidia", "Promo", "Gaming"]
    },
    {
      id: "2",
      title: "SSD Samsung 980 Pro 2TB à 129€ - Amazon",
      description: "Excellent prix pour ce SSD NVMe haut de gamme. Parfait pour les jeux et applications gourmandes. Deal limité dans le temps !",
      author: "StorageExpert",
      upvotes: 67,
      downvotes: 2,
      comments: 15,
      views: 298,
      category: "offre" as const,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3h ago
      tags: ["SSD", "Samsung", "NVMe", "2TB"]
    },
    {
      id: "3",
      title: "Ryzen 7 7700X à 289€ (-60€) - LDLC",
      description: "Processeur 8 cœurs excellent pour gaming et création. Compatible AM5, très bonnes performances. Stock limité !",
      author: "CPUMaster",
      upvotes: 52,
      downvotes: 1,
      comments: 18,
      views: 367,
      category: "offre" as const,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h ago
      tags: ["Ryzen 7", "AMD", "AM5", "Gaming"]
    }
  ];

  const filteredOffres = offres.filter(offre =>
    offre.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offre.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offre.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedByNew = [...filteredOffres].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const sortedByBest = [...filteredOffres].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "À l'instant";
    if (diffHours === 1) return "Il y a 1h";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Hier";
    return `Il y a ${diffDays} jours`;
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meilleures offres du moment</h1>
          <p className="text-muted-foreground">
            Les bons plans de la communauté sur les composants et périphériques PC
          </p>
        </div>
        <Button className="bg-gradient-secondary hover:opacity-90 text-primary-foreground font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Partager une offre
        </Button>
      </div>

      {/* Alerts */}
      <div className="bg-gaming-warning/10 border border-gaming-warning/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gaming-warning" />
          <span className="font-medium text-gaming-warning">Offres du moment</span>
        </div>
        <p className="text-sm mt-2 text-muted-foreground">
          Vérifiez toujours la disponibilité et les prix avant achat. Les stocks peuvent être limités !
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher une offre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="new" className="flex items-center gap-2">
            Nouveaux
            <span className="bg-gaming-secondary/20 text-gaming-secondary px-2 py-1 rounded-full text-xs">
              {sortedByNew.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="best" className="flex items-center gap-2">
            Best
            <span className="bg-gaming-primary/20 text-gaming-primary px-2 py-1 rounded-full text-xs">
              {sortedByBest.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          {sortedByNew.map((offre) => (
            <div key={offre.id} className="relative">
              <ProposalCard {...offre} />
              {offre.createdAt.getTime() > Date.now() - 2 * 60 * 60 * 1000 && (
                <Badge className="absolute top-4 right-4 bg-gaming-warning text-gaming-warning-foreground">
                  🔥 Récent
                </Badge>
              )}
            </div>
          ))}
          {sortedByNew.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune offre trouvée pour votre recherche.
            </div>
          )}
        </TabsContent>

        <TabsContent value="best" className="space-y-4">
          {sortedByBest.map((offre) => (
            <ProposalCard key={offre.id} {...offre} />
          ))}
          {sortedByBest.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune offre trouvée pour votre recherche.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Offres;