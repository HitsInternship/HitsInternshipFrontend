import type { ReactNode } from 'react';
import { useStores } from '@/shared/contexts';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {
    userStore: { isAuthorized },
  } = useStores();

  if (isAuthorized) {
    return <>{children}</>;
  }

  return null;
};
