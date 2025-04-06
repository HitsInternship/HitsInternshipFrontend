import { Page } from "../Page";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { StoresProvider } from "@shared/contexts";
import { UserStore } from "@entities/User/models";

export const App = () => {
  const queryClient = new QueryClient();
  const userStore = new UserStore();

  const stores = {
    userStore,
  };

  return (
    <StoresProvider stores={stores}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Page />
        </BrowserRouter>
      </QueryClientProvider>
    </StoresProvider>
  );
};
