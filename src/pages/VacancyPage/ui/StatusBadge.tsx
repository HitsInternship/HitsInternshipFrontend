import { Badge } from '@/shared/ui';

export const StatusBadge = ({ status }: { status: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusConfig: Record<string, any> = {
    ['closed']: { label: 'Закрыта', variant: 'secondary' as const },
    ['deleted']: { label: 'Архивирована', variant: 'destructive' as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
