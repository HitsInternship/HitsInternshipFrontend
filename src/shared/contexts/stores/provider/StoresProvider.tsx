import { ReactElement } from 'react';

import { StoresContext } from '../context';
import { IStoresProviderProps } from './StoresProvider.interfaces';

export const StoresProvider = ({
  children,
  stores,
}: IStoresProviderProps): ReactElement => (
  <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
);
