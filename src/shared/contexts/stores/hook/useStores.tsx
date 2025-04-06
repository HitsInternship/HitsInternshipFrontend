import { useContext } from 'react';

import { StoresContext } from '../context';

export const useStores = (): IStores => {
  const stores = useContext(StoresContext);

  if (!stores) {
    throw new Error('useStores must be used within StoresContext');
  }

  return stores;
};
