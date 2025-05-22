import { ReactElement, ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { getStores, muteConsole } from '@shared/jest';

import { StoresProvider } from '../provider';
import { useStores } from './useStores';

describe('shared/lib/hooks/useStore', () => {
  test('should return value passed to StoresProvider', () => {
    const storesMock = getStores();

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
      <StoresProvider stores={storesMock}>{children}</StoresProvider>
    );

    const { result } = renderHook(() => useStores(), {
      wrapper,
    });

    expect(result.current).toEqual(storesMock);
  });

  test('should throws an error if used without StoresProvider', () => {
    muteConsole('error');

    expect(() => {
      renderHook(() => useStores());
    }).toThrow('useStores must be used within StoresContext');
  });
});
