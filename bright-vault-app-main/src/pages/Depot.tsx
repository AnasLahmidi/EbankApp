import { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DepositForm } from '@/components/forms/DepositForm';
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

const Depot = () => {
  const [comptes, setComptes] = useState<CompteBancaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setComptes(mockComptes);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleDeposit = async (data: { compteId: number; montant: number }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Deposit data:', data);
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
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-success/10">
            <CreditCard className="w-6 h-6 text-success" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Effectuer un dépôt</h1>
            <p className="text-muted-foreground">
              Alimentez votre compte bancaire
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="card-banking p-8">
          <DepositForm comptes={comptes} onSubmit={handleDeposit} />
        </div>

        {/* Info */}
        <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-sm text-success">
            <strong>Note :</strong> Les dépôts sont crédités instantanément sur votre compte.
            Pour les dépôts importants, veuillez vous rendre en agence.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Depot;
