import { observer } from "mobx-react-lite";
import { FC } from "react";

import { Wrapper } from "./Page.styles";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@pages";

export const Page: FC = observer(() => {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Wrapper>
  );
});
