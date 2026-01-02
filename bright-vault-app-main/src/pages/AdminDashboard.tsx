import { useState, useEffect } from 'react';
import { Users, CreditCard, TrendingUp, Activity, Plus, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Client, CompteBancaire, OperationBancaire } from '@/types';
import { useAuth } from '@/context/AuthContext';

// Mock data
const mockClients: Client[] = [
  {
    id: 1,
    nom: 'Alaoui',
    prenom: 'Mohamed',
    email: 'client1@mail.com',
    telephone: '0612345678',
    cin: 'AB123456',
    adresse: 'Casablanca, Maroc',
    dateCreation: '2022-03-15',
  },
  {
    id: 2,
    nom: 'Bennani',
    prenom: 'Fatima',
    email: 'client2@mail.com',
    telephone: '0698765432',
    cin: 'CD789012',
    adresse: 'Rabat, Maroc',
    dateCreation: '2023-01-10',
  },
  {
    id: 3,
    nom: 'Amrani',
    prenom: 'Hassan',
    email: 'client3@mail.com',
    telephone: '0654321098',
    cin: 'EF345678',
    adresse: 'Marrakech, Maroc',
    dateCreation: '2023-06-20',
  },
];

const mockRecentOperations: OperationBancaire[] = [
  { id: 1, type: 'DEPOT', montant: 5000, date: '2024-01-15T10:30:00', description: 'Dépôt client' },
  { id: 2, type: 'VIREMENT', montant: 2500, date: '2024-01-15T09:15:00', description: 'Virement interne' },
  { id: 3, type: 'RETRAIT', montant: 1000, date: '2024-01-14T16:45:00', description: 'Retrait GAB' },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [recentOperations, setRecentOperations] = useState<OperationBancaire[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClients(mockClients);
      setRecentOperations(mockRecentOperations);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.cin?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Tableau de bord {user?.role === 'ADMIN' ? 'Administrateur' : 'Agent'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez les clients, comptes et opérations bancaires.
            </p>
          </div>
          <Button className="btn-primary-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Clients Actifs"
            value="1,247"
            change="+23 ce mois"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Comptes Ouverts"
            value="2,891"
            change="+45 ce mois"
            changeType="positive"
            icon={CreditCard}
          />
          <StatsCard
            title="Volume Transactions"
            value={formatCurrency(4520000)}
            change="+18.5% vs mois dernier"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Opérations Jour"
            value="156"
            change="En cours"
            changeType="neutral"
            icon={Activity}
          />
        </div>

        {/* Clients Table */}
        <div className="card-banking">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Clients récents</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>CIN</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium text-sm">
                          {client.prenom.charAt(0)}{client.nom.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{client.prenom} {client.nom}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{client.cin}</TableCell>
                  <TableCell>{client.telephone}</TableCell>
                  <TableCell>{formatDate(client.dateCreation)}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-success/10 text-success hover:bg-success/20">
                      Actif
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Recent Operations */}
        <div className="card-banking p-6">
          <h2 className="text-lg font-semibold mb-6">Dernières opérations</h2>
          <div className="space-y-4">
            {recentOperations.map((op) => (
              <div
                key={op.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    op.type === 'DEPOT' ? 'bg-success/10 text-success' :
                    op.type === 'RETRAIT' ? 'bg-destructive/10 text-destructive' :
                    'bg-info/10 text-info'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{op.type}</p>
                    <p className="text-sm text-muted-foreground">{op.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    op.type === 'DEPOT' ? 'text-success' : 'text-foreground'
                  }`}>
                    {op.type === 'DEPOT' ? '+' : '-'}{formatCurrency(op.montant)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(op.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
