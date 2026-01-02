import { ArrowLeftRight, CreditCard, History, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface QuickAction {
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

const actions: QuickAction[] = [
  { label: 'Virement', icon: ArrowLeftRight, path: '/virement', color: 'bg-info/10 text-info hover:bg-info/20' },
  { label: 'Dépôt', icon: CreditCard, path: '/depot', color: 'bg-success/10 text-success hover:bg-success/20' },
  { label: 'Historique', icon: History, path: '/historique', color: 'bg-warning/10 text-warning hover:bg-warning/20' },
  { label: 'QR Pay', icon: QrCode, path: '/qr-pay', color: 'bg-primary/10 text-primary hover:bg-primary/20' },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className={cn(
              'flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-200',
              'card-banking hover:scale-[1.02]',
              action.color
            )}
          >
            <div className="p-3 rounded-xl bg-current/10">
              <Icon className="w-6 h-6" />
            </div>
            <span className="font-medium text-sm">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
};
