import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  History,
  Users,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Shield,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard, roles: ['CLIENT', 'ADMIN', 'AGENT'] },
  { label: 'Mes Comptes', path: '/comptes', icon: Wallet, roles: ['CLIENT'] },
  { label: 'Virement', path: '/virement', icon: ArrowLeftRight, roles: ['CLIENT'] },
  { label: 'Dépôt', path: '/depot', icon: CreditCard, roles: ['CLIENT'] },
  { label: 'Historique', path: '/historique', icon: History, roles: ['CLIENT'] },
  { label: 'Gestion Clients', path: '/admin/clients', icon: Users, roles: ['ADMIN', 'AGENT'] },
  { label: 'Gestion Comptes', path: '/admin/comptes', icon: CreditCard, roles: ['ADMIN', 'AGENT'] },
  { label: 'Opérations', path: '/admin/operations', icon: FileText, roles: ['ADMIN', 'AGENT'] },
  { label: 'Paramètres', path: '/parametres', icon: Settings, roles: ['CLIENT', 'ADMIN', 'AGENT'] },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        'sidebar-gradient min-h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">eBank</h1>
              <p className="text-xs text-sidebar-foreground/70">Banque Digitale</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-foreground font-semibold">
                {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.prenom} {user.nom}
              </p>
              <p className="text-xs text-sidebar-foreground/70">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full',
            'text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all duration-200'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};
