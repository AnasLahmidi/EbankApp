import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, CreditCard, ArrowUpDown } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CompteBancaire, OperationBancaire } from '@/types';
import { useAuth } from '@/context/AuthContext';

// Mock data for demo
const mockComptes: CompteBancaire[] = [
  {
    id: 1,
    numero: '007810002345678901',
    solde: 25840.50,
    type: 'COURANT',
    dateCreation: '2022-03-15',
    statut: 'ACTIF',
  },
  {
    id: 2,
    numero: '007810002345678902',
    solde: 15200.00,
    type: 'EPARGNE',
    dateCreation: '2023-01-10',
    statut: 'ACTIF',
  },
];

const mockOperations: OperationBancaire[] = [
  {
    id: 1,
    type: 'DEPOT',
    montant: 5000,
    date: '2024-01-15T10:30:00',
    description: 'Dépôt en espèces',
  },
  {
    id: 2,
    type: 'VIREMENT',
    montant: 1200,
    date: '2024-01-14T14:20:00',
    description: 'Virement à Mohamed Alaoui',
  },
  {
    id: 3,
    type: 'RETRAIT',
    montant: 500,
    date: '2024-01-13T09:00:00',
    description: 'Retrait GAB',
  },
  {
    id: 4,
    type: 'DEPOT',
    montant: 3500,
    date: '2024-01-12T16:45:00',
    description: 'Virement reçu - Salaire',
  },
  {
    id: 5,
    type: 'VIREMENT',
    montant: 800,
    date: '2024-01-11T11:15:00',
    description: 'Paiement facture',
  },
];

const ClientDashboard = () => {
  const { user } = useAuth();
  const [comptes, setComptes] = useState<CompteBancaire[]>([]);
  const [operations, setOperations] = useState<OperationBancaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setComptes(mockComptes);
      setOperations(mockOperations);
      setIsLoading(false);
    }, 500);
  }, []);

  const totalBalance = comptes.reduce((sum, compte) => sum + compte.solde, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Chargement de vos données...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            Bonjour, {user?.prenom} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Voici un aperçu de vos finances aujourd'hui.
          </p>
        </div>

        {/* Main Balance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {comptes.map((compte) => (
            <BalanceCard key={compte.id} compte={compte} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Solde Total"
            value={formatCurrency(totalBalance)}
            change="+12.5% ce mois"
            changeType="positive"
            icon={Wallet}
          />
          <StatsCard
            title="Revenus"
            value={formatCurrency(8500)}
            change="+5.2% vs mois dernier"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Dépenses"
            value={formatCurrency(3200)}
            change="-8.1% vs mois dernier"
            changeType="positive"
            icon={CreditCard}
          />
          <StatsCard
            title="Virements"
            value="12"
            change="Ce mois"
            changeType="neutral"
            icon={ArrowUpDown}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
          <QuickActions />
        </div>

        {/* Recent Transactions */}
        <div className="card-banking p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Transactions récentes</h2>
            <a
              href="/historique"
              className="text-sm text-primary hover:underline"
            >
              Voir tout
            </a>
          </div>
          <TransactionHistory operations={operations} limit={5} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
