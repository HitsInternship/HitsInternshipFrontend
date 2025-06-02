import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Header } from '../Header';

export const MainLayout: FC = () => (
  <>
    <Header />
    <div>
      <Outlet />
    </div>
    <Toaster/>
  </>
);
