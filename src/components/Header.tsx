import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Monitor, ShoppingBag, Box, User, LogIn, Settings } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Configurations PC", path: "/configurations", icon: Monitor },
    { name: "Meilleures offres", path: "/offres", icon: ShoppingBag },
    { name: "Boîtiers PC", path: "/boitiers", icon: Box },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Monitor className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            PCShare
          </span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium ml-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <LogIn className="h-4 w-4 mr-2" />
            Connexion
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            S'inscrire
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;