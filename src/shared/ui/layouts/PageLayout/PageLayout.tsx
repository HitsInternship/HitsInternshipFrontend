import { ReactElement } from 'react';

import { IPageLayoutProps } from './PageLayout.interfaces';

export const PageLayout = ({
  children,
  title,
}: IPageLayoutProps): ReactElement => {
  return (
    <div className='w-[90%] md:w-[70%] mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-6 text-center'>{title}</h1>
      {children}
    </div>
  );
};
