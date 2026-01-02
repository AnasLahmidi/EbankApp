import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react';
import { OperationBancaire } from '@/types';
import { cn } from '@/lib/utils';

interface TransactionHistoryProps {
  operations: OperationBancaire[];
  limit?: number;
}

export const TransactionHistory = ({ operations, limit }: TransactionHistoryProps) => {
  const displayedOperations = limit ? operations.slice(0, limit) : operations;

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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'DEPOT':
        return <ArrowDownLeft className="w-4 h-4" />;
      case 'RETRAIT':
        return <ArrowUpRight className="w-4 h-4" />;
      case 'VIREMENT':
        return <ArrowLeftRight className="w-4 h-4" />;
      default:
        return <ArrowLeftRight className="w-4 h-4" />;
    }
  };

  const getOperationColor = (type: string) => {
    switch (type) {
      case 'DEPOT':
        return 'bg-success/10 text-success';
      case 'RETRAIT':
        return 'bg-destructive/10 text-destructive';
      case 'VIREMENT':
        return 'bg-info/10 text-info';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'DEPOT':
        return 'text-success';
      case 'RETRAIT':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  if (displayedOperations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Aucune opération récente</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayedOperations.map((operation, index) => (
        <div
          key={operation.id || index}
          className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
        >
          {/* Icon */}
          <div className={cn('p-2.5 rounded-xl', getOperationColor(operation.type))}>
            {getOperationIcon(operation.type)}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">
              {operation.type === 'DEPOT' && 'Dépôt'}
              {operation.type === 'RETRAIT' && 'Retrait'}
              {operation.type === 'VIREMENT' && 'Virement'}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {operation.description || 'Aucune description'}
            </p>
          </div>

          {/* Amount & Date */}
          <div className="text-right">
            <p className={cn('font-semibold', getAmountColor(operation.type))}>
              {operation.type === 'DEPOT' ? '+' : '-'}
              {formatCurrency(operation.montant)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(operation.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
