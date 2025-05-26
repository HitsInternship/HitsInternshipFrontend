import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Page } from '../Page';

import { StoresProvider } from '@/shared/contexts';
import { UserStore } from '@/entities/User/models';
import { CompanyStore } from '@/entities/Company/models';

export const App = () => {
  const queryClient = new QueryClient();
  const userStore = new UserStore();
  const companyStore = new CompanyStore();

  const stores = {
    userStore,
    companyStore,
  };

  return (
    <StoresProvider stores={stores}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Page />
        </BrowserRouter>
      </QueryClientProvider>
    </StoresProvider>
  );
};
