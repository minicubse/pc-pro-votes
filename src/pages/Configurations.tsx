import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import ProposalCard from "@/components/ProposalCard";

const Configurations = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - à remplacer par des appels API vers votre serveur
  const configurations = [
    {
      id: "1",
      title: "Build Gaming 4K RTX 4080 - 2500€",
      description: "Configuration complète pour du gaming en 4K avec RTX 4080, i7-13700K, 32GB DDR5. Parfait pour tous les jeux AAA en ultra settings.",
      author: "GamerPro",
      upvotes: 45,
      downvotes: 3,
      comments: 12,
      views: 234,
      category: "configuration" as const,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ["Gaming", "4K", "RTX 4080", "Intel"]
    },
    {
      id: "2", 
      title: "PC Bureautique Silencieux - 800€",
      description: "Build ultra-silencieux pour le travail avec Ryzen 5 7600, refroidissement passif et SSD NVMe. Idéal pour le télétravail.",
      author: "WorkFromHome",
      upvotes: 28,
      downvotes: 1,
      comments: 8,
      views: 156,
      category: "configuration" as const,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ["Bureautique", "Silencieux", "AMD", "Économique"]
    },
    {
      id: "3",
      title: "Workstation Création Contenu - 3500€",
      description: "Station puissante pour le montage vidéo 4K, rendu 3D avec i9-13900K, RTX 4070 Ti, 64GB RAM. Optimisé pour Adobe Suite et Blender.",
      author: "ContentCreator",
      upvotes: 62,
      downvotes: 5,
      comments: 18,
      views: 387,
      category: "configuration" as const,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ["Création", "Montage", "3D", "Professionnel"]
    }
  ];

  const filteredConfigurations = configurations.filter(config =>
    config.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedByNew = [...filteredConfigurations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const sortedByBest = [...filteredConfigurations].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Configurations PC</h1>
          <p className="text-muted-foreground">
            Partagez et découvrez les meilleures configurations pour tous les budgets
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle config
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher une configuration..."
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
            <span className="bg-gaming-primary/20 text-gaming-primary px-2 py-1 rounded-full text-xs">
              {sortedByNew.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="best" className="flex items-center gap-2">
            Best
            <span className="bg-gaming-secondary/20 text-gaming-secondary px-2 py-1 rounded-full text-xs">
              {sortedByBest.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          {sortedByNew.map((config) => (
            <ProposalCard key={config.id} {...config} />
          ))}
          {sortedByNew.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune configuration trouvée pour votre recherche.
            </div>
          )}
        </TabsContent>

        <TabsContent value="best" className="space-y-4">
          {sortedByBest.map((config) => (
            <ProposalCard key={config.id} {...config} />
          ))}
          {sortedByBest.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune configuration trouvée pour votre recherche.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configurations;