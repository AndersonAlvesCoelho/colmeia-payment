import { EnumChargeStatus } from '@/@types/enum.type';
import { chargeStatusLabels } from '@/utils/labels';
import { Badge } from './ui/badge';

// Classes de cor para cada status
const chargeStatusColors: Record<EnumChargeStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  PAID: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  EXPIRED: 'bg-green-100 text-green-800 hover:bg-green-200',
  FAILED: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
};

// Componente Badge para status
export function ChargeStatusBadge({ status }: { status: EnumChargeStatus }) {
  return (
    <Badge className={chargeStatusColors[status]}>
      {chargeStatusLabels[status]}
    </Badge>
  );
}
