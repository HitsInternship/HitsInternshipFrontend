import { ReactNode } from 'react';

export interface IPageLayoutProps {
  children: ReactNode;
  title?: string;
  subTitle?: string|ReactNode;
}
