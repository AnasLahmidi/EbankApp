import { Bell, Search, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      {/* Left - Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-10 h-10 bg-secondary/50 border-0"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-success" />
          <span>Connexion sécurisée</span>
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.prenom} {user?.nom}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">
              {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
