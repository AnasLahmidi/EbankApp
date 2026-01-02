import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CompteBancaire } from '@/types';

const transferSchema = z.object({
  compteSourceId: z.string().min(1, 'Veuillez sélectionner un compte source'),
  compteDestinationNumero: z
    .string()
    .min(10, 'Le numéro de compte doit contenir au moins 10 caractères')
    .max(24, 'Le numéro de compte ne peut pas dépasser 24 caractères'),
  montant: z
    .string()
    .min(1, 'Le montant est requis')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Le montant doit être supérieur à 0',
    }),
  description: z.string().max(200, 'La description ne peut pas dépasser 200 caractères').optional(),
});

type TransferFormData = z.infer<typeof transferSchema>;

interface TransferFormProps {
  comptes: CompteBancaire[];
  onSubmit: (data: {
    compteSourceId: number;
    compteDestinationNumero: string;
    montant: number;
    description?: string;
  }) => Promise<void>;
}

export const TransferForm = ({ comptes, onSubmit }: TransferFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<TransferFormData | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  });

  const selectedCompteId = watch('compteSourceId');
  const selectedCompte = comptes.find((c) => String(c.id) === selectedCompteId);
  const montant = watch('montant');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  const handleFormSubmit = (data: TransferFormData) => {
    setPendingData(data);
    setShowConfirm(true);
  };

  const confirmTransfer = async () => {
    if (!pendingData) return;

    setShowConfirm(false);
    setIsLoading(true);

    try {
      await onSubmit({
        compteSourceId: Number(pendingData.compteSourceId),
        compteDestinationNumero: pendingData.compteDestinationNumero,
        montant: Number(pendingData.montant),
        description: pendingData.description,
      });
      setIsSuccess(true);
      toast({
        title: 'Virement effectué',
        description: `Un virement de ${pendingData.montant} MAD a été effectué avec succès.`,
      });
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 2000);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setPendingData(null);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-success">Virement réussi !</h3>
        <p className="text-muted-foreground mt-2">Le bénéficiaire recevra les fonds sous peu.</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Source Account */}
        <div className="space-y-2">
          <Label className="label-banking">Compte à débiter</Label>
          <Select onValueChange={(value) => setValue('compteSourceId', value)}>
            <SelectTrigger className="input-banking">
              <SelectValue placeholder="Sélectionner votre compte" />
            </SelectTrigger>
            <SelectContent>
              {comptes.map((compte) => (
                <SelectItem key={compte.id} value={String(compte.id)}>
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span>{compte.type} - {compte.numero}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {formatCurrency(compte.solde)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.compteSourceId && (
            <p className="text-sm text-destructive">{errors.compteSourceId.message}</p>
          )}
          {selectedCompte && (
            <p className="text-sm text-muted-foreground">
              Solde disponible: <span className="font-semibold text-foreground">{formatCurrency(selectedCompte.solde)}</span>
            </p>
          )}
        </div>

        {/* Transfer Icon */}
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-primary/10">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Destination Account */}
        <div className="space-y-2">
          <Label className="label-banking">Numéro de compte bénéficiaire</Label>
          <Input
            {...register('compteDestinationNumero')}
            placeholder="Ex: 0123456789012345678901"
            className="input-banking"
          />
          {errors.compteDestinationNumero && (
            <p className="text-sm text-destructive">{errors.compteDestinationNumero.message}</p>
          )}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label className="label-banking">Montant (MAD)</Label>
          <div className="relative">
            <Input
              {...register('montant')}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="input-banking pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              MAD
            </span>
          </div>
          {errors.montant && (
            <p className="text-sm text-destructive">{errors.montant.message}</p>
          )}
          {selectedCompte && montant && Number(montant) > selectedCompte.solde && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Solde insuffisant</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="label-banking">Motif (optionnel)</Label>
          <Textarea
            {...register('description')}
            placeholder="Ex: Remboursement, Cadeau..."
            className="min-h-[80px] resize-none"
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 btn-primary-gradient text-base"
          disabled={isLoading || (selectedCompte && montant && Number(montant) > selectedCompte.solde)}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              <span>Traitement...</span>
            </div>
          ) : (
            'Continuer'
          )}
        </Button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer le virement</DialogTitle>
            <DialogDescription>
              Veuillez vérifier les détails du virement avant de confirmer.
            </DialogDescription>
          </DialogHeader>
          
          {pendingData && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Montant</span>
                <span className="font-semibold">{formatCurrency(Number(pendingData.montant))}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Bénéficiaire</span>
                <span className="font-mono text-sm">{pendingData.compteDestinationNumero}</span>
              </div>
              {pendingData.description && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Motif</span>
                  <span>{pendingData.description}</span>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Annuler
            </Button>
            <Button onClick={confirmTransfer} className="btn-primary-gradient">
              Confirmer le virement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
