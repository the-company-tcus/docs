import { createContext } from 'react';
import { CursorConfig } from './types';

type CursorEffectContextType = {
  cursor: CursorConfig;
  setCursor: React.Dispatch<React.SetStateAction<CursorConfig>>;
};

export const CursorEffectContext = createContext<CursorEffectContextType>(null);
