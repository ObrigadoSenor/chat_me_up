import { ReactNode } from 'react';
import { StoreProvider } from './storeProvider';

interface TestProviderProps {
  children: ReactNode;
}

export const TestProvider = ({ children }: TestProviderProps) => <StoreProvider>{children}</StoreProvider>;
