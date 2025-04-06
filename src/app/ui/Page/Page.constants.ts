import { FC } from "react";
import { EAppStage } from "../../../shared/types";
import { ChtoToPage } from "../../../pages/MainPage/MainPage";

export const routes: Record<EAppStage, FC> = {
  [EAppStage.ChtoTo]: ChtoToPage,
};
