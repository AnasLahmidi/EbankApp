import { useState, useEffect } from 'react';
import { History, Download, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OperationBancaire } from '@/types';

// Mock data
const mockOperations: OperationBancaire[] = [
  { id: 1, type: 'DEPOT', montant: 5000, date: '2024-01-15T10:30:00', description: 'Dépôt en espèces' },
  { id: 2, type: 'VIREMENT', montant: 1200, date: '2024-01-14T14:20:00', description: 'Virement à Mohamed Alaoui' },
  { id: 3, type: 'RETRAIT', montant: 500, date: '2024-01-13T09:00:00', description: 'Retrait GAB' },
  { id: 4, type: 'DEPOT', montant: 3500, date: '2024-01-12T16:45:00', description: 'Virement reçu - Salaire' },
  { id: 5, type: 'VIREMENT', montant: 800, date: '2024-01-11T11:15:00', description: 'Paiement facture' },
  { id: 6, type: 'DEPOT', montant: 2000, date: '2024-01-10T08:30:00', description: 'Dépôt chèque' },
  { id: 7, type: 'RETRAIT', montant: 300, date: '2024-01-09T17:00:00', description: 'Retrait GAB' },
  { id: 8, type: 'VIREMENT', montant: 1500, date: '2024-01-08T13:45:00', description: 'Loyer mensuel' },
];

const Historique = () => {
  const [operations, setOperations] = useState<OperationBancaire[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOperations(mockOperations);
      setIsLoading(false);
    }, 300);
  }, []);

  const filteredOperations = operations.filter((op) => {
    if (filter === 'all') return true;
    return op.type === filter;
  });

  const totalDebit = operations
    .filter((op) => op.type === 'RETRAIT' || op.type === 'VIREMENT')
    .reduce((sum, op) => sum + op.montant, 0);

  const totalCredit = operations
    .filter((op) => op.type === 'DEPOT')
    .reduce((sum, op) => sum + op.montant, 0);

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
            <div className="p-3 rounded-xl bg-warning/10">
              <History className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Historique des opérations</h1>
              <p className="text-muted-foreground">
                Consultez toutes vos transactions
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-banking p-6">
            <p className="text-sm text-muted-foreground">Total Crédité</p>
            <p className="text-2xl font-bold text-success mt-1">
              +{formatCurrency(totalCredit)}
            </p>
          </div>
          <div className="card-banking p-6">
            <p className="text-sm text-muted-foreground">Total Débité</p>
            <p className="text-2xl font-bold text-destructive mt-1">
              -{formatCurrency(totalDebit)}
            </p>
          </div>
          <div className="card-banking p-6">
            <p className="text-sm text-muted-foreground">Solde Net</p>
            <p className={`text-2xl font-bold mt-1 ${
              totalCredit - totalDebit >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {formatCurrency(totalCredit - totalDebit)}
            </p>
          </div>
        </div>

        {/* Filter & List */}
        <div className="card-banking">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les opérations</SelectItem>
                  <SelectItem value="DEPOT">Dépôts</SelectItem>
                  <SelectItem value="RETRAIT">Retraits</SelectItem>
                  <SelectItem value="VIREMENT">Virements</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {filteredOperations.length} opération(s)
              </span>
            </div>
          </div>
          <div className="p-6">
            <TransactionHistory operations={filteredOperations} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Historique;
