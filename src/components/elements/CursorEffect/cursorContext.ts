import { createContext } from 'react';
import { CursorConfig } from './types';

type CursorEffectContextType = {
  cursor: Omit<CursorConfig, 'type'>;
  setCursor: React.Dispatch<React.SetStateAction<Omit<CursorConfig, 'type'>>>;
};

export const CursorEffectContext = createContext<CursorEffectContextType>(null);
