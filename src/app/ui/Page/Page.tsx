import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages';
import { ROUTER_PATHS } from '@/shared/consts';

export const Page: FC = observer(() => {
  return (
    <Routes>
      <Route
        path={ROUTER_PATHS.HOME}
        element={<Navigate to={ROUTER_PATHS.LOGIN} replace />}
      />
      <Route path={ROUTER_PATHS.LOGIN} element={<LoginPage />} />
    </Routes>
  );
});
