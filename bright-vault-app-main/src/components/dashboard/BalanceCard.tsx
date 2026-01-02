import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { CompteBancaire } from '@/types';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  compte: CompteBancaire;
  className?: string;
}

export const BalanceCard = ({ compte, className }: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);
  };

  const isPositive = compte.solde >= 0;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 btn-primary-gradient',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-white/10" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">
              {compte.type === 'COURANT' ? 'Compte Courant' : 'Compte Épargne'}
            </p>
            <p className="text-primary-foreground/60 text-xs mt-1">
              N° {compte.numero}
            </p>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {showBalance ? (
              <EyeOff className="w-4 h-4 text-primary-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-1">
            Solde disponible
          </p>
          <p className="text-3xl font-bold text-primary-foreground">
            {showBalance ? formatCurrency(compte.solde) : '••••••••'}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-300" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-300" />
            )}
            <span className="text-primary-foreground/80 text-sm">
              {isPositive ? '+2.5% ce mois' : '-1.2% ce mois'}
            </span>
          </div>
          <div className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            compte.statut === 'ACTIF' ? 'bg-green-500/20 text-green-200' :
            compte.statut === 'BLOQUE' ? 'bg-yellow-500/20 text-yellow-200' :
            'bg-red-500/20 text-red-200'
          )}>
            {compte.statut}
          </div>
        </div>
      </div>
    </div>
  );
};
