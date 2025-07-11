import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTER_PATHS } from '@/shared/consts';
import { LoginPage } from '@/pages/LoginPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { MainLayout } from '@/shared/ui/layouts';
import { CompaniesPage } from '@/pages/CompaniesPage';
import { SemesterStreamsGroupsPage } from '@/pages/SemesterStreamsGroupsPage';
import { StudentsPage } from '@/pages/Student';
import { VacanciesPage } from '@/pages/VacanciesPage';
import { VacancyPage } from '@/pages/VacancyPage';
import { ChangePracticePage } from '@/pages/ChangePracticePage';
import { SelectionsPage } from '@/pages/SelectionsPage';
import { GlobalPracticesPage } from '@/pages/GlobalPracticesPage';
import { PracticePage } from '@/pages/PracticePage';
import { AppointmentsPage } from '@/pages/AppointmentsPage/ui/AppointmentsPage.tsx';
import { StatisticsPage } from '@/pages/StatisticsPage/StatisticsPage';
import { GlobalSelectionsPage } from '@/pages/GlobalSelections';

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
        {/* <Route path={ROUTER_PATHS.INTERNSHIP} element={<InternshipPage />} /> */}
        <Route
          path={ROUTER_PATHS.SEMESTER_STREAM_GROUP}
          element={<SemesterStreamsGroupsPage />}
        />
        <Route path={ROUTER_PATHS.COMPANIES} element={<CompaniesPage />} />
        <Route path={ROUTER_PATHS.STUDENTS} element={<StudentsPage />} />
        <Route path={ROUTER_PATHS.VACANCIES} element={<VacanciesPage />} />
        <Route path={ROUTER_PATHS.VACANCY(':id')} element={<VacancyPage />} />
        <Route path={ROUTER_PATHS.STATS} element={<StatisticsPage />} />
        <Route
          path={ROUTER_PATHS.CHANGE_PRACTICE}
          element={<ChangePracticePage />}
        />
        <Route
          path={ROUTER_PATHS.SELECTION(':id')}
          element={<SelectionsPage />}
        />
        <Route path={ROUTER_PATHS.MY_SELECTIONS} element={<SelectionsPage />} />
        <Route
          path={ROUTER_PATHS.SELECTIONS}
          element={<GlobalSelectionsPage />}
        />
        <Route
          path={ROUTER_PATHS.PRACTICES}
          element={<GlobalPracticesPage />}
        />
        <Route path={ROUTER_PATHS.PRACTICE(':id')} element={<PracticePage />} />
        <Route
          path={ROUTER_PATHS.APPOINTMENTS}
          element={<AppointmentsPage />}
        />
      </Route>
    </Routes>
  );
});
