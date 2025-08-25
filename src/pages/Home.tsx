import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, ShoppingBag, Box, TrendingUp, Users, Star } from "lucide-react";

const Home = () => {
  const categories = [
    {
      title: "Configurations PC",
      description: "Partagez et découvrez les meilleures configurations gaming et bureautique",
      icon: Monitor,
      path: "/configurations",
      color: "gaming-primary",
      stats: { proposals: 234, votes: 1542 }
    },
    {
      title: "Meilleures offres",
      description: "Les bons plans du moment sur les composants et périphériques",
      icon: ShoppingBag,
      path: "/offres",
      color: "gaming-secondary",
      stats: { proposals: 89, votes: 876 }
    },
    {
      title: "Boîtiers PC",
      description: "Showcasez vos builds et inspirez-vous des créations de la communauté",
      icon: Box,
      path: "/boitiers",
      color: "gaming-accent",
      stats: { proposals: 156, votes: 1203 }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            PCShare Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            La communauté francophone pour partager vos configurations PC, dénicher les meilleures offres 
            et présenter vos builds. Votez, commentez et échangez avec des passionnés !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold">
              Rejoindre la communauté
            </Button>
            <Button variant="outline" size="lg">
              Explorer les propositions
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explorez les catégories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chaque catégorie propose son propre système de classement avec les propositions 
              les plus récentes et les mieux notées.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.path} className="group hover:shadow-glow hover:border-gaming-primary/30 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}>
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-gaming-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex justify-center gap-6 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{category.stats.proposals} posts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{category.stats.votes} votes</span>
                      </div>
                    </div>
                    <Link to={category.path}>
                      <Button variant="outline" className="w-full group-hover:border-gaming-primary group-hover:text-gaming-primary transition-colors">
                        Découvrir
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">La communauté en chiffres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Membres actifs", value: "2,847", icon: Users },
              { label: "Configurations", value: "479", icon: Monitor },
              { label: "Votes donnés", value: "12,690", icon: TrendingUp },
              { label: "Commentaires", value: "8,234", icon: Star }
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-gaming-primary" />
                  <div className="text-3xl font-bold text-gaming-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;