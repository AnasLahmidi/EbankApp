import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransferForm } from '@/components/forms/TransferForm';
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

const Virement = () => {
  const [comptes, setComptes] = useState<CompteBancaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setComptes(mockComptes);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleTransfer = async (data: {
    compteSourceId: number;
    compteDestinationNumero: string;
    montant: number;
    description?: string;
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Transfer data:', data);
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
          <div className="p-3 rounded-xl bg-primary/10">
            <ArrowLeftRight className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Effectuer un virement</h1>
            <p className="text-muted-foreground">
              Transférez de l'argent vers un autre compte
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="card-banking p-8">
          <TransferForm comptes={comptes} onSubmit={handleTransfer} />
        </div>

        {/* Info */}
        <div className="mt-6 p-4 rounded-xl bg-info/10 border border-info/20">
          <p className="text-sm text-info">
            <strong>Information :</strong> Les virements sont généralement traités sous 24h. 
            Pour les virements urgents, veuillez contacter votre agence.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Virement;
