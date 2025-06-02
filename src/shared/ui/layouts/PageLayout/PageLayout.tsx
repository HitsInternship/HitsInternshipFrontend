import { ReactElement } from 'react';

import { IPageLayoutProps } from './PageLayout.interfaces';

export const PageLayout = ({
  children,
  title,
  subTitle
}: IPageLayoutProps): ReactElement => {
  return (
    <div className='w-[90%] md:w-[70%] mx-auto mt-10  '>
      <div className='text-center mb-4'>
        <h1 className='text-3xl font-bold  mb-2 '>{title}</h1>
        <p className='text-muted-foreground text-center  '>
          {subTitle}
        </p>
      </div>
      {children}
    </div>
  );
};
