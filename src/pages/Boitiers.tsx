import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Camera, Heart } from "lucide-react";
import ProposalCard from "@/components/ProposalCard";

const Boitiers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - à remplacer par des appels API vers votre serveur
  const boitiers = [
    {
      id: "1",
      title: "Build RGB Gaming Setup - Lian Li O11 Dynamic",
      description: "Setup complet avec éclairage RGB synchronisé, watercooling custom et cable management parfait. RTX 4090 + i9-13900KS dans un Lian Li O11 Dynamic.",
      author: "RGBMaster",
      upvotes: 234,
      downvotes: 8,
      comments: 45,
      views: 1247,
      category: "boitier" as const,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ["RGB", "Watercooling", "Lian Li", "Gaming", "RTX 4090"]
    },
    {
      id: "2",
      title: "Build Minimaliste - NZXT H1 White",
      description: "Build épuré en blanc dans le NZXT H1. Setup ITX compact mais puissant avec RTX 4070 et Ryzen 7 7700X. Parfait pour un bureau clean.",
      author: "CleanSetup",
      upvotes: 189,
      downvotes: 3,
      comments: 28,
      views: 856,
      category: "boitier" as const,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ["Minimaliste", "ITX", "NZXT", "Blanc", "Compact"]
    },
    {
      id: "3",
      title: "Workstation Beast - Fractal Design Define 7 XL",
      description: "Station de travail ultra-puissante pour rendu 3D. Dual RTX 4090, Threadripper Pro, 128GB RAM. Refroidissement optimisé et acoustique maîtrisée.",
      author: "WorkstationPro",
      upvotes: 156,
      downvotes: 2,
      comments: 31,
      views: 673,
      category: "boitier" as const,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ["Workstation", "Fractal", "Dual GPU", "Professionnel", "Silence"]
    }
  ];

  const filteredBoitiers = boitiers.filter(boitier =>
    boitier.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    boitier.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    boitier.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedByNew = [...filteredBoitiers].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const sortedByBest = [...filteredBoitiers].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Boîtiers PC & Builds</h1>
          <p className="text-muted-foreground">
            Showcasez vos builds et inspirez-vous des créations de la communauté
          </p>
        </div>
        <Button className="bg-gradient-accent hover:opacity-90 text-primary-foreground font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Partager mon build
        </Button>
      </div>

      {/* Feature highlight */}
      <Card className="mb-8 bg-gradient-accent border-gaming-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="h-6 w-6 text-gaming-accent" />
            <h3 className="font-semibold text-lg">Partagez vos photos !</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Cette section permet d'ajouter plusieurs photos pour mieux présenter vos builds. 
            Montrez les détails, l'éclairage, le cable management...
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-gaming-accent/20 text-gaming-accent">
              <Heart className="h-3 w-3 mr-1" />
              Photos multiples
            </Badge>
            <Badge variant="secondary" className="bg-gaming-accent/20 text-gaming-accent">
              Détails composants
            </Badge>
            <Badge variant="secondary" className="bg-gaming-accent/20 text-gaming-accent">
              Cable management
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un build ou boîtier..."
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
            <span className="bg-gaming-accent/20 text-gaming-accent px-2 py-1 rounded-full text-xs">
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
          {sortedByNew.map((boitier) => (
            <div key={boitier.id} className="relative">
              <ProposalCard {...boitier} />
            </div>
          ))}
          {sortedByNew.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun build trouvé pour votre recherche.
            </div>
          )}
        </TabsContent>

        <TabsContent value="best" className="space-y-4">
          {sortedByBest.map((boitier) => (
            <ProposalCard key={boitier.id} {...boitier} />
          ))}
          {sortedByBest.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun build trouvé pour votre recherche.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Boitiers;