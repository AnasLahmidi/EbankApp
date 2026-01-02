import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CompteBancaire } from '@/types';

const depositSchema = z.object({
  compteId: z.string().min(1, 'Veuillez sélectionner un compte'),
  montant: z
    .string()
    .min(1, 'Le montant est requis')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Le montant doit être supérieur à 0',
    }),
});

type DepositFormData = z.infer<typeof depositSchema>;

interface DepositFormProps {
  comptes: CompteBancaire[];
  onSubmit: (data: { compteId: number; montant: number }) => Promise<void>;
}

export const DepositForm = ({ comptes, onSubmit }: DepositFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  const handleFormSubmit = async (data: DepositFormData) => {
    setIsLoading(true);
    try {
      await onSubmit({
        compteId: Number(data.compteId),
        montant: Number(data.montant),
      });
      setIsSuccess(true);
      toast({
        title: 'Dépôt effectué',
        description: `Un dépôt de ${data.montant} MAD a été effectué avec succès.`,
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
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-success">Dépôt réussi !</h3>
        <p className="text-muted-foreground mt-2">Votre solde a été mis à jour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Account Selection */}
      <div className="space-y-2">
        <Label className="label-banking">Compte à créditer</Label>
        <Select onValueChange={(value) => setValue('compteId', value)}>
          <SelectTrigger className="input-banking">
            <SelectValue placeholder="Sélectionner un compte" />
          </SelectTrigger>
          <SelectContent>
            {comptes.map((compte) => (
              <SelectItem key={compte.id} value={String(compte.id)}>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>{compte.type} - {compte.numero}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.compteId && (
          <p className="text-sm text-destructive">{errors.compteId.message}</p>
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
      </div>

      {/* Quick Amounts */}
      <div className="space-y-2">
        <Label className="label-banking">Montants rapides</Label>
        <div className="grid grid-cols-4 gap-2">
          {[100, 500, 1000, 5000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setValue('montant', String(amount))}
              className="py-2 px-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
            >
              {amount} MAD
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-12 btn-primary-gradient text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span>Traitement...</span>
          </div>
        ) : (
          'Effectuer le dépôt'
        )}
      </Button>
    </form>
  );
};
