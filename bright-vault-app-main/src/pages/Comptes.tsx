import { useState, useEffect } from 'react';
import { Wallet, Plus, Eye } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CompteBancaire } from '@/types';

// Mock data
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

const Comptes = () => {
  const [comptes, setComptes] = useState<CompteBancaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setComptes(mockComptes);
      setIsLoading(false);
    }, 300);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const totalBalance = comptes.reduce((sum, compte) => sum + compte.solde, 0);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Mes Comptes</h1>
              <p className="text-muted-foreground">
                Gérez vos comptes bancaires
              </p>
            </div>
          </div>
          <Button className="btn-primary-gradient gap-2">
            <Plus className="w-4 h-4" />
            Nouveau compte
          </Button>
        </div>

        {/* Total Balance */}
        <div className="card-banking p-8 text-center">
          <p className="text-muted-foreground mb-2">Solde total</p>
          <p className="text-4xl font-bold text-primary">
            {formatCurrency(totalBalance)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Réparti sur {comptes.length} compte(s)
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {comptes.map((compte) => (
            <BalanceCard key={compte.id} compte={compte} />
          ))}
        </div>

        {/* Account Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Détails des comptes</h2>
          {comptes.map((compte) => (
            <div key={compte.id} className="card-banking p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {compte.type === 'COURANT' ? 'Compte Courant' : 'Compte Épargne'}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            compte.statut === 'ACTIF'
                              ? 'border-success text-success'
                              : 'border-warning text-warning'
                          }
                        >
                          {compte.statut}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        N° {compte.numero}
                      </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground">Solde</p>
                    <p className="text-xl font-bold">{formatCurrency(compte.solde)}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Voir détails
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Ouvert le {formatDate(compte.dateCreation)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Comptes;
