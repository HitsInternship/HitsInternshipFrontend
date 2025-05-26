import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTER_PATHS } from '@/shared/consts';
import { LoginPage } from '@/pages/LoginPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { MainLayout } from '@/shared/ui/layouts';
import { InternshipPage } from '@/pages/InternshipPage';
import { CompaniesPage } from '@/pages/CompaniesPage';
import { CreateCompanyPage } from '@/pages/CreateCompanyPage';
import { EditCompanyPage } from '@/pages/EditCompanyPage';
import { AddCompanyPersonPage } from '@/pages/AddCompanyRepresentativePage';
import { SemesterStreamsGroupsPage } from '@/pages/SemesterStreamsGroupsPage';

export const Page: FC = observer(() => {
  return (
    <Routes>
      <Route
        path={ROUTER_PATHS.HOME}
        element={<Navigate to={ROUTER_PATHS.LOGIN} replace />}
      />
      <Route path={ROUTER_PATHS.LOGIN} element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path={ROUTER_PATHS.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTER_PATHS.INTERNSHIP} element={<InternshipPage />} />
        <Route
          path={ROUTER_PATHS.SEMESTER_STREAM_GROUP}
          element={<SemesterStreamsGroupsPage />}
        />
        <Route path={ROUTER_PATHS.COMPANIES} element={<CompaniesPage />} />
        <Route
          path={ROUTER_PATHS.CREATE_COMPANY}
          element={<CreateCompanyPage />}
        />
        <Route
          path={ROUTER_PATHS.EDIT_COMPANY(':id')}
          element={<EditCompanyPage />}
        />
        <Route
          path={ROUTER_PATHS.CREATE_COMPANY_PERSON}
          element={<AddCompanyPersonPage />}
        />
      </Route>
    </Routes>
  );
});
