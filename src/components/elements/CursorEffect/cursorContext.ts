import { createContext } from 'react';
import { CursorConfig } from './types';

type CursorEffectContextType = {
  cursor: Pick<CursorConfig, 'cursorType' | 'options'>;
  setCursor: React.Dispatch<
    React.SetStateAction<Pick<CursorConfig, 'cursorType' | 'options'>>
  >;
};

export const CursorEffectContext = createContext<CursorEffectContextType>(null);
