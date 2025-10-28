'use client';

import { EnumChargeStatus } from '@/@types/enum.type';
import { Button } from '@/components/ui/button';
import { CheckCircle2Icon, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ChargeStatusActionsProps {
  status: EnumChargeStatus;
  onChangeStatus: (newStatus: EnumChargeStatus) => void;
}

export function ChargeStatusActions({
  status,
  onChangeStatus,
}: ChargeStatusActionsProps) {
  const [loadingAction, setLoadingAction] = useState<EnumChargeStatus | null>(null);

  const handleClick = async (nextStatus: EnumChargeStatus) => {
    setLoadingAction(nextStatus);
    try {
      await onChangeStatus(nextStatus);
    } finally {
      setLoadingAction(null);
    }
  };

  const actions = (() => {
    switch (status) {
      case 'PENDING':
        return [
          {
            next: 'PAID' as const,
            label: 'Marcar como Pago',
            icon: <CheckCircle2Icon className="h-4 w-4 mr-1" />,
            className: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800',
          },
          {
            next: 'EXPIRED' as const,
            label: 'Expirar Cobrança',
            icon: <XCircle className="h-4 w-4 mr-1" />,
            className: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-800',
          },
        ];

      case 'PAID':
        return [
          {
            next: 'EXPIRED' as const,
            label: 'Cancelar Pagamento',
            icon: <XCircle className="h-4 w-4 mr-1" />,
            className: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-800',
          },
        ];

      case 'FAILED':
        return [
          {
            next: 'PENDING' as const,
            label: 'Tentar Novamente',
            icon: <RotateCcw className="h-4 w-4 mr-1" />,
            className: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-800',
          },
        ];

      case 'EXPIRED':
        return [
          {
            next: 'PENDING' as const,
            label: 'Reativar Cobrança',
            icon: <RotateCcw className="h-4 w-4 mr-1" />,
            className: 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800',
          },
        ];

      default:
        return [];
    }
  })();

  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <Button
          key={action.next}
          size="sm"
          className={action.className}
          disabled={loadingAction === action.next}
          onClick={() => handleClick(action.next)}
        >
          {loadingAction === action.next ? (
            <RotateCcw className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            action.icon
          )}
          {action.label}
        </Button>
      ))}
    </div>
  );
}
